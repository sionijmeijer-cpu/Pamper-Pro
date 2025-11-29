import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';

interface KYCSubmission {
  id: string;
  professionalName: string;
  businessName: string;
  email: string;
  businessType: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewNotes?: string;
  kycData: {
    idType: string;
    fullName: string;
    dateOfBirth: string;
  };
}

export function AdminKYCReviewDashboard() {
  const [submissions, setSubmissions] = useState<KYCSubmission[]>([
    {
      id: '1',
      professionalName: 'John Doe',
      businessName: 'Elite Hair Studio',
      email: 'john@elitehair.com',
      businessType: 'service_provider',
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      kycData: {
        idType: 'drivers_license',
        fullName: 'John Michael Doe',
        dateOfBirth: '1990-05-15',
      },
    },
    {
      id: '2',
      professionalName: 'Sarah Smith',
      businessName: 'Glow Beauty Pro',
      email: 'sarah@glowbeauty.com',
      businessType: 'service_provider',
      submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      kycData: {
        idType: 'passport',
        fullName: 'Sarah Jane Smith',
        dateOfBirth: '1992-08-20',
      },
    },
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<KYCSubmission | null>(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | null>(null);

  const handleReviewClick = (submission: KYCSubmission) => {
    setSelectedSubmission(submission);
    setReviewNotes(submission.reviewNotes || '');
    setReviewAction(null);
    setShowReviewDialog(true);
  };

  const handleApprove = () => {
    if (!selectedSubmission) return;

    setSubmissions(submissions.map(s =>
      s.id === selectedSubmission.id
        ? { ...s, status: 'approved', reviewNotes }
        : s
    ));

    setShowReviewDialog(false);
    setSelectedSubmission(null);
    setReviewNotes('');
    setReviewAction(null);
  };

  const handleReject = () => {
    if (!selectedSubmission || !reviewNotes.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    setSubmissions(submissions.map(s =>
      s.id === selectedSubmission.id
        ? { ...s, status: 'rejected', reviewNotes }
        : s
    ));

    setShowReviewDialog(false);
    setSelectedSubmission(null);
    setReviewNotes('');
    setReviewAction(null);
  };

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const approvedCount = submissions.filter(s => s.status === 'approved').length;
  const rejectedCount = submissions.filter(s => s.status === 'rejected').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5" />;
      case 'rejected':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">KYC Review Dashboard</h1>
          <p className="text-lg text-gray-600">Review and verify professional applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Reviews</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-600">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{approvedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{rejectedCount}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Submissions</h2>
          </div>

          {submissions.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">No submissions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Professional</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Business</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submitted</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{submission.professionalName}</p>
                          <p className="text-sm text-gray-600">{submission.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{submission.businessName}</p>
                          <p className="text-sm text-gray-600 capitalize">{submission.businessType?.replace('_', ' ')}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">
                          {new Date(submission.submittedAt).toLocaleDateString()} {new Date(submission.submittedAt).toLocaleTimeString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(submission.status)}`}>
                          {getStatusIcon(submission.status)}
                          <span className="text-sm font-medium capitalize">{submission.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          onClick={() => handleReviewClick(submission)}
                          disabled={submission.status !== 'pending'}
                          className="flex items-center gap-2 ml-auto"
                          variant={submission.status === 'pending' ? 'default' : 'outline'}
                        >
                          <Eye className="w-4 h-4" />
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Review Dialog */}
      {showReviewDialog && selectedSubmission && (
        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Review KYC Submission</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Submission Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Professional Name</p>
                  <p className="font-semibold text-gray-900">{selectedSubmission.professionalName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Business Name</p>
                  <p className="font-semibold text-gray-900">{selectedSubmission.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ID Information</p>
                  <p className="font-semibold text-gray-900">{selectedSubmission.kycData.fullName}</p>
                  <p className="text-sm text-gray-600">
                    {selectedSubmission.kycData.idType?.replace('_', ' ') } • DOB: {selectedSubmission.kycData.dateOfBirth}
                  </p>
                </div>
              </div>

              {/* Review Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Review Notes</label>
                <Textarea
                  placeholder="Add any notes or reasons for approval/rejection"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowReviewDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReject}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Reject
                </Button>
                <Button
                  onClick={handleApprove}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Approve
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
