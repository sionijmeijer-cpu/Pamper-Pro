import { useState, useEffect } from 'react';
import { Heart, Star, MapPin, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';

interface Professional {
  id: number;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  location: string;
  price: number;
  image: string;
  isFavorite: boolean;
}

const professionals: Professional[] = [
  {
    id: 1,
    name: 'Amara Beauty',
    service: 'Hair Styling',
    rating: 4.9,
    reviews: 245,
    location: 'Lagos, Nigeria',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1562241906-6bec5d38b2f5?w=400&h=300&fit=crop',
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Glow Studio',
    service: 'Makeup',
    rating: 4.8,
    reviews: 189,
    location: 'Abuja, Nigeria',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop',
    isFavorite: false,
  },
  {
    id: 3,
    name: 'Spa Bliss',
    service: 'Massage & Spa',
    rating: 4.7,
    reviews: 156,
    location: 'Lagos, Nigeria',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03cb5f548?w=400&h=300&fit=crop',
    isFavorite: false,
  },
  {
    id: 4,
    name: 'Hair Heaven',
    service: 'Braids & Extensions',
    rating: 4.9,
    reviews: 312,
    location: 'Lagos, Nigeria',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1631091228212-85c2c4abf061?w=400&h=300&fit=crop',
    isFavorite: false,
  },
  {
    id: 5,
    name: 'Nails Paradise',
    service: 'Nail Art',
    rating: 4.6,
    reviews: 98,
    location: 'Abuja, Nigeria',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
    isFavorite: false,
  },
  {
    id: 6,
    name: 'Skincare Experts',
    service: 'Skincare Treatment',
    rating: 4.8,
    reviews: 201,
    location: 'Lagos, Nigeria',
    price: 16000,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    isFavorite: false,
  },
];

export function FindProfessional() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchService, setSearchService] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Initialize with filters from sessionStorage if available
  useEffect(() => {
    const filters = sessionStorage.getItem('searchFilters');
    if (filters) {
      try {
        const parsedFilters = JSON.parse(filters);
        if (parsedFilters.service) setSearchService(parsedFilters.service);
        if (parsedFilters.location) setSearchLocation(parsedFilters.location);
        // Clear filters after use
        sessionStorage.removeItem('searchFilters');
      } catch (error) {
        console.error('Error parsing search filters:', error);
      }
    }
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredProfessionals = professionals.filter(pro => {
    const serviceMatch = pro.service.toLowerCase().includes(searchService.toLowerCase());
    const locationMatch = pro.location.toLowerCase().includes(searchLocation.toLowerCase());
    return serviceMatch && locationMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Find Your Perfect Professional</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service or Professional
                </label>
                <input
                  type="text"
                  placeholder="e.g., Hair Styling, Makeup..."
                  value={searchService}
                  onChange={(e) => setSearchService(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Lagos, Abuja..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Showing <span className="font-semibold text-teal-600">{filteredProfessionals.length}</span> professionals
          </p>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProfessionals.map(professional => (
            <div
              key={professional.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={professional.image}
                  alt={professional.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(professional.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(professional.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{professional.name}</h3>
                <p className="text-sm text-teal-600 font-medium mb-3">{professional.service}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(professional.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {professional.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({professional.reviews} reviews)
                  </span>
                </div>

                {/* Location & Price */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    {professional.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <DollarSign className="w-4 h-4" />
                    From ₦{professional.price.toLocaleString()}
                  </div>
                </div>

                {/* Book Button */}
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No professionals found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
