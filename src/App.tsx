import React, { useState } from 'react';
import { ArrowRight, Briefcase, LineChart, CheckCircle2, Heart, HelpCircle } from 'lucide-react';
import { TimelineNode } from './components/TimelineNode';
import { ContentSection } from './components/ContentSection';

function App() {
  const [activeSection, setActiveSection] = useState(0);

  const nodes = [
    { title: "Intro", icon: Briefcase },
    { title: "Strategy", icon: LineChart },
    { title: "Start", icon: CheckCircle2 },
    { title: "Together", icon: Heart },
    { title: "Connect", icon: HelpCircle }
  ];

  const isFirstSection = activeSection === 0;
  const isLastSection = activeSection === nodes.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">TradFiWife</h1>
          <p className="text-lg md:text-xl text-gray-600">Building Financial Freedom Together</p>
        </header>

        <div className="flex flex-wrap md:flex-nowrap justify-center space-y-4 md:space-y-0 md:space-x-4 py-4 md:py-8">
          {nodes.map((node, index) => (
            <TimelineNode
              key={index}
              title={node.title}
              icon={node.icon}
              isActive={activeSection === index}
              onClick={() => setActiveSection(index)}
              isLast={index === nodes.length - 1}
            />
          ))}
        </div>

        <ContentSection activeSection={activeSection} />

        <div className="flex justify-center space-x-2">
          {!isFirstSection && (
            <button
              onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              aria-label="Previous section"
            >
              <ArrowRight className="rotate-180" />
            </button>
          )}
          {!isLastSection && (
            <button
              onClick={() => setActiveSection(prev => Math.min(nodes.length - 1, prev + 1))}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              aria-label="Next section"
            >
              <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;