# Production Environment Setup for PamperPro (Azure Static Web Apps)

## Overview
This guide ensures `VITE_GOOGLE_CLIENT_ID` is properly configured in your Azure production environment.

---

## Step 1: Verify Your Google OAuth Client ID

Your current Client ID: `277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com`

Verify it in Google Cloud Console:
1. Go to https://console.cloud.google.com/
2. **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID (Web application)
4. Copy the **Client ID**

---

## Step 2: Add VITE_GOOGLE_CLIENT_ID to Azure App Settings

### Via Azure Portal (Easiest):

1. Go to **Azure Portal** (https://portal.azure.com/)
2. Find your Static Web App: `pamperpro`
3. Click **Settings** → **Configuration** (left sidebar)
4. Click **+ Add** to add new application setting:
   - **Name:** `VITE_GOOGLE_CLIENT_ID`
   - **Value:** `277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com`
5. Click **Save**
6. **⏳ IMPORTANT:** Wait **2-5 minutes** for changes to propagate

### Via Azure CLI (Alternative):

```bash
az staticwebapp appsettings set \
  --resource-group <YOUR_RESOURCE_GROUP> \
  --name pamperpro \
  --setting-names VITE_GOOGLE_CLIENT_ID=277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com
```

---

## Step 3: Verify Google Cloud Console Configuration

### Authorized JavaScript Origins:

1. Go to https://console.cloud.google.com/
2. **APIs & Services** → **Credentials**
3. Click your OAuth 2.0 Client ID
4. Under **Authorized JavaScript origins**, verify these are present:
   - ✅ `https://www.pamperpro.eu`
   - ✅ `https://pamperpro.eu` (if not HTTPS-redirected)

### Authorized Redirect URIs:

Under **Authorized redirect URIs**, verify:
   - ✅ `https://www.pamperpro.eu`
   - ✅ `https://www.pamperpro.eu/`
   - ✅ `https://pamperpro.eu` (if not HTTPS-redirected)

If any are missing:
1. Click **Edit**
2. Add the missing URIs
3. Click **Save**
4. **⏳ Wait 2-5 minutes** for Google to propagate changes

---

## Step 4: Verify the Build Configuration

Your app reads from environment variables during build:

```typescript
// src/main.tsx
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log('Google client in use:', clientId);
// GoogleOAuthProvider receives clientId
<GoogleOAuthProvider clientId={clientId || 'not-configured'}>
```

The `VITE_` prefix tells Vite to inject the variable at **build time**.

---

## Step 5: Deploy and Test

### Deploy to Azure:

```bash
# Push to your repository (GitHub/Azure DevOps)
git add .
git commit -m "Configure Google OAuth for production"
git push origin main
```

Azure will automatically:
1. Build your app with `VITE_GOOGLE_CLIENT_ID` from App Settings
2. Deploy to `https://www.pamperpro.eu`

### Test Google Sign-In:

1. Wait for deployment to complete (check Azure Portal)
2. Go to https://www.pamperpro.eu
3. Click **"Sign in with Google"**
4. You should see Google's login page

### Debug if Needed:

1. Open **DevTools** (F12)
2. Go to **Console** tab
3. Look for:
   ```
   🔐 Google OAuth Configuration:
   Environment: production
   Client ID: 277153107226-mhp...
   ✅ Google OAuth Client ID loaded successfully
   ```

If you see `NOT SET` or `not-configured`, the env variable didn't propagate. Wait a bit longer and refresh.

---

## Troubleshooting

### Error: "The OAuth client was not found"

**Cause:** `VITE_GOOGLE_CLIENT_ID` is not set in Azure App Settings

**Solution:**
1. Go to Azure Portal
2. Add `VITE_GOOGLE_CLIENT_ID` to App Settings (see Step 2)
3. Wait 5 minutes
4. Refresh the page (Ctrl+Shift+R)

### Error: "redirect_uri_mismatch"

**Cause:** `https://www.pamperpro.eu` is not in Google Cloud authorized URIs

**Solution:**
1. Go to Google Cloud Console
2. Add `https://www.pamperpro.eu` to authorized redirect URIs (see Step 3)
3. Wait 5 minutes
4. Refresh (Ctrl+Shift+R)

### Still Not Working?

1. **Hard refresh** your browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Clear browser cache** (DevTools → Network tab → "Disable cache")
3. **Check Azure deployment status** - wait for green checkmark
4. **Verify App Settings are saved** - reload Azure Portal page
5. **Check deployment logs** - Azure Portal → Deployment tab

---

## Local Development Setup

To test locally with your production Client ID:

1. Create `.env` file (git-ignored):
   ```
   VITE_GOOGLE_CLIENT_ID=277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com
   ```

2. In Google Cloud Console, also add local origins:
   - **Authorized JavaScript origins:** `http://localhost:5173`
   - **Authorized redirect URIs:** `http://localhost:5173`

3. Run locally: `npm run dev`

4. Test at `http://localhost:5173`

---

## Summary

✅ **You've done:**
1. Got Google Client ID: `277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com`
2. Updated code to read from `import.meta.env.VITE_GOOGLE_CLIENT_ID`
3. Verified Google Cloud Console has correct URIs

🔄 **You need to do:**
1. Add `VITE_GOOGLE_CLIENT_ID` to Azure App Settings (see Step 2)
2. Wait 5 minutes for propagation
3. Deploy (git push) or redeploy existing build
4. Test at https://www.pamperpro.eu

---

## Need Help?

Check these files for more info:
- `GOOGLE_OAUTH_SETUP.md` - General OAuth setup
- `.env.example` - Environment variable template
- `src/main.tsx` - Where Client ID is loaded
- `src/vite-env.d.ts` - TypeScript declarations
