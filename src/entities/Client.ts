import type { EntityConfig } from "../hooks/useEntity";

export const clientEntityConfig: EntityConfig = {
  name: "Client",
  orderBy: "created_at DESC",
  properties: {
    userId: {
      type: "integer",
      description: "Reference to User entity"
    },
    favoriteServices: {
      type: "string",
      description: "JSON array of favorite service IDs"
    },
    preferredProfessionals: {
      type: "string",
      description: "JSON array of preferred professional IDs"
    },
    hairType: {
      type: "string",
      description: "Hair type (straight, wavy, curly, coily, etc.)"
    },
    skinTone: {
      type: "string",
      description: "Skin tone preference"
    },
    allergies: {
      type: "string",
      description: "Product allergies and sensitivities"
    },
    notificationPreferences: {
      type: "string",
      description: "JSON object with notification settings"
    },
    totalSpent: {
      type: "number",
      description: "Total amount spent on services",
      default: "0"
    },
    appointmentCount: {
      type: "integer",
      description: "Total number of completed appointments",
      default: "0"
    },
    lastAppointmentDate: {
      type: "string",
      description: "Date of last appointment"
    },
    notes: {
      type: "string",
      description: "Internal notes about the client"
    }
  },
  required: ["userId"]
};

export type Client = {
  id: number;
  userId: number;
  favoriteServices: string;
  preferredProfessionals: string;
  hairType: string;
  skinTone: string;
  allergies: string;
  notificationPreferences: string;
  totalSpent: number;
  appointmentCount: number;
  lastAppointmentDate: string;
  notes: string;
  created_at: string;
  updated_at: string;
};
