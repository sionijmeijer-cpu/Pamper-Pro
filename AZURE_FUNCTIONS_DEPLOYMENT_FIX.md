# Azure Functions Deployment Fix - Test Email Endpoint

## ✅ What Was Fixed

### 1. Updated `api/test-email/function.json`
- Removed `route` property (Azure Static Web Apps auto-routes based on folder name)
- Changed binding from `name: "res"` to `name: "$return"`
- Added POST method support alongside GET

### 2. Updated `api/test-email/index.js`
- Fixed response format to use `context.res` instead of `return`
- Added proper `Content-Type: application/json` headers
- Changed body format from stringified JSON to object (Azure handles serialization)

## 🚀 How Azure Static Web Apps Routes Functions

Azure Static Web Apps automatically maps function folders to API routes:
- Folder: `api/test-email/` → Route: `/api/test-email`
- Folder: `api/auth-signup/` → Route: `/api/auth-signup`
- Folder: `api/verify-email/` → Route: `/api/verify-email`

## 🧪 Testing Your Endpoint

### Step 1: Basic Test (Without Email Sending)
Visit: `https://www.pamperpro.eu/api/test-email`

**Expected Response:**
```json
{
  "message": "test working from Shipper",
  "note": "ACS_CONNECTION_STRING not configured yet"
}
```

### Step 2: Configure Environment Variables in Azure Portal
1. Go to Azure Portal → Your Static Web App
2. Click **Configuration** in left menu
3. Add these Application Settings:
   - `ACS_CONNECTION_STRING` - Your Azure Communication Services connection string
   - `VERIFICATION_SENDER` - `donotreply@pamperpro.eu`
   - `FRONTEND_URL` - `https://www.pamperpro.eu`
   - `TEST_EMAIL_TO` - Your test email address (optional)

### Step 3: Send Test Email
Visit: `https://www.pamperpro.eu/api/test-email?to=your@email.com`

**Expected Response:**
```json
{
  "success": true,
  "message": "Test email sent successfully!",
  "to": "your@email.com",
  "from": "donotreply@pamperpro.eu",
  "messageId": "...",
  "status": "..."
}
```

## 📧 Verification Email Integration

Your `api/auth-signup/index.js` is already integrated to send verification emails automatically after user creation.

**Flow:**
1. User signs up → `POST /api/auth-signup`
2. User created in database with `verification_token`
3. `sendVerificationEmail()` called with email and token
4. Email sent with link: `https://www.pamperpro.eu/verify-email?token=...`
5. User clicks link → `GET /api/verify-email?token=...`
6. Account marked as verified

## 🔍 Debugging 404 Errors

If you still get 404 errors after deployment:

### Check #1: Azure Functions Runtime Version
In Azure Portal → Configuration → Function runtime settings:
- Should be **~4** (Node.js 18+)

### Check #2: GitHub Actions Workflow
Your workflow should have:
```yaml
api_location: "api"
```

### Check #3: Package.json in API Folder
Ensure `api/package.json` exists with `@azure/communication-email` dependency.

### Check #4: Function App Logs
In Azure Portal → Your Static Web App → Functions → Monitor
- Check if function is detected and deployed
- Look for startup errors

## 🔧 Common Issues

### Issue: "Cannot find module '@azure/communication-email'"
**Solution:** Ensure `api/package.json` includes the dependency and redeploy.

### Issue: Email not arriving
**Solution:** 
1. Check Azure Portal logs for email sending errors
2. Verify sender domain is verified in Azure Communication Services
3. Check spam folder
4. Test with `/api/test-email?to=your@email.com`

### Issue: Still getting 404
**Solution:**
1. Push code to GitHub
2. Wait for GitHub Actions deployment to complete (check Actions tab)
3. Clear browser cache and try again
4. Check Azure Portal → Static Web App → Functions (should list test-email)

## ✨ Next Steps

1. **Commit and push** your code changes
2. **Wait** for GitHub Actions to deploy (usually 2-5 minutes)
3. **Test** the endpoint: `https://www.pamperpro.eu/api/test-email`
4. **Configure** environment variables in Azure Portal
5. **Send** test email: `https://www.pamperpro.eu/api/test-email?to=your@email.com`
6. **Try signup** to test automatic verification emails

Your backend is now properly configured for Azure Static Web Apps! 🎉
