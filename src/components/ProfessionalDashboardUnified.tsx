import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart3, Calendar, Users, DollarSign, Settings, LogOut, TrendingUp, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface ProfessionalDashboardUnifiedProps {
  onNavigate?: (page: string) => void;
}

export const ProfessionalDashboardUnified: React.FC<ProfessionalDashboardUnifiedProps> = ({ onNavigate = () => {} }) => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in production, this would come from API
  const stats = {
    totalBookings: 24,
    revenue: 1850,
    rating: 4.9,
    servicesOffered: 5
  };

  const upcomingBookings = [
    {
      id: 1,
      clientName: 'Jane Doe',
      serviceName: 'Hair Styling',
      dateTime: '2024-12-15T14:00:00',
      status: 'confirmed',
      price: 75
    },
    {
      id: 2,
      clientName: 'Maria Garcia',
      serviceName: 'Makeup Application',
      dateTime: '2024-12-16T10:00:00',
      status: 'pending',
      price: 60
    }
  ];

  const services = [
    {
      id: 1,
      name: 'Hair Styling',
      price: 75,
      duration: 60,
      bookings: 12
    },
    {
      id: 2,
      name: 'Makeup Application',
      price: 60,
      duration: 45,
      bookings: 8
    },
    {
      id: 3,
      name: 'Nail Art',
      price: 45,
      duration: 30,
      bookings: 4
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
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{currentUser?.businessName || 'My Business'}</h1>
              <p className="text-amber-100">Manage your services and bookings</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('professional-settings')}
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
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
              <Calendar className="w-8 h-8 text-amber-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${stats.revenue}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Rating</p>
                <p className="text-3xl font-bold text-gray-900">{stats.rating}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Services</p>
                <p className="text-3xl font-bold text-gray-900">{stats.servicesOffered}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'overview'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'bookings'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'services'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'earnings'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            Earnings
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Bookings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Bookings</h2>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{booking.clientName}</h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{booking.serviceName}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(booking.dateTime).toLocaleDateString()}
                      </span>
                      <span className="font-semibold text-amber-600">${booking.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Services */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Services</h2>
              <div className="space-y-4">
                {services.slice(0, 3).map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <span className="text-lg font-bold text-green-600">${service.price}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}min
                      </span>
                      <span>{service.bookings} bookings</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{booking.clientName}</h3>
                    <p className="text-gray-600">{booking.serviceName}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{new Date(booking.dateTime).toLocaleString()}</p>
                <div className="flex gap-2">
                  <Button className="bg-amber-600 hover:bg-amber-700">View Details</Button>
                  <Button variant="outline">Message Client</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button className="bg-amber-600 hover:bg-amber-700">Add New Service</Button>
            </div>
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                    <div className="flex gap-6 mt-2 text-gray-600">
                      <span>Price: ${service.price}</span>
                      <span>Duration: {service.duration} min</span>
                      <span>Bookings: {service.bookings}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline" className="text-red-600">Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-gray-600 text-sm mb-2">This Month</p>
                <p className="text-3xl font-bold text-green-600">$450</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <p className="text-gray-600 text-sm mb-2">Last Month</p>
                <p className="text-3xl font-bold text-amber-600">$620</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-600 text-sm mb-2">Total Earned</p>
                <p className="text-3xl font-bold text-blue-600">$1,850</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
