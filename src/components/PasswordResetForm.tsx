import { useState } from "react";
import { Lock, Mail, CheckCircle, Loader } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface PasswordResetFormProps {
  onSuccess?: () => void;
  onBackToLogin?: () => void;
}

export function PasswordResetForm({ onSuccess, onBackToLogin }: PasswordResetFormProps) {
  const { resetPassword, isLoading, error } = useAuthContext();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email) {
      setFormError("Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      setFormError("Please enter a valid email");
      return;
    }

    // Check if user exists (in real app, send reset link)
    const allUsersJson = localStorage.getItem("pamper_pro_all_users");
    const allUsers = allUsersJson ? JSON.parse(allUsersJson) : [];
    const userExists = allUsers.some((u: any) => u.email === email);

    if (!userExists) {
      setFormError("No account found with this email");
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!newPassword || !confirmPassword) {
      setFormError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    const success = await resetPassword(email, newPassword);
    if (success) {
      onSuccess?.();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-gray-200">
      <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <Lock className="h-6 w-6" />
          <div>
            <h2 className="text-2xl font-bold">Reset Password</h2>
            <p className="text-sm text-pink-100">Recover your account</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Error Messages */}
        {(error || formError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error || formError}
          </div>
        )}

        {/* Step 1: Verify Email */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <p className="text-sm text-gray-600">Enter the email address associated with your account</p>

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
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-2"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>
        )}

        {/* Step 2: Set New Password */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Email verified! Set your new password.</span>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {newPassword && (
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className={`h-4 w-4 ${newPassword.length >= 6 ? "text-green-600" : "text-gray-300"}`} />
                  <span className={newPassword.length >= 6 ? "text-green-600" : "text-gray-500"}>
                    At least 6 characters
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {confirmPassword && (
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className={`h-4 w-4 ${newPassword === confirmPassword ? "text-green-600" : "text-red-600"}`} />
                  <span className={newPassword === confirmPassword ? "text-green-600" : "text-red-600"}>
                    {newPassword === confirmPassword ? "Passwords match" : "Passwords do not match"}
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </Button>

            {/* Back Button */}
            <Button
              type="button"
              onClick={() => setStep(1)}
              variant="outline"
              disabled={isLoading}
              className="w-full"
            >
              Back
            </Button>
          </form>
        )}

        {/* Back to Login Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <button
            onClick={onBackToLogin}
            className="text-sm text-pink-600 hover:text-pink-700 font-semibold"
          >
            Back to Login
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
