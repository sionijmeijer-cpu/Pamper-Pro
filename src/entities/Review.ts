import type { EntityConfig } from "../hooks/useEntity";

export const reviewEntityConfig: EntityConfig = {
  name: "Review",
  orderBy: "created_at DESC",
  properties: {
    professionalId: { type: "integer", description: "ID of the professional being reviewed" },
    clientName: { type: "string", description: "Reviewer's name" },
    rating: { type: "integer", description: "Rating from 1-5" },
    comment: { type: "string", description: "Review comment" },
    serviceType: { type: "string", description: "Type of service received" },
    verified: { type: "string", default: "false", description: "Verified booking" },
  },
  required: ["professionalId", "clientName", "rating", "comment"],
};
