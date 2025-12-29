import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import ClientSignupFlow from './pages/ClientSignupFlow';
import ClientLoginFlow from './pages/ClientLoginFlow';
import { CheckEmailPage } from './pages/CheckEmailPage';
import { EmailVerificationPage } from './pages/EmailVerificationPage';
import ClientDashboard from './pages/ClientDashboard';
import { CompleteProfilePage } from './components/CompleteProfilePage';
import FindProfessional from './pages/FindProfessional';
import { ShopProducts } from './pages/ShopProducts';
import Pricing from './pages/Pricing';
import { LaunchBusiness } from './pages/LaunchBusiness';
import { TermsProfessionals } from './pages/TermsProfessionals';
import { TermsClients } from './pages/TermsClients';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import Support from './pages/Support';
import { BanterPageEnhanced } from './components/BanterPageEnhanced';
import BookingFlow from './pages/BookingFlow';
import OrderManagement from './pages/OrderManagement';
import ShoppingCart from './components/ShoppingCart';
import { CheckoutFlow } from './components/CheckoutFlow';
import StripePaymentForm from './components/StripePaymentForm';
import PlanFeatureGate from './components/PlanFeatureGate';
import UsageTracker from './components/UsageTracker';
import ProfessionalDetailPage from './pages/ProfessionalDetailPage';
import VendorDetailPage from './pages/VendorDetailPage';

// Simple protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Home page wrapper
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
        {/* Home */}
        <Route path="/" element={<HomePageWrapper />} />

        {/* Auth Routes */}
        <Route path="/signup" element={<ClientSignupFlow />} />
        <Route path="/login" element={<ClientLoginFlow />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
        
        {/* Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Public Pages with Layout */}
        <Route path="/find-professional" element={<Layout><FindProfessional /></Layout>} />
        <Route path="/shop-products" element={<Layout><ShopProducts /></Layout>} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/launch-business" element={<Layout><LaunchBusiness /></Layout>} />
        <Route path="/terms-professionals" element={<Layout><TermsProfessionals /></Layout>} />
        <Route path="/terms-clients" element={<Layout><TermsClients /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/support" element={<Layout><Support /></Layout>} />
        <Route path="/banter" element={<Layout><BanterPageEnhanced /></Layout>} />

        {/* Phase 4-6: Booking, Orders & Payments */}
        <Route path="/booking" element={<Layout><BookingFlow /></Layout>} />
        <Route path="/orders" element={<Layout><OrderManagement /></Layout>} />
        <Route path="/professional/:id" element={<Layout><ProfessionalDetailPage /></Layout>} />
        <Route path="/vendor/:id" element={<Layout><VendorDetailPage /></Layout>} />
        <Route path="/cart" element={<Layout><ShoppingCart /></Layout>} />
        <Route path="/checkout" element={<Layout><CheckoutFlow cartTotal={0} items={[]} /></Layout>} />
        <Route path="/payment" element={<Layout><StripePaymentForm amount={0} description="Payment" /></Layout>} />

        {/* Fallback - redirect to home */}
        <Route path="*" element={<HomePageWrapper />} />
      </Routes>
    </Router>
  );
}
