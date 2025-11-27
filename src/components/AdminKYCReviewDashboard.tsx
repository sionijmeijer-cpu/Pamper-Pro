import { useState } from "react";
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { KYC } from "../entities/KYC";
import { User } from "../entities/User";
import { ProfessionalOnboarding } from "../entities/ProfessionalOnboarding";

interface AdminKYCReviewDashboardProps {
  kycRecords: (KYC & { user?: User; onboarding?: ProfessionalOnboarding })[];
  onApprove: (kycId: number, notes: string) => Promise<void>;
  onReject: (kycId: number, notes: string) => Promise<void>;
  isLoading?: boolean;
}

export function AdminKYCReviewDashboard({
  kycRecords = [],
  onApprove = async () => {},
  onReject = async () => {},
  isLoading = false
}: AdminKYCReviewDashboardProps) {
  const [selectedKYC, setSelectedKYC] = useState<KYC | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");

  const pending = kycRecords.filter(k => k.status === "pending" || k.status === "submitted");
  const approved = kycRecords.filter(k => k.status === "approved");
  const rejected = kycRecords.filter(k => k.status === "rejected");

  const handleApprove = async () => {
    if (selectedKYC) {
      await onApprove(selectedKYC.id, reviewNotes);
      setSelectedKYC(null);
      setReviewNotes("");
    }
  };

  const handleReject = async () => {
    if (selectedKYC) {
      await onReject(selectedKYC.id, reviewNotes);
      setSelectedKYC(null);
      setReviewNotes("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
      case "submitted":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
      case "submitted":
        return <Clock className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const KYCRecordCard = ({ kyc }: { kyc: KYC }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedKYC(kyc)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon(kyc.status)}
              <h3 className="font-semibold text-gray-900">KYC #ID{kyc.id}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">Submission: {new Date(kyc.created_at).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">ID Type: {kyc.idType}</p>
          </div>
          <Badge className={getStatusColor(kyc.status)}>
            {kyc.status.charAt(0).toUpperCase() + kyc.status.slice(1)}
          </Badge>
        </div>
        <Button size="sm" variant="outline" className="w-full">
          <Eye className="h-4 w-4 mr-2" />
          Review
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">KYC Review Dashboard</h1>
          <p className="text-gray-600">Review and verify professional KYC submissions</p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="relative">
              Pending ({pending.length})
              {pending.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pending.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            {pending.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-gray-600">No pending KYC reviews</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pending.map(kyc => (
                  <KYCRecordCard key={kyc.id} kyc={kyc} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-6">
            {approved.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-gray-600">No approved KYC records</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approved.map(kyc => (
                  <KYCRecordCard key={kyc.id} kyc={kyc} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-6">
            {rejected.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-gray-600">No rejected KYC records</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejected.map(kyc => (
                  <KYCRecordCard key={kyc.id} kyc={kyc} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* KYC Review Dialog */}
      <Dialog open={!!selectedKYC} onOpenChange={(open) => !open && setSelectedKYC(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>KYC Review - ID {selectedKYC?.id}</DialogTitle>
          </DialogHeader>

          {selectedKYC && (
            <div className="space-y-6 mt-4">
              {/* KYC Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    {getStatusIcon(selectedKYC.status)}
                    Submission Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Status:</span> {selectedKYC.status.charAt(0).toUpperCase() + selectedKYC.status.slice(1)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Submitted:</span> {new Date(selectedKYC.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Last Updated:</span> {new Date(selectedKYC.updated_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              {/* ID Verification Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">ID Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">ID Type: {selectedKYC.idType}</p>
                    <p className="text-sm text-gray-600 mb-3">ID Number: {selectedKYC.idNumber}</p>
                    {selectedKYC.idPhotoUrl && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">ID Photo:</p>
                        <img src={selectedKYC.idPhotoUrl} alt="ID Document" className="max-w-sm h-auto border rounded-lg" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Facial Verification */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Facial Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedKYC.facialPhotoUrl ? (
                    <div>
                      <p className="text-sm text-gray-600 mb-3">Facial Photo:</p>
                      <img src={selectedKYC.facialPhotoUrl} alt="Facial Verification" className="max-w-sm h-auto border rounded-lg" />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No facial photo submitted</p>
                  )}
                </CardContent>
              </Card>

              {/* Business Documentation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Business Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    <span className="font-medium">Registration Number:</span> {selectedKYC.businessRegistrationNumber || "N/A"}
                  </p>
                  {selectedKYC.businessProofUrl && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Business Proof:</p>
                      <a href={selectedKYC.businessProofUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                        View Document
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Review Actions */}
              {selectedKYC.status !== "approved" && selectedKYC.status !== "rejected" && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-base">Review Decision</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Review Notes (Optional)</label>
                      <Textarea
                        placeholder="Add notes about your decision..."
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        className="min-h-24"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleApprove}
                        disabled={isLoading}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve KYC
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={handleReject}
                        disabled={isLoading}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject KYC
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {(selectedKYC.status === "approved" || selectedKYC.status === "rejected") && (
                <Card className="border-gray-200">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600">
                      This KYC has already been {selectedKYC.status === "approved" ? "approved" : "rejected"} and cannot be changed.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
