import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function VerifyEmailNotice() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signup');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg">
        <div className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-purple-100 rounded-full p-4">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Check Your Email
          </h1>

          <p className="text-gray-600 mb-4">
            We've sent a verification link to:
          </p>

          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="font-semibold text-gray-900 break-all">{user.email}</p>
          </div>

          <div className="space-y-4 mb-6 text-left bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Next steps:</strong>
            </p>
            <ol className="text-sm text-blue-900 list-decimal list-inside space-y-1">
              <li>Open the verification email</li>
              <li>Click the verification link</li>
              <li>Access your client dashboard</li>
            </ol>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            The link expires in 24 hours. If you don't see the email, check your spam folder.
          </p>

          <Button
            onClick={() => navigate('/')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
          >
            Back to Home
          </Button>

          <button
            onClick={() => navigate('/login')}
            className="w-full mt-3 flex items-center justify-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Sign In
          </button>
        </div>
      </Card>
    </div>
  );
}
