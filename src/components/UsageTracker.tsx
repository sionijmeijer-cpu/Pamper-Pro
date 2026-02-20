import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { useAuth } from '../hooks/useAuth';

interface UsageTrackerProps {
  resourceType: 'bookings' | 'products' | 'orders';
  currentUsage: number;
}

const UsageTracker: React.FC<UsageTrackerProps> = ({ resourceType, currentUsage }) => {
  const { user } = useAuth();
  const [limits, setLimits] = useState({ current: 0, max: 0, percentage: 0 });

  useEffect(() => {
    const tier = ((user as any)?.subscription_tier as 'free' | 'pro' | 'premium') || 'free';

    const tierLimits = {
      bookings: {
        free: 1,
        pro: 5,
        premium: Infinity,
      },
      products: {
        free: 5,
        pro: 50,
        premium: Infinity,
      },
      orders: {
        free: 10,
        pro: 50,
        premium: Infinity,
      },
    };

    const max = tierLimits[resourceType][tier];
    const percentage = max === Infinity ? 100 : (currentUsage / max) * 100;

    setLimits({
      current: currentUsage,
      max: max === Infinity ? -1 : max,
      percentage: Math.min(percentage, 100),
    });
  }, [(user as any)?.subscription_tier, currentUsage, resourceType]);

  const isUnlimited = limits.max === -1;
  const isNearLimit = limits.percentage >= 80 && !isUnlimited;

  const getResourceLabel = () => {
    switch (resourceType) {
      case 'bookings':
        return 'Bookings This Month';
      case 'products':
        return 'Products Listed';
      case 'orders':
        return 'Orders Processed';
      default:
        return 'Usage';
    }
  };

  const getWarningColor = () => {
    if (isUnlimited) return 'text-gray-600';
    if (limits.percentage >= 90) return 'text-red-600';
    if (limits.percentage >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{getResourceLabel()}</CardTitle>
        <CardDescription>
          Tier: <strong>{((user as any)?.subscription_tier)?.toUpperCase() || 'FREE'}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isUnlimited ? (
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">Unlimited</p>
            <p className="text-sm text-gray-600">Enjoy unlimited {resourceType}!</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-semibold">
                  {limits.current} / {limits.max}
                </span>
                <span className={`text-sm font-semibold ${getWarningColor()}`}>
                  {limits.percentage.toFixed(0)}%
                </span>
              </div>
              <Progress 
                value={limits.percentage} 
                className={isNearLimit ? 'bg-yellow-100' : 'bg-gray-200'}
              />
            </div>

            {isNearLimit && (
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  You're approaching your {resourceType} limit. 
                  <strong> Upgrade your plan</strong> for more capacity.
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UsageTracker;
