# 🔧 Google OAuth Production Troubleshooting Guide

## 📋 Your Configuration

**Client ID:** `277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com`
**Domain:** `https://www.pamperpro.eu`

---

## 🚀 Step 1: Verify Azure App Settings (CRITICAL)

### In Azure Portal:

1. Go to: **Azure Portal** → Search for **"pamperpro"** (your Static Web App)
2. Click on it
3. In the left sidebar, click **Configuration**
4. Look for: **Application Settings** section
5. **Must see:** `VITE_GOOGLE_CLIENT_ID` = `277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com`

### ⚠️ If Not Present:

1. Click **+ Add**
2. **Name:** `VITE_GOOGLE_CLIENT_ID`
3. **Value:** `277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com`
4. Click **OK**
5. Click **Save** at top of page
6. **⏳ WAIT 5 MINUTES** before testing - Azure needs time to propagate

---

## 🚀 Step 2: Verify Google Cloud Console Configuration

### Navigate to Google Cloud Console:

1. Go to: https://console.cloud.google.com
2. Select your project
3. Go to: **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID: `277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com`

### ✅ Check These Settings:

**Authorized JavaScript Origins** should include:
- ✅ `https://www.pamperpro.eu`
- ✅ `https://pamperpro.eu`
- ✅ `http://localhost:5173` (for local development)

**Authorized Redirect URIs** should include:
- ✅ `https://www.pamperpro.eu`
- ✅ `https://pamperpro.eu`
- ✅ `http://localhost:5173` (for local development)

### ⚠️ If Missing:

1. Add each missing origin/URI
2. Click **Save**
3. **⏳ WAIT 2-5 MINUTES** for propagation

---

## 🔍 Step 3: Test in Browser (Open DevTools)

### In Your Browser:

1. Go to: **https://www.pamperpro.eu**
2. Press **F12** to open Developer Tools
3. Click **Console** tab
4. Look for this output (scroll up to see it):

```
═══════════════════════════════════════════════
🔐 Google OAuth Configuration
═══════════════════════════════════════════════
Environment: production
Current origin: https://www.pamperpro.eu
Current hostname: www.pamperpro.eu
✅ Client ID Source: Environment Variable (VITE_GOOGLE_CLIENT_ID)
✅ Client ID (first 50 chars): 277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.goo...
✅ Client ID (full length): 83 characters
✅ Google OAuth Client ID loaded successfully
✅ Ready to initialize GoogleOAuthProvider with valid Client ID
═══════════════════════════════════════════════
```

### ⚠️ If You See These Messages Instead:

**Message:** `❌ CRITICAL: Google OAuth Client ID is NOT SET`
- **Problem:** Azure App Setting not configured
- **Fix:** Go back to Step 1 and add the setting
- **Then:** Hard refresh page (Ctrl+Shift+R) and wait 5 minutes

**Message:** `❌ CRITICAL: Google OAuth Client ID is using a placeholder value`
- **Problem:** Client ID is `YOUR_GOOGLE_CLIENT_ID` or `not-configured`
- **Fix:** Go back to Step 1 and verify the exact value

---

## 🚀 Step 4: Test Google Sign-In Button

1. **Hard refresh** your page: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. **Click** the **"Sign in with Google"** button
3. **Expected:** Google's login page should open
4. **If Error:** Note the exact error message and check Step 5

---

## 🐛 Step 5: Common Errors and Fixes

### Error: "The OAuth client was not found"
**Cause:** Google doesn't recognize your origin
**Fix:**
1. Verify origin is in Google Cloud Console: `https://www.pamperpro.eu`
2. Check exact spelling (no typos, check www vs no-www)
3. Hard refresh page
4. Wait 5 minutes for Google to recognize the origin

### Error: "Error 401: invalid_client"
**Cause:** Client ID is wrong or missing
**Fix:**
1. Check Azure App Settings (Step 1)
2. Verify Client ID is: `277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com`
3. No typos, copy-paste the exact value
4. Wait 5 minutes after updating Azure settings

### Error: "Failed to load gsi client"
**Cause:** Google's script (`accounts.google.com/gsi/client`) can't load
**Fix:**
1. Check internet connection
2. Check if you're behind a corporate firewall/VPN blocking Google domains
3. Try from different network
4. Check console for CORS errors

### Error: "Client ID is in the wrong format"
**Cause:** Client ID is malformed or incomplete
**Fix:**
1. Copy exact Client ID: `277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com`
2. Verify no extra spaces before/after
3. Check Azure portal that value is correct

---

## ✅ Verification Checklist

Before assuming it's broken, verify all of these:

- [ ] Azure App Setting `VITE_GOOGLE_CLIENT_ID` is set to the correct value
- [ ] Waited 5 minutes after updating Azure settings
- [ ] Google Cloud origin includes `https://www.pamperpro.eu`
- [ ] Hard refreshed the page (Ctrl+Shift+R)
- [ ] DevTools console shows "✅ Google OAuth Client ID loaded successfully"
- [ ] No typos in Client ID
- [ ] Using `https://www.pamperpro.eu` (not localhost, not IP address)
- [ ] Google script loads (no CORS errors in console)

---

## 📞 If Still Not Working

**Provide this information:**

1. Screenshot of Azure Portal → Static Web App → Configuration showing `VITE_GOOGLE_CLIENT_ID`
2. Exact error message from browser console (F12)
3. Output from console showing Client ID check (scroll up to see)
4. URL you're visiting (should be `https://www.pamperpro.eu`)
5. Browser and OS you're using

This will help diagnose the exact issue.

---

## 🔄 Code Implementation Reference

All Google OAuth code is centralized:

**File:** `src/main.tsx`
```typescript
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// ... comprehensive logging
<GoogleOAuthProvider clientId={clientId}>
```

**File:** `src/components/AuthModal.tsx`
```typescript
<GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => setSignInError("Google sign-in failed")}
  text="signin_with"
  width="300"
/>
```

No hardcoded Client IDs anywhere.
