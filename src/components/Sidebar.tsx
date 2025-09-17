import React from 'react';
import { 
  MapPin, 
  BarChart3, 
  FileText, 
  X,
  AlertTriangle,
  Clock,
  CheckCircle,
  Circle
} from 'lucide-react';

type SidebarProps = {
  currentView: 'dashboard' | 'issues' | 'analytics';
  setCurrentView: (view: 'dashboard' | 'issues' | 'analytics') => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  stats: {
    totalIssues: number;
    newIssues: number;
    inProgress: number;
    resolved: number;
    urgentIssues: number;
  };
};

const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  sidebarOpen,
  setSidebarOpen,
  stats
}) => {
  const navigation = [
    { name: 'Dashboard', id: 'dashboard' as const, icon: MapPin },
    { name: 'Issues', id: 'issues' as const, icon: FileText },
    { name: 'Analytics', id: 'analytics' as const, icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">CivicTrack</h2>
                <p className="text-xs text-gray-600">Issue Management</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stats Overview */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <Circle className="h-3 w-3 mr-2 text-blue-500" />
                  Total Issues
                </span>
                <span className="font-medium">{stats.totalIssues}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-2 text-red-500" />
                  New/Urgent
                </span>
                <span className="font-medium text-red-600">{stats.newIssues}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <Clock className="h-3 w-3 mr-2 text-orange-500" />
                  In Progress
                </span>
                <span className="font-medium text-orange-600">{stats.inProgress}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                  Resolved
                </span>
                <span className="font-medium text-green-600">{stats.resolved}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                      ${currentView === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className={`
                      mr-3 h-5 w-5
                      ${currentView === item.id ? 'text-blue-700' : 'text-gray-400'}
                    `} />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2025 City Government
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;