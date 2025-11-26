import { useState } from "react";
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Loader, CheckCircle, X } from "lucide-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ClientSignupFormProps {
  onVerificationNeeded: (email: string, firstName: string, lastName: string) => void;
  onSocialAuth: (email: string, firstName: string, lastName: string, socialProvider: 'google' | 'facebook') => void;
  onSwitchToLogin?: () => void;
  isLoading?: boolean;
  error?: string;
}

export function ClientSignupForm({ 
  onVerificationNeeded, 
  onSocialAuth,
  onSwitchToLogin,
  isLoading = false,
  error: externalError = ""
}: ClientSignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  // Email validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const isFormValid = 
    formData.firstName &&
    formData.lastName &&
    isEmailValid &&
    passwordStrength.isValid &&
    formData.password === formData.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Validation
    if (!formData.firstName.trim()) {
      setLocalError("First name is required");
      return;
    }

    if (!formData.lastName.trim()) {
      setLocalError("Last name is required");
      return;
    }

    if (!isEmailValid) {
      setLocalError("Please enter a valid email address");
      return;
    }

    if (!passwordStrength.isValid) {
      setLocalError("Password must contain uppercase, number, special character, and be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    // Proceed to email verification
    onVerificationNeeded(formData.email, formData.firstName, formData.lastName);
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    setLocalError("");
    try {
      if (credentialResponse.credential) {
        // Decode JWT token (basic decoding)
        const base64Url = credentialResponse.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        
        onSocialAuth(
          decoded.email,
          decoded.given_name || "",
          decoded.family_name || "",
          "google"
        );
      }
    } catch (err) {
      setLocalError("Failed to process Google sign-up. Please try again.");
    }
  };

  const handleFacebookClick = () => {
    // Placeholder for Facebook - user needs to configure Facebook App ID
    setLocalError("Facebook sign-up is coming soon. Please use Google or email sign-up.");
  };

  return (
    <Card className="w-full max-w-md mx-auto border-gray-200">
      <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <UserPlus className="h-6 w-6" />
          <div>
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <p className="text-sm text-pink-100">Create your client account</p>
          </div>
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

        {/* Social Auth Buttons */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600 font-semibold">QUICK SIGN UP</p>
          
          <div className="space-y-2">
            {/* Google Sign-In */}
            <div className="w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setLocalError("Google sign-up failed")}
                theme="outline"
                size="large"
                text="signup_with"
              />
            </div>

            {/* Facebook Sign-In */}
            <Button
              onClick={handleFacebookClick}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
            >
              Sign up with Facebook
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Last Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                disabled={isLoading}
              />
              {formData.email && (
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <CheckCircle className={`h-4 w-4 ${isEmailValid ? "text-green-600" : "text-gray-300"}`} />
                  <span className={isEmailValid ? "text-green-600" : "text-gray-500"}>
                    {isEmailValid ? "Valid email" : "Invalid email"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10"
                disabled={isLoading}
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
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : (
              "Continue to Email Verification"
            )}
          </Button>
        </form>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-pink-600 hover:text-pink-700 font-semibold"
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
