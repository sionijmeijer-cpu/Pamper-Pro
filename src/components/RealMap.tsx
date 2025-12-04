import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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
  location: string;
  city: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  verified: boolean;
  distance: string;
  lat: number;
  lng: number;
  isFavorite?: boolean;
};

type RealMapProps = {
  professionals: Professional[];
  onSelectProfessional: (professional: Professional) => void;
};

// Component to handle map view changes
function MapViewController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

export default function RealMap({ professionals, onSelectProfessional }: RealMapProps) {
  const [, setSelectedProfessional] = useState<Professional | null>(null);
  
  // Lagos center coordinates
  const lagosCenter: [number, number] = [6.5244, 3.3792];
  const initialZoom = 11;

  const handleMarkerClick = (professional: Professional) => {
    setSelectedProfessional(professional);
    onSelectProfessional(professional);
  };

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
      <MapContainer
        center={lagosCenter}
        zoom={initialZoom}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        {/* OpenStreetMap Tiles - Real map data */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
          minZoom={10}
        />

        <MapViewController center={lagosCenter} zoom={initialZoom} />

        {/* Professional Markers */}
        {professionals.map((professional) => (
          <Marker
            key={professional.id}
            position={[professional.lat, professional.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(professional),
            }}
          >
            <Popup maxWidth={300}>
              <div className="p-2">
                <div className="flex items-start gap-3">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 truncate">
                        {professional.name}
                      </h3>
                      {professional.verified && (
                        <div className="flex-shrink-0 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{professional.service}</p>
                    <div className="flex items-center gap-3 text-sm mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{professional.rating}</span>
                        <span className="text-gray-500">({professional.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{professional.location}</span>
                      <span className="text-gray-400">• {professional.distance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Starting from</p>
                        <p className="text-lg font-bold text-pink-600">{professional.price}</p>
                      </div>
                      <button
                        onClick={() => onSelectProfessional(professional)}
                        className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-semibold hover:bg-pink-700 transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 text-sm z-[1000]">
        <div className="flex items-center gap-2 mb-2">
          <Navigation className="w-4 h-4 text-pink-600" />
          <span className="font-semibold">Map Controls</span>
        </div>
        <div className="space-y-1 text-xs text-gray-600">
          <p>• Scroll to zoom</p>
          <p>• Drag to move</p>
          <p>• Click markers for details</p>
        </div>
      </div>
    </div>
  );
}
