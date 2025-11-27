import { useState } from "react";
import { ChevronRight, ChevronLeft, Briefcase, Package, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface OnboardingData {
  businessType: "service" | "vendor";
  // Step 1
  businessName: string;
  businessDescription: string;
  businessLocation: string;
  // Step 2
  servicesOffered: string[];
  yearsInBusiness: number;
  // Step 3
  specializations: string[];
  targetAudience: string;
  // Step 4
  serviceArea: string;
  phoneNumber: string;
  website: string;
  businessHours: {
    monday: { start: string; end: string; closed: boolean };
    tuesday: { start: string; end: string; closed: boolean };
    wednesday: { start: string; end: string; closed: boolean };
    thursday: { start: string; end: string; closed: boolean };
    friday: { start: string; end: string; closed: boolean };
    saturday: { start: string; end: string; closed: boolean };
    sunday: { start: string; end: string; closed: boolean };
  };
}

interface ProfessionalOnboardingWizardProps {
  isOpen: boolean;
  businessType: "service" | "vendor";
  onComplete: (data: OnboardingData) => void;
  onClose: () => void;
}

const serviceOptions = [
  "Hair Styling",
  "Braids",
  "Hair Coloring",
  "Makeup",
  "Nails",
  "Eyelashes",
  "Waxing",
  "Skincare",
  "Massages",
  "Facials",
  "Hair Treatment",
  "Other"
];

const vendorProductOptions = [
  "Hair Care Products",
  "Skincare Products",
  "Makeup",
  "Wigs & Extensions",
  "Accessories",
  "Health & Wellness",
  "Tools & Equipment",
  "Other"
];

const specializationOptions = [
  "Certified Professional",
  "Advanced Techniques",
  "Color Specialist",
  "Texture Specialist",
  "Licensed Esthetician",
  "Natural Hair Specialist",
  "Experienced (5+ years)",
  "Award Winning"
];

const targetAudienceOptions = [
  "All Ages",
  "Women",
  "Men",
  "Children",
  "Teens",
  "Natural Hair Community",
  "Premium/Luxury",
  "Budget-Friendly"
];

export function ProfessionalOnboardingWizard({
  isOpen,
  businessType,
  onComplete,
  onClose
}: ProfessionalOnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    businessType,
    businessName: "",
    businessDescription: "",
    businessLocation: "",
    servicesOffered: [],
    yearsInBusiness: 0,
    specializations: [],
    targetAudience: "",
    serviceArea: "",
    phoneNumber: "",
    website: "",
    businessHours: {
      monday: { start: "09:00", end: "17:00", closed: false },
      tuesday: { start: "09:00", end: "17:00", closed: false },
      wednesday: { start: "09:00", end: "17:00", closed: false },
      thursday: { start: "09:00", end: "17:00", closed: false },
      friday: { start: "09:00", end: "17:00", closed: false },
      saturday: { start: "10:00", end: "16:00", closed: false },
      sunday: { start: "10:00", end: "16:00", closed: true }
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isServiceProvider = businessType === "service";
  const serviceList = isServiceProvider ? serviceOptions : vendorProductOptions;

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!data.businessName.trim()) newErrors.businessName = "Business name is required";
        if (!data.businessDescription.trim()) newErrors.businessDescription = "Description is required";
        if (!data.businessLocation.trim()) newErrors.businessLocation = "Location is required";
        break;
      case 2:
        if (data.servicesOffered.length === 0) newErrors.servicesOffered = "Select at least one service/product";
        if (data.yearsInBusiness < 0) newErrors.yearsInBusiness = "Years must be a positive number";
        break;
      case 3:
        if (data.specializations.length === 0) newErrors.specializations = "Select at least one specialization";
        if (!data.targetAudience) newErrors.targetAudience = "Target audience is required";
        break;
      case 4:
        if (!data.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        if (!data.serviceArea.trim()) newErrors.serviceArea = "Service area is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        onComplete(data);
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleService = (service: string) => {
    setData(prev => ({
      ...prev,
      servicesOffered: prev.servicesOffered.includes(service)
        ? prev.servicesOffered.filter(s => s !== service)
        : [...prev.servicesOffered, service]
    }));
  };

  const toggleSpecialization = (spec: string) => {
    setData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
    }));
  };





  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isServiceProvider ? "Service Provider" : "Product Vendor"} Onboarding
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">Step {step} of 4</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-[#3d6a68] h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* STEP 1: Business Basics */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-[#3d6a68] mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-4">Business Basics</h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Business Name *</Label>
                      <Input
                        placeholder="Enter your business name"
                        value={data.businessName}
                        onChange={e => setData({ ...data, businessName: e.target.value })}
                        className={errors.businessName ? "border-red-500" : ""}
                      />
                      {errors.businessName && (
                        <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Business Description *</Label>
                      <Textarea
                        placeholder="Tell us about your business..."
                        value={data.businessDescription}
                        onChange={e => setData({ ...data, businessDescription: e.target.value })}
                        className={errors.businessDescription ? "border-red-500" : ""}
                        rows={4}
                      />
                      {errors.businessDescription && (
                        <p className="text-red-500 text-xs mt-1">{errors.businessDescription}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Location *</Label>
                      <Input
                        placeholder="City or area where you operate"
                        value={data.businessLocation}
                        onChange={e => setData({ ...data, businessLocation: e.target.value })}
                        className={errors.businessLocation ? "border-red-500" : ""}
                      />
                      {errors.businessLocation && (
                        <p className="text-red-500 text-xs mt-1">{errors.businessLocation}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Services/Products */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-[#3d6a68] mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-4">
                    {isServiceProvider ? "Services" : "Products"} & Experience
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        What do you offer? * (Select all that apply)
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {serviceList.map(service => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={service}
                              checked={data.servicesOffered.includes(service)}
                              onCheckedChange={() => toggleService(service)}
                            />
                            <Label htmlFor={service} className="text-sm cursor-pointer font-normal">
                              {service}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.servicesOffered && (
                        <p className="text-red-500 text-xs mt-2">{errors.servicesOffered}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Years of {isServiceProvider ? "Experience" : "Business"} *
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        max="60"
                        placeholder="0"
                        value={data.yearsInBusiness}
                        onChange={e => setData({ ...data, yearsInBusiness: parseInt(e.target.value) || 0 })}
                        className={errors.yearsInBusiness ? "border-red-500" : ""}
                      />
                      {errors.yearsInBusiness && (
                        <p className="text-red-500 text-xs mt-1">{errors.yearsInBusiness}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Specializations */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-[#3d6a68] font-semibold mt-1">✓</span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-4">Specializations & Target Market</h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Your Specializations * (Select all that apply)
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {specializationOptions.map(spec => (
                          <div key={spec} className="flex items-center space-x-2">
                            <Checkbox
                              id={spec}
                              checked={data.specializations.includes(spec)}
                              onCheckedChange={() => toggleSpecialization(spec)}
                            />
                            <Label htmlFor={spec} className="text-sm cursor-pointer font-normal">
                              {spec}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.specializations && (
                        <p className="text-red-500 text-xs mt-2">{errors.specializations}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Target Audience *</Label>
                      <Select value={data.targetAudience} onValueChange={value => setData({ ...data, targetAudience: value })}>
                        <SelectTrigger className={errors.targetAudience ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select target audience" />
                        </SelectTrigger>
                        <SelectContent>
                          {targetAudienceOptions.map(audience => (
                            <SelectItem key={audience} value={audience}>
                              {audience}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.targetAudience && (
                        <p className="text-red-500 text-xs mt-1">{errors.targetAudience}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Availability & Contact */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#3d6a68] mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-4">Availability & Contact Information</h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Phone Number *</Label>
                      <Input
                        placeholder="(123) 456-7890"
                        value={data.phoneNumber}
                        onChange={e => setData({ ...data, phoneNumber: e.target.value })}
                        className={errors.phoneNumber ? "border-red-500" : ""}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Service Area (miles) *</Label>
                      <Input
                        placeholder="e.g., 15 miles from location"
                        value={data.serviceArea}
                        onChange={e => setData({ ...data, serviceArea: e.target.value })}
                        className={errors.serviceArea ? "border-red-500" : ""}
                      />
                      {errors.serviceArea && (
                        <p className="text-red-500 text-xs mt-1">{errors.serviceArea}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Website or Social Media (Optional)</Label>
                      <Input
                        placeholder="https://..."
                        value={data.website}
                        onChange={e => setData({ ...data, website: e.target.value })}
                      />
                    </div>

                    <Card className="p-4 bg-blue-50 border-blue-200">
                      <p className="text-xs text-blue-900 mb-4">
                        <strong>Note:</strong> You will set detailed business hours on your profile after completion.
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            className="flex-1 bg-[#3d6a68] hover:bg-[#2d5a58] text-white"
          >
            {step === 4 ? "Complete Onboarding" : "Next"}
            {step < 4 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
