import { useState } from "react";
import { User, Phone, MapPin, Heart, Loader, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ClientProfileCompletionProps {
  email: string;
  firstName: string;
  lastName: string;
  onComplete: (profileData: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    location: string;
    bio: string;
    preferences: string[];
  }) => void;
  isLoading?: boolean;
  error?: string;
}

const BEAUTY_SERVICES = [
  "Hair Styling",
  "Makeup",
  "Nails",
  "Eyelashes",
  "Haircut",
  "Color Treatment",
  "Braids",
  "Wigs",
  "Skincare",
  "Body Treatment"
];

export function ClientProfileCompletion({
  email,
  firstName,
  lastName,
  onComplete,
  isLoading = false,
  error: externalError = ""
}: ClientProfileCompletionProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [localError, setLocalError] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const [profileData, setProfileData] = useState({
    phone: "",
    location: "",
    bio: ""
  });

  const togglePreference = (service: string) => {
    setSelectedPreferences(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Optional validation - phone and location are not required
    if (profileData.phone && !/^[\d\-\s\+\(\)]{7,}$/.test(profileData.phone)) {
      setLocalError("Please enter a valid phone number");
      return;
    }

    setIsCompleting(true);

    // Simulate profile creation
    await new Promise(resolve => setTimeout(resolve, 1500));

    onComplete({
      email,
      firstName,
      lastName,
      phone: profileData.phone,
      location: profileData.location,
      bio: profileData.bio,
      preferences: selectedPreferences
    });

    setIsCompleting(false);
  };

  const handleSkip = async () => {
    setIsCompleting(true);

    // Simulate profile creation with minimal data
    await new Promise(resolve => setTimeout(resolve, 1000));

    onComplete({
      email,
      firstName,
      lastName,
      phone: "",
      location: "",
      bio: "",
      preferences: []
    });

    setIsCompleting(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-gray-200">
      <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <User className="h-6 w-6" />
          <div>
            <h2 className="text-2xl font-bold">Complete Your Profile</h2>
            <p className="text-sm text-pink-100">Help us personalize your experience</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Error Messages */}
        {(externalError || localError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {externalError || localError}
          </div>
        )}

        {/* Welcome Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            Welcome <span className="font-semibold">{firstName} {lastName}</span>! Let&apos;s get your profile set up so you can start booking services.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="pl-10"
                  disabled={isCompleting || isLoading}
                />
              </div>
              <p className="text-xs text-gray-600">Professionals can use this to contact you about bookings</p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Location (Optional)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="City, State or Address"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  className="pl-10"
                  disabled={isCompleting || isLoading}
                />
              </div>
              <p className="text-xs text-gray-600">Helps professionals find you and offer nearby services</p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">About You (Optional)</label>
              <textarea
                placeholder="Tell us a bit about yourself, your beauty preferences, or what services you're interested in..."
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                maxLength={500}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 resize-none"
                rows={4}
                disabled={isCompleting || isLoading}
              />
              <p className="text-xs text-gray-600">{profileData.bio.length}/500 characters</p>
            </div>
          </div>

          {/* Service Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              What services interest you? (Optional)
            </h3>
            <p className="text-sm text-gray-600">
              Select services you&apos;re interested in to get personalized recommendations
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BEAUTY_SERVICES.map(service => (
                <button
                  key={service}
                  type="button"
                  onClick={() => togglePreference(service)}
                  disabled={isCompleting || isLoading}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    selectedPreferences.includes(service)
                      ? "border-pink-600 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300 bg-white"
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">{service}</span>
                </button>
              ))}
            </div>

            {selectedPreferences.length > 0 && (
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                <p className="text-xs text-pink-800">
                  <span className="font-semibold">{selectedPreferences.length}</span> {selectedPreferences.length === 1 ? "service" : "services"} selected
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isCompleting || isLoading}
              className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 disabled:opacity-50"
            >
              {isCompleting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="h-5 w-5 animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Complete Setup
                </span>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleSkip}
              disabled={isCompleting || isLoading}
              variant="outline"
              className="flex-1"
            >
              Skip for Now
            </Button>
          </div>

          <p className="text-xs text-gray-600 text-center">
            You can update your profile anytime from your dashboard
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
