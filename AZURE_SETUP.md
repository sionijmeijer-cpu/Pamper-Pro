# Azure Static Web Apps Setup Guide for Pamper Pro

## 1. Database Setup

### Create PostgreSQL Database (Neon)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy your connection string (looks like: `postgresql://user:password@host/dbname`)
4. Run the initialization script locally to create tables:

```bash
# In your local environment
POSTGRES_CONNECTION_STRING="your-neon-connection-string" node api/lib/init-db.js
```

This will create:
- `users` table with all required fields
- Indexes for fast queries

## 2. SendGrid Email Setup

### Get SendGrid API Key

1. Go to [SendGrid](https://sendgrid.com)
2. Sign up or log in
3. Navigate to **Settings > API Keys**
4. Create a new API key (give it a name like "Pamper Pro API")
5. Copy the key (starts with `SG.`)

### Verify Sender Email

1. In SendGrid, go to **Settings > Sender Authentication**
2. Add and verify your sender email (e.g., `noreply@pamperpro.eu`)
3. Follow SendGrid's verification process

## 3. Azure Static Web Apps Configuration

### Set Environment Variables

In Azure Portal:

1. Go to **Static Web Apps > Pamper Pro**
2. Click **Settings > Configuration**
3. Add these Application Settings:

```
POSTGRES_CONNECTION_STRING = postgresql://user:password@host/dbname
DATABASE_URL = postgresql://user:password@host/dbname
SENDGRID_API_KEY = SG.xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM = noreply@pamperpro.eu
NODE_ENV = production
```

### Deploy

Once environment variables are set:

```bash
git push origin main
```

GitHub Actions will automatically:
1. Build the frontend
2. Deploy to Azure Static Web Apps
3. Deploy backend functions to `/api/*`

## 4. Verify Deployment

After deployment, test the signup endpoint:

```bash
curl -X POST https://your-app.azurestaticapps.net/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "SecurePassword123!"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "User created successfully. Welcome email sent.",
  "user": {
    "id": 1,
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com"
  }
}
```

## 5. Troubleshooting

### 500 Error on Signup

**Check Azure Function Logs:**
1. Azure Portal > Static Web App > Functions
2. Click **Monitor** to view real-time logs
3. Look for error details

**Common Issues:**

| Error | Solution |
|-------|----------|
| "POSTGRES_CONNECTION_STRING not set" | Add it to Application Settings |
| "SENDGRID_API_KEY not set" | Add it to Application Settings |
| "email already exists" | User account already created - try different email |
| "Invalid connection string" | Verify Neon connection string format |

### Email Not Sending

1. Verify SendGrid API key is correct
2. Verify sender email is verified in SendGrid
3. Check Azure Function logs for SendGrid errors
4. Check spam folder for test emails

### Database Connection Issues

1. Verify POSTGRES_CONNECTION_STRING in Azure Settings
2. Check Neon database is running
3. Verify IP whitelist (Neon allows all IPs by default)
4. Test connection locally first

## 6. Local Development

### Run Backend Functions Locally

```bash
# Install Azure Functions Core Tools
# macOS: brew tap azure/tap && brew install azure-functions-core-tools@4
# Windows: https://go.microsoft.com/fwlink/?linkid=2135274

# Set environment variables
export POSTGRES_CONNECTION_STRING="your-connection-string"
export SENDGRID_API_KEY="your-sendgrid-key"
export EMAIL_FROM="noreply@pamperpro.eu"

# Start local functions
func start
```

Functions will be available at: `http://localhost:7071/api/*`

### Frontend + Backend Together

```bash
# Terminal 1: Frontend (port 5173)
npm run dev

# Terminal 2: Backend (port 7071)
cd api
func start
```

Frontend will call `http://localhost:7071/api/auth/signup` automatically.

## 7. Security Checklist

- ✅ Never commit `.env` files or API keys
- ✅ Use Azure Application Settings for all secrets
- ✅ Use HTTPS only (Azure provides this automatically)
- ✅ Passwords are bcrypt-hashed before storage
- ✅ SendGrid API key is never exposed to frontend
- ✅ Database connection string is server-side only

## 8. Next Steps

After setup is complete:

1. Test signup flow end-to-end
2. Monitor Azure Function logs for errors
3. Set up email templates in SendGrid for marketing emails
4. Add login endpoint at `/api/auth/login`
5. Add password reset flow
