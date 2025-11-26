import { useState } from "react";
import { User, Phone, MapPin, Settings, Heart, Calendar, Edit2, Save, X, Loader, Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ClientProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  preferences: string[];
  bio: string;
}

interface ClientProfileManagementProps {
  profile?: ClientProfile;
  onUpdateProfile?: (profile: ClientProfile) => void;
  onLogout?: () => void;
  isLoading?: boolean;
}

const PREFERENCE_OPTIONS = [
  "Hair Services",
  "Nail Services",
  "Makeup Services",
  "Skincare",
  "Body Treatment",
  "Waxing",
  "Lashes & Brows",
  "Massage"
];

export function ClientProfileManagement({
  profile = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    preferences: ["Hair Services", "Nail Services"],
    bio: "Beauty enthusiast looking for quality services"
  },
  onUpdateProfile,
  onLogout,
  isLoading = false
}: ClientProfileManagementProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [editedProfile, setEditedProfile] = useState<ClientProfile>(profile);

  const handlePreferenceToggle = (pref: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editedProfile.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!editedProfile.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!editedProfile.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!editedProfile.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!editedProfile.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!editedProfile.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!editedProfile.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) {
      return;
    }

    setSaveMessage("");
    try {
      onUpdateProfile?.(editedProfile);
      setSaveMessage("Profile updated successfully!");
      setIsEditing(false);

      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error saving profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <Check className="h-5 w-5 flex-shrink-0" />
            <span>{saveMessage}</span>
          </div>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="flex items-center justify-between bg-gray-50 border-b">
                <h2 className="text-2xl font-bold">Personal Information</h2>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </CardHeader>

              <CardContent className="p-6">
                {isEditing ? (
                  <div className="space-y-6">
                    {/* Name Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">First Name</label>
                        <Input
                          type="text"
                          value={editedProfile.firstName}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, firstName: e.target.value })
                          }
                          className={errors.firstName ? "border-red-500" : ""}
                          disabled={isLoading}
                        />
                        {errors.firstName && (
                          <p className="text-red-600 text-xs">{errors.firstName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Last Name</label>
                        <Input
                          type="text"
                          value={editedProfile.lastName}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, lastName: e.target.value })
                          }
                          className={errors.lastName ? "border-red-500" : ""}
                          disabled={isLoading}
                        />
                        {errors.lastName && (
                          <p className="text-red-600 text-xs">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Email (Read-only) */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                      <Input
                        type="email"
                        value={editedProfile.email}
                        disabled={true}
                        className="bg-gray-100"
                      />
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={editedProfile.phone}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, phone: e.target.value })
                        }
                        className={errors.phone ? "border-red-500" : ""}
                        disabled={isLoading}
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-xs">{errors.phone}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Address
                      </label>
                      <Input
                        type="text"
                        placeholder="123 Main Street"
                        value={editedProfile.address}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, address: e.target.value })
                        }
                        className={errors.address ? "border-red-500" : ""}
                        disabled={isLoading}
                      />
                      {errors.address && (
                        <p className="text-red-600 text-xs">{errors.address}</p>
                      )}
                    </div>

                    {/* City, State, Zip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">City</label>
                        <Input
                          type="text"
                          placeholder="New York"
                          value={editedProfile.city}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, city: e.target.value })
                          }
                          className={errors.city ? "border-red-500" : ""}
                          disabled={isLoading}
                        />
                        {errors.city && (
                          <p className="text-red-600 text-xs">{errors.city}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">State</label>
                        <Input
                          type="text"
                          placeholder="NY"
                          value={editedProfile.state}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, state: e.target.value })
                          }
                          className={errors.state ? "border-red-500" : ""}
                          disabled={isLoading}
                          maxLength={2}
                        />
                        {errors.state && (
                          <p className="text-red-600 text-xs">{errors.state}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Zip Code</label>
                        <Input
                          type="text"
                          placeholder="10001"
                          value={editedProfile.zipCode}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, zipCode: e.target.value })
                          }
                          className={errors.zipCode ? "border-red-500" : ""}
                          disabled={isLoading}
                        />
                        {errors.zipCode && (
                          <p className="text-red-600 text-xs">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Bio</label>
                      <textarea
                        placeholder="Tell us about yourself..."
                        value={editedProfile.bio}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, bio: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        disabled={isLoading}
                      />
                    </div>

                    {/* Preferences */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Service Preferences
                      </label>
                      <p className="text-xs text-gray-600">Select the beauty services you are interested in</p>
                      <div className="grid grid-cols-2 gap-2">
                        {PREFERENCE_OPTIONS.map((pref) => (
                          <label
                            key={pref}
                            className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={editedProfile.preferences.includes(pref)}
                              onChange={() => handlePreferenceToggle(pref)}
                              disabled={isLoading}
                              className="w-4 h-4 rounded"
                            />
                            <span className="text-sm text-gray-700">{pref}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      >
                        {isLoading ? (
                          <>
                            <Loader className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        disabled={isLoading}
                        className="flex items-center gap-2 flex-1"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">First Name</p>
                        <p className="text-lg text-gray-900">{profile.firstName}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Last Name</p>
                        <p className="text-lg text-gray-900">{profile.lastName}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                      <p className="text-lg text-gray-900">{profile.email}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        Phone
                      </p>
                      <p className="text-lg text-gray-900">{profile.phone}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        Address
                      </p>
                      <p className="text-lg text-gray-900">
                        {profile.address}
                        <br />
                        {profile.city}, {profile.state} {profile.zipCode}
                      </p>
                    </div>

                    {profile.bio && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Bio</p>
                        <p className="text-gray-700">{profile.bio}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                        <Settings className="h-3 w-3" />
                        Preferences
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profile.preferences.map((pref) => (
                          <span
                            key={pref}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader className="bg-gray-50 border-b">
                <h2 className="text-2xl font-bold">Booking History</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-4">No bookings yet</p>
                  <p className="text-gray-500 text-sm mb-6">Start by exploring beauty professionals and booking your first service</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Browse Professionals
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card>
              <CardHeader className="bg-gray-50 border-b">
                <h2 className="text-2xl font-bold">Saved Favorites</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-4">No saved favorites yet</p>
                  <p className="text-gray-500 text-sm mb-6">Save your favorite professionals to easily book with them later</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Browse Professionals
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
