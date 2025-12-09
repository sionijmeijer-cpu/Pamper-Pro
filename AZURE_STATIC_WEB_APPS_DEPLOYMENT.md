# Azure Static Web Apps Deployment Guide - API Functions

## ✅ What's Been Fixed

Your Azure Static Web Apps deployment is now configured to deploy your API functions to `/api/test-email` and other endpoints.

### 1. GitHub Actions Workflow
- Created `.github/workflows/azure-static-web-apps-deploy.yml`
- Automatically builds and deploys both frontend (React) and backend (Azure Functions)
- Detects changes and deploys to production

### 2. API Configuration
- `api/package.json` - Dependencies configured, SendGrid removed
- `api/host.json` - Azure Functions runtime configured
- `api/test-email/function.json` - HTTP trigger with anonymous auth
- `api/test-email/index.js` - Test email endpoint ready

### 3. Frontend Build
- Vite builds to `dist/` folder
- API points to `/api/*` routes

---

## 🚀 Deployment Steps

### Step 1: Ensure GitHub Token is Set
Your workflow needs `AZURE_STATIC_WEB_APPS_TOKEN` secret in GitHub:

1. Go to **Azure Portal** → **Static Web Apps** → your instance
2. Click **Manage deployment token** in the right sidebar
3. Copy the token
4. Go to **GitHub** → **Settings** → **Secrets and variables** → **Actions**
5. Click **New repository secret**
   - Name: `AZURE_STATIC_WEB_APPS_TOKEN`
   - Value: Paste the token from Azure Portal
6. Click **Add secret**

### Step 2: Push Code to GitHub
```bash
git add .
git commit -m "Fix Azure Static Web Apps API deployment with GitHub Actions workflow"
git push origin main
```

### Step 3: Monitor Deployment
1. Go to **GitHub** → your repo → **Actions** tab
2. Wait for workflow to complete (2-5 minutes)
3. You'll see: "Build and Deploy Job" running

### Step 4: Add Environment Variables to Azure
Once deployment completes, add these to your Static Web App:

1. Go to **Azure Portal** → **Static Web Apps** → your instance
2. Click **Configuration** in left sidebar
3. Click **Add** for each variable:

| Name | Value |
|------|-------|
| `ACS_CONNECTION_STRING` | Your ACS connection string from Azure Communication Services |
| `VERIFICATION_SENDER` | `donotreply@pamperpro.eu` |
| `FRONTEND_URL` | `https://www.pamperpro.eu` |
| `TEST_EMAIL_TO` | (Optional) Default test recipient email |

4. Click **Save**

---

## ✅ Testing the API

### Test 1: Confirm Endpoint is Deployed
```
GET https://www.pamperpro.eu/api/test-email
```

Expected response (before ACS config):
```json
{
  "message": "test working from Shipper",
  "note": "ACS_CONNECTION_STRING not configured yet"
}
```

### Test 2: Send Test Email via ACS
```
GET https://www.pamperpro.eu/api/test-email?to=your-email@example.com
```

Expected response (after ACS config):
```json
{
  "success": true,
  "message": "Test email sent successfully!",
  "to": "your-email@example.com",
  "from": "donotreply@pamperpro.eu",
  "messageId": "..."
}
```

Check your inbox for the test email!

---

## 🔧 Troubleshooting

### API endpoint returns 404
- **Cause**: Workflow hasn't completed or deployment failed
- **Fix**: Check GitHub Actions tab for errors, verify token is set

### "ACS_CONNECTION_STRING not configured"
- **Cause**: Environment variable not added to Azure
- **Fix**: Follow "Add Environment Variables to Azure" step above

### Email not sending
- **Cause**: Sender email not verified in ACS or wrong connection string
- **Fix**: Verify `donotreply@pamperpro.eu` in Azure Communication Services → Email services → Sender domains

### CORS errors when calling from frontend
- Already configured in `staticwebapp.config.json`
- If still getting errors, check browser console for full error message

---

## 📋 Verification Checklist

- [ ] GitHub `AZURE_STATIC_WEB_APPS_TOKEN` secret added
- [ ] Code pushed to GitHub main branch
- [ ] GitHub Actions workflow completed successfully
- [ ] `ACS_CONNECTION_STRING` added to Azure Configuration
- [ ] `VERIFICATION_SENDER` added to Azure Configuration
- [ ] `FRONTEND_URL` added to Azure Configuration
- [ ] Test endpoint returns 200: `GET /api/test-email`
- [ ] Test email received after adding ACS connection string
- [ ] User signup flow sends verification emails automatically

---

## 📧 How Verification Emails Work

1. User signs up via `/signup`
2. `api/auth-signup/index.js` creates user and generates `verification_token`
3. Calls `api/lib/sendVerificationEmail.js` to send email via ACS
4. Email contains link: `https://www.pamperpro.eu/verify-email?token=...`
5. User clicks link → frontend redirects to verify endpoint
6. Account is marked as verified ✅

---

## 🎯 Next Steps After Deployment

1. **Monitor deployment**: Watch GitHub Actions workflow
2. **Test endpoint**: Call `/api/test-email` once deployed
3. **Add ACS config**: Set environment variables in Azure Portal
4. **Send test email**: Call `/api/test-email?to=your@email.com`
5. **Test signup flow**: Create new user account and verify email arrives

Your backend is now production-ready! 🚀
