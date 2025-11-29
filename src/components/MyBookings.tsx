import { useState } from 'react';
import { Button } from './ui/button';
import { Calendar, Clock, MapPin, Phone, X, AlertCircle, Bell } from 'lucide-react';

interface Booking {
  id: number;
  professionalName: string;
  service: string;
  date: string;
  time: string;
  location: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  image: string;
  phone: string;
}

interface MyBookingsProps {
  onNavigate?: (page: string) => void;
}

export function MyBookings({ onNavigate }: MyBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      professionalName: 'Amara Johnson',
      service: 'Braids',
      date: '2024-12-15',
      time: '10:00 AM',
      location: 'Lagos Island',
      price: 25000,
      status: 'upcoming',
      image: '/images/service-braids.png',
      phone: '+234 123 456 7890',
    },
    {
      id: 2,
      professionalName: 'Zainab Adeyemi',
      service: 'Silk Press',
      date: '2024-12-10',
      time: '2:00 PM',
      location: 'Victoria Island',
      price: 12000,
      status: 'completed',
      image: '/images/service-silk-press.png',
      phone: '+234 987 654 3210',
    },
  ]);

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [notificationType, setNotificationType] = useState<'sms' | 'email'>('sms');

  const handleReschedule = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowRescheduleModal(true);
  };

  const handleCancel = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handleNotificationSetup = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowNotificationModal(true);
  };

  const confirmReschedule = () => {
    if (selectedBooking && newDate && newTime) {
      const updatedBookings = bookings.map((b) =>
        b.id === selectedBooking.id
          ? { ...b, date: newDate, time: newTime }
          : b
      );
      setBookings(updatedBookings);
      setShowRescheduleModal(false);
      setSelectedBooking(null);
      setNewDate('');
      setNewTime('');
    }
  };

  const confirmCancel = () => {
    if (selectedBooking) {
      const updatedBookings = bookings.map((b) =>
        b.id === selectedBooking.id ? { ...b, status: 'cancelled' as const } : b
      );
      setBookings(updatedBookings);
      setShowCancelModal(false);
      setSelectedBooking(null);
    }
  };

  const confirmNotification = () => {
    alert(
      `Booking reminder set via ${notificationType.toUpperCase()}! You'll receive reminders for this appointment.`
    );
    setShowNotificationModal(false);
    setSelectedBooking(null);
  };

  const upcomingBookings = bookings.filter((b) => b.status === 'upcoming');
  const completedBookings = bookings.filter((b) => b.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Manage your appointments, reschedule, or cancel bookings
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Upcoming Bookings */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Upcoming Appointments ({upcomingBookings.length})
            </h2>

            {upcomingBookings.length > 0 ? (
              <div className="grid gap-6">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-teal-700"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Image */}
                      <div className="md:col-span-1">
                        <img
                          src={booking.image}
                          alt={booking.service}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      </div>

                      {/* Details */}
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {booking.service} with {booking.professionalName}
                        </h3>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString('en-NG', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {booking.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {booking.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {booking.phone}
                          </div>
                        </div>

                        <div className="mt-4 text-lg font-bold text-teal-700">
                          ₦{booking.price.toLocaleString()}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-1 flex flex-col gap-2 justify-center">
                        <Button
                          onClick={() => handleReschedule(booking)}
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                        >
                          Reschedule
                        </Button>
                        <Button
                          onClick={() => handleNotificationSetup(booking)}
                          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                        >
                          <Bell className="w-4 h-4" />
                          Reminder
                        </Button>
                        <Button
                          onClick={() => handleCancel(booking)}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600 text-lg">No upcoming bookings</p>
              </div>
            )}
          </div>

          {/* Completed Bookings */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Completed Appointments ({completedBookings.length})
            </h2>

            {completedBookings.length > 0 ? (
              <div className="grid gap-4">
                {completedBookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-green-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {booking.service} with {booking.professionalName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(booking.date).toLocaleDateString()} at {booking.time}
                        </p>
                      </div>
                      <Button className="bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold">
                        Book Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600 text-lg">No completed bookings</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Reschedule Appointment</h2>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">New Time</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowRescheduleModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmReschedule}
                  className="flex-1 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Cancel Appointment?</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your appointment with{' '}
              <strong>{selectedBooking.professionalName}</strong> on{' '}
              <strong>{new Date(selectedBooking.date).toLocaleDateString()}</strong>?
            </p>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold"
              >
                Keep Appointment
              </Button>
              <Button
                onClick={confirmCancel}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
              >
                Cancel Booking
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Setup Modal */}
      {showNotificationModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Set Booking Reminder</h2>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Get a reminder for your appointment on{' '}
              <strong>{new Date(selectedBooking.date).toLocaleDateString()}</strong>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  How would you like to be reminded?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="sms"
                      checked={notificationType === 'sms'}
                      onChange={(e) => setNotificationType(e.target.value as 'sms')}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-900 font-medium">SMS Reminder</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="email"
                      checked={notificationType === 'email'}
                      onChange={(e) => setNotificationType(e.target.value as 'email')}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-900 font-medium">Email Reminder</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowNotificationModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmNotification}
                  className="flex-1 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold"
                >
                  Set Reminder
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
