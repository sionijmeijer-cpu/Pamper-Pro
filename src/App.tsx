import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

// Auth Pages
import ClientSignupFlow from './pages/ClientSignupFlow';
import ClientLoginFlow from './pages/ClientLoginFlow';
import ClientDashboard from './pages/ClientDashboard';
import ClientProtectedRoute from './components/ClientProtectedRoute';
import { CheckEmailPage } from './pages/CheckEmailPage';
import { EmailVerificationPage } from './pages/EmailVerificationPage';
import SignupPage from './pages/SignupPage';

// Legacy Pages
import Banter from './components/Banter';
import { HomePage } from './components/HomePage';
import { TermsProfessionals } from './pages/TermsProfessionals';
import { TermsClients } from './pages/TermsClients';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import FindProfessional from './pages/FindProfessional';
import { ShopProducts } from './pages/ShopProducts';
import { Pricing } from './pages/Pricing';
import { LaunchBusiness } from './pages/LaunchBusiness';
import Support from './pages/Support';

// Service Provider Pages
import ServiceProviderDirectory from './pages/ServiceProviderDirectory';
import ServiceProviderProfile from './pages/ServiceProviderProfile';
import BookingFlow from './pages/BookingFlow';
import { ProfessionalSubscriptionPlans } from './pages/ProfessionalSubscriptionPlans';
import { VendorSubscriptionPlans } from './pages/VendorSubscriptionPlans';
import { ClientSubscriptionPlans } from './pages/ClientSubscriptionPlans';

function HomePageWrapper() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/signup" element={<ClientSignupFlow />} />
        <Route path="/login" element={<ClientLoginFlow />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/signup-acs" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <ClientProtectedRoute>
              <ClientDashboard />
            </ClientProtectedRoute>
          }
        />

        {/* Service Provider Pages */}
        <Route path="/professionals" element={<Layout><ServiceProviderDirectory /></Layout>} />
        <Route path="/professional/:id" element={<Layout><ServiceProviderProfile /></Layout>} />
        <Route path="/book/:id" element={<BookingFlow />} />
        
        {/* Subscription Plans */}
        <Route path="/plans/professionals" element={<Layout><ProfessionalSubscriptionPlans /></Layout>} />
        <Route path="/plans/vendors" element={<Layout><VendorSubscriptionPlans /></Layout>} />
        <Route path="/plans/clients" element={<Layout><ClientSubscriptionPlans /></Layout>} />

        {/* Legacy Pages with Layout */}
        <Route path="/find-professional" element={<Layout><FindProfessional /></Layout>} />
        <Route path="/shop-products" element={<Layout><ShopProducts /></Layout>} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/launch-business" element={<Layout><LaunchBusiness /></Layout>} />
        <Route path="/terms-professionals" element={<Layout><TermsProfessionals /></Layout>} />
        <Route path="/terms-clients" element={<Layout><TermsClients /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/banter" element={<Layout><Banter /></Layout>} />
        <Route path="/support" element={<Layout><Support /></Layout>} />

        {/* Home Page */}
        <Route path="/" element={<HomePageWrapper />} />
      </Routes>
    </Router>
  );
}
