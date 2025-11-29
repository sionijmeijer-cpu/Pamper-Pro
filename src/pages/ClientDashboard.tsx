import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { LogOut, User } from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('client_auth_token');
    localStorage.removeItem('client_user');
    navigate('/login');
  };

  const user = localStorage.getItem('client_user');
  const userData = user ? JSON.parse(user) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {userData ? (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Email Verified:</span>
                <span className={userData.emailVerified ? 'text-green-600 font-semibold' : 'text-orange-600 font-semibold'}>
                  {userData.emailVerified ? '✓ Yes' : '✗ Not Yet'}
                </span>
              </div>
              {userData.phone && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="text-gray-900">{userData.phone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since:</span>
                <span className="text-gray-900">
                  {new Date(userData.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 mb-4">No user data found</p>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Go to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
