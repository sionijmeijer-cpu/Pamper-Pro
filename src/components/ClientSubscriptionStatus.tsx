import { useState } from "react";
import { Crown, Calendar, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

type ClientSubscriptionStatusProps = {
  subscription: {
    plan_name: string;
    plan_type: "free" | "premium";
    price: number;
    status: string;
    booking_count: number;
    requires_payment: string;
    payment_started_at?: string;
    next_billing_date?: string;
    auto_renew: string;
  };
  onUpgrade?: () => void;
  onManageBilling?: () => void;
};

export default function ClientSubscriptionStatus({
  subscription,
  onUpgrade,
  onManageBilling,
}: ClientSubscriptionStatusProps) {
  const [showDetails, setShowDetails] = useState(false);

  const isPremium = subscription.plan_type === "premium";
  const isFree = subscription.plan_type === "free";
  const needsPayment = subscription.requires_payment === "true";
  const bookingsRemaining = isFree && !needsPayment ? 5 - subscription.booking_count : 0;
  const showWarning = isFree && subscription.booking_count >= 3 && !needsPayment;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div
        className={`p-6 ${
          isPremium
            ? "bg-gradient-to-r from-purple-600 to-pink-600"
            : "bg-gradient-to-r from-gray-700 to-gray-900"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-white" />
            <div>
              <h3 className="text-2xl font-bold text-white">
                {subscription.plan_name}
              </h3>
              <p className="text-white/80">
                {isPremium
                  ? `₦${subscription.price.toLocaleString()}/month`
                  : needsPayment
                  ? "₦500/month"
                  : "Free"}
              </p>
            </div>
          </div>
          <div
            className={`px-4 py-2 rounded-full font-semibold ${
              subscription.status === "active"
                ? "bg-green-500 text-white"
                : subscription.status === "payment_required"
                ? "bg-yellow-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {subscription.status === "active"
              ? "Active"
              : subscription.status === "payment_required"
              ? "Payment Required"
              : "Inactive"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Booking Count Progress */}
        {isFree && !needsPayment && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-900">
                  Bookings Made
                </span>
              </div>
              <span className="text-lg font-bold text-purple-600">
                {subscription.booking_count} / 5
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(subscription.booking_count / 5) * 100}%`,
                }}
              />
            </div>
            {showWarning && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-yellow-800 font-semibold">
                    {bookingsRemaining} {bookingsRemaining === 1 ? 'booking' : 'bookings'} remaining before ₦500/month fee applies
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Consider upgrading to Premium for unlimited bookings and exclusive perks!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payment Required Notice */}
        {needsPayment && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-800 font-semibold">
                You've completed 5+ bookings - ₦500/month now applies
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Started on {new Date(subscription.payment_started_at || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Premium Features */}
        {isPremium && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Unlimited bookings</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Priority customer support</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Exclusive discounts & early access</span>
            </div>
          </div>
        )}

        {/* Next Billing Date */}
        {subscription.next_billing_date && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Next Billing Date</p>
              <p className="text-sm text-gray-600">
                {new Date(subscription.next_billing_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          {!isPremium && (
            <button
              onClick={onUpgrade}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Upgrade to Premium
            </button>
          )}
          <button
            onClick={onManageBilling}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Manage Billing
          </button>
        </div>

        {/* Toggle Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        {/* Detailed Info */}
        {showDetails && (
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan Type:</span>
              <span className="font-semibold text-gray-900 capitalize">
                {subscription.plan_type}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-gray-900 capitalize">
                {subscription.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Bookings:</span>
              <span className="font-semibold text-gray-900">
                {subscription.booking_count}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Auto-Renew:</span>
              <span className="font-semibold text-gray-900">
                {subscription.auto_renew === "true" ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
