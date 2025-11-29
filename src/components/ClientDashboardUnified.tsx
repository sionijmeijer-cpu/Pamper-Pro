import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Star, Clock, Phone, MessageCircle, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface ClientDashboardUnifiedProps {
  onNavigate?: (page: string) => void;
}

export const ClientDashboardUnified: React.FC<ClientDashboardUnifiedProps> = ({ onNavigate = () => {} }) => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');

  // Mock data - in production, this would come from API
  const upcomingBookings = [
    {
      id: 1,
      serviceName: 'Hair Styling',
      professionalName: 'Sarah Johnson',
      dateTime: '2024-12-15T14:00:00',
      location: '123 Beauty Lane, NYC',
      status: 'confirmed'
    }
  ];

  const favoriteServices = [
    {
      id: 1,
      name: 'Hair Styling',
      professional: 'Sarah Johnson',
      rating: 4.8,
      price: 75,
      image: 'https://images.unsplash.com/photo-1562599810-d0cb2dd67b5d?w=400'
    }
  ];

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome, {currentUser?.firstName}!</h1>
              <p className="text-green-100">Manage your beauty and wellness bookings</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('client-settings')}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
              >
                <Settings className="w-6 h-6" />
              </button>
              <button
                onClick={handleLogout}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Upcoming Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{upcomingBookings.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Favorites</p>
                <p className="text-3xl font-bold text-gray-900">{favoriteServices.length}</p>
              </div>
              <Star className="w-8 h-8 text-amber-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Spent</p>
                <p className="text-3xl font-bold text-gray-900">$425</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Rating Given</p>
                <p className="text-3xl font-bold text-gray-900">4.8</p>
              </div>
              <Star className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'bookings'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'favorites'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Favorites
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'reviews'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            My Reviews
          </button>
        </div>

        {/* Content */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{booking.serviceName}</h3>
                      <p className="text-gray-600">with {booking.professionalName}</p>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.dateTime).toLocaleDateString()} at{' '}
                      {new Date(booking.dateTime).toLocaleTimeString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {booking.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contact Professional
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">View Details</Button>
                    <Button variant="outline">Reschedule</Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No upcoming bookings</p>
                <p className="text-gray-500 mb-4">Start by browsing professionals and services</p>
                <Button
                  onClick={() => onNavigate('search')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Browse Services
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all">
                <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                  <p className="text-gray-600 mb-2">{service.professional}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{service.rating}</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 mb-4">${service.price}</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Book Now</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No reviews yet</p>
            <p className="text-gray-500">Complete a booking and leave a review</p>
          </div>
        )}
      </div>
    </div>
  );
};
