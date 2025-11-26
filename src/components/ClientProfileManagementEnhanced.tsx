import { useState } from 'react';
import { LogOut, MapPin, Phone, Heart, Clock, Calendar, BarChart3, Edit2, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ClientProfileManagementEnhancedProps {
  clientName?: string;
  onLogout: () => void;
}

interface BookingRecord {
  id: number;
  serviceName: string;
  professional: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: 'completed' | 'cancelled' | 'upcoming';
}

interface FavoriteItem {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
}

const SERVICE_CATEGORIES = [
  { id: 'haircut', label: 'Haircut & Styling', emoji: '✂️' },
  { id: 'braids', label: 'Braids & Extensions', emoji: '💁' },
  { id: 'makeup', label: 'Makeup', emoji: '💄' },
  { id: 'nails', label: 'Nails & Manicure', emoji: '💅' },
  { id: 'eyelashes', label: 'Eyelashes', emoji: '👁️' },
  { id: 'color', label: 'Hair Color', emoji: '🎨' },
  { id: 'weaves', label: 'Weaves', emoji: '💆' },
  { id: 'natural-hair', label: 'Natural Hair Care', emoji: '🌿' },
];

const NOTIFICATION_PREFERENCES = [
  { id: 'booking-reminders', label: 'Booking Reminders', description: 'Get reminded before your appointments' },
  { id: 'promotions', label: 'Promotions & Offers', description: 'Receive special offers and discounts' },
  { id: 'new-professionals', label: 'New Professionals', description: 'Get notified when new pros join your area' },
  { id: 'reviews', label: 'Review Requests', description: 'Get asked to review your services' },
];

const BEAUTY_PREFERENCES = [
  { id: 'skin-tone', label: 'Skin Tone', options: ['Light', 'Medium', 'Deep', 'Prefer not to say'] },
  { id: 'hair-type', label: 'Hair Type', options: ['Straight', 'Wavy', 'Curly', 'Coily/Kinky', 'Mixed'] },
  { id: 'hair-length', label: 'Preferred Hair Length', options: ['Short', 'Medium', 'Long', 'Very Long'] },
  { id: 'budget', label: 'Average Service Budget', options: ['$0-$50', '$50-$100', '$100-$200', '$200+'] },
];

const MOCK_BOOKINGS: BookingRecord[] = [
  {
    id: 1,
    serviceName: 'Silk Press',
    professional: 'Angela Davis',
    date: '2024-01-15',
    time: '2:00 PM',
    duration: '2 hours',
    price: 85,
    status: 'completed',
  },
  {
    id: 2,
    serviceName: 'Braids Installation',
    professional: 'Maya Chen',
    date: '2024-01-22',
    time: '10:00 AM',
    duration: '4 hours',
    price: 150,
    status: 'completed',
  },
  {
    id: 3,
    serviceName: 'Manicure & Pedicure',
    professional: 'Sophia Rodriguez',
    date: '2024-02-05',
    time: '3:30 PM',
    duration: '1.5 hours',
    price: 60,
    status: 'completed',
  },
  {
    id: 4,
    serviceName: 'Hair Color Touch-up',
    professional: 'Jessica Brown',
    date: '2024-02-14',
    time: '1:00 PM',
    duration: '2 hours',
    price: 95,
    status: 'upcoming',
  },
];

const MOCK_FAVORITES: FavoriteItem[] = [
  {
    id: 1,
    name: 'Angela Davis',
    specialty: 'Hair Styling & Treatments',
    rating: 4.9,
    reviews: 142,
    image: '👩‍🦱',
  },
  {
    id: 2,
    name: 'Maya Chen',
    specialty: 'Braiding & Extensions',
    rating: 4.8,
    reviews: 98,
    image: '👩‍🎨',
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    specialty: 'Nails & Beauty',
    rating: 4.7,
    reviews: 156,
    image: '💅',
  },
];

export function ClientProfileManagementEnhanced({ onLogout }: ClientProfileManagementEnhancedProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    address: '1234 Maple Street',
    city: 'Atlanta',
    state: 'GA',
    zip: '30301',
    bio: 'Beauty enthusiast and regular client',
  });

  const [preferences, setPreferences] = useState({
    services: ['haircut', 'makeup', 'nails'],
    notifications: ['booking-reminders', 'promotions'],
    beauty: {
      'skin-tone': 'Deep',
      'hair-type': 'Coily/Kinky',
      'hair-length': 'Long',
      'budget': '$100-$200',
    },
  });

  const [editData, setEditData] = useState(profileData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(profileData);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!editData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!editData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!editData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!editData.address.trim()) newErrors.address = 'Address is required';
    if (!editData.city.trim()) newErrors.city = 'City is required';
    if (!editData.state.trim()) newErrors.state = 'State is required';
    if (!editData.zip.trim()) newErrors.zip = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setProfileData(editData);
      setIsEditing(false);
    }
  };

  const toggleServicePreference = (serviceId: string) => {
    setPreferences((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const toggleNotificationPreference = (notificationId: string) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: prev.notifications.includes(notificationId)
        ? prev.notifications.filter((n) => n !== notificationId)
        : [...prev.notifications, notificationId],
    }));
  };

  const handleBeautyPreferenceChange = (preferenceId: string, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      beauty: {
        ...prev.beauty,
        [preferenceId]: value,
      },
    }));
  };

  const getUpcomingBookingsCount = () => {
    return MOCK_BOOKINGS.filter((b) => b.status === 'upcoming').length;
  };

  const getTotalSpent = () => {
    return MOCK_BOOKINGS.reduce((sum, booking) => sum + booking.price, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account and preferences</p>
          </div>
          <Button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center gap-2 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{getUpcomingBookingsCount()}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900">${getTotalSpent()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Saved Favorites</p>
                <p className="text-3xl font-bold text-gray-900">{MOCK_FAVORITES.length}</p>
              </div>
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                {!isEditing && (
                  <Button
                    onClick={handleEdit}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                )}
              </div>

              {isEditing ? (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        First Name
                      </label>
                      <Input
                        type="text"
                        value={editData.firstName}
                        onChange={(e) => {
                          setEditData({ ...editData, firstName: e.target.value });
                          setErrors({ ...errors, firstName: '' });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.firstName && (
                        <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) => {
                          setEditData({ ...editData, lastName: e.target.value });
                          setErrors({ ...errors, lastName: '' });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.lastName && (
                        <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) => {
                          setEditData({ ...editData, email: e.target.value });
                          setErrors({ ...errors, email: '' });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => {
                          setEditData({ ...editData, phone: e.target.value });
                          setErrors({ ...errors, phone: '' });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Address
                      </label>
                      <Input
                        type="text"
                        value={editData.address}
                        onChange={(e) => {
                          setEditData({ ...editData, address: e.target.value });
                          setErrors({ ...errors, address: '' });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.address && (
                        <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        City
                      </label>
                      <Input
                        type="text"
                        value={editData.city}
                        onChange={(e) => {
                          setEditData({ ...editData, city: e.target.value });
                          setErrors({ ...errors, city: '' });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.city && (
                        <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        State
                      </label>
                      <Input
                        type="text"
                        value={editData.state}
                        onChange={(e) => {
                          setEditData({ ...editData, state: e.target.value });
                          setErrors({ ...errors, state: '' });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.state && (
                        <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>

                    {/* ZIP Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        ZIP Code
                      </label>
                      <Input
                        type="text"
                        value={editData.zip}
                        onChange={(e) => {
                          setEditData({ ...editData, zip: e.target.value });
                          setErrors({ ...errors, zip: '' });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.zip && (
                        <p className="text-red-600 text-sm mt-1">{errors.zip}</p>
                      )}
                    </div>

                    {/* Bio */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={editData.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-end pt-6 border-t">
                    <Button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSave}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">First Name</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.firstName}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone</label>
                    <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {profileData.phone}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Address</label>
                    <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profileData.address}, {profileData.city}, {profileData.state} {profileData.zip}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Bio</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.bio}</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              {/* Service Preferences */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Preferences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICE_CATEGORIES.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => toggleServicePreference(service.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        preferences.services.includes(service.id)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.emoji}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{service.label}</p>
                        </div>
                        {preferences.services.includes(service.id) && (
                          <div className="ml-auto">
                            <Check className="w-5 h-5 text-blue-600" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Beauty Preferences */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Beauty Preferences</h2>
                <div className="space-y-6">
                  {BEAUTY_PREFERENCES.map((preference) => (
                    <div key={preference.id}>
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        {preference.label}
                      </label>
                      <div className="flex gap-3 flex-wrap">
                        {preference.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleBeautyPreferenceChange(preference.id, option)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all ${
                              preferences.beauty[preference.id as keyof typeof preferences.beauty] === option
                                ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                                : 'border-gray-200 text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {NOTIFICATION_PREFERENCES.map((notif) => (
                    <div
                      key={notif.id}
                      className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <button
                        onClick={() => toggleNotificationPreference(notif.id)}
                        className={`mt-1 w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                          preferences.notifications.includes(notif.id)
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {preferences.notifications.includes(notif.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{notif.label}</p>
                        <p className="text-sm text-gray-600">{notif.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking History</h2>
              <div className="space-y-4">
                {MOCK_BOOKINGS.map((booking) => (
                  <div
                    key={booking.id}
                    className={`p-4 sm:p-6 rounded-lg border-l-4 transition-all ${
                      booking.status === 'completed'
                        ? 'border-l-green-600 bg-green-50'
                        : 'border-l-blue-600 bg-blue-50'
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Service</p>
                        <p className="text-lg font-semibold text-gray-900">{booking.serviceName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Professional</p>
                        <p className="text-lg font-semibold text-gray-900">{booking.professional}</p>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Date
                          </p>
                          <p className="font-semibold text-gray-900">{booking.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Time
                          </p>
                          <p className="font-semibold text-gray-900">{booking.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-semibold text-gray-900">{booking.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="text-lg font-bold text-green-600">${booking.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === 'completed'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-blue-200 text-blue-800'
                        }`}
                      >
                        {booking.status === 'completed' ? '✓ Completed' : '⏱️ Upcoming'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Favorites</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_FAVORITES.map((favorite) => (
                  <div key={favorite.id} className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 flex items-center justify-center">
                      <span className="text-6xl">{favorite.image}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{favorite.name}</h3>
                          <p className="text-sm text-gray-600">{favorite.specialty}</p>
                        </div>
                        <Heart className="w-5 h-5 text-red-600 fill-red-600" />
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 font-semibold text-gray-900">{favorite.rating}</span>
                          <span className="text-gray-600 text-sm ml-1">({favorite.reviews} reviews)</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                        Book Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
