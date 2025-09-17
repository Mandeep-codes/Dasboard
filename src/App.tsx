import React, { useState } from 'react';
import { 
  MapPin, 
  Filter, 
  Search, 
  Bell, 
  User, 
  BarChart3, 
  Settings,
  Menu,
  X,
  ChevronDown,
  AlertTriangle,
  Clock,
  CheckCircle,
  Circle,
  Camera,
  MessageSquare,
  Users,
  TrendingUp
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import IssuesList from './components/IssuesList';
import Analytics from './components/Analytics';
import IssueDetails from './components/IssueDetails';

type Issue = {
  id: string;
  title: string;
  description: string;
  category: 'pothole' | 'streetlight' | 'trash' | 'graffiti' | 'other';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'new' | 'assigned' | 'in-progress' | 'resolved';
  location: { lat: number; lng: number; address: string };
  department: string;
  submittedBy: string;
  submittedAt: string;
  assignedTo?: string;
  photos: string[];
  estimatedCompletion?: string;
};

// Mock data for demonstration
const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    description: 'Deep pothole causing damage to vehicles. Located near intersection with Oak Ave.',
    category: 'pothole',
    priority: 'urgent',
    status: 'new',
    location: { lat: 28.6139, lng: 77.2090, address: 'Connaught Place, New Delhi, Delhi 110001' },
    department: 'Public Works',
    submittedBy: 'John Smith',
    submittedAt: '2025-01-13T08:30:00Z',
    photos: ['https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg']
  },
  {
    id: '2',
    title: 'Broken streetlight',
    description: 'Streetlight has been out for 3 days, creating safety hazard.',
    category: 'streetlight',
    priority: 'high',
    status: 'assigned',
    location: { lat: 19.0760, lng: 72.8777, address: 'Marine Drive, Mumbai, Maharashtra 400020' },
    department: 'Electrical',
    submittedBy: 'Mary Johnson',
    submittedAt: '2025-01-12T14:15:00Z',
    assignedTo: 'Mike Wilson',
    photos: ['https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg'],
    estimatedCompletion: '2025-01-15T17:00:00Z'
  },
  {
    id: '3',
    title: 'Overflowing trash bin',
    description: 'Trash bin at park entrance is overflowing, attracting pests.',
    category: 'trash',
    priority: 'medium',
    status: 'in-progress',
    location: { lat: 13.0827, lng: 80.2707, address: 'Marina Beach, Chennai, Tamil Nadu 600013' },
    department: 'Sanitation',
    submittedBy: 'Robert Davis',
    submittedAt: '2025-01-11T10:45:00Z',
    assignedTo: 'Sarah Brown',
    photos: ['https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg']
  },
  {
    id: '4',
    title: 'Road construction debris',
    description: 'Construction materials blocking pedestrian walkway near metro station.',
    category: 'other',
    priority: 'high',
    status: 'new',
    location: { lat: 12.9716, lng: 77.5946, address: 'MG Road, Bangalore, Karnataka 560001' },
    department: 'Public Works',
    submittedBy: 'Priya Sharma',
    submittedAt: '2025-01-13T11:20:00Z',
    photos: ['https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg']
  },
  {
    id: '5',
    title: 'Water logging after rain',
    description: 'Severe water logging making roads impassable during monsoon.',
    category: 'other',
    priority: 'urgent',
    status: 'assigned',
    location: { lat: 22.5726, lng: 88.3639, address: 'Park Street, Kolkata, West Bengal 700016' },
    department: 'Water Management',
    submittedBy: 'Amit Kumar',
    submittedAt: '2025-01-12T16:45:00Z',
    assignedTo: 'Rajesh Gupta',
    photos: ['https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg'],
    estimatedCompletion: '2025-01-16T12:00:00Z'
  }
];

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'issues' | 'analytics'>('dashboard');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || issue.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const stats = {
    totalIssues: mockIssues.length,
    newIssues: mockIssues.filter(i => i.status === 'new').length,
    inProgress: mockIssues.filter(i => i.status === 'in-progress').length,
    resolved: mockIssues.filter(i => i.status === 'resolved').length,
    urgentIssues: mockIssues.filter(i => i.priority === 'urgent').length
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        stats={stats}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentView === 'dashboard' && 'Dashboard'}
                    {currentView === 'issues' && 'Issues Management'}
                    {currentView === 'analytics' && 'Analytics'}
                  </h1>
                  <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-700 font-medium">Welcome back, Admin</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {currentView === 'dashboard' && 'Real-time overview of civic issues'}
                  {currentView === 'issues' && 'Manage and track all reported issues'}
                  {currentView === 'analytics' && 'Performance insights and trends'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Mobile Welcome Message */}
              <div className="sm:hidden flex items-center space-x-2 px-2 py-1 bg-blue-50 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-700 font-medium">Admin</span>
              </div>
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <User className="h-5 w-5" />
                <span className="hidden sm:block">Admin User</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          {currentView === 'dashboard' && (
            <div className="h-full flex">
              {/* Map Section */}
              <div className="flex-1 relative">
                <MapView 
                  issues={filteredIssues} 
                  onIssueSelect={setSelectedIssue}
                />
              </div>
              
              {/* Issues Sidebar */}
              <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
                {/* Search and Filters */}
                <div className="p-4 border-b border-gray-200">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search issues..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="all">All Categories</option>
                      <option value="pothole">Potholes</option>
                      <option value="streetlight">Street Lights</option>
                      <option value="trash">Trash/Recycling</option>
                      <option value="graffiti">Graffiti</option>
                      <option value="other">Other</option>
                    </select>
                    
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="assigned">Assigned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                {/* Issues List */}
                <IssuesList 
                  issues={filteredIssues}
                  onIssueSelect={setSelectedIssue}
                  selectedIssue={selectedIssue}
                />
              </div>
            </div>
          )}

          {currentView === 'issues' && (
            <div className="p-6">
              <IssuesList 
                issues={filteredIssues}
                onIssueSelect={setSelectedIssue}
                selectedIssue={selectedIssue}
                fullView={true}
              />
            </div>
          )}

          {currentView === 'analytics' && (
            <div className="p-6">
              <Analytics issues={mockIssues} />
            </div>
          )}
        </main>
      </div>

      {/* Issue Details Modal */}
      {selectedIssue && (
        <IssueDetails 
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </div>
  );
}

export default App;