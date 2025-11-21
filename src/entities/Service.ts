import type { EntityConfig } from "../hooks/useEntity";

export const serviceEntityConfig: EntityConfig = {
  name: "Service",
  orderBy: "created_at DESC",
  properties: {
    professionalId: { type: "integer", description: "ID of the professional offering this service" },
    name: { type: "string", description: "Service name" },
    description: { type: "string", description: "Service description" },
    category: {
      type: "string",
      enum: ["Hair", "Nails", "Makeup", "Spa", "Lashes", "Barbering", "Skincare", "Massage"],
      description: "Service category",
    },
    duration: { type: "integer", description: "Duration in minutes" },
    price: { type: "number", description: "Price in Naira" },
    isActive: { type: "string", default: "true", description: "Service availability" },
  },
  required: ["professionalId", "name", "category", "duration", "price"],
};
