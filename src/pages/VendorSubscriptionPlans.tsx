import { Check, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export function VendorSubscriptionPlans() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic Plan',
      price: '20%',
      billing: 'per sale',
      description: 'Start selling today',
      features: [
        'Create a basic profile',
        'List up to 3 products',
        'Limited to 20 sales per month',
        'Access to basic dashboard features',
        'Pay only when you sell',
        'Core platform features',
        'Standard support'
      ],
      highlighted: false,
      cta: 'Get Started',
      color: 'gray'
    },
    {
      name: 'Premium Plan',
      price: '₦19,350',
      billing: '/month',
      description: 'For serious sellers',
      features: [
        'Unlimited product listing',
        'Unlimited sales',
        'Access to analytics and customer management tools',
        'Priority support',
        'Promotion through featured banners',
        'Advanced analytics',
        'Ability to create promotional offers and discounts on products'
      ],
      highlighted: true,
      cta: 'Start Free Trial',
      color: 'pink'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
              🛍️ Vendor Plans
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Sell Beauty Products Online
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reach thousands of beauty enthusiasts. <span className="font-bold text-purple-600">All plans include 7-day free trial!</span>
          </p>
        </div>

        {/* Trial Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 mb-12 text-white text-center">
          <Zap className="w-6 h-6 inline-block mr-2" />
          <span className="text-lg font-semibold">
            Start with 7 days free! No credit card required. Cancel anytime.
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? 'md:scale-105 shadow-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white ring-2 ring-purple-600'
                  : 'shadow-lg bg-white hover:shadow-xl'
              } p-8 flex flex-col`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-purple-100' : 'text-gray-600'}`}>
                {plan.description}
              </p>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-purple-600'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? 'text-purple-100' : 'text-gray-600'}>
                    {plan.billing}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-yellow-300' : 'text-purple-600'}`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-purple-50' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                onClick={() => navigate('/launch-business')}
                className={`w-full font-semibold py-3 rounded-lg transition-all ${
                  plan.highlighted
                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg'
                    : 'bg-purple-100 text-gray-900 hover:bg-purple-200'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Detailed Feature Comparison
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left font-bold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-900">Basic</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-900">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Products Listed</td>
                    <td className="px-6 py-4 text-center">3</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-purple-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Monthly Sales Limit</td>
                    <td className="px-6 py-4 text-center">20</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-purple-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Analytics</td>
                    <td className="px-6 py-4 text-center">Basic</td>
                    <td className="px-6 py-4 text-center">Advanced</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Featured Banners</td>
                    <td className="px-6 py-4 text-center">—</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-purple-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Promotions & Discounts</td>
                    <td className="px-6 py-4 text-center">—</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-purple-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Support Level</td>
                    <td className="px-6 py-4 text-center">Standard</td>
                    <td className="px-6 py-4 text-center">Priority</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Client Pricing Section */}
        <div className="mb-16 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            💰 How Clients Pay
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Free Basic Access</h3>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold text-lg">₦0/month</span>
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600" />
                  Browse all products
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600" />
                  Create profile
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600" />
                  First 5 purchases free
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600" />
                  After: ₦500/month
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Premium Membership</h3>
              <p className="text-lg font-semibold mb-4">₦13,500/month</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-300" />
                  All Basic features
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-300" />
                  Unlimited purchases
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-300" />
                  Exclusive discounts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-300" />
                  Priority support
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6 text-sm">
            Clients choose their plan. You benefit from their purchases at scale! 🚀
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ What is the 7-day free trial?</h3>
              <p className="text-gray-600">
                All vendors get 7 days free when they sign up. After that, your chosen plan activates automatically.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes! Cancel your subscription anytime with no penalties or hidden fees. You'll have access until the end of your billing period.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ What happens after the trial?</h3>
              <p className="text-gray-600">
                After 7 days, your selected plan will automatically start. You'll be charged based on your chosen pricing tier.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ Can I upgrade my plan?</h3>
              <p className="text-gray-600">
                Absolutely! Upgrade anytime from your dashboard. We'll prorate any charges based on your remaining trial or current billing period.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, and Nigerian mobile money payments (Paystack, Flutterwave).
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">❓ Is there a setup fee?</h3>
              <p className="text-gray-600">
                No setup fees! You only pay the subscription amount. No hidden charges or surprises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
