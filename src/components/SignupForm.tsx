import { useState } from "react";
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Loader, CheckCircle } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { UserRole } from "../entities/User";

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
  const { signup, isLoading, error } = useAuthContext();
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("client");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
  });

  const [formError, setFormError] = useState("");

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Validation
    if (!formData.email || !formData.firstName || !formData.lastName) {
      setFormError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setFormError("Please enter a valid email");
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Validation
    if (!formData.password || !formData.confirmPassword || !selectedRole) {
      setFormError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    const success = await signup({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      role: selectedRole as UserRole
    });

    if (success) {
      onSuccess?.();
    }
  };

  const handleBack = () => {
    setFormError("");
    setStep(1);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-gray-200">
      <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <UserPlus className="h-6 w-6" />
          <div>
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-sm text-pink-100">Step {step} of 2</p>
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

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <p className="text-sm text-gray-600">Tell us about yourself</p>

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
              </div>
            </div>

            {/* Next Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-2"
            >
              {isLoading ? "Loading..." : "Next Step"}
            </Button>
          </form>
        )}

        {/* Step 2: Role & Password */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-4">
            <p className="text-sm text-gray-600">Select your role and set a password</p>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">I am a:</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "client", label: "Client", desc: "Looking for services" },
                  { value: "professional", label: "Professional", desc: "Offering services" }
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedRole(option.value as UserRole)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedRole === option.value
                        ? "border-pink-600 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                    disabled={isLoading}
                  >
                    <div className="font-semibold text-sm">{option.label}</div>
                    <div className="text-xs text-gray-600">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
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
              {formData.password && (
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className={`h-4 w-4 ${formData.password.length >= 6 ? "text-green-600" : "text-gray-300"}`} />
                  <span className={formData.password.length >= 6 ? "text-green-600" : "text-gray-500"}>
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
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Back Button */}
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              disabled={isLoading}
              className="w-full"
            >
              Back
            </Button>
          </form>
        )}

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-pink-600 hover:text-pink-700 font-semibold"
            >
              Login
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
