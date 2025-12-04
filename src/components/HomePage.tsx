import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ServiceCategoryQuickFind } from './ServiceCategoryQuickFind';

export function HomePage() {
  const navigate = useNavigate();
  const [searchService, setSearchService] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [showServiceSuggestions, setShowServiceSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const services = [
    'Braids',
    'Natural Hair',
    'Haircut',
    "Men's Haircut",
    'Locs',
    'Silk Press',
    'Weaves',
    'Color',
    'Makeup',
    'Eyelashes',
    'Nails',
    'Kids',
  ];

  const locations = [
    'Ikoyi',
    'Victoria Island',
    'Lekki',
    'Ajah',
    'Epe',
    'Badore',
    'Ikorodu',
    'Bariga',
    'Yaba',
    'Surulere',
    'Ikeja',
    'Alimosho',
    'Gbagada',
    'Magodo',
    'Shomolu',
    'Kosofe',
    'Agege',
    'Mushin',
    'Lagos Island',
    'Apapa',
  ];

  const featuredProfessionals = [
    {
      id: 1,
      name: 'Zainab Ahmed',
      service: 'Braids & Natural Hair',
      location: 'Lekki',
      rating: 4.9,
      reviews: 328,
      image: 'https://i.pinimg.com/736x/5b/06/09/5b0609c1a20b48f207ed3d0bc49897ed.jpg',
      price: '₦5,000 - ₦15,000',
    },
    {
      id: 2,
      name: 'Chioma Nwankwo',
      service: 'Makeup & Eyelashes',
      location: 'Victoria Island',
      rating: 4.8,
      reviews: 245,
      image: 'https://i.pinimg.com/1200x/2c/b5/10/2cb5106a48964692fab9fb3280aa9280.jpg',
      price: '₦8,000 - ₦25,000',
    },
    {
      id: 3,
      name: 'Tunde Okafor',
      service: "Men's Haircut & Grooming",
      location: 'Ikoyi',
      rating: 4.9,
      reviews: 412,
      image: 'https://i.pinimg.com/736x/1f/9b/8e/1f9b8ee240289f9754bc801afd1b5808.jpg',
      price: '₦2,500 - ₦7,000',
    },
    {
      id: 4,
      name: 'Adeola Adeyemi',
      service: 'Silk Press & Color',
      location: 'Ajah',
      rating: 4.7,
      reviews: 189,
      image: 'https://i.pinimg.com/1200x/3a/05/97/3a05978b34ec1511fb2ef9e5e6bb302b.jpg',
      price: '₦6,000 - ₦18,000',
    },
  ];

  const allReviews = [
    {
      id: 1,
      name: 'Amara Johnson',
      rating: 5,
      text: 'Pamper Pro makes booking so easy! I found the perfect professional in minutes and had an amazing experience.',
      avatar: '👩‍🦱',
    },
    {
      id: 2,
      name: 'Blessing Okoro',
      rating: 5,
      text: 'The app interface is so intuitive. I loved seeing ratings and reviews before booking. Highly recommend!',
      avatar: '💄',
    },
    {
      id: 3,
      name: 'Tola Adeyemi',
      rating: 5,
      text: 'Great platform! Easy scheduling and the professional arrived on time. Love this service!',
      avatar: '💈',
    },
    {
      id: 4,
      name: 'Nneka Obi',
      rating: 5,
      text: 'Pamper Pro connected me with top-tier professionals. The quality of service is exceptional!',
      avatar: '🌿',
    },
    {
      id: 5,
      name: 'Grace Taiwo',
      rating: 4,
      text: 'Convenient booking process and reliable service. Will definitely use Pamper Pro again!',
      avatar: '✨',
    },
    {
      id: 6,
      name: 'Zainab Musa',
      rating: 5,
      text: 'The Pamper Pro team is responsive and helpful. Customer support is excellent!',
      avatar: '💅',
    },
    {
      id: 7,
      name: 'Folake Balogun',
      rating: 5,
      text: 'I appreciate the transparent pricing on Pamper Pro. No hidden fees, just great service!',
      avatar: '👑',
    },
    {
      id: 8,
      name: 'Stephanie Okonkwo',
      rating: 5,
      text: 'Pamper Pro made it easy to find professionals in my area. Love the location filter!',
      avatar: '🎨',
    },
    {
      id: 9,
      name: 'Precious Ejiro',
      rating: 5,
      text: 'Best booking experience I\'ve had. The app is reliable and the professionals are verified.',
      avatar: '🧵',
    },
    {
      id: 10,
      name: 'Cynthia Uche',
      rating: 4,
      text: 'Pamper Pro has saved me so much time finding beauty services. Fantastic platform!',
      avatar: '✨',
    },
    {
      id: 11,
      name: 'Deborah Adeleke',
      rating: 5,
      text: 'Love the variety of services on Pamper Pro. Something for everyone!',
      avatar: '👩‍🦱',
    },
    {
      id: 12,
      name: 'Melody Okafor',
      rating: 5,
      text: 'Pamper Pro\'s app is user-friendly and the payment process is secure. Highly satisfied!',
      avatar: '💄',
    },
    {
      id: 13,
      name: 'Funke Oluwaseun',
      rating: 5,
      text: 'Reliable professionals, easy booking, and amazing support. Pamper Pro is a game-changer!',
      avatar: '👧',
    },
    {
      id: 14,
      name: 'Jumoke Adebayo',
      rating: 5,
      text: 'The quality of professionals on Pamper Pro is outstanding. I\'m impressed every time!',
      avatar: '🌿',
    },
    {
      id: 15,
      name: 'Iris Nnamdi',
      rating: 4,
      text: 'Pamper Pro makes self-care accessible and affordable. Love this platform!',
      avatar: '💈',
    },
    {
      id: 16,
      name: 'Hanna Ejiro',
      rating: 5,
      text: 'Fast, efficient, and professional. Pamper Pro has become my go-to beauty app!',
      avatar: '✨',
    },
    {
      id: 17,
      name: 'Yvonne Okafor',
      rating: 5,
      text: 'I trust Pamper Pro to connect me with quality professionals. Never disappointed!',
      avatar: '💄',
    },
    {
      id: 18,
      name: 'Ngozi Eze',
      rating: 5,
      text: 'The booking system on Pamper Pro is seamless. Love the flexibility in scheduling!',
      avatar: '👩‍🦱',
    },
    {
      id: 19,
      name: 'Sofia Adejumo',
      rating: 5,
      text: 'Pamper Pro is transforming how I access beauty services. Fantastic experience!',
      avatar: '💅',
    },
    {
      id: 20,
      name: 'Vera Okonkwo',
      rating: 5,
      text: 'Professional, reliable, and convenient. Pamper Pro delivers on every level!',
      avatar: '🌟',
    },
  ];

  const featuredReviews = allReviews.slice(0, 4);
  const carouselReviews = allReviews.slice(4);

  const filteredServices = searchService
    ? services.filter((service) =>
        service.toLowerCase().includes(searchService.toLowerCase())
      )
    : services;

  const filteredLocations = searchLocation
    ? locations.filter((location) =>
        location.toLowerCase().includes(searchLocation.toLowerCase())
      )
    : locations;

  const handleServiceSelect = (service: string) => {
    setSearchService(service);
    setShowServiceSuggestions(false);
  };

  const handleLocationSelect = (location: string) => {
    setSearchLocation(location);
    setShowLocationSuggestions(false);
  };

  const handleSearch = () => {
    // Store search filters in sessionStorage for the Find Professional page
    if (searchService || searchLocation) {
      sessionStorage.setItem('searchFilters', JSON.stringify({
        service: searchService,
        location: searchLocation
      }));
    }
    navigate('/find-professional');
  };

  const handlePreviousReview = () => {
    setCurrentReviewIndex((prev) =>
      prev === 0 ? carouselReviews.length - 1 : prev - 1
    );
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) =>
      prev === carouselReviews.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-700 text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col justify-center">
              <div className="mb-8 sm:mb-10">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-2 leading-tight text-white tracking-tight">
                  Book Local
                </h1>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-amber-300 to-amber-200 bg-clip-text text-transparent">
                  Beauty Pros
                </h1>
              </div>

              <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-3 mb-8 sm:mb-10">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Service, Stylist, Salon"
                    value={searchService}
                    onChange={(e) => {
                      setSearchService(e.target.value);
                      setShowServiceSuggestions(true);
                    }}
                    onFocus={() => setShowServiceSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowServiceSuggestions(false), 200)}
                    className="w-full bg-white rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-gray-900 shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-500"
                  />

                  {showServiceSuggestions && filteredServices.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl z-20 border border-gray-200 max-h-48 overflow-y-auto">
                      {filteredServices.map((service) => (
                        <button
                          key={service}
                          onClick={() => handleServiceSelect(service)}
                          className="w-full text-left px-4 py-2.5 hover:bg-teal-50 text-gray-700 text-sm transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Select Location"
                    value={searchLocation}
                    onChange={(e) => {
                      setSearchLocation(e.target.value);
                      setShowLocationSuggestions(true);
                    }}
                    onFocus={() => setShowLocationSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                    className="w-full bg-white rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-gray-900 shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-500"
                  />

                  {showLocationSuggestions && filteredLocations.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl z-20 border border-gray-200 max-h-48 overflow-y-auto">
                      {filteredLocations.map((location) => (
                        <button
                          key={location}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full text-left px-4 py-2.5 hover:bg-teal-50 text-gray-700 text-sm transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSearch}
                  className="bg-teal-700 hover:bg-teal-900 text-white rounded-xl px-6 sm:px-5 py-3 sm:py-3.5 flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap w-full sm:w-auto"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>

              <p className="text-white mb-6 text-base sm:text-lg font-medium">
                Grow your business with Pamper Pro
              </p>

              <Button
                onClick={() => navigate('/launch-business')}
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-6 sm:px-8 py-3 sm:py-3.5 h-auto text-base sm:text-lg w-fit rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Launch My Business
              </Button>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                src="https://i.imgur.com/qexvQpU.jpeg"
                alt="Professional Beauty Treatment"
                className="rounded-3xl shadow-2xl w-full sm:max-w-md lg:max-w-lg h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Find pros by service</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Connect with Experienced Professionals Tailored to Your Needs</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { name: 'Braids', image: 'https://i.imgur.com/YjhbHX6.jpeg' },
              { name: 'Natural Hair', image: 'https://i.imgur.com/BpH6y6T.jpeg' },
              { name: 'Haircut', image: 'https://i.imgur.com/L4SBI63.jpeg' },
              { name: "Men's Haircut", image: 'https://i.imgur.com/I8StoAu.jpeg' },
              { name: 'Locs', image: 'https://i.imgur.com/gG8q5EE.jpeg' },
              { name: 'Silk Press', image: 'https://i.imgur.com/7t6AXsz.jpeg' },
              { name: 'Weaves', image: 'https://i.imgur.com/AGYjIwr.jpeg' },
              { name: 'Color', image: 'https://i.imgur.com/GKiG5k9.jpeg' },
              { name: 'Makeup', image: 'https://i.imgur.com/4Vo2Ncz.jpeg' },
              { name: 'Eyelashes', image: 'https://i.imgur.com/tUk4oNw.jpeg' },
              { name: 'Nails', image: 'https://i.imgur.com/hrnUh5H.jpeg' },
              { name: 'Kids', image: 'https://i.imgur.com/EArXCzH.jpeg' },
            ].map((service, idx) => (
              <div
                key={idx}
                onClick={() => {
                  sessionStorage.setItem('searchFilters', JSON.stringify({ service: service.name }));
                  navigate('/find-professional');
                }}
                className="group cursor-pointer transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-square bg-gray-200">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <p className="text-center font-semibold text-gray-900 mt-2 sm:mt-3 text-xs sm:text-sm">{service.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Professionals Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Featured Professionals</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Highly rated beauty professionals ready to serve you</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
            {featuredProfessionals.map((professional) => (
              <div
                key={professional.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden group">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-white" />
                    {professional.rating}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{professional.name}</h3>
                  <p className="text-sm text-teal-700 font-semibold mb-2">{professional.service}</p>
                  <p className="text-sm text-gray-600 mb-4">📍 {professional.location}</p>
                  <p className="text-sm text-gray-700 mb-4">
                    <span className="font-semibold">{professional.reviews}</span> reviews
                  </p>
                  <p className="text-lg font-bold text-teal-800 mb-4">{professional.price}</p>
                  <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg py-2 transition-all duration-200">
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => navigate('/find-professional')}
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-8 py-3 sm:py-4 h-auto text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              View All Professionals
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">What people are saying</h2>
            <p className="text-base sm:text-lg text-gray-600">Real Feedback from Our Valued Clients</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
            {featuredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-800 mb-4 leading-relaxed">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-teal-200">
                  <div className="text-2xl sm:text-3xl">{review.avatar}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm sm:text-base">{review.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 sm:p-12 shadow-lg border border-teal-100">
            <h3 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-8">More Reviews</h3>

            <div className="relative">
              <div className="text-center mb-8">
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: carouselReviews[currentReviewIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-lg sm:text-xl text-gray-800 italic mb-6 leading-relaxed">
                  "{carouselReviews[currentReviewIndex].text}"
                </p>

                <div className="flex flex-col items-center gap-3">
                  <div className="text-4xl sm:text-5xl">{carouselReviews[currentReviewIndex].avatar}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-base sm:text-lg">{carouselReviews[currentReviewIndex].name}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8">
                <button
                  onClick={handlePreviousReview}
                  className="bg-teal-700 hover:bg-teal-800 text-white p-2 sm:p-3 rounded-full transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="flex gap-2 flex-wrap justify-center">
                  {carouselReviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReviewIndex(index)}
                      className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                        index === currentReviewIndex
                          ? 'bg-teal-700 w-6 sm:w-8'
                          : 'bg-gray-300 w-2 sm:w-2.5 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextReview}
                  className="bg-teal-700 hover:bg-teal-800 text-white p-2 sm:p-3 rounded-full transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="text-center mt-6 text-sm text-gray-600">
                Review {currentReviewIndex + 1} of {carouselReviews.length}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-teal-700">4.9★</p>
              <p className="text-gray-600 text-sm sm:text-base mt-2">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-teal-700">5K+</p>
              <p className="text-gray-600 text-sm sm:text-base mt-2">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-teal-700">2K+</p>
              <p className="text-gray-600 text-sm sm:text-base mt-2">Professionals</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
