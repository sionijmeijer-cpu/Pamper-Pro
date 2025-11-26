import { createContext, useContext, ReactNode } from "react";
import { User, UserRole } from "../entities/User";
import { useAuth as useAuthHook } from "../hooks/useAuth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  signup: (data: { email: string; password: string; firstName: string; lastName: string; role: UserRole }) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthHook();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
