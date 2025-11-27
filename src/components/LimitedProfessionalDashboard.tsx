import { AlertCircle, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { User } from "../entities/User";
import { ProfessionalOnboarding } from "../entities/ProfessionalOnboarding";
import { KYC } from "../entities/KYC";

interface LimitedProfessionalDashboardProps {
  user: User;
  onboarding: ProfessionalOnboarding;
  kyc: KYC | null;
  onStartKYC: () => void;
  onCompleteProfile: () => void;
  onLogout: () => void;
}

export function LimitedProfessionalDashboard({
  user,
  onboarding,
  kyc,
  onStartKYC,
  onCompleteProfile,
  onLogout
}: LimitedProfessionalDashboardProps) {
  const kycStatus = kyc?.status || "pending";
  const kycSubmitted = kyc && kyc.status !== "pending";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.firstName}!</h1>
              <p className="text-gray-600 mt-1">You're on the path to launching your business</p>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Onboarding Complete Status */}
        <Card className="mb-8 border-[#3d6a68]/20 bg-gradient-to-r from-[#3d6a68]/5 to-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-[#3d6a68]" />
                <div>
                  <CardTitle>Onboarding Completed!</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Business: {onboarding.businessName}
                  </p>
                </div>
              </div>
              <Badge className="bg-[#3d6a68] text-white">Step 1 Complete</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* KYC Status Card */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* KYC Verification */}
          <Card className={kycSubmitted ? "border-blue-200" : "border-amber-200 bg-amber-50"}>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                {!kycSubmitted ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                ) : (
                  <Clock className="w-5 h-5 text-blue-600" />
                )}
                <CardTitle className="text-lg">
                  {!kycSubmitted ? "KYC Verification Required" : "KYC Under Review"}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!kycSubmitted ? (
                <>
                  <p className="text-sm text-gray-700">
                    To unlock full profile access and start accepting bookings/orders, you need to complete Know Your Customer (KYC) verification.
                  </p>

                  <div className="bg-white p-4 rounded-lg space-y-2 border border-amber-200">
                    <p className="font-semibold text-sm">KYC includes:</p>
                    <ul className="text-sm space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <span className="text-amber-600">✓</span>
                        Government-issued ID verification
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-600">✓</span>
                        Facial verification (selfie)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-600">✓</span>
                        Business registration proof
                      </li>
                    </ul>
                  </div>

                  <Button
                    onClick={onStartKYC}
                    className="w-full bg-[#3d6a68] hover:bg-[#2d5a58] text-white"
                  >
                    Start KYC Verification
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">
                      Thank you for submitting your KYC documentation!
                    </p>

                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-2">Status:</p>
                      <Badge
                        className={
                          kycStatus === "approved"
                            ? "bg-green-600"
                            : kycStatus === "rejected"
                              ? "bg-red-600"
                              : "bg-blue-600"
                        }
                      >
                        {kycStatus === "submitted"
                          ? "Pending Review"
                          : kycStatus === "under_review"
                            ? "Under Review"
                            : kycStatus === "approved"
                              ? "Approved ✓"
                              : "Rejected"}
                      </Badge>

                      {kycStatus === "rejected" && kyc?.reviewNotes && (
                        <p className="text-xs text-red-900 mt-2">{kyc.reviewNotes}</p>
                      )}
                    </div>

                    <p className="text-xs text-gray-600">
                      Our team reviews submissions within 24-48 hours. You'll receive an email confirmation once approved.
                    </p>
                  </div>

                  {kycStatus === "rejected" && (
                    <Button
                      onClick={onStartKYC}
                      variant="outline"
                      className="w-full"
                    >
                      Resubmit KYC
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Profile Completion Preview */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Profile Completion Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Business Information</p>
                  <div className="bg-gray-50 p-3 rounded text-xs text-gray-600 space-y-1">
                    <p><span className="font-medium">Type:</span> {onboarding.businessType === "service" ? "Service Provider" : "Product Vendor"}</p>
                    <p><span className="font-medium">Name:</span> {onboarding.businessName}</p>
                    <p><span className="font-medium">Location:</span> {onboarding.businessLocation}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Services/Products</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex flex-wrap gap-2">
                      {(onboarding.servicesOffered ? JSON.parse(onboarding.servicesOffered) : []).map((service: string) => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Experience</p>
                  <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                    {onboarding.yearsInBusiness} years in {onboarding.businessType === "service" ? "service" : "business"}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 pt-4 border-t border-gray-200">
                After KYC approval, you'll unlock the ability to add portfolio images, set pricing, and manage your full professional profile.
              </p>

              <Button
                onClick={onCompleteProfile}
                disabled={!kycSubmitted || (kycStatus !== "approved")}
                className="w-full mt-4"
                variant={kycStatus === "approved" ? "default" : "outline"}
              >
                {kycStatus !== "approved" ? "Complete KYC to Continue" : "Complete Full Profile"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Helpful Info Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              What Happens Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold text-sm text-gray-900 mb-2">1. KYC Review</p>
                <p className="text-sm text-gray-700">
                  Our team verifies your identity and business information. Usually completed within 24-48 hours.
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900 mb-2">2. Full Profile Setup</p>
                <p className="text-sm text-gray-700">
                  Once approved, you'll set pricing, availability, portfolio, and payment methods.
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900 mb-2">3. Go Live</p>
                <p className="text-sm text-gray-700">
                  Your profile goes live and you can start accepting bookings or managing product orders.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Info */}
        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at <a href="mailto:support@pamperpro.eu" className="text-[#3d6a68] font-semibold">support@pamperpro.eu</a>
          </p>
        </div>
      </div>
    </div>
  );
}
