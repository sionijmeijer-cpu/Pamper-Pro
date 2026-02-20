# Azure Communication Services Email Configuration

## Overview

This project uses Azure Communication Services (ACS) for sending transactional emails (signup verification, welcome emails, etc.). All email functionality has been standardized to use a single environment variable for configuration.

## Environment Variable

### Required Configuration

Set this environment variable in your Azure Static Web Apps configuration:

```
COMMUNICATION_SERVICES_CONNECTION_STRING=endpoint=https://your-acs-resource.communication.azure.com/;accesskey=your-access-key-here
```

### How to Get Your Connection String

1. Go to Azure Portal (https://portal.azure.com)
2. Navigate to your Azure Communication Services resource
3. Click on "Keys" in the left sidebar
4. Copy the "Connection string" (either primary or secondary)
5. Add it to your Azure Static Web Apps configuration:
   - Go to your Static Web App
   - Click "Configuration" in the left sidebar
   - Click "Add" under Application settings
   - Name: `COMMUNICATION_SERVICES_CONNECTION_STRING`
   - Value: Paste your connection string
   - Click "OK" and then "Save"

### Optional Configuration

```
VERIFICATION_SENDER=donotreply@pamperpro.eu
FRONTEND_URL=https://www.pamperpro.eu
```

## Email Functions

All email functionality is centralized in `/api/lib/acsEmailClient.js`:

### 1. `sendVerificationEmail(email, token, frontendUrl)`
Sends verification email with token link to new users.

**Used in:**
- `/api/auth-signup` - After user registration
- `/api/resend-verification` - When user requests resend

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "..."
}
```

Or on failure:
```json
{
  "success": false,
  "error": "Email service is not configured. Please contact support."
}
```

### 2. `sendWelcomeEmail(email, firstName, frontendUrl)`
Sends welcome email after email verification.

**Used in:**
- `/api/verify-email` - After successful email verification

### 3. `sendEmail(options)`
Generic email sending function.

**Options:**
```javascript
{
  to: 'user@example.com',
  subject: 'Email Subject',
  html: '<html>...</html>',
  text: 'Plain text content'
}
```

## Error Handling

All email functions follow this error handling pattern:

1. **Missing Configuration:**
   - Logs clear error message with instructions
   - Returns JSON error response (does not throw)
   - API returns 500 status with user-friendly message

2. **Email Send Failure:**
   - Logs detailed error information
   - Returns JSON error response
   - For signup: User can request resend
   - For verification: Email verification still completes

3. **Never Crashes:**
   - All email operations are wrapped in try/catch
   - Failed emails never crash the API
   - User always receives a JSON response

## API Endpoints Using ACS

### POST /api/auth-signup
Creates user account and sends verification email.

**Error Response (if ACS not configured):**
```json
{
  "success": true,
  "message": "Account created! However, we could not send the verification email. Please use the resend option.",
  "emailSent": false
}
```

### POST /api/resend-verification
Resends verification email to unverified user.

**Error Response (if ACS fails):**
```json
{
  "success": false,
  "message": "We could not send the verification email. Please try again later."
}
```

### GET/POST /api/verify-email?token=...
Verifies user email and sends welcome email.

**Note:** Welcome email failure is non-critical and does not fail verification.

## Testing ACS Configuration

### 1. Check Environment Variables

Call `/api/test-env` (if available) to verify environment variables are set.

### 2. Test Signup Flow

```bash
curl -X POST https://your-app.azurestaticapps.net/api/auth-signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

**Expected Response (success):**
```json
{
  "success": true,
  "message": "Account created successfully! Please check your email to verify your account.",
  "emailSent": true
}
```

**Expected Response (ACS not configured):**
```json
{
  "success": true,
  "message": "Account created! However, we could not send the verification email. Please use the resend option.",
  "emailSent": false
}
```

### 3. Check Azure Function Logs

1. Go to Azure Portal
2. Navigate to your Static Web App
3. Click "Log Stream" to see live logs
4. Look for messages starting with `[ACS EMAIL]`

**Successful email:**
```
[ACS EMAIL] Email client initialized successfully
[ACS EMAIL] Sending email to: user@example.com
[ACS EMAIL SUCCESS] Email sent successfully
[ACS EMAIL] Message ID: ...
```

**Configuration error:**
```
[ACS EMAIL ERROR] Missing COMMUNICATION_SERVICES_CONNECTION_STRING environment variable
[ACS EMAIL ERROR] Please configure COMMUNICATION_SERVICES_CONNECTION_STRING in Azure Static Web Apps configuration
```

## Troubleshooting

### Email Not Sending

1. **Check Connection String:**
   - Verify `COMMUNICATION_SERVICES_CONNECTION_STRING` is set in Azure Static Web Apps configuration
   - Ensure there are no leading/trailing spaces
   - Verify the connection string format is correct

2. **Check ACS Resource:**
   - Ensure your ACS resource is active in Azure Portal
   - Verify you have email capabilities enabled
   - Check if you've added and verified your domain

3. **Check Sender Address:**
   - Ensure `VERIFICATION_SENDER` matches a verified domain in ACS
   - Default is `donotreply@pamperpro.eu` - must be verified in ACS

4. **Check Logs:**
   - Look for `[ACS EMAIL ERROR]` messages in Azure Function logs
   - Check for initialization errors or send failures

### User Not Receiving Email

1. **Check spam folder** - ACS emails may be filtered
2. **Verify email address** - Ensure correct email was provided
3. **Check ACS quotas** - Free tier has sending limits
4. **Use resend functionality** - User can request another verification email

## Local Development

For local testing, add to your `api/local.settings.json`:

```json
{
  "IsEncrypted": false,
  "Values": {
    "COMMUNICATION_SERVICES_CONNECTION_STRING": "endpoint=https://...;accesskey=...",
    "VERIFICATION_SENDER": "donotreply@pamperpro.eu",
    "FRONTEND_URL": "http://localhost:5173"
  }
}
```

**Note:** Never commit `local.settings.json` to git - it's in `.gitignore`.

## Security Best Practices

1. **Never hardcode connection strings** - Always use environment variables
2. **Rotate keys regularly** - ACS provides primary and secondary keys
3. **Use separate resources** - Different ACS resources for dev/staging/production
4. **Monitor usage** - Set up alerts for unusual sending patterns
5. **Validate recipients** - Always validate email addresses before sending

## Migration from Old Configuration

If you're migrating from the old `ACS_CONNECTION_STRING` variable:

1. Add new variable: `COMMUNICATION_SERVICES_CONNECTION_STRING`
2. Copy value from old `ACS_CONNECTION_STRING`
3. Save and restart your Azure Static Web App
4. Old variable can be removed after verification

The new standardized client will only use `COMMUNICATION_SERVICES_CONNECTION_STRING`.
