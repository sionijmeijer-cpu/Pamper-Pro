/**
 * TypeScript interfaces for API responses
 */

export interface User {
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

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export interface ProfileResponse {
  success: boolean;
  user?: User;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface RefreshTokenResponse {
  success: boolean;
  token?: string;
  refreshToken?: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}
