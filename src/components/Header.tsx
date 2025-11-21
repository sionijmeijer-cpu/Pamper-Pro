import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Home, Search, FileText, Lock, LogOut, User, Rocket, BarChart3, MessageSquare, Crown } from "lucide-react";

interface HeaderProps {
  onNavigate: (page: any) => void;
  onSignIn: () => void;
}

export function Header({ onNavigate, onSignIn }: HeaderProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer flex-shrink-0" onClick={() => onNavigate("home")}>
            <img src="https://i.imgur.com/KRDq2Sl.jpeg" alt="Pamper Pro" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
            <span className="hidden md:inline font-bold text-green-800 text-base sm:text-lg">Pamper Pro</span>
          </div>

          {/* Desktop Navigation - Center (hidden on tablet/mobile) */}
          <div className="hidden 2xl:flex items-center space-x-6 flex-1 justify-center">
            <button onClick={() => onNavigate("home")} className="text-gray-700 hover:text-green-700 font-medium transition-colors text-sm">
              Home
            </button>
            <button onClick={() => onNavigate("search")} className="text-gray-700 hover:text-green-700 font-medium transition-colors text-sm">
              Find Professionals
            </button>
            <button onClick={() => onNavigate("products")} className="text-gray-700 hover:text-green-700 font-medium transition-colors text-sm">
              Products
            </button>
            <button onClick={() => onNavigate("pricing")} className="text-gray-700 hover:text-green-700 font-medium transition-colors text-sm">
              Pricing
            </button>
          </div>

          {/* Right Side - Buttons (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-3 ml-auto">
            <Button variant="outline" className="border-2 border-green-700 text-green-700 hover:bg-green-50 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2" onClick={onSignIn}>
              Sign In
            </Button>
            <Button className="bg-green-800 hover:bg-green-900 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2" onClick={() => onNavigate("professional-dashboard")}>
              Launch Your Business
            </Button>
          </div>

          {/* Mobile Menu - Far Right */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-green-700 ml-auto md:ml-3">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <img src="https://i.imgur.com/KRDq2Sl.jpeg" alt="Logo" className="h-8 w-8" />
                  Menu
                </SheetTitle>
                <SheetDescription>Navigate PamperPro</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Main Navigation */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase">Navigation</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => onNavigate("home")}>
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => onNavigate("search")}>
                      <Search className="mr-2 h-4 w-4" />
                      Find Professionals
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => onNavigate("products")}>
                      Products
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => onNavigate("pricing")}>
                      Pricing
                    </Button>
                  </div>
                </div>

                {/* Authentication - Mobile */}
                <div className="md:hidden">
                  <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase">Account</h3>
                  <div className="space-y-2">
                    <Button className="w-full bg-green-800 hover:bg-green-900 text-white text-sm" onClick={onSignIn}>
                      Sign In
                    </Button>
                    <Button className="w-full bg-green-700 hover:bg-green-800 text-white text-sm" onClick={() => onNavigate("professional-dashboard")}>
                      Launch Your Business
                    </Button>
                  </div>
                </div>

                {/* For Professionals */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase">For Professionals</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => onNavigate("professional-dashboard")}>
                      <Rocket className="mr-2 h-4 w-4" />
                      Launch My Business
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Manage Business
                    </Button>
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase">Resources</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => onNavigate("elite-support")}>
                      <Crown className="mr-2 h-4 w-4" />
                      Elite Support
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => onNavigate("banter")}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Banter
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => onNavigate("terms-pros")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Terms for Pros
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => onNavigate("terms-clients")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Terms for Clients
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => onNavigate("privacy")}>
                      <Lock className="mr-2 h-4 w-4" />
                      Privacy Policy
                    </Button>
                  </div>
                </div>

                {/* Account */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase">Account</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => onNavigate("profile")}>
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
