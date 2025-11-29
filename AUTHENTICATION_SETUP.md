# Pamper Pro Authentication System - Complete Setup Guide

## Overview
Pamper Pro uses email/password authentication with JWT tokens, email verification, and role-based access control. Google OAuth has been removed per project decision.

## Authentication Flow

### 1. User Signup
- Users create account with email, first name, last name, and password
- Password minimum: 8 characters
- Email verification token sent automatically
- User receives JWT token immediately after signup
- User marked as `isEmailVerified: false` until email verified

### 2. Email Verification
- Verification link sent to user's email
- 6-character alphanumeric code expires in 24 hours
- User clicks link or enters code at `/verify-email`
- After verification, user can access all features

### 3. User Login
- Email + password authentication
- Invalid credentials rejected with vague error message (security best practice)
- Successful login returns JWT token + user data
- Last login timestamp updated
- Token valid for 7 days

### 4. Role-Based Access Control
- Roles: `client`, `professional`, `vendor`, `admin`
- Users can have multiple roles in `roles` array
- Primary role stored in `role` field
- `canAccessRole()` checks if user has role in array

---

## Test User Accounts

### ✅ Admin Account (Auto-created at signup)
```
Email: admin@pamperpro.eu
Password: [any 8+ char password]
Role: admin
Access: Full admin dashboard, KYC reviews, all features
```

### ✅ Client Account (for testing booking client features)
```
Email: client@test.com
Password: TestPassword123
Role: client
Access: Find professionals, book services, view dashboard, Banter, products
```

### ✅ Professional Account (for testing service provider features)
```
Email: professional@test.com
Password: TestPassword456
Role: professional
Access: Professional dashboard, service management, bookings, KYC verification
```

### ✅ Vendor Account (for testing product vendor features)
```
Email: vendor@test.com
Password: TestPassword789
Role: vendor
Access: Shop management, product listings, vendor dashboard
```

---

## How to Create Test Accounts

### Method 1: In-App Signup
1. Go to app homepage
2. Click "Sign Up" (client) or "Become a Professional" (professional)
3. Fill in email, first name, last name, password
4. Click "Create Account"
5. User created and authenticated immediately
6. For admin: use `admin@pamperpro.eu` email during signup

### Method 2: Direct Database (if needed)
```sql
-- Create test client
INSERT INTO users (
  email, password_hash, first_name, last_name, role, roles, 
  email_verified, verification_token, verification_token_expires
) VALUES (
  'client@test.com',
  '$2b$10$...', -- hashed password
  'Test',
  'Client',
  'client',
  '["client"]',
  true,
  NULL,
  NULL
);
```

---

## Authentication Endpoints

### Signup
```
POST /api/auth/signup

Request:
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "SecurePassword123"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": 123,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "client",
    "roles": ["client"],
    "isEmailVerified": false
  },
  "emailSent": true
}
```

### Login
```
POST /api/auth/login

Request:
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": 123,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "client",
    "roles": ["client"],
    "isEmailVerified": true
  }
}
```

### Verify Email
```
POST /api/auth/verify-email

Request:
{
  "token": "ABC123"
}

Response:
{
  "success": true,
  "user": {
    "id": 123,
    "isEmailVerified": true
  }
}
```

### Get Profile
```
GET /api/auth/profile

Headers:
Authorization: Bearer <token>

Response:
{
  "user": {
    "id": 123,
    "email": "user@example.com",
    ... // all user fields
  }
}
```

---

## Authentication Context (useAuth)

### Available in all components via `useAuth()` hook:

```typescript
const auth = useAuth();

// Current authenticated user
auth.currentUser // User | null

// Loading state
auth.loading // boolean

// Error state
auth.error // string | null

// JWT token
auth.token // string | null

// Methods
auth.login(email, password) // Promise<void>
auth.signup(email, firstName, lastName, password) // Promise<void>
auth.verifyEmail(token) // Promise<void>
auth.logout() // void
auth.switchRole(role) // void
auth.canAccessRole(role) // boolean
auth.updateUser(data) // void
auth.clearError() // void
```

---

## Protected Routes & Role-Based Access

### Client Routes
- `/` (home)
- `/find-professionals`
- `/my-bookings`
- `/client-dashboard`
- `/banter` (Pamper Pro Banter community)
- `/shop` (products)

### Professional Routes
- `/professional-dashboard`
- `/professional-onboarding`
- `/professional-services`
- `/my-bookings` (view bookings)

### Admin Routes
- `/admin-dashboard`
- `/kyc-review` (review professional KYC)
- `/users-management`

### Public Routes (no auth required)
- `/` (home with CTA)
- `/pricing`
- `/elite-support`
- `/privacy`
- `/terms-client`
- `/terms-professional`

---

## Token Management

### Storage
- Token stored in `localStorage` as `pamper_pro_token`
- User data stored in `localStorage` as `pamper_pro_user`
- Token persists across page refreshes

### Expiration
- Token valid for 7 days from issue
- After expiration, user must login again
- No automatic refresh token (can be added later)

### Sending with Requests
```typescript
// Automatically included in fetch requests
headers: {
  'Authorization': `Bearer ${token}`
}
```

---

## User Types & Fields

### Complete User Object
```typescript
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole; // primary role
  roles: UserRole[]; // all roles user has
  isEmailVerified: boolean;
  profileComplete: boolean;
  businessName?: string;
  phoneNumber?: string;
  profileImage?: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  kycStatus?: 'pending' | 'approved' | 'rejected';
  lastLogin?: string;
  created_at?: string;
  updated_at?: string;
}
```

---

## Testing Checklist

- [ ] Admin signup with `admin@pamperpro.eu`
- [ ] Client signup with test email
- [ ] Professional signup with test email
- [ ] Verify email works
- [ ] Login with correct credentials works
- [ ] Login with wrong password fails gracefully
- [ ] Token persists across page refresh
- [ ] Logout clears token and redirects
- [ ] Role-based access control works
- [ ] User profile loads correctly
- [ ] Switch role functionality works
- [ ] Auth context available in all components

---

## Troubleshooting

### Token Not Persisting
- Check browser localStorage settings
- Verify `pamper_pro_token` key is being saved
- Check browser console for errors

### Email Verification Not Sending
- Check Azure SendGrid configuration
- Verify email address is correct
- Check spam folder
- Review logs in Azure portal

### Login Failed But Credentials Correct
- Check if account is active (`is_active = true`)
- Verify email in database matches exactly (case-insensitive)
- Check password hash validation

### Users Can't Access Dashboard
- Verify JWT token is valid and not expired
- Check role-based access control permissions
- Verify `currentUser` is not null in AuthContext

---

## Environment Variables Required

```
JWT_SECRET=your-secret-key-change-in-production
CLIENT_BASE_URL=https://www.pamperpro.eu (for email links)
SENDGRID_API_KEY=your-sendgrid-key (for email verification)
DATABASE_URL=postgres://... (Azure PostgreSQL)
```

---

## Next Steps

1. Create test accounts using the signup forms
2. Verify email works for each account
3. Test login/logout flows
4. Test role-based access control
5. Test password reset if needed
6. Verify Turso database stores user data correctly
7. Deploy to Azure for real user testing
