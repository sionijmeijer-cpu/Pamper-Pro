import { useState } from "react";
import { Search, Star, ChevronRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Header } from "./components/Header";
import { AuthModal } from "./components/AuthModal";
import { ClientDashboard } from "./components/ClientDashboard";
import { ProfessionalProfile } from "./components/ProfessionalProfile";
import { ProfessionalDashboard } from "./components/ProfessionalDashboard";
import { ProductsPage } from "./components/ProductsPage";
import { PricingPage } from "./components/PricingPage";

type Page = "home" | "search" | "profile" | "client-dashboard" | "professional-profile" | "professional-dashboard" | "banter" | "elite-support" | "terms-pros" | "terms-clients" | "privacy" | "products" | "pricing";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin");
  const [searchQuery, setSearchQuery] = useState("");

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
      coverImage: "/images/service-braids.png",
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
      tier: "Premium",
      services: ["Haircut", "Beard Styling", "Hot Towel Shave"],
      price: "From ₦8,000",
      experience: "12 years"
    },
    {
      id: 3,
      name: "Funmi Adebayo",
      businessName: "Flawless Face Studio",
      category: "Makeup Artist",
      location: "Ikeja GRA, Lagos",
      rating: 4.8,
      reviewCount: 456,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      coverImage: "/images/service-makeup.png",
      verified: true,
      tier: "Elite",
      services: ["Bridal Makeup", "Party Makeup", "Editorial Makeup"],
      price: "From ₦25,000",
      experience: "10 years"
    },
    {
      id: 4,
      name: "Blessing Onyeka",
      businessName: "Nail Haven",
      category: "Nail Technician",
      location: "Surulere, Lagos",
      rating: 4.9,
      reviewCount: 234,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      coverImage: "/images/service-nails.png",
      verified: true,
      tier: "Premium",
      services: ["Gel Nails", "Acrylic Extensions", "Pedicure"],
      price: "From ₦12,000",
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

  const handleSignUp = () => {
    setAuthModalOpen(true);
    setAuthModalTab("signup");
  };

  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} onSignIn={handleSignIn} />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultTab={authModalTab} />
      <div className="pt-20">
        {children}
      </div>
    </div>
  );

  if (currentPage === "client-dashboard") {
    return (
      <PageWrapper>
        <ClientDashboard />
      </PageWrapper>
    );
  }

  if (currentPage === "professional-profile") {
    return (
      <PageWrapper>
        <ProfessionalProfile />
      </PageWrapper>
    );
  }

  if (currentPage === "professional-dashboard") {
    return (
      <PageWrapper>
        <ProfessionalDashboard />
      </PageWrapper>
    );
  }

  if (currentPage === "products") {
    return (
      <PageWrapper>
        <ProductsPage />
      </PageWrapper>
    );
  }

  if (currentPage === "pricing") {
    return (
      <PageWrapper>
        <PricingPage />
      </PageWrapper>
    );
  }

  if (currentPage === "search") {
    return (
      <PageWrapper>
        <div className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 mt-8">Search Professionals</h1>
            <div className="grid md:grid-cols-4 gap-6">
              {featuredProfessionals.map((prof) => (
                <Card key={prof.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate("professional-profile")}>
                  <div className="relative h-40 bg-gray-200 overflow-hidden">
                    <img src={prof.coverImage} alt={prof.name} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{prof.businessName}</CardTitle>
                        <CardDescription>{prof.category}</CardDescription>
                      </div>
                      {prof.verified && <Badge className="bg-green-600">Verified</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{prof.rating}</span>
                        <span className="text-sm text-gray-600">({prof.reviewCount})</span>
                      </div>
                      <p className="text-sm text-gray-600">{prof.location}</p>
                      <p className="text-sm font-semibold text-green-700">{prof.price}</p>
                      <Button className="w-full bg-green-600 hover:bg-green-700 mt-4">Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (currentPage === "profile") {
    return (
      <PageWrapper>
        <div className="pb-16 px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">My Profile</h1>
            <Card>
              <CardHeader>
                <CardTitle>Profile Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Profile page is under development.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (currentPage === "banter") {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Banter - Coming Soon! 💬</CardTitle>
              <CardDescription className="text-lg mt-4">
                Connect with the beauty community, share tips, and chat with professionals. This feature is launching soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleNavigate("home")} className="w-full bg-green-600 hover:bg-green-700">
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageWrapper>
    );
  }

  if (currentPage === "elite-support") {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Elite Support Center - Coming Soon! 👑</CardTitle>
              <CardDescription className="text-lg mt-4">
                Premium support for elite members. Stay tuned!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleNavigate("home")} className="w-full bg-green-600 hover:bg-green-700">
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageWrapper>
    );
  }

  if (currentPage === "terms-pros" || currentPage === "terms-clients" || currentPage === "privacy") {
    return (
      <PageWrapper>
        <div className="pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms & Policies</h1>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">This page is under development.</p>
                <Button onClick={() => handleNavigate("home")} className="bg-green-600 hover:bg-green-700">
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Home Page
  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} onSignIn={handleSignIn} />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultTab={authModalTab} />

      {/* Hero Section - Exact Design from Screenshot */}
      <section className="bg-[#3d6a68] min-h-[650px] flex items-center pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Discover & book<br />local<br />beauty professionals
              </h1>

              {/* Search Bar */}
              <div className="bg-white rounded-full shadow-xl p-1 flex flex-col sm:flex-row gap-1 max-w-2xl">
                <Input
                  placeholder="Service, stylist or salon"
                  className="flex-1 border-0 bg-white rounded-full h-14 px-6 focus-visible:ring-0 text-gray-700 placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Input
                  placeholder="Lagos Location"
                  className="flex-1 border-0 bg-white rounded-full h-14 px-6 focus-visible:ring-0 text-gray-700 placeholder:text-gray-500"
                />
                <Button
                  className="bg-[#3d6a68] hover:bg-[#2d5a58] text-white h-14 px-8 rounded-full flex items-center gap-2 font-semibold"
                  onClick={() => handleNavigate("search")}
                >
                  <Search className="h-5 w-5" />
                  Search
                </Button>
              </div>

              {/* Bottom CTA */}
              <div className="flex items-center gap-4 flex-wrap pt-4">
                <p className="text-white text-lg font-medium">Grow your business with Pamper Pro</p>
                <Button
                  className="bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold px-6 py-3 rounded-lg text-base"
                  onClick={() => handleNavigate("professional-dashboard")}
                >
                  Launch My Business
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block">
              <img
                src="https://i.imgur.com/0Vct7Co.jpeg"
                alt="Professional salon interior"
                className="w-full h-auto rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Find Pros by Service */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-12">
            Find pros by service
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
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
              { name: "Makeup", image: "https://i.imgur.com/u5V476n.jpeg" }
            ].map((service) => (
              <div key={service.name} className="cursor-pointer group" onClick={() => handleNavigate("search")}>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-center font-semibold text-gray-900 text-sm sm:text-base">{service.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section id="browse" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
              Featured Professionals
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Top-Rated Beauty & Wellness Experts
            </h2>
            <p className="text-xl text-gray-600">
              Meet some of our most highly-rated and verified professionals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProfessionals.map((professional) => (
              <Card
                key={professional.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => handleNavigate("professional-profile")}
              >
                <div className="relative h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={professional.coverImage}
                    alt={professional.businessName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {professional.verified && (
                    <Badge className="absolute top-2 left-2 bg-green-600">✓ Verified</Badge>
                  )}
                  {professional.tier && (
                    <Badge className="absolute top-2 right-2 bg-amber-600">{professional.tier}</Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{professional.businessName}</CardTitle>
                  <CardDescription>{professional.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{professional.rating}</span>
                      <span className="text-sm text-gray-500">({professional.reviewCount})</span>
                    </div>
                    <p className="text-sm text-gray-600">{professional.location}</p>
                    <p className="text-sm font-semibold text-green-700">{professional.price}</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-2">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8" onClick={() => handleNavigate("search")}>
              Browse All Professionals <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Book your perfect beauty appointment in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Search & Browse</h3>
              <p className="text-gray-600">Find professionals by service, location, and ratings</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Check & Compare</h3>
              <p className="text-gray-600">View reviews, availability, and pricing details</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Book & Enjoy</h3>
              <p className="text-gray-600">Confirm your booking and get ready for your appointment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Your Glow On?</h2>
          <p className="text-xl mb-8 text-green-100">Join thousands of Nigerians who trust PamperPro for their beauty needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8" onClick={handleSignUp}>
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-600 px-8" onClick={() => handleNavigate("search")}>
              Browse Professionals
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">About PamperPro</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Our Mission</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">For Clients</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={() => handleNavigate("search")} className="hover:text-white transition">Browse Professionals</a></li>
              <li><a href="#" onClick={() => handleNavigate("products")} className="hover:text-white transition">Shop Products</a></li>
              <li><a href="#" className="hover:text-white transition">Safety Tips</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">For Professionals</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={() => handleNavigate("professional-dashboard")} className="hover:text-white transition">Launch Business</a></li>
              <li><a href="#" onClick={() => handleNavigate("pricing")} className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Resources</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={() => handleNavigate("privacy")} className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" onClick={() => handleNavigate("terms-clients")} className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 PamperPro. All rights reserved. | Made with ❤️ in Lagos, Nigeria</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
