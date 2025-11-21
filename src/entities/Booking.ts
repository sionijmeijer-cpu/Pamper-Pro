import type { EntityConfig } from "../hooks/useEntity";

export const bookingEntityConfig: EntityConfig = {
  name: "Booking",
  orderBy: "created_at DESC",
  properties: {
    professionalId: { type: "integer", description: "ID of the professional" },
    serviceId: { type: "integer", description: "ID of the service" },
    clientName: { type: "string", description: "Client's name" },
    clientPhone: { type: "string", description: "Client's phone number" },
    clientEmail: { type: "string", description: "Client's email" },
    date: { type: "string", format: "date", description: "Booking date" },
    time: { type: "string", description: "Booking time" },
    duration: { type: "integer", description: "Duration in minutes" },
    price: { type: "number", description: "Total price in Naira" },
    status: {
      type: "string",
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
      description: "Booking status",
    },
    notes: { type: "string", description: "Additional notes" },
  },
  required: ["professionalId", "serviceId", "clientName", "clientPhone", "date", "time", "price"],
};
