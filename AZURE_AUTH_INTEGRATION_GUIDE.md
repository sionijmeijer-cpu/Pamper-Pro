# Azure Functions Authentication Integration Guide

This guide explains how the Pamper Pro frontend is wired to your Azure Functions backend endpoints.

## 🎯 Frontend Architecture

### API Layer (`src/api/authClient.ts`)
The frontend uses a clean, centralized API client with these functions:

```typescript
// Register new user
registerUser(data: RegisterPayload): Promise<RegisterResponse>

// Verify email with token
verifyEmail(token: string): Promise<VerifyEmailResponse>

// Login user
loginUser(data: LoginPayload): Promise<LoginResponse>
```

**Key Feature:** All calls go to `/api/...` endpoints, which are automatically proxied to your Azure Functions when deployed on Azure Static Web Apps.

---

## 🔧 Backend Endpoints

### 1. POST `/api/auth-register`
**Purpose:** Create new user account and send verification email

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2341234567890",
  "promoCode": "WELCOME10"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Account created. Verification email sent."
}
```

**Error Response (400/409/500):**
```json
{
  "success": false,
  "error": "Email already in use"
}
```

**Backend Actions:**
- Validate input
- Hash password
- Create user in Cosmos DB (Users container)
- Generate verification token
- Send verification email via SendGrid
- Return success/error message

---

### 2. POST `/api/auth-verify-email`
**Purpose:** Verify user email using token from email link

**Request:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully!"
}
```

**Error Response (400/401/500):**
```json
{
  "success": false,
  "error": "Token expired or invalid"
}
```

**Backend Actions:**
- Validate token
- Check token expiry
- Mark user's `emailVerified` as true in Cosmos DB
- Return success/error

---

### 3. POST `/api/auth-login`
**Purpose:** Authenticate user and return JWT token

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id-123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Error Response (401/500):**
```json
{
  "success": false,
  "error": "Email not verified. Please check your inbox for verification link."
}
```

or

```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

**Backend Actions:**
- Find user by email
- Validate password
- Check if email is verified (block login if not)
- Generate JWT token
- Return token + user data

---

## 🌊 User Flow

### 1. **Signup Flow**
```
User fills signup form in ClientSignupModal
        ↓
Form validates (client-side)
        ↓
POST /api/auth-register with form data
        ↓
Backend: Create user + send verification email
        ↓
Success: Redirect to /check-email page
        ↓
Error: Show error message on form
```

### 2. **Email Verification Flow**
```
User receives email with link: /verify-email?token=XYZ
        ↓
EmailVerificationPage reads token from URL
        ↓
useEffect calls POST /api/auth-verify-email
        ↓
Backend: Validates token + marks email as verified
        ↓
Show success page with "Go to Login" button
        ↓
User clicks button → navigates to /login
```

### 3. **Login Flow**
```
User fills login form in ClientSignupModal
        ↓
Form validates (client-side)
        ↓
POST /api/auth-login with email + password
        ↓
Backend: Validates + checks emailVerified flag
        ↓
Success: Store JWT + user data in localStorage
        ↓
Redirect to /dashboard
        ↓
Error (not verified): Show specific message
        ↓
Error (invalid credentials): Show generic error
```

---

## 📁 Frontend File Structure

```
src/
├── api/
│   └── authClient.ts              # ← All API calls here
├── pages/
│   ├── CheckEmailPage.tsx         # ← "Check your email" confirmation
│   └── EmailVerificationPage.tsx  # ← Handles /verify-email?token=...
├── components/
│   └── ClientSignupModal.tsx      # ← Updated to use authClient
└── App.tsx                         # ← New routes added
```

---

## 🔌 How to Connect to Real Azure Functions

### Step 1: Update Environment Variable
In your `.env` file:
```env
VITE_API_URL=https://your-function-app.azurewebsites.net/api
```

Or for local development:
```env
VITE_API_URL=http://localhost:7071/api
```

### Step 2: Deploy Functions
Make sure these Azure Functions are deployed:
- `auth-register`
- `auth-verify-email`
- `auth-login`

### Step 3: Configure CORS (if needed)
In your Azure Function App settings, add Static Web Apps domain to CORS:
```
https://your-static-app-name.azurestaticapps.net
```

### Step 4: Test
```bash
# Local: Start functions + frontend
func start
npm run dev

# Visit: http://localhost:5173
# Try signup → should hit local function
```

---

## 🛡️ Error Handling Strategy

### Frontend Error Handling
```typescript
// In authClient.ts
try {
  const response = await fetch(`${API_BASE_URL}/auth-register`, ...);
  const result = await response.json();
  
  if (!response.ok) {
    return {
      success: false,
      error: result.error || 'Registration failed'
    };
  }
  
  return { success: true, message: result.message };
} catch (error) {
  return {
    success: false,
    error: 'Network error: ' + error.message
  };
}
```

### Component Error Display
```typescript
// In ClientSignupModal
if (result.success) {
  // Redirect to check-email
} else {
  // Show error in form
  setValidationErrors({ submit: result.error });
}
```

---

## 📋 User Document Structure (Cosmos DB)

Your Users container should have documents like:

```json
{
  "id": "user-123",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2341234567890",
  "passwordHash": "hashed_password_here",
  "emailVerified": false,
  "emailVerificationToken": "token_here",
  "emailVerificationTokenExpiry": "2024-12-29T12:00:00Z",
  "promoCodeUsed": "WELCOME10",
  "createdAt": "2024-12-22T12:00:00Z",
  "updatedAt": "2024-12-22T12:00:00Z"
}
```

---

## 🚀 Deployment Checklist

- [ ] Azure Function App created
- [ ] All 3 auth functions deployed
- [ ] Cosmos DB Users container created
- [ ] SendGrid integration configured
- [ ] VITE_API_URL environment variable set
- [ ] CORS configured
- [ ] Frontend deployed to Azure Static Web Apps
- [ ] Test signup flow end-to-end
- [ ] Test email verification link
- [ ] Test login with unverified email (should show specific message)

---

## 🆘 Common Issues

### Issue: "POST /api/auth-register 404"
**Solution:** Ensure Azure Function is deployed and route is correct. Check `functionApp/auth/register/function.json`.

### Issue: Email not being sent
**Solution:** Check SendGrid API key is set in Azure Function App settings.

### Issue: Token validation always fails
**Solution:** Ensure token generation and validation use same secret key.

### Issue: CORS errors in browser
**Solution:** Add Static Web Apps domain to Azure Function CORS settings.

---

## 📞 Support

For issues with:
- **Frontend logic:** Check `src/api/authClient.ts` and components
- **Backend logic:** Check Azure Function implementations
- **Database:** Verify Cosmos DB Users container structure
- **Email:** Check SendGrid configuration

