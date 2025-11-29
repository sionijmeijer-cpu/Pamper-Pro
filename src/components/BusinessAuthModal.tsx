import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProfessionalOnboardingWizardV2 } from './ProfessionalOnboardingWizardV2';

interface BusinessAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (user: any) => void;
}

export function BusinessAuthModal({ isOpen, onClose, onAuthenticated }: BusinessAuthModalProps) {
  const [step, setStep] = useState<'role' | 'auth' | 'onboarding'>('role');
  const [selectedRole, setSelectedRole] = useState<'service_provider' | 'vendor' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleRoleSelect = (role: 'service_provider' | 'vendor') => {
    setSelectedRole(role);
    setStep('auth');
  };

  const handleSignup = () => {
    if (!email || !firstName || !lastName || !businessName) {
      alert('Please fill all required fields');
      return;
    }
    // User has successfully signed up, now show onboarding wizard
    setShowOnboarding(true);
  };

  const handleBackToRole = () => {
    setStep('role');
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setBusinessName('');
  };

  const handleOnboardingComplete = (onboardingData: any) => {
    const isAdmin = email === 'admin@pamperpro.eu';
    const user = {
      id: Math.random().toString(),
      email,
      firstName,
      lastName,
      businessName,
      businessType: selectedRole,
      role: isAdmin ? 'admin' : 'professional',
      onboarding: onboardingData,
      onboardingComplete: true,
      kycPending: true, // User needs to complete KYC next
    };
    const roleKey = isAdmin ? 'admin' : 'professional';
    localStorage.setItem(`${roleKey}_current_user`, JSON.stringify(user));
    
    // Reset form and close modal
    setStep('role');
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setBusinessName('');
    setShowOnboarding(false);
    
    onAuthenticated(user);
  };

  return (
    <>
      <Dialog open={isOpen && !showOnboarding} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          {step === 'role' ? (
            <>
              <DialogHeader>
                <DialogTitle>Launch Your Business</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Button
                  onClick={() => handleRoleSelect('service_provider')}
                  className="w-full h-auto py-6 bg-emerald-600 hover:bg-emerald-700 flex flex-col items-start p-4"
                >
                  <div className="font-bold text-lg mb-1">Service Provider</div>
                  <div className="text-sm opacity-90">Offer beauty, wellness, or hair services</div>
                </Button>
                <Button
                  onClick={() => handleRoleSelect('vendor')}
                  className="w-full h-auto py-6 bg-amber-600 hover:bg-amber-700 flex flex-col items-start p-4"
                >
                  <div className="font-bold text-lg mb-1">Vendor</div>
                  <div className="text-sm opacity-90">Sell beauty and wellness products</div>
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Create Your {selectedRole === 'service_provider' ? 'Professional' : 'Vendor'} Account</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signup" className="space-y-4">
                  <Input
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Input
                    placeholder="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                  <Input
                    placeholder="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={handleSignup} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Continue to Onboarding
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleBackToRole}
                    className="w-full"
                  >
                    Back
                  </Button>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Professional Onboarding Wizard */}
      {showOnboarding && selectedRole && (
        <ProfessionalOnboardingWizardV2
          isOpen={showOnboarding}
          businessType={selectedRole}
          userEmail={email}
          firstName={firstName}
          lastName={lastName}
          businessName={businessName}
          onComplete={handleOnboardingComplete}
          onClose={() => {
            setShowOnboarding(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
