import { useState } from 'react';
import { Check, Smartphone, Briefcase, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';


export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'clients' | 'professionals' | 'vendors'>('clients');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleGetStarted = () => {
    setShowSignupModal(true);
  };

  const handleUpgradeToPremium = () => {
    if (user) {
      setShowPremiumModal(true);
    } else {
      setShowSignupModal(true);
    }
  };

  const handleStartTrial = () => {
    if (activeTab === 'professionals' || activeTab === 'vendors') {
      navigate('/launch-business');
    }
  };

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-purple-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Choose the perfect plan for your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <button
            onClick={() => setActiveTab('clients')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
              activeTab === 'clients'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
            For Clients
          </button>
          <button
            onClick={() => setActiveTab('professionals')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
              activeTab === 'professionals'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
            For Professionals
          </button>
          <button
            onClick={() => setActiveTab('vendors')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
              activeTab === 'vendors'
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            For Vendors
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="w-full">
          {/* Clients Pricing */}
          {activeTab === 'clients' && (
            <>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">For Clients</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16">
                {/* Free Basic Access */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="w-6 h-6 text-teal-600" />
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Free Basic Access</h3>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">Perfect for getting started</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl sm:text-4xl font-bold text-teal-600 mb-2">₦0</div>
                    <p className="text-gray-600 text-sm">First 5 bookings free, then ₦500/month</p>
                    <p className="text-gray-500 text-xs mt-2">₦6,000/year after free bookings</p>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-8">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">Browse all services and professionals</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">Create and manage profile</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">View booking history</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">Save favourites</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">Receive notifications</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">5 free bookings included</span>
                    </li>
                  </ul>

                  <button
                    onClick={handleGetStarted}
                    className="w-full py-3 px-6 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                  >
                    Get Started
                  </button>
                </div>

                {/* Premium Membership */}
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-teal-200 relative hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    POPULAR
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">💎</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Premium Membership</h3>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">Unlimited access + exclusive perks</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold text-teal-600">₦13,500</span>
                      <span className="text-gray-600 text-sm">/month</span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mt-2">₦162,000/year (save ₦6,000)</p>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-8">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold text-sm sm:text-base">Everything in Free, plus:</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">Unlimited bookings</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">Priority booking slots</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">Exclusive discounts (10-15% off)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">Early access to new professionals</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">VIP customer support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">Free cancellations</span>
                    </li>
                  </ul>

                  <button
                    onClick={handleUpgradeToPremium}
                    className="w-full py-3 px-6 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 shadow-lg"
                  >
                    Upgrade to Premium
                  </button>
                </div>
              </div>

              {/* FAQs Section - Clients */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What happens after my 5 free bookings?</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      After your 5th booking, you'll be charged ₦500/month to continue using the platform, or you can upgrade to Premium for unlimited bookings and exclusive perks.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Can I cancel my Premium subscription anytime?</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Yes! You can cancel your Premium subscription at any time with no penalties. You'll continue to have access until the end of your billing period.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What payment methods do you accept?</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      We accept all major credit/debit cards, bank transfers, and mobile payment options including Paystack and Flutterwave.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Professionals Pricing */}
          {activeTab === 'professionals' && (
            <>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">For Service Professionals</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-0 sm:px-4 mb-12 sm:mb-16">
                {/* Basic Plan */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Perfect for starting out</p>
                    <div className="mt-6">
                      <span className="text-3xl sm:text-4xl font-bold text-purple-600">20%</span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">Commission per booking</p>
                    <p className="text-gray-500 text-xs mt-2">7-day free trial</p>
                  </div>

                  <div className="p-6 sm:p-8 flex-grow flex flex-col">
                    <ul className="space-y-3 sm:space-y-4 mb-8 flex-grow">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">List up to 3 services</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Max 10 bookings/month</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Basic profile listing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Standard support</span>
                      </li>
                    </ul>

                    <Button
                      onClick={handleStartTrial}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-xl shadow-md transition-all duration-200"
                    >
                      Start Trial
                    </Button>
                  </div>
                </div>

                {/* Standard Plan */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border-2 border-purple-300 relative">
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 rounded-bl-lg text-xs font-bold">
                    POPULAR
                  </div>
                  <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Standard</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">For growing businesses</p>
                    <div className="mt-6">
                      <span className="text-3xl sm:text-4xl font-bold text-purple-600">₦16,350</span>
                      <span className="text-gray-600 ml-2 text-sm">/month</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">₦196,200/year (save ₦3,000)</p>
                  </div>

                  <div className="p-6 sm:p-8 flex-grow flex flex-col">
                    <ul className="space-y-3 sm:space-y-4 mb-8 flex-grow">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Unlimited services</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Unlimited bookings</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">1 free professional photo</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Priority support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Analytics dashboard</span>
                      </li>
                    </ul>

                    <Button
                      onClick={handleStartTrial}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Start Trial
                    </Button>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border-2 border-purple-400 relative">
                  <div className="absolute top-0 right-0 bg-purple-700 text-white px-3 py-1 rounded-bl-lg text-xs font-bold">
                    POPULAR
                  </div>
                  <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Full-featured solution</p>
                    <div className="mt-6">
                      <span className="text-3xl sm:text-4xl font-bold text-purple-600">₦23,850</span>
                      <span className="text-gray-600 ml-2 text-sm">/month</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">₦286,200/year (save ₦2,400)</p>
                  </div>

                  <div className="p-6 sm:p-8 flex-grow flex flex-col">
                    <ul className="space-y-3 sm:space-y-4 mb-8 flex-grow">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-semibold text-sm">Everything in Standard, plus:</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Video portfolio showcase</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Featured listing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Advanced analytics</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Priority client matching</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">VIP support 24/7</span>
                      </li>
                    </ul>

                    <Button
                      onClick={handleStartTrial}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Start Trial
                    </Button>
                  </div>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Custom solutions for teams</p>
                    <div className="mt-6">
                      <span className="text-3xl sm:text-4xl font-bold text-gray-600">Custom</span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">Contact for pricing</p>
                  </div>

                  <div className="p-6 sm:p-8 flex-grow flex flex-col">
                    <ul className="space-y-3 sm:space-y-4 mb-8 flex-grow">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Multi-location support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Team management tools</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Custom integrations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Dedicated account manager</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">White-label options</span>
                      </li>
                    </ul>

                    <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                      Contact Sales
                    </Button>
                  </div>
                </div>
              </div>

              {/* FAQs Section - Professionals */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">How does the 7-day free trial work?</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      You get full access to your chosen plan for 7 days at no cost. No credit card required to start. After the trial ends, your subscription will begin if you choose to continue.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Can I upgrade or downgrade my plan?</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll adjust your billing proportionally.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">When do I earn money from my bookings?</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Earnings from your bookings are calculated based on your plan. Payments are processed weekly to your preferred bank account or payment method.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Is there a setup fee?</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      No! There are no hidden setup fees or registration charges. You only pay your plan subscription (or commission for Basic plan) when your trial ends.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Vendors Pricing */}
          {activeTab === 'vendors' && (
            <>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">For Vendors</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 sm:mb-16">
                {/* Basic Vendor Plan */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                    <p className="text-gray-600 text-sm">Start selling beauty products</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">20%</div>
                    <p className="text-gray-600 text-sm mb-1">Commission per sale</p>
                    <p className="text-xs text-gray-500 mb-2">7-day free trial</p>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-8">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">List up to 3 products</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Max 20 sales/month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Basic storefront</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Standard payment processing</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Email support</span>
                    </li>
                  </ul>

                  <button
                    onClick={handleStartTrial}
                    className="w-full py-3 px-6 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                  >
                    Start Trial
                  </button>
                </div>

                {/* Premium Vendor Plan */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-pink-300 relative hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    RECOMMENDED
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                    <p className="text-gray-600 text-sm">Unlimited product listings</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl sm:text-4xl font-bold text-pink-600">₦19,350</span>
                      <span className="text-gray-600 text-sm">/month</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">7-day free trial</p>
                    <p className="text-gray-600 text-xs">₦232,200/year (save ₦1,800)</p>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-8">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold text-sm">Everything in Basic, plus:</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Unlimited products</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Unlimited sales</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Featured storefront placement</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Advanced analytics & insights</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Priority customer support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Promotional tools & campaigns</span>
                    </li>
                  </ul>

                  <button
                    onClick={handleStartTrial}
                    className="w-full py-3 px-6 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-200 shadow-lg"
                  >
                    Start Trial
                  </button>
                </div>
              </div>

              {/* FAQs Section - Vendors */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">How do I list my products?</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      After signing up, you can add products directly from your dashboard. Include product photos, descriptions, prices, and inventory details. Your products will be live on the platform within minutes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">How are payouts processed?</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      After deducting our commission, we deposit your earnings to your bank account or preferred payment method every week. You can track all transactions in real-time from your dashboard.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What fees are included in your commission?</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Our commission covers platform hosting, payment processing, customer support, and marketing. There are no hidden fees or additional charges deducted from your sales.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Can I cancel my subscription anytime?</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Yes! You can cancel your Premium subscription at any time. Your store will remain active on the Basic plan (20% commission) if you choose to continue selling.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
                <button
                  onClick={() => setShowSignupModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-center">Get started with Pamper Pro today!</p>
                <Button onClick={() => { setShowSignupModal(false); navigate('/signup'); }} className="w-full">
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Payment Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Upgrade to Premium
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Get unlimited access and exclusive benefits for ₦13,500/month
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <button className="w-full py-3 px-6 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200">
                Pay with Card
              </button>
              <button className="w-full py-3 px-6 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                Pay with Bank Transfer
              </button>
            </div>

            <button
              onClick={() => setShowPremiumModal(false)}
              className="w-full py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
