# Client Authentication - Azure Functions Integration Guide

## Overview

This document explains how to connect the Pamper Pro client authentication frontend to your Azure Functions backend. The frontend is designed to call `/api/...` endpoints which will be implemented by Azure Functions.

## Architecture

```
Frontend (React)
    ↓
src/api/apiClient.ts (Centralized API Layer)
    ↓
API Calls: /api/auth/signup, /api/auth/login, etc.
    ↓
Azure Static Web Apps (Routes to Azure Functions)
    ↓
Azure Functions (Your Backend Logic)
    ↓
Cosmos DB (Users container - one document per user)
```

## Frontend Structure

### 1. **API Client Layer** (`src/api/apiClient.ts`)
- Centralized place for ALL API calls
- Clean separation between frontend and backend
- Easy to modify endpoints when connecting to real backend
- Includes error handling and response typing

**Key Functions:**
- `authAPI.signup()` - Create new account
- `authAPI.login()` - Login with email/password
- `authAPI.verifyEmail()` - Verify email token
- `authAPI.getProfile()` - Get user profile (requires JWT token)
- `authAPI.updateProfile()` - Update profile (requires JWT token)
- `authAPI.refreshToken()` - Refresh JWT token
- `authAPI.logout()` - Logout

### 2. **Auth Context** (`src/context/ClientAuthContext.tsx`)
- Manages authentication state globally
- Provides hooks for components: `useClientAuth()`
- Handles token storage in localStorage
- Automatically loads user on app start

**Context Methods:**
- `signup(data)` - Sign up new client
- `login(email, password)` - Login
- `logout()` - Logout
- `updateProfile(data)` - Update user profile
- `clearError()` - Clear error messages

### 3. **Pages**

#### `/signup` - ClientSignupFlow
- Beautiful signup form with validation
- Email verification confirmation screen
- Success screen with redirect to dashboard
- Form fields: firstName, lastName, email, password, phone, promoCode
- Form validation: password strength, email format, required fields
- Error messages and loading states

#### `/login` - ClientLoginFlow
- Simple login form
- Email/password validation
- Link to forgot password
- Link to signup page
- Loading and error states

#### `/dashboard` - ClientDashboard
- Protected route (requires authentication)
- Shows user profile data
- Edit profile functionality
- Profile completion status
- Email verification status
- Member since date
- Quick stats (bookings, favorites)

## API Endpoints to Implement

### 1. POST `/api/auth/signup`

**Request Body:**
```typescript
{
  email: string;           // User email (unique)
  password: string;        // User password (min 8 chars, uppercase, number)
  firstName: string;       // First name
  lastName: string;        // Last name
  phone?: string;          // Optional phone number
  promoCode?: string;      // Optional promo code
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
  user?: {
    id: string;                    // User ID (from Cosmos DB)
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    profileComplete: boolean;      // Set to false initially
    emailVerified: boolean;        // Set to false (pending email verification)
    createdAt: string;             // ISO timestamp
    updatedAt: string;             // ISO timestamp
  };
  token?: string;          // JWT token (7-day expiry recommended)
}
```

**Backend Logic:**
1. Validate input (email format, password strength, required fields)
2. Check if email already exists in Cosmos DB
3. Hash password using bcrypt
4. Create new user document in Cosmos DB `users` container with:
   ```
   {
     id: UUID or auto-generated
     email: string
     passwordHash: bcrypt hashed password
     firstName: string
     lastName: string
     phone: string (optional)
     profileComplete: false
     emailVerified: false
     promoCode: string (optional)
     role: "client"
     createdAt: ISO timestamp
     updatedAt: ISO timestamp
   }
   ```
5. Generate JWT token with user ID and email
6. Send verification email with token link to `/verify-email?token={token}`
7. Return user object and JWT token

---

### 2. POST `/api/auth/login`

**Request Body:**
```typescript
{
  email: string;
  password: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    bio?: string;
    location?: string;
    profilePicture?: string;
    profileComplete: boolean;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  token?: string;  // JWT token
}
```

**Backend Logic:**
1. Find user by email in Cosmos DB
2. Compare password with stored hash
3. If valid, generate JWT token
4. Return user object and token
5. If invalid, return error message

---

### 3. POST `/api/auth/verify-email`

