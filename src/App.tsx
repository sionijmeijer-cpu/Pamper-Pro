import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Header } from "./components/Header";
import { AuthModal } from "./components/AuthModal";
import { ClientDashboard } from "./components/ClientDashboard";
import { ProfessionalProfile } from "./components/ProfessionalProfile";
import { ProfessionalDashboard } from "./components/ProfessionalDashboard";
import { ProductsPage } from "./components/ProductsPage";
import { PricingPage } from "./components/PricingPage";
import { LaunchBusinessModal } from "./components/LaunchBusinessModal";
import { ServiceProviderOnboarding } from "./components/ServiceProviderOnboarding";
import { ProductVendorOnboarding } from "./components/ProductVendorOnboarding";
import { BusinessAuthModal } from "./components/BusinessAuthModal";
import { SearchWithAutocomplete } from "./components/SearchWithAutocomplete";
import { Footer } from "./components/Footer";
import { ReviewsCarousel } from "./components/ReviewsCarousel";
import { ClientProfile } from "./components/ClientProfile";
import { EliteSupport } from "./components/EliteSupport";
import { TermsForProfessionals } from "./components/TermsForProfessionals";
import { TermsForClients } from "./components/TermsForClients";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { Banter } from "./components/Banter";

type Page = "home" | "search" | "profile" | "client-dashboard" | "client-profile" | "professional-profile" | "professional-dashboard" | "banter" | "elite-support" | "terms-pros" | "terms-clients" | "privacy" | "products" | "pricing";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin");
  const [launchBusinessModalOpen, setLaunchBusinessModalOpen] = useState(false);
  const [businessAuthModalOpen, setBusinessAuthModalOpen] = useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState<"service" | "vendor" | null>(null);
  const [serviceProviderOnboardingOpen, setServiceProviderOnboardingOpen] = useState(false);
  const [productVendorOnboardingOpen, setProductVendorOnboardingOpen] = useState(false);

  const reviews = [
    { name: "Chioma Adebayo", service: "Braids", rating: 5.0, review: "Absolutely amazing service! The stylist was professional, friendly, and my braids look incredible. Best experience I've had in Lagos!", image: "https://i.imgur.com/X9k5Fnx.jpeg" },
    { name: "Tunde Okafor", service: "Men's Haircut", rating: 5.0, review: "Clean cut, great atmosphere, and the barber really knows what he's doing. Will definitely be coming back!", image: "https://i.imgur.com/WiMHbvZ.jpeg" },
    { name: "Amara Johnson", service: "Makeup", rating: 4.9, review: "The makeup artist was so talented! She listened to what I wanted and delivered perfectly. Felt beautiful all day long.", image: "https://i.imgur.com/u5V476n.jpeg" },
    { name: "David Okoro", service: "Locs", rating: 5.0, review: "Been growing my locs for 2 years and finally found someone who understands how to maintain them properly. Highly recommend!", image: "https://i.imgur.com/KZ1zmRr.jpeg" },
    { name: "Blessing Eze", service: "Nails", rating: 4.8, review: "Such beautiful work on my nails! Very clean salon and the nail tech was patient and creative. Love the results!", image: "https://i.imgur.com/otDlO9q.jpeg" },
    { name: "Oluwaseun James", service: "Haircut", rating: 5.0, review: "Professional service from start to finish. The stylist took time to understand what I wanted. Very satisfied!", image: "https://i.imgur.com/JZOqHiF.jpeg" },
    { name: "Fatima Ibrahim", service: "Silk Press", rating: 4.9, review: "My hair has never looked this good! The silk press was flawless and lasted for weeks. Amazing skill!", image: "https://i.imgur.com/KyERSSz.jpeg" },
    { name: "Emmanuel Uche", service: "Kids Services", rating: 5.0, review: "Great with kids! My daughter was comfortable the entire time and her hair looks adorable. Thank you!", image: "https://i.imgur.com/I0tB7Lk.jpeg" },
    { name: "Grace Nwosu", service: "Weaves", rating: 4.8, review: "The weave installation was seamless and looks so natural. The stylist is very skilled and professional.", image: "https://i.imgur.com/JibMUrE.jpeg" },
    { name: "Chukwudi Okeke", service: "Color", rating: 5.0, review: "The color came out exactly as I envisioned! Very knowledgeable about hair health and protecting natural hair.", image: "https://i.imgur.com/bhLcj37.jpeg" },
  ];

  const featuredProfessionals = [
    {
      id: 1,
      name: "Amaka Okonkwo",
      businessName: "Glam by Amaka",
      category: "Hair Stylist",
      location: "Victoria Island, Lagos",
      rating: 4.9,
      reviewCount: 342,
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
      coverImage: "https://i.imgur.com/otDlO9q.jpeg",
      verified: true,
      tier: "Elite",
      services: ["Braids", "Weave Installation", "Natural Hair Styling"],
      price: "From ₦15,000",
      experience: "8 years"
    },
    {
      id: 2,
      name: "Chidi Eze",
      businessName: "Elite Cuts Barbershop",
      category: "Barber",
      location: "Lekki Phase 1, Lagos",
      rating: 5.0,
      reviewCount: 289,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      coverImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
      verified: true,
      tier: "Elite",
      services: ["Men's Haircut", "Beard Trim", "Grooming"],
      price: "From ₦5,000",
      experience: "12 years"
    },
    {
      id: 3,
      name: "Zainab Mohammed",
      businessName: "Zainab's Makeup Studio",
      category: "Makeup Artist",
      location: "Ikeja, Lagos",
      rating: 4.8,
      reviewCount: 156,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      coverImage: "https://i.imgur.com/u5V476n.jpeg",
      verified: true,
      tier: "Professional",
      services: ["Bridal Makeup", "Party Makeup", "Event Coverage"],
      price: "From ₦25,000",
      experience: "6 years"
    }
  ];

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSignIn = () => {
    setAuthModalOpen(true);
    setAuthModalTab("signin");
  };

  const handleClientAuthenticated = () => {
    handleNavigate("client-profile");
  };

  const handleLaunchBusiness = () => {
    setLaunchBusinessModalOpen(true);
  };

  const handleSelectBusinessType = (type: "service" | "vendor") => {
    setSelectedBusinessType(type);
    setLaunchBusinessModalOpen(false);
    setBusinessAuthModalOpen(true);
  };

  const handleBusinessAuthenticated = () => {
    setBusinessAuthModalOpen(false);
    if (selectedBusinessType === "service") {
      setServiceProviderOnboardingOpen(true);
    } else if (selectedBusinessType === "vendor") {
      setProductVendorOnboardingOpen(true);
    }
  };

  const handleOnboardingComplete = () => {
    setServiceProviderOnboardingOpen(false);
    setProductVendorOnboardingOpen(false);
    handleNavigate("professional-dashboard");
  };

  if (currentPage === "professional-profile") {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1 pt-16">
          <ProfessionalProfile />
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "client-dashboard") {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1 pt-16">
          <ClientDashboard />
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "client-profile") {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1 pt-16">
          <ClientProfile />
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "professional-dashboard") {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1 pt-16">
          <ProfessionalDashboard />
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "search") {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1 pt-16">
          <PageWrapper>
            <div className="pb-16">
              <h1 className="text-4xl font-bold mb-8">Find Beauty Professionals</h1>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProfessionals.map((prof) => (
                  <Card key={prof.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={() => handleNavigate("professional-profile")}>
                    <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 relative">
                      <img src={prof.coverImage} alt={prof.businessName} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{prof.name}</h3>
                          <p className="text-sm text-gray-600">{prof.businessName}</p>
                        </div>
                        {prof.verified && <Badge>Verified</Badge>}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{prof.rating}</span>
                        <span className="text-gray-600 text-sm">({prof.reviewCount})</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{prof.price}</p>
                      <Button className="w-full bg-green-600 hover:bg-green-700">Book Now</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </PageWrapper>
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "products") {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1 pt-16">
          <ProductsPage />
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "pricing") {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1 pt-16">
          <PricingPage />
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "elite-support") {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1 pt-16">
          <EliteSupport />
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "banter") {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1">
          <Banter />
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "terms-pros") {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1 pt-16">
          <TermsForProfessionals />
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "terms-clients") {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1 pt-16">
          <TermsForClients />
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "privacy") {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
        <div className="flex-1 pt-16">
          <PrivacyPolicy />
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header onNavigate={handleNavigate} onSignIn={handleSignIn} onLaunchBusiness={handleLaunchBusiness} />
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultTab={authModalTab}
        onAuthenticated={handleClientAuthenticated}
      />
      <LaunchBusinessModal
        isOpen={launchBusinessModalOpen}
        onClose={() => setLaunchBusinessModalOpen(false)}
        onSelectType={handleSelectBusinessType}
      />
      <BusinessAuthModal
        isOpen={businessAuthModalOpen}
        onClose={() => setBusinessAuthModalOpen(false)}
        onAuthenticated={handleBusinessAuthenticated}
        businessType={selectedBusinessType || "service"}
      />
      <ServiceProviderOnboarding
        isOpen={serviceProviderOnboardingOpen}
        onClose={() => setServiceProviderOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />
      <ProductVendorOnboarding
        isOpen={productVendorOnboardingOpen}
        onClose={() => setProductVendorOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />

      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#3d6a68] min-h-screen sm:min-h-[650px] flex items-center pt-20 sm:pt-24 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="text-white space-y-8">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  Book Local<br />Beauty Pros
                </h1>
                <SearchWithAutocomplete onSearch={() => handleNavigate("search")} />
                <div className="flex items-center gap-4 flex-wrap pt-4">
                  <p className="text-white text-lg font-medium">Grow your business with Pamper Pro</p>
                  <Button
                    className="bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold px-6 py-3 rounded-lg text-base"
                    onClick={handleLaunchBusiness}
                  >
                    Launch My Business
                  </Button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <img src="https://i.imgur.com/0Vct7Co.jpeg" alt="Beauty Professional" className="w-full h-auto object-cover rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Find Professionals by Services */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">Find pros by service</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {[
                { name: "Braids", image: "https://i.imgur.com/H5YdZU9.jpeg" },
                { name: "Natural Hair", image: "https://i.imgur.com/X9k5Fnx.jpeg" },
                { name: "Haircut", image: "https://i.imgur.com/JZOqHiF.jpeg" },
                { name: "Men's Haircut", image: "https://i.imgur.com/WiMHbvZ.jpeg" },
                { name: "Locs", image: "https://i.imgur.com/KZ1zmRr.jpeg" },
                { name: "Silk Press", image: "https://i.imgur.com/KyERSSz.jpeg" },
                { name: "Weaves", image: "https://i.imgur.com/JibMUrE.jpeg" },
                { name: "Eyelashes", image: "https://i.imgur.com/LroELjc.jpeg" },
                { name: "Nails", image: "https://i.imgur.com/otDlO9q.jpeg" },
                { name: "Color", image: "https://i.imgur.com/bhLcj37.jpeg" },
                { name: "Kids", image: "https://i.imgur.com/I0tB7Lk.jpeg" },
                { name: "Makeup", image: "https://i.imgur.com/u5V476n.jpeg" },
              ].map((service) => (
                <div
                  key={service.name}
                  className="group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105"
                  onClick={() => handleNavigate("search")}
                >
                  <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden bg-gray-200 rounded-2xl">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                      <span className="text-white text-sm sm:text-base font-semibold">{service.name}</span>
                    </div>
                  </div>
                  <p className="text-center text-gray-900 font-semibold text-xs sm:text-sm md:text-base mt-3 group-hover:text-[#3d6a68] transition-colors">
                    {service.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Professionals */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-2">Featured Professionals</h2>
                <p className="text-gray-600">Highly rated beauty professionals ready to serve you</p>
              </div>
              <Button variant="outline" onClick={() => handleNavigate("search")}>
                View All <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProfessionals.map((prof) => (
                <Card key={prof.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105" onClick={() => handleNavigate("professional-profile")}>
                  <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 relative overflow-hidden">
                    <img src={prof.coverImage} alt={prof.businessName} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                    <Badge className="absolute top-3 right-3 bg-green-600">{prof.tier}</Badge>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{prof.name}</h3>
                        <p className="text-sm text-gray-600">{prof.businessName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="font-semibold">{prof.rating}</span>
                      <span className="text-gray-600 text-sm">({prof.reviewCount})</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{prof.price}</p>
                    <p className="text-xs text-gray-500 mb-3">{prof.experience} experience</p>
                    <Button className="w-full bg-[#3d6a68] hover:bg-[#2d5a58] text-white">Book Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with Steps */}
        <section className="bg-gradient-to-r from-[#3d6a68] to-[#2d5a58] py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center text-white mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Ready to Start Your Beauty Business?</h2>
              <p className="text-lg sm:text-xl mb-8 text-gray-100">Join thousands of professionals earning with Pamper Pro</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-white hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Grow your business</h3>
                <p className="text-gray-100 text-sm sm:text-base">
                  Unlock business growth by using our marketing tools to attract new clients.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-white hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Manage your business</h3>
                <p className="text-gray-100 text-sm sm:text-base">
                  Take charge of your business and make booking and scheduling a breeze.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-white hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Elevate your client experience</h3>
                <p className="text-gray-100 text-sm sm:text-base">
                  Prioritize client satisfaction with features that create a seamless booking experience.
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button size="lg" className="bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold px-8 py-6 text-base sm:text-lg" onClick={handleLaunchBusiness}>
                Launch My Business
              </Button>
            </div>
          </div>
        </section>

        {/* Reviews Carousel */}
        <ReviewsCarousel reviews={reviews} />
      </div>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 pt-24 sm:pt-28 md:pt-32">
      {children}
    </div>
  );
}

export default App;
