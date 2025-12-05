import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { Mail, Check, AlertCircle } from 'lucide-react';

interface SignupStep {
  step: 'email' | 'verify' | 'profile' | 'success';
  email?: string;
  userType?: 'professional' | 'client';
}

export default function SignupWithACS() {
  const [signupStep, setSignupStep] = useState<SignupStep>({ step: 'email' });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    verificationCode: '',
  });
  const [resendTimer, setResendTimer] = useState(0);

  // Step 1: Initial signup with email
  const handleEmailSignup = async (userType: 'professional' | 'client') => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      // Call signup function to generate token
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          userType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Signup failed');
        return;
      }

      // Now send verification email via ACS
      console.log('Sending verification email to:', formData.email);
      console.log('Verification token:', data.verificationToken);
      
      const emailResponse = await fetch('/api/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          token: data.verificationToken,
        }),
      });

      const emailData = await emailResponse.json();
      console.log('Email service response:', emailData);
      
      if (!emailResponse.ok) {
        console.error('Email send failed:', emailData);
        toast.error(emailData.error || 'Failed to send verification email');
        if (emailData.details) {
          console.error('Details:', emailData.details);
        }
        return;
      }

      toast.success('Verification email sent! Check your inbox.');
      setSignupStep({
        step: 'verify',
        email: formData.email,
        userType,
      });

      // Start resend timer
      setResendTimer(60);
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify email
  const handleVerifyEmail = async () => {
    if (!formData.verificationCode) {
      toast.error('Please enter verification code');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signupStep.email,
          token: formData.verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Verification failed');
        return;
      }

      toast.success('Email verified!');
      setSignupStep({ step: 'profile', email: signupStep.email, userType: signupStep.userType });
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete profile
  const handleCompleteProfile = async () => {
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      toast.error('Please fill in all profile fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signupStep.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          userType: signupStep.userType,
        }),
      });

      if (!response.ok) {
        toast.error('Failed to save profile');
        return;
      }

      toast.success('Profile created successfully!');
      setSignupStep({ step: 'success', email: signupStep.email, userType: signupStep.userType });

      // Redirect after 2 seconds
      setTimeout(() => {
        if (signupStep.userType === 'professional') {
          window.location.href = '/professional-dashboard';
        } else {
          window.location.href = '/client-dashboard';
        }
      }, 2000);
    } catch (error) {
      console.error('Profile error:', error);
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Email and Password
  if (signupStep.step === 'email') {
    return (
      <Card className="w-full max-w-md mx-auto p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-gray-600 mt-2">Join PamperPro today</p>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              type="password"
              placeholder="Password (min 8 characters)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <Input
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => handleEmailSignup('professional')}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {loading ? 'Creating account...' : 'Sign up as Professional'}
            </Button>

            <Button
              onClick={() => handleEmailSignup('client')}
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              {loading ? 'Creating account...' : 'Sign up as Client'}
            </Button>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </Card>
    );
  }

  // Step 2: Email Verification
  if (signupStep.step === 'verify') {
    return (
      <Card className="w-full max-w-md mx-auto p-8">
        <div className="space-y-6">
          <div className="text-center">
            <Mail className="w-12 h-12 mx-auto text-purple-600 mb-4" />
            <h2 className="text-2xl font-bold">Verify Email</h2>
            <p className="text-gray-600 mt-2">
              We sent a verification link to <br />
              <span className="font-semibold">{signupStep.email}</span>
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                Check your email inbox and click the verification link to confirm your account.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Or enter code here:</label>
              <Input
                placeholder="Verification code"
                value={formData.verificationCode}
                onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
              />
            </div>

            <Button
              onClick={handleVerifyEmail}
              disabled={loading || !formData.verificationCode}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {resendTimer > 0 ? (
                <>
                  Resend in <span className="font-semibold">{resendTimer}s</span>
                </>
              ) : (
                <>
                  Didn't receive email?{' '}
                  <button className="text-purple-600 hover:underline font-semibold">
                    Resend
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Step 3: Complete Profile
  if (signupStep.step === 'profile') {
    return (
      <Card className="w-full max-w-md mx-auto p-8">
        <div className="space-y-6">
          <div className="text-center">
            <Check className="w-12 h-12 mx-auto text-green-600 mb-4" />
            <h2 className="text-2xl font-bold">Complete Profile</h2>
            <p className="text-gray-600 mt-2">Just a few more details</p>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />

            <Input
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />

            <Input
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <Button
            onClick={handleCompleteProfile}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {loading ? 'Creating profile...' : 'Complete Signup'}
          </Button>
        </div>
      </Card>
    );
  }

  // Step 4: Success
  if (signupStep.step === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Welcome to PamperPro!</h2>
            <p className="text-gray-600 mt-2">
              Your account is ready. Redirecting to your dashboard...
            </p>
          </div>

          <div className="animate-pulse text-purple-600">
            Setting up your account
          </div>
        </div>
      </Card>
    );
  }

  return null;
}
