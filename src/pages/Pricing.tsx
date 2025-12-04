import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Pricing() {
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white pt-8 sm:pt-12 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-2 sm:px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-2 sm:px-4">
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base w-full sm:w-auto ${
              activeTab === 'clients'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-600'
            }`}
          >
            📱 For Clients
          </button>
          <button
            onClick={() => setActiveTab('professionals')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base w-full sm:w-auto ${
              activeTab === 'professionals'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-600'
            }`}
          >
            💼 For Professionals
          </button>
          <button
            onClick={() => setActiveTab('vendors')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base w-full sm:w-auto ${
              activeTab === 'vendors'
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-600'
            }`}
          >
            🛍️ For Vendors
          </button>
        </div>

        {/* CLIENT PRICING SECTION */}
        {activeTab === 'clients' && (
          <div className="mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center px-2 sm:px-4">For Clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-2 sm:px-4">
              {/* Free Basic Access */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border-2 border-gray-200 hover:border-teal-500 transition-colors">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">📱 Free Basic Access</h3>
                  <p className="text-sm sm:text-base text-gray-600">Perfect for getting started</p>
                </div>

                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-teal-600">₦0</span>
                  <p className="text-gray-600 text-xs sm:text-sm mt-2">First 5 bookings free, then ₦500/month</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Browse all services and professionals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Create and manage profile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">View booking history</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Save favourites</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Receive notifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">5 free bookings included</span>
                  </li>
                </ul>

                <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold text-sm sm:text-base">
                  Get Started
                </Button>
              </div>

              {/* Premium Membership */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg shadow-xl p-6 sm:p-8 border-2 border-teal-500 relative">
                <div className="absolute top-0 right-0 bg-teal-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs sm:text-sm font-semibold">
                  POPULAR
                </div>

                <div className="mb-6 mt-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">💎 Premium Membership</h3>
                  <p className="text-sm sm:text-base text-gray-600">Unlimited access + exclusive perks</p>
                </div>

                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-teal-600">₦13,500</span>
                  <span className="text-gray-600 text-sm sm:text-base">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700 font-semibold">Everything in Free, plus:</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Unlimited bookings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Priority booking slots</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Exclusive discounts (10-15% off)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Early access to new professionals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">VIP customer support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Free cancellations</span>
                  </li>
                </ul>

                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm sm:text-base">
                  Upgrade to Premium
                </Button>
              </div>
            </div>

            {/* Client FAQs */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-6 sm:p-8 mx-2 sm:mx-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What happens after my 5 free bookings?</h4>
                  <p className="text-sm sm:text-base text-gray-600">After your 5th booking, you'll be charged ₦500/month to continue using the platform, or you can upgrade to Premium for unlimited bookings and exclusive perks.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Can I cancel my Premium subscription anytime?</h4>
                  <p className="text-sm sm:text-base text-gray-600">Yes! You can cancel your Premium subscription at any time with no penalties. You'll continue to have access until the end of your billing period.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What payment methods do you accept?</h4>
                  <p className="text-sm sm:text-base text-gray-600">We accept all major credit/debit cards, bank transfers, and mobile payment options including Paystack and Flutterwave.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROFESSIONAL PRICING SECTION */}
        {activeTab === 'professionals' && (
          <div className="mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center px-2 sm:px-4">For Service Professionals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-2 sm:px-4">
              {/* Basic Plan */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border-2 border-gray-200">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6">Perfect for starting out</p>
                
                <div className="mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-purple-600">20%</span>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Commission per booking</p>
                  <p className="text-xs text-gray-500 mt-2">7-day free trial</p>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">List up to 3 services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Max 10 bookings/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Basic profile listing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Standard support</span>
                  </li>
                </ul>

                <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold text-sm sm:text-base">
                  Start Trial
                </Button>
              </div>

              {/* Standard Plan */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border-2 border-purple-500">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Standard</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6">For growing businesses</p>
                
                <div className="mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-purple-600">₦16,350</span>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">/month</p>
                  <p className="text-xs text-gray-500 mt-2">7-day free trial</p>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Unlimited services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Unlimited bookings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">1 free professional photo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Analytics dashboard</span>
                  </li>
                </ul>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm sm:text-base">
                  Start Trial
                </Button>
              </div>

              {/* Premium Plan */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-xl p-6 sm:p-8 border-2 border-purple-600 relative">
                <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs sm:text-sm font-semibold">
                  POPULAR
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 mt-4">Premium</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6">Full-featured solution</p>
                
                <div className="mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-purple-600">₦23,850</span>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">/month</p>
                  <p className="text-xs text-gray-500 mt-2">7-day free trial</p>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-semibold">Everything in Standard, plus:</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Video portfolio showcase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Featured listing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Advanced analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Priority client matching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">VIP support 24/7</span>
                  </li>
                </ul>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm sm:text-base">
                  Start Trial
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border-2 border-gray-200">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6">Custom solutions for teams</p>
                
                <div className="mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-purple-600">Custom</span>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Contact for pricing</p>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Multi-location support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Team management tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">White-label options</span>
                  </li>
                </ul>

                <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold text-sm sm:text-base">
                  Contact Sales
                </Button>
              </div>
            </div>

            {/* Professional FAQs */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-6 sm:p-8 mx-2 sm:mx-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">How does the 7-day free trial work?</h4>
                  <p className="text-sm sm:text-base text-gray-600">Start with any paid plan and enjoy full access for 7 days. You won't be charged until after the trial ends. Cancel anytime during the trial at no cost.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What's included in the 20% commission for Basic plan?</h4>
                  <p className="text-sm sm:text-base text-gray-600">The 20% commission covers platform fees, payment processing, customer support, and basic marketing exposure. No hidden charges.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Can I switch plans later?</h4>
                  <p className="text-sm sm:text-base text-gray-600">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the charges.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VENDOR PRICING SECTION */}
        {activeTab === 'vendors' && (
          <div className="mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center px-2 sm:px-4">For Vendors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto px-2 sm:px-4">
              {/* Basic Plan */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border-2 border-gray-200">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6">Start selling beauty products</p>
                
                <div className="mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-pink-600">20%</span>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Commission per sale</p>
                  <p className="text-xs text-gray-500 mt-2">7-day free trial</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">List up to 3 products</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Max 20 sales/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Basic storefront</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Standard payment processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Email support</span>
                  </li>
                </ul>

                <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold text-sm sm:text-base">
                  Start Trial
                </Button>
              </div>

              {/* Premium Plan */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg shadow-xl p-6 sm:p-8 border-2 border-pink-500 relative">
                <div className="absolute top-0 right-0 bg-pink-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs sm:text-sm font-semibold">
                  RECOMMENDED
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 mt-4">Premium</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6">Unlimited product listings</p>
                
                <div className="mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-pink-600">₦19,350</span>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">/month</p>
                  <p className="text-xs text-gray-500 mt-2">7-day free trial</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700 font-semibold">Everything in Basic, plus:</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Unlimited products</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Unlimited sales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Featured storefront placement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Advanced analytics & insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Priority customer support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">Promotional tools & campaigns</span>
                  </li>
                </ul>

                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm sm:text-base">
                  Start Trial
                </Button>
              </div>
            </div>

            {/* Vendor FAQs */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-6 sm:p-8 mx-2 sm:mx-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">How does payment processing work?</h4>
                  <p className="text-sm sm:text-base text-gray-600">We handle all payment processing securely through Paystack/Flutterwave. Funds are automatically transferred to your account within 3-5 business days after each sale.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What types of products can I sell?</h4>
                  <p className="text-sm sm:text-base text-gray-600">You can sell any beauty and wellness products including cosmetics, hair care, skincare, beauty tools, and salon equipment. All products must comply with our quality standards.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Is there a setup fee?</h4>
                  <p className="text-sm sm:text-base text-gray-600">No setup fees! Start your 7-day free trial and only pay when the trial ends. Cancel anytime during the trial at no cost.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
