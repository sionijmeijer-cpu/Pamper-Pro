import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AlertCircle, CheckCircle2, Mail } from 'lucide-react';

interface EmailVerificationProps {
  userEmail?: string;
  onVerificationComplete?: () => void;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  userEmail,
  onVerificationComplete
}) => {
  const { currentUser, verifyEmail, error, clearError } = useAuth();
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  const email = userEmail || currentUser?.email || '';

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    try {
      if (!verificationCode.trim()) {
        throw new Error('Please enter the verification code');
      }

      await verifyEmail(verificationCode);
      setSuccessMessage('Email verified successfully! Redirecting...');
      
      setTimeout(() => {
        onVerificationComplete?.();
      }, 2000);
    } catch (err) {
      console.error('Verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    clearError();

    try {
      // Call resend verification email endpoint
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to resend verification email');
      }

      setSuccessMessage('Verification email sent! Check your inbox.');
      setResendCountdown(60);
      
      const interval = setInterval(() => {
        setResendCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Resend error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="text-gray-600 mt-2">
            We've sent a verification code to <br />
            <span className="font-semibold text-gray-900">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 font-medium">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Verification Code
            </label>
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value.toUpperCase());
                clearError();
              }}
              placeholder="Enter the code from your email"
              disabled={isLoading || successMessage !== ''}
              className="w-full text-center text-lg tracking-widest"
              maxLength={6}
              required
            />
            <p className="text-xs text-gray-600 mt-1">
              Check your email (including spam folder) for a 6-character code
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading || successMessage !== ''}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all duration-200"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-3">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendEmail}
            disabled={isLoading || resendCountdown > 0 || successMessage !== ''}
            className={`w-full px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              resendCountdown > 0 || successMessage !== ''
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'text-green-600 hover:bg-green-50 border-2 border-green-600'
            }`}
          >
            {resendCountdown > 0 
              ? `Resend in ${resendCountdown}s` 
              : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
};
