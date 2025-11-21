import { Briefcase, ShoppingBag } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface LaunchBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProfessional: () => void;
  onSelectVendor: () => void;
}

export function LaunchBusinessModal({ isOpen, onClose, onSelectProfessional, onSelectVendor }: LaunchBusinessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-green-800">
            Launch Your Business
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Choose how you want to grow your business on Pamper Pro
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Professional Option */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-600 cursor-pointer" onClick={onSelectProfessional}>
            <CardHeader className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-10 w-10 text-green-700" />
              </div>
              <CardTitle className="text-2xl text-green-800">Service Professional</CardTitle>
              <CardDescription className="text-base">
                Offer beauty and wellness services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6 text-sm text-gray-700">
                <li>• Hair styling, makeup, nails</li>
                <li>• Spa & wellness services</li>
                <li>• Online booking system</li>
                <li>• Client management</li>
                <li>• Portfolio showcase</li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Launch as Professional
              </Button>
            </CardContent>
          </Card>

          {/* Vendor Option */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-600 cursor-pointer" onClick={onSelectVendor}>
            <CardHeader className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-10 w-10 text-green-700" />
              </div>
              <CardTitle className="text-2xl text-green-800">Product Vendor</CardTitle>
              <CardDescription className="text-base">
                Sell beauty products and supplies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6 text-sm text-gray-700">
                <li>• Sell hair, makeup & beauty products</li>
                <li>• Online storefront</li>
                <li>• Inventory management</li>
                <li>• Order processing</li>
                <li>• Reach thousands of customers</li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Launch as Vendor
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
