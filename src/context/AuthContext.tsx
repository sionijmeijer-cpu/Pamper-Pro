import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'client' | 'professional' | 'vendor' | 'admin';

export interface User {
  id: string | number;
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

export interface LoginResponse {
  success: boolean;
  emailNotVerified?: boolean;
  message?: string;
  user?: User;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  emailSent?: boolean;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  signup: (email: string, firstName: string, lastName: string, password: string, phone?: string, smsNotifications?: boolean, promoCode?: string, role?: UserRole) => Promise<SignupResponse>;
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

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/auth-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if email not verified
        if (data.emailNotVerified) {
          const message = data.message || 'Please verify your email before logging in.';
          setError(message);
          return { success: false, emailNotVerified: true, message };
        }
        
        const message = data.message || data.error || 'Login failed';
        setError(message);
        return { success: false, message };
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName || '',
        lastName: data.user.lastName || '',
        role: (data.user.role || 'client') as UserRole,
        roles: [(data.user.role || 'client') as UserRole],
        isEmailVerified: data.user.isVerified === 'true' || data.user.isVerified === true,
        profileComplete: false
      };

      setToken(data.token || '');
      setCurrentUser(user);
      localStorage.setItem('pamper_pro_token', data.token || '');
      localStorage.setItem('pamper_pro_user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, firstName: string, lastName: string, password: string, phone?: string, smsNotifications?: boolean, promoCode?: string, role: UserRole = 'client'): Promise<SignupResponse> => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/auth-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          firstName, 
          lastName, 
          password,
          phone: phone || '',
          smsNotifications: smsNotifications ?? true,
          promoCode: promoCode || '',
          role
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data.message || data.error || 'Signup failed';
        setError(message);
        return { success: false, message };
      }

      // Set user but mark as needing email verification
      const user: User = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName || '',
        lastName: data.user.lastName || '',
        role: (data.user.role || role) as UserRole,
        roles: [(data.user.role || role) as UserRole],
        isEmailVerified: false,
        profileComplete: false
      };

      setToken(data.token || '');
      setCurrentUser(user);
      localStorage.setItem('pamper_pro_token', data.token || '');
      localStorage.setItem('pamper_pro_user', JSON.stringify(user));

      return { 
        success: true, 
        message: data.message || 'Account created successfully! Please check your email to verify your account.',
        emailSent: data.emailSent !== false
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (verificationToken: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/verify-email', {
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
