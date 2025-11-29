import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import { Button } from '../components/ui/button';
import { verifyEmail } from '../api/authClient';

interface EmailVerificationPageProps {
  onNavigate?: (path: string) => void;
}

type VerificationState = 'loading' | 'success' | 'error';

export function EmailVerificationPage({ onNavigate }: EmailVerificationPageProps) {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<VerificationState>('loading');
  const [message, setMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    const verifyUserEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setState('error');
        setMessage('No verification token found');
        setErrorDetails('The verification link is incomplete or invalid.');
        return;
      }

      try {
        const result = await verifyEmail(token);

        if (result.success) {
          setState('success');
          setMessage(result.message || 'Email verified successfully!');
        } else {
          setState('error');
          setMessage(result.error || 'Verification failed');
          setErrorDetails(
            result.error === 'Invalid or expired token'
              ? 'This verification link has expired or is no longer valid. Please try signing up again.'
              : 'There was an issue verifying your email. Please try again or contact support.'
          );
        }
      } catch (error) {
        setState('error');
        setMessage('Verification error');
        setErrorDetails('An unexpected error occurred. Please try again later.');
        console.error('Email verification error:', error);
      }
    };

    verifyUserEmail();
  }, [searchParams]);

  const handleNavigateToLogin = () => {
    if (onNavigate) {
      onNavigate('/login');
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 px-6 py-12 text-center">
            {state === 'loading' && (
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-30"></div>
                  <Loader className="w-16 h-16 text-white relative animate-spin" />
                </div>
              </div>
            )}
            {state === 'success' && (
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-30"></div>
                  <CheckCircle2 className="w-16 h-16 text-white relative" />
                </div>
              </div>
            )}
            {state === 'error' && (
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-200 rounded-full blur-lg opacity-30"></div>
                  <AlertCircle className="w-16 h-16 text-white relative" />
                </div>
              </div>
            )}
            <h1 className="text-3xl font-bold text-white">
              {state === 'loading' && 'Verifying Email...'}
              {state === 'success' && 'Email Verified!'}
              {state === 'error' && 'Verification Failed'}
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 text-center space-y-6">
            {state === 'loading' && (
              <div className="space-y-3">
                <p className="text-gray-600">
                  Please wait while we verify your email address...
                </p>
                <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}

            {state === 'success' && (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-emerald-900">{message}</p>
                </div>
                <p className="text-gray-600">
                  Your account is now active. You can log in with your email and password.
                </p>
                <Button
                  onClick={handleNavigateToLogin}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  Go to Login
                </Button>
              </div>
            )}

            {state === 'error' && (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                  <p className="text-red-900 font-semibold">{message}</p>
                  <p className="text-red-800 text-sm">{errorDetails}</p>
                </div>
                <Button
                  onClick={handleNavigateToLogin}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  Back to Login
                </Button>
                <p className="text-sm text-gray-600">
                  Need help? <a href="#" className="text-teal-600 hover:underline font-semibold">Contact support</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
