import { useState } from "react";
import { Mail, Phone, MapPin, Edit2, Save, X, Heart, Star, Bookmark, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

export function ClientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Chioma Nwankwo",
    email: "chioma@email.com",
    phone: "+234 803 456 7890",
    location: "Victoria Island, Lagos",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const favorites = [
    {
      id: 1,
      name: "Amaka Okonkwo",
      businessName: "Glam by Amaka",
      category: "Hair Stylist",
      rating: 4.9,
      reviewCount: 342,
      location: "Victoria Island, Lagos",
      avatar: "https://i.imgur.com/H5YdZU9.jpeg",
      services: ["Braids", "Weaves", "Natural Hair"],
    },
    {
      id: 2,
      name: "Blessing Onyeka",
      businessName: "Nail Haven",
      category: "Nail Technician",
      rating: 4.8,
      reviewCount: 156,
      location: "Lekki Phase 1, Lagos",
      avatar: "https://i.imgur.com/otDlO9q.jpeg",
      services: ["Manicure", "Pedicure", "Nail Art"],
    },
    {
      id: 3,
      name: "Zainab Mohammed",
      businessName: "Zainab's Makeup Studio",
      category: "Makeup Artist",
      rating: 4.9,
      reviewCount: 289,
      location: "Ikeja, Lagos",
      avatar: "https://i.imgur.com/u5V476n.jpeg",
      services: ["Bridal Makeup", "Party Makeup"],
    },
  ];

  const savedForLater = [
    {
      id: 1,
      professional: "David Okoro",
      service: "Locs Retwist",
      price: "₦12,000",
      image: "https://i.imgur.com/KZ1zmRr.jpeg",
      savedDate: "2024-11-20",
    },
    {
      id: 2,
      professional: "Fatima Ibrahim",
      service: "Silk Press",
      price: "₦18,000",
      image: "https://i.imgur.com/KyERSSz.jpeg",
      savedDate: "2024-11-18",
    },
  ];

  const myReviews = [
    {
      id: 1,
      professional: "Amaka Okonkwo",
      service: "Braids Installation",
      rating: 5,
      comment: "Absolutely amazing service! The stylist was professional, friendly, and my braids look incredible.",
      date: "2024-11-15",
      avatar: "https://i.imgur.com/H5YdZU9.jpeg",
    },
    {
      id: 2,
      professional: "Funmi Adebayo",
      service: "Party Makeup",
      rating: 5,
      comment: "The makeup artist was so talented! She listened to what I wanted and delivered perfectly.",
      date: "2024-11-10",
      avatar: "https://i.imgur.com/u5V476n.jpeg",
    },
  ];

  const removeFavorite = () => {
    if (confirm("Remove from favorites?")) {
      alert(`Removed from favorites!`);
    }
  };

  const removeFromSaved = () => {
    if (confirm("Remove from saved items?")) {
      alert(`Removed from saved items!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative inline-block">
                  <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-[#3d6a68]">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button className="absolute bottom-4 right-0 bg-[#3d6a68] text-white p-2 rounded-full hover:bg-[#2d5a58]">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <CardDescription className="text-base">{profile.email}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {!isEditing ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="h-5 w-5 text-[#3d6a68]" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="h-5 w-5 text-[#3d6a68]" />
                        <span>{profile.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="h-5 w-5 text-[#3d6a68]" />
                        <span>{profile.location}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-[#3d6a68] hover:bg-[#2d5a58]" 
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-[#3d6a68] hover:bg-[#2d5a58]" 
                        onClick={handleSave}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1" 
                        onClick={handleCancel}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="favorites" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="saved">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Saved
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  My Reviews
                </TabsTrigger>
              </TabsList>

              {/* Favorites Tab */}
              <TabsContent value="favorites" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Favorite Professionals</CardTitle>
                    <CardDescription>Quick access to your preferred beauty professionals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {favorites.map((fav) => (
                      <Card key={fav.id} className="border-2 hover:border-[#3d6a68] transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 border-2 border-[#3d6a68]">
                              <AvatarImage src={fav.avatar} />
                              <AvatarFallback>{fav.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg">{fav.name}</h3>
                                  <p className="text-[#3d6a68]">{fav.businessName}</p>
                                  <Badge variant="outline" className="mt-1">{fav.category}</Badge>
                                </div>
                                <button
                                  onClick={removeFavorite}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Heart className="h-5 w-5 fill-current" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="font-semibold">{fav.rating}</span>
                                <span className="text-gray-600 text-sm">({fav.reviewCount} reviews)</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                <MapPin className="h-4 w-4" />
                                {fav.location}
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {fav.services.map((service, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {service}
                                  </Badge>
                                ))}
                              </div>
                              <Button size="sm" className="bg-[#3d6a68] hover:bg-[#2d5a58]">
                                Book Appointment
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Saved for Later Tab */}
              <TabsContent value="saved" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved for Later</CardTitle>
                    <CardDescription>Services you want to book in the future</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {savedForLater.map((item) => (
                      <Card key={item.id} className="border-2 hover:border-[#3d6a68] transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.service}
                              className="h-20 w-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{item.service}</h3>
                                  <p className="text-gray-600">{item.professional}</p>
                                  <p className="text-[#3d6a68] font-semibold mt-1">{item.price}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Saved on {new Date(item.savedDate).toLocaleDateString('en-NG')}
                                  </p>
                                </div>
                                <button
                                  onClick={removeFromSaved}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </div>
                              <Button size="sm" className="mt-3 bg-[#3d6a68] hover:bg-[#2d5a58]">
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Reviews Tab */}
              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Reviews</CardTitle>
                    <CardDescription>Reviews you have written for professionals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {myReviews.map((review) => (
                      <Card key={review.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={review.avatar} />
                              <AvatarFallback>{review.professional.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold">{review.professional}</h3>
                                  <p className="text-sm text-gray-600">{review.service}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? "text-yellow-500 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2">{review.comment}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(review.date).toLocaleDateString('en-NG', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </p>
                              <div className="flex gap-2 mt-3">
                                <Button variant="outline" size="sm">
                                  <Edit2 className="mr-1 h-3 w-3" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
