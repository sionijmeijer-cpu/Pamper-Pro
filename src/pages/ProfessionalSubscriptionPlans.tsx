import { Check, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export function ProfessionalSubscriptionPlans() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic Plan',
      price: '20%',
      billing: 'per booking',
      description: 'Pay only when you earn',
      features: [
        'Create a basic profile',
        'List up to 3 services',
        'Limited to 10 bookings per month',
        'Access to basic dashboard features',
        'Pay only when you earn',
        'Core platform features',
        'Standard support'
      ],
      highlighted: false,
      cta: 'Get Started',
      color: 'gray'
    },
    {
      name: 'Standard Plan',
      price: '₦16,350',
      billing: '/month',
      description: 'Most popular for growing professionals',
      features: [
        'Unlimited services listing',
        'Unlimited bookings',
        'One free studio photo session by PamperPro',
        'Access to analytics and customer management tools',
        'Highlighted profile/status in search results',
        'Priority support'
      ],
      highlighted: true,
      cta: 'Start Free Trial',
      color: 'pink'
    },
    {
      name: 'Premium Plan',
      price: '₦23,850',
      billing: '/month',
      description: 'For established professionals',
      features: [
        'All Standard features',
        'Feature in premium listings',
        'One free studio photo AND video session by PamperPro',
        'Promotion through featured banners',
        'Advanced analytics',
        'Ability to create promotional offers and discounts'
      ],
      highlighted: false,
      cta: 'Start Free Trial',
      color: 'purple'
    },
    {
      name: 'Enterprise Plan',
      price: 'Custom',
      billing: 'pricing',
      description: 'For salons, spas & multi-location businesses',
      features: [
        'For large or multiple-location salons/spas',
        'Custom branding and marketing options',
        'API access for social media integrations',
        'Dedicated support team',
        'Custom features & integrations',
        'White-label options'
      ],
      highlighted: false,
      cta: 'Contact Sales',
      color: 'blue'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold">
              ✨ Professional Plans
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Grow Your Beauty Business
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your salon, spa, or beauty service. <span className="font-bold text-pink-600">All plans include 7-day free trial!</span>
          </p>
        </div>

        {/* Trial Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-6 mb-12 text-white text-center">
          <Zap className="w-6 h-6 inline-block mr-2" />
          <span className="text-lg font-semibold">
            Start with 7 days free! No credit card required. Cancel anytime.
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? 'lg:scale-105 shadow-2xl bg-gradient-to-br from-pink-600 to-purple-600 text-white ring-2 ring-pink-600'
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
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-pink-100' : 'text-gray-600'}`}>
                {plan.description}
              </p>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-pink-600'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? 'text-pink-100' : 'text-gray-600'}>
                    {plan.billing}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-yellow-300' : 'text-pink-600'}`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-pink-50' : 'text-gray-700'}`}>
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
                    : `${
                        plan.color === 'gray'
                          ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          : plan.color === 'purple'
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : plan.color === 'blue'
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-pink-600 text-white hover:bg-pink-700'
                      }`
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
                  <tr className="bg-gradient-to-r from-pink-50 to-purple-50 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left font-bold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-900">Basic</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-900">Standard</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-900">Premium</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Services Listed</td>
                    <td className="px-6 py-4 text-center">3</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Monthly Bookings</td>
                    <td className="px-6 py-4 text-center">10</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Free Photo Session</td>
                    <td className="px-6 py-4 text-center">—</td>
                    <td className="px-6 py-4 text-center">Photo</td>
                    <td className="px-6 py-4 text-center">Photo + Video</td>
                    <td className="px-6 py-4 text-center">Custom</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Analytics</td>
                    <td className="px-6 py-4 text-center">Basic</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">Advanced</td>
                    <td className="px-6 py-4 text-center">Advanced</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Featured Profile</td>
                    <td className="px-6 py-4 text-center">—</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Promotions & Discounts</td>
                    <td className="px-6 py-4 text-center">—</td>
                    <td className="px-6 py-4 text-center">—</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-pink-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Support Level</td>
                    <td className="px-6 py-4 text-center">Standard</td>
                    <td className="px-6 py-4 text-center">Priority</td>
                    <td className="px-6 py-4 text-center">Priority</td>
                    <td className="px-6 py-4 text-center">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
                All professionals get 7 days free when they sign up. After that, your chosen plan activates automatically.
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
