import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Store, Scissors, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";

type BusinessType = "service" | "vendor" | null;

interface LaunchBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: "service" | "vendor") => void;
}

export function LaunchBusinessModal({ isOpen, onClose, onSelectType }: LaunchBusinessModalProps) {
  const [selectedType, setSelectedType] = useState<BusinessType>(null);

  const handleContinue = () => {
    if (selectedType) {
      onSelectType(selectedType);
      onClose();
    }
  };

  const handleSelectType = (type: BusinessType) => {
    setSelectedType(type);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center mb-2">
            Launch Your Business
          </DialogTitle>
          <p className="text-center text-gray-600 text-sm sm:text-base">
            Choose how you want to grow with Pamper Pro
          </p>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 py-6">
          {/* Service Provider Option */}
          <Card
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
              selectedType === "service"
                ? "border-[#3d6a68] bg-[#3d6a68]/5 shadow-lg"
                : "border-gray-200 hover:border-[#3d6a68]/50"
            }`}
            onClick={() => handleSelectType("service")}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedType === "service"
                    ? "bg-[#3d6a68] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Scissors className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Service Provider</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Offer beauty and wellness services to clients
                </p>
                <ul className="text-xs sm:text-sm text-left text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#3d6a68] mt-0.5">✓</span>
                    <span>Hair styling, braids, makeup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3d6a68] mt-0.5">✓</span>
                    <span>Nails, lashes, beauty treatments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3d6a68] mt-0.5">✓</span>
                    <span>Booking calendar & scheduling</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Product Vendor Option */}
          <Card
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
              selectedType === "vendor"
                ? "border-[#3d6a68] bg-[#3d6a68]/5 shadow-lg"
                : "border-gray-200 hover:border-[#3d6a68]/50"
            }`}
            onClick={() => handleSelectType("vendor")}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedType === "vendor"
                    ? "bg-[#3d6a68] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Store className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Product Vendor</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sell beauty and wellness products online
                </p>
                <ul className="text-xs sm:text-sm text-left text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#3d6a68] mt-0.5">✓</span>
                    <span>Hair care, skincare, cosmetics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3d6a68] mt-0.5">✓</span>
                    <span>Wigs, extensions, accessories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3d6a68] mt-0.5">✓</span>
                    <span>Inventory & order management</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-12 text-sm sm:text-base"
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            className="flex-1 h-12 bg-[#3d6a68] hover:bg-[#2d5a58] text-white text-sm sm:text-base"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
