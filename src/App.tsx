import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Banter } from './components/Banter';

// Auth Pages
import ClientSignupFlow from './pages/ClientSignupFlow';
import ClientLoginFlow from './pages/ClientLoginFlow';
import ClientDashboard from './pages/ClientDashboard';
import ClientProtectedRoute from './components/ClientProtectedRoute';
import { CheckEmailPage } from './pages/CheckEmailPage';
import { EmailVerificationPage } from './pages/EmailVerificationPage';

// Legacy Pages
import { TermsProfessionals } from './pages/TermsProfessionals';
import { TermsClients } from './pages/TermsClients';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { FindProfessional } from './pages/FindProfessional';
import { ShopProducts } from './pages/ShopProducts';
import { Pricing } from './pages/Pricing';
import { LaunchBusiness } from './pages/LaunchBusiness';

function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onNavigate={() => {}} onSignIn={() => {}} />
      <main className="flex-1">
        <Banter onNavigate={() => {}} onShowClientAuth={() => {}} />
      </main>
      <Footer onNavigate={() => {}} />
    </div>
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
        <Route
          path="/dashboard"
          element={
            <ClientProtectedRoute>
              <ClientDashboard />
            </ClientProtectedRoute>
          }
        />

        {/* Legacy Pages */}
        <Route path="/find-professional" element={<FindProfessional />} />
        <Route path="/shop-products" element={<ShopProducts />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/launch-business" element={<LaunchBusiness />} />
        <Route path="/terms-professionals" element={<TermsProfessionals />} />
        <Route path="/terms-clients" element={<TermsClients />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Home Page - Catch all */}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
