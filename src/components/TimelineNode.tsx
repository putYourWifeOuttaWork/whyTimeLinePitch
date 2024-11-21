import React from 'react';

type TimelineNodeProps = {
  title: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
  isLast?: boolean;
};

export function TimelineNode({ 
  title, 
  icon: Icon, 
  isActive, 
  onClick, 
  isLast = false 
}: TimelineNodeProps) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={`relative z-10 p-4 rounded-full transition-all duration-300 ${
          isActive 
            ? 'bg-blue-600 text-white scale-110' 
            : 'bg-white text-blue-600 hover:bg-blue-50'
        } shadow-lg`}
      >
        <Icon size={24} />
      </button>
      <p className={`mt-2 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
        {title}
      </p>
      {!isLast && (
        <div className="h-16 w-0.5 bg-blue-200 my-2" />
      )}
    </div>
  );
}