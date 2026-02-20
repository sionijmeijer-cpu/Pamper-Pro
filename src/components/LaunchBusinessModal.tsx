import { X, Briefcase, Building2 } from 'lucide-react';
import { Button } from './ui/button';

interface LaunchBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceProvider: () => void;
  onSelectVendor: () => void;
}

export function LaunchBusinessModal({
  isOpen,
  onClose,
  onSelectServiceProvider,
  onSelectVendor,
}: LaunchBusinessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-800 px-6 py-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Launch Your Business</h2>
            <p className="text-green-100 mt-1">Choose how you'd like to grow with Pamper Pro</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-green-600 rounded-lg p-2 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Service Provider Option */}
            <div
              onClick={onSelectServiceProvider}
              className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-green-700 hover:bg-green-50 transition-all duration-300"
            >
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Service Provider</h3>
              <p className="text-gray-600 text-sm mb-4">
                Offer beauty and wellness services directly to clients
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Manage your own schedule</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Set your own pricing</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Build your client base</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Access client reviews</span>
                </li>
              </ul>
              <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold">
                Become a Service Provider
              </Button>
            </div>

            {/* Vendor Option */}
            <div
              onClick={onSelectVendor}
              className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-green-700 hover:bg-green-50 transition-all duration-300"
            >
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Vendor / Business</h3>
              <p className="text-gray-600 text-sm mb-4">
                Sell beauty products or manage multiple locations and teams
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Sell products online</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Multiple locations support</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Team management tools</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold">
                Become a Vendor
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Not sure which option is right for you?{' '}
              <button className="text-green-700 font-semibold hover:underline">
                Read our guide
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
