import { useState, useEffect, useCallback } from "react";
import { User, UserRole } from "../entities/User";
import * as authService from "../services/authService";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const STORAGE_KEY = "pamper_pro_auth_user";

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null
  });

  // Initialize auth state from localStorage and database
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // First initialize database
        await authService.initializeDatabase();

        // Check localStorage for existing session
        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            // Verify user still exists in database
            const dbUser = await authService.getUserById(user.id);
            if (dbUser) {
              setAuthState({
                user: dbUser,
                isLoading: false,
                isAuthenticated: true,
                error: null
              });
            } else {
              // User deleted from database, clear session
              localStorage.removeItem(STORAGE_KEY);
              setAuthState({
                user: null,
                isLoading: false,
                isAuthenticated: false,
                error: null
              });
            }
          } catch {
            localStorage.removeItem(STORAGE_KEY);
            setAuthState({
              user: null,
              isLoading: false,
              isAuthenticated: false,
              error: null
            });
          }
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false
          }));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: "Failed to initialize authentication"
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Call auth service
      const user = await authService.login(credentials);

      // Store in localStorage for session persistence
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return false;
    }
  }, []);

  // Signup function
  const signup = useCallback(async (data: SignupData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Call auth service
      const user = await authService.signup(data);

      // Store in localStorage for session persistence
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Signup failed";
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return false;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null
    });
  }, []);

  // Password reset function
  const resetPassword = useCallback(async (email: string, newPassword: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await authService.resetPassword(email, newPassword);

      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: null
      }));

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Password reset failed";
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return false;
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (updates: Partial<User>): Promise<boolean> => {
    if (!authState.user) return false;

    try {
      const updatedUser = await authService.updateUserProfile(authState.user.id, updates);

      // Update localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));

      setAuthState(prev => ({
        ...prev,
        user: updatedUser
      }));

      return true;
    } catch (error) {
      console.error("Update profile error:", error);
      return false;
    }
  }, [authState.user]);

  // Check if user has a specific role
  const hasRole = useCallback((role: UserRole | UserRole[]): boolean => {
    return authService.hasRole(authState.user, role);
  }, [authState.user]);

  return {
    ...authState,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
    hasRole
  };
}
