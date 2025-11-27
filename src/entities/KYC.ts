import type { EntityConfig } from "../hooks/useEntity";

export const kycEntityConfig: EntityConfig = {
  name: "KYC",
  orderBy: "created_at DESC",
  properties: {
    userId: {
      type: "integer",
      description: "Reference to User entity"
    },
    professionalId: {
      type: "integer",
      description: "Reference to Professional entity"
    },
    status: {
      type: "string",
      enum: ["pending", "submitted", "under_review", "approved", "rejected"],
      default: "pending",
      description: "KYC verification status"
    },
    // ID Verification
    idType: {
      type: "string",
      enum: ["passport", "driver_license", "national_id", "government_id"],
      description: "Type of ID document"
    },
    idNumber: {
      type: "string",
      description: "ID document number (encrypted)"
    },
    idPhotoUrl: {
      type: "string",
      description: "URL to uploaded ID photo"
    },
    idVerificationStatus: {
      type: "string",
      enum: ["pending", "verified", "rejected"],
      default: "pending",
      description: "ID verification status"
    },
    // Facial Verification
    facialPhotoUrl: {
      type: "string",
      description: "URL to uploaded facial verification photo"
    },
    facialVerificationStatus: {
      type: "string",
      enum: ["pending", "verified", "rejected"],
      default: "pending",
      description: "Facial verification status"
    },
    facialMatchPercentage: {
      type: "number",
      description: "Facial match confidence percentage (0-100)"
    },
    // Business Verification
    businessRegistrationNumber: {
      type: "string",
      description: "Business registration/license number"
    },
    businessProofUrl: {
      type: "string",
      description: "URL to business registration document"
    },
    businessVerificationStatus: {
      type: "string",
      enum: ["pending", "verified", "rejected"],
      default: "pending",
      description: "Business verification status"
    },
    // Admin Review
    submittedAt: {
      type: "string",
      description: "Timestamp when KYC was submitted"
    },
    reviewedAt: {
      type: "string",
      description: "Timestamp when KYC was reviewed by admin"
    },
    reviewedBy: {
      type: "integer",
      description: "Admin user ID who reviewed the KYC"
    },
    reviewNotes: {
      type: "string",
      description: "Admin notes on KYC review/rejection"
    },
    approvedAt: {
      type: "string",
      description: "Timestamp when KYC was approved"
    }
  },
  required: ["userId", "professionalId"]
};

export type KYC = {
  id: number;
  userId: number;
  professionalId: number;
  status: "pending" | "submitted" | "under_review" | "approved" | "rejected";
  idType: "passport" | "driver_license" | "national_id" | "government_id";
  idNumber: string;
  idPhotoUrl: string;
  idVerificationStatus: "pending" | "verified" | "rejected";
  facialPhotoUrl: string;
  facialVerificationStatus: "pending" | "verified" | "rejected";
  facialMatchPercentage: number;
  businessRegistrationNumber: string;
  businessProofUrl: string;
  businessVerificationStatus: "pending" | "verified" | "rejected";
  submittedAt: string;
  reviewedAt: string;
  reviewedBy: number;
  reviewNotes: string;
  approvedAt: string;
  created_at: string;
  updated_at: string;
};
