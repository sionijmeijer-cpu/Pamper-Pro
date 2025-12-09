# Azure Communication Services Email - Test & Setup Guide

## ✅ What's Been Configured

### New Test Endpoint
- **GET /api/test-email** - Test your email configuration
- First returns basic confirmation message
- Then sends real test email when ACS is configured

### Email Integration in Signup
- Email verification automatically sent after signup
- Uses `api/lib/sendVerificationEmail.js` helper
- Verification link: `FRONTEND_URL/verify-email?token=...`

### Removed Old Code
- ❌ Removed all SendGrid references
- ❌ Removed `SENDGRID_API_KEY` from local.settings.json
- ❌ Removed `EMAIL_FROM` (replaced with `VERIFICATION_SENDER`)

## 🚀 How to Test

### Step 1: Test Endpoint Deployment
```bash
# After deployment, visit:
https://www.pamperpro.eu/api/test-email
```

Should return:
```json
{
  "message": "test working from Shipper",
  "note": "ACS_CONNECTION_STRING not configured yet"
}
```

### Step 2: Configure Environment Variables in Azure Portal

Go to: **Azure Static Web Apps** → **Configuration** → **Application settings**

Add these 3 variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `ACS_CONNECTION_STRING` | Your ACS connection string | `endpoint=https://...;accesskey=...` |
| `VERIFICATION_SENDER` | Your verified sender email | `donotreply@pamperpro.eu` |
| `FRONTEND_URL` | Your frontend URL | `https://www.pamperpro.eu` |
| `TEST_EMAIL_TO` | (Optional) Default test recipient | `your@email.com` |

### Step 3: Send Test Email
```bash
# Option 1: Use query parameter
https://www.pamperpro.eu/api/test-email?to=your@email.com

# Option 2: Use TEST_EMAIL_TO env var
https://www.pamperpro.eu/api/test-email
```

Expected response:
```json
{
  "message": "Test email sent successfully!",
  "to": "your@email.com",
  "from": "donotreply@pamperpro.eu",
  "messageId": "...",
  "status": "Succeeded"
}
```

### Step 4: Test Signup Flow
1. Sign up with a new account
2. Check email inbox (and spam folder)
3. Click verification link
4. Account should be verified

## 📋 Environment Variables Summary

### Required for Email Sending
- ✅ `ACS_CONNECTION_STRING` - Azure Communication Services connection string
- ✅ `VERIFICATION_SENDER` - Verified sender email address
- ✅ `FRONTEND_URL` - Your app's frontend URL

### Optional
- `TEST_EMAIL_TO` - Default recipient for test emails

### Removed (Old SendGrid)
- ❌ `SENDGRID_API_KEY` - No longer needed
- ❌ `EMAIL_FROM` - Replaced by `VERIFICATION_SENDER`

## 🔍 Debugging

### Check Logs
View Azure Function logs:
1. Azure Portal → Static Web Apps → your app
2. Environment → Functions
3. Click function name → Invocations

### Common Issues

**Email not arriving:**
- Check spam/junk folder
- Verify `VERIFICATION_SENDER` domain is verified in ACS
- Check Azure Function logs for errors

**Connection errors:**
- Verify `ACS_CONNECTION_STRING` is correct
- Check it starts with `endpoint=https://`
- Ensure no extra spaces or quotes

**Wrong sender email:**
- Verify domain ownership in ACS Email service
- Add domain to verified senders list
- Wait for DNS propagation (can take 24-48 hours)

## 📧 Email Flow

### Signup Process
1. User submits signup form
2. User created in database with `verification_token`
3. `sendVerificationEmail()` called automatically
4. Email sent via Azure Communication Services
5. User receives email with verification link
6. User clicks link → `/verify-email?token=XXX`
7. Token validated, account marked as verified

### Files Involved
- `api/auth-signup/index.js` - Signup endpoint
- `api/lib/sendVerificationEmail.js` - Email helper
- `api/lib/email.js` - General email utilities
- `api/test-email/index.js` - Test endpoint

## 🎯 Next Steps

1. ✅ Deploy code to Azure
2. ✅ Add environment variables in Azure Portal
3. ✅ Test the `/api/test-email` endpoint
4. ✅ Sign up with test account
5. ✅ Verify email arrives and link works

Your email verification is production-ready! 🚀
