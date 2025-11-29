import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, MapPin, Star, Heart } from 'lucide-react';

interface Professional {
  id: number;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  location: string;
  isFavorite: boolean;
}

interface SearchProfessionalsProps {
  onNavigate?: (page: string) => void;
}

export function SearchProfessionals({ onNavigate }: SearchProfessionalsProps) {
  const [searchService, setSearchService] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const professionals: Professional[] = [
    {
      id: 1,
      name: 'Amara Johnson',
      service: 'Braids',
      rating: 4.9,
      reviews: 127,
      price: '₦15,000 - ₦50,000',
      image: '/images/service-braids.png',
      location: 'Lagos Island',
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Zainab Adeyemi',
      service: 'Silk Press',
      rating: 4.8,
      reviews: 89,
      price: '₦8,000 - ₦15,000',
      image: '/images/service-silk-press.png',
      location: 'Victoria Island',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Chioma Okonkwo',
      service: 'Natural Hair',
      rating: 4.95,
      reviews: 156,
      price: '₦20,000 - ₦60,000',
      image: '/images/service-natural-hair.png',
      location: 'Lekki',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Blessing Adebayo',
      service: 'Haircut',
      rating: 4.7,
      reviews: 93,
      price: '₦5,000 - ₦12,000',
      image: '/images/service-haircut.png',
      location: 'Ikoyi',
      isFavorite: false,
    },
  ];

  const filteredProfessionals = professionals.filter((prof) => {
    const serviceMatch = prof.service.toLowerCase().includes(searchService.toLowerCase());
    const locationMatch = prof.location.toLowerCase().includes(searchLocation.toLowerCase());
    return serviceMatch && locationMatch;
  });

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <section className="bg-teal-800 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Find the Perfect Professional</h1>

          <div className="bg-white rounded-full p-2 flex flex-col sm:flex-row gap-2 shadow-lg">
            <Input
              type="text"
              placeholder="Service, stylist or salon"
              value={searchService}
              onChange={(e) => setSearchService(e.target.value)}
              className="flex-1 border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 bg-transparent"
            />
            <Input
              type="text"
              placeholder="Lagos Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="flex-1 border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 bg-transparent"
            />
            <Button className="bg-teal-700 hover:bg-teal-900 text-white rounded-full px-8 py-2 flex items-center gap-2 whitespace-nowrap font-semibold">
              <Search className="w-5 h-5" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {filteredProfessionals.length} Professionals Found
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((prof) => (
              <div
                key={prof.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={prof.image}
                    alt={prof.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(prof.id)}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        favorites.has(prof.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{prof.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{prof.service}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{prof.rating}</span>
                    <span className="text-sm text-gray-500">({prof.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 mb-4 text-sm">
                    <MapPin className="w-4 h-4" />
                    {prof.location}
                  </div>

                  <p className="text-sm font-semibold text-teal-700 mb-4">{prof.price}</p>

                  <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold">
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No professionals found. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
