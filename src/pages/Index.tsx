
import React from 'react';
import InsuranceCostComparison from '@/components/InsuranceCostComparison';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-insurance-muted/40">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-insurance-dark mb-4">
            North Carolina Insurance Costs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore how home insurance premiums compare across major cities in North Carolina
          </p>
        </header>
        
        <main>
          <InsuranceCostComparison />
          
          <div className="mt-16 text-center animate-on-scroll">
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Data based on average monthly home insurance premiums for a standard policy with $250,000 dwelling coverage in North Carolina cities, as of 2023.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
