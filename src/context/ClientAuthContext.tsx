import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../api/apiClient';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  bio?: string;
  location?: string;
  profilePicture?: string;
  profileComplete: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  signup: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    promoCode?: string;
  }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Record<string, any>) => Promise<void>;
  clearError: () => void;
  isAuthenticated: boolean;
}

const ClientAuthContext = createContext<AuthContextType | undefined>(undefined);

export function ClientAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('client_auth_token');
    const storedUser = localStorage.getItem('client_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    promoCode?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.auth.signup(data) as any;
      
      if (response.success && response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('client_auth_token', response.token);
        localStorage.setItem('client_user', JSON.stringify(response.user));
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.auth.login(email, password) as any;
      
      if (response.success && response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('client_auth_token', response.token);
        localStorage.setItem('client_user', JSON.stringify(response.user));
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await apiClient.auth.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('client_auth_token');
      localStorage.removeItem('client_user');
      setLoading(false);
    }
  };

  const updateProfile = async (data: Record<string, any>) => {
    if (!token) throw new Error('Not authenticated');
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.auth.updateProfile(token, data) as any;
      
      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem('client_user', JSON.stringify(response.user));
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Profile update failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <ClientAuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        signup,
        login,
        logout,
        updateProfile,
        clearError,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  const context = useContext(ClientAuthContext);
  if (context === undefined) {
    throw new Error('useClientAuth must be used within ClientAuthProvider');
  }
  return context;
}
