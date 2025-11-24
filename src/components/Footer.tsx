import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

type Page = "home" | "search" | "profile" | "client-dashboard" | "professional-profile" | "professional-dashboard" | "banter" | "elite-support" | "terms-pros" | "terms-clients" | "privacy" | "products" | "pricing";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#2d5a58] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="https://i.imgur.com/KRDq2Sl.jpeg" alt="Pamper Pro" className="h-10 w-10 object-contain" />
              <h3 className="text-xl font-bold">Pamper Pro</h3>
            </div>
            <p className="text-gray-200 text-sm mb-4">
              Connecting beauty professionals with clients across Lagos. Book trusted services or grow your business with us.
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate("home")} className="text-gray-200 hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("search")} className="text-gray-200 hover:text-white transition-colors">
                  Find Professionals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("products")} className="text-gray-200 hover:text-white transition-colors">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("pricing")} className="text-gray-200 hover:text-white transition-colors">
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Professionals</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate("professional-dashboard")} className="text-gray-200 hover:text-white transition-colors">
                  Launch My Business
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("elite-support")} className="text-gray-200 hover:text-white transition-colors">
                  Elite Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("banter")} className="text-gray-200 hover:text-white transition-colors">
                  Community
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-200">
                <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>support@pamperpro.ng</span>
              </li>
              <li className="flex items-start gap-2 text-gray-200">
                <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-start gap-2 text-gray-200">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-200">
          <p>&copy; 2024 Pamper Pro. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => onNavigate("terms-pros")} className="hover:text-white transition-colors">
              Terms for Pros
            </button>
            <button onClick={() => onNavigate("terms-clients")} className="hover:text-white transition-colors">
              Terms for Clients
            </button>
            <button onClick={() => onNavigate("privacy")} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
