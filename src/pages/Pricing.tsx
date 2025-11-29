import { Check } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Clients Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200 hover:border-teal-500 transition-colors">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">💅 For Clients</h3>
              <p className="text-gray-600">Find and book beauty services</p>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-teal-600">Free</span>
              <p className="text-gray-600 text-sm mt-2">Forever free for all clients</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Search for professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">View ratings & reviews</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Book appointments</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Manage your bookings</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Reschedule & cancel bookings</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Booking reminders via SMS & email</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Favorite professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Shop beauty products</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">24/7 customer support</span>
              </li>
            </ul>

            <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold">
              Get Started
            </Button>
          </div>

          {/* Service Professionals Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-teal-500 hover:shadow-xl transition-all transform hover:scale-105 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🚀 Service Professional
              </h3>
              <p className="text-gray-600">For stylists, therapists & beauty experts</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-teal-600">₦4,999</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">Or ₦49,990/year (Save 17%)</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Create professional profile</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Manage bookings & schedule</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Unlimited client bookings</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Payment processing & payouts</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Client reviews & ratings</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Marketing tools & analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">SMS notifications</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Priority customer support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Up to 3 service categories</span>
              </li>
            </ul>

            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
              Launch Your Business
            </Button>
          </div>

          {/* Vendor Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200 hover:border-teal-500 transition-colors">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">🛍️ Vendor</h3>
              <p className="text-gray-600">Sell beauty products online</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-teal-600">₦7,999</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">Or ₦79,990/year (Save 17%)</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Unlimited product listings</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Inventory management</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Order processing</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Automated payouts</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Product analytics & insights</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Marketing & promotional tools</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Customer reviews & ratings</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Order management dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Priority support</span>
              </li>
            </ul>

            <Button className="w-full bg-gray-900 hover:bg-black text-white font-semibold">
              Start Selling
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time with no penalties or hidden fees.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Is there a setup fee?</h3>
              <p className="text-gray-600">
                No setup fees. You only pay the monthly or yearly subscription amount.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, and mobile money payments.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Do you charge commission on bookings?</h3>
              <p className="text-gray-600">
                We charge a small 5% commission on completed bookings through our platform.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">
                Yes! Change your plan anytime. We'll prorate any charges or credits.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Is customer support included?</h3>
              <p className="text-gray-600">
                Absolutely! All plans include access to our customer support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
