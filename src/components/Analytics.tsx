import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react';

type Issue = {
  id: string;
  category: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'new' | 'assigned' | 'in-progress' | 'resolved';
  department: string;
  submittedAt: string;
};

type AnalyticsProps = {
  issues: Issue[];
};

const Analytics: React.FC<AnalyticsProps> = ({ issues }) => {
  // Calculate various metrics
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(i => i.status === 'resolved').length;
  const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

  // Category breakdown
  const categoryStats = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Department breakdown
  const departmentStats = issues.reduce((acc, issue) => {
    acc[issue.department] = (acc[issue.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Priority breakdown
  const priorityStats = issues.reduce((acc, issue) => {
    acc[issue.priority] = (acc[issue.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Recent trend (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const dailyStats = last7Days.map(date => {
    const count = issues.filter(issue => 
      issue.submittedAt.startsWith(date)
    ).length;
    return { date, count };
  });

  const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    trend?: string;
    color?: string;
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ChartBar = ({ label, value, max, color }: {
    label: string;
    value: number;
    max: number;
    color: string;
  }) => (
    <div className="flex items-center space-x-4 py-2">
      <div className="w-24 text-sm text-gray-600 truncate">{label}</div>
      <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
        <div 
          className={`${color} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${Math.max((value / max) * 100, 5)}%` }}
        />
        <span className="absolute right-2 top-0 text-xs text-gray-700 font-medium">
          {value}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Issues"
          value={totalIssues}
          icon={MapPin}
          trend="+12% vs last month"
          color="blue"
        />
        <StatCard
          title="Resolution Rate"
          value={`${resolutionRate}%`}
          icon={CheckCircle}
          trend="+5% vs last month"
          color="green"
        />
        <StatCard
          title="Avg Response Time"
          value="2.4h"
          icon={Clock}
          trend="-15min vs last month"
          color="orange"
        />
        <StatCard
          title="Active Departments"
          value={Object.keys(departmentStats).length}
          icon={Users}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues by Category */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Issues by Category</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {Object.entries(categoryStats)
              .sort(([,a], [,b]) => b - a)
              .map(([category, count]) => (
                <ChartBar
                  key={category}
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  value={count}
                  max={Math.max(...Object.values(categoryStats))}
                  color="bg-blue-500"
                />
              ))
            }
          </div>
        </div>

        {/* Issues by Department */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Issues by Department</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {Object.entries(departmentStats)
              .sort(([,a], [,b]) => b - a)
              .map(([department, count]) => (
                <ChartBar
                  key={department}
                  label={department}
                  value={count}
                  max={Math.max(...Object.values(departmentStats))}
                  color="bg-green-500"
                />
              ))
            }
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Priority Distribution</h3>
            <AlertTriangle className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {Object.entries(priorityStats)
              .sort(([,a], [,b]) => b - a)
              .map(([priority, count]) => {
                const colors = {
                  urgent: 'bg-red-500',
                  high: 'bg-orange-500',
                  medium: 'bg-blue-500',
                  low: 'bg-gray-500'
                };
                return (
                  <ChartBar
                    key={priority}
                    label={priority.charAt(0).toUpperCase() + priority.slice(1)}
                    value={count}
                    max={Math.max(...Object.values(priorityStats))}
                    color={colors[priority as keyof typeof colors]}
                  />
                );
              })
            }
          </div>
        </div>

        {/* Daily Submissions Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">7-Day Trend</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {dailyStats.map(({ date, count }) => (
              <ChartBar
                key={date}
                label={new Date(date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
                value={count}
                max={Math.max(...dailyStats.map(d => d.count), 1)}
                color="bg-purple-500"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">Most Active Category</span>
            </div>
            <p className="text-blue-700">
              {Object.entries(categoryStats).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-900">Best Performing Dept</span>
            </div>
            <p className="text-green-700">
              {Object.entries(departmentStats).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span className="font-medium text-orange-900">Urgent Issues</span>
            </div>
            <p className="text-orange-700">
              {priorityStats.urgent || 0} requiring immediate attention
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;