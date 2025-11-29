import type { EntityConfig } from "../hooks/useEntity";

export const professionalServiceEntityConfig: EntityConfig = {
  name: "ProfessionalService",
  orderBy: "created_at DESC",
  properties: {
    professionalId: {
      type: "integer",
      description: "Reference to Professional entity"
    },
    serviceName: {
      type: "string",
      description: "Name of the service"
    },
    serviceCategory: {
      type: "string",
      description: "Main category of service (e.g., Hair, Makeup, Nails)"
    },
    serviceSubcategory: {
      type: "string",
      description: "Sub-category of service (e.g., Braids, Weaves, Color)"
    },
    serviceDescription: {
      type: "string",
      description: "Detailed description of the service"
    },
    basePrice: {
      type: "number",
      description: "Base price for the service"
    },
    duration: {
      type: "integer",
      description: "Duration in minutes"
    },
    photoCount: {
      type: "integer",
      default: "0",
      description: "Number of photos uploaded for this service"
    },
    isActive: {
      type: "string",
      default: "true",
      description: "Whether service is currently available"
    }
  },
  required: ["professionalId", "serviceName", "serviceCategory", "serviceSubcategory"]
};

export type ProfessionalService = {
  id: number;
  professionalId: number;
  serviceName: string;
  serviceCategory: string;
  serviceSubcategory: string;
  serviceDescription: string;
  basePrice: number;
  duration: number;
  photoCount: number;
  isActive: string;
  created_at: string;
  updated_at: string;
};
