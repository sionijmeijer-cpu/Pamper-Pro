import { ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";
import { UserRole } from "../entities/User";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole | UserRole[];
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, requiredRole, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading, hasRole } = useAuthContext();

  // Still loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Login Required</h2>
            <p className="text-gray-600">
              You need to be logged in to access this page.
            </p>
            <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
              Please log in or create an account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check role
  if (requiredRole && !hasRole(requiredRole)) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
            <p className="text-gray-600">
              You don't have permission to access this page. Your role: <strong>{user?.role}</strong>
            </p>
            <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authenticated and authorized
  return <>{children}</>;
}
