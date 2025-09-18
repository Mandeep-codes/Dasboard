import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import { MapPin, AlertTriangle, Clock, CheckCircle, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type Issue = {
  id: string;
  title: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'new' | 'assigned' | 'in-progress' | 'resolved';
  location: { lat: number; lng: number; address: string };
  category: string;
  description: string;
  submittedAt: string;
  submittedBy: string;
};

type MapViewProps = {
  issues: Issue[];
  onIssueSelect: (issue: Issue) => void;
};

// Custom marker component for different issue types
const CustomMarker: React.FC<{
  issue: Issue;
  onSelect: (issue: Issue) => void;
}> = ({ issue, onSelect }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#dc2626'; // red-600
      case 'high': return '#ea580c'; // orange-600
      case 'medium': return '#2563eb'; // blue-600
      case 'low': return '#6b7280'; // gray-500
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return '🆕';
      case 'assigned': return '⏳';
      case 'in-progress': return '🔄';
      case 'resolved': return '✅';
      default: return '📍';
    }
  };

  const markerIcon = divIcon({
    html: `
      <div style="
        background-color: ${getPriorityColor(issue.priority)};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s;
      " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        ${getStatusIcon(issue.status)}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <Marker
      position={[issue.location.lat, issue.location.lng]}
      icon={markerIcon}
      eventHandlers={{
        click: () => onSelect(issue),
      }}
    >
      <Popup>
        <div className="p-2 min-w-64">
          <h3 className="font-semibold text-gray-900 mb-2">{issue.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className={`px-2 py-1 rounded-full text-white ${
              issue.priority === 'urgent' ? 'bg-red-500' :
              issue.priority === 'high' ? 'bg-orange-500' :
              issue.priority === 'medium' ? 'bg-blue-500' : 'bg-gray-500'
            }`}>
              {issue.priority}
            </span>
            <span className="capitalize">{issue.status.replace('-', ' ')}</span>
          </div>
          <div className="text-xs text-gray-500">
            <div className="flex items-center mb-1">
              <MapPin className="h-3 w-3 mr-1" />
              {issue.location.address}
            </div>
            <div>Reported by: {issue.submittedBy}</div>
          </div>
          <button
            onClick={() => onSelect(issue)}
            className="mt-2 w-full px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            View Details
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

// Component to handle map location updates
const LocationUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
};

const MapView: React.FC<MapViewProps> = ({ issues, onIssueSelect }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // Center of India

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          setUserLocation(location);
          setMapCenter(location);
        },
        (error) => {
          console.log('Location access denied or unavailable:', error);
          // Keep default India center
        }
      );
    }
  }, []);

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          setUserLocation(location);
          setMapCenter(location);
        },
        (error) => {
          alert('Unable to get your location. Please enable location services.');
        }
      );
    }
  };

  return (
    <div className="relative h-full">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-[1000] space-y-2">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
          <button
            onClick={handleLocateUser}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Find my location"
          >
            <Navigation className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Issue Priority</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-sm" />
            <span>Urgent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-orange-600 border-2 border-white shadow-sm" />
            <span>High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-sm" />
            <span>Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gray-500 border-2 border-white shadow-sm" />
            <span>Low</span>
          </div>
        </div>
        
        <h4 className="text-sm font-semibold text-gray-900 mb-2 mt-4">Status Icons</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <span>🆕</span>
            <span>New</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>⏳</span>
            <span>Assigned</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🔄</span>
            <span>In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>✅</span>
            <span>Resolved</span>
          </div>
        </div>
      </div>

      {/* Issue Count Badge */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-2">
        <div className="text-sm font-semibold text-gray-900">
          {issues.length} Active Issues
        </div>
        <div className="text-xs text-gray-500">
          {issues.filter(i => i.priority === 'urgent').length} urgent
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <LocationUpdater center={mapCenter} />
        
        {/* Indian Map Tiles with better coverage */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        
        {/* Alternative tile layer for better India coverage */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          opacity={0.7}
          maxZoom={19}
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              <div className="text-center">
                <div className="text-blue-600 mb-2">📍</div>
                <div className="font-semibold">Your Location</div>
                <div className="text-xs text-gray-500">Current position</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Issue Markers */}
        {issues.map((issue) => (
          <CustomMarker
            key={issue.id}
            issue={issue}
            onSelect={onIssueSelect}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;