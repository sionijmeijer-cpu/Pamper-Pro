import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ErrorBoundary } from "./components/ErrorBoundary";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Render app - Google OAuth is optional
const rootElement = document.getElementById("root");

if (clientId) {
  // Render with Google OAuth
  ReactDOM.createRoot(rootElement!).render(
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
  // Render without Google OAuth (optional feature)
  ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
