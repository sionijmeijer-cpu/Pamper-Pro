import { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from './ui/button';

interface ProfessionalSignupProps {
  onSignupComplete: () => void;
  onLoginClick: () => void;
}

export function ProfessionalSignup({ onSignupComplete, onLoginClick }: ProfessionalSignupProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    agreedToSMS: false,
    promotionCode: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validatedPromoCode, setValidatedPromoCode] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordRules = [
    { id: 'length', label: 'Minimum 6 characters', met: formData.password.length >= 6 },
    { id: 'uppercase', label: 'At least one uppercase letter', met: /[A-Z]/.test(formData.password) },
    { id: 'number', label: 'At least one number', met: /\d/.test(formData.password) },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Password must contain an uppercase letter';
    if (!/\d/.test(formData.password)) newErrors.password = 'Password must contain a number';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.phoneNumber.startsWith('+234') && !formData.phoneNumber.startsWith('0')) {
      newErrors.phoneNumber = 'Please enter a valid Nigerian phone number';
    }
    if (!formData.agreedToSMS) newErrors.agreedToSMS = 'You must agree to SMS notifications to continue';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValidatePromoCode = () => {
    if (!formData.promotionCode.trim()) {
      setPromoError('Please enter a promotion code');
      return;
    }

    // Simulate validation
    const isValid = formData.promotionCode.toUpperCase() === 'PAMPER7' || formData.promotionCode.toUpperCase() === 'WELCOME50';
    
    if (isValid) {
      setValidatedPromoCode(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promotion code');
      setValidatedPromoCode(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // If it starts with 0, convert to +234
    if (value.startsWith('0')) {
      value = '+234' + value.slice(1);
    }
    // If it doesn't start with country code, add it
    else if (!value.startsWith('234')) {
      if (value.length > 0) {
        value = '+234' + value;
      }
    } else if (!value.startsWith('+')) {
      value = '+' + value;
    }

    setFormData(prev => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSignupComplete();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Launch your business on Pamper Pro
          </h1>
          <div className="bg-teal-50 rounded-lg p-6 border border-teal-200 mb-6">
            <p className="text-gray-800 font-semibold mb-2">
              Get a free 7-Day trial to explore Pamper Pro and all our Standard features
            </p>
            <p className="text-gray-700">
              After the trial, continue your standard membership for just <span className="text-teal-600 font-bold">₦16,350/month</span>
            </p>
          </div>

          {/* Login Link */}
          <button
            onClick={onLoginClick}
            className="text-sm text-gray-600 hover:text-teal-600 transition-colors"
          >
            Have an account? <span className="font-semibold text-teal-600">Log In</span>
          </button>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* First Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Calvin"
              className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
              }`}
            />
            {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Palmer"
              className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
              }`}
            />
            {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="calvinpalmer@email.com"
              className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
              }`}
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <div className="relative mb-3">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Minimum six characters"
                className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12 ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Rules */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {passwordRules.map(rule => (
                <div key={rule.id} className="flex items-center gap-2 text-sm">
                  {rule.met ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <X className="w-4 h-4 text-gray-400" />
                  )}
                  <span className={rule.met ? 'text-green-700 font-medium' : 'text-gray-600'}>
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>

            {errors.password && <p className="text-red-600 text-xs mt-2">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12 ${
                  errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handlePhoneInput}
              placeholder="+234 (Nigeria)"
              className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">Enter a valid Nigerian phone number</p>
            {errors.phoneNumber && <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* SMS Checkbox */}
          <div className="mb-6">
            <label className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg border border-teal-200 cursor-pointer hover:bg-teal-100 transition-colors">
              <input
                type="checkbox"
                name="agreedToSMS"
                checked={formData.agreedToSMS}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">
                Yes, I would like to receive SMS notifications from Pamper Pro
              </span>
            </label>
            {errors.agreedToSMS && <p className="text-red-600 text-xs mt-2">{errors.agreedToSMS}</p>}
          </div>

          {/* Promotion Code */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Promotion Code <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="promotionCode"
                value={formData.promotionCode}
                onChange={handleInputChange}
                placeholder="Enter your promotion code"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Button
                type="button"
                onClick={handleValidatePromoCode}
                variant="outline"
                className="px-6 py-3 border-teal-600 text-teal-600 font-semibold hover:bg-teal-50"
                disabled={!formData.promotionCode.trim()}
              >
                Validate
              </Button>
            </div>
            {promoError && <p className="text-red-600 text-xs mt-1">{promoError}</p>}
            {validatedPromoCode && <p className="text-green-600 text-xs mt-1">✓ Promotion code applied successfully</p>}
          </div>

          {/* Legal Text */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8 text-xs text-gray-600 space-y-2">
            <p>
              <strong>By submitting your number, you agree to receive</strong> recurring automated account and marketing text messages from Pamper Pro at the cell number used when signing up. Consent is not a condition of sign up.
            </p>
            <p>
              Reply <strong>HELP</strong> for help and <strong>STOP</strong> to cancel. Msg frequency varies. Msg and data rates may apply.
            </p>
            <p>
              View our <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-teal-600 hover:underline">Terms & Conditions</a>
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating your account...
              </div>
            ) : (
              'Create Account & Start Your 7-Day Trial'
            )}
          </Button>
        </form>

        {/* Footer Info */}
        <p className="text-center text-xs text-gray-500 mt-6">
          No credit card required • Start free today • Cancel anytime
        </p>
      </div>
    </div>
  );
}
