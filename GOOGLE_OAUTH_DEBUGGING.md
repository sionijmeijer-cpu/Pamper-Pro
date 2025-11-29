# Google OAuth Debugging Guide

## The Error: "The OAuth client was not found" (Error 401: invalid_client)

This error means Google cannot find or recognize your OAuth client. Here's the complete diagnostic and fix process.

---

## 🔍 Step 1: Verify Client ID in Azure

### Open Azure Portal:
1. Go to your Static Web App: **pamperpro**
2. Navigate to: **Settings** → **Configuration**
3. Look for: **VITE_GOOGLE_CLIENT_ID**
4. **Copy the value** and verify it matches:
   ```
   277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com
   ```

---

## 🔍 Step 2: Check Google Cloud Console

### Verify OAuth 2.0 Client:
1. Go to: [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Navigate to: **APIs & Services** → **Credentials**
4. Click your **OAuth 2.0 Client ID** (type: Web application)
5. Verify these fields:

#### ✅ Authorized JavaScript Origins:
Must include **ALL** of these:
```
http://localhost:5173
https://www.pamperpro.eu
https://pamperpro.eu
```

#### ✅ Authorized Redirect URIs:
Must include **ALL** of these:
```
http://localhost:5173
https://www.pamperpro.eu
https://pamperpro.eu
```

---

## 🔍 Step 3: Check Your Current Origin

### Open Browser DevTools (F12):
1. Go to your app at `https://www.pamperpro.eu`
2. Open **Console tab**
3. Look for this line:
   ```
   🔐 Google OAuth Configuration:
   Current origin: https://www.pamperpro.eu
   Current hostname: www.pamperpro.eu
   Client ID: 277153107226-mhp...
   ✅ Google OAuth Client ID loaded successfully: 277153107226-...
   ```

**If you see:**
- ✅ `✅ Google OAuth Client ID loaded successfully` → Client ID is correct
- ❌ `NOT SET` → Client ID not in Azure
- ❌ `Current origin: https://pamperpro.eu` → Missing `www`

---

## ❌ Problem: "www" vs no "www"

Google is **strict about origins**. You must include BOTH:

### In Google Cloud Console:
```
Authorized JavaScript Origins:
✅ https://www.pamperpro.eu
✅ https://pamperpro.eu

Authorized Redirect URIs:
✅ https://www.pamperpro.eu
✅ https://pamperpro.eu
```

### Check which origin your app uses:
- If app is at `https://www.pamperpro.eu` → must add `https://www.pamperpro.eu`
- If app is at `https://pamperpro.eu` → must add `https://pamperpro.eu`
- **To be safe: add BOTH**

---

## 🔧 Fix Checklist

### 1. ✅ Azure App Settings
In Azure Portal → Configuration:
```
Name:  VITE_GOOGLE_CLIENT_ID
Value: 277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com
```
Then: **Save** and **Restart** the app service

### 2. ✅ Google Cloud Console
**APIs & Services** → **Credentials** → Click your OAuth Client → Update these:

**Authorized JavaScript Origins** (add all):
```
http://localhost:5173
https://www.pamperpro.eu
https://pamperpro.eu
```

**Authorized Redirect URIs** (add all):
```
http://localhost:5173
https://www.pamperpro.eu
https://pamperpro.eu
```

Then: **Save**

### 3. ✅ Wait for Propagation
- Google takes **5-10 minutes** to propagate changes
- Azure takes **2-5 minutes** to update app settings
- **Wait at least 10 minutes after changes**

### 4. ✅ Hard Refresh
In your browser:
- Windows/Linux: `Ctrl+Shift+R`
- Mac: `Cmd+Shift+R`
- OR: `Ctrl+Shift+Delete` (clear cache) then refresh

### 5. ✅ Test the Sign-In Button
Click **"Sign in with Google"** and check:
- Does Google login page open? ✅ **Working!**
- Do you see "The OAuth client was not found"? ❌ **Follow steps above**
- Do you get a different error? ✅ **See Advanced Debugging below**

---

## 🔧 Advanced Debugging

### Check Console for Client ID
```javascript
// Paste this in DevTools Console:
console.log('Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
```

**Expected output:**
```
277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com
```

**If you see:**
- `undefined` → Client ID not set in Azure
- `null` → Same issue
- `'not-configured'` → Fallback value (shouldn't happen)

---

### Check All Environment Variables
```javascript
// Paste this in DevTools Console:
Object.entries(import.meta.env).forEach(([key, value]) => {
  if (key.includes('GOOGLE') || key.includes('VITE')) {
    console.log(key, ':', value);
  }
});
```

---

## 📋 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "The OAuth client was not found" | Origin not in Google Cloud | Add both `www.pamperpro.eu` and `pamperpro.eu` to Authorized Origins |
| Client ID is `undefined` | Not set in Azure | Add to Azure App Settings, save, wait 5 min, restart |
| "invalid_client" error | Wrong Client ID | Verify Client ID matches Google Cloud |
| Works locally, fails in prod | Missing origin | Add `https://www.pamperpro.eu` to Google Cloud |
| Still doesn't work after waiting | Cache issue | Hard refresh: `Ctrl+Shift+R` |

---

## 🚀 Once It Works

After the sign-in button works:
1. ✅ Google login page opens
2. ✅ You sign in with Google
3. ✅ You're redirected back to the app
4. ✅ You see your user account created

---

## 📞 Still Not Working?

1. **Take a screenshot** of the error
2. **Copy the console logs** (right-click console → Save as)
3. **Check these values match:**
   - Client ID in Azure App Settings
   - Client ID in Google Cloud Console
   - Authorized Origins in Google Cloud Console
   - Your current origin in browser console
4. **If still stuck**: DM with the console logs + screenshot

---

## 🔐 Security Note

Your Client ID is **public** - it's embedded in your frontend code. That's OK because:
- ✅ It's designed to be public
- ✅ Origins prevent misuse from other domains
- ✅ Keep your OAuth **secret** private (never share that)

