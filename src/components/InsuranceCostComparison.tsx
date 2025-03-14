
import React, { useState, useEffect } from 'react';
import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

interface InsuranceData {
  city: string;
  cost: number;
  isHighlighted: boolean;
  isStateAverage: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="premium-tooltip bg-white p-3 rounded-xl shadow-lg border border-gray-200">
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
          {data.isStateAverage ? 'State Average' : 'City'}
        </p>
        <p className="font-semibold text-gray-900 mb-1">{label}</p>
        <p className="text-lg font-bold text-insurance-highlight">
          ${data.cost}<span className="text-xs text-gray-500 font-normal">/month</span>
        </p>
      </div>
    );
  }
  return null;
};

const InsuranceCostComparison: React.FC = () => {
  const [animateChart, setAnimateChart] = useState(false);
  
  const data: InsuranceData[] = [
    { city: 'Greensboro', cost: 221, isHighlighted: false, isStateAverage: false },
    { city: 'Charlotte', cost: 237, isHighlighted: false, isStateAverage: false },
    { city: 'Durham', cost: 262, isHighlighted: false, isStateAverage: false },
    { city: 'Raleigh', cost: 265, isHighlighted: true, isStateAverage: false },
    { city: 'North Carolina', cost: 270, isHighlighted: false, isStateAverage: true },
    { city: 'Greenville', cost: 366, isHighlighted: false, isStateAverage: false },
    { city: 'Wilmington', cost: 526, isHighlighted: false, isStateAverage: false },
  ];
  
  // Sort data by cost in ascending order
  const sortedData = [...data].sort((a, b) => a.cost - b.cost);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Use ResizeObserver to check if element is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Function to determine bar color based on data
  const getBarColor = (entry: InsuranceData) => {
    if (entry.isStateAverage) return "#0EA5E9";
    if (entry.isHighlighted) return "#D946EF";
    return "#8B5CF6";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10">
      <div className="animate-on-scroll animate-fade-in-up delay-100">
        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-insurance-muted text-insurance-highlight mb-2">
            Premium Analysis
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Home Insurance Cost Comparison
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Average monthly home insurance premiums across major North Carolina cities compared to the state average.
          </p>
        </div>
      </div>
      
      <div 
        className={cn(
          "mt-10 h-[420px] chart-container animate-on-scroll rounded-2xl shadow-sm border border-gray-100 overflow-hidden bg-gradient-to-b from-white to-gray-50/80",
          animateChart ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="p-5 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              margin={{ top: 25, right: 40, left: 30, bottom: 40 }}
            >
              <defs>
                <filter id="barGlow" height="300%" width="300%" x="-100%" y="-100%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis 
                dataKey="city" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                dy={10}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                domain={[200, 550]}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(229, 222, 255, 0.15)' }}
                wrapperStyle={{ outline: 'none' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => value === "cost" ? "Monthly Premium" : value}
              />
              <ReferenceLine 
                y={270} 
                stroke="#0EA5E9" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'State Avg: $270', 
                  position: 'right', 
                  fill: '#0EA5E9', 
                  fontSize: 12,
                  fontWeight: 500 
                }} 
              />
              <Bar 
                dataKey="cost" 
                radius={[4, 4, 0, 0]}
                animationDuration={1800}
                animationEasing="ease-out"
                className="bar-with-glow"
              >
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(entry)}
                    filter={entry.isHighlighted ? "url(#barGlow)" : undefined}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Raleigh vs State Average</div>
          <div className="text-2xl font-bold text-gray-900">
            $5 <span className="text-green-500 text-base font-medium">lower</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Raleigh homeowners pay slightly less than the North Carolina average
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Lowest vs Highest</div>
          <div className="text-2xl font-bold text-gray-900">
            $305 <span className="text-insurance-highlight text-base font-medium">difference</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Between Greensboro ($221) and Wilmington ($526)
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Coastal Impact</div>
          <div className="text-2xl font-bold text-gray-900">
            95% <span className="text-base font-medium text-red-500">higher</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Wilmington premiums vs state average due to hurricane risk
          </div>
        </div>
      </div>

      <style>
        {`
        .chart-container .recharts-surface {
          overflow: visible;
        }
        .bar-with-glow {
          filter: drop-shadow(0px 4px 6px rgba(139, 92, 246, 0.2));
        }
        `}
      </style>
    </div>
  );
};

export default InsuranceCostComparison;
