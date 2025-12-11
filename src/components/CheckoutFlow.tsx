import { useState } from 'react';
import { ShoppingCart, ArrowRight, Check } from 'lucide-react';

interface CheckoutFlowProps {
  cartTotal: number;
  items: Array<{ id: number; name: string; price: number; quantity: number }>;
}

export function CheckoutFlow({ cartTotal, items }: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    phone: '',
    cardNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Order submitted:', formData);
    alert('Order placed successfully!');
  };

  const steps = [
    { number: 1, label: 'Cart Review' },
    { number: 2, label: 'Shipping' },
    { number: 3, label: 'Payment' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                    currentStep >= step.number
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {currentStep > step.number ? <Check size={20} /> : step.number}
                </div>
                <p
                  className={`ml-3 text-sm font-medium ${
                    currentStep >= step.number ? 'text-purple-600' : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </p>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded ${
                      currentStep > step.number ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              {/* Step 1: Cart Review */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Cart</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-4">
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Next <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Complete Order <Check size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
              </div>

              <div className="space-y-4 border-b border-gray-200 pb-4 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <p className="text-gray-600">{item.name} x {item.quantity}</p>
                    <p className="font-semibold text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-900">₦{cartTotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-900">₦2,000</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Tax</p>
                  <p className="text-gray-900">₦{Math.round(cartTotal * 0.05).toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                <p className="font-semibold text-gray-900">Total</p>
                <p className="text-xl font-bold text-purple-600">
                  ₦{(cartTotal + 2000 + Math.round(cartTotal * 0.05)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
