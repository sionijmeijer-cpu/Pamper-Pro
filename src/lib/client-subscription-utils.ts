/**
 * Client Subscription Utilities
 * Handles client subscription logic, booking counts, and payment requirements
 */

export type ClientSubscriptionType = "free" | "premium";

export interface ClientSubscription {
  user_id: number;
  plan_name: string;
  plan_type: ClientSubscriptionType;
  price: number;
  status: "active" | "cancelled" | "expired" | "payment_required";
  booking_count: number;
  requires_payment: string;
  payment_started_at?: string;
  next_billing_date?: string;
  auto_renew: string;
  started_at: string;
}

/**
 * Check if client needs to start paying ₦500/month
 * (Free plan users after 5 bookings)
 */
export function shouldRequirePayment(
  subscription: ClientSubscription
): boolean {
  return (
    subscription.plan_type === "free" &&
    subscription.booking_count >= 5 &&
    subscription.requires_payment === "false"
  );
}

/**
 * Calculate next billing date for client
 */
export function calculateNextBillingDate(
  currentDate: Date = new Date()
): string {
  const nextDate = new Date(currentDate);
  nextDate.setMonth(nextDate.getMonth() + 1);
  return nextDate.toISOString();
}

/**
 * Get subscription display info
 */
export function getSubscriptionDisplayInfo(subscription: ClientSubscription) {
  const isFree = subscription.plan_type === "free";
  const needsPayment = subscription.requires_payment === "true";
  const bookingsRemaining = isFree && !needsPayment ? 5 - subscription.booking_count : 0;
  const showWarning = isFree && subscription.booking_count >= 3 && !needsPayment;

  return {
    isFree,
    isPremium: subscription.plan_type === "premium",
    needsPayment,
    bookingsRemaining,
    showWarning,
    displayPrice: needsPayment ? "₦500/month" : isFree ? "Free" : `₦${subscription.price.toLocaleString()}/month`,
  };
}

/**
 * Format booking count for display
 */
export function formatBookingProgress(bookingCount: number, limit: number = 5): string {
  return `${bookingCount} / ${limit}`;
}

/**
 * Calculate booking percentage for progress bar
 */
export function getBookingProgressPercentage(bookingCount: number, limit: number = 5): number {
  return Math.min((bookingCount / limit) * 100, 100);
}

/**
 * Get upgrade message based on booking count
 */
export function getUpgradeMessage(subscription: ClientSubscription): string | null {
  if (subscription.plan_type === "premium") return null;
  
  const remaining = 5 - subscription.booking_count;
  
  if (remaining <= 0) {
    return "You've used all free bookings. Upgrade to Premium for unlimited bookings!";
  } else if (remaining <= 2) {
    return `Only ${remaining} free ${remaining === 1 ? 'booking' : 'bookings'} left. Upgrade to Premium now!`;
  }
  
  return null;
}

/**
 * Get client plan benefits
 */
export function getClientPlanBenefits(planType: ClientSubscriptionType): string[] {
  if (planType === "premium") {
    return [
      "Unlimited bookings",
      "Early access to new services",
      "Priority customer support",
      "Exclusive discounts",
      "Special group booking offers",
      "Surprise occasion discounts",
    ];
  }
  
  return [
    "Browse all services",
    "Create and manage profile",
    "View booking history",
    "Save favourites",
    "Receive notifications",
  ];
}

/**
 * Validate client subscription data
 */
export function validateClientSubscription(data: Partial<ClientSubscription>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.user_id) errors.push("User ID is required");
  if (!data.plan_name) errors.push("Plan name is required");
  if (!data.plan_type || !["free", "premium"].includes(data.plan_type)) {
    errors.push("Valid plan type is required (free or premium)");
  }
  if (data.price === undefined || data.price < 0) {
    errors.push("Valid price is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Create initial free subscription for new client
 */
export function createInitialClientSubscription(userId: number): Partial<ClientSubscription> {
  return {
    user_id: userId,
    plan_name: "Free Basic Access",
    plan_type: "free",
    price: 0,
    status: "active",
    booking_count: 0,
    requires_payment: "false",
    auto_renew: "true",
    started_at: new Date().toISOString(),
  };
}
