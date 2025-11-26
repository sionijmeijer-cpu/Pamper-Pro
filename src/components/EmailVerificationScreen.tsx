import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, Loader } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

interface EmailVerificationScreenProps {
  email: string;
  firstName: string;
  lastName: string;
  onVerified: () => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export function EmailVerificationScreen({
  email,
  firstName,
  onVerified,
  onBack,
  isLoading = false
}: EmailVerificationScreenProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyEmail = async () => {
    setIsVerifying(true);
    
    // Simulate email verification delay (mock)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock verification - in production, this would validate a real email link
    setIsVerified(true);
    setIsVerifying(false);
  };

  const handleContinue = () => {
    if (isVerified) {
      onVerified();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-gray-200">
      <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <Mail className="h-6 w-6" />
          <div>
            <h2 className="text-2xl font-bold">Verify Your Email</h2>
            <p className="text-sm text-pink-100">One more step to get started</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {!isVerified ? (
          <>
            {/* Email Display */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Verification email sent to:</p>
              <p className="text-lg font-semibold text-blue-900 break-all">{email}</p>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">What happens next?</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                    1
                  </span>
                  <span>We&apos;ve sent a verification link to your email</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                    2
                  </span>
                  <span>Click the link in the email to confirm your address</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                    3
                  </span>
                  <span>Complete your profile and start booking services!</span>
                </li>
              </ol>
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerifyEmail}
              disabled={isVerifying || isLoading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 disabled:opacity-50"
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="h-5 w-5 animate-spin" />
                  Verifying Email...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5" />
                  Verify Email Address
                </span>
              )}
            </Button>

            {/* Back Button */}
            {onBack && (
              <Button
                onClick={onBack}
                variant="outline"
                disabled={isVerifying || isLoading}
                className="w-full"
              >
                Back to Sign Up
              </Button>
            )}

            {/* Info Text */}
            <p className="text-xs text-gray-600 text-center">
              Didn&apos;t receive the email? Check your spam folder or click &quot;Verify Email&quot; to resend.
            </p>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Email Verified!</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Welcome, {firstName}! Your email has been verified successfully.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">Next step:</span> Complete your profile to start booking beauty services!
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3"
            >
              <span className="flex items-center justify-center gap-2">
                Continue to Profile <ArrowRight className="h-5 w-5" />
              </span>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
