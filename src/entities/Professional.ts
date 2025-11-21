import type { EntityConfig } from "../hooks/useEntity";

export const professionalEntityConfig: EntityConfig = {
  name: "Professional",
  orderBy: "created_at DESC",
  properties: {
    name: { type: "string", description: "Professional's full name" },
    businessName: { type: "string", description: "Business or salon name" },
    category: {
      type: "string",
      enum: ["Hair Stylist", "Barber", "Makeup Artist", "Nail Technician", "Spa Therapist", "Lash Technician", "Esthetician", "Massage Therapist"],
      description: "Service category",
    },
    location: { type: "string", description: "Area in Lagos" },
    address: { type: "string", description: "Full address" },
    phone: { type: "string", description: "Phone number" },
    email: { type: "string", description: "Email address" },
    bio: { type: "string", description: "Professional bio" },
    experience: { type: "string", description: "Years of experience" },
    avatar: { type: "string", description: "Profile image URL" },
    coverImage: { type: "string", description: "Cover photo URL" },
    rating: { type: "number", description: "Average rating" },
    reviewCount: { type: "integer", description: "Number of reviews" },
    verified: { type: "string", default: "false", description: "Verification status" },
    subscriptionTier: {
      type: "string",
      enum: ["Free", "Basic", "Premium", "Elite"],
      default: "Free",
      description: "Subscription level",
    },
    subscriptionPrice: { type: "number", description: "Monthly subscription in Naira" },
    instagramHandle: { type: "string", description: "Instagram username" },
    portfolioImages: { type: "string", description: "JSON array of portfolio image URLs" },
  },
  required: ["name", "businessName", "category", "location", "phone"],
};
