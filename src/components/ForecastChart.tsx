import React, { useState, useEffect, useCallback } from 'react';
import { format, addMonths } from 'date-fns';
import { fetchStockPrices } from '../services/stockService';

type Strategy = 'tortoise' | 'hare';
type JobType = 'white' | 'blue';

export function ForecastChart() {
  const [startingCapital, setStartingCapital] = useState(25000);
  const [selectedStock, setSelectedStock] = useState('NVDA');
  const [strategy, setStrategy] = useState<Strategy>('tortoise');
  const [jobType, setJobType] = useState<JobType>('white');
  const [stockPrices, setStockPrices] = useState<Record<string, number>>({});
  const [hoverData, setHoverData] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchStockPrices().then(setStockPrices);
  }, []);

  const calculateMonthlyData = useCallback(() => {
    const months = 36;
    const data = [];
    let currentCapital = startingCapital;
    const stockPrice = stockPrices[selectedStock] || 0;
    const contractSize = 100;
    const contractValue = stockPrice * contractSize;
    
    const monthlyRate = strategy === 'tortoise' ? 0.045 : 0.04;
    const leverage = strategy === 'tortoise' ? 1 : 1.5;
    
    for (let i = 0; i <= months; i++) {
      const possibleContracts = Math.floor((currentCapital * leverage) / contractValue);
      const monthlyIncome = possibleContracts * contractValue * monthlyRate;
      currentCapital += monthlyIncome;
      
      data.push({
        month: i,
        income: monthlyIncome,
        capital: currentCapital,
        contracts: possibleContracts,
        date: addMonths(new Date(), i)
      });
    }
    return data;
  }, [startingCapital, selectedStock, strategy, stockPrices]);

  const survivalThreshold = jobType === 'white' ? 12000 : 10000;
  const thrivingThreshold = jobType === 'white' ? 20000 : 16000;
  const width = 800;
  const height = 400;
  const padding = 60;
  
  const data = calculateMonthlyData();
  const maxIncome = Math.max(...data.map(d => d.income), thrivingThreshold);
  
  const yScale = (value: number) => 
    height - padding - ((value / maxIncome) * (height - 2 * padding));

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const monthIndex = Math.floor((x - padding) / ((width - 2 * padding) / 36));
    
    if (monthIndex >= 0 && monthIndex < data.length) {
      const point = data[monthIndex];
      setHoverData(point);
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Starting Capital
            {startingCapital < 25000 && (
              <span className="text-blue-500 ml-2">Must start with $25,000</span>
            )}
          </label>
          <input
            type="number"
            value={startingCapital}
            onChange={(e) => setStartingCapital(Number(e.target.value))}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Select Stock</label>
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {Object.entries(stockPrices).map(([symbol, price]) => (
              <option key={symbol} value={symbol}>
                {symbol} (${price.toFixed(2)})
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value as JobType)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="white">White Collar</option>
            <option value="blue">Blue Collar</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setStrategy('tortoise')}
          className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
            strategy === 'tortoise'
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-gray-200 hover:border-cyan-200 hover:bg-cyan-50/50'
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <span role="img" aria-label="tortoise" className="text-3xl">🐢</span>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800">Slow and Safe</h3>
              <p className="text-sm text-gray-600">4.5% monthly return</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setStrategy('hare')}
          className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
            strategy === 'hare'
              ? 'border-pink-500 bg-pink-50'
              : 'border-gray-200 hover:border-pink-200 hover:bg-pink-50/50'
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <span role="img" aria-label="hare" className="text-3xl">🐰</span>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800">Swift and Aggressive</h3>
              <p className="text-sm text-gray-600">4.0% + 1.5x leverage</p>
            </div>
          </div>
        </button>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg
          width={width}
          height={height}
          className="mx-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Grid lines */}
          {Array.from({ length: 6 }).map((_, i) => {
            const value = maxIncome * (i / 5);
            const y = yScale(value);
            return (
              <g key={i}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                <text
                  x={padding - 10}
                  y={y}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  className="text-sm fill-gray-500"
                >
                  ${value.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Survival and Thriving lines */}
          <line
            x1={padding}
            y1={yScale(survivalThreshold)}
            x2={width - padding}
            y2={yScale(survivalThreshold)}
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="4"
          />
          <line
            x1={padding}
            y1={yScale(thrivingThreshold)}
            x2={width - padding}
            y2={yScale(thrivingThreshold)}
            stroke="#059669"
            strokeWidth="2"
            strokeDasharray="4"
          />

          {/* X-axis */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#94a3b8"
            strokeWidth="1"
          />

          {/* Month labels */}
          {[0, 6, 12, 18, 24, 30, 36].map(month => (
            <text
              key={month}
              x={padding + (month / 36) * (width - 2 * padding)}
              y={height - padding + 20}
              textAnchor="middle"
              className="text-sm fill-gray-500"
            >
              {month}m
            </text>
          ))}

          {/* Data line */}
          <path
            d={`M ${data.map((d, i) => `${padding + (i / 36) * (width - 2 * padding)},${yScale(d.income)}`).join(' L ')}`}
            stroke={strategy === 'tortoise' ? '#0891b2' : '#db2777'}
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Tooltip */}
        {hoverData && (
          <div
            className="absolute bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-10"
            style={{
              left: Math.min(mousePosition.x + 10, width - 300),
              top: 0
            }}
          >
            <div className="space-y-2">
              <p className="font-medium">Month {hoverData.month}</p>
              <p>Projected Monthly Income: ${hoverData.income.toFixed(2)}</p>
              <p>Total Account Value: ${hoverData.capital.toFixed(2)}</p>
              <p>Active Contracts: {hoverData.contracts}</p>
              <p>
                Status: {' '}
                <span className={hoverData.income >= survivalThreshold ? 'text-orange-500' : ''}>
                  {hoverData.income >= survivalThreshold ? 'Surviving' : 'Below Survival'}
                </span>
                {' / '}
                <span className={hoverData.income >= thrivingThreshold ? 'text-teal-500' : ''}>
                  {hoverData.income >= thrivingThreshold ? 'Thriving' : 'Below Thriving'}
                </span>
              </p>
              <p>Date: {format(hoverData.date, 'MMM yyyy')}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
          <span>Survival Threshold (${survivalThreshold.toLocaleString()}/mo)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
          <span>Thriving Threshold (${thrivingThreshold.toLocaleString()}/mo)</span>
        </div>
      </div>
    </div>
  );
}