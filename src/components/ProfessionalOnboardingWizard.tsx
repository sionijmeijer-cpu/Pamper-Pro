import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

interface ProfessionalOnboardingWizardProps {
  isOpen: boolean;
  businessType: string;
  onComplete: () => void;
  onClose: () => void;
}

export function ProfessionalOnboardingWizard({
  isOpen,
  businessType,
  onComplete,
  onClose,
}: ProfessionalOnboardingWizardProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Professional Onboarding</DialogTitle>
        </DialogHeader>
        <div className="py-6 text-center">
          <p className="text-gray-600 mb-4">Onboarding wizard for {businessType} professionals</p>
          <Button onClick={onComplete} className="bg-emerald-600 hover:bg-emerald-700">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
