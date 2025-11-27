import type { EntityConfig } from "../hooks/useEntity";

export const reviewEntityConfig: EntityConfig = {
  name: "Review",
  orderBy: "created_at DESC",
  properties: {
    bookingId: {
      type: "integer",
      description: "Reference to Booking entity"
    },
    clientId: {
      type: "integer",
      description: "Reference to Client entity who left the review"
    },
    professionalId: {
      type: "integer",
      description: "Reference to Professional entity being reviewed"
    },
    serviceId: {
      type: "integer",
      description: "Reference to Service entity"
    },
    rating: {
      type: "integer",
      description: "Star rating 1-5"
    },
    title: {
      type: "string",
      description: "Review title/headline"
    },
    comment: {
      type: "string",
      description: "Detailed review comment"
    },
    cleanliness: {
      type: "integer",
      description: "Cleanliness rating 1-5"
    },
    professionalism: {
      type: "integer",
      description: "Professionalism rating 1-5"
    },
    skillLevel: {
      type: "integer",
      description: "Skill level rating 1-5"
    },
    timelinessRating: {
      type: "integer",
      description: "Punctuality/timeliness rating 1-5"
    },
    wouldRecommend: {
      type: "string",
      default: "true",
      description: "Whether client would recommend this professional"
    },
    verifiedBooking: {
      type: "string",
      default: "true",
      description: "Whether this review is from a verified booking"
    },
    photos: {
      type: "string",
      description: "JSON array of photo URLs from the appointment"
    }
  },
  required: ["bookingId", "clientId", "professionalId", "rating"]
};

export type Review = {
  id: number;
  bookingId: number;
  clientId: number;
  professionalId: number;
  serviceId: number;
  rating: number;
  title: string;
  comment: string;
  cleanliness: number;
  professionalism: number;
  skillLevel: number;
  timelinessRating: number;
  wouldRecommend: string;
  verifiedBooking: string;
  photos: string;
  created_at: string;
  updated_at: string;
};
