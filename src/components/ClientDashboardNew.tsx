import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export function ClientDashboardNew() {
  const { user, updateProfile, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    picture_url: user?.picture_url || '',
  });

  useEffect(() => {
    if (!user || !user.email_verified) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    const success = await updateProfile({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      picture_url: formData.picture_url,
    });

    if (success) {
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setErrorMessage('Failed to update profile. Please try again.');
    }

    setIsSaving(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome, {user.name || user.email}!
            </h1>
            <p className="text-gray-600">Manage your client profile</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white hover:bg-gray-50"
          >
            Sign Out
          </Button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-green-800">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-800">{errorMessage}</p>
          </div>
        )}

        {/* Profile Card */}
        <Card className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className={`${
                isEditing
                  ? 'bg-gray-500 hover:bg-gray-600'
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white`}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={user.email}
                disabled
                className="bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your full name"
                className={isEditing ? '' : 'bg-gray-50 cursor-not-allowed'}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your phone number"
                className={isEditing ? '' : 'bg-gray-50 cursor-not-allowed'}
              />
            </div>

            {/* Picture URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture URL
              </label>
              <Input
                type="url"
                name="picture_url"
                value={formData.picture_url}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://example.com/photo.jpg"
                className={isEditing ? '' : 'bg-gray-50 cursor-not-allowed'}
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your address"
                rows={3}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  isEditing ? '' : 'bg-gray-50 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="mt-6 flex gap-3 justify-end">
              <Button
                onClick={() => {
                  setFormData({
                    name: user.name || '',
                    phone: user.phone || '',
                    address: user.address || '',
                    picture_url: user.picture_url || '',
                  });
                  setIsEditing(false);
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          )}
        </Card>

        {/* Account Status */}
        <Card className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Account Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Email Verified</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">Verified</span>
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Account Type</span>
              <span className="text-purple-600 font-medium capitalize">
                {user.role}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Member Since</span>
              <span className="text-gray-600">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
