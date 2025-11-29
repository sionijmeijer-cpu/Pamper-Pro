import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Banter } from './components/Banter';
import { BanterPageEnhanced } from './components/BanterPageEnhanced';
import { ClientAuthModal } from './components/ClientAuthModal';
import { BusinessAuthModal } from './components/BusinessAuthModal';
import { ClientDashboard } from './components/ClientDashboard';
import { ProfessionalDashboard } from './components/ProfessionalDashboard';
import { AdminKYCReviewDashboard } from './components/AdminKYCReviewDashboard';
import { ClientProfile } from './components/ClientProfile';
import { ProfessionalProfile } from './components/ProfessionalProfile';
import { ProfessionalOnboardingWizard } from './components/ProfessionalOnboardingWizard';
import { ServiceProviderOnboarding } from './components/ServiceProviderOnboarding';
import { Footer } from './components/Footer';
import { KYCVerification } from './components/KYCVerification';
import { TermsForClients } from './components/TermsForClients';
import { TermsForProfessionals } from './components/TermsForProfessionals';
import { PricingPage } from './components/PricingPage';
import { PrivacyPolicy as PrivacyPolicyComponent } from './components/PrivacyPolicy';
import { TermsProfessionals } from './pages/TermsProfessionals';
import { TermsClients } from './pages/TermsClients';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { EliteSupport } from './components/EliteSupport';
import { LimitedProfessionalDashboard } from './components/LimitedProfessionalDashboard';
import { SearchProfessionals } from './components/SearchProfessionals';
import { MyBookings } from './components/MyBookings';
import { FindProfessional } from './pages/FindProfessional';
import { ShopProducts } from './pages/ShopProducts';
import { Pricing } from './pages/Pricing';
import { LaunchBusiness } from './pages/LaunchBusiness';
import { ClientSignup } from './pages/ClientSignup';

type PageType =
  | 'home'
  | 'client-dashboard'
  | 'professional-dashboard'
  | 'admin-dashboard'
  | 'client-profile'
  | 'professional-profile'
  | 'professional-onboarding'
  | 'service-provider-onboarding'
  | 'kyc-verification'
  | 'terms-clients'
  | 'terms-professionals'
  | 'pricing-page'
  | 'privacy'
  | 'elite-support'
  | 'limited-professional-dashboard'
  | 'search-professionals'
  | 'banter-feed'
  | 'my-bookings'
  | 'find-professional'
  | 'shop-products'
  | 'pricing'
  | 'launch-business'
  | 'support'
  | 'pamper-pro-banter'
  | 'client-signup';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showClientAuth, setShowClientAuth] = useState(false);
  const [showBusinessAuth, setShowBusinessAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Initialize auth from localStorage on mount
  useEffect(() => {
    const clientToken = localStorage.getItem('client_token');
    const clientUser = localStorage.getItem('client_current_user');
    const professionalToken = localStorage.getItem('professional_token');
    const professionalUser = localStorage.getItem('professional_current_user');
    const adminToken = localStorage.getItem('admin_token');
    const adminUser = localStorage.getItem('admin_current_user');

    if (clientToken && clientUser) {
      setCurrentUser(JSON.parse(clientUser));
    } else if (professionalToken && professionalUser) {
      setCurrentUser(JSON.parse(professionalUser));
    } else if (adminToken && adminUser) {
      setCurrentUser(JSON.parse(adminUser));
    }
  }, []);

  const handleClientAuthenticated = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem('client_token', user.id);
    localStorage.setItem('client_current_user', JSON.stringify(user));
    setShowClientAuth(false);
    setCurrentPage('client-dashboard');
  };

  const handleBusinessAuthenticated = (user: any) => {
    setCurrentUser(user);
    const role = user.role === 'admin' ? 'admin' : 'professional';
    localStorage.setItem(`${role}_token`, user.id);
    localStorage.setItem(`${role}_current_user`, JSON.stringify(user));
    setShowBusinessAuth(false);
    setCurrentPage(role === 'admin' ? 'admin-dashboard' : 'professional-dashboard');
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  // Render different content based on current page
  const renderPage = () => {
    switch (currentPage) {
      case 'client-dashboard':
        return <ClientDashboard />;
      case 'professional-dashboard':
        return <ProfessionalDashboard />;
      case 'admin-dashboard':
        return <AdminKYCReviewDashboard />;
      case 'client-profile':
        return <ClientProfile />;
      case 'professional-profile':
        return <ProfessionalProfile />;
      case 'professional-onboarding':
        return (
          <ProfessionalOnboardingWizard
            isOpen={true}
            businessType="service"
            onComplete={() => handleNavigate('professional-dashboard')}
            onClose={() => handleNavigate('home')}
          />
        );
      case 'service-provider-onboarding':
        return (
          <ServiceProviderOnboarding
            isOpen={true}
            onComplete={() => handleNavigate('professional-dashboard')}
            onClose={() => handleNavigate('home')}
          />
        );
      case 'kyc-verification':
        return (
          <KYCVerification
            isOpen={true}
            onClose={() => handleNavigate('home')}
            onSubmit={async () => handleNavigate('home')}
          />
        );
      case 'terms-clients':
        return <TermsClients />;
      case 'terms-professionals':
        return <TermsProfessionals />;
      case 'pricing-page':
        return <PricingPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'elite-support':
        return <EliteSupport onNavigate={handleNavigate} />;
      case 'limited-professional-dashboard':
        return <LimitedProfessionalDashboard />;
      case 'search-professionals':
        return <SearchProfessionals onNavigate={handleNavigate} />;
      case 'my-bookings':
        return <MyBookings onNavigate={handleNavigate} />;
      case 'find-professional':
        return <FindProfessional />;
      case 'shop-products':
        return <ShopProducts />;
      case 'pricing':
        return <Pricing />;
      case 'launch-business':
        return <LaunchBusiness />;
      case 'support':
        return <EliteSupport onNavigate={handleNavigate} />;
      case 'pamper-pro-banter':
        return <BanterPageEnhanced onNavigate={handleNavigate} />;
      case 'client-signup':
        return <ClientSignup onNavigate={handleNavigate} onClose={() => handleNavigate('home')} />;
      case 'home':
      default:
        return <Banter onNavigate={handleNavigate} onShowClientAuth={() => setShowClientAuth(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        onNavigate={handleNavigate}
        onSignIn={() => setShowClientAuth(true)}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Client Auth Modal */}
      <ClientAuthModal
        isOpen={showClientAuth}
        onClose={() => setShowClientAuth(false)}
        onAuthenticated={handleClientAuthenticated}
      />

      {/* Business Auth Modal */}
      <BusinessAuthModal
        isOpen={showBusinessAuth}
        onClose={() => setShowBusinessAuth(false)}
        onAuthenticated={handleBusinessAuthenticated}
      />

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
