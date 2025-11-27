import { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff, Loader, X } from "lucide-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LoginFormProps {
  onLoginSuccess: (email: string, password?: string) => void;
  onForgotPassword: () => void;
  onSwitchToSignup?: () => void;
  onSocialAuth: (email: string, firstName: string, lastName: string, socialProvider: 'google') => void;
  isLoading?: boolean;
  error?: string;
}

export function LoginForm({
  onLoginSuccess,
  onForgotPassword,
  onSwitchToSignup,
  onSocialAuth,
  isLoading = false,
  error: externalError = ""
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isFormValid = isEmailValid && formData.password.length >= 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!isEmailValid) {
      setLocalError("Please enter a valid email address");
      return;
    }

    if (!formData.password) {
      setLocalError("Password is required");
      return;
    }

    onLoginSuccess(formData.email, formData.password);
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    setLocalError("");
    try {
      if (credentialResponse.credential) {
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
      setLocalError("Failed to process Google sign-in. Please try again.");
    }
  };



  return (
    <Card className="w-full max-w-md mx-auto border-gray-200">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <LogIn className="h-6 w-6" />
          <div>
            <h2 className="text-2xl font-bold">Sign In</h2>
            <p className="text-sm text-blue-100">Access your client account</p>
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
          <p className="text-xs text-gray-600 font-semibold">QUICK SIGN IN</p>

          <div className="space-y-2">
            {/* Google Sign-In */}
            <div className="w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setLocalError("Google sign-in failed")}
                theme="outline"
                size="large"
                text="signin_with"
              />
            </div>


          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
          </div>
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Signup Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Do not have an account?{" "}
            <button
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create account
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
