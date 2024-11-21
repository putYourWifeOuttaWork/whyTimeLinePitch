import React from 'react';
import { Mail, Phone, Globe2, LineChart, DollarSign, TrendingUp, Home, Shield } from 'lucide-react';
import { PartnershipSection } from './PartnershipSection';
import { StartingChecklist } from './StartingChecklist';
import { SingularityChart } from './SingularityChart';
import { ForecastChart } from './ForecastChart';
import { SingularityTimeline } from './SingularityTimeline';

type ContentSectionProps = {
  activeSection: number;
};

export function ContentSection({ activeSection }: ContentSectionProps) {
  const sections = [
    {
      title: "Economic Singularity 2030",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">The Financial Singularity is Coming</h2>
          <div className="prose prose-blue max-w-none space-y-4">
            <p className="text-gray-600 leading-relaxed">
              The financial singularity is the arbitrary point in the future at which AI will replace white collar workers 
              and drive the value of their labor below livable wages.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Financial Singularity Timeline</h3>
            <SingularityTimeline />
            <SingularityChart />
            <p className="text-gray-600">
              Blue collar work will face a similar singularity in 2030, with the same income requirements. 
              If your labor is valued at $3.00/hr, what would you do to keep your house, feed your kids, and survive? 
              Let alone... Thrive?
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Strategy",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Growth Strategy Forecast</h2>
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 mb-6">
              Choose your starting capital, preferred stock, and strategy to see your potential growth over the next 36 months.
            </p>
            <ForecastChart />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
                <h3 className="text-lg font-semibold text-cyan-800 mb-2">Tortoise Strategy</h3>
                <ul className="space-y-2 text-sm text-cyan-700">
                  <li>• 4.5% monthly return target</li>
                  <li>• Conservative approach</li>
                  <li>• Lower risk profile</li>
                  <li>• Steady, predictable growth</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                <h3 className="text-lg font-semibold text-pink-800 mb-2">Hare Strategy</h3>
                <ul className="space-y-2 text-sm text-pink-700">
                  <li>• 4.0% monthly return target</li>
                  <li>• 1.5x leverage</li>
                  <li>• Higher risk profile</li>
                  <li>• Accelerated growth potential</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Getting Started",
      content: <StartingChecklist />
    },
    {
      title: "Together",
      content: <PartnershipSection />
    },
    {
      title: "Connect",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Connect With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="mailto:weisbergmm@gmail.com"
              className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Mail className="text-blue-500" />
              <span className="text-gray-600">weisbergmm@gmail.com</span>
            </a>
            <a
              href="tel:201-264-9169"
              className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Phone className="text-green-500" />
              <span className="text-gray-600">201-264-9169</span>
            </a>
            <a
              href="https://manage.tradFiWife.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Globe2 className="text-purple-500" />
              <span className="text-gray-600">Management Module</span>
            </a>
            <a
              href="https://TradFiWife.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <LineChart className="text-indigo-500" />
              <span className="text-gray-600">Check Your Freedom Date</span>
            </a>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg min-h-[300px]">
      {sections[activeSection].content}
    </div>
  );
}