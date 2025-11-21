import { MapPin, Star, Clock, Award, Heart, Share2, Calendar, Phone, Mail, Instagram } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function ProfessionalProfile() {
  const professional = {
    id: 1,
    name: "Amaka Okonkwo",
    businessName: "Glam by Amaka",
    category: "Hair Stylist",
    location: "Victoria Island, Lagos",
    address: "123 Ahmadu Bello Way, Victoria Island, Lagos",
    phone: "+234 803 123 4567",
    email: "amaka@glambyamaka.com",
    instagram: "@glambyamaka",
    rating: 4.9,
    reviewCount: 342,
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
    verified: true,
    tier: "Elite",
    experience: "8 years",
    bio: "Passionate hair stylist specializing in natural hair care, braids, and weave installations. I believe every woman deserves to feel beautiful and confident. With 8 years of experience and hundreds of satisfied clients, I'm committed to delivering exceptional service every time.",
    coordinates: { lat: 6.4281, lng: 3.4219 }
  };

  const services = [
    { id: 1, name: "Box Braids", duration: 180, price: 15000, description: "Classic box braids with premium extensions" },
    { id: 2, name: "Knotless Braids", duration: 240, price: 20000, description: "Protective style with natural-looking finish" },
    { id: 3, name: "Weave Installation", duration: 150, price: 18000, description: "Professional sew-in with closure or frontal" },
    { id: 4, name: "Natural Hair Styling", duration: 90, price: 12000, description: "Wash, deep condition, and style" },
    { id: 5, name: "Cornrows", duration: 120, price: 10000, description: "Neat cornrows in various patterns" }
  ];

  const portfolioImages = [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80",
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80"
  ];

  const reviews = [
    {
      id: 1,
      clientName: "Blessing Adeyemi",
      rating: 5,
      date: "2024-11-15",
      comment: "Amaka is absolutely amazing! My braids came out perfect and she was so gentle. Best hairstylist in Lagos!",
      service: "Knotless Braids",
      verified: true
    },
    {
      id: 2,
      clientName: "Ngozi Obi",
      rating: 5,
      date: "2024-11-10",
      comment: "Professional, clean salon, and excellent service. She really knows her craft. Highly recommend!",
      service: "Natural Hair Styling",
      verified: true
    },
    {
      id: 3,
      clientName: "Chiamaka Eze",
      rating: 5,
      date: "2024-11-05",
      comment: "I've been going to Amaka for 2 years and she never disappoints. My go-to stylist!",
      service: "Box Braids",
      verified: true
    }
  ];

  const availability = {
    Monday: "9:00 AM - 6:00 PM",
    Tuesday: "9:00 AM - 6:00 PM",
    Wednesday: "9:00 AM - 6:00 PM",
    Thursday: "9:00 AM - 6:00 PM",
    Friday: "9:00 AM - 7:00 PM",
    Saturday: "10:00 AM - 8:00 PM",
    Sunday: "Closed"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Cover Image */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={professional.coverImage}
          alt={professional.businessName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Professional Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto flex items-end gap-6">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
              <AvatarImage src={professional.avatar} alt={professional.name} />
              <AvatarFallback>{professional.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-white pb-2">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold">{professional.businessName}</h1>
                {professional.verified && (
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                    <Award className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                <Badge className="bg-white/90 text-purple-700 border-0 font-semibold">
                  {professional.tier}
                </Badge>
              </div>
              <p className="text-xl mb-1">{professional.name}</p>
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                  {professional.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{professional.rating}</span>
                  <span className="opacity-90">({professional.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {professional.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium">{professional.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-sm">{professional.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Instagram className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Instagram</p>
                    <p className="font-medium">{professional.instagram}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-medium text-sm">{professional.address}</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mt-4">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(availability).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="font-medium">{day}</span>
                      <span className={hours === "Closed" ? "text-red-600" : "text-gray-600"}>{hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Map View</p>
                    <p className="text-xs text-gray-500">{professional.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About {professional.businessName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{professional.bio}</p>
                    <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="font-semibold text-lg">{professional.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Reviews</p>
                        <p className="font-semibold text-lg">{professional.reviewCount}+</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rating</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-lg">{professional.rating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Membership</p>
                        <p className="font-semibold text-lg">{professional.tier}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-4">
                {services.map((service) => (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {service.duration} mins
                            </div>
                            <div className="font-semibold text-xl text-gray-900">
                              ₦{service.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 ml-4">
                          <Calendar className="mr-2 h-4 w-4" />
                          Book
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="portfolio">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio</CardTitle>
                    <CardDescription>Recent work by {professional.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {portfolioImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                        >
                          <img
                            src={image}
                            alt={`Portfolio ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Reviews</CardTitle>
                    <CardDescription>{professional.reviewCount} verified reviews</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{review.clientName}</p>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('en-NG')}</p>
                        </div>
                        <Badge variant="secondary" className="mb-2 text-xs">{review.service}</Badge>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Starting from</p>
            <p className="text-2xl font-bold text-gray-900">₦10,000</p>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl">
            <Calendar className="mr-2 h-5 w-5" />
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
