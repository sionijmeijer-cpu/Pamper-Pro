# 🧪 Test Your Signup Endpoint

Your environment variables are now live in Azure! Let's verify the signup endpoint works.

## Quick Test (in Shipper Terminal)

```bash
curl -X POST https://YOUR-STATIC-WEB-APP-URL.azurestaticapps.net/api/auth-signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

Replace `YOUR-STATIC-WEB-APP-URL` with your actual Static Web App URL.

## Expected Success Response (200)
```json
{
  "success": true,
  "message": "User created successfully",
  "userId": 1
}
```

## Expected Error Responses

**Email already exists (409):**
```json
{
  "error": "User with this email already exists"
}
```

**Invalid email (400):**
```json
{
  "error": "Invalid email format"
}
```

**Missing fields (400):**
```json
{
  "error": "Missing required fields"
}
```

## Test from Your App

1. Go to your Pamper Pro app
2. Click **Sign Up**
3. Fill in:
   - Email: `newuser@example.com`
   - Password: `SecurePass123!`
   - First Name: `John`
   - Last Name: `Doe`
4. Click **Create Account**

You should see:
- ✅ **Success message** confirming account created
- ✅ **Email sent** from SendGrid (check spam folder)
- ✅ **User stored** in your Azure PostgreSQL database

## If You Get Errors

**Still seeing 500 error?**
- Check Azure Portal → Static Web App → Logs
- Verify all 4 environment variables are saved
- Wait 2-3 minutes for Azure to redeploy
- Refresh your browser cache (Ctrl+Shift+Delete)

**Database connection error?**
- Verify connection string is correct
- Check Azure PostgreSQL allows your IP
- Confirm `users` table exists in Azure Data Studio

**SendGrid not sending emails?**
- Verify SENDGRID_API_KEY is correct
- Check SendGrid account is active
- Look in SendGrid dashboard → Mail Activity

## Need Help?

The signup endpoint logs all errors. Check Azure Portal → Static Web App → Logs to see detailed error messages.
