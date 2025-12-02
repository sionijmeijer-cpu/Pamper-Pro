import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../context/AuthContext';

interface ClientSignupPageProps {
  onNavigate?: (page: string) => void;
  onClose?: () => void;
}

export function ClientSignup({ onNavigate, onClose }: ClientSignupPageProps) {
  const { signup, login } = useAuth();
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
  const [successMessage, setSuccessMessage] = useState('');

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
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
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
    if (!/^\S+@\S+\.\S+$/.test(loginData.email)) {
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
    try {
      await signup(
        formData.email,
        formData.firstName,
        formData.lastName,
        formData.password,
        formData.phone,
        formData.smsNotifications,
        formData.promoCode
      );
      setSubmitSuccess(true);
      setSuccessMessage('Account created successfully! Check your email for next steps.');
      setTimeout(() => {
        if (onClose) onClose();
        if (onNavigate) onNavigate('client-dashboard');
      }, 3000);
    } catch (error) {
      setValidationErrors({ submit: 'Signup failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) return;

    setIsSubmitting(true);
    try {
      await login(loginData.email, loginData.password);
      setSubmitSuccess(true);
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        if (onClose) onClose();
        if (onNavigate) onNavigate('client-dashboard');
      }, 2000);
    } catch (error) {
      setLoginErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordErrors = validatePassword(formData.password);
  const hasPasswordErrors = passwordErrors.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 px-6 py-8 relative">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Pamper Pro</h1>
                <p className="text-teal-100 text-sm">Professional beauty services at your fingertips</p>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-white hover:text-teal-100 transition-colors"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                activeTab === 'create'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                activeTab === 'login'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Login
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            {submitSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-semibold text-emerald-900">{successMessage}</p>
                </div>
              </div>
            )}

            {/* Create Account Tab */}
            {activeTab === 'create' && (
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-slate-400" size={20} />
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleCreateChange}
                        placeholder="John"
                        className="pl-10"
                      />
                    </div>
                    {validationErrors.firstName && (
                      <p className="text-red-600 text-xs mt-1">{validationErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-slate-400" size={20} />
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleCreateChange}
                        placeholder="Doe"
                        className="pl-10"
                      />
                    </div>
                    {validationErrors.lastName && (
                      <p className="text-red-600 text-xs mt-1">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleCreateChange}
                      placeholder="john@example.com"
                      className="pl-10"
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="text-red-600 text-xs mt-1">{validationErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-slate-400" size={20} />
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleCreateChange}
                      placeholder="+234 (0) 123 456 7890"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleCreateChange}
                      placeholder="Minimum 6 characters"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {validationErrors.password && (
                    <p className="text-red-600 text-xs mt-1">{validationErrors.password}</p>
                  )}
                  {hasPasswordErrors && formData.password && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg space-y-2">
                      {passwordErrors.map((error, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          {error}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleCreateChange}
                      placeholder="Re-enter password"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1">{validationErrors.confirmPassword}</p>
                  )}
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    id="sms"
                    checked={formData.smsNotifications}
                    onChange={handleCreateChange}
                    className="rounded text-teal-600"
                  />
                  <label htmlFor="sms" className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">Get SMS updates</span>
                    <span className="text-slate-600"> for bookings and offers</span>
                  </label>
                </div>

                {/* Promo Code */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Promo Code <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      name="promoCode"
                      value={formData.promoCode}
                      onChange={handleCreateChange}
                      placeholder="Enter code"
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={validatePromoCode}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                  {promoCodeStatus === 'valid' && (
                    <p className="text-emerald-600 text-xs mt-2 flex items-center gap-1">
                      <CheckCircle2 size={16} /> Code valid! You get 20% off
                    </p>
                  )}
                  {promoCodeStatus === 'invalid' && (
                    <p className="text-red-600 text-xs mt-2">Code not found</p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onChange={handleCreateChange}
                    className="rounded text-teal-600 mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-slate-700">
                    I agree to the <span className="text-teal-600 hover:underline cursor-pointer font-semibold">Terms of Service</span> and <span className="text-teal-600 hover:underline cursor-pointer font-semibold">Privacy Policy</span>
                  </label>
                </div>
                {validationErrors.agreeToTerms && (
                  <p className="text-red-600 text-xs">{validationErrors.agreeToTerms}</p>
                )}

                {validationErrors.submit && (
                  <p className="text-red-600 text-sm">{validationErrors.submit}</p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  {!isSubmitting && <ArrowRight size={20} />}
                </Button>
              </form>
            )}

            {/* Login Tab */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                    <Input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      placeholder="john@example.com"
                      className="pl-10"
                    />
                  </div>
                  {loginErrors.email && (
                    <p className="text-red-600 text-xs mt-1">{loginErrors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-slate-700">Password</label>
                    <a href="#" className="text-xs text-teal-600 hover:text-teal-700 font-semibold">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                    <Input
                      type={showLoginPassword ? 'text' : 'password'}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-red-600 text-xs mt-1">{loginErrors.password}</p>
                  )}
                </div>

                {loginErrors.submit && (
                  <p className="text-red-600 text-sm">{loginErrors.submit}</p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                  {!isSubmitting && <ArrowRight size={20} />}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
