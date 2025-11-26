import { useState } from "react";
import { Lock, Eye, EyeOff, Loader, X, CheckCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ResetPasswordFormProps {
  email: string;
  onResetSubmit: (email: string, newPassword: string) => void;
  onBack: () => void;
  isLoading?: boolean;
  error?: string;
}

export function ResetPasswordForm({
  email,
  onResetSubmit,
  onBack,
  isLoading = false,
  error: externalError = ""
}: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  // Password strength validation
  const validatePassword = (pwd: string) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);
    const hasMinLength = pwd.length >= 8;

    return {
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
      hasMinLength,
      isValid: hasUpperCase && hasNumber && hasSpecialChar && hasMinLength
    };
  };

  const passwordStrength = validatePassword(formData.password);
  const isFormValid =
    passwordStrength.isValid &&
    formData.password === formData.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!passwordStrength.isValid) {
      setLocalError("Password must contain uppercase, number, special character, and be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    onResetSubmit(email, formData.password);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-gray-200">
      <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6" />
            <div>
              <h2 className="text-2xl font-bold">Create New Password</h2>
              <p className="text-sm text-green-100">Set a strong password</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="text-green-100 hover:text-white transition-colors"
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
            We have sent a password reset link to <strong>{email}</strong>. Create a new strong password below.
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10"
                disabled={isLoading}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            {formData.password && (
              <div className="space-y-1 mt-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className={`h-4 w-4 ${passwordStrength.hasMinLength ? "text-green-600" : "text-gray-300"}`} />
                  <span className={passwordStrength.hasMinLength ? "text-green-600" : "text-gray-500"}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className={`h-4 w-4 ${passwordStrength.hasUpperCase ? "text-green-600" : "text-gray-300"}`} />
                  <span className={passwordStrength.hasUpperCase ? "text-green-600" : "text-gray-500"}>
                    One uppercase letter (A-Z)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className={`h-4 w-4 ${passwordStrength.hasNumber ? "text-green-600" : "text-gray-300"}`} />
                  <span className={passwordStrength.hasNumber ? "text-green-600" : "text-gray-500"}>
                    One number (0-9)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className={`h-4 w-4 ${passwordStrength.hasSpecialChar ? "text-green-600" : "text-gray-300"}`} />
                  <span className={passwordStrength.hasSpecialChar ? "text-green-600" : "text-gray-500"}>
                    One special character (!@#$%^&*)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="pl-10 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {formData.confirmPassword && (
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className={`h-4 w-4 ${formData.password === formData.confirmPassword ? "text-green-600" : "text-red-600"}`} />
                <span className={formData.password === formData.confirmPassword ? "text-green-600" : "text-red-600"}>
                  {formData.password === formData.confirmPassword ? "Passwords match" : "Passwords do not match"}
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Resetting password...
              </span>
            ) : (
              "Reset Password"
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
