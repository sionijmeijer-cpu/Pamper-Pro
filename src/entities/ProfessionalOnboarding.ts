import type { EntityConfig } from "../hooks/useEntity";

export const professionalOnboardingEntityConfig: EntityConfig = {
  name: "ProfessionalOnboarding",
  orderBy: "created_at DESC",
  properties: {
    userId: {
      type: "integer",
      description: "Reference to User entity"
    },
    professionalId: {
      type: "integer",
      description: "Reference to Professional entity (created on first step)"
    },
    businessType: {
      type: "string",
      enum: ["service", "vendor"],
      description: "Type of business: Service Provider or Product Vendor"
    },
    currentStep: {
      type: "integer",
      description: "Current onboarding step (1-4)"
    },
    completedSteps: {
      type: "string",
      description: "JSON array of completed step numbers"
    },
    // Step 1: Business Basics
    businessName: {
      type: "string",
      description: "Name of the business"
    },
    businessDescription: {
      type: "string",
      description: "Brief description of the business"
    },
    businessLocation: {
      type: "string",
      description: "Business location/city"
    },
    // Step 2: Services/Products
    servicesOffered: {
      type: "string",
      description: "JSON array of services or products offered"
    },
    yearsInBusiness: {
      type: "integer",
      description: "Years of experience"
    },
    // Step 3: Specializations
    specializations: {
      type: "string",
      description: "JSON array of specializations/certifications"
    },
    targetAudience: {
      type: "string",
      description: "Target customer demographic"
    },
    // Step 4: Availability & Contact
    serviceArea: {
      type: "string",
      description: "Service coverage area (miles from location)"
    },
    phoneNumber: {
      type: "string",
      description: "Business contact phone"
    },
    website: {
      type: "string",
      description: "Business website/social media links"
    },
    businessHours: {
      type: "string",
      description: "JSON object with business hours"
    },
    onboardingCompleted: {
      type: "string",
      default: "false",
      description: "Whether all 4 steps are completed"
    },
    onboardingCompletedAt: {
      type: "string",
      description: "Timestamp when onboarding was completed"
    }
  },
  required: ["userId", "businessType"]
};

export type ProfessionalOnboarding = {
  id: number;
  userId: number;
  professionalId: number;
  businessType: "service" | "vendor";
  currentStep: number;
  completedSteps: string;
  businessName: string;
  businessDescription: string;
  businessLocation: string;
  servicesOffered: string;
  yearsInBusiness: number;
  specializations: string;
  targetAudience: string;
  serviceArea: string;
  phoneNumber: string;
  website: string;
  businessHours: string;
  onboardingCompleted: string;
  onboardingCompletedAt: string;
  created_at: string;
  updated_at: string;
};
