import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ForgotPasswordFlowProps {
  onComplete: () => void;
}

type ForgotPasswordStep = 'request' | 'confirmation' | 'reset' | 'success';

export function ForgotPasswordFlow({ onComplete }: ForgotPasswordFlowProps) {
  const [step, setStep] = useState<ForgotPasswordStep>('request');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[0-9]/.test(password)) errors.push('One number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');
    return errors;
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('confirmation');
    }, 1000);
  };

  const handleConfirmReset = () => {
    setStep('reset');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      setErrors({ newPassword: `Password must have: ${passwordErrors.join(', ')}` });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1000);
  };

  const handleSuccessComplete = () => {
    onComplete();
  };

  // Step 1: Request Reset
  if (step === 'request') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900">Reset Your Password</h2>
          <p className="text-gray-600 text-sm mt-2">
            Enter your email address and we'll send you a password reset link
          </p>
        </div>

        <form onSubmit={handleRequestReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({});
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      </div>
    );
  }

  // Step 2: Confirmation Screen
  if (step === 'confirmation') {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-full animate-pulse"></div>
            <Mail className="w-16 h-16 text-blue-600 relative" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>
          <p className="text-gray-600 text-sm mt-2">
            We've sent a password reset link to <span className="font-semibold text-gray-900">{email}</span>
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <span className="block font-semibold text-blue-600 mb-2">Simulated Reset Link</span>
            Click the button below to simulate clicking the reset link in your email
          </p>
        </div>

        <Button
          onClick={handleConfirmReset}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          I've Clicked the Reset Link <ArrowRight className="w-4 h-4" />
        </Button>

        <p className="text-xs text-gray-500">
          Didn't receive the email? Check your spam folder or try again
        </p>
      </div>
    );
  }

  // Step 3: Reset Password Form
  if (step === 'reset') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Lock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900">Create New Password</h2>
          <p className="text-gray-600 text-sm mt-2">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              New Password
            </label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErrors({});
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.newPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors({});
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-600">
              Password must contain at least 8 characters, one uppercase letter, one number, and one special character
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    );
  }

  // Step 4: Success
  if (step === 'success') {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-200 rounded-full animate-pulse"></div>
            <CheckCircle className="w-16 h-16 text-green-600 relative" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Password Reset Successful!</h2>
          <p className="text-gray-600 text-sm mt-2">
            Your password has been successfully updated. You can now log in with your new password.
          </p>
        </div>

        <Button
          onClick={handleSuccessComplete}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          Back to Login <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return null;
}
