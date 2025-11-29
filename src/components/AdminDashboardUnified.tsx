import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, BarChart3, AlertCircle, Settings, LogOut, Trash2, Edit2 } from 'lucide-react';
import { Button } from './ui/button';

interface AdminDashboardUnifiedProps {
  onNavigate?: (page: string) => void;
}

export const AdminDashboardUnified: React.FC<AdminDashboardUnifiedProps> = ({ onNavigate = () => {} }) => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'client',
      status: 'verified',
      joinedDate: '2024-01-15'
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      role: 'professional',
      status: 'verified',
      joinedDate: '2024-02-20'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Smith',
      email: 'mike@example.com',
      role: 'vendor',
      status: 'pending',
      joinedDate: '2024-12-10'
    }
  ]);

  const stats = {
    totalUsers: 243,
    activeBookings: 45,
    totalRevenue: 12500,
    pendingKYC: 8
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'professional':
      case 'vendor':
        return 'bg-amber-100 text-amber-800';
      case 'client':
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-lg p-8 text-white mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-red-100">System management and user oversight</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('admin-settings')}
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
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeBookings}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-amber-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending KYC</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingKYC}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'overview'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'users'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('kyc')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'kyc'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            KYC Verification
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold text-gray-700">API Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-green-600 font-semibold">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-green-600 font-semibold">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Email Service</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activities</h2>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-green-600 bg-gray-50 rounded">
                  <p className="font-semibold text-gray-900">New user registered</p>
                  <p className="text-sm text-gray-600">2 minutes ago</p>
                </div>
                <div className="p-3 border-l-4 border-amber-600 bg-gray-50 rounded">
                  <p className="font-semibold text-gray-900">KYC verification pending</p>
                  <p className="text-sm text-gray-600">15 minutes ago</p>
                </div>
                <div className="p-3 border-l-4 border-blue-600 bg-gray-50 rounded">
                  <p className="font-semibold text-gray-900">New booking created</p>
                  <p className="text-sm text-gray-600">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Joined</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{user.firstName} {user.lastName}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{user.joinedDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-blue-100 rounded transition-colors">
                            <Edit2 className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'kyc' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">KYC Verifications Pending</h2>
            <div className="space-y-4">
              {users
                .filter(u => u.status === 'pending')
                .map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{user.firstName} {user.lastName}</h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                      <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                        Pending
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="bg-green-600 hover:bg-green-700">Approve</Button>
                      <Button variant="outline" className="text-red-600">Reject</Button>
                      <Button variant="outline">Request Info</Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Trend</h2>
              <div className="space-y-4">
                {[
                  { month: 'Jan', amount: 2400 },
                  { month: 'Feb', amount: 3200 },
                  { month: 'Mar', amount: 2800 },
                  { month: 'Apr', amount: 3600 },
                  { month: 'May', amount: 4200 }
                ].map((item) => (
                  <div key={item.month} className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">{item.month}</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(item.amount / 5000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-gray-900">${item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Distribution</h2>
              <div className="space-y-4">
                {[
                  { role: 'Clients', count: 180, color: 'bg-green-600' },
                  { role: 'Professionals', count: 45, color: 'bg-amber-600' },
                  { role: 'Vendors', count: 15, color: 'bg-red-600' },
                  { role: 'Admins', count: 3, color: 'bg-blue-600' }
                ].map((item) => (
                  <div key={item.role} className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">{item.role}</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${(item.count / 243) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-gray-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
