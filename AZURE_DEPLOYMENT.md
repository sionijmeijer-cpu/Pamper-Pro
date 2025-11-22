# Azure Static Web Apps Deployment Guide

## Option 1: Manual Deployment (Recommended for first time)

### Step 1: Build the project locally
```bash
npm install
npm run build
```

This creates a `dist` folder with your production-ready files.

### Step 2: Deploy to Azure Static Web Apps

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Static Web App resource
3. Click on "Browse" or go to the deployment section
4. Use Azure CLI or the portal to deploy the `dist` folder

**Using Azure CLI:**
```bash
# Install Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Deploy (replace with your deployment token)
swa deploy ./dist --deployment-token YOUR_DEPLOYMENT_TOKEN
```

## Option 2: GitHub Actions Automatic Deployment

### Step 1: Get your Azure Static Web Apps API Token

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Static Web App resource
3. Click on "Manage deployment token"
4. Copy the deployment token

### Step 2: Add token to GitHub Secrets

1. Go to your GitHub repository
2. Click on "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: Paste your deployment token
6. Click "Add secret"

### Step 3: Enable the workflow

The workflow file is already in `.github/workflows/azure-static-web-apps-deploy.yml`

Once you add the secret, push to the `main` branch and it will automatically deploy!

## Important Configuration

Your project is configured as:
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **App location**: `/` (root)

## Troubleshooting

If deployment fails:
1. Check that the secret `AZURE_STATIC_WEB_APPS_API_TOKEN` is set correctly
2. Verify the token hasn't expired
3. Make sure your Azure Static Web App allows GitHub deployments
4. Check the GitHub Actions logs for specific errors
