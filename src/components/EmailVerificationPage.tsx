import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

export function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail, isLoading, error } = useAuth();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const verifyEmailToken = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        return;
      }

      const success = await verifyEmail(token);

      if (success) {
        setStatus('success');
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard/client');
        }, 2000);
      } else {
        setStatus('error');
      }
    };

    verifyEmailToken();
  }, [searchParams, verifyEmail, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {status === 'verifying' && (
            <>
              <Loader2 className="w-16 h-16 mx-auto text-purple-600 animate-spin mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verifying Email
              </h1>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Email Verified!
              </h1>
              <p className="text-gray-600 mb-6">
                Your email has been successfully verified. You can now access your account.
              </p>
              <Button
                onClick={() => navigate('/dashboard/client')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Go to Dashboard
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verification Failed
              </h1>
              <p className="text-gray-600 mb-2">
                {error || 'The email verification link is invalid or has expired.'}
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Please try signing up again or contact support if you continue to have issues.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="flex-1"
                >
                  Back to Home
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Try Again
                </Button>
              </div>
            </>
          )}

          {isLoading && status === 'verifying' && (
            <div className="mt-6 text-sm text-gray-500">
              Redirecting to dashboard...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
