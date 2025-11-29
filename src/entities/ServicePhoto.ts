import type { EntityConfig } from "../hooks/useEntity";

export const servicePhotoEntityConfig: EntityConfig = {
  name: "ServicePhoto",
  orderBy: "created_at DESC",
  properties: {
    serviceId: {
      type: "integer",
      description: "Reference to ProfessionalService entity"
    },
    professionalId: {
      type: "integer",
      description: "Reference to Professional entity"
    },
    photoUrl: {
      type: "string",
      description: "URL/path to the photo"
    },
    photoName: {
      type: "string",
      description: "Name/title of the photo"
    },
    displayOrder: {
      type: "integer",
      description: "Order in which photo is displayed (1-5)"
    },
    uploadedAt: {
      type: "string",
      description: "Timestamp when photo was uploaded"
    }
  },
  required: ["serviceId", "professionalId", "photoUrl", "displayOrder"]
};

export type ServicePhoto = {
  id: number;
  serviceId: number;
  professionalId: number;
  photoUrl: string;
  photoName: string;
  displayOrder: number;
  uploadedAt: string;
  created_at: string;
  updated_at: string;
};
