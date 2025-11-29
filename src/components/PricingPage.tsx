import { Card } from './ui/card';

interface PricingPageProps {
  onNavigate?: (page: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Pricing</h1>
      <Card className="p-8">
        <div className="text-gray-600">Pricing details coming soon.</div>
      </Card>
    </div>
  );
}
