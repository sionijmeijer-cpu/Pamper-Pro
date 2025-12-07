# ACS Email Verification Troubleshooting Guide

## Diagnostic Steps

### 1. Check Azure Function Logs
1. Go to **Azure Portal** → Your Function App
2. Navigate to **Functions** → **send-verification-email**
3. Click **Monitor** tab
4. Look for recent invocations and check the logs
5. The enhanced logging will show:
   - ✅ "ACS Connection String configured: YES/NO"
   - ✅ "Email send initiated, waiting for completion..."
   - ✅ "Email sent successfully. Message ID: xxx"

### 2. Check Browser Console
1. Open your browser's **Developer Tools** (F12)
2. Go to **Console** tab
3. Try the signup flow again
4. Look for logs like:
   - "Sending verification email to: user@example.com"
   - "Email service response: {...}"
   - Any error messages starting with "ERROR:"

### 3. Verify Environment Variables in Azure
**Your Azure Function App MUST have these settings:**

Go to: **Azure Portal** → Function App → **Settings** → **Configuration**

Check that these are set:
```
ACS_CONNECTION_STRING = your-acs-connection-string
VERIFICATION_SENDER = donotreply@pamperpro.eu
FRONTEND_URL = https://pamperpro.eu (or https://your-domain.azurestaticapps.net)
DATABASE_URL = your-turso-database-url
```

### 4. Common Error Messages & Fixes

#### Error: "ACS_CONNECTION_STRING not configured"
**Problem:** Environment variable not set
**Fix:**
1. Go to Azure Portal → Function App → Configuration
2. Add `ACS_CONNECTION_STRING` with your ACS connection string
3. Click **Save**
4. Restart the function app

#### Error: "Email service not configured"
**Problem:** Same as above
**Fix:** Set the `ACS_CONNECTION_STRING` environment variable

#### Error: "Failed to send verification email" (with details)
**Problem:** ACS service issue or invalid sender email
**Fix:**
1. Verify `VERIFICATION_SENDER` is set to a verified sender in your ACS resource
2. Check that the ACS connection string is valid
3. Go to ACS resource in Azure → Email services → verify sender email is approved

#### Error: "401 Unauthorized"
**Problem:** Invalid ACS credentials
**Fix:**
1. Get your ACS connection string from Azure Portal
2. Format: `endpoint=https://xxx.communication.azure.com/;accesskey=xxx`
3. Update in Azure Function App settings

### 5. Testing the Email Function Directly

Use **Azure Portal → Function App → send-verification-email → Code + Test**:

```json
{
  "email": "test@example.com",
  "token": "test-token-12345"
}
```

Click **Run** and check:
- Status code should be 200
- Response should show: `"success": true`
- Logs should show all the diagnostic messages

### 6. ACS Sender Verification

**Your ACS resource must have a verified sender:**

1. Go to **Azure Portal** → Search for "Communication Services"
2. Select your ACS resource
3. Click **Email services** (left menu)
4. Click **Edit** under "Domains"
5. Verify that `donotreply@pamperpro.eu` is listed
6. Status should be **Verified** (not Pending)

If it shows **Pending**:
- You need to complete DNS verification
- Add the provided DNS records to your domain registrar
- Wait for verification to complete (can take 24+ hours)

### 7. Check CORS Headers
The email endpoint should return CORS headers. Check in browser Developer Tools → **Network** tab:
- Request URL: `https://your-domain/api/send-verification-email`
- Response headers should include:
  ```
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
  Access-Control-Allow-Headers: Content-Type, Authorization
  ```

## Quick Checklist

- [ ] Azure Function environment variables are set
- [ ] ACS Connection String is valid and properly formatted
- [ ] Sender email domain is verified in ACS
- [ ] Function App is deployed
- [ ] Browser console shows no CORS errors
- [ ] Azure Function logs show email send initiated
- [ ] Email appears in inbox or spam folder

## Still Not Working?

1. **Check Azure Function Logs** in real-time:
   - Azure Portal → Function App → Monitor
   - Select the function call that failed
   - Scroll through logs for error details

2. **Test with simple curl command** (from your local machine):
   ```bash
   curl -X POST https://your-domain/api/send-verification-email \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","token":"test123"}'
   ```

3. **Check Azure Static Web Apps deployment**:
   - Ensure functions are deployed (not just the frontend)
   - Check deployment logs for build errors

## Debug Mode

To get more detailed errors, temporarily add this to the function:

```typescript
// Add after ACS client initialization
context.log("ACS Client initialized successfully");
context.log("Message object:", JSON.stringify(message, null, 2));
```

This will log the exact message being sent to ACS for debugging.

---

**Need help?** Check Azure Function logs first - they contain the most detailed error information!
