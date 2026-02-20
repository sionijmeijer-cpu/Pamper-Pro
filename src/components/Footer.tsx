import { Heart, Facebook, Twitter, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Footer() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isProfessional = user?.role === 'professional' || user?.role === 'admin';

  return (
    <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
              <img
                src="https://i.imgur.com/R8BxfWa.jpeg"
                alt="Pamper Pro Logo"
                className="h-10 w-auto flex-shrink-0"
              />
              <div>
                <span className="text-xl font-bold text-teal-400">Pamper Pro</span>
                <sup className="text-teal-400 text-xs ml-1">™</sup>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Your trusted platform for beauty and wellness services.</p>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="font-bold mb-4 text-white">🚀 FOR PROFESSIONALS</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/launch-business')} 
                  className="hover:text-teal-400 transition"
                >
                  Launch My Business
                </button>
              </li>
              {isProfessional && (
                <>
                  <li>
                    <button onClick={() => navigate('/professionals')} className="hover:text-teal-400 transition">Manage Your Business</button>
                  </li>
                  <li>
                    <button onClick={() => navigate('/support')} className="hover:text-teal-400 transition">✨ Elevate Your Client Experience</button>
                  </li>
                </>
              )}
              <li>
                <button onClick={() => navigate('/pricing')} className="hover:text-teal-400 transition">💰 Pricing & Plans</button>
              </li>
            </ul>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="font-bold mb-4 text-white">💅 FOR CLIENTS</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button onClick={() => navigate('/find-professional')} className="hover:text-teal-400 transition">
                  Find Professional
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/banter')} className="hover:text-teal-400 transition">
                  💬 Banter
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/support')} className="hover:text-teal-400 transition">
                  👑 Elite Support Center
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h3 className="font-bold mb-4 text-white">📋 INFORMATION</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/terms-professionals')} 
                  className="hover:text-teal-400 transition"
                >
                  Terms for Professionals
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/terms-clients')} 
                  className="hover:text-teal-400 transition"
                >
                  Terms for Clients
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/pricing')} 
                  className="hover:text-teal-400 transition"
                >
                  💰 Pricing & Plans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/privacy')} 
                  className="hover:text-teal-400 transition"
                >
                  🔒 Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="font-bold mb-4 text-white">📱 FOLLOW US</h3>
            <div className="flex gap-3 mb-6">
              <button className="bg-teal-600 hover:bg-teal-700 rounded-lg p-2 transition">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="bg-teal-600 hover:bg-teal-700 rounded-lg p-2 transition">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="bg-teal-600 hover:bg-teal-700 rounded-lg p-2 transition">
                <Instagram className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm">
              <p className="text-gray-400 mb-2"><strong>Email:</strong></p>
              <p className="text-teal-400 hover:text-teal-300"><a href="mailto:support@pamperpro.eu">support@pamperpro.eu</a></p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-pink-500" /> for self-care enthusiasts
            </p>
            <p className="text-gray-400">© 2025 Pamper Pro™. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
