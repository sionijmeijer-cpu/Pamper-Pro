# Google OAuth Setup Guide for PamperPro

## Problem
Your app is showing: `Error 401: invalid_client - The OAuth client was not found.`

This happens because:
1. ✅ Your app is correctly reading from `import.meta.env.VITE_GOOGLE_CLIENT_ID`
2. ❌ But the `.env` file is **missing** the `VITE_GOOGLE_CLIENT_ID` variable
3. ❌ So it's using the fallback: `'YOUR_GOOGLE_CLIENT_ID'` which is invalid

---

## Solution: Add Google OAuth Client ID

### Step 1: Get Your Google Client ID from Google Cloud Console

**If you already have a Google Cloud Project:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **Credentials** (left sidebar)
4. Find your **OAuth 2.0 Client ID** for "Web application"
5. Click on it and copy the **Client ID** (looks like: `1234567890-abcdef.apps.googleusercontent.com`)

**If you DON'T have one, create it:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **+ Create Credentials** → **OAuth 2.0 Client IDs**
5. Choose **Web application**
6. Add authorized redirect URIs (see below)
7. Click **Create**
8. Copy your **Client ID**

---

### Step 2: Configure Authorized Redirect URIs in Google Cloud Console

For **https://www.pamperpro.eu**, you need to add these URIs:

```
https://www.pamperpro.eu
https://www.pamperpro.eu/
```

**Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Click on your **OAuth 2.0 Client ID** (Web application)
4. Under **Authorized redirect URIs**, add:
   - `https://www.pamperpro.eu`
   - `https://www.pamperpro.eu/`
5. Click **Save**

---

### Step 3: Add Client ID to Your Environment Variables

#### For Local Development:

Add to `.env`:
```
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
```

Example:
```
VITE_GOOGLE_CLIENT_ID=1234567890-abcdef.apps.googleusercontent.com
```

#### For Production (Azure Static Web App):

1. Go to **Azure Portal**
2. Select your **Static Web App** resource
3. Go to **Configuration** (left sidebar)
4. Click **Application settings**
5. Add new setting:
   - **Name:** `VITE_GOOGLE_CLIENT_ID`
   - **Value:** `YOUR_CLIENT_ID_HERE`
6. Click **Save**
7. Wait 2-3 minutes for changes to deploy

---

## How It Works

Your app now uses:
```typescript
// src/main.tsx
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
```

The `import.meta.env.VITE_GOOGLE_CLIENT_ID` reads from:
- ✅ `.env` file (local development)
- ✅ Azure App Settings (production)

---

## Files That Use Google OAuth

These files handle Google authentication:
- `src/main.tsx` - Initializes GoogleOAuthProvider
- `src/components/LoginForm.tsx` - Google sign-in button for clients
- `src/components/ClientSignupForm.tsx` - Google sign-up for new clients
- `src/components/BusinessAuthModal.tsx` - Google auth for professionals

---

## Testing

**Local Development:**
1. Update `.env` with your Client ID
2. Add `http://localhost:5173` to Google Cloud Console authorized URIs
3. Run the app locally
4. Test Google sign-in

**Production:**
1. Add Client ID to Azure App Settings
2. Ensure `https://www.pamperpro.eu` is in Google Cloud Console authorized URIs
3. Deploy and test

---

## Troubleshooting

### Error: "invalid_client"
- ✅ Check Client ID is correct in `.env` or Azure App Settings
- ✅ Check `https://www.pamperpro.eu` is in Google Cloud authorized URIs

### Error: "redirect_uri_mismatch"
- ✅ Make sure `https://www.pamperpro.eu` is in authorized redirect URIs
- ✅ Exact match required (including trailing slash variants)

### Error: "client_id mismatch"
- ✅ Client ID must be for "Web application" type, not desktop/mobile

---

## Next Steps

1. ✅ Get your Google Client ID from Google Cloud Console
2. ✅ Add authorized URIs for `https://www.pamperpro.eu`
3. ✅ Add `VITE_GOOGLE_CLIENT_ID` to Azure App Settings
4. ✅ Deploy
5. ✅ Test Google sign-in at https://www.pamperpro.eu
