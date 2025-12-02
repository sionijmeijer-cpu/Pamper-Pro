# Azure Static Web Apps - Environment Setup Guide

## 🔧 Step 1: Configure Application Settings in Azure Portal

Go to your Azure Static Web App → **Settings** → **Configuration** → **Application Settings**

Add these environment variables:

### Database Connection
```
POSTGRES_CONNECTION_STRING = postgresql://user:password@host.neon.tech/database?sslmode=require
DATABASE_URL = postgresql://user:password@host.neon.tech/database?sslmode=require
```

### Email Service (SendGrid)
```
SENDGRID_API_KEY = SG.xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM = noreply@pamperpro.eu
```

## 🔍 Step 2: Get Your Connection Strings

### Neon PostgreSQL
1. Go to https://console.neon.tech
2. Select your project
3. Copy the connection string under "Connection string" → "Pooled connection"
4. Format: `postgresql://user:password@host.neon.tech/database?sslmode=require`

### SendGrid API Key
1. Go to https://app.sendgrid.com/settings/api_keys
2. Create a new API key
3. Copy the full key (starts with `SG.`)

## ✅ Step 3: Verify Azure Configuration

After setting environment variables, test the signup endpoint:

```bash
curl -X POST https://your-app.azurestaticapps.net/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "SecurePassword123!",
    "phone": "+1234567890",
    "smsNotifications": true,
    "promoCode": "WELCOME"
  }'
```

Expected success response:
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": 1,
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com"
  }
}
```

## 🚨 Troubleshooting 500 Errors

### Issue: Connection string not found
**Solution:** Make sure `POSTGRES_CONNECTION_STRING` is set in Azure Application Settings (not .env)

### Issue: SendGrid API key not found
**Solution:** Make sure `SENDGRID_API_KEY` is set in Azure Application Settings

### Issue: Database table doesn't exist
**Solution:** Run the initialization script:
```bash
POSTGRES_CONNECTION_STRING="your-string" node api/lib/init-db.js
```

### Issue: Still getting 500?
Check Azure Function logs:
1. Go to Azure Portal → Your Static Web App
2. Click **Functions** in left sidebar
3. Click **Monitor**
4. View logs for the error details

## 🔐 Security Notes

- **Never commit .env files** to GitHub
- **Always use Azure Application Settings** for production secrets
- **Rotate SendGrid API keys regularly**
- **Use SSL/TLS for all database connections** (sslmode=require)

## 📝 Local Development

Create `.env` file in the `api/` folder (NOT committed to Git):

```
POSTGRES_CONNECTION_STRING=postgresql://user:password@localhost:5432/pamperpro
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@localhost
```

Then run locally:
```bash
cd api
npm install
node lib/init-db.js
```

## 🚀 Deployment Checklist

- [ ] POSTGRES_CONNECTION_STRING set in Azure
- [ ] DATABASE_URL set in Azure
- [ ] SENDGRID_API_KEY set in Azure
- [ ] EMAIL_FROM set in Azure
- [ ] api/package.json includes `@sendgrid/mail`
- [ ] Database initialized with users table
- [ ] GitHub pushed with latest changes
- [ ] Azure deployment completed successfully
