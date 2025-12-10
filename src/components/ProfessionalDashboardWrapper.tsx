import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ProfessionalOnboardingFlow } from './ProfessionalOnboardingFlow';
import { ProfessionalDashboard } from './ProfessionalDashboard';

export function ProfessionalDashboardWrapper() {
  const { currentUser } = useAuth();
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      const savedOnboarding = localStorage.getItem(`pro-onboarding-${currentUser.id}`);
      setOnboardingComplete(savedOnboarding === 'true');
    }
  }, [currentUser?.id]);

  const handleOnboardingComplete = () => {
    if (currentUser?.id) {
      localStorage.setItem(`pro-onboarding-${currentUser.id}`, 'true');
      setOnboardingComplete(true);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!onboardingComplete) {
    return <ProfessionalOnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return <ProfessionalDashboard />;
}
