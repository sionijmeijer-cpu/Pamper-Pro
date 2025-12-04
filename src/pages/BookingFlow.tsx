import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Mail, ChevronLeft, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useNavigate } from 'react-router-dom';

interface BookingStep {
  step: number;
  title: string;
  description: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const BookingFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  // Mock data
  const provider = {
    name: 'Amara Beauty Studio',
    service_type: 'Hair & Makeup',
    rating: 4.8,
    price_per_hour: 15000,
  };

  const services = [
    { id: 'bridal', name: 'Bridal Makeup', price: 25000, duration: '2 hours' },
    { id: 'braiding', name: 'Hair Braiding', price: 18000, duration: '3-4 hours' },
    { id: 'makeover', name: 'Makeover Package', price: 35000, duration: '3 hours' },
    { id: 'treatment', name: 'Hair Treatment', price: 12000, duration: '1.5 hours' },
    { id: 'event', name: 'Event Makeup', price: 20000, duration: '1.5 hours' },
  ];

  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const getTimeSlots = (): TimeSlot[] => {
    return [
      { time: '9:00 AM', available: true },
      { time: '10:00 AM', available: true },
      { time: '11:00 AM', available: false },
      { time: '1:00 PM', available: true },
      { time: '2:00 PM', available: true },
      { time: '3:00 PM', available: true },
      { time: '4:00 PM', available: false },
      { time: '5:00 PM', available: true },
    ];
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const timeSlots = getTimeSlots();
  const availableDates = getAvailableDates();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return !!selectedService;
      case 2:
        return !!selectedDate && !!selectedTime;
      case 3:
        return bookingData.firstName && bookingData.email && bookingData.phone;
      default:
        return false;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const steps: BookingStep[] = [
    { step: 1, title: 'Select Service', description: 'Choose the service you want' },
    { step: 2, title: 'Choose Date & Time', description: 'Pick your preferred appointment time' },
    { step: 3, title: 'Your Details', description: 'Provide your contact information' },
    { step: 4, title: 'Confirmation', description: 'Review and confirm your booking' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-6 font-medium transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Provider Info Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{provider.name}</h2>
              <p className="text-gray-600 text-sm">{provider.service_type}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Booking for</p>
              <p className="text-2xl font-bold text-pink-600">₦{selectedServiceData?.price.toLocaleString() || provider.price_per_hour.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, idx) => (
              <div key={step.step} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${
                      currentStep >= step.step
                        ? 'bg-pink-600'
                        : 'bg-gray-300'
                    }`}
                  >
                    {currentStep > step.step ? '✓' : step.step}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        currentStep > step.step ? 'bg-pink-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-900 mt-2">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select Service */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Service</CardTitle>
              <CardDescription>Choose the service you'd like to book</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedService === service.id
                      ? 'border-pink-600 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </p>
                    </div>
                    <p className="font-bold text-pink-600">₦{service.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Choose Date & Time */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose your preferred appointment date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {availableDates.map(date => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg border-2 transition-all text-center text-sm font-medium ${
                        selectedDate === date
                          ? 'border-pink-600 bg-pink-600 text-white'
                          : 'border-gray-200 hover:border-pink-300 text-gray-900 hover:bg-pink-50'
                      }`}
                    >
                      {formatDate(date).split(' ').map((part, i) => (
                        <div key={i} className="text-xs">
                          {part}
                        </div>
                      ))}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Time</CardTitle>
                <CardDescription>Choose your preferred appointment time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map(slot => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border-2 transition-all font-medium ${
                        !slot.available
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : selectedTime === slot.time
                          ? 'border-pink-600 bg-pink-600 text-white'
                          : 'border-gray-200 hover:border-pink-300 text-gray-900 hover:bg-pink-50'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Your Details */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
              <CardDescription>Please provide your contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">First Name</label>
                  <Input
                    type="text"
                    name="firstName"
                    value={bookingData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Last Name</label>
                  <Input
                    type="text"
                    name="lastName"
                    value={bookingData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 801 234 5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Special Requests (Optional)</label>
                <textarea
                  name="specialRequests"
                  value={bookingData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Let us know if you have any special requests..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <Card>
            <CardContent className="pt-12">
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600">Your appointment has been successfully scheduled</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Service</p>
                    <p className="font-semibold text-gray-900">{selectedServiceData?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Price</p>
                    <p className="font-semibold text-gray-900">₦{selectedServiceData?.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="font-semibold text-gray-900">{selectedDate && formatDate(selectedDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Time</p>
                    <p className="font-semibold text-gray-900">{selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="font-semibold text-gray-900">{bookingData.firstName} {bookingData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{bookingData.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-900">
                  A confirmation email has been sent to <span className="font-semibold">{bookingData.email}</span>. 
                  You can manage your booking from your dashboard.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            variant="outline"
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="flex gap-4">
            {currentStep < 4 && (
              <>
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceedToNext()}
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Continue
                </Button>
              </>
            )}
            {currentStep === 4 && (
              <>
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                >
                  Go to Dashboard
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Back to Home
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
