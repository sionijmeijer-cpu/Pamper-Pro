import { useState } from 'react';
import { Button } from './ui/button';
import { AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';
import { KYCVerification } from './KYCVerification';

interface LimitedProfessionalDashboardProps {
  user?: any;
  onNavigate?: (page: string) => void;
}

export function LimitedProfessionalDashboard({ user, onNavigate }: LimitedProfessionalDashboardProps) {
  const [showKYCVerification, setShowKYCVerification] = useState(false);

  const currentUser = user || JSON.parse(localStorage.getItem('professional_current_user') || '{}');
  const onboarding = currentUser?.onboarding || {};

  const handleKYCComplete = () => {
    setShowKYCVerification(false);
    // Update user with KYC completed status
    const updatedUser = {
      ...currentUser,
      kycPending: false,
      kycCompleted: true,
      kycSubmittedAt: new Date().toISOString(),
      status: 'awaiting_admin_review',
    };
    localStorage.setItem('professional_current_user', JSON.stringify(updatedUser));
    alert('KYC submission successful! Your information will be reviewed by our admin team.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {currentUser.firstName}!</h1>
          <p className="text-lg text-gray-600">Your professional profile is being set up. Complete the following steps to unlock full access.</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Onboarding Status */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-600">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Onboarding</h3>
                <p className="text-sm text-gray-600 mt-1">Step 1 of 3</p>
              </div>
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-600 mb-4">✓ Completed - Your business details have been saved.</p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 w-full"></div>
            </div>
          </div>

          {/* KYC Verification Status */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">KYC Verification</h3>
                <p className="text-sm text-gray-600 mt-1">Step 2 of 3</p>
              </div>
              <AlertCircle className="w-6 h-6 text-amber-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">Pending - Verify your identity to unlock full profile access.</p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gray-300 w-0"></div>
            </div>
          </div>

          {/* Profile Completion Status */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-slate-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Profile Setup</h3>
                <p className="text-sm text-gray-600 mt-1">Step 3 of 3</p>
              </div>
              <Clock className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm text-gray-600 mb-4">Locked - Available after KYC approval.</p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gray-300 w-0"></div>
            </div>
          </div>
        </div>

        {/* Your Business Information */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Business Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Business Name</p>
              <p className="text-lg font-semibold text-gray-900">{currentUser.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Business Type</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">{currentUser.businessType?.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Phone</p>
              <p className="text-lg font-semibold text-gray-900">{onboarding.businessPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Location</p>
              <p className="text-lg font-semibold text-gray-900">{onboarding.businessCity}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mb-1">Services</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {onboarding.services?.map((service: string) => (
                  <span key={service} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KYC Prompt */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200 p-8 mb-12">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Complete KYC Verification</h3>
              <p className="text-gray-700 mb-4">
                To unlock your full professional profile and start accepting bookings, you need to complete our Know Your Customer (KYC) verification process. This includes:
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                  Photo ID Verification (Driver's License, Passport, or ID Card)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                  Facial Recognition Verification
                </li>
              </ul>
              <p className="text-sm text-gray-600 mb-6">
                Your information is secure and only used for verification purposes. Typical approval takes 24-48 hours.
              </p>
              <Button
                onClick={() => setShowKYCVerification(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3"
              >
                Start KYC Verification
              </Button>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">What Happens Next?</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">1</div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Complete KYC</h4>
                <p className="text-gray-600 mt-1">Upload your ID and complete facial verification.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">2</div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Admin Review</h4>
                <p className="text-gray-600 mt-1">Our team will review your KYC submission (24-48 hours).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">3</div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Go Live</h4>
                <p className="text-gray-600 mt-1">Once approved, complete your profile and start accepting bookings!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Verification Modal */}
      {showKYCVerification && (
        <KYCVerification
          isOpen={showKYCVerification}
          onClose={() => setShowKYCVerification(false)}
          onSubmit={handleKYCComplete}
        />
      )}
    </div>
  );
}
