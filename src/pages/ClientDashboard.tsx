import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { LogOut, User, Mail, Calendar } from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('pamper_pro_token');
    const userStr = localStorage.getItem('pamper_pro_user');

    if (!token || !userStr) {
      navigate('/login');
      return;
    }

    // Check if profile needs completion
    const user = JSON.parse(userStr);
    if (!user.firstName || !user.lastName) {
      navigate('/complete-profile');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('pamper_pro_token');
    localStorage.removeItem('pamper_pro_user');
    navigate('/login');
  };

  const userStr = localStorage.getItem('pamper_pro_user');
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
      {/* Header with User Name */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-gray-500">Welcome back!</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
                <p className="text-gray-600">Manage your account details</p>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </span>
                <span className="text-gray-900 font-medium">{user.email}</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Email Verified</span>
                <span className={user.email_verified ? 'text-green-600 font-semibold flex items-center gap-1' : 'text-orange-600 font-semibold flex items-center gap-1'}>
                  {user.email_verified ? '✓ Yes' : '✗ Pending'}
                </span>
              </div>

              {user.phone && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Phone</span>
                  <span className="text-gray-900 font-medium">{user.phone}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Member Since
                </span>
                <span className="text-gray-900 font-medium">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
                </span>
              </div>
            </div>

            <Button 
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => navigate('/profile')}
            >
              Edit Profile
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="space-y-3">
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => navigate('/professionals')}
              >
                Find a Professional
              </Button>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate('/shop-products')}
              >
                Shop Products
              </Button>
              
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigate('/pricing')}
              >
                View Pricing Plans
              </Button>
              
              <Button 
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                onClick={() => navigate('/support')}
              >
                Get Support
              </Button>
            </div>

            <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-200">
              <p className="text-sm text-teal-900">
                {!user.email_verified && (
                  <>
                    <strong>📧 Verify your email:</strong> Complete verification to unlock all features.
                  </>
                )}
                {user.email_verified && (
                  <>
                    <strong>✨ All set!</strong> Your account is fully verified and ready to use.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
