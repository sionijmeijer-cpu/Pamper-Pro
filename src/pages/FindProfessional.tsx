import { useState, useEffect, useRef } from 'react';
import { Heart, Star, MapPin, DollarSign, Map, Grid, Filter, X, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import RealMap from '../components/RealMap';

interface Professional {
  id: number;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  location: string;
  city: string;
  price: number;
  image: string;
  isFavorite: boolean;
  verified: boolean;
  distance?: string;
  lat: number;
  lng: number;
}

const allProfessionals: Professional[] = [
  {
    id: 1,
    name: "Glamour Studio",
    service: "Hair & Makeup",
    rating: 4.9,
    reviews: 124,
    location: "Victoria Island, Lagos",
    city: "Lagos",
    price: 15000,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    isFavorite: false,
    verified: true,
    distance: "2.3 km",
    lat: 6.4281,
    lng: 3.4219
  },
  {
    id: 2,
    name: "Elite Nails Spa",
    service: "Nails & Pedicure",
    rating: 4.8,
    reviews: 89,
    location: "Lekki Phase 1, Lagos",
    city: "Lagos",
    price: 8000,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400",
    isFavorite: false,
    verified: true,
    distance: "3.5 km",
    lat: 6.4423,
    lng: 3.4647
  },
  {
    id: 3,
    name: "Braids & Beauty",
    service: "Braiding Specialist",
    rating: 4.7,
    reviews: 156,
    location: "Ikeja, Lagos",
    city: "Lagos",
    price: 12000,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400",
    isFavorite: false,
    verified: false,
    distance: "5.1 km",
    lat: 6.5955,
    lng: 3.3376
  },
  {
    id: 4,
    name: "Glow Skin Studio",
    service: "Skincare & Facials",
    rating: 4.9,
    reviews: 203,
    location: "Ikoyi, Lagos",
    city: "Lagos",
    price: 20000,
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400",
    isFavorite: false,
    verified: true,
    distance: "1.8 km",
    lat: 6.4541,
    lng: 3.4316
  },
  {
    id: 5,
    name: "Lash & Lush",
    service: "Eyelash Extensions",
    rating: 4.6,
    reviews: 78,
    location: "Ikoyi, Lagos",
    city: "Lagos",
    price: 10000,
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400",
    isFavorite: false,
    verified: true,
    distance: "2.9 km",
    lat: 6.4537,
    lng: 3.4350
  },
  {
    id: 6,
    name: "Curl Queen",
    service: "Natural Hair Care",
    rating: 4.8,
    reviews: 142,
    location: "Lekki Phase 2, Lagos",
    city: "Lagos",
    price: 18000,
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400",
    isFavorite: false,
    verified: true,
    distance: "4.7 km",
    lat: 6.4501,
    lng: 3.5341
  },
  {
    id: 7,
    name: "Serenity Spa",
    service: "Full Body Massage",
    rating: 4.9,
    reviews: 167,
    location: "Victoria Island, Lagos",
    city: "Lagos",
    price: 25000,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
    isFavorite: false,
    verified: true,
    distance: "2.1 km",
    lat: 6.4274,
    lng: 3.4221
  },
  {
    id: 8,
    name: "Brows & Beyond",
    service: "Eyebrow Specialist",
    rating: 4.7,
    reviews: 95,
    location: "Ajah, Lagos",
    city: "Lagos",
    price: 6000,
    image: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400",
    isFavorite: false,
    verified: false,
    distance: "8.3 km",
    lat: 6.4674,
    lng: 3.5663
  },
  {
    id: 9,
    name: "Makeup Magic",
    service: "Bridal Makeup",
    rating: 5.0,
    reviews: 89,
    location: "Lekki Phase 1, Lagos",
    city: "Lagos",
    price: 35000,
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400",
    isFavorite: false,
    verified: true,
    distance: "3.2 km",
    lat: 6.4417,
    lng: 3.4652
  },
  {
    id: 10,
    name: "Silk Press Studio",
    service: "Hair Straightening",
    rating: 4.8,
    reviews: 134,
    location: "Ikeja, Lagos",
    city: "Lagos",
    price: 15000,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    isFavorite: false,
    verified: true,
    distance: "5.5 km",
    lat: 6.5949,
    lng: 3.3396
  },
  {
    id: 11,
    name: "Spa Bliss Lagos",
    service: "Spa Treatments",
    rating: 4.9,
    reviews: 198,
    location: "Ikoyi, Lagos",
    city: "Lagos",
    price: 30000,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400",
    isFavorite: false,
    verified: true,
    distance: "2.0 km",
    lat: 6.4544,
    lng: 3.4320
  },
  {
    id: 12,
    name: "Nail Art Pro",
    service: "Nail Art & Design",
    rating: 4.7,
    reviews: 112,
    location: "Lekki Phase 2, Lagos",
    city: "Lagos",
    price: 9000,
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400",
    isFavorite: false,
    verified: true,
    distance: "4.9 km",
    lat: 6.4497,
    lng: 3.5350
  }
];

const serviceCategories = ['All Services', 'Hair & Makeup', 'Nails & Pedicure', 'Braiding Specialist', 'Skincare & Facials', 'Eyelash Extensions', 'Natural Hair Care', 'Full Body Massage', 'Eyebrow Specialist', 'Bridal Makeup', 'Hair Straightening', 'Spa Treatments', 'Nail Art & Design'];
const cities = ['All Cities', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'];

export default function FindProfessional() {
  const [professionals, setProfessionals] = useState<Professional[]>(allProfessionals);
  const [searchService, setSearchService] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedService, setSelectedService] = useState('All Services');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  // Get filters from sessionStorage or URL params
  useEffect(() => {
    // First check sessionStorage from HomePage
    const storedFilters = sessionStorage.getItem('searchFilters');
    if (storedFilters) {
      try {
        const filters = JSON.parse(storedFilters);
        if (filters.service) {
          setSearchService(filters.service);
          setSelectedService(filters.service);
        }
        if (filters.location) {
          setSearchLocation(filters.location);
          setSelectedCity(filters.location);
        }
        // Clear after loading so it doesn't persist
        sessionStorage.removeItem('searchFilters');
      } catch (e) {
        console.error('Error parsing search filters:', e);
      }
    } else {
      // Fall back to URL params if no sessionStorage
      const params = new URLSearchParams(window.location.search);
      const service = params.get('service');
      const location = params.get('location');

      if (service) {
        setSearchService(service);
        setSelectedService(service);
      }
      if (location) {
        setSearchLocation(location);
        setSelectedCity(location);
      }
    }
  }, []);

  const filteredProfessionals = professionals
    .filter(pro => {
      const matchesService = selectedService === 'All Services' || pro.service === selectedService || pro.service.toLowerCase().includes(searchService.toLowerCase());
      const matchesSearchService = searchService === '' || pro.service.toLowerCase().includes(searchService.toLowerCase()) || pro.name.toLowerCase().includes(searchService.toLowerCase());
      const matchesLocation = selectedCity === 'All Cities' || pro.city === selectedCity || pro.location.toLowerCase().includes(selectedCity.toLowerCase());
      const matchesSearchLocation = searchLocation === '' || pro.location.toLowerCase().includes(searchLocation.toLowerCase()) || pro.city.toLowerCase().includes(searchLocation.toLowerCase());
      const matchesPrice = pro.price >= priceRange[0] && pro.price <= priceRange[1];
      
      return matchesService && matchesSearchService && matchesLocation && matchesSearchLocation && matchesPrice;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'reviews': return b.reviews - a.reviews;
        case 'distance': return parseFloat(a.distance || '0') - parseFloat(b.distance || '0');
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        default: return 0;
      }
    });

  const activeFilterCount = [
    selectedService !== 'All Services',
    selectedCity !== 'All Cities',
    priceRange[0] > 0 || priceRange[1] < 50000
  ].filter(Boolean).length;

  const toggleFavorite = (id: number) => {
    setProfessionals(professionals.map(pro => 
      pro.id === id ? { ...pro, isFavorite: !pro.isFavorite } : pro
    ));
  };

  const clearFilters = () => {
    setSearchService('');
    setSearchLocation('');
    setSelectedService('All Services');
    setSelectedCity('All Cities');
    setPriceRange([0, 50000]);
    setSortBy('recommended');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect <span className="text-pink-600">Professional</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover top-rated beauty and wellness professionals in your area
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchService}
                  onChange={(e) => setSearchService(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="md:col-span-3 flex items-end gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                <Filter className="w-5 h-5" />
                Filters {activeFilterCount > 0 && <span className="bg-white text-teal-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{activeFilterCount}</span>}
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
              >
                {viewMode === 'grid' ? <Map className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Service Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  {serviceCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="distance">Nearest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {activeFilterCount > 0 && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredProfessionals.length}</span> professionals
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map(professional => (
              <div key={professional.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100">
                <div className="relative">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(professional.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 ${professional.isFavorite ? 'fill-pink-600 text-pink-600' : 'text-gray-400'}`}
                    />
                  </button>
                  {professional.verified && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <span>✓</span> Verified
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{professional.name}</h3>
                  <p className="text-gray-600 mb-3">{professional.service}</p>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-900">{professional.rating}</span>
                      <span className="text-gray-500 text-sm">({professional.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{professional.location}</span>
                    {professional.distance && (
                      <span className="text-sm text-gray-400">• {professional.distance}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p className="text-xl font-bold text-pink-600">₦{professional.price.toLocaleString()}</p>
                    </div>
                    <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="h-[600px] w-full">
            <RealMap 
              professionals={filteredProfessionals}
              onMarkerClick={(professional) => {
                setSelectedProfessional(professional);
              }}
            />
          </div>
        )}

        {/* No Results */}
        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No professionals found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
