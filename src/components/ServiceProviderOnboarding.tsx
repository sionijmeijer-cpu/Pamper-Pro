import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

interface ServiceProviderOnboardingProps {
  isOpen: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export function ServiceProviderOnboarding({
  isOpen,
  onComplete,
  onClose,
}: ServiceProviderOnboardingProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Service Provider Onboarding</DialogTitle>
        </DialogHeader>
        <div className="py-6 text-center">
          <p className="text-gray-600 mb-4">Complete your service provider setup</p>
          <Button onClick={onComplete} className="bg-emerald-600 hover:bg-emerald-700">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
