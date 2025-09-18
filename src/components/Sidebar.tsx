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
        fixed top-0 left-0 z-50 h-full w-64 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">CivicTrack</h2>
                <p className="text-xs text-gray-500">Issue Management</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stats Overview */}
          <div className="p-6 border-b border-gray-200/50">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Overview</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                  Total Issues
                </span>
                <span className="font-semibold text-gray-900">{stats.totalIssues}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                  New/Urgent
                </span>
                <span className="font-semibold text-red-600">{stats.newIssues}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-3"></div>
                  In Progress
                </span>
                <span className="font-semibold text-orange-600">{stats.inProgress}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                  Resolved
                </span>
                <span className="font-semibold text-green-600">{stats.resolved}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
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
                      w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
                      ${currentView === item.id
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-200/50'
                        : 'text-gray-700 hover:bg-gray-50/80 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`
                      mr-3 h-5 w-5 transition-colors duration-200
                      ${currentView === item.id ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'}
                    `} />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200/50">
            <p className="text-xs text-gray-400 text-center">
              © 2025 City Government
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;