import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { ArrowRight, ArrowLeft, Upload, CheckCircle2, X } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface ServiceProviderOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const SERVICE_TYPES = [
  { id: "braids", name: "Braids", icon: "🎀" },
  { id: "natural-hair", name: "Natural Hair", icon: "💁" },
  { id: "haircut", name: "Haircut", icon: "✂️" },
  { id: "mens-haircut", name: "Men's Haircut", icon: "💇‍♂️" },
  { id: "locs", name: "Locs", icon: "🌀" },
  { id: "silk-press", name: "Silk Press", icon: "👩" },
  { id: "weaves", name: "Weaves", icon: "💫" },
  { id: "eyelashes", name: "Eyelashes", icon: "👁️" },
  { id: "nails", name: "Nails", icon: "💅" },
  { id: "color", name: "Hair Color", icon: "🎨" },
  { id: "kids", name: "Kids Services", icon: "👶" },
  { id: "makeup", name: "Makeup", icon: "💄" },
];

const LAGOS_CITIES = [
  "Victoria Island",
  "Lekki Phase 1",
  "Lekki Phase 2",
  "Ajah",
  "Ikoyi",
  "Ikeja",
  "Ikeja GRA",
  "Surulere",
  "Yaba",
  "Gbagada",
  "Maryland",
  "Anthony",
  "Oregun",
  "Magodo",
  "Ojodu",
  "Berger",
  "Isheri",
  "Oshodi",
  "Mushin",
  "Apapa",
  "Festac",
  "Amuwo Odofin",
  "Badagry",
  "Epe",
  "Ikorodu",
  "Alimosho",
  "Agege",
  "Ikotun",
  "Egbeda",
  "Idimu",
  "Isolo",
  "Ejigbo",
  "Lagos Island",
  "Marina",
  "CMS",
];

export function ServiceProviderOnboarding({
  isOpen,
  onClose,
  onComplete,
}: ServiceProviderOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    bio: "",
    selectedServices: [] as string[],
    servicePhotos: {} as Record<string, File[]>,
    idDocument: null as File | null,
    businessProof: null as File | null,
  });

  const progress = (step / 4) * 100;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId],
    }));
  };

  const handleFileUpload = (serviceId: string, files: FileList) => {
    const fileArray = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      servicePhotos: {
        ...prev.servicePhotos,
        [serviceId]: [...(prev.servicePhotos[serviceId] || []), ...fileArray],
      },
    }));
  };

  const handleRemovePhoto = (serviceId: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      servicePhotos: {
        ...prev.servicePhotos,
        [serviceId]: prev.servicePhotos[serviceId].filter((_, i) => i !== index),
      },
    }));
  };

  const handleComplete = () => {
    onComplete();
  };

  const canProceedStep1 =
    formData.businessName && formData.fullName && formData.email && formData.phone && formData.city && formData.address;
  const canProceedStep2 = formData.selectedServices.length > 0;
  const canProceedStep3 = formData.selectedServices.every(
    (serviceId) => formData.servicePhotos[serviceId]?.length > 0
  );
  const canProceedStep4 = formData.idDocument && formData.businessProof;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            Service Provider Registration
          </DialogTitle>
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
              <span>Step {step} of 4</span>
              <span>{progress.toFixed(0)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        <div className="py-6">
          {/* Step 1: Business Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Business Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    placeholder="e.g., Glam by Amaka"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="flex gap-2 mt-1">
                      <div className="w-20">
                        <Input
                          value="+234"
                          disabled
                          className="bg-gray-100 text-center font-semibold"
                        />
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="8012345678"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 10) {
                            setFormData({ ...formData, phone: value });
                          }
                        }}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Enter 10 digits without country code</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City/Area in Lagos *</Label>
                    <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select city/area" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {LAGOS_CITIES.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      placeholder="e.g., 123 Main Street"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">About Your Business</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell clients about your expertise and services..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="mt-1 min-h-24"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Select Services */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Select Your Services</h3>
              <p className="text-sm text-gray-600 mb-4">
                Choose all the services you offer. You can add more later.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICE_TYPES.map((service) => (
                  <Card
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      formData.selectedServices.includes(service.id)
                        ? "border-2 border-[#3d6a68] bg-[#3d6a68]/5"
                        : "border-2 border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <span className="text-3xl">{service.icon}</span>
                      <span className="text-sm font-medium">{service.name}</span>
                      {formData.selectedServices.includes(service.id) && (
                        <CheckCircle2 className="h-5 w-5 text-[#3d6a68]" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Upload Service Photos */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Upload Service Photos</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add photos showcasing your work for each selected service
              </p>
              {formData.selectedServices.map((serviceId) => {
                const service = SERVICE_TYPES.find((s) => s.id === serviceId);
                const photos = formData.servicePhotos[serviceId] || [];
                return (
                  <div key={serviceId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <span className="text-xl">{service?.icon}</span>
                        {service?.name}
                      </h4>
                      <Badge variant={photos.length > 0 ? "default" : "secondary"}>
                        {photos.length} photo{photos.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor={`upload-${serviceId}`}
                        className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[#3d6a68] hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="h-5 w-5 text-gray-500" />
                        <span className="text-sm text-gray-600">Upload photos</span>
                        <Input
                          id={`upload-${serviceId}`}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) =>
                            e.target.files && handleFileUpload(serviceId, e.target.files)
                          }
                        />
                      </Label>
                      {photos.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {photos.map((file, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`${service?.name} ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                onClick={() => handleRemovePhoto(serviceId, index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Step 4: KYC Verification */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Verification Documents</h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload documents to verify your identity and business
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="idDocument">Government ID *</Label>
                  <p className="text-xs text-gray-500 mb-2">
                    Upload your National ID, Driver's License, or International Passport
                  </p>
                  <Label
                    htmlFor="idDocument"
                    className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[#3d6a68] hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {formData.idDocument ? formData.idDocument.name : "Upload ID Document"}
                    </span>
                    <Input
                      id="idDocument"
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files &&
                        setFormData({ ...formData, idDocument: e.target.files[0] })
                      }
                    />
                  </Label>
                </div>
                <div>
                  <Label htmlFor="businessProof">Business Proof *</Label>
                  <p className="text-xs text-gray-500 mb-2">
                    Business registration, CAC certificate, or proof of address
                  </p>
                  <Label
                    htmlFor="businessProof"
                    className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[#3d6a68] hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {formData.businessProof
                        ? formData.businessProof.name
                        : "Upload Business Document"}
                    </span>
                    <Input
                      id="businessProof"
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files &&
                        setFormData({ ...formData, businessProof: e.target.files[0] })
                      }
                    />
                  </Label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {step < 4 ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !canProceedStep1) ||
                (step === 2 && !canProceedStep2) ||
                (step === 3 && !canProceedStep3)
              }
              className="flex-1 bg-[#3d6a68] hover:bg-[#2d5a58]"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!canProceedStep4}
              className="flex-1 bg-[#3d6a68] hover:bg-[#2d5a58]"
            >
              Complete Registration
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
