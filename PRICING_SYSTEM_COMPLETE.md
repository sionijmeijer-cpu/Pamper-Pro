# Pamper Pro - Complete Pricing System Documentation

## Overview
Pamper Pro has three distinct user types with different pricing models:
1. **Service Professionals** - Provide beauty/wellness services
2. **Vendors** - Sell beauty/wellness products
3. **Clients** - Book services and buy products

---

## 🎯 CLIENT PRICING STRUCTURE

### Free Basic Access (₦0/month)
**Initial Status:**
- First 5 bookings are completely free
- Full access to platform features

**After 5 Bookings:**
- ₦500/month fee applies automatically
- All features remain the same

**Features:**
- ✅ Browse all services and professionals
- ✅ Create and manage profile
- ✅ View booking history
- ✅ Save favourites
- ✅ Receive notifications

**Database Fields:**
- `booking_count` - Tracks total bookings (triggers ₦500/month at 5)
- `requires_payment` - "false" initially, becomes "true" after 5 bookings
- `payment_started_at` - Date when ₦500/month started

### Premium Membership (₦13,500/month)
**Benefits:**
- ✅ All Basic Features
- ✅ Early access to new services and promotions
- ✅ Priority customer support
- ✅ Exclusive discounts
- ✅ Unlimited bookings
- ✅ Special offers for group bookings
- ✅ Surprise occasions with discounts

**Best For:**
- Regular users who book frequently
- Users who want priority support
- Those seeking exclusive deals

---

## 💼 SERVICE PROFESSIONAL PRICING

### 7-Day Free Trial
- All new service professionals get 7 days free
- Full access to chosen plan features during trial
- Automatic conversion to paid plan after trial

### Basic Plan (20% commission per booking)
**Pay-as-you-go model:**
- No monthly fee
- 20% cut per booking (platform fee)
- Only pay when you earn

**Features:**
- ✅ Create a basic profile
- ✅ List up to 3 services
- ✅ Limited to 10 bookings per month
- ✅ Access to basic dashboard features
- ✅ Core platform features
- ✅ Standard support

**Limits:**
- Max 3 services
- Max 10 bookings/month

### Standard Plan (₦16,350/month)
**Features:**
- ✅ Unlimited services listing
- ✅ Unlimited bookings
- ✅ One free studio photo session (offered by PamperPro)
- ✅ Access to analytics and customer management tools
- ✅ Highlighted profile/status in search results
- ✅ Priority support

**Best For:**
- Growing professionals
- Those who want better visibility
- Businesses with regular clientele

### Premium Plan (₦23,850/month)
**Features:**
- ✅ All Standard features
- ✅ Feature in premium listings
- ✅ One free studio photo and video session (offered by PamperPro)
- ✅ Promotion through featured banners
- ✅ Advanced analytics
- ✅ Ability to create promotional offers and discounts

**Best For:**
- Established professionals
- Those seeking maximum visibility
- Premium service providers

### Enterprise / Custom Plan (Custom Pricing)
**Features:**
- ✅ For large or multiple-location salons/spas
- ✅ Custom branding and marketing options
- ✅ API access for integrations to social media platforms
- ✅ Dedicated support team

**Contact:** Custom quote required

---

## 🛍️ VENDOR PRICING

### 7-Day Free Trial
- All new vendors get 7 days free
- Full access to chosen plan features during trial

### Basic Plan (20% commission per sale)
**Pay-as-you-go model:**
- No monthly fee
- 20% cut per sale (platform fee)
- Only pay when you sell

**Features:**
- ✅ Create a basic profile
- ✅ List up to 3 products
- ✅ Limited to 20 sales per month
- ✅ Access to basic dashboard features
- ✅ Core platform features
- ✅ Standard support

**Limits:**
- Max 3 products
- Max 20 sales/month

### Premium Plan (₦19,350/month)
**Features:**
- ✅ Unlimited product listing
- ✅ Unlimited sales
- ✅ Access to analytics and customer management tools
- ✅ Priority support
- ✅ Promotion through featured banners
- ✅ Advanced analytics
- ✅ Ability to create promotional offers and discounts on products

**Best For:**
- Serious vendors
- Those with large product catalogs
- Businesses seeking growth

---

## 🔧 TECHNICAL IMPLEMENTATION

### Database Entities

**1. SubscriptionPlans (All Users)**
```typescript
{
  name: string,
  user_type: "professional" | "vendor" | "client",
  plan_type: "commission" | "fixed" | "free" | "premium" | "custom",
  price: number,
  commission_rate: number,
  billing_cycle: "monthly" | "yearly" | "per_transaction",
  description: string,
  features: string[], // JSON array
  limits: object, // JSON object with plan limits
}
```

**2. UserSubscription (Professionals & Vendors)**
```typescript
{
  user_id: number,
  plan_id: number,
  plan_name: string,
  user_type: "professional" | "vendor",
  status: "trial" | "active" | "cancelled" | "expired",
  trial_ends_at: string,
  next_billing_date: string,
  auto_renew: string,
  started_at: string,
}
```

