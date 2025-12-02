import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'client' | 'professional' | 'vendor' | 'admin';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  roles: UserRole[];
  isEmailVerified: boolean;
  profileComplete: boolean;
  businessName?: string;
  phoneNumber?: string;
  profileImage?: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  kycStatus?: 'pending' | 'approved' | 'rejected';
  lastLogin?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, firstName: string, lastName: string, password: string, phone?: string, smsNotifications?: boolean, promoCode?: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  canAccessRole: (role: UserRole) => boolean;
  updateUser: (data: Partial<User>) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('pamper_pro_token');
        const storedUser = localStorage.getItem('pamper_pro_user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        localStorage.removeItem('pamper_pro_token');
        localStorage.removeItem('pamper_pro_user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();
      const user: User = {
        ...data.user,
        roles: data.user.roles ? JSON.parse(data.user.roles) : [data.user.role],
        isEmailVerified: data.user.isEmailVerified === 'true' || data.user.isEmailVerified === true
      };

      setToken(data.token);
      setCurrentUser(user);
      localStorage.setItem('pamper_pro_token', data.token);
      localStorage.setItem('pamper_pro_user', JSON.stringify(user));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, firstName: string, lastName: string, password: string, phone?: string, smsNotifications?: boolean, promoCode?: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          firstName, 
          lastName, 
          password,
          phone: phone || '',
          smsNotifications: smsNotifications ?? true,
          promoCode: promoCode || ''
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Signup failed');
      }

      const data = await response.json();
      
      // Set user but mark as needing email verification
      const user: User = {
        ...data.user,
        roles: [data.user.role || 'client'],
        isEmailVerified: false
      };

      setToken(data.token);
      setCurrentUser(user);
      localStorage.setItem('pamper_pro_token', data.token);
      localStorage.setItem('pamper_pro_user', JSON.stringify(user));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (verificationToken: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ token: verificationToken })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Email verification failed');
      }

      const data = await response.json();
      const updatedUser: User = {
        ...currentUser!,
        ...data.user,
        isEmailVerified: true
      };

      setCurrentUser(updatedUser);
      localStorage.setItem('pamper_pro_user', JSON.stringify(updatedUser));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Email verification failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('pamper_pro_token');
    localStorage.removeItem('pamper_pro_user');
  };

  const switchRole = (role: UserRole) => {
    if (currentUser && canAccessRole(role)) {
      const updatedUser = { ...currentUser, role };
      setCurrentUser(updatedUser);
      localStorage.setItem('pamper_pro_user', JSON.stringify(updatedUser));
    }
  };

  const canAccessRole = (role: UserRole): boolean => {
    if (!currentUser) return false;
    return currentUser.roles?.includes(role) || currentUser.role === role;
  };

  const updateUser = (data: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...data };
      setCurrentUser(updatedUser);
      localStorage.setItem('pamper_pro_user', JSON.stringify(updatedUser));
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        token,
        login,
        signup,
        verifyEmail,
        logout,
        switchRole,
        canAccessRole,
        updateUser,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
