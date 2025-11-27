# Azure App Settings Configuration

## Required Settings for Azure Static Web Apps

Your application needs the following environment variables configured in **Azure Portal**:

### For Azure Functions to access CosmosDB PostgreSQL:

1. **In Azure Portal**, go to your **Static Web App** resource
2. Navigate to **Configuration** → **Application settings**
3. Add these settings:

| Setting Name | Value | Example |
|---|---|---|
| `COSMOSDB_CONNECTION_STRING` | Your CosmosDB PostgreSQL connection string | `postgresql://user:password@host:port/db` |
| `DATABASE_URL` | Alternative connection string | (same as above) |

### How to Get Your Connection String:

1. Go to **Azure Portal** → **Azure Cosmos DB account**
2. Left sidebar: **Connection String**
3. Copy the **Primary PostgreSQL Connection String**
4. Add it to App Settings as `COSMOSDB_CONNECTION_STRING`

### Local Development (.env)

For local testing, create `.env` with:
```
COSMOSDB_CONNECTION_STRING=postgresql://user:password@localhost:5432/pamperdb
```

## How It Works

- **Frontend** (`src/`) calls Azure Functions via `/api/*` routes
- **Azure Functions** (`api/` and `functions/`) read `COSMOSDB_CONNECTION_STRING` from App Settings
- Functions connect to CosmosDB PostgreSQL using `@neondatabase/serverless`
- **Auth tokens and credentials stay on the server** - never exposed to browser

## Troubleshooting

**Error: "No database connection string configured"**
- ✅ Check App Settings in Azure Portal
- ✅ Ensure `COSMOSDB_CONNECTION_STRING` is set correctly
- ✅ Wait 2-3 minutes after adding settings (Azure needs time to propagate)
- ✅ Trigger a new deployment: `git push`

**Blank page on deployment**
- Check Azure Portal → Static Web App → **Logs**
- Look for errors in Function logs
- Verify connection string is correct