**3. ClientSubscription (Clients Only)**
```typescript
{
  user_id: number,
  plan_id: number,
  plan_name: string,
  plan_type: "free" | "premium",
  price: number,
  status: "active" | "payment_required" | "cancelled",
  booking_count: number, // Tracks bookings (triggers ₦500 at 5)
  requires_payment: string, // "false" until 5 bookings
  payment_started_at: string, // When ₦500/month started
  next_billing_date: string,
  auto_renew: string,
}
```

### Key Components

**1. Professional/Vendor Components:**
- `SubscriptionPlansPage` - Display all professional/vendor plans
- `SubscriptionManagement` - Dashboard widget showing trial/subscription status
- `subscription-utils.ts` - Helper functions for trial calculations

**2. Client Components:**
- `ClientSubscriptionPlans` - Display free and premium client plans
- `ClientSubscriptionStatus` - Dashboard widget with booking progress
- `client-subscription-utils.ts` - Helper functions for booking limits

### Payment Logic

**Clients:**
```javascript
// Check if client needs to pay ₦500/month
if (booking_count >= 5 && plan_type === "free" && !requires_payment) {
  // Trigger ₦500/month payment
  updateSubscription({
    requires_payment: "true",
    payment_started_at: new Date().toISOString(),
    status: "payment_required"
  });
}
```

**Professionals/Vendors (Commission Plans):**
```javascript
// Calculate platform fee on each transaction
const platformFee = bookingTotal * 0.20; // 20% commission
const professionalEarnings = bookingTotal - platformFee;
```

---

## 🚀 DEPLOYMENT STEPS

### 1. Deploy Code to Azure
```bash
git add .
git commit -m "Add complete client pricing system"
git push
```

### 2. Seed All Plans (Including Client Plans)
```bash
curl -X POST https://your-app.azurestaticapps.net/api/seed-plans
```

This will create:
- 4 Professional plans
- 2 Vendor plans
- 2 Client plans (Free Basic Access, Premium Membership)

### 3. Integration Points

**Client Signup Flow:**
```
1. User signs up as "Client"
2. Automatically assigned "Free Basic Access" plan
3. booking_count starts at 0
4. After 5 bookings → requires_payment = "true"
5. User prompted to pay ₦500/month or upgrade to Premium
```

**Professional/Vendor Signup Flow:**
```
1. User signs up as "Professional" or "Vendor"
2. User selects a plan (Basic, Standard, Premium, Enterprise)
3. 7-day trial starts automatically
4. After 7 days → subscription converts to paid
5. Billing begins based on plan type
```

---

## 📊 USAGE EXAMPLES

### Display Client Subscription Status
```tsx
import ClientSubscriptionStatus from './components/ClientSubscriptionStatus';
import { useEntity } from './hooks/useEntity';
import { clientSubscriptionEntityConfig } from './entities/ClientSubscription';

function ClientDashboard() {
  const { items: subscriptions } = useEntity(clientSubscriptionEntityConfig);
  const currentSub = subscriptions[0]; // User's active subscription

  return (
    <ClientSubscriptionStatus
      subscription={currentSub}
      onUpgrade={() => navigateToPricing()}
      onManageBilling={() => openBillingModal()}
    />
  );
}
```

### Check If Client Needs Payment
```tsx
import { shouldRequirePayment } from './lib/client-subscription-utils';

// After a booking is completed
const handleBookingComplete = async (subscription) => {
  const updatedCount = subscription.booking_count + 1;
  
  if (updatedCount === 5) {
    // Trigger ₦500/month payment requirement
    await update(subscription.id, {
      booking_count: updatedCount,
      requires_payment: "true",
      payment_started_at: new Date().toISOString(),
      status: "payment_required"
    });
    
    // Show payment modal to user
    showPaymentModal();
  } else {
    // Just update count
    await update(subscription.id, {
      booking_count: updatedCount
    });
  }
};
```

---

## 🎨 UI COMPONENTS READY

✅ **ClientSubscriptionPlans** - Displays Free and Premium options
✅ **ClientSubscriptionStatus** - Shows booking progress and upgrade prompts
✅ **SubscriptionPlansPage** - Professional/Vendor plan selection
✅ **SubscriptionManagement** - Trial countdown and billing info

All components are fully styled, responsive, and ready to integrate!

---

## 💡 BUSINESS RULES

1. **Clients start free** - No upfront payment required
2. **5 bookings = trigger point** - After 5th booking, ₦500/month applies
3. **Premium unlimited** - Premium clients never pay booking fees
4. **7-day trials for pros/vendors** - All business accounts get trials
5. **Commission vs Fixed** - Basic plans use commission, higher tiers use fixed monthly
6. **Auto-renewal** - All subscriptions auto-renew unless cancelled

---

## 🔒 IMPORTANT NOTES

- Client subscriptions are separate from Professional/Vendor subscriptions
- Booking count tracking is automatic in ClientSubscription entity
- Payment gateway integration required for actual charges
- Trial periods calculated automatically with 7-day offset
- All pricing in Nigerian Naira (₦)

---

**System Status:** ✅ Complete and Ready for Integration
**Last Updated:** 2025
**Version:** 2.0 (Client Pricing Added)
