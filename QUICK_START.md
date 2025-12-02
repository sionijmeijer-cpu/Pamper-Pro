# Pamper Pro - Quick Start Setup

## ⚡ 5-Minute Setup Checklist

### Step 1: Get Your Database URL
- [ ] Sign up at [neon.tech](https://neon.tech)
- [ ] Create a project
- [ ] Copy connection string: `postgresql://...`

### Step 2: Get SendGrid API Key
- [ ] Sign up at [SendGrid](https://sendgrid.com)
- [ ] Create API Key (Settings > API Keys)
- [ ] Copy key: `SG.xxxxx...`
- [ ] Verify sender email in SendGrid (Settings > Sender Authentication)

### Step 3: Initialize Database
```bash
POSTGRES_CONNECTION_STRING="your-connection-string" node api/lib/init-db.js
```

This creates the `users` table automatically.

### Step 4: Set Azure Environment Variables

Go to **Azure Portal** → **Static Web App** → **Settings** → **Configuration**

Add these Application Settings:

| Key | Value |
|-----|-------|
| `POSTGRES_CONNECTION_STRING` | Your Neon connection string |
| `DATABASE_URL` | Your Neon connection string |
| `SENDGRID_API_KEY` | Your SendGrid API key |
| `EMAIL_FROM` | `noreply@pamperpro.eu` |
| `NODE_ENV` | `production` |

### Step 5: Deploy
```bash
git push origin main
```

GitHub Actions will deploy automatically. Wait 2-3 minutes for deployment to complete.

## 🧪 Test Signup

After deployment:

```bash
curl -X POST https://your-app.azurestaticapps.net/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "User created successfully. Welcome email sent.",
  "user": { "id": 1, "email": "john@example.com" }
}
```

## 🐛 Troubleshooting 500 Error

**Check logs:**
1. Azure Portal → Static Web App → Functions
2. Click **Monitor** tab
3. Look at recent invocations and error messages

**Most common causes:**
- Missing environment variables (check Azure Settings)
- Database not initialized (run init-db.js script locally)
- Invalid connection string format
- SendGrid API key not set

**Test locally first:**
```bash
export POSTGRES_CONNECTION_STRING="your-connection-string"
export SENDGRID_API_KEY="your-api-key"
export EMAIL_FROM="noreply@pamperpro.eu"

cd api
func start
```

Then test: `curl http://localhost:7071/api/auth/signup ...`

## 📁 Project Structure

```
pamper-pro/
├── api/                          # Azure Functions backend
│   ├── auth-signup/              # Signup endpoint
│   ├── db-execute/               # Database operations
│   ├── lib/
│   │   ├── email.js              # SendGrid integration
│   │   ├── db.js                 # Database helpers
│   │   ├── password.js           # Password hashing
│   │   └── init-db.js            # Database initialization
│   ├── host.json
│   ├── package.json
│   └── [other functions...]
├── src/                          # React frontend
│   ├── pages/
│   │   ├── ClientSignup.tsx      # Signup page
│   │   └── [other pages...]
│   ├── context/AuthContext.tsx   # Auth logic
│   └── [other frontend...]
├── AZURE_SETUP.md               # Full setup guide
└── .github/workflows/            # GitHub Actions (auto-deployment)
```

## 🔐 Security Notes

- Passwords are bcrypt-hashed server-side
- API keys never sent to frontend
- Use HTTPS only (Azure provides automatically)
- Never commit `.env` or API keys to GitHub
- All secrets stored in Azure Application Settings

## 📞 Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/signup` | Create new user account |
| POST | `/api/db-execute` | Generic database operations |

## Next Steps

After setup works:
- [ ] Test signup → receive email
- [ ] Add login endpoint `/api/auth/login`
- [ ] Add password reset flow
- [ ] Set up custom email templates in SendGrid
- [ ] Add email verification (optional)

---

Full setup details in `AZURE_SETUP.md`
