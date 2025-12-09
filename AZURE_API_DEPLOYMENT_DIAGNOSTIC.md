# Azure Static Web Apps API Deployment Diagnostic

## Current Status
Your API functions are configured correctly, but they're not being deployed to Azure Static Web Apps.

## Root Cause
Azure Static Web Apps may not have the proper GitHub connection or deployment token configured in your Azure Portal.

## ✅ What's Fixed
- ✅ API functions are properly structured in `/api` folder
- ✅ All endpoints have correct `function.json` bindings
- ✅ `api/package.json` has proper dependencies and scripts
- ✅ GitHub Actions workflow is correctly configured
- ✅ `staticwebapp.config.json` routes are set up

## 🔧 What You Need to Do in Azure Portal

### Step 1: Verify Azure Static Web Apps Configuration
1. Go to **Azure Portal** → **Static Web Apps**
2. Click your **"pamperpro"** or similar resource
3. Go to **Configuration** (left sidebar)
4. Verify these settings are visible:
   - **Build Presets**: Should be "Custom"
   - **App location**: `/` (root)
   - **API location**: `api`
   - **Output location**: `dist`

### Step 2: Check GitHub Deployment Connection
1. In **Azure Portal** → Your **Static Web Apps** resource
2. Go to **Deployment token** (left sidebar)
3. Copy the **Deployment Token**
4. Go to **GitHub** → Your Repository
5. Go to **Settings** → **Secrets and variables** → **Actions**
6. Check if `AZURE_STATIC_WEB_APPS_TOKEN` secret exists
7. If missing or wrong, add it:
   - Name: `AZURE_STATIC_WEB_APPS_TOKEN`
   - Value: Your deployment token from Azure Portal

### Step 3: Trigger a New Deployment
1. Go to **GitHub** → Your Repository
2. Go to **Actions** tab
3. Select the **Azure Static Web Apps CI/CD** workflow
4. Click **Run workflow** → **Run workflow**
5. Wait 5-10 minutes for deployment to complete

### Step 4: Monitor Deployment Progress
1. In **Azure Portal** → Your **Static Web Apps** resource
2. Go to **Deployment history** (left sidebar)
3. Click the latest deployment to see logs
4. Look for:
   - ✅ "Build succeeded"
   - ✅ "API build succeeded"
   - ✅ "Deployment succeeded"

If you see failures, check the logs for specific error messages.

## 🧪 Testing Your API

Once deployed, your endpoints should be live:

### Test Endpoint
```
GET https://www.pamperpro.eu/api/test-email
```

Expected Response:
```json
{
  "message": "test working from Shipper",
  "note": "ACS_CONNECTION_STRING not configured yet"
}
```

### Send Test Email (after ACS env vars are set)
```
GET https://www.pamperpro.eu/api/test-email?to=your@email.com
```

## 🚨 Common Issues

### Issue: Still Getting 404
- **Cause**: API not deployed yet
- **Fix**: Check deployment history in Azure Portal for errors
- **Alternative**: Manually redeploy by running GitHub Actions workflow

### Issue: API functions directory not found
- **Cause**: Wrong `api_location` in workflow
- **Fix**: Already set to `api` in your workflow (correct)

### Issue: Dependencies not installing
- **Cause**: `api/package.json` is missing or incorrect
- **Fix**: Already updated with proper dependencies

## 📋 Environment Variables to Set

In **Azure Portal** → **Static Web Apps** → **Configuration**:

```
ACS_CONNECTION_STRING = your-connection-string
VERIFICATION_SENDER = donotreply@pamperpro.eu
FRONTEND_URL = https://www.pamperpro.eu
TEST_EMAIL_TO = your-test@email.com (optional)
```

## 🎯 Next Steps

1. Verify GitHub deployment token is set in Azure Portal
2. Check that AZURE_STATIC_WEB_APPS_TOKEN is in GitHub Secrets
3. Manually trigger a new deployment via GitHub Actions
4. Monitor the deployment in Azure Portal
5. Test the endpoint once deployment completes
6. Add environment variables in Azure Portal Configuration
7. Try signing up - verification email should send automatically

Your API code is ready - it just needs to be deployed! 🚀
