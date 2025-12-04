import React, { useState } from 'react';
import { Star, MapPin, Phone, Mail, Calendar, Clock, Heart, Share2, MessageCircle, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

interface Portfolio {
  id: number;
  title: string;
  image: string;
  service: string;
}

const ServiceProviderProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Mock provider data - in production, fetch based on ID
  const provider = {
    id: 1,
    name: 'Amara Beauty Studio',
    service_type: 'Hair & Makeup',
    location: 'Lagos Island, Lagos',
    rating: 4.8,
    reviews_count: 245,
    price_per_hour: 15000,
    image_url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&h=600&fit=crop',
    is_verified: true,
    bio: 'Professional hair styling and makeup for all occasions with 10+ years of experience',
    phone: '+234 801 234 5678',
    email: 'info@amarastudio.com',
    website: 'www.amarastudio.com',
    response_time: '2 hours',
    response_rate: '98%',
    member_since: 'January 2018',
    total_bookings: '1,200+',
    specializations: ['Bridal Makeup', 'Hair Braiding', 'Natural Hair Care', 'Wig Installation', 'Hair Treatment'],
    services: [
      { name: 'Bridal Makeup', price: 25000, duration: '2 hours' },
      { name: 'Hair Braiding', price: 18000, duration: '3-4 hours' },
      { name: 'Makeover Package', price: 35000, duration: '3 hours' },
      { name: 'Hair Treatment', price: 12000, duration: '1.5 hours' },
      { name: 'Event Makeup', price: 20000, duration: '1.5 hours' },
    ],
    working_hours: { start: '9:00 AM', end: '8:00 PM' },
    languages: ['English', 'Yoruba'],
  };

  const reviews: Review[] = [
    {
      id: 1,
      author: 'Chioma O.',
      rating: 5,
      comment: 'Absolutely stunning bridal makeup! Amara was professional and made me feel beautiful on my special day.',
      date: 'March 15, 2024',
      service: 'Bridal Makeup',
    },
    {
      id: 2,
      author: 'Blessing N.',
      rating: 5,
      comment: 'Best hair braiding experience ever. The work is impeccable and lasted for months!',
      date: 'March 10, 2024',
      service: 'Hair Braiding',
    },
    {
      id: 3,
      author: 'Tunde M.',
      rating: 4,
      comment: 'Great service and very attentive to details. Highly recommended!',
      date: 'March 5, 2024',
      service: 'Hair Treatment',
    },
    {
      id: 4,
      author: 'Zainab K.',
      rating: 5,
      comment: 'Professional, punctual, and talented. Will definitely book again for my next event.',
      date: 'February 28, 2024',
      service: 'Event Makeup',
    },
  ];

  const portfolio: Portfolio[] = [
    {
      id: 1,
      title: 'Bridal Makeup Collection',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
      service: 'Bridal Makeup',
    },
    {
      id: 2,
      title: 'Natural Hair Styles',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      service: 'Hair Braiding',
    },
    {
      id: 3,
      title: 'Event Makeup',
      image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&h=300&fit=crop',
      service: 'Event Makeup',
    },
    {
      id: 4,
      title: 'Hair Transformation',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c006205c?w=400&h=300&fit=crop',
      service: 'Hair Treatment',
    },
  ];

  const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-6 font-medium transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Directory
        </button>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Main Image */}
          <div className="md:col-span-2">
            <div className="relative rounded-xl overflow-hidden h-96 shadow-lg">
              <img
                src={provider.image_url}
                alt={provider.name}
                className="w-full h-full object-cover"
              />
              {provider.is_verified && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  ✓ Verified Professional
                </div>
              )}
            </div>
          </div>

          {/* Quick Info Card */}
          <Card className="h-fit shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-2xl text-gray-900">{provider.name}</CardTitle>
                  <CardDescription className="text-pink-600 font-medium text-base">
                    {provider.service_type}
                  </CardDescription>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? 'fill-pink-600 text-pink-600' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
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
                <span className="font-semibold text-gray-900">{provider.rating}</span>
                <span className="text-gray-500 text-sm">({provider.reviews_count} reviews)</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4 text-pink-600" />
                {provider.location}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Phone className="w-4 h-4 text-pink-600" />
                  {provider.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Mail className="w-4 h-4 text-pink-600" />
                  {provider.email}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 py-4 border-t border-gray-200 text-center text-sm">
                <div>
                  <p className="font-semibold text-gray-900">{provider.response_rate}</p>
                  <p className="text-gray-500">Response Rate</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{provider.response_time}</p>
                  <p className="text-gray-500">Response Time</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="about" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600">{provider.bio}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.specializations.map((spec, idx) => (
                      <span
                        key={idx}
                        className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-2xl font-bold text-pink-600">{provider.total_bookings}</p>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-pink-600">{provider.member_since}</p>
                    <p className="text-sm text-gray-600">Member Since</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-pink-600">{provider.response_rate}</p>
                    <p className="text-sm text-gray-600">Response Rate</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-pink-600flex items-center gap-1">{provider.rating} <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /></p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                  <p className="text-gray-600">{provider.languages.join(', ')}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Working Hours</h3>
                  <p className="text-gray-600">
                    {provider.working_hours.start} - {provider.working_hours.end}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Services & Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {provider.services.map((service, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {service.duration}
                        </p>
                      </div>
                      <p className="font-bold text-pink-600 text-lg">₦{service.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.service}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{review.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded inline-block mb-3">
                    {review.service}
                  </p>
                  <p className="text-gray-600">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
