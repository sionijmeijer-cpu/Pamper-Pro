import { useState } from 'react';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Loader } from 'lucide-react';
import { Button } from './ui/button';

interface SignupPageProps {
  onSignupComplete: () => void;
}

export function ProfessionalSignupPage({ onSignupComplete }: SignupPageProps) {
  const [signupMethod, setSignupMethod] = useState<'method' | 'email' | 'google'>('method');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Enter Details, 2: Verify Email, 3: Success

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      // Simulate Google OAuth - will integrate with actual Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(3);
      setTimeout(() => onSignupComplete(), 2000);
    } catch (err) {
      setError('Google signup failed. Please try again.');
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate email signup - will integrate with backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(2);
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      // Simulate email verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(3);
      setTimeout(() => onSignupComplete(), 2000);
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Choose signup method
  if (signupMethod === 'method') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl mb-6 shadow-lg">
              <span className="text-2xl font-bold text-white">PP</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Launch Your Beauty Business
            </h1>
            <p className="text-gray-600 text-lg">
              Join thousands of beauty professionals on Pamper Pro
            </p>
          </div>

          {/* Signup Options */}
          <div className="space-y-4">
            {/* Google Signup */}
            <button
              onClick={() => setSignupMethod('google')}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-gray-900 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Email Signup */}
            <button
              onClick={() => setSignupMethod('email')}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-gray-900 group"
            >
              <Mail className="w-5 h-5" />
              Sign up with Email
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-500 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <button className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
              Sign in
            </button>
          </p>

          {/* Benefits */}
          <div className="mt-12 space-y-4 pt-8 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Easy Setup</h3>
                <p className="text-gray-600 text-xs">Complete your profile in just 4 steps</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Start Earning</h3>
                <p className="text-gray-600 text-xs">Get bookings from thousands of clients</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Full Support</h3>
                <p className="text-gray-600 text-xs">24/7 customer support for professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Google Signup
  if (signupMethod === 'google') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center">
            {!loading ? (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">PP</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Connect with Google</h1>
                <p className="text-gray-600 mb-8">Sign up securely with your Google account</p>
                <Button
                  onClick={handleGoogleSignup}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 mb-4"
                >
                  Proceed to Google
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <button
                  onClick={() => setSignupMethod('method')}
                  className="text-teal-600 font-semibold hover:text-teal-700"
                >
                  Back to options
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl mb-6 shadow-lg">
                  <Loader className="w-8 h-8 text-white animate-spin" />
                </div>
                <p className="text-gray-600">Connecting to Google...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Email Signup
  if (signupMethod === 'email' && step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <button
              onClick={() => setSignupMethod('method')}
              className="text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-2 mb-6"
            >
              ← Back to options
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join Pamper Pro as a beauty professional</p>
          </div>

          <form onSubmit={handleEmailSignup} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    setError('');
                  }}
                  placeholder="Sarah Johnson"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setError('');
                  }}
                  placeholder="sarah@example.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">At least 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-gray-300 text-teal-600 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <button className="text-teal-600 font-semibold hover:text-teal-700">Terms of Service</button> and <button className="text-teal-600 font-semibold hover:text-teal-700">Privacy Policy</button>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <button className="text-teal-600 font-semibold hover:text-teal-700">Sign in</button>
          </p>
        </div>
      </div>
    );
  }

  // Step 4: Email Verification
  if (signupMethod === 'email' && step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-2xl mb-6">
            <Mail className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Verify Your Email</h1>
          <p className="text-gray-600 mb-8">
            We've sent a verification link to <br />
            <span className="font-semibold text-gray-900">{formData.email}</span>
          </p>

          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8">
            <p className="text-gray-700 mb-4">Click the link in your email to verify your account.</p>
            <p className="text-sm text-gray-600">Didn't receive the email? Check your spam folder.</p>
          </div>

          <Button
            onClick={handleVerifyEmail}
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 mb-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                I've Verified My Email
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          <button
            onClick={() => setSignupMethod('method')}
            className="text-teal-600 font-semibold hover:text-teal-700"
          >
            Back to options
          </button>
        </div>
      </div>
    );
  }

  // Step 5: Success
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl mb-6 shadow-lg animate-bounce">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {(signupMethod as string) === 'google' ? 'Welcome to Pamper Pro!' : 'Welcome!'}
          </h1>
          <p className="text-gray-600 mb-8">
            {(signupMethod as string) === 'google'
              ? 'Your account has been created successfully. Let\'s set up your profile!'
              : 'Your account is all set up. Let\'s complete your profile to start accepting bookings!'}
          </p>
          <div className="inline-flex items-center justify-center w-full h-1 bg-teal-600 rounded-full mb-8 animate-pulse" />
          <p className="text-sm text-gray-600">Redirecting to setup...</p>
        </div>
      </div>
    );
  }

  return null;
}
