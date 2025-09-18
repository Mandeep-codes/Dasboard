import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  User, 
  Camera, 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Edit3,
  Send,
  Calendar
} from 'lucide-react';

type Issue = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'new' | 'assigned' | 'in-progress' | 'resolved';
  location: { address: string };
  department: string;
  submittedBy: string;
  submittedAt: string;
  assignedTo?: string;
  photos: string[];
  estimatedCompletion?: string;
};

type IssueDetailsProps = {
  issue: Issue;
  onClose: () => void;
};

const IssueDetails: React.FC<IssueDetailsProps> = ({ issue, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [status, setStatus] = useState(issue.status);
  const [assignedTo, setAssignedTo] = useState(issue.assignedTo || '');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertTriangle className="h-4 w-4" />;
      case 'assigned': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4 animate-spin" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const mockComments = [
    {
      id: '1',
      author: 'System',
      message: 'Issue automatically routed to Public Works department',
      timestamp: issue.submittedAt,
      type: 'system'
    },
    {
      id: '2',
      author: 'Mike Wilson',
      message: 'Assigned to our team. Will inspect the location tomorrow morning.',
      timestamp: '2025-01-12T15:30:00Z',
      type: 'staff'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

        {/* Modal */}
        <div className="relative inline-block w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-2xl transition-all sm:my-8 sm:align-middle">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-gray-100/30">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{issue.title}</h2>
              <p className="text-sm text-gray-500 mt-1">Issue #{issue.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex h-[600px]">
            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gray-50/30">
              {/* Status and Priority */}
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${getStatusColor(status)}`}>
                  {getStatusIcon(status)}
                  <span className="ml-2 capitalize">{status.replace('-', ' ')}</span>
                </span>
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border shadow-sm ${getPriorityColor(issue.priority)}`}>
                  {issue.priority === 'urgent' && <AlertTriangle className="w-4 h-4 mr-1" />}
                  {issue.priority} Priority
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Description</h3>
                <p className="text-gray-900 bg-white rounded-xl p-4 border border-gray-200/50 leading-relaxed">{issue.description}</p>
              </div>

              {/* Location and Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Location</h3>
                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                    <span>{issue.location.address}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Department:</span>
                      <span className="font-semibold">{issue.department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Submitted:</span>
                      <span>{formatDate(issue.submittedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Reporter:</span>
                      <span>{issue.submittedBy}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photos */}
              {issue.photos.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    Photos ({issue.photos.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {issue.photos.map((photo, index) => (
                      <div key={index} className="relative group cursor-pointer">
                        <img
                          src={photo}
                          alt={`Issue photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl border border-gray-200/50 shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-xl flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 text-sm">Click to enlarge</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments/Activity */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Activity & Comments
                </h3>
                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        comment.type === 'system' ? 'bg-gray-100 text-gray-600' : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700'
                      }`}>
                        {comment.type === 'system' ? 'S' : comment.author.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{comment.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment or update..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 text-sm font-medium shadow-sm transition-all duration-200">
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Management Sidebar */}
            <div className="w-80 bg-gradient-to-b from-gray-50 to-gray-100/50 border-l border-gray-200/50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Issue Management</h3>
              
              <div className="space-y-5">
                {/* Status Update */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as typeof status)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                  >
                    <option value="new">New</option>
                    <option value="assigned">Assigned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                {/* Assignment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Assigned To</label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                  >
                    <option value="">Unassigned</option>
                    <option value="Mike Wilson">Mike Wilson</option>
                    <option value="Sarah Brown">Sarah Brown</option>
                    <option value="John Davis">John Davis</option>
                    <option value="Lisa Johnson">Lisa Johnson</option>
                  </select>
                </div>

                {/* Estimated Completion */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Completion</label>
                  <input
                    type="datetime-local"
                    defaultValue={issue.estimatedCompletion?.slice(0, 16)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                  />
                </div>

                {/* Priority Override */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select
                    defaultValue={issue.priority}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 space-y-3">
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center font-medium shadow-sm transition-all duration-200">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Update Issue
                  </button>
                  
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 flex items-center justify-center font-medium shadow-sm transition-all duration-200">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Resolved
                  </button>
                  
                  <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:border-gray-300 flex items-center justify-center font-medium transition-all duration-200">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Follow-up
                  </button>
                </div>

                {/* Estimated Completion Display */}
                {issue.estimatedCompletion && (
                  <div className="pt-5 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">Estimated Completion:</span>
                      </div>
                      <span className="text-gray-900 font-medium">{formatDate(issue.estimatedCompletion)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;