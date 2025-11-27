import type { EntityConfig } from "../hooks/useEntity";

export const serviceEntityConfig: EntityConfig = {
  name: "Service",
  orderBy: "name ASC",
  properties: {
    professionalId: {
      type: "integer",
      description: "Reference to Professional entity"
    },
    name: {
      type: "string",
      description: "Service name (e.g., Hair Cut, Braids, Nail Design)"
    },
    category: {
      type: "string",
      enum: ["haircut", "braids", "nails", "makeup", "weaves", "color", "spa", "skincare"],
      description: "Service category"
    },
    description: {
      type: "string",
      description: "Detailed service description"
    },
    basePrice: {
      type: "number",
      description: "Base price for the service in USD"
    },
    durationMinutes: {
      type: "integer",
      description: "Estimated service duration in minutes"
    },
    imageUrl: {
      type: "string",
      description: "Service image/thumbnail URL"
    },
    isActive: {
      type: "string",
      default: "true",
      description: "Whether service is currently offered"
    },
    bookingCount: {
      type: "integer",
      description: "Total number of bookings for this service",
      default: "0"
    },
    averageRating: {
      type: "number",
      description: "Average service rating",
      default: "5.0"
    },
    variationOptions: {
      type: "string",
      description: "JSON array of service variations with prices (e.g., {length, color})"
    },
    requirements: {
      type: "string",
      description: "JSON array of special requirements or notes"
    }
  },
  required: ["professionalId", "name", "category", "basePrice"]
};

export type Service = {
  id: number;
  professionalId: number;
  name: string;
  category: "haircut" | "braids" | "nails" | "makeup" | "weaves" | "color" | "spa" | "skincare";
  description: string;
  basePrice: number;
  durationMinutes: number;
  imageUrl: string;
  isActive: string;
  bookingCount: number;
  averageRating: number;
  variationOptions: string;
  requirements: string;
  created_at: string;
  updated_at: string;
};
