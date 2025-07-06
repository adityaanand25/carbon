import { Zap, Car, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { CarbonFootprint } from '../types';

interface CarbonFootprintCardProps {
  footprint: CarbonFootprint;
}

export default function CarbonFootprintCard({ footprint }: CarbonFootprintCardProps) {
  const categories = [
    { name: 'Transport', value: footprint.breakdown.transport, icon: Car, color: 'text-secondary' },
    { name: 'Energy', value: footprint.breakdown.energy, icon: Zap, color: 'text-accent' },
    { name: 'Food', value: footprint.breakdown.food, icon: UtensilsCrossed, color: 'text-success' },
    { name: 'Lifestyle', value: footprint.breakdown.lifestyle, icon: ShoppingBag, color: 'text-info' },
  ];

  const maxValue = Math.max(...categories.map(cat => cat.value));

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-base-content mb-6">Your Carbon Footprint</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="text-center bg-base-200 p-4 rounded-lg">
          <div className="text-4xl font-bold text-primary mb-2">
            {footprint.daily.toFixed(1)}
          </div>
          <p className="text-base-content/70">kg CO₂e per day</p>
        </div>
        
        <div className="text-center bg-base-200 p-4 rounded-lg">
          <div className="text-4xl font-bold text-secondary mb-2">
            {footprint.yearly.toFixed(0)}
          </div>
          <p className="text-base-content/70">kg CO₂e per year</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-base-content">Daily Breakdown</h3>
        {categories.map((category) => (
          <div key={category.name} className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg bg-base-200 ${category.color}`}>
              <category.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-base-content">{category.name}</span>
                <span className="text-sm font-bold text-base-content">
                  {category.value.toFixed(1)} kg CO₂e
                </span>
              </div>
              <div className="w-full bg-base-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-success to-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(category.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}