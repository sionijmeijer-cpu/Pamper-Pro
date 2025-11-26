import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Mail, Lock, User as UserIcon, Loader } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { useAuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "signup";
  onAuthenticated?: () => void;
}

export function AuthModal({ isOpen, onClose, defaultTab = "signin", onAuthenticated }: AuthModalProps) {
  const { login, signup, isLoading, error } = useAuthContext();
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  
  // Sign Up State
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<"client" | "professional">("client");
  const [signUpError, setSignUpError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError("");

    if (!signInEmail || !signInPassword) {
      setSignInError("Please fill in all fields");
      return;
    }

    const success = await login({ email: signInEmail, password: signInPassword });
    if (success) {
      setSignInEmail("");
      setSignInPassword("");
      onAuthenticated?.();
      onClose();
    } else {
      setSignInError(error || "Login failed");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError("");

    if (!signUpEmail || !signUpPassword || !firstName || !lastName) {
      setSignUpError("Please fill in all fields");
      return;
    }

    if (signUpPassword.length < 6) {
      setSignUpError("Password must be at least 6 characters");
      return;
    }

    const success = await signup({
      email: signUpEmail,
      password: signUpPassword,
      firstName,
      lastName,
      role
    });

    if (success) {
      setSignUpEmail("");
      setSignUpPassword("");
      setFirstName("");
      setLastName("");
      onAuthenticated?.();
      onClose();
    } else {
      setSignUpError(error || "Signup failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // Extract user info from Google JWT token
      const token = credentialResponse.credential;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decodedToken = JSON.parse(jsonPayload);
      
      // Use Google email and name for signup/login
      const email = decodedToken.email;
      const firstName = decodedToken.given_name || 'User';
      const lastName = decodedToken.family_name || '';
      
      // Try to login with Google email, if not found, create account
      let success = await login({ email, password: token });
      
      if (!success) {
        // If login fails, create new account with Google info
        success = await signup({
          email,
          password: token,
          firstName,
          lastName,
          role: 'client'
        });
      }
      
      if (success) {
        onAuthenticated?.();
        onClose();
      }
    } catch (err) {
      setSignInError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pamper Pro</DialogTitle>
          <DialogDescription>Sign in to your account</DialogDescription>
        </DialogHeader>

        {/* Google Sign-In */}
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setSignInError("Google sign-in failed")}
            text="signin_with"
            width="300"
          />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "signin" | "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="signin" className="space-y-4">
            {(signInError || error) && (
              <Alert variant="destructive">
                <AlertDescription>{signInError || error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Your password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup" className="space-y-4">
            {(signUpError || error) && (
              <Alert variant="destructive">
                <AlertDescription>{signUpError || error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">I am a:</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as "client" | "professional")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                  disabled={isLoading}
                >
                  <option value="client">Client</option>
                  <option value="professional">Professional</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
