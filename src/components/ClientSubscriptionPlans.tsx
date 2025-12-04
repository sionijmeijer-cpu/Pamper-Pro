import { Check, Star, Sparkles } from "lucide-react";

type ClientPlan = {
  id: string;
  name: string;
  price: number;
  type: "free" | "premium";
  description: string;
  features: string[];
  note?: string;
  popular?: boolean;
};

const clientPlans: ClientPlan[] = [
  {
    id: "free-basic",
    name: "Free Basic Access",
    price: 0,
    type: "free",
    description: "Perfect for occasional bookings",
    features: [
      "Browse all services and professionals",
      "Create and manage profile",
      "View booking history",
      "Save favourites",
      "Receive notifications",
    ],
    note: "After your first 5 bookings, a small fee of ₦500/month will apply.",
  },
  {
    id: "premium",
    name: "Premium Membership",
    price: 13500,
    type: "premium",
    description: "Best value for regular bookings",
    popular: true,
    features: [
      "All Basic Features",
      "Early access to new services and promotions",
      "Priority customer support",
      "Ability to receive exclusive discounts",
      "Option to subscribe for unlimited bookings",
      "Special offers for group bookings",
      "Surprise occasions with discounts",
    ],
  },
];

export default function ClientSubscriptionPlans({
  onSelectPlan,
}: {
  onSelectPlan?: (planId: string) => void;
}) {
  return (
    <div className="w-full py-16 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your beauty and wellness needs
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {clientPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 transition-all duration-300 hover:shadow-2xl ${
                plan.popular
                  ? "border-purple-500 transform scale-105"
                  : "border-gray-200"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-gray-900">
                    ₦{plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Note */}
              {plan.note && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> {plan.note}
                  </p>
                </div>
              )}

              {/* CTA Button */}
              <button
                onClick={() => onSelectPlan?.(plan.id)}
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {plan.type === "free" ? "Get Started Free" : "Upgrade to Premium"}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <p className="text-gray-700">
              All plans include access to top-rated professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
