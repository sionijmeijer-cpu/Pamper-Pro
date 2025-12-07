import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Star, Navigation } from 'lucide-react';

// Fix for default marker icons in react-leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

type Professional = {
  id: number;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  location: string;
  city: string;
  price: number;
  image: string;
  isFavorite: boolean;
  verified: boolean;
  distance?: string;
  lat: number;
  lng: number;
};

interface RealMapProps {
  professionals: Professional[];
  onMarkerClick?: (professional: Professional) => void;
}

export default function RealMap({ professionals, onMarkerClick }: RealMapProps) {
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    // Force map re-render to fix any leaflet initialization issues
    setMapKey(prev => prev + 1);
  }, []);

  const lagosCenter: [number, number] = [6.5244, 3.3792];

  const handleMarkerClick = (professional: Professional) => {
    if (onMarkerClick) {
      onMarkerClick(professional);
    }
  };

  return (
    <div className="w-full h-full min-h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        key={mapKey}
        center={lagosCenter}
        zoom={12}
        style={{ height: '600px', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {professionals.map((professional) => (
          <Marker
            key={professional.id}
            position={[professional.lat, professional.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(professional),
            }}
          >
            <Popup>
              <div className="w-64">
                <img
                  src={professional.image}
                  alt={professional.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-bold text-lg mb-1">{professional.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{professional.service}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{professional.rating}</span>
                  <span className="text-sm text-gray-600">({professional.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {professional.location}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">{professional.distance}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">₦{professional.price.toLocaleString()}</span>
                  <button className="px-3 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
