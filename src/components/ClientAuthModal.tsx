import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { ClientSignupForm } from "./ClientSignupForm";
import { EmailVerificationScreen } from "./EmailVerificationScreen";
import { ClientProfileCompletion } from "./ClientProfileCompletion";
import { LoginForm } from "./LoginForm";
import { VerificationSuccessfulPage } from "./VerificationSuccessfulPage";
import { ForgotPasswordFlow } from "./ForgotPasswordFlow";

interface ClientAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated?: () => void;
}

type AuthStep = 
  | "login"
  | "signup"
  | "verification"
  | "profile"
  | "verification-success"
  | "forgot-password";

interface PendingSignupData {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  socialProvider?: "google" | "facebook";
}

export function ClientAuthModal({ isOpen, onClose, onAuthenticated }: ClientAuthModalProps) {
  const [step, setStep] = useState<AuthStep>("login");
  const [pendingData, setPendingData] = useState<PendingSignupData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [localError, setLocalError] = useState("");
  const authLoading = false;
  const authError = "";

  // ==================== LOGIN FLOW ====================
  const handleLogin = async (email: string, password?: string) => {
    if (!password) return;
    
    setIsProcessing(true);
    setLocalError("");

    try {
      // Simulate checking if user exists and password is correct
      const storedUser = localStorage.getItem(`client_${email}`);
      
      if (!storedUser) {
        setLocalError("Invalid email or password");
        setIsProcessing(false);
        return;
      }

      const userData = JSON.parse(storedUser);

      // Check if user is verified
      if (!userData.isVerified) {
        setLocalError("Please verify your email first. Check your inbox for verification link.");
        setIsProcessing(false);
        return;
      }

      // Check password (in real app, this would be done on backend with hashing)
      if (userData.password !== password) {
        setLocalError("Invalid email or password");
        setIsProcessing(false);
        return;
      }

      // Simulate successful login - store token
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("client_token", token);
      localStorage.setItem("client_current_user", JSON.stringify(userData));

      onAuthenticated?.();
      onClose();
      resetState();
    } catch (err) {
      setLocalError("Login failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSocialLogin = async (
    email: string,
    firstName: string,
    lastName: string,
    socialProvider: string
  ) => {
    setIsProcessing(true);
    setLocalError("");

    try {
      // Check if user exists for social login
      const storedUser = localStorage.getItem(`client_${email}`);

      if (storedUser) {
        // User already has account, auto-login
        const userData = JSON.parse(storedUser);
        const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("client_token", token);
        localStorage.setItem("client_current_user", JSON.stringify(userData));

        onAuthenticated?.();
        onClose();
        resetState();
        return;
      }

      // New user, create account with social auth
      const userData = {
        email,
        firstName: firstName || '',
        lastName: lastName || '',
        socialProvider,
        isVerified: true, // Auto-verify for social auth
        password: `social_${socialProvider}_${Date.now()}`,
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        preferences: [],
        bio: "",
        createdAt: new Date().toISOString()
      };

      localStorage.setItem(`client_${email}`, JSON.stringify(userData));
      
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("client_token", token);
      localStorage.setItem("client_current_user", JSON.stringify(userData));

      onAuthenticated?.();
      onClose();
      resetState();
    } catch (err) {
      setLocalError("Social login failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ==================== SIGNUP FLOW ====================
  const handleSignupSubmit = (email: string, firstName: string, lastName: string) => {
    setPendingData({
      email,
      firstName,
      lastName
    });
    setStep("verification");
    setLocalError("");
  };

  const handleSocialAuth = async (
    email: string,
    firstName: string,
    lastName: string,
    socialProvider: string
  ) => {
    await handleSocialLogin(email, firstName, lastName, socialProvider);
  };

  const handleEmailVerified = () => {
    setStep("verification-success");
  };

  const handleVerificationSuccessComplete = () => {
    setStep("profile");
  };

  const handleProfileComplete = async (profileData: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    location: string;
    bio: string;
    preferences: string[];
  }) => {
    setIsProcessing(true);
    setLocalError("");

    try {
      // Create user account with profile data
      const password = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const userData = {
        email: profileData.email,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        password,
        phone: profileData.phone,
        address: profileData.location.split(',')[0] || '',
        city: profileData.location.split(',')[1]?.trim() || '',
        state: profileData.location.split(',')[2]?.trim() || '',
        zipCode: '',
        preferences: profileData.preferences,
        bio: profileData.bio,
        isVerified: true,
        createdAt: new Date().toISOString()
      };

      // Store user in localStorage (simulating database)
      localStorage.setItem(`client_${profileData.email}`, JSON.stringify(userData));

      // Create login token
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("client_token", token);
      localStorage.setItem("client_current_user", JSON.stringify(userData));

      onAuthenticated?.();
      onClose();
      resetState();
    } catch (err) {
      setLocalError("Account creation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ==================== FORGOT PASSWORD FLOW ====================
  const handleForgotPasswordComplete = () => {
    setStep("login");
    setPendingData(null);
    setLocalError("");
  };

  // ==================== UTILITIES ====================
  const handleBackFromVerification = () => {
    setStep("signup");
    setPendingData(null);
    setLocalError("");
  };

  const resetState = () => {
    setStep("login");
    setPendingData(null);
    setLocalError("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {/* LOGIN STEP */}
        {step === "login" && (
          <LoginForm
            onLoginSuccess={handleLogin}
            onForgotPassword={() => setStep("forgot-password")}
            onSwitchToSignup={() => setStep("signup")}
            onSocialAuth={handleSocialLogin}
            isLoading={isProcessing || authLoading}
            error={localError || authError || undefined}
          />
        )}

        {/* SIGNUP STEP */}
        {step === "signup" && (
          <ClientSignupForm
            onVerificationNeeded={handleSignupSubmit}
            onSocialAuth={handleSocialAuth}
            onSwitchToLogin={() => setStep("login")}
            isLoading={isProcessing || authLoading}
            error={localError || authError || undefined}
          />
        )}

        {/* EMAIL VERIFICATION STEP */}
        {step === "verification" && pendingData && (
          <EmailVerificationScreen
            email={pendingData.email}
            firstName={pendingData.firstName}
            lastName={pendingData.lastName}
            onVerified={handleEmailVerified}
            onBack={handleBackFromVerification}
            isLoading={isProcessing}
          />
        )}

        {/* VERIFICATION SUCCESSFUL STEP */}
        {step === "verification-success" && (
          <VerificationSuccessfulPage
            onLoginClick={handleVerificationSuccessComplete}
          />
        )}

        {/* PROFILE COMPLETION STEP */}
        {step === "profile" && pendingData && (
          <ClientProfileCompletion
            email={pendingData.email}
            firstName={pendingData.firstName}
            lastName={pendingData.lastName}
            onComplete={handleProfileComplete}
            isLoading={isProcessing}
            error={localError || authError || undefined}
          />
        )}

        {/* FORGOT PASSWORD FLOW */}
        {step === "forgot-password" && (
          <ForgotPasswordFlow
            onComplete={handleForgotPasswordComplete}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
