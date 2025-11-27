/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Google OAuth - Production only (set in Azure App Settings, NOT in local .env)
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
