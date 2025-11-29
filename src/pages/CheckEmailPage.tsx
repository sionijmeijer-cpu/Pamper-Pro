import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

interface CheckEmailPageProps {
  email?: string;
  onNavigate?: (path: string) => void;
}

export function CheckEmailPage({ email = '', onNavigate }: CheckEmailPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 px-6 py-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-30 animate-pulse"></div>
                <Mail className="w-16 h-16 text-white relative" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Check Your Email</h1>
          </div>

          {/* Content */}
          <div className="p-8 text-center space-y-6">
            <div className="space-y-3">
              <p className="text-lg text-gray-900 font-semibold">
                We've sent a verification link to:
              </p>
              <p className="text-teal-600 font-mono bg-teal-50 p-3 rounded-lg break-all">
                {email || 'your email address'}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <p className="text-sm text-blue-900 font-semibold">What's next?</p>
              <ol className="text-sm text-blue-800 space-y-2 text-left">
                <li className="flex gap-2">
                  <span className="font-bold flex-shrink-0">1.</span>
                  <span>Check your inbox for an email from Pamper Pro</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold flex-shrink-0">2.</span>
                  <span>Click the verification link in the email</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold flex-shrink-0">3.</span>
                  <span>You'll be able to log in once verified</span>
                </li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-900">
                <span className="font-semibold">💡 Tip:</span> Check your spam folder if you don't see the email within a few minutes.
              </p>
            </div>

            <Button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/login');
                } else {
                  window.location.href = '/login';
                }
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Login
            </Button>

            <p className="text-sm text-gray-600">
              After verifying your email, you can log in and access your Pamper Pro dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
