# Pamper Pro PostgreSQL + Vercel Deployment Guide

## Architecture Overview

Your Pamper Pro app now uses:
- **Frontend**: Vite React App (deployed to Azure Static Web App)
- **Backend APIs**: Vercel Edge Functions (serverless PostgreSQL endpoints)
- **Database**: Azure Cosmos DB (PostgreSQL compatible)

## Setup Instructions

### 1. Deploy Backend to Vercel

#### Option A: Deploy with GitHub (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Configure environment variables (see below)
6. Deploy

#### Option B: Deploy with Vercel CLI
```bash
npm install -g vercel
vercel
```

### 2. Set Environment Variables on Vercel

Go to your Vercel project → Settings → Environment Variables

Add these variables:
- `VITE_POSTGRES_HOST`: `c-pamperpro-db.p2zahsgvfcp5cu.postgres.cosmos.azure.com`
- `VITE_POSTGRES_USER`: `citus`
- `VITE_POSTGRES_PASSWORD`: (Your password)
- `VITE_POSTGRES_PORT`: `5432`
- `VITE_POSTGRES_DATABASE`: `citus`

### 3. Update Frontend API URL

After deploying to Vercel, you'll get a URL like: `https://pamper-pro.vercel.app`

Edit `src/services/apiService.ts`:

```typescript
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://pamper-pro.vercel.app/api'  // ← Update this
  : 'http://localhost:3000/api';
```

### 4. Update Azure Static Web App

In your Azure portal, add environment variable:
- `VITE_API_URL`: `https://pamper-pro.vercel.app/api`

### 5. Local Development

#### Start Frontend
```bash
npm run dev
```
Runs on: `http://localhost:5173`

#### Start Backend Locally
```bash
vercel dev
```
Runs on: `http://localhost:3000`

## API Endpoints

All endpoints are available at `/api/`:

- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `GET /api/users?id={id}` - Get user by ID
- `PUT /api/users?id={id}` - Update user
- `DELETE /api/users?id={id}` - Delete user

- `GET /api/clients` - List all clients
- `POST /api/clients` - Create client
- `GET /api/professionals` - List professionals
- `POST /api/professionals` - Create professional
- `GET /api/services` - List services
- `POST /api/services` - Create service
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `GET /api/payments` - List payments
- `POST /api/payments` - Create payment
- `GET /api/reviews` - List reviews
- `POST /api/reviews` - Create review

## Database Schema

The database auto-initializes with these tables:

```
users
├── id (INT, PRIMARY KEY)
├── email (VARCHAR, UNIQUE)
├── password_hash (VARCHAR)
├── full_name (VARCHAR)
├── user_type (VARCHAR)
├── verified (BOOLEAN)
└── timestamps

clients
├── id (INT, PRIMARY KEY)
├── user_id (INT, FK → users)
├── phone (VARCHAR)
├── address (TEXT)
├── hair_type (VARCHAR)
├── preferences (TEXT)
└── timestamps

professionals
├── id (INT, PRIMARY KEY)
├── user_id (INT, FK → users)
├── phone (VARCHAR)
├── specializations (TEXT)
├── experience_years (INT)
├── business_name (VARCHAR)
└── timestamps

services
├── id (INT, PRIMARY KEY)
├── professional_id (INT, FK → professionals)
├── name (VARCHAR)
├── description (TEXT)
├── price (DECIMAL)
├── duration_minutes (INT)
├── category (VARCHAR)
└── timestamps

bookings
├── id (INT, PRIMARY KEY)
├── client_id (INT, FK → clients)
├── professional_id (INT, FK → professionals)
├── service_id (INT, FK → services)
├── booking_date (TIMESTAMP)
├── status (VARCHAR)
├── notes (TEXT)
└── timestamps

payments
├── id (INT, PRIMARY KEY)
├── booking_id (INT, FK → bookings)
├── client_id (INT, FK → clients)
├── amount (DECIMAL)
├── status (VARCHAR)
├── payment_method (VARCHAR)
└── timestamps

reviews
├── id (INT, PRIMARY KEY)
├── client_id (INT, FK → clients)
├── professional_id (INT, FK → professionals)
├── booking_id (INT, FK → bookings)
├── rating (INT, 1-5)
├── comment (TEXT)
└── timestamps
```

## Frontend API Usage

The `src/services/apiService.ts` file provides a clean interface:

```typescript
import { 
  usersApi, 
  clientsApi, 
  professionalsApi,
  bookingsApi,
  paymentsApi,
  reviewsApi
} from '@/services/apiService';

// Create a user
const user = await usersApi.create({
  email: 'client@example.com',
  password_hash: 'hashed_password',
  full_name: 'John Doe',
  user_type: 'client',
  verified: false
});

// Get all bookings for a client
const bookings = await bookingsApi.getByClientId(1);

// Update a booking status
const updated = await bookingsApi.update(123, {
  status: 'completed'
});
```

## Troubleshooting

### Database Connection Error
- Verify environment variables on Vercel
- Check that Cosmos DB firewall allows Vercel IPs
- Check that username/password are correct

### API Returns 500 Error
- Check Vercel logs: `vercel logs`
- Ensure database schema was initialized
- Verify SQL queries in API endpoints

### CORS Errors
- Already configured in API endpoints
- Should work from any frontend URL

## Performance Tips

1. **Add indexes** - Already added for common queries
2. **Connection pooling** - Already configured in `api/lib/db.ts`
3. **Cache responses** - Consider adding Redis for frequently accessed data
4. **Pagination** - Add LIMIT/OFFSET for large result sets

## Security Notes

1. Never commit `.env` files
2. Use strong passwords for database
3. Implement authentication before production
4. Validate all API inputs on backend
5. Use HTTPS only in production
6. Implement rate limiting
7. Add input sanitization for SQL queries

## Next Steps

1. ✅ Deploy backend to Vercel
2. ✅ Test API endpoints
3. ✅ Update frontend API URL
4. ✅ Push to GitHub
5. ✅ Deploy to Azure
6. 🎯 Connect UI components to APIs
7. 🎯 Add authentication
8. 🎯 Implement payment processing
9. 🎯 Add email notifications
10. 🎯 Set up monitoring & logging

## Support

For issues:
1. Check Vercel logs: `vercel logs --prod`
2. Check browser console for frontend errors
3. Verify database connection in psql:
   ```bash
   psql -h c-pamperpro-db.p2zahsgvfcp5cu.postgres.cosmos.azure.com \
        -U citus \
        -d citus
   ```
