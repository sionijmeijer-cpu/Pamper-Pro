import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ErrorBoundary } from "./components/ErrorBoundary";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId || clientId === 'YOUR_GOOGLE_CLIENT_ID') {
  console.error(
    "Google OAuth Client ID is not configured. " +
    "Please add VITE_GOOGLE_CLIENT_ID to your .env file or Azure App Settings. " +
    "See GOOGLE_OAUTH_SETUP.md for instructions."
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={clientId || 'not-configured'}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
