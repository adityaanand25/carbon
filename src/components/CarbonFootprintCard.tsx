import { Zap, Car, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { CarbonFootprint } from '../types';

interface CarbonFootprintCardProps {
  footprint: CarbonFootprint;
}

export default function CarbonFootprintCard({ footprint }: CarbonFootprintCardProps) {
  const categories = [
    { name: 'Transport', value: footprint.breakdown.transport, icon: Car, color: 'from-blue-400 to-blue-600', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { name: 'Energy', value: footprint.breakdown.energy, icon: Zap, color: 'from-yellow-400 to-orange-500', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    { name: 'Food', value: footprint.breakdown.food, icon: UtensilsCrossed, color: 'from-emerald-400 to-green-600', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
    { name: 'Lifestyle', value: footprint.breakdown.lifestyle, icon: ShoppingBag, color: 'from-purple-400 to-purple-600', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  ];

  const maxValue = Math.max(...categories.map(cat => cat.value));

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-indigo-100/50 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
      {/* Gloss overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none group-hover:from-white/40"></div>
      <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200/15 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-800 bg-clip-text text-transparent mb-8">
          Your Carbon Footprint
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="text-center bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-2xl group-hover:from-white/30"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-3">
                {footprint.daily.toFixed(1)}
              </div>
              <p className="text-gray-600 font-medium text-lg">kg CO₂e per day</p>
            </div>
          </div>
          
          <div className="text-center bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-2xl group-hover:from-white/30"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                {footprint.yearly.toFixed(0)}
              </div>
              <p className="text-gray-600 font-medium text-lg">kg CO₂e per year</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">
            Daily Breakdown
          </h3>
          {categories.map((category) => (
            <div key={category.name} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-2xl group-hover:from-white/30"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className={`p-3 rounded-2xl ${category.iconBg} shadow-lg border border-white/30`}>
                  <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-semibold text-gray-700">{category.name}</span>
                    <span className="text-lg font-bold text-gray-800">
                      {category.value.toFixed(1)} kg CO₂e
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div
                      className={`bg-gradient-to-r ${category.color} h-3 rounded-full transition-all duration-700 shadow-lg`}
                      style={{ width: `${maxValue > 0 ? (category.value / maxValue) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}