import { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, Upload, Plus, X, Check, Loader } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { azureApi } from '../services/azureApiService';

interface OnboardingStep {
  step: number;
  title: string;
  description: string;
}

const SERVICE_CATEGORIES = [
  { id: 'hair', name: 'Hair Services', subcategories: ['Braids', 'Weaves', 'Color', 'Silk Press', 'Locs', 'Natural Hair', 'Kids Hair'] },
  { id: 'makeup', name: 'Makeup', subcategories: ['Bridal Makeup', 'Everyday Makeup', 'Special Events', 'Eyebrows', 'Lashes'] },
  { id: 'nails', name: 'Nails', subcategories: ['Acrylics', 'Gel', 'Natural', 'Nail Art', 'Extensions'] },
  { id: 'skincare', name: 'Skincare', subcategories: ['Facials', 'Treatments', 'Massages', 'Waxing'] },
  { id: 'other', name: 'Other', subcategories: ['Consultation', 'Custom'] },
];

interface Service {
  id?: string;
  serviceName: string;
  serviceCategory: string;
  serviceSubcategory: string;
  serviceDescription: string;
  basePrice: number;
  duration: number;
  photos: string[];
}

export function ProfessionalOnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Studio Name
  const [studioData, setStudioData] = useState({
    studioName: '',
    businessDescription: '',
    businessLocation: '',
  });

  // Step 3: Services
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<Service>({
    id: Date.now().toString(),
    serviceName: '',
    serviceCategory: '',
    serviceSubcategory: '',
    serviceDescription: '',
    basePrice: 0,
    duration: 60,
    photos: [],
  });

  const [uploadingPhotos, setUploadingPhotos] = useState<{ [key: string]: boolean }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedServiceForPhotos, setSelectedServiceForPhotos] = useState<string | null>(null);

  const steps: OnboardingStep[] = [
    { step: 1, title: 'Studio Name', description: 'Tell us about your studio' },
    { step: 2, title: 'Business Info', description: 'Add business details' },
    { step: 3, title: 'Services', description: 'Add your services (up to 5)' },
    { step: 4, title: 'Verification', description: 'Get vetted and start earning' },
  ];

  const validateStep1 = () => {
    if (!studioData.studioName.trim()) {
      setError('Please enter your studio name');
      return false;
    }
    if (!studioData.businessLocation.trim()) {
      setError('Please enter your business location');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!studioData.businessDescription.trim()) {
      setError('Please enter a business description');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (services.length === 0) {
      setError('Please add at least one service');
      return false;
    }

    for (const service of services) {
      if (!service.serviceName.trim()) {
        setError('Please fill in all service names');
        return false;
      }
      if (!service.serviceCategory) {
        setError('Please select a category for all services');
        return false;
      }
      if (!service.serviceSubcategory) {
        setError('Please select a subcategory for all services');
        return false;
      }
      if (service.basePrice <= 0) {
        setError('Please enter valid pricing for all services');
        return false;
      }
    }

    return true;
  };

  const handleNextStep = async () => {
    setError('');

    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleAddService = () => {
    if (!newService.serviceName.trim()) {
      setError('Please enter a service name');
      return;
    }
    if (!newService.serviceCategory) {
      setError('Please select a service category');
      return;
    }
    if (!newService.serviceSubcategory) {
      setError('Please select a subcategory');
      return;
    }
    if (newService.basePrice <= 0) {
      setError('Please enter a valid price');
      return;
    }

    if (services.length >= 5) {
      setError('You can add up to 5 services');
      return;
    }

    setServices([...services, newService]);
    setNewService({
      id: Date.now().toString(),
      serviceName: '',
      serviceCategory: '',
      serviceSubcategory: '',
      serviceDescription: '',
      basePrice: 0,
      duration: 60,
      photos: [],
    });
    setError('');
  };

  const handleRemoveService = (serviceId: string) => {
    setServices(services.filter(s => s.id !== serviceId));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, serviceId: string) => {
    const files = e.target.files;
    if (!files) return;

    const serviceIndex = services.findIndex(s => s.id === serviceId);
    if (serviceIndex === -1) return;

    if (services[serviceIndex].photos.length + files.length > 5) {
      setError('Maximum 5 photos per service');
      return;
    }

    setUploadingPhotos({ ...uploadingPhotos, [serviceId]: true });
    const newPhotos = [...services[serviceIndex].photos];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newPhotos.push(event.target.result as string);
            if (i === files.length - 1) {
              const updatedServices = [...services];
              updatedServices[serviceIndex].photos = newPhotos;
              setServices(updatedServices);
              setUploadingPhotos({ ...uploadingPhotos, [serviceId]: false });
            }
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      setError('Failed to upload photos');
      setUploadingPhotos({ ...uploadingPhotos, [serviceId]: false });
    }
  };

  const handleRemovePhoto = (serviceId: string, photoIndex: number) => {
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    if (serviceIndex !== -1) {
      const updatedServices = [...services];
      updatedServices[serviceIndex].photos.splice(photoIndex, 1);
      setServices(updatedServices);
    }
  };

  const handleCompleteOnboarding = async () => {
    setLoading(true);
    setError('');

    try {
      if (!currentUser?.id) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      // Create professional profile
      const professionalRes = await azureApi.createProfessional({
        user_id: currentUser.id,
        business_name: studioData.studioName,
        bio: studioData.businessDescription,
        phone: '',
        avatar_url: '',
      });

      if (!professionalRes || !professionalRes.id) {
        setError('Failed to create professional profile');
        setLoading(false);
        return;
      }

      // Create services
      for (const service of services) {
        const serviceRes = await azureApi.createProfessionalService({
          professional_id: professionalRes.id,
          service_name: service.serviceName,
          service_category: service.serviceCategory,
          service_subcategory: service.serviceSubcategory,
          service_description: service.serviceDescription,
          base_price: service.basePrice,
          duration_minutes: service.duration,
          is_active: true,
        });

        if (serviceRes && serviceRes.id) {
          // Upload photos for this service
          for (const photo of service.photos) {
            try {
              // Convert data URL to blob and upload
              const blob = await fetch(photo).then(r => r.blob());
              const file = new File([blob], 'service-photo.jpg', { type: 'image/jpeg' });
              await azureApi.uploadServicePhoto(serviceRes.id, file);
            } catch (photoErr) {
              console.error('Failed to upload photo:', photoErr);
            }
          }
        }
      }

      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onboarding failed');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = newService.serviceCategory
    ? SERVICE_CATEGORIES.find(c => c.id === newService.serviceCategory)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            {steps.map((s, idx) => (
              <div key={s.step} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep >= s.step
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > s.step ? <Check size={20} /> : s.step}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      currentStep > s.step ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h1>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Studio Name */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Studio Name *
                </label>
                <input
                  type="text"
                  value={studioData.studioName}
                  onChange={(e) =>
                    setStudioData({ ...studioData, studioName: e.target.value })
                  }
                  placeholder="e.g., Glamour Studio"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Business Location *
                </label>
                <input
                  type="text"
                  value={studioData.businessLocation}
                  onChange={(e) =>
                    setStudioData({ ...studioData, businessLocation: e.target.value })
                  }
                  placeholder="e.g., Ikoyi, Lagos"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                />
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Tell us about your business *
                </label>
                <textarea
                  value={studioData.businessDescription}
                  onChange={(e) =>
                    setStudioData({
                      ...studioData,
                      businessDescription: e.target.value,
                    })
                  }
                  placeholder="Share your expertise, years of experience, specialties, etc."
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Services */}
          {currentStep === 3 && (
            <div className="space-y-8">
              {/* Added Services */}
              {services.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    Services ({services.length}/5)
                  </h3>
                  {services.map((service) => (
                    <div key={service.id} className="border-2 border-teal-100 rounded-lg p-4 bg-teal-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{service.serviceName}</h4>
                          <p className="text-sm text-gray-600">
                            {service.serviceCategory} • {service.serviceSubcategory}
                          </p>
                          <p className="text-sm text-gray-600">
                            ₦{service.basePrice.toLocaleString()} • {service.duration} mins
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveService(service.id!)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Service Photos */}
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Photos ({service.photos.length}/5)
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {service.photos.map((photo, idx) => (
                            <div key={idx} className="relative">
                              <img
                                src={photo}
                                alt={`Service ${idx}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                onClick={() => handleRemovePhoto(service.id!, idx)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>

                        {service.photos.length < 5 && (
                          <button
                            onClick={() => {
                              setSelectedServiceForPhotos(service.id!);
                              fileInputRef.current?.click();
                            }}
                            disabled={uploadingPhotos[service.id!]}
                            className="w-full px-3 py-2 border-2 border-dashed border-teal-400 rounded-lg text-teal-600 hover:bg-teal-50 transition disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {uploadingPhotos[service.id!] ? (
                              <>
                                <Loader size={16} className="animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload size={16} />
                                Add Photo
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Service */}
              {services.length < 5 && (
                <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-4">Add New Service</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Service Name *
                      </label>
                      <input
                        type="text"
                        value={newService.serviceName}
                        onChange={(e) =>
                          setNewService({ ...newService, serviceName: e.target.value })
                        }
                        placeholder="e.g., Bridal Makeup"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Category *
                        </label>
                        <select
                          value={newService.serviceCategory}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              serviceCategory: e.target.value,
                              serviceSubcategory: '',
                            })
                          }
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                        >
                          <option value="">Select Category</option>
                          {SERVICE_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Subcategory *
                        </label>
                        <select
                          value={newService.serviceSubcategory}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              serviceSubcategory: e.target.value,
                            })
                          }
                          disabled={!selectedCategory}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition disabled:bg-gray-100"
                        >
                          <option value="">Select Subcategory</option>
                          {selectedCategory?.subcategories.map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Service Description
                      </label>
                      <textarea
                        value={newService.serviceDescription}
                        onChange={(e) =>
                          setNewService({
                            ...newService,
                            serviceDescription: e.target.value,
                          })
                        }
                        placeholder="Optional: Describe what this service includes"
                        rows={3}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Base Price (₦) *
                        </label>
                        <input
                          type="number"
                          value={newService.basePrice || ''}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              basePrice: parseFloat(e.target.value) || 0,
                            })
                          }
                          placeholder="e.g., 15000"
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Duration (mins) *
                        </label>
                        <input
                          type="number"
                          value={newService.duration}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              duration: parseInt(e.target.value) || 60,
                            })
                          }
                          placeholder="e.g., 60"
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleAddService}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <Plus size={20} />
                      Add Service
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Verification */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-900">Ready to Get Vetted</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                You're almost there! Complete our KYC verification process to start accepting bookings and earning from Pamper Pro.
              </p>
              <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-6 text-left space-y-3">
                <h3 className="font-semibold text-gray-900">What you'll need:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-teal-600">✓</span> Valid government ID
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-teal-600">✓</span> Business registration (if applicable)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-teal-600">✓</span> Bank account for payments
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-500">
                Verification typically takes 1-2 business days
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </Button>

          {currentStep === 4 ? (
            <Button
              onClick={handleCompleteOnboarding}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 gap-2"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Onboarding
                  <Check size={20} />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 gap-2"
            >
              Next
              <ArrowRight size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          if (selectedServiceForPhotos) {
            handlePhotoUpload(e, selectedServiceForPhotos);
          }
        }}
        className="hidden"
      />
    </div>
  );
}
