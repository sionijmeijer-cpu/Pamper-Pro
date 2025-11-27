import type { EntityConfig } from "../hooks/useEntity";

export const professionalEntityConfig: EntityConfig = {
  name: "Professional",
  orderBy: "rating DESC",
  properties: {
    userId: {
      type: "integer",
      description: "Reference to User entity"
    },
    businessName: {
      type: "string",
      description: "Name of the salon or business"
    },
    businessType: {
      type: "string",
      enum: ["salon", "freelance", "mobile", "spa"],
      description: "Type of business"
    },
    specialties: {
      type: "string",
      description: "JSON array of specialty services"
    },
    yearsExperience: {
      type: "integer",
      description: "Years of experience in the industry"
    },
    hourlyRate: {
      type: "number",
      description: "Base hourly rate in USD"
    },
    certification: {
      type: "string",
      description: "Professional certifications/licenses"
    },
    portfolio: {
      type: "string",
      description: "JSON array of portfolio image URLs"
    },
    availability: {
      type: "string",
      description: "JSON object with availability schedule"
    },
    serviceArea: {
      type: "string",
      description: "Service area coverage (in miles from location)"
    },
    rating: {
      type: "number",
      description: "Average rating from clients",
      default: "5.0"
    },
    totalReviews: {
      type: "integer",
      description: "Total number of reviews",
      default: "0"
    },
    completedAppointments: {
      type: "integer",
      description: "Total completed appointments",
      default: "0"
    },
    totalEarnings: {
      type: "number",
      description: "Total earnings to date",
      default: "0"
    },
    isVerified: {
      type: "string",
      default: "false",
      description: "Professional verification status"
    },
    bankAccount: {
      type: "string",
      description: "JSON encrypted bank account info for payouts"
    },
    paymentMethod: {
      type: "string",
      description: "Preferred payment method (direct_deposit, stripe, paypal)"
    }
  },
  required: ["userId", "businessName"]
};

export type Professional = {
  id: number;
  userId: number;
  businessName: string;
  businessType: "salon" | "freelance" | "mobile" | "spa";
  specialties: string;
  yearsExperience: number;
  hourlyRate: number;
  certification: string;
  portfolio: string;
  availability: string;
  serviceArea: string;
  rating: number;
  totalReviews: number;
  completedAppointments: number;
  totalEarnings: number;
  isVerified: string;
  bankAccount: string;
  paymentMethod: string;
  created_at: string;
  updated_at: string;
};