**Request Body:**
```typescript
{
  token: string;  // Verification token from email link
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

**Backend Logic:**
1. Decode JWT token to get user ID
2. Find user in Cosmos DB by ID
3. Update `emailVerified: true` and `updatedAt: new timestamp`
4. Return success message

---

### 4. GET `/api/auth/profile`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```typescript
{
  success: boolean;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    bio?: string;
    location?: string;
    profilePicture?: string;
    profileComplete: boolean;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
```

**Backend Logic:**
1. Extract JWT token from Authorization header
2. Decode token to get user ID
3. Find user in Cosmos DB by ID
4. Return user object

---

### 5. PUT `/api/auth/profile`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Request Body:**
```typescript
{
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  location?: string;
  profilePicture?: string;  // Base64 string or URL
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
  user?: {
    // Updated user object with all fields
  };
}
```

**Backend Logic:**
1. Extract JWT token from Authorization header
2. Decode token to get user ID
3. Find user in Cosmos DB by ID
4. Update only provided fields
5. Set `profileComplete: true` if all required fields are filled
6. Update `updatedAt: new timestamp`
7. Return updated user object

---

## Cosmos DB Schema

**Container:** `users`

**Sample Document:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john@example.com",
  "passwordHash": "$2b$10$...",  // bcrypt hash
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+234 800 000 0000",
  "bio": "Beauty enthusiast",
  "location": "Lagos, Nigeria",
  "profilePicture": "https://...",
  "profileComplete": false,
  "emailVerified": false,
  "promoCode": "WELCOME10",
  "role": "client",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Frontend Usage Examples

### Signup
```typescript
import { useClientAuth } from './context/ClientAuthContext';

function SignupComponent() {
  const { signup, loading, error } = useClientAuth();

  const handleSignup = async () => {
    try {
      await signup({
        email: 'john@example.com',
        password: 'SecurePass123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+234 800 000 0000',
        promoCode: 'WELCOME10'
      });
      // User is now signed up and logged in
      // Redirect to /dashboard
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <button onClick={handleSignup} disabled={loading}>
      {loading ? 'Signing up...' : 'Sign Up'}
    </button>
  );
}
```

### Login
```typescript
import { useClientAuth } from './context/ClientAuthContext';

function LoginComponent() {
  const { login, loading, error } = useClientAuth();

  const handleLogin = async () => {
    try {
      await login('john@example.com', 'SecurePass123');
      // User is now logged in
      // Redirect to /dashboard
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <button onClick={handleLogin} disabled={loading}>
      {loading ? 'Signing in...' : 'Sign In'}
    </button>
  );
}
```

### Access Protected Dashboard
```typescript
import { useClientAuth } from './context/ClientAuthContext';
import ClientProtectedRoute from './components/ClientProtectedRoute';
import ClientDashboard from './pages/ClientDashboard';

// In your router:
<Route
  path="/dashboard"
  element={
    <ClientProtectedRoute>
      <ClientDashboard />
    </ClientProtectedRoute>
  }
/>

// ClientDashboard automatically uses useClientAuth() to:
// 1. Get user profile data
// 2. Allow profile editing
// 3. Show profile status
```

## Configuration

### Environment Variables

Add to your `.env` file:
```env
VITE_API_URL=/api
```

This tells the API client to use `/api` as the base URL. In production with Azure Static Web Apps, this will be routed to Azure Functions automatically.

### Local Development

If running Azure Functions locally:
```env
VITE_API_URL=http://localhost:7071/api
```

## Testing Checklist

- [ ] User can sign up with valid email and password
- [ ] Form validation catches invalid emails
- [ ] Form validation requires strong passwords (8+ chars, uppercase, number)
- [ ] "Check your email" screen appears after signup
- [ ] User receives verification email (check Azure SendGrid/Email service)
- [ ] User can click verification link
- [ ] Email verification screen appears after clicking link
- [ ] User redirects to dashboard after verification
- [ ] User profile shows in dashboard
- [ ] User can edit profile (first name, last name, phone, bio, location)
- [ ] Profile updates persist in Cosmos DB
- [ ] User can logout
- [ ] Login works with correct credentials
- [ ] Login fails with incorrect password
- [ ] User stays logged in after page refresh (JWT in localStorage)
- [ ] Expired token triggers re-login
- [ ] Protected routes redirect to login if not authenticated

## Common Issues & Solutions

### Issue: Signup returns "User already exists"
- **Cause:** Email is already registered in Cosmos DB
- **Solution:** Use unique email or implement "forgot password" flow

### Issue: Password validation fails
- **Requirements:** Minimum 8 characters, 1 uppercase letter, 1 number
- **Example:** `SecurePass123` ✅, `password` ❌

### Issue: Token expires and user gets logged out
- **Solution:** Implement token refresh endpoint (`POST /api/auth/refresh-token`)
- **Frontend handles this:** `apiClient.auth.refreshToken()`

### Issue: CORS errors when calling /api endpoints
- **Solution:** Configure Azure Static Web Apps routing in `staticwebapp.config.json`
- **Example configuration:**
  ```json
  {
    "routes": [
      {
        "route": "/api/*",
        "allowedRoles": ["authenticated", "anonymous"]
      }
    ]
  }
  ```

## Next Steps

1. **Implement Azure Functions** for each endpoint
2. **Connect to Cosmos DB** for user storage
3. **Set up email service** (SendGrid, Azure Communication Services)
4. **Deploy to Azure Static Web Apps**
5. **Test all endpoints** using the provided test cases
6. **Monitor logs** in Azure Application Insights

## Files Reference

| File | Purpose |
|------|---------|
| `src/api/apiClient.ts` | Centralized API client |
| `src/context/ClientAuthContext.tsx` | Auth state management |
| `src/pages/ClientSignupFlow.tsx` | Signup page |
| `src/pages/ClientLoginFlow.tsx` | Login page |
| `src/pages/ClientDashboard.tsx` | Dashboard page |
| `src/components/ClientProtectedRoute.tsx` | Route protection |

## Support

For issues or questions:
1. Check the Common Issues section above
2. Review Azure Functions documentation
3. Check Cosmos DB query patterns
4. Review JWT best practices
