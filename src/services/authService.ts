/**
 * Authentication Service - DEPRECATED
 * This file is kept for backwards compatibility but is no longer the primary auth system.
 * 
 * Authentication now handled by:
 * - useAuth() hook in src/hooks/useAuth.ts
 * - Azure Functions in functions/auth/* routes
 * 
 * All database operations for auth go through Azure Functions:
 * - User creation/login via Azure Functions
 * - Password hashing and verification on server
 * - Sessions managed via secure tokens
 */

import type { User, UserRole } from "../entities/User";

export async function initializeDatabase(): Promise<void> {
  console.warn("initializeDatabase is deprecated. Use useAuth() hook instead.");
}

export async function signup(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}): Promise<User> {
  console.warn("signup is deprecated. Use useAuth() hook instead.", data);
  throw new Error("Use useAuth() hook for authentication");
}

export async function login(credentials: {
  email: string;
  password: string;
}): Promise<User> {
  console.warn("login is deprecated. Use useAuth() hook instead.", credentials);
  throw new Error("Use useAuth() hook for authentication");
}

export async function getUserByEmail(email: string): Promise<User | null> {
  console.warn("getUserByEmail is deprecated. Use useAuth() hook instead.", email);
  return null;
}

export async function getUserById(id: number): Promise<User | null> {
  console.warn("getUserById is deprecated. Use useAuth() hook instead.", id);
  return null;
}

export async function updateUserProfile(
  id: number,
  updates: Partial<User>
): Promise<User> {
  console.warn("updateUserProfile is deprecated. Use useAuth() hook instead.", id, updates);
  throw new Error("Use useAuth() hook for authentication");
}

export async function resetPassword(
  email: string,
  newPassword: string
): Promise<void> {
  console.warn("resetPassword is deprecated. Use useAuth() hook instead.", email, newPassword);
}

export function hasRole(user: User | null, role: UserRole | UserRole[]): boolean {
  if (!user) return false;
  const roles = Array.isArray(role) ? role : [role];
  return roles.includes(user.role);
}
