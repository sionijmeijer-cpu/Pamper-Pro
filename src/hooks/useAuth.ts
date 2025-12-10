import { useState, useEffect, useCallback } from "react";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: "client" | "professional" | "admin";
  email_verified: boolean;
  picture_url?: string;
  phone?: string;
  address?: string;
  subscription_tier?: "free" | "pro" | "premium";
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

interface SignupData {
  email: string;
  password: string;
  name?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const STORAGE_KEY = "pamper_pro_auth_user";

/**
 * useAuth - Authentication hook for PamperPro
 * Handles email/password authentication
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          const user = JSON.parse(storedUser) as AuthUser;
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } else {
          setAuthState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem(STORAGE_KEY);
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        });
      }
    };

    initializeAuth();
  }, []);

  // Signup with email and password
  const signup = useCallback(async (data: SignupData): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Signup failed"
        );
      }

      const result = await response.json();

      // Store user (email not verified yet)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result.user));

      setAuthState({
        user: result.user,
        isLoading: false,
        isAuthenticated: false, // Not authenticated until email verified
        error: null,
      });

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Signup failed";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  // Login with email and password
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Login failed"
          );
        }

        const result = await response.json();

        // Store user
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result.user));

        setAuthState({
          user: result.user,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });

        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Login failed";
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        return false;
      }
    },
    []
  );



  // Verify email with token
  const verifyEmail = useCallback(async (token: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Email verification failed");
      }

      const result = await response.json();

      // Update user with verified status
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result.user));

      setAuthState({
        user: result.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Email verification failed";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  // Get user profile
  const getProfile = useCallback(async (): Promise<AuthUser | null> => {
    if (!authState.user) return null;

    try {
      const response = await fetch(
        `/api/auth/profile?userId=${authState.user.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const result = await response.json();
      return result.user as AuthUser;
    } catch (error) {
      console.error("Get profile error:", error);
      return null;
    }
  }, [authState.user]);

  // Update user profile
  const updateProfile = useCallback(
    async (updates: Partial<any>): Promise<boolean> => {
      if (!authState.user) return false;

      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetch(
          `/api/auth/profile?userId=${authState.user.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Update failed");
        }

        const result = await response.json();
        const updatedUser = result.user;

        // Update localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));

        setAuthState({
          user: updatedUser,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });

        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Profile update failed";
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        return false;
      }
    },
    [authState.user]
  );

  // Reset password
  const resetPassword = useCallback(
    async (email: string, newPassword: string): Promise<boolean> => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Password reset failed");
        }

        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: null,
        }));

        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Password reset failed";
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        return false;
      }
    },
    []
  );

  // Check user role
  const hasRole = useCallback(
    (role: string | string[]): boolean => {
      if (!authState.user) return false;
      const roles = Array.isArray(role) ? role : [role];
      return roles.includes(authState.user.role);
    },
    [authState.user]
  );

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
    });
  }, []);

  return {
    ...authState,
    signup,
    login,
    verifyEmail,
    getProfile,
    updateProfile,
    resetPassword,
    hasRole,
    logout,
  };
}
