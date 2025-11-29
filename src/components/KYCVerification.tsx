import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Upload, Camera, CheckCircle, AlertCircle } from 'lucide-react';

interface KYCVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void> | void;
}

export function KYCVerification({ isOpen, onClose, onSubmit }: KYCVerificationProps) {
  const [step, setStep] = useState<'document' | 'facial' | 'confirmation'>('document');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [idImageFile, setIdImageFile] = useState<File | null>(null);
  const [idImagePreview, setIdImagePreview] = useState('');
  const [facialImageFile, setFacialImageFile] = useState<File | null>(null);
  const [facialImagePreview, setFacialImagePreview] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleIdImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFacialImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFacialImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFacialImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentNext = () => {
    if (!idType || !idNumber || !fullName || !dateOfBirth || !idImageFile) {
      setError('Please fill all required fields and upload ID image');
      return;
    }
    setError('');
    setStep('facial');
  };

  const handleFacialNext = () => {
    if (!facialImageFile) {
      setError('Please upload a facial verification image');
      return;
    }
    setError('');
    setStep('confirmation');
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onSubmit();
      setLoading(false);
      onClose();
    } catch (err) {
      setError('Failed to submit KYC verification. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>KYC Verification Process</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[
            { num: 1, label: 'Document', key: 'document' },
            { num: 2, label: 'Facial', key: 'facial' },
            { num: 3, label: 'Confirm', key: 'confirmation' },
          ].map((s) => (
            <div key={s.key} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                  (step === 'document' && s.key === 'document') ||
                  (step === 'facial' && (s.key === 'document' || s.key === 'facial')) ||
                  (step === 'confirmation' && true)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s.num}
              </div>
              <p className="text-xs text-center text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>

        {error && (
          <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Step 1: Document Verification */}
        {step === 'document' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Document Verification</h3>
            <p className="text-sm text-gray-600">Upload a clear photo of your government-issued ID</p>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">ID Type *</label>
              <select
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                <option value="">Select ID Type</option>
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver's License</option>
                <option value="national_id">National ID Card</option>
                <option value="state_id">State ID</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">ID Number *</label>
              <Input
                placeholder="Enter ID number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Full Name *</label>
              <Input
                placeholder="As shown on ID"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Date of Birth *</label>
              <Input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-4">Upload ID Photo *</label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition">
                {idImagePreview ? (
                  <div className="flex flex-col items-center">
                    <img src={idImagePreview} alt="ID Preview" className="w-32 h-24 object-cover rounded mb-2" />
                    <p className="text-sm text-emerald-600 font-medium">Image selected</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Click to upload</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIdImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <Button onClick={handleDocumentNext} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Next: Facial Verification
            </Button>
          </div>
        )}

        {/* Step 2: Facial Verification */}
        {step === 'facial' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Facial Verification</h3>
            <p className="text-sm text-gray-600">Upload a clear selfie of your face for verification</p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-medium text-emerald-900 mb-2">Requirements:</h4>
              <ul className="text-sm text-emerald-800 space-y-1 list-disc list-inside">
                <li>Good lighting</li>
                <li>Face clearly visible</li>
                <li>No sunglasses or hats</li>
                <li>Recent photo</li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-4">Upload Selfie *</label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition">
                {facialImagePreview ? (
                  <div className="flex flex-col items-center">
                    <img src={facialImagePreview} alt="Facial Preview" className="w-32 h-32 object-cover rounded-full mb-2" />
                    <p className="text-sm text-emerald-600 font-medium">Selfie uploaded</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Camera className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Click to upload</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFacialImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Additional Information</label>
              <Textarea
                placeholder="Any additional details (optional)"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('document')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleFacialNext}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Review & Confirm
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirmation' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Confirm Submission</h3>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-emerald-900">Ready to submit</h4>
                  <p className="text-sm text-emerald-800 mt-1">Your KYC verification will be reviewed by our admin team within 24-48 hours.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
              <div>
                <p className="text-gray-600">ID Type</p>
                <p className="font-medium text-gray-900 capitalize">{idType?.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-gray-600">Full Name</p>
                <p className="font-medium text-gray-900">{fullName}</p>
              </div>
              <div>
                <p className="text-gray-600">Documents Uploaded</p>
                <p className="font-medium text-gray-900">✓ ID Photo & Selfie</p>
              </div>
            </div>

            <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-emerald-600 rounded mt-1"
              />
              <span className="text-sm text-gray-900">
                I confirm that all information provided is accurate and I understand my account will be reviewed by our admin team. I agree to the terms and conditions.
              </span>
            </label>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('facial')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {loading ? 'Submitting...' : 'Submit KYC Verification'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
