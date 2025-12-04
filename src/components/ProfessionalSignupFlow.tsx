import { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, Plus, X, Check } from 'lucide-react';
import { Button } from './ui/button';

interface SignupStep {
  step: number;
  title: string;
  description: string;
}

const steps: SignupStep[] = [
  { step: 1, title: 'Studio Name', description: 'Enter your business name' },
  { step: 2, title: 'Business Info', description: 'Tell us about your business' },
  { step: 3, title: 'Add Services', description: 'Add up to 5 services with photos' },
  { step: 4, title: 'Get Verified', description: 'KYC verification to start earning' },
];

interface Service {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  duration: number;
}

export function ProfessionalSignupFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Studio Name
  const [studioName, setStudioName] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  
  // Step 2: Business Info
  const [businessDescription, setBusinessDescription] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  
  // Step 3: Services
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState({
    name: '',
    category: 'hair',
    subcategory: '',
    description: '',
    price: '',
    duration: '60',
  });

  const categories = {
    hair: { name: 'Hair Services', subcategories: ['Hair Styling', 'Braids', 'Braids & Extensions', 'Weaves', 'Hair Coloring', 'Color', 'Silk Press', 'Locs', 'Natural Hair', 'Kids Hair', 'Mens Haircut'] },
    makeup: { name: 'Makeup', subcategories: ['Bridal Makeup', 'Everyday Makeup', 'Special Events', 'Eyebrows', 'Eyelash Extensions', 'Lashes'] },
    nails: { name: 'Nails', subcategories: ['Nail Art', 'Acrylics', 'Gel', 'Natural', 'Manicure', 'Pedicure', 'Extensions'] },
    skincare: { name: 'Skincare', subcategories: ['Skincare Treatment', 'Facials', 'Treatments', 'Massages', 'Waxing'] },
    spa: { name: 'Spa & Massage', subcategories: ['Massage & Spa', 'Body Treatments', 'Relaxation', 'Hot Stone', 'Deep Tissue'] },
    grooming: { name: 'Mens Grooming', subcategories: ['Haircut', 'Beard Trim', 'Shaving', 'Facial'] },
    other: { name: 'Other', subcategories: ['Consultation', 'Custom'] },
  };

  const handleAddService = () => {
    if (services.length < 5 && newService.name && newService.subcategory && newService.price) {
      setServices([
        ...services,
        {
          id: Date.now().toString(),
          name: newService.name,
          category: newService.category,
          subcategory: newService.subcategory,
          description: newService.description,
          price: parseInt(newService.price),
          duration: parseInt(newService.duration),
        },
      ]);
      setNewService({
        name: '',
        category: 'hair',
        subcategory: '',
        description: '',
        price: '',
        duration: '60',
      });
    }
  };

  const handleRemoveService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const canProceedStep1 = studioName.trim() && businessLocation.trim();
  const canProceedStep2 = businessDescription.trim() && yearsExperience.trim();
  const canProceedStep3 = services.length > 0;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Studio/Business Name *</label>
              <input
                type="text"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                placeholder="e.g., Sarah's Beauty Studio"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Business Location *</label>
              <input
                type="text"
                value={businessLocation}
                onChange={(e) => setBusinessLocation(e.target.value)}
                placeholder="e.g., Lagos, Nigeria"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Business Description *</label>
              <textarea
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="Tell clients about your expertise, specialties, and what makes your services unique..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Years of Experience *</label>
              <input
                type="number"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                placeholder="e.g., 5"
                min="0"
                max="70"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Add New Service Form */}
            <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
              <h3 className="font-semibold text-gray-900 mb-4">Add Service ({services.length}/5)</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Service Name *</label>
                  <input
                    type="text"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    placeholder="e.g., Box Braids"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Category *</label>
                    <select
                      value={newService.category}
                      onChange={(e) => setNewService({ ...newService, category: e.target.value, subcategory: '' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {Object.entries(categories).map(([key, val]) => (
                        <option key={key} value={key}>{val.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Sub-category *</label>
                    <select
                      value={newService.subcategory}
                      onChange={(e) => setNewService({ ...newService, subcategory: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select sub-category</option>
                      {categories[newService.category as keyof typeof categories].subcategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="Describe this service..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Base Price (₦) *</label>
                    <input
                      type="number"
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      placeholder="e.g., 15000"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Duration (mins)</label>
                    <input
                      type="number"
                      value={newService.duration}
                      onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                      placeholder="e.g., 60"
                      min="15"
                      step="15"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleAddService}
                  disabled={services.length >= 5 || !newService.name || !newService.subcategory || !newService.price}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </Button>
              </div>
            </div>

            {/* Services List */}
            {services.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Added Services</h3>
                <div className="space-y-3">
                  {services.map(service => (
                    <div key={service.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.subcategory} • ₦{service.price.toLocaleString()} • {service.duration} mins</p>
                        {service.description && <p className="text-sm text-gray-600 mt-1">{service.description}</p>}
                      </div>
                      <button
                        onClick={() => handleRemoveService(service.id)}
                        className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-teal-50 border border-teal-200 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">KYC Verification</h3>
              <p className="text-gray-700 mb-4">
                To complete your onboarding and start earning, you'll need to verify your identity through our secure KYC process.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Identity Verification</h4>
                    <p className="text-sm text-gray-600">Submit a valid government-issued ID</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Address Verification</h4>
                    <p className="text-sm text-gray-600">Confirm your business address</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Payment Setup</h4>
                    <p className="text-sm text-gray-600">Connect your Stripe account for payouts</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 text-center">
                The KYC process typically takes 24-48 hours to complete.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Launch Your Beauty Business
          </h1>
          <p className="text-gray-600">
            Complete these 4 steps to start accepting bookings
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex justify-between mb-4">
            {steps.map((s) => (
              <div key={s.step} className="flex-1 px-2">
                <div
                  className={`h-2 rounded-full transition-colors duration-300 ${
                    s.step <= currentStep ? 'bg-teal-600' : 'bg-gray-300'
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {steps.map((s) => (
              <div key={s.step} className="text-center text-xs">
                <div className={s.step <= currentStep ? 'text-teal-600 font-bold' : 'text-gray-600'}>
                  Step {s.step}
                </div>
                <div className="text-gray-600 text-xs">{s.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 min-h-96">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{steps[currentStep - 1].title}</h2>
          <p className="text-gray-600 mb-8">{steps[currentStep - 1].description}</p>
          
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            variant="outline"
            className="flex-1 border-teal-600 text-teal-600 font-semibold py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            disabled={
              (currentStep === 1 && !canProceedStep1) ||
              (currentStep === 2 && !canProceedStep2) ||
              (currentStep === 3 && !canProceedStep3)
            }
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === 4 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
