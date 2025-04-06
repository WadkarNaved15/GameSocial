import React from 'react';

type Status = 'employed' | 'available' | 'indie';

interface DeveloperStatusProps {
  status: Status;
  className?: string;
}

export const DeveloperStatus: React.FC<DeveloperStatusProps> = ({ status, className = '' }) => {
  const statusConfig = {
    employed: {
      icon: 'fa-building',
      color: 'bg-blue-500',
      tooltip: 'Currently Employed'
    },
    available: {
      icon: 'fa-user-check',
      color: 'bg-green-500',
      tooltip: 'Available for Work'
    },
    indie: {
      icon: 'fa-rocket',
      color: 'bg-purple-500',
      tooltip: 'Independent Developer'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`relative group ${className}`}>
      <div className={`${config.color} w-8 h-8 rounded-full flex items-center justify-center shadow-lg`}>
        <i className={`fas ${config.icon} text-white text-sm`}></i>
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {config.tooltip}
        </div>
        <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
      </div>
    </div>
  );
}