#!/bin/bash

# Database initialization helper for Shipper sandbox
# Usage: bash api/lib/run-init-db.sh "your-connection-string"

if [ -z "$1" ]; then
  echo "❌ Error: Connection string required"
  echo "Usage: bash api/lib/run-init-db.sh \"postgres://user:password@server.postgres.database.azure.com:5432/db?sslmode=require\""
  exit 1
fi

export POSTGRES_CONNECTION_STRING="$1"
node api/lib/init-db.js
