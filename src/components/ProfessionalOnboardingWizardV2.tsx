import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

interface ProfessionalOnboardingWizardV2Props {
  isOpen: boolean;
  businessType: 'service_provider' | 'vendor';
  userEmail: string;
  firstName: string;
  lastName: string;
  businessName: string;
  onComplete: (onboardingData: any) => void;
  onClose: () => void;
}

export function ProfessionalOnboardingWizardV2({
  isOpen,
  businessType,
  userEmail,
  firstName,
  lastName,
  businessName,
  onComplete,
  onClose,
}: ProfessionalOnboardingWizardV2Props) {
  const [step, setStep] = useState(1);

  // Step 1: Business Details
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');

  // Step 2: Services
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceDescription, setServiceDescription] = useState('');

  // Step 3: Pricing
  const [basePrice, setBasePrice] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [acceptsPaymentMethods, setAcceptsPaymentMethods] = useState<string[]>(['card', 'cash']);

  // Step 4: Review
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const availableServices = [
    'Hair Styling',
    'Hair Coloring',
    'Hair Treatment',
    'Manicure',
    'Pedicure',
    'Facials',
    'Massage',
    'Waxing',
    'Makeup',
    'Eyebrow Threading',
    'Other',
  ];

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handlePaymentMethodToggle = (method: string) => {
    setAcceptsPaymentMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const isStep1Complete = businessPhone && businessAddress && businessCity && yearsExperience;
  const isStep2Complete = selectedServices.length > 0 && serviceDescription;
  const isStep3Complete = basePrice && priceRange;
  const isStep4Complete = agreedToTerms;

  const handleNext = () => {
    if (step === 1 && !isStep1Complete) {
      alert('Please fill all required fields');
      return;
    }
    if (step === 2 && !isStep2Complete) {
      alert('Please select services and add description');
      return;
    }
    if (step === 3 && !isStep3Complete) {
      alert('Please set pricing');
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    if (!agreedToTerms) {
      alert('Please agree to terms and conditions');
      return;
    }

    const onboardingData = {
      businessType,
      userEmail,
      firstName,
      lastName,
      businessName,
      businessPhone,
      businessAddress,
      businessCity,
      businessDescription,
      yearsExperience,
      services: selectedServices,
      serviceDescription,
      basePrice,
      priceRange,
      paymentMethods: acceptsPaymentMethods,
      completedAt: new Date().toISOString(),
      status: 'pending_kyc',
    };

    onComplete(onboardingData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Professional Onboarding - Step {step} of 4</DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold ${
                  stepNum < step
                    ? 'bg-emerald-600 text-white'
                    : stepNum === step
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNum < step ? <CheckCircle className="w-6 h-6" /> : stepNum}
              </div>
              <p className="text-xs text-center text-gray-600">
                {stepNum === 1 && 'Business'}
                {stepNum === 2 && 'Services'}
                {stepNum === 3 && 'Pricing'}
                {stepNum === 4 && 'Review'}
              </p>
            </div>
          ))}
        </div>

        {/* Step 1: Business Details */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Business Phone *" value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)} />
              <Input placeholder="Years of Experience *" type="number" value={yearsExperience} onChange={(e) => setYearsExperience(e.target.value)} />
            </div>
            <Input placeholder="Business Address *" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} />
            <Input placeholder="City *" value={businessCity} onChange={(e) => setBusinessCity(e.target.value)} />
            <Textarea placeholder="Business Description" value={businessDescription} onChange={(e) => setBusinessDescription(e.target.value)} />
          </div>
        )}

        {/* Step 2: Services */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableServices.map((service) => (
                <label key={service} className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-emerald-50">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">{service}</span>
                </label>
              ))}
            </div>
            <Textarea placeholder="Describe your services in detail *" value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} />
          </div>
        )}

        {/* Step 3: Pricing */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Payment</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Base Price ($) *" type="number" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
              <Input placeholder="Price Range (e.g., 50-150) *" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-gray-900">Payment Methods Accepted</p>
              {['card', 'cash', 'venmo', 'paypal'].map((method) => (
                <label key={method} className="flex items-center p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-emerald-50">
                  <input
                    type="checkbox"
                    checked={acceptsPaymentMethods.includes(method)}
                    onChange={() => handlePaymentMethodToggle(method)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900 capitalize">{method}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm">
              <div><strong>Business Name:</strong> {businessName}</div>
              <div><strong>Phone:</strong> {businessPhone}</div>
              <div><strong>Location:</strong> {businessCity}</div>
              <div><strong>Experience:</strong> {yearsExperience} years</div>
              <div><strong>Services:</strong> {selectedServices.join(', ')}</div>
              <div><strong>Base Price:</strong> ${basePrice}</div>
              <div><strong>Payment Methods:</strong> {acceptsPaymentMethods.join(', ').toUpperCase()}</div>
            </div>

            <label className="flex items-start p-4 border-2 border-emerald-200 rounded-lg bg-emerald-50 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded mt-1"
              />
              <span className="ml-3 text-sm text-gray-900">
                I agree to Pamper Pro's Terms & Conditions and confirm that all information is accurate. I understand I'll need to complete KYC verification.
              </span>
            </label>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          )}
          <div className="flex-1" />
          {step < 4 ? (
            <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Complete Onboarding
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
