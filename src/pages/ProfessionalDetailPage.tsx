import { useState } from 'react';
import { Star, MapPin, Phone, Mail, Calendar, ArrowLeft } from 'lucide-react';

export default function ProfessionalDetailPage() {
  const [isBooking, setIsBooking] = useState(false);

  const professional = {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Professional Hair Stylist',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
    bio: 'Expert hair stylist with 8+ years of experience in cutting, coloring, and styling.',
    location: 'Lagos, Nigeria',
    phone: '+234 (801) 234-5678',
    email: 'sarah@pamperpro.eu',
    specializations: ['Hair Styling', 'Coloring', 'Extensions', 'Treatments'],
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    hourlyRate: '₦5,000',
    responseTime: '2 hours',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft size={20} />
          Back to Professionals
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Professional Info */}
            <div className="md:col-span-2">
              <div className="mb-8">
                <div className="flex gap-6">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{professional.name}</h1>
                    <p className="text-purple-600 font-semibold mb-2">{professional.title}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(professional.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-900">{professional.rating}</span>
                      <span className="text-gray-600">({professional.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{professional.bio}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Specializations</h2>
                <div className="flex flex-wrap gap-2">
                  {professional.specializations.map((spec) => (
                    <span key={spec} className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-purple-600" />
                    <p className="text-gray-600">{professional.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-purple-600" />
                    <p className="text-gray-600">{professional.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-purple-600" />
                    <p className="text-gray-600">{professional.email}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Availability</h2>
                <div className="flex flex-wrap gap-2">
                  {professional.availability.map((day) => (
                    <span key={day} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="md:col-span-1">
              <div className="bg-gradient-to-b from-purple-50 to-pink-50 rounded-xl p-6 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{professional.hourlyRate}</h3>
                <p className="text-gray-600 mb-6">per hour</p>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-purple-600" />
                    <span className="text-sm text-gray-600">Available for booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-purple-600" />
                    <span className="text-sm text-gray-600">Responds in {professional.responseTime}</span>
                  </div>
                </div>

                {!isBooking ? (
                  <button
                    onClick={() => setIsBooking(true)}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 mb-3"
                  >
                    Book Now
                  </button>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Select date"
                    />
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Select time"
                    />
                    <button
                      onClick={() => setIsBooking(false)}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
                    >
                      Confirm Booking
                    </button>
                  </div>
                )}

                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 mt-3">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Clock({ size, className }: { size: number; className: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
