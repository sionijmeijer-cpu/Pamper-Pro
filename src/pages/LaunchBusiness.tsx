import { useState } from 'react';
import { ArrowRight, Briefcase, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProfessionalSignup } from '../components/ProfessionalSignup';
import { ProfessionalSignupFlow } from '../components/ProfessionalSignupFlow';

export function LaunchBusiness() {
  const [selectedType, setSelectedType] = useState<'professional' | 'vendor' | null>(null);
  const [showProfessionalFlow, setShowProfessionalFlow] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (showSignup) {
    return <ProfessionalSignup onSignupComplete={() => {
      setShowSignup(false);
      setShowProfessionalFlow(true);
    }} onLoginClick={() => {
      // TODO: Handle login
    }} />;
  }

  if (showProfessionalFlow) {
    return <ProfessionalSignupFlow />;
  }

  const businessTypes = [
    {
      id: 'professional',
      title: 'Service Professional',
      subtitle: 'Hair stylist, makeup artist, therapist, beauty expert',
      icon: Briefcase,
      description: 'Offer your beauty and wellness services to clients',
      benefits: [
        'Reach thousands of clients looking for your services',
        'Manage your own schedule and availability',
        'Secure payment processing & instant payouts',
        'Build your reputation with client reviews',
        'Access marketing tools to grow your business',
      ],
      features: [
        'Professional profile creation',
        'Online booking system',
        'Client management dashboard',
        'Payment processing',
        'Analytics & insights',
      ],
      price: '₦16,350/month',
      cta: 'Start as a Professional',
    },
    {
      id: 'vendor',
      title: 'Vendor',
      subtitle: 'Beauty products, supplies, accessories seller',
      icon: Package,
      description: 'Sell beauty products to clients nationwide',
      benefits: [
        'Sell unlimited products to our growing customer base',
        'Automated inventory management',
        'Secure order processing',
        'Regular payouts to your account',
        'Marketing tools to boost sales',
      ],
      features: [
        'Unlimited product listings',
        'Inventory management',
        'Order dashboard',
        'Payment processing',
        'Sales analytics',
      ],
      price: '₦19,350/month',
      cta: 'Start Selling Products',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white pt-12 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Launch Your Business
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose how you want to grow with Pamper Pro. Whether you offer services or sell products, we've got you covered.
          </p>
        </div>

        {/* Business Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {businessTypes.map(type => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;

            return (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id as 'professional' | 'vendor')}
                className={`rounded-xl p-8 cursor-pointer transition-all duration-300 border-2 ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-md'
                }`}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-teal-600 text-white' : 'bg-gray-100 text-teal-600'
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{type.subtitle}</p>
                <p className="text-gray-700 mb-6">{type.description}</p>

                {/* Price */}
                <div className="text-teal-600 font-bold text-lg mb-6">{type.price}</div>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Why choose this?</h4>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-teal-600 font-bold mt-1">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Features included:</h4>
                  <div className="flex flex-wrap gap-2">
                    {type.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="mt-6 text-teal-600 font-bold flex items-center gap-2">
                    ✓ Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Next Steps */}
        {selectedType && (
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-teal-600 mb-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Complete Your Profile</h3>
                    <p className="text-gray-600">Add your business information, photos, and services/products</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Verify Your Identity</h3>
                    <p className="text-gray-600">Quick KYC verification to ensure trust and security</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Set Up Payment Method</h3>
                    <p className="text-gray-600">Add your bank account for secure payouts</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Start Earning</h3>
                    <p className="text-gray-600">
                      {selectedType === 'professional'
                        ? 'Accept bookings and grow your client base'
                        : 'List your products and start selling'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    if (selectedType === 'professional') {
                      setShowSignup(true);
                    }
                  }}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 flex items-center justify-center gap-2"
                >
                  {businessTypes.find(t => t.id === selectedType)?.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setSelectedType(null)}
                  variant="outline"
                  className="flex-1 border-teal-600 text-teal-600 font-semibold py-3"
                >
                  Change Selection
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">100%</div>
              <h3 className="font-bold text-gray-900 mb-2">Flexible</h3>
              <p className="text-gray-600">
                Work on your own schedule. Set your own availability and pricing.
              </p>
            </div>

            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">20%</div>
              <h3 className="font-bold text-gray-900 mb-2">Commission</h3>
              <p className="text-gray-600">
                Earn 80% - we only take 20% commission on completed bookings or sales.
              </p>
            </div>

            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
              <h3 className="font-bold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600">
                Our team is always here to help you succeed and grow.
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}


