# Azure Functions Setup for Pamper Pro

This guide walks you through deploying Azure Functions as the backend for Pamper Pro.

## Prerequisites

1. **Azure Account** - https://azure.microsoft.com/free/
2. **Azure CLI** - https://docs.microsoft.com/cli/azure/install-azure-cli
3. **Node.js 18+** - https://nodejs.org/
4. **Azure Functions Core Tools** - `npm install -g azure-functions-core-tools@4`

---

## Step 1: Create Azure Function App

### Using Azure Portal:

1. Go to https://portal.azure.com
2. Click **"+ Create a resource"**
3. Search for **"Function App"** → Click **Create**
4. Fill in:
   - **Resource Group**: Create new (e.g., `pamper-pro-rg`)
   - **Function App name**: `pamperpro-func` (must be globally unique)
   - **Runtime stack**: Node.js
   - **Version**: 20 LTS
   - **Region**: Same as your Cosmos DB (e.g., East US)
   - **Storage account**: Create new
5. Click **Review + Create** → **Create**

Wait 2-3 minutes for deployment to complete.

---

## Step 2: Get Connection String

1. In Azure Portal, go to your **Cosmos DB resource**
2. Click **Connection strings** → Copy the **PRIMARY CONNECTION STRING**
3. It should look like:
   ```
   postgresql://citus:password@host.postgres.cosmos.azure.com:5432/citus?sslmode=require
   ```

---

## Step 3: Deploy Functions

### Using Azure CLI:

```bash
# Login to Azure
az login

# Create a local settings file
echo '{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName=...",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "VITE_POSTGRES_CONNECTION_STRING": "postgresql://citus:password@host.postgres.cosmos.azure.com:5432/citus?sslmode=require"
  }
}' > local.settings.json

# Deploy functions
func azure functionapp publish pamperpro-func

# Upload settings to Azure
az functionapp config appsettings set \
  --name pamperpro-func \
  --resource-group pamper-pro-rg \
  --settings VITE_POSTGRES_CONNECTION_STRING="postgresql://citus:password@host.postgres.cosmos.azure.com:5432/citus?sslmode=require"
```

---

## Step 4: Update Frontend Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_AZURE_FUNCTIONS_URL=https://pamperpro-func.azurewebsites.net/api
```

Or update `src/services/azureApiService.ts` line 3 with your Azure Functions URL.

---

## Step 5: Initialize Database

After deploying, initialize the database by calling:

```bash
curl -X POST https://pamperpro-func.azurewebsites.net/api/initDb
```

---

## API Endpoints

Once deployed, your Azure Functions will be available at:

- `https://pamperpro-func.azurewebsites.net/api/users`
- `https://pamperpro-func.azurewebsites.net/api/clients`
- `https://pamperpro-func.azurewebsites.net/api/professionals`
- `https://pamperpro-func.azurewebsites.net/api/services`
- `https://pamperpro-func.azurewebsites.net/api/bookings`
- `https://pamperpro-func.azurewebsites.net/api/payments`
- `https://pamperpro-func.azurewebsites.net/api/reviews`
- `https://pamperpro-func.azurewebsites.net/api/initDb`

---

## Troubleshooting

### Functions not showing up?
```bash
func azure functionapp list-functions pamperpro-func
```

### Check logs:
```bash
func azure functionapp log tail pamperpro-func
```

### View settings:
```bash
az functionapp config appsettings list \
  --name pamperpro-func \
  --resource-group pamper-pro-rg
```

### Redeploy:
```bash
func azure functionapp publish pamperpro-func --build remote
```

---

## Local Testing

To test functions locally before deploying:

```bash
# Start local Functions runtime
func start

# In another terminal, test an endpoint
curl http://localhost:7071/api/initDb -X POST
```

---

## Next Steps

1. ✅ Deploy Azure Functions
2. ✅ Set environment variables
3. ✅ Initialize database
4. ✅ Update frontend `.env` with Azure Functions URL
5. ✅ Test API endpoints
6. ✅ Deploy frontend to Azure Static Web App

Your Pamper Pro app is now fully integrated with Azure! 🚀
