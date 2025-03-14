
// Insurance Cost Chart component - Will be processed by Babel
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const chartContainer = document.getElementById('insurance-chart-root');
    
    if (!chartContainer) return;
    
    // Get data attributes
    const chartTitle = chartContainer.getAttribute('data-title') || 'Home Insurance Cost Comparison';
    const chartDescription = chartContainer.getAttribute('data-description') || 'Average monthly home insurance premiums across major North Carolina cities compared to the state average.';
    
    // Create React component
    const InsuranceCostChart = () => {
      const { useState, useEffect, useRef } = React;
      const { 
        BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
        ResponsiveContainer, Legend, ReferenceLine, Cell 
      } = Recharts;
      
      const chartRef = useRef(null);
      
      const data = [
        { city: 'Greensboro', cost: 221, isHighlighted: false, isStateAverage: false },
        { city: 'Charlotte', cost: 237, isHighlighted: false, isStateAverage: false },
        { city: 'Durham', cost: 262, isHighlighted: false, isStateAverage: false },
        { city: 'Raleigh', cost: 265, isHighlighted: true, isStateAverage: false },
        { city: 'North Carolina', cost: 270, isHighlighted: false, isStateAverage: true },
        { city: 'Greenville', cost: 366, isHighlighted: false, isStateAverage: false },
        { city: 'Wilmington', cost: 526, isHighlighted: false, isStateAverage: false },
      ].sort((a, b) => a.cost - b.cost);
      
      const getBarColor = (entry) => {
        if (entry.isStateAverage) return "#FB8500"; // Orange for state average
        if (entry.isHighlighted) return "#FFB703"; // Yellow for highlighted city
        return "#209FBD"; // Teal blue for regular cities
      };
      
      const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          const data = payload[0].payload;
          return (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '12px', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ 
                fontSize: '12px', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                color: '#090739', 
                marginBottom: '4px'
              }}>
                {data.isStateAverage ? 'State Average' : 'City'}
              </p>
              <p style={{ fontWeight: 600, color: '#090739', marginBottom: '4px' }}>{label}</p>
              <p style={{ fontSize: '18px', fontWeight: 700, color: '#209FBD' }}>
                ${data.cost}<span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 400 }}>/month</span>
              </p>
            </div>
          );
        }
        return null;
      };
      
      const handleDownloadImage = async () => {
        if (chartRef.current) {
          try {
            const canvas = await html2canvas(chartRef.current, {
              scale: 2,
              backgroundColor: '#FFFFFF',
              logging: false,
            });
            
            const image = canvas.toDataURL('image/png');
            
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
        <div className="insurance-chart-container">
          <h2 className="insurance-chart-title">{chartTitle}</h2>
          <p className="insurance-chart-description">{chartDescription}</p>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button onClick={handleDownloadImage} className="download-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Chart as Image
            </button>
          </div>
          
          <div ref={chartRef} className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
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
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getBarColor(entry)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <p className="insurance-chart-note">
            Data represents average monthly premiums for $200,000 homes with standard coverage.
          </p>
        </div>
      );
    };
    
    // Render the React component
    ReactDOM.render(
      <InsuranceCostChart />,
      chartContainer
    );
  });
})();
