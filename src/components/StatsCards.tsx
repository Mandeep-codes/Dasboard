import React from 'react';
import { 
  MapPin, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Users,
  Calendar,
  Target
} from 'lucide-react';

type StatsCardsProps = {
  stats: {
    totalIssues: number;
    newIssues: number;
    inProgress: number;
    resolved: number;
    urgentIssues: number;
  };
};

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Issues',
      value: stats.totalIssues,
      icon: MapPin,
      color: 'blue',
      trend: '+12%',
      trendUp: true,
      description: 'All reported issues'
    },
    {
      title: 'New Issues',
      value: stats.newIssues,
      icon: AlertTriangle,
      color: 'red',
      trend: '+3',
      trendUp: true,
      description: 'Awaiting assignment'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'orange',
      trend: '-2',
      trendUp: false,
      description: 'Being worked on'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      icon: CheckCircle,
      color: 'green',
      trend: '+8',
      trendUp: true,
      description: 'Successfully completed'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50',
        icon: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white',
        text: 'text-blue-600',
        border: 'border-blue-200/50'
      },
      red: {
        bg: 'bg-gradient-to-br from-red-50 to-red-100/50',
        icon: 'bg-gradient-to-br from-red-500 to-red-600 text-white',
        text: 'text-red-600',
        border: 'border-red-200/50'
      },
      orange: {
        bg: 'bg-gradient-to-br from-orange-50 to-orange-100/50',
        icon: 'bg-gradient-to-br from-orange-500 to-orange-600 text-white',
        text: 'text-orange-600',
        border: 'border-orange-200/50'
      },
      green: {
        bg: 'bg-gradient-to-br from-green-50 to-green-100/50',
        icon: 'bg-gradient-to-br from-green-500 to-green-600 text-white',
        text: 'text-green-600',
        border: 'border-green-200/50'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const colorClasses = getColorClasses(card.color);
        
        return (
          <div
            key={card.title}
            className={`relative overflow-hidden rounded-2xl border ${colorClasses.border} ${colorClasses.bg} p-6 shadow-sm hover:shadow-md transition-all duration-300 group`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-current"></div>
              <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-current"></div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${colorClasses.icon} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${colorClasses.text}`}>
                  <TrendingUp className={`h-4 w-4 ${card.trendUp ? '' : 'rotate-180'}`} />
                  <span>{card.trend}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                <p className="text-xs text-gray-500">{card.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;