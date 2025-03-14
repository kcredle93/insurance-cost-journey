
import React, { useState, useEffect, useRef } from 'react';
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
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

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
  const chartRef = useRef<HTMLDivElement>(null);
  
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

  // Function to determine bar color based on data
  const getBarColor = (entry: InsuranceData) => {
    if (entry.isStateAverage) return "#FB8500"; // Orange for state average
    if (entry.isHighlighted) return "#FFB703"; // Yellow for highlighted city
    return "#209FBD"; // Teal blue for regular cities
  };

  const handleDownloadImage = async () => {
    if (chartRef.current) {
      try {
        const canvas = await html2canvas(chartRef.current, {
          scale: 2, // Higher scale for better quality
          backgroundColor: '#FFFFFF',
          logging: false,
        });
        
        // Convert to image
        const image = canvas.toDataURL('image/png');
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'insurance-cost-comparison.png';
        link.href = image;
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  return (
    <div className="w-full h-full bg-white font-inter">
      <div className="text-center mb-6 pt-4">
        <h2 className="text-3xl font-bold text-insurance-dark mb-3 tracking-tight">
          Home Insurance Cost Comparison
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-6">
          Average monthly home insurance premiums across major North Carolina cities compared to the state average.
        </p>
        
        <button 
          onClick={handleDownloadImage}
          className="inline-flex items-center gap-2 px-4 py-2 bg-insurance-highlight text-white rounded-md hover:bg-insurance-highlight/90 transition-colors mb-4"
        >
          <Download size={16} /> Download Chart as Image
        </button>
      </div>
      
      <div ref={chartRef} className="h-[500px] w-full bg-white px-4 pb-6">
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
      <div className="text-center text-xs text-gray-400 mt-2 pb-4">
        Data represents average monthly premiums for $200,000 homes with standard coverage.
      </div>
    </div>
  );
};

export default InsuranceCostComparison;
