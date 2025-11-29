import type { EntityConfig } from "../hooks/useEntity";

export type UserRole = "client" | "professional" | "vendor" | "admin";
export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileImage?: string;
  bio?: string;
  businessName?: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "client" | "professional" | "vendor" | "admin";
  roles: string[];
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationSentAt?: string;
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
  kycStatus: "pending" | "approved" | "rejected";
  googleId?: string;
  lastLogin?: string;
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export const userEntityConfig: EntityConfig = {
  name: "User",
  orderBy: "created_at DESC",
  properties: {
    email: {
      type: "string",
      description: "User email address"
    },
    password: {
      type: "string",
      description: "Hashed password"
    },
    firstName: {
      type: "string",
      description: "User first name"
    },
    lastName: {
      type: "string",
      description: "User last name"
    },
    role: {
      type: "string",
      enum: ["client", "professional", "vendor", "admin"],
      default: "client",
      description: "User role"
    },
    roles: {
      type: "string",
      default: "[]",
      description: "JSON array of all roles user has (e.g., ['client', 'professional'])"
    },
    isEmailVerified: {
      type: "string",
      default: "false",
      description: "Email verification status"
    },
    emailVerificationToken: {
      type: "string",
      description: "Token for email verification"
    },
    emailVerificationSentAt: {
      type: "string",
      description: "When verification email was sent"
    },
    profileComplete: {
      type: "string",
      default: "false",
      description: "Profile completion status"
    },
    businessName: {
      type: "string",
      description: "Business name for professionals"
    },
    phoneNumber: {
      type: "string",
      description: "User phone number"
    },
    profileImage: {
      type: "string",
      description: "Profile image URL"
    },
    bio: {
      type: "string",
      description: "User bio/description"
    },
    address: {
      type: "string",
      description: "User address"
    },
    city: {
      type: "string",
      description: "User city"
    },
    state: {
      type: "string",
      description: "User state"
    },
    zipCode: {
      type: "string",
      description: "User zip code"
    },
    country: {
      type: "string",
      description: "User country"
    },
    kycStatus: {
      type: "string",
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      description: "KYC verification status"
    },
    googleId: {
      type: "string",
      description: "Google OAuth ID"
    },
    lastLogin: {
      type: "string",
      description: "Last login timestamp"
    },
    isActive: {
      type: "string",
      default: "true",
      description: "Account active status"
    }
  },
  required: ["email", "firstName", "lastName"]
};
