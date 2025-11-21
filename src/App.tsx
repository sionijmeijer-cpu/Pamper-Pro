import { useState } from "react";
import { Search, MapPin, Star, Calendar, Menu, X, ChevronRight, Heart, TrendingUp, Award, Users, Home, MessageSquare, Crown, Phone, FileText, Lock, LogOut, User, Rocket, BarChart3, Sparkles } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Input } from "./components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/sheet";
import { AuthModal } from "./components/AuthModal";
import { ClientDashboard } from "./components/ClientDashboard";
import { ProfessionalProfile } from "./components/ProfessionalProfile";
import { ProfessionalDashboard } from "./components/ProfessionalDashboard";

type Page = "home" | "search" | "profile" | "client-dashboard" | "professional-profile" | "professional-dashboard" | "banter" | "elite-support" | "terms-pros" | "terms-clients" | "privacy";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");


  const categories = [
    "All",
    "Hair Stylist",
    "Barber",
    "Makeup Artist",
    "Nail Technician",
    "Spa Therapist",
    "Lash Technician",
    "Esthetician"
  ];

  const lagosAreas = [
    "Victoria Island",
    "Lekki",
    "Ikeja",
    "Surulere",
    "Ikoyi",
    "Yaba",
    "Maryland",
    "Ajah"
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
    },
    {
      id: 5,
      name: "Tunde Bakare",
      businessName: "Royal Spa Lagos",
      category: "Spa Therapist",
      location: "Ikoyi, Lagos",
      rating: 4.7,
      reviewCount: 178,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
      verified: true,
      tier: "Premium",
      services: ["Deep Tissue Massage", "Facial Treatment", "Body Scrub"],
      price: "From ₦20,000",
      experience: "15 years"
    },
    {
      id: 6,
      name: "Zainab Ibrahim",
      businessName: "Lash Luxe",
      category: "Lash Technician",
      location: "Yaba, Lagos",
      rating: 5.0,
      reviewCount: 312,
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
      coverImage: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
      verified: true,
      tier: "Elite",
      services: ["Classic Lashes", "Volume Lashes", "Lash Lift"],
      price: "From ₦18,000",
      experience: "5 years"
    }
  ];

  const subscriptionPlans = [
    {
      name: "Free",
      price: "₦0",
      period: "forever",
      features: [
        "Basic profile listing",
        "Up to 3 service listings",
        "Client reviews",
        "Email notifications"
      ],
      popular: false
    },
    {
      name: "Basic",
      price: "₦5,000",
      period: "per month",
      features: [
        "Enhanced profile with gallery",
        "Unlimited service listings",
        "Online booking system",
        "SMS & email notifications",
        "Basic analytics"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "₦12,000",
      period: "per month",
      features: [
        "Everything in Basic",
        "Featured in search results",
        "Priority customer support",
        "Advanced analytics & insights",
        "Social media integration",
        "Custom booking page"
      ],
      popular: true
    },
    {
      name: "Elite",
      price: "₦25,000",
      period: "per month",
      features: [
        "Everything in Premium",
        "Top placement in category",
        "Verified professional badge",
        "Dedicated account manager",
        "Marketing support",
        "Website widget integration",
        "API access"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Chioma Nwankwo",
      service: "Hair Styling",
      rating: 5,
      text: "I found the perfect hairstylist on Pamper Pro! Amaka did an amazing job with my braids. The booking process was so easy and convenient.",
      location: "Victoria Island"
    },
    {
      name: "Ade Williams",
      service: "Barbering",
      rating: 5,
      text: "Chidi's barbershop is top-notch! I love how I can book my appointments online and never have to wait. Best barber in Lagos!",
      location: "Lekki"
    },
    {
      name: "Ngozi Okafor",
      service: "Makeup",
      rating: 5,
      text: "Funmi made me look absolutely stunning for my wedding! Her makeup skills are incredible. Thank you Pamper Pro for connecting us!",
      location: "Ikeja"
    }
  ];

  const filteredProfessionals = featuredProfessionals.filter(prof => {
    const matchesCategory = selectedCategory === "All" || prof.category === selectedCategory;
    const matchesSearch = prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prof.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prof.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const handleSignIn = () => {
    setAuthModalTab("signin");
    setAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthModalTab("signup");
    setAuthModalOpen(true);
  };

  // Render different pages
  if (currentPage === "client-dashboard") {
    return <ClientDashboard />;
  }

  if (currentPage === "professional-profile") {
    return <ProfessionalProfile />;
  }

  if (currentPage === "professional-dashboard") {
    return <ProfessionalDashboard />;
  }

  if (currentPage === "banter") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 text-purple-600" />
            <CardTitle className="text-3xl">Banter - Coming Soon! 💬</CardTitle>
            <CardDescription className="text-lg mt-4">
              Connect with the beauty community, share tips, and chat with professionals. This feature is launching soon!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleNavigate("home")} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentPage === "elite-support") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <Crown className="h-16 w-16 mx-auto mb-4 text-purple-600" />
            <CardTitle className="text-3xl">Elite Support Center 👑</CardTitle>
            <CardDescription className="text-lg mt-4">
              Premium support for our Elite members. Get dedicated assistance and priority help.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <Phone className="h-6 w-6 text-purple-600" />
              <div>
                <p className="font-semibold">Phone Support</p>
                <p className="text-sm text-gray-600">+234 800 PAMPER (726737)</p>
              </div>
            </div>
            <Button onClick={() => handleNavigate("home")} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Home Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate("home")}>
              <img src="/images/pamper-pro-logo.png" alt="Pamper Pro Logo" className="h-12 w-12 object-contain" />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Pamper Pro
                </span>
                <p className="text-xs text-gray-500">Lagos, Nigeria</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => handleNavigate("home")} className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
                Home
              </button>
              <button onClick={() => handleNavigate("search")} className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
                Browse Professionals
              </button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-purple-600 font-medium">
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <img src="/images/pamper-pro-logo.png" alt="Logo" className="h-8 w-8" />
                      Explore PamperPro
                    </SheetTitle>
                    <SheetDescription>Navigate to your desired section</SheetDescription>
                  </SheetHeader>
                  <div className="mt-8 space-y-6">
                    {/* Menu Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">MENU</h3>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("profile")}>
                          <User className="mr-2 h-4 w-4" />
                          My Profile
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                          <LogOut className="mr-2 h-4 w-4" />
                          Log Out
                        </Button>
                      </div>
                    </div>

                    {/* For Professionals Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">FOR PROFESSIONALS</h3>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("professional-dashboard")}>
                          <Rocket className="mr-2 h-4 w-4" />
                          🚀 Launch My Business
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("professional-dashboard")}>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          📊 Manage Your Business
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <Sparkles className="mr-2 h-4 w-4" />
                          ✨ Elevate Your Client Experience
                          <Badge className="ml-2 text-xs">Coming Soon</Badge>
                        </Button>
                      </div>
                    </div>

                    {/* For Clients Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">FOR CLIENTS</h3>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start" onClick={handleSignUp}>
                          💅 Sign Up to Book
                        </Button>
                      </div>
                    </div>

                    {/* PamperPro Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">PAMPERPRO</h3>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("home")}>
                          <Home className="mr-2 h-4 w-4" />
                          🏠 Home
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("search")}>
                          <Search className="mr-2 h-4 w-4" />
                          🔍 Search
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("banter")}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          💬 Banter
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("elite-support")}>
                          <Crown className="mr-2 h-4 w-4" />
                          👑 Elite Support Center
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("terms-pros")}>
                          <FileText className="mr-2 h-4 w-4" />
                          📋 Terms of Service for Pros
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("terms-clients")}>
                          <FileText className="mr-2 h-4 w-4" />
                          📋 Terms for Clients
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("privacy")}>
                          <Lock className="mr-2 h-4 w-4" />
                          🔒 Privacy Policy
                        </Button>
                      </div>
                    </div>

                    {/* Follow Us */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">FOLLOW US</h3>
                      <div className="flex gap-3">
                        <Button size="icon" variant="outline" className="hover:bg-purple-50">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </Button>
                        <Button size="icon" variant="outline" className="hover:bg-pink-50">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                          </svg>
                        </Button>
                        <Button size="icon" variant="outline" className="hover:bg-blue-50">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" onClick={() => handleNavigate("professional-dashboard")}>
                Launch your Business
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <button onClick={() => handleNavigate("home")} className="text-left text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
                  Home
                </button>
                <button onClick={() => handleNavigate("search")} className="text-left text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
                  Browse Professionals
                </button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="justify-start text-gray-700 hover:text-purple-600 font-medium">
                      Menu
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <img src="/images/pamper-pro-logo.png" alt="Logo" className="h-8 w-8" />
                        Explore PamperPro
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("home")}>
                        <Home className="mr-2 h-4 w-4" />
                        Home
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("search")}>
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("client-dashboard")}>
                        <User className="mr-2 h-4 w-4" />
                        My Bookings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("professional-dashboard")}>
                        <Rocket className="mr-2 h-4 w-4" />
                        Launch Business
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
                <Button variant="outline" className="border-2 border-purple-600 text-purple-600 w-full" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-full" onClick={() => handleNavigate("professional-dashboard")}>
                  Launch your Business
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultTab={authModalTab} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200 text-sm py-1 px-4">
              🇳🇬 Nigeria's #1 Beauty & Wellness Platform
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mx-auto">
              Discover & Book Top Beauty Professionals in
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                Lagos, Nigeria
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Connect with verified hair stylists, barbers, makeup artists, and wellness experts. Book appointments instantly and pay in Naira.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mt-12">
              <Card className="shadow-2xl border-2 border-gray-100">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search for services..."
                        className="pl-10 h-12 border-2 border-gray-200 focus:border-purple-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select className="w-full pl-10 h-12 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200">
                        <option>All Areas in Lagos</option>
                        {lagosAreas.map(area => (
                          <option key={area}>{area}</option>
                        ))}
                      </select>
                    </div>
                    <Button 
                      className="h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => handleNavigate("search")}
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">2,500+</p>
                <p className="text-gray-600">Verified Professionals</p>
              </div>
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-8 w-8 text-pink-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">50,000+</p>
                <p className="text-gray-600">Bookings Completed</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">4.9★</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white whitespace-nowrap"
                  : "whitespace-nowrap hover:bg-purple-50 hover:border-purple-300"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section id="browse" className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-200">
              Featured Professionals
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Top-Rated Beauty & Wellness
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Experts in Lagos
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProfessionals.map((professional) => (
              <Card
                key={professional.id}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-200 cursor-pointer overflow-hidden"
                onClick={() => handleNavigate("professional-profile")}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={professional.coverImage}
                    alt={professional.businessName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {professional.verified && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                      <Award className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge className="absolute top-4 right-4 bg-white/95 text-purple-700 border-0 font-semibold">
                    {professional.tier}
                  </Badge>
                  <div className="absolute bottom-4 left-4">
                    <Avatar className="h-16 w-16 border-4 border-white shadow-xl">
                      <AvatarImage src={professional.avatar} alt={professional.name} />
                      <AvatarFallback>{professional.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <CardHeader className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-purple-600 transition-colors duration-300">
                        {professional.name}
                      </CardTitle>
                      <p className="text-sm font-semibold text-purple-600">{professional.businessName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                      {professional.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{professional.rating}</span>
                      <span className="text-xs text-gray-500">({professional.reviewCount})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {professional.location}
                  </div>
                  <CardDescription className="mt-2">
                    {professional.services.join(" • ")}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p className="text-xl font-bold text-gray-900">{professional.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Experience</p>
                      <p className="text-sm font-semibold text-gray-900">{professional.experience}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No professionals found. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">
              Simple & Easy
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How Pamper Pro
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Works for You
              </span>
            </h2>
          </div>

          <Tabs defaultValue="clients" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-12">
              <TabsTrigger value="clients" className="text-lg">For Clients</TabsTrigger>
              <TabsTrigger value="professionals" className="text-lg">For Professionals</TabsTrigger>
            </TabsList>

            <TabsContent value="clients" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200">
                  <CardHeader>
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">1. Search & Discover</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Browse verified professionals in your area. Filter by service, location, and ratings.</p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200">
                  <CardHeader>
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">2. Book Instantly</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Choose your preferred date and time. Get instant confirmation via SMS and email.</p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200">
                  <CardHeader>
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">3. Get Pampered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Enjoy premium service from top professionals. Pay securely in Naira and leave a review.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="professionals" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-pink-200">
                  <CardHeader>
                    <div className="bg-gradient-to-br from-pink-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">1. Create Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Sign up and showcase your services, portfolio, and pricing. Get verified for more trust.</p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-pink-200">
                  <CardHeader>
                    <div className="bg-gradient-to-br from-pink-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">2. Get Booked</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Receive booking requests from clients. Manage your schedule and appointments online.</p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-pink-200">
                  <CardHeader>
                    <div className="bg-gradient-to-br from-pink-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">3. Grow Business</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Build your reputation, earn reviews, and expand your client base across Lagos.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-200">
              Professional Plans
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Affordable Plans for
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Every Professional
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your business. All prices in Nigerian Naira (₦)
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? "border-4 border-purple-500 shadow-xl" : "border-2 border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 shadow-lg">
                      🔥 Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                          <svg className="h-3 w-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                        : "bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                    } transition-all duration-300`}
                  >
                    {plan.name === "Free" ? "Get Started" : "Subscribe Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">
              Success Stories
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              What Lagos Residents
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Are Saying
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-200"
              >
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-purple-200">
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-3 bg-pink-100 text-pink-700">
                    {testimonial.service}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Ready to Join Nigeria's Leading Beauty Platform?
          </h2>
          <p className="text-xl opacity-90">
            Whether you're looking to book services or grow your business, Pamper Pro is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" onClick={handleSignUp}>
              <Calendar className="mr-2 h-5 w-5" />
              Book a Service
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 shadow-xl" onClick={() => handleNavigate("professional-dashboard")}>
              Launch your Business
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src="/images/pamper-pro-logo.png" alt="Pamper Pro Logo" className="h-10 w-10 object-contain" />
                <span className="text-xl font-bold">Pamper Pro</span>
              </div>
              <p className="text-gray-400">
                Nigeria's premier platform connecting beauty professionals with clients across Lagos.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-400">Lagos, Nigeria</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">For Clients</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleNavigate("search")} className="hover:text-pink-400 transition-colors duration-200">Find Professionals</button></li>
                <li><button onClick={handleSignUp} className="hover:text-pink-400 transition-colors duration-200">Book Appointment</button></li>
                <li><button onClick={() => handleNavigate("home")} className="hover:text-pink-400 transition-colors duration-200">How It Works</button></li>
                <li><button onClick={() => handleNavigate("home")} className="hover:text-pink-400 transition-colors duration-200">Reviews</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">For Professionals</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleNavigate("home")} className="hover:text-pink-400 transition-colors duration-200">Pricing Plans</button></li>
                <li><button onClick={() => handleNavigate("professional-dashboard")} className="hover:text-pink-400 transition-colors duration-200">Launch Business</button></li>
                <li><button onClick={() => handleNavigate("professional-dashboard")} className="hover:text-pink-400 transition-colors duration-200">Dashboard</button></li>
                <li><button onClick={() => handleNavigate("elite-support")} className="hover:text-pink-400 transition-colors duration-200">Support</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-pink-400 transition-colors duration-200">About Us</button></li>
                <li><button className="hover:text-pink-400 transition-colors duration-200">Contact</button></li>
                <li><button onClick={() => handleNavigate("privacy")} className="hover:text-pink-400 transition-colors duration-200">Privacy Policy</button></li>
                <li><button onClick={() => handleNavigate("terms-clients")} className="hover:text-pink-400 transition-colors duration-200">Terms of Service</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">&copy; 2024 Pamper Pro. All rights reserved. Made in Nigeria 🇳🇬</p>
              <div className="flex gap-4">
                <button className="text-gray-400 hover:text-pink-400 transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-pink-400 transition-colors duration-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-pink-400 transition-colors duration-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
