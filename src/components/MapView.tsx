import React from 'react';
import { MapPin, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

type Issue = {
  id: string;
  title: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'new' | 'assigned' | 'in-progress' | 'resolved';
  location: { lat: number; lng: number; address: string };
  category: string;
};

type MapViewProps = {
  issues: Issue[];
  onIssueSelect: (issue: Issue) => void;
};

const MapView: React.FC<MapViewProps> = ({ issues, onIssueSelect }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-blue-600 bg-blue-100';
      case 'low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertTriangle className="h-4 w-4" />;
      case 'assigned': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative h-full bg-gray-100">
      {/* Map placeholder - In production, integrate with actual map service */}
      <div 
        className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #f0f9ff 25%, transparent 25%),
            linear-gradient(-45deg, #f0f9ff 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #f0f9ff 75%),
            linear-gradient(-45deg, transparent 75%, #f0f9ff 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      >
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10 space-y-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded">
              +
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded">
              −
            </button>
          </div>
        </div>

        {/* Issue Markers */}
        {issues.map((issue, index) => (
          <div
            key={issue.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            style={{
              left: `${30 + (index * 15) % 40}%`,
              top: `${40 + (index * 12) % 30}%`
            }}
            onClick={() => onIssueSelect(issue)}
          >
            {/* Marker */}
            <div className={`
              relative w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center
              ${getPriorityColor(issue.priority)} hover:scale-110 transition-transform
            `}>
              {getStatusIcon(issue.status)}
              
              {/* Priority indicator */}
              {issue.priority === 'urgent' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>

            {/* Hover tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
              {issue.title}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900" />
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Priority Levels</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-100 border border-red-300" />
              <span>Urgent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-100 border border-orange-300" />
              <span>High</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300" />
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-100 border border-gray-300" />
              <span>Low</span>
            </div>
          </div>
        </div>

        {/* Heat map areas */}
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-red-200 rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-orange-200 rounded-full opacity-25" />
      </div>
    </div>
  );
};

export default MapView;