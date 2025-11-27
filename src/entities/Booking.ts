import type { EntityConfig } from "../hooks/useEntity";

export const bookingEntityConfig: EntityConfig = {
  name: "Booking",
  orderBy: "appointmentDate DESC",
  properties: {
    clientId: {
      type: "integer",
      description: "Reference to Client entity"
    },
    professionalId: {
      type: "integer",
      description: "Reference to Professional entity"
    },
    serviceId: {
      type: "integer",
      description: "Reference to Service entity"
    },
    appointmentDate: {
      type: "string",
      description: "Appointment date and time (ISO format)"
    },
    status: {
      type: "string",
      enum: ["pending", "confirmed", "in_progress", "completed", "cancelled", "no_show"],
      default: "pending",
      description: "Booking status"
    },
    totalPrice: {
      type: "number",
      description: "Total price for the booking in USD"
    },
    notes: {
      type: "string",
      description: "Special instructions or notes from client"
    },
    reminderSent: {
      type: "string",
      default: "false",
      description: "Whether reminder notification has been sent"
    },
    completedAt: {
      type: "string",
      description: "Timestamp when appointment was completed"
    },
    cancellationReason: {
      type: "string",
      description: "Reason for cancellation if applicable"
    },
    rescheduledFrom: {
      type: "integer",
      description: "Reference to original booking if rescheduled"
    },
    duration: {
      type: "integer",
      description: "Actual duration of appointment in minutes"
    },
    feedback: {
      type: "string",
      description: "JSON object with client feedback and rating"
    },
    paymentStatus: {
      type: "string",
      enum: ["pending", "completed", "refunded"],
      default: "pending",
      description: "Payment status for the booking"
    }
  },
  required: ["clientId", "professionalId", "serviceId", "appointmentDate"]
};

export type Booking = {
  id: number;
  clientId: number;
  professionalId: number;
  serviceId: number;
  appointmentDate: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show";
  totalPrice: number;
  notes: string;
  reminderSent: string;
  completedAt: string;
  cancellationReason: string;
  rescheduledFrom: number;
  duration: number;
  feedback: string;
  paymentStatus: "pending" | "completed" | "refunded";
  created_at: string;
  updated_at: string;
};
