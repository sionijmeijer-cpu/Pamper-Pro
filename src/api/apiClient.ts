import { SignupResponse, LoginResponse, VerifyEmailResponse, ProfileResponse, UpdateProfileResponse, RefreshTokenResponse, LogoutResponse } from './apiTypes';

/**
 * Centralized API Client for Azure Functions
 * 
 * This file handles all communication with Azure Functions endpoints.
 * Replace the API_BASE_URL with your actual Azure Static Web Apps URL.
 * 
 * All endpoints follow the pattern: /api/{feature}/{action}
 * Example: /api/auth/signup, /api/auth/login, etc.
 * 
 * Usage:
 * - In production: Azure Functions will handle the actual logic
 * - Connect by implementing the actual Azure Functions in your backend
 * - All request/response types are clearly defined
 */

// Configure your API base URL here
// In development: http://localhost:3000
// In production: https://your-app.azurestaticapps.net
const API_BASE_URL = process.env.VITE_API_URL || '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // Handle different response types
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data as T;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Authentication API Endpoints
 */
export const authAPI = {
  signup: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    promoCode?: string;
  }): Promise<SignupResponse> => {
    return fetchAPI('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (email: string, password: string): Promise<LoginResponse> => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  verifyEmail: async (token: string): Promise<VerifyEmailResponse> => {
    return fetchAPI('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  getProfile: async (token: string): Promise<ProfileResponse> => {
    return fetchAPI('/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateProfile: async (token: string, data: Record<string, any>): Promise<UpdateProfileResponse> => {
    return fetchAPI('/auth/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    return fetchAPI('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  logout: async (): Promise<LogoutResponse> => {
    return fetchAPI('/auth/logout', {
      method: 'POST',
    });
  },
};

/**
 * User API Endpoints (optional - for additional user operations)
 */
export const userAPI = {
  getUser: async (userId: string, token: string) => {
    return fetchAPI(`/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  verifyEmailToken: async (token: string) => {
    return fetchAPI('/users/verify-email-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },
};

/**
 * Export API client for use in components
 */
export const apiClient = {
  auth: authAPI,
  user: userAPI,
};

export default apiClient;
