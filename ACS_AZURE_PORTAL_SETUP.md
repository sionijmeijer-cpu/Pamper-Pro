# Azure Communication Services Email Setup

Your email verification is now ready to go, but you need to configure the ACS connection string in Azure Portal.

## 🔧 Required Configuration Steps

### Step 1: Get Your ACS Connection String
1. Go to **Azure Portal** → **Communication Services**
2. Select your Communication Services resource (e.g., `pamperpro-acs`)
3. Click **Settings** → **Keys**
4. Copy the **Connection string** (the full string starting with `endpoint=https://...`)

### Step 2: Add Environment Variables to Azure Static Web Apps
1. Go to **Azure Portal** → **Static Web Apps**
2. Select your app (e.g., `pamperpro`)
3. Click **Settings** → **Configuration**
4. Click **+ Add** and create these variables:

| Variable Name | Value |
|---|---|
| `ACS_CONNECTION_STRING` | Paste the connection string from Step 1 |
| `VERIFICATION_SENDER` | `donotreply@pamperpro.eu` |
| `FRONTEND_URL` | `https://www.pamperpro.eu` |

### Step 3: Verify Your Sender Email in ACS
1. Go back to **Communication Services** resource
2. Click **Email services** in the left menu
3. Select your email service (e.g., `pamperpro-email`)
4. Click **Domains**
5. Look for `pamperpro.eu` domain status

**If status is "Pending verification":**
- You need to add DNS records to your domain registrar
- Follow the on-screen instructions to add the verification records
- Wait 24-48 hours for verification to complete

**If status is "Verified" ✓:**
- Your sender email is ready!

### Step 4: Deploy Your Code
1. Commit and push your changes:
   ```bash
   git add -A
   git commit -m "Integrate ACS email verification into signup"
   git push
   ```

2. Your Azure Static Web Apps will automatically redeploy with the new code

### Step 5: Test the Email Flow
1. Go to your app and create a new account
2. Check your inbox for the verification email
3. If not arriving, check:
   - Spam/Junk folder
   - Azure Portal > Static Web Apps > **Console** (bottom of page) for error logs
   - Verify `VERIFICATION_SENDER` domain status is "Verified"

## 🐛 Troubleshooting

### Email not arriving?
1. **Check domain verification**: Is `pamperpro.eu` marked as "Verified" in ACS?
2. **Check environment variables**: Are `ACS_CONNECTION_STRING` and `VERIFICATION_SENDER` set in Azure Portal?
3. **Check logs**: Look at Azure Static Web Apps console for detailed error messages
4. **Check spam**: Email might be in Junk folder

### "Missing ACS_CONNECTION_STRING" error?
- The environment variable isn't set in Azure Portal
- Go back to Step 2 and add it

### "senderAddress not verified" error?
- Your sender email domain isn't verified in ACS
- Complete the DNS verification in Step 3

## 📋 Code Changes Summary

✅ **Created**: `api/lib/sendVerificationEmail.js` - Handles ACS email sending
✅ **Updated**: `api/auth-signup/index.js` - Calls sendVerificationEmail after user creation
✅ **Updated**: `api/local.settings.json` - Added ACS environment variables

The email verification is now integrated into your signup flow. As soon as you configure the environment variables in Azure Portal, emails will start sending!
