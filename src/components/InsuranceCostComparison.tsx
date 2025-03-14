
import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
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
      <div className="premium-tooltip bg-white p-3 rounded-lg shadow-lg border border-gray-100">
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

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10">
      <div className="animate-on-scroll animate-fade-in-up delay-100">
        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-insurance-muted text-insurance-highlight mb-2">
            Premium Analysis
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            Home Insurance Cost Comparison
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Average monthly home insurance premiums across major North Carolina cities compared to the state average.
          </p>
        </div>
      </div>
      
      <div 
        className={cn(
          "mt-10 h-[400px] bar-chart-container animate-on-scroll",
          animateChart ? "opacity-100" : "opacity-0"
        )}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
            barSize={45}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <XAxis 
              dataKey="city" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              domain={[0, 'dataMax + 50']}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(0, 0, 0, 0.02)' }}
            />
            <Bar 
              dataKey="cost" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {sortedData.map((entry, index) => {
                let fillColor = '#E5DEFF';
                let strokeColor = 'none';
                
                if (entry.isStateAverage) {
                  fillColor = '#0EA5E9';
                } else if (entry.isHighlighted) {
                  fillColor = '#8B5CF6';
                }
                
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={fillColor}
                    stroke={strokeColor}
                    className="transition-opacity duration-300"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Raleigh vs State Average</div>
          <div className="text-2xl font-bold text-gray-900">
            $5 <span className="text-green-500 text-base font-medium">lower</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Raleigh homeowners pay slightly less than the North Carolina average
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Lowest Premium</div>
          <div className="text-2xl font-bold text-gray-900">
            Greensboro <span className="text-insurance-highlight text-base font-medium">$221</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            18% lower than the state average
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Premium Range</div>
          <div className="text-2xl font-bold text-gray-900">
            $49 <span className="text-base font-medium text-gray-500">difference</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Between highest and lowest city premiums
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCostComparison;
