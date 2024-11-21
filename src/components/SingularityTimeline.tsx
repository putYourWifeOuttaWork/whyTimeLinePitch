import React, { useState } from 'react';

type TimelineEvent = {
  year: string;
  title: string;
  description: string;
};

const timelineEvents: TimelineEvent[] = [
  {
    year: '2025',
    title: 'Agentic Takeover',
    description: 'Over 3 million call-center jobs will vanish, with 5 million total jobs eliminated in the USA. Basic knowledge roles stop hiring and reduce headcount. Around 250,000 driving jobs will be eliminated, marking the beginning of widespread AI displacement.'
  },
  {
    year: '2026',
    title: 'Service Automation',
    description: 'AI transforms legal documentation, tax preparation, and medical diagnostics. Personal assistants, secretaries, program managers, marketing, sales, and HR roles diminish. Over 1 million taxi/rideshare jobs and half of long-haul trucker positions eliminated.'
  },
  {
    year: '2027',
    title: 'Workforce Shift',
    description: 'White collar workers transition to local services and manufacturing, filling supply gaps. This leads to more affordable house services like handymen and plumbers, creating temporary opportunities for displaced workers.'
  },
  {
    year: '2028',
    title: 'Blue-Collar Impact',
    description: 'Blue-collar jobs begin declining after years of wage growth. Plumbing, construction, electricians, and craft specialists face challenges. Service workers advised to consider trade skills and TradFiWife program while opportunities exist.'
  },
  {
    year: '2029',
    title: 'Wage Stagnation',
    description: 'Blue collar wages stagnate as local market prices decrease. Reduced consumer spending power affects service industry workers and laborers across sectors.'
  },
  {
    year: '2030',
    title: 'AI Workforce',
    description: 'Advanced AI systems displace millions in landscaping, manufacturing, machining, plumbing, and construction. Omni-skilled robots begin replacing human workers in various physical labor roles.'
  },
  {
    year: 'Beyond',
    title: 'Economic Reset',
    description: 'AI takes over most hands-on roles, including human care and hospitality. 50% unemployment expected, housing prices drop 75%. Negative interest rates emerge with rapid monetary debasement. Government UBI likely but insufficient. Equity in top companies becomes crucial for survival.'
  }
];

export function SingularityTimeline() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <div className="py-8">
      <div className="flex flex-wrap justify-center gap-4">
        {timelineEvents.map((event, index) => (
          <div
            key={event.year}
            className="relative group"
            onMouseEnter={() => setActiveNode(index)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className={`
              w-32 h-32 flex flex-col items-center justify-center p-4 rounded-xl
              transition-all duration-300 transform
              ${index === activeNode 
                ? 'bg-blue-600 text-white scale-105 shadow-xl' 
                : 'bg-white text-gray-800 shadow-md hover:shadow-lg'}
            `}>
              <span className="text-2xl font-bold">{event.year}</span>
              <span className="text-sm mt-2 text-center">
                {event.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < timelineEvents.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200" />
            )}

            {/* Tooltip */}
            <div className={`
              absolute z-20 w-80 p-4 rounded-lg bg-white shadow-xl border border-gray-100
              transition-all duration-200
              ${activeNode === index ? 'opacity-100 visible' : 'opacity-0 invisible'}
              ${index === timelineEvents.length - 1 ? 'right-0' : 'left-0'}
              top-full mt-2
            `}>
              <div className="text-sm text-gray-600 leading-relaxed">
                {event.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}