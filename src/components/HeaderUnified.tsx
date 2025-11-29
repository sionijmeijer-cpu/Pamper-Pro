import React, { useState } from 'react';
import { Menu, X, LogOut, Home, Search, ShoppingBag, Settings, BarChart3, Users, Lock } from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

interface HeaderUnifiedProps {
  onNavigate?: (page: string) => void;
  onShowAuth?: () => void;
}

export const HeaderUnified: React.FC<HeaderUnifiedProps> = ({
  onNavigate = () => {},
  onShowAuth = () => {}
}) => {
  const { currentUser, logout, switchRole } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);

  const hasMultipleRoles = currentUser?.roles && currentUser.roles.length > 1;

  const getRoleBadgeColor = (role: UserRole) => {
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

  const getNavItems = () => {
    if (!currentUser) {
      return [
        { label: 'Home', value: 'home' },
        { label: 'Find Professionals', value: 'search' },
        { label: 'Products', value: 'products' },
        { label: 'Pricing', value: 'pricing' }
      ];
    }

    if (currentUser.role === 'admin') {
      return [
        { label: 'Dashboard', value: 'admin-dashboard', icon: BarChart3 },
        { label: 'Users', value: 'admin-users', icon: Users },
        { label: 'KYC', value: 'admin-kyc', icon: Lock }
      ];
    }

    if (currentUser.role === 'professional' || currentUser.role === 'vendor') {
      return [
        { label: 'Dashboard', value: 'professional-dashboard', icon: BarChart3 },
        { label: 'Services', value: 'professional-services', icon: ShoppingBag },
        { label: 'Settings', value: 'professional-settings', icon: Settings }
      ];
    }

    // Client
    return [
      { label: 'Dashboard', value: 'client-dashboard', icon: Home },
      { label: 'Browse', value: 'search', icon: Search },
      { label: 'My Bookings', value: 'client-bookings', icon: ShoppingBag }
    ];
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    onNavigate('home');
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    setIsRoleSwitcherOpen(false);
    onNavigate('home');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b-2 border-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer flex-shrink-0 group"
            onClick={() => {
              onNavigate('home');
              setIsMobileMenuOpen(false);
            }}
          >
            <img
              src="https://i.imgur.com/KRDq2Sl.jpeg"
              alt="Pamper Pro"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="hidden md:inline font-bold text-green-700 text-lg">Pamper Pro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-6 flex-1 justify-center">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors text-sm px-3 py-2 rounded-lg hover:bg-green-50"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <>
                {/* Role Switcher */}
                {hasMultipleRoles && (
                  <div className="relative">
                    <button
                      onClick={() => setIsRoleSwitcherOpen(!isRoleSwitcherOpen)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${getRoleBadgeColor(
                        currentUser.role
                      )} hover:shadow-md`}
                    >
                      {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                    </button>

                    {isRoleSwitcherOpen && (
                      <div className="absolute top-full right-0 mt-2 bg-white border-2 border-green-200 rounded-lg shadow-lg p-2 min-w-48">
                        <p className="text-xs font-semibold text-gray-600 px-3 py-2">Switch Role:</p>
                        {currentUser.roles.map((role) => (
                          <button
                            key={role}
                            onClick={() => handleRoleSwitch(role)}
                            className={`w-full text-left px-3 py-2 rounded transition-all ${
                              currentUser.role === role
                                ? 'bg-green-100 text-green-800 font-semibold'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* User Info */}
                <div className="flex items-center gap-3 border-l border-gray-200 pl-3">
                  {currentUser.profileImage && (
                    <img
                      src={currentUser.profileImage}
                      alt={currentUser.firstName}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  )}
                  <div className="hidden lg:block">
                    <p className="text-sm font-semibold text-gray-900">
                      {currentUser.firstName} {currentUser.lastName}
                    </p>
                    <p className="text-xs text-gray-600">{currentUser.email}</p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onShowAuth}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 hover:shadow-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('launch-business')}
                  className="px-6 py-2 border-2 border-amber-500 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-all duration-200"
                >
                  Launch Business
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center gap-2"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </button>
            ))}

            {currentUser ? (
              <>
                {hasMultipleRoles && (
                  <>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-600">Switch Role:</div>
                    {currentUser.roles.map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          handleRoleSwitch(role);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 transition-all ${
                          currentUser.role === role
                            ? 'bg-green-100 text-green-800 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    ))}
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onShowAuth();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mx-4 mt-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onNavigate('launch-business');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mx-4 mt-2 px-4 py-2 border-2 border-amber-500 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-all"
                >
                  Launch Business
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
