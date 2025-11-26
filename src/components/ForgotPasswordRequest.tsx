import { useState } from "react";
import { Mail, Loader, X, CheckCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ForgotPasswordRequestProps {
  onRequestSubmit: (email: string) => void;
  onBack: () => void;
  isLoading?: boolean;
  error?: string;
}

export function ForgotPasswordRequest({
  onRequestSubmit,
  onBack,
  isLoading = false,
  error: externalError = ""
}: ForgotPasswordRequestProps) {
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isEmailValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!isEmailValid) {
      setLocalError("Please enter a valid email address");
      return;
    }

    onRequestSubmit(email);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-gray-200">
      <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6" />
            <div>
              <h2 className="text-2xl font-bold">Reset Password</h2>
              <p className="text-sm text-orange-100">Recover your account</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="text-orange-100 hover:text-white transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Error Messages */}
        {(externalError || localError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <X className="h-4 w-4 flex-shrink-0" />
            <span>{externalError || localError}</span>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
          <p>
            Enter the email address associated with your account. We will send you a password reset link.
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isLoading}
                autoFocus
              />
              {email && (
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <CheckCircle className={`h-4 w-4 ${isEmailValid ? "text-green-600" : "text-gray-300"}`} />
                  <span className={isEmailValid ? "text-green-600" : "text-gray-500"}>
                    {isEmailValid ? "Valid email" : "Invalid email"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Sending reset link...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        {/* Back Button */}
        <div className="text-center pt-4 border-t border-gray-200">
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-gray-900 font-semibold"
          >
            Back to sign in
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
