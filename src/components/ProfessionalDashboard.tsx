
import { Calendar, Users, DollarSign, Clock, Star, Settings, LogOut, Plus, Edit, Trash2, Eye, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function ProfessionalDashboard() {


  const stats = {
    totalBookings: 156,
    monthlyRevenue: 2450000,
    activeClients: 89,
    avgRating: 4.9,
    pendingBookings: 8,
    completedThisMonth: 34
  };

  const upcomingBookings = [
    {
      id: 1,
      clientName: "Blessing Adeyemi",
      service: "Knotless Braids",
      date: "2024-11-25",
      time: "2:00 PM",
      price: 20000,
      status: "Confirmed",
      phone: "+234 803 123 4567"
    },
    {
      id: 2,
      clientName: "Ngozi Obi",
      service: "Natural Hair Styling",
      date: "2024-11-25",
      time: "4:30 PM",
      price: 12000,
      status: "Pending",
      phone: "+234 805 987 6543"
    },
    {
      id: 3,
      clientName: "Chiamaka Eze",
      service: "Box Braids",
      date: "2024-11-26",
      time: "10:00 AM",
      price: 15000,
      status: "Confirmed",
      phone: "+234 807 456 7890"
    }
  ];

  const services = [
    { id: 1, name: "Box Braids", duration: 180, price: 15000, bookings: 45, active: true },
    { id: 2, name: "Knotless Braids", duration: 240, price: 20000, bookings: 38, active: true },
    { id: 3, name: "Weave Installation", duration: 150, price: 18000, bookings: 32, active: true },
    { id: 4, name: "Natural Hair Styling", duration: 90, price: 12000, bookings: 28, active: true },
    { id: 5, name: "Cornrows", duration: 120, price: 10000, bookings: 13, active: false }
  ];

  const recentReviews = [
    {
      id: 1,
      clientName: "Blessing Adeyemi",
      rating: 5,
      comment: "Absolutely amazing! Best hairstylist in Lagos!",
      date: "2024-11-20",
      service: "Knotless Braids"
    },
    {
      id: 2,
      clientName: "Ngozi Obi",
      rating: 5,
      comment: "Professional and excellent service. Highly recommend!",
      date: "2024-11-18",
      service: "Natural Hair Styling"
    }
  ];

  const monthlyData = [
    { month: "Jun", revenue: 1850000, bookings: 42 },
    { month: "Jul", revenue: 2100000, bookings: 48 },
    { month: "Aug", revenue: 1950000, bookings: 45 },
    { month: "Sep", revenue: 2300000, bookings: 52 },
    { month: "Oct", revenue: 2250000, bookings: 51 },
    { month: "Nov", revenue: 2450000, bookings: 56 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-purple-200">
                <AvatarImage src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80" />
                <AvatarFallback>AO</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Glam by Amaka</h1>
                <p className="text-sm text-gray-600">Professional Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Public Profile
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                  <p className="text-xs text-green-600 mt-1">+12% this month</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">₦{(stats.monthlyRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-green-600 mt-1">+8% this month</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Clients</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeClients}</p>
                  <p className="text-xs text-blue-600 mt-1">+15 new clients</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.avgRating}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">
              Bookings {stats.pendingBookings > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">{stats.pendingBookings}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upcoming Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>Your next appointments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-purple-50 transition-colors duration-200">
                      <Avatar className="h-10 w-10 border-2 border-purple-200">
                        <AvatarFallback>{booking.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <p className="font-semibold">{booking.clientName}</p>
                            <p className="text-sm text-purple-600">{booking.service}</p>
                          </div>
                          <Badge className={
                            booking.status === "Confirmed" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(booking.date).toLocaleDateString('en-NG')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {booking.time}
                          </span>
                          <span className="font-semibold text-gray-900">
                            ₦{booking.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">View All Bookings</Button>
                </CardContent>
              </Card>

              {/* Recent Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>What clients are saying</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.clientName}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('en-NG')}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs mb-2">{review.service}</Badge>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">View All Reviews</Button>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Last 6 months performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{data.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">{data.bookings} bookings</span>
                          <span className="font-semibold">₦{(data.revenue / 1000).toFixed(0)}K</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(data.revenue / 2500000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Bookings</CardTitle>
                    <CardDescription>Manage your appointments</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="mr-2 h-4 w-4" />
                    New Booking
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="border-2 border-purple-100">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border-2 border-purple-200">
                          <AvatarFallback>{booking.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{booking.clientName}</h3>
                              <p className="text-purple-600">{booking.service}</p>
                              <p className="text-sm text-gray-600">{booking.phone}</p>
                            </div>
                            <Badge className={
                              booking.status === "Confirmed" 
                                ? "bg-green-100 text-green-700" 
                                : "bg-yellow-100 text-yellow-700"
                            }>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="grid sm:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(booking.date).toLocaleDateString('en-NG')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {booking.time}
                            </div>
                            <div className="font-semibold text-gray-900">
                              ₦{booking.price.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {booking.status === "Pending" && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <CheckCircle className="mr-1 h-4 w-4" />
                                  Confirm
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <XCircle className="mr-1 h-4 w-4" />
                                  Decline
                                </Button>
                              </>
                            )}
                            {booking.status === "Confirmed" && (
                              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Mark Complete
                              </Button>
                            )}
                            <Button size="sm" variant="outline">Edit</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Services</CardTitle>
                    <CardDescription>Manage your service offerings</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.map((service) => (
                  <Card key={service.id} className="border-2 border-gray-100">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{service.name}</h3>
                            <Badge variant={service.active ? "default" : "secondary"}>
                              {service.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <div className="grid sm:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Duration</p>
                              <p className="font-semibold">{service.duration} mins</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Price</p>
                              <p className="font-semibold">₦{service.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Total Bookings</p>
                              <p className="font-semibold">{service.bookings}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="icon" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Services</CardTitle>
                  <CardDescription>Most booked services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.slice(0, 4).map((service, index) => (
                      <div key={service.id} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{index + 1}. {service.name}</span>
                          <span className="font-semibold">{service.bookings} bookings</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                            style={{ width: `${(service.bookings / 50) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>This month vs last month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.completedThisMonth}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700">+12%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">₦{(stats.monthlyRevenue / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700">+8%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">New Clients</p>
                      <p className="text-2xl font-bold text-gray-900">15</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700">+25%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Profile</CardTitle>
                <CardDescription>Update your business information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" defaultValue="Glam by Amaka" />
                  </div>
                  <div>
                    <Label htmlFor="owner-name">Your Name</Label>
                    <Input id="owner-name" defaultValue="Amaka Okonkwo" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" rows={4} defaultValue="Passionate hair stylist specializing in natural hair care, braids, and weave installations." />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+234 803 123 4567" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="amaka@glambyamaka.com" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Ahmadu Bello Way, Victoria Island, Lagos" />
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Current plan: Elite - ₦25,000/month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                  <div>
                    <p className="font-semibold text-lg">Elite Plan</p>
                    <p className="text-sm text-gray-600">All premium features included</p>
                  </div>
                  <Button variant="outline">Manage Plan</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
