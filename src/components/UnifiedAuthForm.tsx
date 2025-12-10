import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AlertCircle, CheckCircle2, Mail } from 'lucide-react';
import { resendVerificationEmail } from '../api/authClient';

interface UnifiedAuthFormProps {
  onEmailVerificationNeeded?: () => void;
}

export const UnifiedAuthForm: React.FC<UnifiedAuthFormProps> = ({ onEmailVerificationNeeded }) => {
  const { login, signup, error, clearError } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);
  const [resendEmail, setResendEmail] = useState('');
  const [lastLoginEmail, setLastLoginEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError();
    setShowResendButton(false);
    setResendMessage('');
  };

  // If the auth error suggests email verification, show the resend button
  useEffect(() => {
    if (!error) return;

    const lower = error.toLowerCase();
    if (lower.includes('verify') || lower.includes('verification')) {
      setShowResendButton(true);
      setResendEmail(lastLoginEmail || formData.email);
    } else {
      setShowResendButton(false);
    }
  }, [error, lastLoginEmail, formData.email]);

  const handleResendVerification = async () => {
    if (!resendEmail) {
      setResendMessage('Please enter your email address first.');
      return;
    }

    setResendLoading(true);
    setResendMessage('');

    try {
      // We don’t rely on any return shape from this function
      await resendVerificationEmail(resendEmail);

      setResendMessage('Verification email sent. Please check your inbox (and spam folder).');
      setShowResendButton(false);
    } catch (err) {
      console.error('Resend verification error:', err);
      setResendMessage('Failed to resend verification email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    setShowResendButton(false);
    setResendMessage('');
    setSuccessMessage('');

    try {
      if (isSignup) {
        // Validation
        if (!formData.firstName.trim()) {
          throw new Error('First name is required');
        }
        if (!formData.lastName.trim()) {
          throw new Error('Last name is required');
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.password.length < 8) {
          throw new Error('Password must be at least 8 characters');
        }

        await signup(
          formData.email,
          formData.firstName,
          formData.lastName,
          formData.password
        );

        setSuccessMessage('Account created! Please check your email to verify your account.');
        onEmailVerificationNeeded?.();

        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: ''
        });
        setTimeout(() => setIsSignup(false), 2000);
      } else {
        // Login – we assume login() is Promise<void>
        setLastLoginEmail(formData.email);
        await login(formData.email, formData.password);

        // If login fails due to unverified email, your AuthContext should
        // set an appropriate error message; the useEffect above will then
        // enable the resend button based on that message.
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      // Extra local validation errors can show up using successMessage or
      // by setting your own local error if you prefer.
      if (err instanceof Error && !error) {
        // Only show local errors if context didn't set one
        setSuccessMessage('');
        // You could also add a localError state if you want separate messages
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">
          {isSignup ? 'Create Account' : 'Sign In'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isSignup ? 'Join Pamper Pro as a client' : 'Welcome back to Pamper Pro'}
        </p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-800">{error}</p>
                {showResendButton && (
                  <Button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resendLoading}
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4"
                  >
                    {resendLoading ? 'Sending...' : 'Resend Verification Email'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {resendMessage && (
          <div
            className={`mb-4 p-4 rounded-lg flex items-start gap-3 ${
              resendMessage.toLowerCase().includes('sent') ||
              resendMessage.toLowerCase().includes('check')
                ? 'bg-green-50 border border-green-200'
                : 'bg-yellow-50 border border-yellow-200'
            }`}
          >
            <Mail
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                resendMessage.toLowerCase().includes('sent') ||
                resendMessage.toLowerCase().includes('check')
                  ? 'text-green-600'
                  : 'text-yellow-600'
              }`}
            />
            <p
              className={`text-sm ${
                resendMessage.toLowerCase().includes('sent') ||
                resendMessage.toLowerCase().includes('check')
                  ? 'text-green-800'
                  : 'text-yellow-800'
              }`}
            >
              {resendMessage}
            </p>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-800 font-medium">{successMessage}</p>
              <p className="text-xs text-green-700 mt-1">
                Check your spam folder if you don&apos;t see it.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  disabled={isLoading}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  disabled={isLoading}
                  className="w-full"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              disabled={isLoading}
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isSignup ? 'At least 8 characters' : '••••••••'}
              disabled={isLoading}
              className="w-full"
              required
            />
          </div>

          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full"
                required
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all duration-200"
          >
            {isLoading ? 'Processing...' : isSignup ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-4">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              clearError();
              setSuccessMessage('');
              setShowResendButton(false);
              setResendMessage('');
            }}
            disabled={isLoading}
            className="w-full px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200"
          >
            {isSignup ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};
