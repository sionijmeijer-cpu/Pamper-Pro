import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Lock, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface PlanFeatureGateProps {
  requiredTier: 'free' | 'pro' | 'premium';
  children: React.ReactNode;
  featureName: string;
  message?: string;
}

const PlanFeatureGate: React.FC<PlanFeatureGateProps> = ({
  requiredTier,
  children,
  featureName,
  message,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Tier hierarchy: free < pro < premium
  const tierHierarchy = { free: 0, pro: 1, premium: 2 };
  const userTier = ((user as any)?.subscription_tier as 'free' | 'pro' | 'premium') || 'free';
  const userTierLevel = tierHierarchy[userTier];
  const requiredTierLevel = tierHierarchy[requiredTier];

  // Check if user has access to this feature
  const hasAccess = userTierLevel >= requiredTierLevel;

  if (hasAccess) {
    return <>{children}</>;
  }

  // Feature locked - show upgrade prompt
  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Lock className="w-12 h-12 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{featureName} Locked</h3>
            <p className="text-sm text-gray-600 mt-1">
              {message || `Upgrade to ${requiredTier.toUpperCase()} plan to access this feature.`}
            </p>
          </div>
          <Button
            onClick={() => navigate('/pricing')}
            className="bg-yellow-600 hover:bg-yellow-700 w-full"
          >
            View Plans <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          <p className="text-xs text-gray-500">
            Current plan: <strong>{userTier.toUpperCase()}</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanFeatureGate;
