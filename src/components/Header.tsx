import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { ClientSignupModal } from './ClientSignupModal';

interface HeaderProps {
  onNavigate?: (page: string) => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
}

export function Header({ onNavigate, onSignIn, onSignUp }: HeaderProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    { label: 'Find Professional', action: 'find-professional' },
    { label: 'Shop Products', action: 'shop-products' },
    { label: 'Pricing', action: 'pricing' },
  ];

  const handleMenuItemClick = (action: string) => {
    // Map actions to routes
    const routeMap: Record<string, string> = {
      'find-professional': '/find-professional',
      'shop-products': '/shop-products',
      'pricing': '/pricing',
      'launch-business': '/launch-business',
      'terms-professionals': '/terms-professionals',
      'terms-clients': '/terms-clients',
      'privacy': '/privacy',
      'home': '/',
      'pamper-pro-banter': '/banter',
      'support': '/support'
    };
    
    const route = routeMap[action] || '/';
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white bg-opacity-95 shadow-md'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand - Left */}
            <div
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <img
                src="https://i.imgur.com/R8BxfWa.jpeg"
                alt="Pamper Pro Logo"
                className="h-10 w-auto flex-shrink-0"
              />
              <span className="text-teal-900 font-bold text-lg hidden sm:inline">
                Pamper Pro
              </span>
            </div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map(item => (
                <button
                  key={item.action}
                  onClick={() => handleMenuItemClick(item.action)}
                  className="text-gray-700 hover:text-teal-600 font-medium transition-colors text-sm"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                onClick={() => setShowSignupModal(true)}
                variant="outline"
                className="border border-teal-600 text-teal-600 hover:bg-teal-50"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => navigate('/launch-business')}
                className="bg-teal-700 hover:bg-teal-800 text-white font-semibold"
              >
                Launch My Business
              </Button>
            </div>

            {/* Mobile Menu Button - All Screens */}
            <button
              className="flex items-center justify-center ml-4"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Menu - 25% Width */}
      {mobileMenuOpen && (
        <>
          {/* Semi-transparent Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-10 z-30 transition-opacity duration-300 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar Menu - Slides from RIGHT */}
          <div className="fixed top-0 right-0 h-screen w-full sm:w-3/5 lg:w-1/4 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300">
            {/* Close Button */}
            <div className="flex justify-end p-4 border-b border-gray-200">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-900" />
              </button>
            </div>

            <div className="px-6 py-4">
              {/* Mobile Only: Main Navigation */}
              {isMobile && (
                <nav className="flex flex-col gap-2 mb-6">
                  {navItems.map(item => (
                    <button
                      key={item.action}
                      onClick={() => handleMenuItemClick(item.action)}
                      className="text-left px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg font-medium transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              )}

              {/* For Professionals Section */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-widest">
                  For Professionals
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleMenuItemClick('launch-business')}
                    className="text-left px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="text-lg">🚀</span>
                    <span>Launch My Business</span>
                  </button>
                  <button
                    onClick={() => handleMenuItemClick('pricing')}
                    className="text-left px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="text-lg">📊</span>
                    <span>View Pricing Plans</span>
                  </button>
                </div>
              </div>

              {/* For Clients Section */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-widest">
                  For Clients
                </h3>
                <button
                  onClick={() => {
                    setShowSignupModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2 text-sm w-full"
                >
                  <span className="text-lg">💅</span>
                  <span>Sign Up</span>
                </button>
              </div>

              {/* PamperPro Section */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-widest">
                  PamperPro
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleMenuItemClick('home')}
                    className="text-left px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                    <span>🏠</span>
                    <span>Home</span>
                  </button>
                  <button
                    onClick={() => handleMenuItemClick('pamper-pro-banter')}
                    className="text-left px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                    <span>💬</span>
                    <span>Pamper Pro Banter</span>
                  </button>
                  <button
                    onClick={() => handleMenuItemClick('support')}
                    className="text-left px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                    <span>👑</span>
                    <span>Support</span>
                  </button>
                  <button
                    onClick={() => handleMenuItemClick('terms-professionals')}
                    className="text-left px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                    <span>📋</span>
                    <span>Terms of Professionals</span>
                  </button>
                  <button
                    onClick={() => handleMenuItemClick('terms-clients')}
                    className="text-left px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                    <span>📋</span>
                    <span>Terms for Clients</span>
                  </button>
                  <button
                    onClick={() => handleMenuItemClick('privacy')}
                    className="text-left px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                    <span>🔒</span>
                    <span>Privacy Policy</span>
                  </button>
                </div>
              </div>

              {/* Follow Us Section */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-widest">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 hover:bg-teal-100 rounded-lg transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-gray-700 hover:text-teal-600" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 hover:bg-teal-100 rounded-lg transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-gray-700 hover:text-teal-600" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 hover:bg-teal-100 rounded-lg transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-gray-700 hover:text-teal-600" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 hover:bg-teal-100 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-gray-700 hover:text-teal-600" />
                  </a>
                </div>
              </div>

              {/* Mobile Only: Auth Buttons */}
              {isMobile && (
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => {
                      setShowSignupModal(true);
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Signup Modal */}
      <ClientSignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}
