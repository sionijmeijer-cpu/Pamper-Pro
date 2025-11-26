import type { EntityConfig } from "../hooks/useEntity";

export type UserRole = "client" | "professional" | "admin";

export const userEntityConfig: EntityConfig = {
  name: "User",
  orderBy: "created_at DESC",
  properties: {
    email: {
      type: "string",
      description: "User email address (unique identifier)"
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
    phone: {
      type: "string",
      description: "User phone number"
    },
    role: {
      type: "string",
      enum: ["client", "professional", "admin"],
      default: "client",
      description: "User role in the platform"
    },
    profileImage: {
      type: "string",
      description: "User profile picture URL"
    },
    bio: {
      type: "string",
      description: "User bio or description"
    },
    location: {
      type: "string",
      description: "User location/address"
    },
    latitude: {
      type: "number",
      description: "User latitude for map location"
    },
    longitude: {
      type: "number",
      description: "User longitude for map location"
    },
    isVerified: {
      type: "string",
      default: "false",
      description: "Email verification status"
    },
    isActive: {
      type: "string",
      default: "true",
      description: "Account active status"
    },
    lastLogin: {
      type: "string",
      description: "Last login timestamp"
    },
    professionalDetails: {
      type: "string",
      description: "JSON string with professional info (business name, services, rates)"
    },
    clientPreferences: {
      type: "string",
      description: "JSON string with client preferences (favorite services, notification settings)"
    }
  },
  required: ["email", "password", "firstName", "lastName", "role"]
};

export type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  profileImage: string;
  bio: string;
  location: string;
  latitude: number;
  longitude: number;
  isVerified: string;
  isActive: string;
  lastLogin: string;
  professionalDetails: string;
  clientPreferences: string;
  created_at: string;
  updated_at: string;
};

export type UserProfile = Omit<User, "password" | "id" | "created_at" | "updated_at">;
