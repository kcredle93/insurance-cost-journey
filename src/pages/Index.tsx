
import React from 'react';
import InsuranceCostComparison from '@/components/InsuranceCostComparison';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <main>
          <InsuranceCostComparison />
        </main>
      </div>
    </div>
  );
};

export default Index;
