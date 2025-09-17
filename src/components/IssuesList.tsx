import React from 'react';
import { 
  MapPin, 
  Clock, 
  User, 
  Camera,
  AlertTriangle,
  CheckCircle,
  Circle,
  Eye
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
};

type IssuesListProps = {
  issues: Issue[];
  onIssueSelect: (issue: Issue) => void;
  selectedIssue?: Issue | null;
  fullView?: boolean;
};

const IssuesList: React.FC<IssuesListProps> = ({ 
  issues, 
  onIssueSelect, 
  selectedIssue,
  fullView = false 
}) => {
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
      case 'new': return <Circle className="h-4 w-4" />;
      case 'assigned': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4 animate-spin" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (fullView) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Issues</h2>
            <span className="text-sm text-gray-500">{issues.length} total</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {issues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start space-x-3">
                        {issue.photos.length > 0 && (
                          <Camera className="h-4 w-4 text-gray-400 mt-1" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{issue.description}</div>
                          <div className="text-xs text-gray-400 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {issue.location.address}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
                        {issue.priority === 'urgent' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {issue.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {getStatusIcon(issue.status)}
                        <span className="ml-1 capitalize">{issue.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{formatDate(issue.submittedAt)}</div>
                      <div className="text-xs text-gray-400">by {issue.submittedBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => onIssueSelect(issue)}
                        className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Recent Issues ({issues.length})
        </h3>
        
        <div className="space-y-3">
          {issues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => onIssueSelect(issue)}
              className={`
                p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md
                ${selectedIssue?.id === issue.id 
                  ? 'border-blue-500 bg-blue-50 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900 flex-1 pr-2">
                  {issue.title}
                </h4>
                {issue.photos.length > 0 && (
                  <Camera className="h-4 w-4 text-gray-400 flex-shrink-0" />
                )}
              </div>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {issue.description}
              </p>
              
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                  {issue.priority === 'urgent' && <AlertTriangle className="w-3 h-3 mr-1" />}
                  {issue.priority}
                </span>
                
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                  {getStatusIcon(issue.status)}
                  <span className="ml-1 capitalize">{issue.status.replace('-', ' ')}</span>
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate max-w-32">{issue.location.address}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(issue.submittedAt)}
                </div>
              </div>
              
              {issue.assignedTo && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-600">
                    <User className="h-3 w-3 mr-1" />
                    Assigned to {issue.assignedTo}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {issues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <MapPin className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-sm text-gray-500">No issues found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesList;