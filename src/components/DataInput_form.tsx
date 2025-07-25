import React, { useState } from 'react';
import { Car, Bolt, Leaf, ShoppingBag } from 'lucide-react';

interface DataInputFormProps {
  data: any;
  onUpdate: (newData: any) => void;
}

export default function DataInputForm({ data, onUpdate }: DataInputFormProps) {
  const [activeTab, setActiveTab] = useState<'transport' | 'energy' | 'food' | 'lifestyle'>('transport');

  const updateData = (category: string, field: string, value: any) => {
    onUpdate({ ...data, [category]: { ...data[category], [field]: value } });
  };

  const tabs = [
    { id: 'transport', label: 'Transport', icon: Car },
    { id: 'energy', label: 'Energy', icon: Bolt },
    { id: 'food', label: 'Food', icon: Leaf },
    { id: 'lifestyle', label: 'Lifestyle', icon: ShoppingBag },
  ];

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-base-content mb-6">Track Your Activities</h2>
      
      <div className="flex space-x-1 mb-6 bg-base-200 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-base-100 text-primary shadow-sm'
                : 'text-base-content/70 hover:text-base-content'
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
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Car Miles (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.transport.carMiles}
                onChange={(e) => updateData('transport', 'carMiles', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Public Transport Miles (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.transport.publicTransport}
                onChange={(e) => updateData('transport', 'publicTransport', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Flight Miles (per month)
              </label>
              <input
                type="number"
                min="0"
                value={data.transport.flights}
                onChange={(e) => updateData('transport', 'flights', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </>
        )}

        {activeTab === 'energy' && (
          <>
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Electricity Usage (kWh per month)
              </label>
              <input
                type="number"
                min="0"
                value={data.energy.electricity}
                onChange={(e) => updateData('energy', 'electricity', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Gas Usage (therms per month)
              </label>
              <input
                type="number"
                min="0"
                value={data.energy.gas}
                onChange={(e) => updateData('energy', 'gas', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="renewable"
                checked={data.energy.renewable}
                onChange={(e) => updateData('energy', 'renewable', e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-base-300 rounded"
              />
              <label htmlFor="renewable" className="ml-2 block text-sm text-base-content/70">
                I use renewable energy
              </label>
            </div>
          </>
        )}

        {activeTab === 'food' && (
          <>
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Meat Servings (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.food.meat}
                onChange={(e) => updateData('food', 'meat', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Dairy Servings (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.food.dairy}
                onChange={(e) => updateData('food', 'dairy', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Local Food Servings (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.food.local}
                onChange={(e) => updateData('food', 'local', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Processed Food Servings (per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.food.processed}
                onChange={(e) => updateData('food', 'processed', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </>
        )}

        {activeTab === 'lifestyle' && (
          <>
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Shopping Spending ($ per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.lifestyle.shopping}
                onChange={(e) => updateData('lifestyle', 'shopping', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Waste Generated (kg per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.lifestyle.waste}
                onChange={(e) => updateData('lifestyle', 'waste', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Recycling (kg per week)
              </label>
              <input
                type="number"
                min="0"
                value={data.lifestyle.recycling}
                onChange={(e) => updateData('lifestyle', 'recycling', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-base-300 bg-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}