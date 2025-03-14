
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
      <div className="premium-tooltip bg-white p-3 rounded-xl shadow-lg border border-insurance-muted">
        <p className="text-xs uppercase tracking-wider text-insurance-dark mb-1">
          {data.isStateAverage ? 'State Average' : 'City'}
        </p>
        <p className="font-semibold text-insurance-dark mb-1">{label}</p>
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
  
  // Use IntersectionObserver to check if element is visible
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
    if (entry.isStateAverage) return "#FB8500"; // Orange for state average
    if (entry.isHighlighted) return "#FFB703"; // Yellow for highlighted city
    return "#209FBD"; // Teal blue for regular cities
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10">
      <div className="animate-on-scroll animate-fade-in-up delay-100">
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-insurance-dark mb-3 tracking-tight">
            Home Insurance Cost Comparison
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Average monthly home insurance premiums across major North Carolina cities compared to the state average.
          </p>
        </div>
      </div>
      
      <div 
        className={cn(
          "mt-10 h-[420px] chart-container animate-on-scroll overflow-hidden bg-white rounded-2xl shadow-sm border border-insurance-muted",
          animateChart ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="p-5 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              margin={{ top: 25, right: 40, left: 30, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis 
                dataKey="city" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#090739' }}
                dy={10}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#090739' }}
                domain={[200, 550]}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(226, 243, 251, 0.3)' }}
                wrapperStyle={{ outline: 'none' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => value === "cost" ? "Monthly Premium" : value}
              />
              <ReferenceLine 
                y={270} 
                stroke="#FB8500" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'State Avg: $270', 
                  position: 'right', 
                  fill: '#FB8500', 
                  fontSize: 12,
                  fontWeight: 500 
                }} 
              />
              <Bar 
                dataKey="cost" 
                radius={[4, 4, 0, 0]}
                animationDuration={1800}
                animationEasing="ease-out"
              >
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(entry)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCostComparison;
