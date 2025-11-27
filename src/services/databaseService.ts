/**
 * Database Service - DEPRECATED
 * This file is kept for backwards compatibility but is no longer used.
 * 
 * Schema initialization now happens in Azure Functions:
 * - api/init-db.ts handles database initialization
 * - All queries go through Azure Functions (db-query, db-execute routes)
 * 
 * Frontend calls: apiService.dbApi.init() → /api/init-db
 */

export async function initializeDatabase(): Promise<void> {
  console.warn("initializeDatabase is deprecated. Use apiService.dbApi.init() instead.");
}
