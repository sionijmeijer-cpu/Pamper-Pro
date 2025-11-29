import { Card } from './ui/card';

interface PrivacyPolicyProps {
  onNavigate?: (page: string) => void;
}

export function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <Card className="p-8">
        <div className="prose text-gray-600">
          <p>Privacy policy details coming soon.</p>
        </div>
      </Card>
    </div>
  );
}
