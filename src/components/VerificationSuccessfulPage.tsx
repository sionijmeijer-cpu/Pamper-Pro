import { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface VerificationSuccessfulPageProps {
  onLoginClick: () => void;
}

export function VerificationSuccessfulPage({ onLoginClick }: VerificationSuccessfulPageProps) {
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setRedirecting(true);
          onLoginClick();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onLoginClick]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-200 rounded-full animate-pulse"></div>
            <CheckCircle className="w-20 h-20 text-green-600 relative" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Email Verified!
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          Your email has been successfully verified. Your account is now active and ready to use.
        </p>

        {/* Countdown */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-700">
            {redirecting ? (
              <span className="text-blue-600 font-semibold">Redirecting to login...</span>
            ) : (
              <span>
                Redirecting to login in <span className="font-bold text-blue-600">{countdown}</span> seconds...
              </span>
            )}
          </p>
        </div>

        {/* Button */}
        <Button
          onClick={onLoginClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          Go to Login <ArrowRight className="w-4 h-4" />
        </Button>

        {/* Additional Info */}
        <p className="text-xs text-gray-500 mt-6">
          You can now log in with your email and password
        </p>
      </div>
    </div>
  );
}
