import { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface SearchWithAutocompleteProps {
  onSearch: () => void;
}

const SERVICE_SUGGESTIONS = [
  "Braids", "Box Braids", "Cornrows", "Knotless Braids", "Natural Hair Styling",
  "Hair Cut", "Men's Haircut", "Barber", "Locs", "Loc Maintenance", "Silk Press",
  "Weave Installation", "Wig Installation", "Eyelashes", "Eyelash Extensions",
  "Nails", "Manicure", "Pedicure", "Gel Nails", "Acrylic Nails", "Hair Color",
  "Highlights", "Kids Haircut", "Makeup", "Bridal Makeup", "Party Makeup",
];

const LAGOS_LOCATIONS = [
  "Victoria Island", "Lekki Phase 1", "Lekki Phase 2", "Ajah", "Ikoyi", "Ikeja",
  "Ikeja GRA", "Surulere", "Yaba", "Gbagada", "Maryland", "Anthony", "Oregun",
  "Magodo", "Ojodu", "Berger", "Isheri", "Oshodi", "Mushin", "Apapa", "Festac",
  "Amuwo Odofin", "Badagry", "Epe", "Ikorodu", "Alimosho", "Agege", "Ikotun",
  "Egbeda", "Idimu", "Isolo", "Ejigbo", "Lagos Island", "Marina", "CMS",
];

export function SearchWithAutocomplete({ onSearch }: SearchWithAutocompleteProps) {
  const [serviceQuery, setServiceQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [showServiceSuggestions, setShowServiceSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredServices, setFilteredServices] = useState<string[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);

  const serviceInputRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        serviceInputRef.current &&
        !serviceInputRef.current.contains(event.target as Node)
      ) {
        setShowServiceSuggestions(false);
      }
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target as Node)
      ) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServiceChange = (value: string) => {
    setServiceQuery(value);
    if (value.trim()) {
      const filtered = SERVICE_SUGGESTIONS.filter((service) =>
        service.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredServices(filtered.slice(0, 5));
      setShowServiceSuggestions(true);
    } else {
      setShowServiceSuggestions(false);
    }
  };

  const handleLocationChange = (value: string) => {
    setLocationQuery(value);
    if (value.trim()) {
      const filtered = LAGOS_LOCATIONS.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered.slice(0, 5));
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  };

  const selectService = (service: string) => {
    setServiceQuery(service);
    setShowServiceSuggestions(false);
  };

  const selectLocation = (location: string) => {
    setLocationQuery(location);
    setShowLocationSuggestions(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-2 sm:p-1 flex flex-col sm:flex-row gap-2 sm:gap-1 w-full sm:max-w-2xl">
      <div ref={serviceInputRef} className="flex-1 relative">
        <Input
          placeholder="Service, stylist or salon"
          className="flex-1 border-0 bg-gray-50 rounded-lg sm:rounded-full h-12 sm:h-14 px-4 sm:px-6 focus-visible:ring-0 text-gray-700 placeholder:text-gray-500 text-sm sm:text-base"
          value={serviceQuery}
          onChange={(e) => handleServiceChange(e.target.value)}
          onFocus={() => serviceQuery && setShowServiceSuggestions(true)}
        />
        {showServiceSuggestions && filteredServices.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b last:border-b-0"
                onClick={() => selectService(service)}
              >
                {service}
              </div>
            ))}
          </div>
        )}
      </div>

      <div ref={locationInputRef} className="flex-1 relative">
        <Input
          placeholder="Lagos Location"
          className="flex-1 border-0 bg-gray-50 rounded-lg sm:rounded-full h-12 sm:h-14 px-4 sm:px-6 focus-visible:ring-0 text-gray-700 placeholder:text-gray-500 text-sm sm:text-base"
          value={locationQuery}
          onChange={(e) => handleLocationChange(e.target.value)}
          onFocus={() => locationQuery && setShowLocationSuggestions(true)}
        />
        {showLocationSuggestions && filteredLocations.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
            {filteredLocations.map((location, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b last:border-b-0"
                onClick={() => selectLocation(location)}
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        className="bg-[#3d6a68] hover:bg-[#2d5a58] text-white h-12 sm:h-14 px-4 sm:px-8 rounded-lg sm:rounded-full flex items-center justify-center gap-2 font-semibold text-sm sm:text-base whitespace-nowrap"
        onClick={onSearch}
      >
        <Search className="h-4 sm:h-5 w-4 sm:w-5" />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </div>
  );
}
