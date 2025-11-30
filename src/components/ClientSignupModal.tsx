import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { registerUser, loginUser } from '../api/authClient';

interface ClientSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}

export function ClientSignupModal({ isOpen, onClose, onNavigate }: ClientSignupModalProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'create' | 'login'>('create');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    smsNotifications: true,
    promoCode: '',
    agreeToTerms: false,
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [promoCodeStatus, setPromoCodeStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Password validation
  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 6) errors.push('Minimum 6 characters');
    if (!/[A-Z]/.test(password)) errors.push('1 uppercase letter');
    if (!/\d/.test(password)) errors.push('1 number');
    return errors;
  };

  // Format phone number
  const formatPhoneNumber = (value: string) => {
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('234')) {
      cleaned = cleaned.slice(3);
    }
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.slice(1);
    }
    if (cleaned.length > 10) {
      cleaned = cleaned.slice(0, 10);
    }
    return cleaned ? `+234${cleaned}` : '';
  };

  // Validate create account form
  const validateCreateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name required';
    if (!formData.email.trim()) errors.email = 'Email required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Valid email required';
    }
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(formData.password)) errors.password = 'Password needs 1 uppercase letter';
    if (!/\d/.test(formData.password)) errors.password = 'Password needs 1 number';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) errors.agreeToTerms = 'You must agree to terms';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate login form
  const validateLoginForm = () => {
    const errors: Record<string, string> = {};

    if (!loginData.email.trim()) errors.email = 'Email required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      errors.email = 'Valid email required';
    }
    if (!loginData.password) errors.password = 'Password required';

    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhoneNumber(value),
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (loginErrors[name]) {
      setLoginErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validatePromoCode = () => {
    if (!formData.promoCode.trim()) {
      setPromoCodeStatus('idle');
      return;
    }

    // Simulate API call - in real app, validate with backend
    if (formData.promoCode.toUpperCase() === 'WELCOME10' || formData.promoCode.toUpperCase() === 'SAVE20') {
      setPromoCodeStatus('valid');
    } else {
      setPromoCodeStatus('invalid');
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCreateForm()) return;

    setIsSubmitting(true);
    setValidationErrors({});
    
    try {
      const formDataToSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        smsNotifications: formData.smsNotifications,
        promoCode: formData.promoCode,
      };

      const res = await fetch('/api/db-execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataToSend),
      });

      let data: any = null;
      let text: string | null = null;

      try {
        text = await res.text();
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        console.error('Failed to parse JSON', e, text);
      }

      if (!res.ok) {
        const message = data?.error || text || 'Something went wrong';
        setValidationErrors({ submit: message });
        toast.error(message);
        return;
      }

      // On success
      setSubmitSuccess(true);
      toast.success('Account created! Check your email to verify.');
      
      // Redirect to check-email page after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          smsNotifications: true,
          promoCode: '',
          agreeToTerms: false,
        });
        setValidationErrors({});
        navigate('/check-email');
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setValidationErrors({ submit: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) return;

    setIsSubmitting(true);
    setLoginErrors({});
    
    try {
      const res = await fetch('/api/db-execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      let data: any = null;
      let text: string | null = null;

      try {
        text = await res.text();
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        console.error('Failed to parse JSON', e, text);
      }

      if (!res.ok) {
        const message = data?.error || text || 'Something went wrong';
        setLoginErrors({ submit: message });
        toast.error(message);
        return;
      }

      // On success
      setSubmitSuccess(true);
      toast.success('Login successful!');
      
      // Store token and user data if provided
      if (data?.token) {
        localStorage.setItem('auth_token', data.token);
      }
      if (data?.user) {
        localStorage.setItem('user_data', JSON.stringify(data.user));
      }
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setLoginData({
          email: '',
          password: '',
        });
        setLoginErrors({});
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setLoginErrors({ submit: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-200 rounded-full blur-lg animate-pulse"></div>
              <CheckCircle2 className="w-24 h-24 text-teal-600 relative" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Success!</h2>
          <p className="text-gray-600 text-lg mb-8">
            {activeTab === 'create'
              ? "Your account has been created. Welcome to Pamper Pro!"
              : "You're logged in successfully!"}
          </p>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
            <div className="flex justify-center gap-1">
              <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4 sm:py-8 overflow-y-auto backdrop-blur-sm">
      <div className="w-full max-w-md my-4 sm:my-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with close button */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-4 sm:p-6 flex justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Join Pamper Pro
              </h1>
              <p className="text-teal-100 text-xs sm:text-sm">
                Book beauty services from top professionals
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('create')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'create'
                    ? 'bg-white text-teal-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Create Account
              </button>
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'bg-white text-teal-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Login
              </button>
            </div>

            {/* Create Account Form */}
            {activeTab === 'create' && (
              <form onSubmit={handleCreateAccount} className="space-y-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleCreateChange}
                      placeholder="John"
                      className="pl-10 h-11 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  {validationErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleCreateChange}
                      placeholder="Doe"
                      className="pl-10 h-11 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  {validationErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleCreateChange}
                      placeholder="john@example.com"
                      className="pl-10 h-11 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleCreateChange}
                      placeholder="••••••"
                      className="pl-10 pr-10 h-11 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {validationErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                  )}
                  {formData.password && !validationErrors.password && (
                    <div className="mt-2 space-y-1">
                      {['Minimum 6 characters', '1 uppercase letter', '1 number'].map(rule => (
                        <div key={rule} className={`text-sm flex items-center gap-2 ${
                          validatePassword(formData.password).includes(rule)
                            ? 'text-gray-500'
                            : 'text-green-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            validatePassword(formData.password).includes(rule)
                              ? 'bg-gray-300'
                              : 'bg-green-600'
                          }`}></span>
                          {rule}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleCreateChange}
                      placeholder="••••••"
                      className="pl-10 pr-10 h-11 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Nigeria)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleCreateChange}
                      placeholder="+234 (0) 123 456 7890"
                      className="pl-10 h-11 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* SMS Notifications */}
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-teal-50 transition-colors">
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={formData.smsNotifications}
                    onChange={handleCreateChange}
                    className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    Receive SMS notifications for bookings
                  </span>
                </label>

                {/* Promo Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code (Optional)
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        name="promoCode"
                        value={formData.promoCode}
                        onChange={handleCreateChange}
                        placeholder="WELCOME10"
                        className={`h-11 border-gray-200 focus:border-teal-500 focus:ring-teal-500 ${
                          promoCodeStatus === 'valid'
                            ? 'border-green-500'
                            : promoCodeStatus === 'invalid'
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={validatePromoCode}
                      disabled={!formData.promoCode.trim()}
                      variant="outline"
                      className="h-11"
                    >
                      Validate
                    </Button>
                  </div>
                  {promoCodeStatus === 'valid' && (
                    <p className="text-green-600 text-sm mt-1">✓ Valid promo code</p>
                  )}
                  {promoCodeStatus === 'invalid' && (
                    <p className="text-red-600 text-sm mt-1">✗ Invalid promo code</p>
                  )}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleCreateChange}
                    className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 cursor-pointer mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-teal-600 font-semibold hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-teal-600 font-semibold hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {validationErrors.agreeToTerms && (
                  <p className="text-red-500 text-sm">{validationErrors.agreeToTerms}</p>
                )}

                {validationErrors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{validationErrors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      placeholder="john@example.com"
                      className="pl-10 h-11 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  {loginErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{loginErrors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      type={showLoginPassword ? 'text' : 'password'}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="••••••"
                      className="pl-10 pr-10 h-11 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{loginErrors.password}</p>
                  )}
                </div>

                {loginErrors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{loginErrors.submit}</p>
                  </div>
                )}

                {/* Forgot Password */}
                <div className="text-right">
                  <a href="#" className="text-sm text-teal-600 font-semibold hover:underline">
                    Forgot Password?
                  </a>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
