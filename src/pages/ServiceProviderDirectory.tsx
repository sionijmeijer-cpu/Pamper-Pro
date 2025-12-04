import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Filter, ChevronDown, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface ServiceProvider {
  id: number;
  name: string;
  service_type: string;
  location: string;
  rating: number;
  reviews_count: number;
  price_per_hour: number;
  image_url: string;
  is_verified: boolean;
  bio: string;
  specializations: string[];
}

const ServiceProviderDirectory = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState('all');

  // Mock data - in production, this would come from your database
  const mockProviders: ServiceProvider[] = [
    {
      id: 1,
      name: 'Amara Beauty Studio',
      service_type: 'Hair & Makeup',
      location: 'Lagos Island, Lagos',
      rating: 4.8,
      reviews_count: 245,
      price_per_hour: 15000,
      image_url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=500&fit=crop',
      is_verified: true,
      bio: 'Professional hair styling and makeup for all occasions',
      specializations: ['Bridal Makeup', 'Hair Braiding', 'Natural Hair Care'],
    },
    {
      id: 2,
      name: 'Elite Nails & Spa',
      service_type: 'Nails & Spa',
      location: 'Lekki, Lagos',
      rating: 4.9,
      reviews_count: 312,
      price_per_hour: 12000,
      image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
      is_verified: true,
      bio: 'Luxury spa services and nail care with premium products',
      specializations: ['Gel Nails', 'Massage Therapy', 'Facial Treatments'],
    },
    {
      id: 3,
      name: 'Glow & Shine Beauty',
      service_type: 'Makeup',
      location: 'Ikoyi, Lagos',
      rating: 4.7,
      reviews_count: 189,
      price_per_hour: 18000,
      image_url: 'https://images.unsplash.com/photo-1487412992651-b8b341500e94?w=500&h=500&fit=crop',
      is_verified: true,
      bio: 'Creative makeup artist specializing in bridal and event makeup',
      specializations: ['Bridal Makeup', 'Event Makeup', 'Artistic Makeup'],
    },
    {
      id: 4,
      name: 'Hair Haven Professionals',
      service_type: 'Hair',
      location: 'Victoria Island, Lagos',
      rating: 4.6,
      reviews_count: 156,
      price_per_hour: 13000,
      image_url: 'https://images.unsplash.com/photo-1562122176-8dc2350b6d4a?w=500&h=500&fit=crop',
      is_verified: true,
      bio: 'Expert hair care with natural and synthetic styles',
      specializations: ['Braids', 'Weaves', 'Locs', 'Hair Coloring'],
    },
    {
      id: 5,
      name: 'Skin Perfection Clinic',
      service_type: 'Skincare',
      location: 'Ikeja, Lagos',
      rating: 4.8,
      reviews_count: 278,
      price_per_hour: 20000,
      image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=500&h=500&fit=crop',
      is_verified: true,
      bio: 'Professional skincare treatments and facial therapy',
      specializations: ['Facials', 'Chemical Peels', 'Skin Analysis'],
    },
    {
      id: 6,
      name: 'Brows & Lashes Studio',
      service_type: 'Lashes & Brows',
      location: 'Surulere, Lagos',
      rating: 4.7,
      reviews_count: 134,
      price_per_hour: 11000,
      image_url: 'https://images.unsplash.com/photo-1570542220040-12e4e57d2ca0?w=500&h=500&fit=crop',
      is_verified: true,
      bio: 'Expert eyebrow and eyelash services',
      specializations: ['Lash Extensions', 'Eyebrow Threading', 'Eyebrow Tattooing'],
    },
  ];

  useEffect(() => {
    // Simulate loading providers
    setLoading(true);
    setTimeout(() => {
      setProviders(mockProviders);
      setLoading(false);
    }, 500);
  }, []);

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.service_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedService === 'all' || provider.service_type.includes(selectedService);
    const matchesLocation = selectedLocation === 'all' || provider.location.includes(selectedLocation);
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'budget' && provider.price_per_hour <= 12000) ||
      (priceRange === 'mid' && provider.price_per_hour > 12000 && provider.price_per_hour <= 18000) ||
      (priceRange === 'premium' && provider.price_per_hour > 18000);

    return matchesSearch && matchesService && matchesLocation && matchesPrice;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const services = ['all', 'Hair', 'Makeup', 'Nails & Spa', 'Skincare', 'Lashes & Brows'];
  const locations = ['all', 'Lagos Island', 'Lekki', 'Ikoyi', 'Victoria Island', 'Ikeja', 'Surulere'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Perfect Professional</h1>
          <p className="text-gray-600">Browse and connect with verified beauty professionals</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search professionals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-2"
                />
              </div>
            </div>

            {/* Service Filter */}
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                {services.map(service => (
                  <SelectItem key={service} value={service}>
                    {service === 'all' ? 'All Services' : service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (≤₦12k)</SelectItem>
                <SelectItem value="mid">Mid-Range (₦12k-₦18k)</SelectItem>
                <SelectItem value="premium">Premium (₦18k+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredProviders.length} professional{filteredProviders.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        )}

        {/* Providers Grid */}
        {!loading && filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map(provider => (
              <Card
                key={provider.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-64 bg-gray-200">
                  <img
                    src={provider.image_url}
                    alt={provider.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {provider.is_verified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      ✓ Verified
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(provider.id)}
                    className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md hover:bg-pink-50 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(provider.id)
                          ? 'fill-pink-600 text-pink-600'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-gray-900">{provider.name}</CardTitle>
                      <CardDescription className="text-pink-600 font-medium">
                        {provider.service_type}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Location */}
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-pink-600" />
                    {provider.location}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(provider.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {provider.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({provider.reviews_count} reviews)
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 line-clamp-2">{provider.bio}</p>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-2">
                    {provider.specializations.slice(0, 2).map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                    {provider.specializations.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{provider.specializations.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Price and Action */}
                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <p className="text-lg font-bold text-gray-900">
                        ₦{provider.price_per_hour.toLocaleString()}
                      </p>
                    </div>
                    <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !loading && filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No professionals found</p>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedService('all');
                setSelectedLocation('all');
                setPriceRange('all');
              }}
              variant="outline"
            >
              Reset Filters
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ServiceProviderDirectory;
