# ACS Email Verification - Testing Checklist

## Pre-Deployment Setup

### 1. Environment Variables
Before pushing to GitHub, ensure these are set in your Azure Function App or local.settings.json:

```
ACS_CONNECTION_STRING=your-connection-string-here
VERIFICATION_SENDER=donotreply@pamperpro.eu
FRONTEND_URL=https://pamperpro.eu (production) or http://localhost:5173 (development)
DATABASE_URL=your-database-url
```

### 2. Azure Function Deployment
The following functions are ready to deploy:
- `/functions/send-verification-email/index.ts` - Sends verification emails via ACS
- `/functions/auth/signup/index.ts` - Creates user account and triggers email
- `/functions/auth/verify-email/index.ts` - Verifies token and confirms email
- `/functions/auth/profile/index.ts` - Completes user profile after verification

## Local Testing Steps

### Step 1: Start the Development Server
```bash
npm run dev
# or
pnpm dev
```

### Step 2: Test Signup Flow
1. Navigate to `/signup-acs`
2. Enter test email (e.g., your@email.com)
3. Enter password (min 8 characters)
4. Select "Sign up as Professional" or "Sign up as Client"
5. Click "Create Account"
6. Should redirect to email verification screen with message

### Step 3: Check Email
1. Open your inbox
2. Look for email from: **donotreply@pamperpro.eu**
3. Subject should be: **"Verify your PamperPro account"**
4. Click the verification link or copy the verification code

### Step 4: Verify Email
1. Paste code or visit verification link
2. Should redirect to profile completion page
3. Complete profile with:
   - For Professionals: Service type, experience, pricing, location
   - For Clients: Contact info, service preferences

### Step 5: Login
1. After profile completion, should redirect to dashboard
2. Try logging in with signup email and password
3. Dashboard should load with user data

## Testing Edge Cases

### Invalid Email
- Try signing up with non-existent email
- Should handle gracefully or show validation error

### Duplicate Email
- Sign up twice with same email
- Should show "Email already exists" error

### Expired Token
- Wait 24+ hours and try verification
- Should show "Token expired" message

### Wrong Code
- Enter incorrect verification code
- Should show "Invalid code" error

### Network Issues
- Disable internet temporarily during email send
- Should show error and allow retry
- Resend button should have 60-second cooldown

## Production Deployment Checklist

- [ ] All environment variables set in Azure Function App
- [ ] Azure Communication Services resource created and configured
- [ ] Email sender address verified (donotreply@pamperpro.eu)
- [ ] Database connection string configured
- [ ] Frontend URL updated to production domain
- [ ] Test signup flow in production environment
- [ ] Monitor Azure Function logs for errors
- [ ] Test email delivery to various email providers (Gmail, Outlook, etc.)
- [ ] Verify email formatting displays correctly in different email clients

## Troubleshooting

### "Failed to send verification email"
- Check ACS_CONNECTION_STRING is correct
- Verify sender email is authorized in ACS
- Check Azure Function logs for detailed error

### Email not arriving
- Check spam/junk folder
- Verify email address is correct
- Check ACS resource status in Azure Portal
- Check Function App error logs

### "Invalid token" on verification
- Ensure FRONTEND_URL matches where link is being clicked
- Token expires after 24 hours
- Database must be accessible and updated

### User stuck at verification
- Check browser console for errors
- Verify database connection
- Clear browser cache and try again

## Files to Deploy

```
functions/
├── send-verification-email/
│   ├── index.ts
│   └── function.json
├── auth/
│   ├── signup/
│   │   ├── index.ts
│   │   └── function.json
│   ├── verify-email/
│   │   ├── index.ts
│   │   └── function.json
│   └── profile/
│       ├── index.ts
│       └── function.json
└── lib/
    ├── azureDbClient.ts
    ├── emailService.ts
    └── passwordUtils.ts

src/
├── components/
│   └── SignupWithACS.tsx
├── pages/
│   └── SignupPage.tsx
├── services/
│   └── acsEmailService.ts
└── App.tsx (with /signup-acs route)
```

## Next Steps After Testing

1. **Password Reset** - Implement forgot password email flow
2. **Professional Onboarding** - Complete service setup and verification
3. **Booking System** - Connect email notifications to bookings
4. **Payment Integration** - Send payment receipts via ACS
5. **Admin Notifications** - Alert admins of new signups

---

Ready to push! Let me know if you encounter any issues during testing. 🚀
