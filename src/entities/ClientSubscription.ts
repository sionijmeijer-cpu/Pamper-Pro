import type { EntityConfig } from "../hooks/useEntity";

export const clientSubscriptionEntityConfig: EntityConfig = {
  name: "ClientSubscription",
  orderBy: "created_at DESC",
  properties: {
    user_id: { 
      type: "integer", 
      description: "Reference to user ID" 
    },
    plan_id: { 
      type: "integer", 
      description: "Reference to subscription plan ID" 
    },
    plan_name: { 
      type: "string", 
      description: "Name of the subscription plan (Free Basic Access, Premium Membership)" 
    },
    plan_type: { 
      type: "string", 
      description: "Type of plan: free or premium" 
    },
    price: { 
      type: "number", 
      description: "Monthly price in Naira" 
    },
    status: { 
      type: "string", 
      enum: ["active", "cancelled", "expired", "payment_required"],
      description: "Current subscription status" 
    },
    booking_count: { 
      type: "integer", 
      description: "Total number of bookings made by this client",
      default: "0"
    },
    requires_payment: { 
      type: "string", 
      description: "Whether client needs to pay ₦500/month (after 5 bookings)",
      default: "false"
    },
    payment_started_at: { 
      type: "string", 
      description: "Date when ₦500/month payment requirement started (after 5th booking)" 
    },
    next_billing_date: { 
      type: "string", 
      description: "Next billing date for premium members" 
    },
    auto_renew: { 
      type: "string", 
      description: "Whether subscription auto-renews",
      default: "true"
    },
    started_at: { 
      type: "string", 
      description: "Subscription start date" 
    },
    cancelled_at: { 
      type: "string", 
      description: "Date subscription was cancelled" 
    }
  },
  required: ["user_id", "plan_name", "plan_type", "price", "status"],
};
