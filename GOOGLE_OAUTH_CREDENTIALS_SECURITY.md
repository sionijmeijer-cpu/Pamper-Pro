# 🔐 Google OAuth Credentials Security

## ⚠️ CRITICAL SECURITY POLICY

**Google OAuth credentials MUST NEVER be stored in local `.env` files.**

---

## ✅ Correct Setup

### Local Development (`.env`)
```bash
# ✅ Database only - NO Google OAuth credentials
VITE_TURSO_DATABASE_URL=libsql://...
VITE_TURSO_AUTH_TOKEN=...
```

### Production (Azure Static Web App - App Settings ONLY)
```
VITE_GOOGLE_CLIENT_ID = 277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com
```

---

## 🔐 Why This Matters

1. **Git Security** - Local `.env` files might be accidentally committed
2. **Credential Isolation** - Production credentials are never in source control
3. **Environment Separation** - Local dev and production are completely isolated
4. **Team Security** - Developers don't need production OAuth credentials

---

## 📋 Verified Setup

✅ `.env` - Only contains database credentials (checked into Git)
✅ `.env.example` - Template showing what credentials are needed where
✅ `src/vite-env.d.ts` - Declares `VITE_GOOGLE_CLIENT_ID` as optional
✅ `src/main.tsx` - Reads Client ID from `import.meta.env.VITE_GOOGLE_CLIENT_ID`
✅ Azure Static Web App - `VITE_GOOGLE_CLIENT_ID` set in App Settings

---

## 🚀 How It Works

### Local Development
- App runs with `VITE_GOOGLE_CLIENT_ID = undefined`
- Google Sign-In button shows friendly error message
- Users can still sign in with email/password

### Production (Azure)
- Azure App Settings inject `VITE_GOOGLE_CLIENT_ID` at build time
- Build process includes the environment variable
- Google Sign-In works normally

---

## ⚠️ IF You Accidentally Added Credentials Locally

If you ever added Google OAuth credentials to `.env`:

1. **Remove them immediately**
2. Run: `git rm --cached .env` (don't delete the file locally)
3. Update `.gitignore` to ensure `.env` is ignored
4. Create a new issue in Google Cloud Console to rotate the Client Secret
5. Commit the changes

**The current repository is CLEAN - no credentials are stored in Git.**

---

## 🔗 References

- [Azure Static Web Apps - Environment Variables](https://learn.microsoft.com/en-us/azure/static-web-apps/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Google OAuth Security Best Practices](https://developers.google.com/identity/protocols/oauth2/security-best-practices)
