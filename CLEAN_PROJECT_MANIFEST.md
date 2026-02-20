# Pamper Pro - Clean Production Build

This is a production-ready Vite + React + TypeScript application deployed on Azure Static Web Apps.

## Project Structure

```
pamper-pro/
├── src/                    # Frontend React application
│   ├── pages/             # Page components
│   ├── components/        # Reusable React components
│   ├── context/           # Auth context
│   ├── api/               # Frontend API clients
│   ├── services/          # Business logic services
│   ├── entities/          # Data type definitions
│   ├── database/          # Database utilities
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # React entry point
│   └── index.css          # Global styles
├── api/                   # Azure Functions (backend)
│   ├── auth-signup/       # Signup endpoint
│   ├── auth-login/        # Login endpoint
│   ├── verify-email/      # Email verification
│   ├── resend-verification/ # Resend verification email
│   ├── users-me/          # Get current user
│   ├── lib/               # Shared backend utilities
│   └── package.json       # Backend dependencies
├── public/                # Static assets & images
├── package.json           # Frontend dependencies
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── index.html             # HTML entry point
├── .env.example           # Environment variables template
└── README.md              # Project documentation
```

## Key Features

- **Authentication**: Email/password signup and login with verification
- **Azure Communication Services**: Email sending for verification
- **TypeScript**: Full type safety across frontend and backend
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Azure Functions**: Serverless backend APIs
- **Azure Static Web Apps**: Production deployment

## Setup Instructions

1. Clone repository
2. Install dependencies: `npm install`
3. Set environment variables (see .env.example)
4. Deploy to Azure Static Web Apps

## Environment Variables

Required for Azure deployment:
- `COMMUNICATION_SERVICES_CONNECTION_STRING` - Azure Communication Services connection string
- `DATABASE_URL` - Database connection string (if applicable)

## Build & Deploy

```bash
npm run build
npm run preview
```

The app uses `tsc -b && vite build` for TypeScript compilation and bundling.
