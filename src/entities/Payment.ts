import type { EntityConfig } from "../hooks/useEntity";

export const paymentEntityConfig: EntityConfig = {
  name: "Payment",
  orderBy: "createdAt DESC",
  properties: {
    bookingId: {
      type: "integer",
      description: "Reference to Booking entity"
    },
    clientId: {
      type: "integer",
      description: "Reference to Client entity"
    },
    professionalId: {
      type: "integer",
      description: "Reference to Professional entity"
    },
    amount: {
      type: "number",
      description: "Payment amount in USD"
    },
    status: {
      type: "string",
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      description: "Payment status"
    },
    paymentMethod: {
      type: "string",
      enum: ["credit_card", "debit_card", "paypal", "stripe", "apple_pay", "cash"],
      description: "Payment method used"
    },
    transactionId: {
      type: "string",
      description: "External payment processor transaction ID"
    },
    receipt: {
      type: "string",
      description: "Receipt/invoice URL"
    },
    refundAmount: {
      type: "number",
      description: "Amount refunded if applicable",
      default: "0"
    },
    refundReason: {
      type: "string",
      description: "Reason for refund if applicable"
    },
    metadata: {
      type: "string",
      description: "JSON object with additional payment metadata"
    },
    processedAt: {
      type: "string",
      description: "Timestamp when payment was processed"
    }
  },
  required: ["bookingId", "clientId", "professionalId", "amount"]
};

export type Payment = {
  id: number;
  bookingId: number;
  clientId: number;
  professionalId: number;
  amount: number;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: "credit_card" | "debit_card" | "paypal" | "stripe" | "apple_pay" | "cash";
  transactionId: string;
  receipt: string;
  refundAmount: number;
  refundReason: string;
  metadata: string;
  processedAt: string;
  created_at: string;
  updated_at: string;
};
