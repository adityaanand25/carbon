import { useState } from 'react';
import { Car, Zap, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { CarbonData } from '../types';

interface DataInputFormProps {
  data: CarbonData;
  onUpdate: (data: CarbonData) => void;
}

export default function DataInputForm({ data, onUpdate }: DataInputFormProps) {
  const [activeTab, setActiveTab] = useState<'transport' | 'energy' | 'food' | 'lifestyle'>('transport');

  const updateData = (category: keyof CarbonData, field: string, value: number | boolean) => {
    const newData = {
      ...data,
      [category]: {
        ...data[category],
        [field]: value,
      },
    };
    onUpdate(newData);
  };

  const tabs = [
    { id: 'transport', label: 'Transport', icon: Car },
    { id: 'energy', label: 'Energy', icon: Zap },
    { id: 'food', label: 'Food', icon: UtensilsCrossed },
    { id: 'lifestyle', label: 'Lifestyle', icon: ShoppingBag },
  ];

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-emerald-100/50 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
      {/* Gloss overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none group-hover:from-white/40"></div>
      <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-200/15 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-800 bg-clip-text text-transparent mb-8">Track Your Activities</h2>
      
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === 'transport' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Miles (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.transport.carMiles}
                onChange={(e) => updateData('transport', 'carMiles', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Public Transport Miles (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.transport.publicTransport}
                onChange={(e) => updateData('transport', 'publicTransport', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Flight Miles (per month)
              </label>
              <input
                type="number"
                min="0"
                value={data.transport.flights}
                onChange={(e) => updateData('transport', 'flights', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </>
        )}

        {activeTab === 'energy' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Electricity Usage (kWh per month)
              </label>
              <input
                type="number"
                min="0"
                value={data.energy.electricity}
                onChange={(e) => updateData('energy', 'electricity', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gas Usage (therms per month)
              </label>
              <input
                type="number"
                min="0"
                value={data.energy.gas}
                onChange={(e) => updateData('energy', 'gas', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="renewable"
                checked={data.energy.renewable}
                onChange={(e) => updateData('energy', 'renewable', e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="renewable" className="ml-2 block text-sm text-gray-700">
                I use renewable energy
              </label>
            </div>
          </>
        )}

        {activeTab === 'food' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meat Servings (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.food.meat}
                onChange={(e) => updateData('food', 'meat', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dairy Servings (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.food.dairy}
                onChange={(e) => updateData('food', 'dairy', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local Food Servings (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.food.local}
                onChange={(e) => updateData('food', 'local', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Processed Food Servings (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.food.processed}
                onChange={(e) => updateData('food', 'processed', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </>
        )}

        {activeTab === 'lifestyle' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shopping Spending ($ per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.lifestyle.shopping}
                onChange={(e) => updateData('lifestyle', 'shopping', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waste Generated (kg per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.lifestyle.waste}
                onChange={(e) => updateData('lifestyle', 'waste', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recycling (kg per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.lifestyle.recycling}
                onChange={(e) => updateData('lifestyle', 'recycling', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
}