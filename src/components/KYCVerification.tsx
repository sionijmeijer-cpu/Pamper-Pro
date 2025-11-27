import { useState, useRef } from "react";
import { Camera, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface KYCData {
  idType: "passport" | "driver_license" | "national_id" | "government_id";
  idNumber: string;
  idPhotoFile: File | null;
  idPhotoPreview: string;
  facialPhotoFile: File | null;
  facialPhotoPreview: string;
  businessRegistrationNumber: string;
  businessProofFile: File | null;
  businessProofPreview: string;
  agreedToTerms: boolean;
}

interface KYCVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: KYCData) => Promise<void>;
  isLoading?: boolean;
}

export function KYCVerification({ isOpen, onClose, onSubmit, isLoading = false }: KYCVerificationProps) {
  const [activeTab, setActiveTab] = useState("id-verification");
  const [data, setData] = useState<KYCData>({
    idType: "passport",
    idNumber: "",
    idPhotoFile: null,
    idPhotoPreview: "",
    facialPhotoFile: null,
    facialPhotoPreview: "",
    businessRegistrationNumber: "",
    businessProofFile: null,
    businessProofPreview: "",
    agreedToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const idPhotoInputRef = useRef<HTMLInputElement>(null);
  const facialPhotoInputRef = useRef<HTMLInputElement>(null);
  const businessProofInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (
    file: File | null,
    type: "idPhoto" | "facialPhoto" | "businessProof"
  ) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors(prev => ({ ...prev, [type]: "Please select an image file" }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [type]: "File size must be less than 5MB" }));
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      if (type === "idPhoto") {
        setData(prev => ({
          ...prev,
          idPhotoFile: file,
          idPhotoPreview: e.target?.result as string
        }));
        setErrors(prev => ({ ...prev, idPhoto: "" }));
      } else if (type === "facialPhoto") {
        setData(prev => ({
          ...prev,
          facialPhotoFile: file,
          facialPhotoPreview: e.target?.result as string
        }));
        setErrors(prev => ({ ...prev, facialPhoto: "" }));
      } else if (type === "businessProof") {
        setData(prev => ({
          ...prev,
          businessProofFile: file,
          businessProofPreview: e.target?.result as string
        }));
        setErrors(prev => ({ ...prev, businessProof: "" }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validateAndSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!data.idType) newErrors.idType = "ID type is required";
    if (!data.idNumber.trim()) newErrors.idNumber = "ID number is required";
    if (!data.idPhotoFile) newErrors.idPhoto = "ID photo is required";
    if (!data.facialPhotoFile) newErrors.facialPhoto = "Facial verification photo is required";
    if (!data.businessRegistrationNumber.trim()) newErrors.businessReg = "Business registration number is required";
    if (!data.businessProofFile) newErrors.businessProof = "Business proof document is required";
    if (!data.agreedToTerms) newErrors.terms = "You must agree to the terms";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await onSubmit(data);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Complete KYC Verification</DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Complete identity verification to unlock full profile access
          </p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="id-verification">ID Verification</TabsTrigger>
            <TabsTrigger value="facial-verification">Facial Verification</TabsTrigger>
            <TabsTrigger value="business-verification">Business Proof</TabsTrigger>
          </TabsList>

          {/* ID VERIFICATION TAB */}
          <TabsContent value="id-verification" className="space-y-4">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">
                  Upload a clear photo of your valid government-issued ID (passport, driver's license, national ID, etc.)
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">ID Type *</Label>
                <Select value={data.idType} onValueChange={value => setData({ ...data, idType: value as any })}>
                  <SelectTrigger className={errors.idType ? "border-red-500" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="driver_license">Driver's License</SelectItem>
                    <SelectItem value="national_id">National ID</SelectItem>
                    <SelectItem value="government_id">Government ID</SelectItem>
                  </SelectContent>
                </Select>
                {errors.idType && <p className="text-red-500 text-xs mt-1">{errors.idType}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium">ID Number *</Label>
                <Input
                  placeholder="Enter your ID number"
                  value={data.idNumber}
                  onChange={e => setData({ ...data, idNumber: e.target.value })}
                  className={errors.idNumber ? "border-red-500" : ""}
                />
                {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium">ID Photo *</Label>
                <input
                  ref={idPhotoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileSelect(e.target.files?.[0] || null, "idPhoto")}
                  className="hidden"
                />

                {data.idPhotoPreview ? (
                  <div className="relative">
                    <img
                      src={data.idPhotoPreview}
                      alt="ID Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-[#3d6a68]"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => idPhotoInputRef.current?.click()}
                      className="absolute top-2 right-2"
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => idPhotoInputRef.current?.click()}
                    className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#3d6a68] transition-colors flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload ID photo</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, or GIF (max 5MB)</p>
                  </button>
                )}
                {errors.idPhoto && <p className="text-red-500 text-xs mt-2">{errors.idPhoto}</p>}
              </div>
            </div>
          </TabsContent>

          {/* FACIAL VERIFICATION TAB */}
          <TabsContent value="facial-verification" className="space-y-4">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">
                  Take a clear selfie facing the camera. This will be matched against your ID document for verification.
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Facial Photo *</Label>
                <input
                  ref={facialPhotoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileSelect(e.target.files?.[0] || null, "facialPhoto")}
                  className="hidden"
                />

                {data.facialPhotoPreview ? (
                  <div className="relative">
                    <img
                      src={data.facialPhotoPreview}
                      alt="Facial Preview"
                      className="w-full h-64 object-cover rounded-lg border-2 border-[#3d6a68]"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => facialPhotoInputRef.current?.click()}
                      className="absolute top-2 right-2"
                    >
                      Retake
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => facialPhotoInputRef.current?.click()}
                    className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#3d6a68] transition-colors flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Camera className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload facial photo</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, or GIF (max 5MB)</p>
                  </button>
                )}
                {errors.facialPhoto && <p className="text-red-500 text-xs mt-2">{errors.facialPhoto}</p>}
              </div>

              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Photo Tips:</p>
                    <ul className="text-xs text-amber-800 list-disc list-inside mt-1 space-y-1">
                      <li>Face the camera directly</li>
                      <li>Ensure good lighting</li>
                      <li>Remove any obstructions</li>
                      <li>Match your ID document</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* BUSINESS VERIFICATION TAB */}
          <TabsContent value="business-verification" className="space-y-4">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">
                  Upload your business registration document, license, or proof of business.
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Business Registration Number *</Label>
                <Input
                  placeholder="e.g., EIN, Business License Number"
                  value={data.businessRegistrationNumber}
                  onChange={e => setData({ ...data, businessRegistrationNumber: e.target.value })}
                  className={errors.businessReg ? "border-red-500" : ""}
                />
                {errors.businessReg && <p className="text-red-500 text-xs mt-1">{errors.businessReg}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium">Business Proof Document *</Label>
                <input
                  ref={businessProofInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={e => handleFileSelect(e.target.files?.[0] || null, "businessProof")}
                  className="hidden"
                />

                {data.businessProofPreview ? (
                  <div className="relative">
                    {data.businessProofFile?.type.startsWith("image/") ? (
                      <img
                        src={data.businessProofPreview}
                        alt="Business Proof"
                        className="w-full h-48 object-cover rounded-lg border-2 border-[#3d6a68]"
                      />
                    ) : (
                      <div className="w-full p-8 border-2 border-[#3d6a68] rounded-lg bg-gray-50 flex items-center justify-center">
                        <p className="text-gray-600">PDF uploaded successfully</p>
                      </div>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => businessProofInputRef.current?.click()}
                      className="absolute top-2 right-2"
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => businessProofInputRef.current?.click()}
                    className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#3d6a68] transition-colors flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload business document</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF (max 5MB)</p>
                  </button>
                )}
                {errors.businessProof && <p className="text-red-500 text-xs mt-2">{errors.businessProof}</p>}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Terms Agreement */}
        <Card className="p-4 bg-gray-50 border-gray-200 mt-6">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={data.agreedToTerms}
              onChange={e => setData({ ...data, agreedToTerms: e.target.checked })}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm cursor-pointer font-normal">
              I confirm that all information provided is accurate and true. I understand that providing false information may result in account suspension.
            </Label>
          </div>
          {errors.terms && <p className="text-red-500 text-xs mt-2">{errors.terms}</p>}
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={validateAndSubmit}
            className="flex-1 bg-[#3d6a68] hover:bg-[#2d5a58] text-white"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit KYC"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
