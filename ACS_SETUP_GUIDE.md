# Azure Communication Services (ACS) Setup Guide

This guide explains how to set up ACS email verification for PamperPro.

## Prerequisites

- Azure Communication Services resource created
- Verified sender email domain (donotreply@pamperpro.eu)
- Azure Functions deployed

## Environment Variables

Add these to your `.env.local` file (frontend) and Azure Function App Settings (backend):

### Frontend (.env.local)
```
VITE_FRONTEND_URL=http://localhost:5173
```

### Azure Function App Settings
Set these in Azure Portal > Function App > Configuration > Application settings:

```
ACS_CONNECTION_STRING=<your-acs-connection-string>
VERIFICATION_SENDER=donotreply@pamperpro.eu
FRONTEND_URL=https://pamperpro.eu (production) or http://localhost:5173 (development)
```

## How to Get ACS Connection String

1. Go to Azure Portal
2. Find your Communication Services resource
3. Click "Keys" in the left menu
4. Copy the "Connection string" value
5. Add it to Azure Function App Settings as `ACS_CONNECTION_STRING`

## Signup Flow

### Step 1: Email & Password
- User enters email and password
- System validates password strength (min 8 characters)
- Signup API creates temporary user account
- Returns verification token

### Step 2: Send Verification Email
- System calls `send-verification-email` Azure Function
- Function uses ACS to send HTML email to user
- Email contains verification link with token
- Email includes clickable button and plain text link
- Resend option available after 60 seconds

### Step 3: Email Verification
- User clicks link or enters code manually
- System verifies token
- Account is activated
- User proceeds to profile completion

### Step 4: Complete Profile
- User enters first name, last name, phone
- Profile is saved
- User is redirected to appropriate dashboard
  - Professionals → Professional Dashboard
  - Clients → Client Dashboard

## API Endpoints

### 1. Signup
```
POST /api/auth/signup
Body: {
  email: string,
  password: string,
  userType: "professional" | "client"
}
Response: {
  verificationToken: string,
  expiresIn: number
}
```

### 2. Send Verification Email
```
POST /api/send-verification-email
Body: {
  email: string,
  token: string
}
Response: {
  success: boolean,
  messageId: string
}
```

### 3. Verify Email
```
POST /api/auth/verify-email
Body: {
  email: string,
  token: string
}
Response: {
  success: boolean
}
```

### 4. Complete Profile
```
POST /api/auth/profile
Body: {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  userType: "professional" | "client"
}
Response: {
  userId: number,
  profileComplete: boolean
}
```

## Testing Locally

1. Start frontend: `npm run dev`
2. Start Azure Functions: `func start`
3. Navigate to `http://localhost:5173/signup-acs`
4. Enter test email and password
5. Check function logs for email sending confirmation
6. Click verification link or enter code

## Production Deployment

1. Deploy Azure Functions to Azure
2. Set production environment variables in Function App Settings
3. Update FRONTEND_URL to your production domain
4. Test signup flow end-to-end
5. Monitor email delivery in ACS dashboard

## Troubleshooting

### "Email service not configured"
- Check ACS_CONNECTION_STRING is set in Function App Settings
- Verify connection string is not expired
- Check function logs for detailed error

### "Failed to send verification email"
- Verify sender email (donotreply@pamperpro.eu) is configured in ACS
- Check email domain is verified
- Review ACS activity logs for delivery failures

### Verification link not working
- Verify FRONTEND_URL matches your deployment URL
- Check token hasn't expired (24 hour limit)
- Ensure /verify-email route exists in frontend

### Email takes too long to arrive
- ACS typically sends within 30 seconds
- Check spam/junk folder
- Review ACS quotas and throttling limits

## Security Notes

- Verification tokens expire after 24 hours
- Passwords require minimum 8 characters
- Emails are sent over HTTPS
- Connection strings should never be committed to version control
- Use environment variables for all sensitive data

## Next Steps

After setup, you can:
1. Add password reset via email
2. Add promotional email campaigns
3. Add SMS verification as backup
4. Implement email preferences/unsubscribe
