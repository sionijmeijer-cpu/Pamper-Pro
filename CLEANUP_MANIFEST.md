# Pamper Pro - Project Cleanup

## Files Kept (Essential for Current Preview)
- `src/` - All React components and pages
- `public/` - Images and assets
- `api/` - Azure Functions for auth (auth-signup, auth-login, verify-email, resend-verification)
- `package.json` - Dependencies
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration
- `index.html` - Entry point
- `.env` - Environment variables

## Files Removed (Old Documentation & Duplicate Code)
- All .md files (DEPLOYMENT_GUIDE.md, ACS_SETUP_GUIDE.md, etc.)
- `functions/` directory (duplicate Azure Functions)
- `api/lib/` old helper files (duplicate email utilities)
- `api/test-*` directories (test endpoints)
- Old unused endpoints

## Current API Endpoints (Keep These)
- POST `/api/auth-signup` - User registration with email verification
- POST `/api/auth-login` - User login
- POST `/api/verify-email` - Email verification
- POST `/api/resend-verification` - Resend verification email

## Frontend Structure
- HomePage - Landing page with features
- ClientSignupFlow - Signup process
- ClientLoginFlow - Login process
- EmailVerificationPage - Email verification UI
- CheckEmailPage - Check email prompt
- ClientDashboard - User dashboard
- Find Professional - Search professionals
- Shop Products - E-commerce
- Booking Flow - Booking system
