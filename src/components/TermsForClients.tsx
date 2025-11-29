import { Card } from './ui/card';

interface TermsForClientsProps {
  onNavigate?: (page: string) => void;
}

export function TermsForClients({ onNavigate }: TermsForClientsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms for Clients</h1>
      <Card className="p-8">
        <div className="prose text-gray-600">
          <p>Terms and conditions for clients using Pamper Pro services coming soon.</p>
        </div>
      </Card>
    </div>
  );
}
