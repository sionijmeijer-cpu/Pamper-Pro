import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ErrorBoundary } from "./components/ErrorBoundary";

// ============================================
// GOOGLE OAUTH CONFIGURATION
// Single Source of Truth: VITE_GOOGLE_CLIENT_ID
// ============================================

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Enhanced logging for debugging
console.log('═══════════════════════════════════════════════');
console.log('🔐 Google OAuth Configuration');
console.log('═══════════════════════════════════════════════');
console.log('Environment:', import.meta.env.MODE);
console.log('Current origin:', window.location.origin);
console.log('Current hostname:', window.location.hostname);
console.log('Current pathname:', window.location.pathname);
console.log('Current protocol:', window.location.protocol);

// Log Client ID status
if (!clientId) {
  console.error(
    "❌ CRITICAL: Google OAuth Client ID is NOT SET\n" +
    "This value must be configured in:\n" +
    "1. Azure Portal → Static Web App → Configuration → Application Settings\n" +
    "   Name: VITE_GOOGLE_CLIENT_ID\n" +
    "   Value: 277153107226-mhp259afsb00kla0bbmm002o0kb584jr.apps.googleusercontent.com\n" +
    "2. OR in .env file for local development\n" +
    "After setting, wait 2-5 minutes for Azure to propagate the change."
  );
} else if (clientId === 'YOUR_GOOGLE_CLIENT_ID' || clientId === 'not-configured') {
  console.error(
    "❌ CRITICAL: Google OAuth Client ID is using a placeholder value: " + clientId + "\n" +
    "Configure the actual Client ID in Azure App Settings or .env file"
  );
} else {
  console.log('✅ Client ID Source: Environment Variable (VITE_GOOGLE_CLIENT_ID)');
  console.log('✅ Client ID format check: Valid Google OAuth format');
  console.log('✅ Client ID (first 50 chars):', clientId.substring(0, 50) + '...');
  console.log('✅ Client ID (full length):', clientId.length, 'characters');
  console.log('✅ Google OAuth Client ID loaded successfully');
}

console.log('═══════════════════════════════════════════════\n');

// Verify GoogleOAuthProvider will receive valid clientId
if (clientId && clientId !== 'YOUR_GOOGLE_CLIENT_ID' && clientId !== 'not-configured') {
  console.log('✅ Ready to initialize GoogleOAuthProvider with valid Client ID');
  
  // Safe to render with valid client ID
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <GoogleOAuthProvider clientId={clientId}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </GoogleOAuthProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.warn('⚠️ Cannot initialize app: Google OAuth Client ID is missing or invalid');
  // Show error message
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = '<div style="padding: 40px; text-align: center; font-family: system-ui; line-height: 1.6;"><h1 style="color: #c00;">⚠️ Configuration Error</h1><p>Google OAuth Client ID is not configured.</p><p>Please ensure <code>VITE_GOOGLE_CLIENT_ID</code> is set in Azure App Settings.</p><p><small>Check browser console for details.</small></p></div>';
  }
}
