import { Calendar, Clock, MapPin, Star, User, Heart, History, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function ClientDashboard() {
  const upcomingBookings = [
    {
      id: 1,
      professional: "Amaka Okonkwo",
      service: "Braids Installation",
      date: "2024-11-25",
      time: "2:00 PM",
      price: 15000,
      location: "Victoria Island, Lagos",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
      status: "Confirmed"
    },
    {
      id: 2,
      professional: "Chidi Eze",
      service: "Haircut & Beard Styling",
      date: "2024-11-28",
      time: "11:00 AM",
      price: 8000,
      location: "Lekki Phase 1, Lagos",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      status: "Pending"
    }
  ];

  const pastBookings = [
    {
      id: 3,
      professional: "Funmi Adebayo",
      service: "Party Makeup",
      date: "2024-11-15",
      time: "3:00 PM",
      price: 25000,
      location: "Ikeja GRA, Lagos",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      status: "Completed",
      rated: true
    }
  ];

  const favorites = [
    {
      id: 1,
      name: "Amaka Okonkwo",
      businessName: "Glam by Amaka",
      category: "Hair Stylist",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80"
    },
    {
      id: 2,
      name: "Blessing Onyeka",
      businessName: "Nail Haven",
      category: "Nail Technician",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your bookings and preferences.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-purple-200">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle>Chioma Nwankwo</CardTitle>
                <CardDescription>chioma@email.com</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList>
                <TabsTrigger value="upcoming">
                  <Calendar className="mr-2 h-4 w-4" />
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="history">
                  <History className="mr-2 h-4 w-4" />
                  History
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled bookings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="border-2 border-purple-100">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 border-2 border-purple-200">
                              <AvatarImage src={booking.avatar} />
                              <AvatarFallback>{booking.professional.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg">{booking.professional}</h3>
                                  <p className="text-purple-600">{booking.service}</p>
                                </div>
                                <Badge className={
                                  booking.status === "Confirmed" 
                                    ? "bg-green-100 text-green-700" 
                                    : "bg-yellow-100 text-yellow-700"
                                }>
                                  {booking.status}
                                </Badge>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(booking.date).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {booking.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {booking.location}
                                </div>
                                <div className="font-semibold text-gray-900">
                                  ₦{booking.price.toLocaleString()}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => alert('Reschedule feature: Choose new date and time. SMS & Email confirmation will be sent.')}>Reschedule</Button>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => {if(confirm('Are you sure you want to cancel this booking? You will receive a cancellation confirmation via SMS and email.')) alert('Booking cancelled. Confirmation sent via SMS and email.');}}>Cancel</Button>
                                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={() => alert('Opening Google Maps directions...')}>
                                  Get Directions
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

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking History</CardTitle>
                    <CardDescription>Your past appointments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pastBookings.map((booking) => (
                      <Card key={booking.id} className="border-2 border-gray-100">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 border-2 border-gray-200">
                              <AvatarImage src={booking.avatar} />
                              <AvatarFallback>{booking.professional.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg">{booking.professional}</h3>
                                  <p className="text-purple-600">{booking.service}</p>
                                </div>
                                <Badge className="bg-gray-100 text-gray-700">
                                  {booking.status}
                                </Badge>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(booking.date).toLocaleDateString('en-NG')}
                                </div>
                                <div className="font-semibold text-gray-900">
                                  ₦{booking.price.toLocaleString()}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                  Book Again
                                </Button>
                                {!booking.rated && (
                                  <Button variant="outline" size="sm">
                                    <Star className="mr-1 h-4 w-4" />
                                    Leave Review
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Professionals</CardTitle>
                    <CardDescription>Your saved beauty experts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {favorites.map((fav) => (
                      <Card key={fav.id} className="border-2 border-pink-100">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-2 border-pink-200">
                              <AvatarImage src={fav.avatar} />
                              <AvatarFallback>{fav.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{fav.name}</h3>
                              <p className="text-purple-600 text-sm">{fav.businessName}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">{fav.category}</Badge>
                                <div className="flex items-center gap-1 text-sm">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  {fav.rating}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="icon" variant="outline" className="text-red-500 hover:text-red-600" onClick={() => alert('Removed from favorites')}>
                                <Heart className="h-4 w-4 fill-red-500" />
                              </Button>
                              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex-1">
                                <Calendar className="mr-2 h-4 w-4" />
                                Book
                              </Button>
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
