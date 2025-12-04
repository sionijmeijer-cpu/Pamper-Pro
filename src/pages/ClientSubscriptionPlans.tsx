import { Check, Zap, Gift } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export function ClientSubscriptionPlans() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-teal-50 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              👑 Client Plans
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Access Premium Beauty Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book appointments with top professionals. Start free, upgrade anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Free Basic Access */}
          <div className="relative rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all p-8 flex flex-col">
            {/* Plan Name */}
            <h3 className="text-2xl font-bold mb-2 text-gray-900">
              Free Basic Access
            </h3>
            <p className="text-sm mb-6 text-gray-600">
              Get started with zero commitment
            </p>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-teal-600">₦0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Forever free for all clients</p>
            </div>

            {/* Features List */}
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-600" />
                <span className="text-sm text-gray-700">
                  Browse all professionals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-600" />
                <span className="text-sm text-gray-700">
                  Search by service & location
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-600" />
                <span className="text-sm text-gray-700">
                  View ratings & reviews
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-600" />
                <span className="text-sm text-gray-700">
                  Create profile & save favorites
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-600" />
                <span className="text-sm text-gray-700">
                  <span className="font-semibold">First 5 bookings FREE</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Gift className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-500" />
                <span className="text-sm text-gray-700">
                  <span className="font-semibold">After: ₦500/month</span> (optional)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-600" />
                <span className="text-sm text-gray-700">
                  Booking reminders & confirmations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-600" />
                <span className="text-sm text-gray-700">
                  Standard customer support
                </span>
              </li>
            </ul>

            {/* CTA Button */}
            <Button
              onClick={() => navigate('/signup')}
              className="w-full font-semibold py-3 rounded-lg bg-teal-100 text-gray-900 hover:bg-teal-200 transition-all"
            >
              Get Started Free
            </Button>
          </div>

          {/* Premium Membership */}
          <div className="relative rounded-2xl shadow-2xl bg-gradient-to-br from-blue-600 to-teal-600 text-white ring-2 ring-blue-600 p-8 flex flex-col md:scale-105">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                Most Popular
              </span>
            </div>

            {/* Plan Name */}
            <h3 className="text-2xl font-bold mb-2 text-white">
              Premium Membership
            </h3>
            <p className="text-sm mb-6 text-blue-100">
              Unlimited bookings & exclusive perks
            </p>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">₦13,500</span>
                <span className="text-blue-100">/month</span>
              </div>
              <p className="text-sm text-blue-100 mt-2">Cancel anytime, no commitment</p>
            </div>

            {/* Features List */}
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-300" />
                <span className="text-sm text-blue-50">
                  All Free features included
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-300" />
                <span className="text-sm text-blue-50">
                  <span className="font-semibold">Unlimited bookings</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-300" />
                <span className="text-sm text-blue-50">
                  Early access to new services
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-300" />
                <span className="text-sm text-blue-50">
                  Exclusive discounts (up to 30%)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-300" />
                <span className="text-sm text-blue-50">
                  Group booking discounts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-300" />
                <span className="text-sm text-blue-50">
                  Special occasion discounts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-300" />
                <span className="text-sm text-blue-50">
                  Priority customer support
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-300" />
                <span className="text-sm text-blue-50">
                  Personalized recommendations
                </span>
              </li>
            </ul>

            {/* CTA Button */}
            <Button
              onClick={() => navigate('/signup')}
              className="w-full font-semibold py-3 rounded-lg bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg transition-all"
            >
              Upgrade to Premium
            </Button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Feature Comparison
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-teal-50 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left font-bold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-900">Free</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-900">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Browse Professionals</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-teal-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-blue-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Book Appointments</td>
                    <td className="px-6 py-4 text-center">5 free</td>
                    <td className="px-6 py-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Cost After Free Tier</td>
                    <td className="px-6 py-4 text-center">₦500/mo</td>
                    <td className="px-6 py-4 text-center">₦13,500/mo</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Exclusive Discounts</td>
                    <td className="px-6 py-4 text-center">—</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-blue-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Early Access</td>
                    <td className="px-6 py-4 text-center">—</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-blue-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Priority Support</td>
                    <td className="px-6 py-4 text-center">Standard</td>
                    <td className="px-6 py-4 text-center">Priority</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Group Discounts</td>
                    <td className="px-6 py-4 text-center">—</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-blue-600 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Smart Pricing Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-teal-100">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Pay As You Go</h3>
            <p className="text-gray-600 text-sm">
              Start free with 5 bookings. After that, pay ₦500/month only if you want to keep booking—no automatic charge!
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-100">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Save Big</h3>
            <p className="text-gray-600 text-sm">
              Premium members save 30%+ on every booking. With just 1-2 bookings per month, you pay for itself!
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-purple-100">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Exclusive Perks</h3>
            <p className="text-gray-600 text-sm">
              Premium members get early access to new professionals, special occasion discounts, and group booking deals.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ Do I have to sign up for Premium?</h3>
              <p className="text-gray-600">
                Not at all! Start free and try 5 bookings. Only upgrade to Premium if you want unlimited bookings and exclusive discounts.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ What happens after my 5 free bookings?</h3>
              <p className="text-gray-600">
                You'll see a prompt to either upgrade to Premium or pay ₦500/month for a single month. You can also just browse!
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ Can I cancel Premium anytime?</h3>
              <p className="text-gray-600">
                Yes! Cancel anytime with no penalties. You'll have access until the end of your billing month.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, and Nigerian mobile money (Paystack, Flutterwave).
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ How do I track my free bookings?</h3>
              <p className="text-gray-600">
                Your dashboard shows your booking count and how many free bookings you have left. We'll remind you as you get close!
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ Are the discounts real?</h3>
              <p className="text-gray-600">
                Yes! Premium members get up to 30% off at participating professionals, plus exclusive offers and early access to new services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
