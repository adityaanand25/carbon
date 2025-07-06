import React, { useState } from 'react';
import { Plus, Car, Zap, UtensilsCrossed, ShoppingBag, Mic, MicOff } from 'lucide-react';
import { DailyActivity } from '../types';

interface DailyActivityLoggerProps {
  onAddActivity: (activity: DailyActivity) => void;
}

export default function DailyActivityLogger({ onAddActivity }: DailyActivityLoggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'transport' | 'energy' | 'food' | 'lifestyle'>('transport');
  const [isListening, setIsListening] = useState(false);
  const [quickValues, setQuickValues] = useState({
    carMiles: 0,
    electricity: 0,
    meatMeals: 0,
    shopping: 0,
  });

  const categories = [
    { id: 'transport', label: 'Transport', icon: Car, color: 'bg-blue-500' },
    { id: 'energy', label: 'Energy', icon: Zap, color: 'bg-yellow-500' },
    { id: 'food', label: 'Food', icon: UtensilsCrossed, color: 'bg-green-500' },
    { id: 'lifestyle', label: 'Lifestyle', icon: ShoppingBag, color: 'bg-purple-500' },
  ];

  const quickActivities = {
    transport: [
      { name: 'Drove to work', impact: 8.2, icon: 'Car' },
      { name: 'Took public transport', impact: 2.1, icon: 'Bus' },
      { name: 'Cycled to work', impact: 0, icon: 'Bike' },
      { name: 'Walked to store', impact: 0, icon: 'MapPin' },
    ],
    energy: [
      { name: 'Used AC all day', impact: 12.5, icon: 'Wind' },
      { name: 'Worked from home', impact: 6.8, icon: 'Home' },
      { name: 'Unplugged devices', impact: -2.1, icon: 'Unplug' },
      { name: 'Used LED lights', impact: -1.5, icon: 'Lightbulb' },
    ],
    food: [
      { name: 'Had meat for lunch', impact: 6.6, icon: 'Beef' },
      { name: 'Ate plant-based meal', impact: 1.2, icon: 'Leaf' },
      { name: 'Bought local produce', impact: -0.8, icon: 'ShoppingBasket' },
      { name: 'Ordered takeout', impact: 4.2, icon: 'Package' },
    ],
    lifestyle: [
      { name: 'Online shopping', impact: 3.4, icon: 'ShoppingCart' },
      { name: 'Recycled waste', impact: -1.2, icon: 'RotateCcw' },
      { name: 'Bought second-hand', impact: -2.5, icon: 'Recycle' },
      { name: 'Used reusable bags', impact: -0.5, icon: 'ShoppingBag' },
    ],
  };

  const handleQuickAdd = (activity: any) => {
    const newActivity: DailyActivity = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: selectedCategory,
      activity: activity.name,
      impact: activity.impact,
      description: `Quick logged: ${activity.name}`,
      icon: activity.icon,
    };
    onAddActivity(newActivity);
    setIsOpen(false);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input implementation would go here
    if (!isListening) {
      // Start voice recognition
      setTimeout(() => setIsListening(false), 3000); // Auto-stop after 3 seconds
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Daily Activity Logger</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Quick Sliders */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Car className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Car Miles</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            value={quickValues.carMiles}
            onChange={(e) => setQuickValues(prev => ({ ...prev, carMiles: parseInt(e.target.value) }))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-xs text-blue-600 mt-1">{quickValues.carMiles} miles</div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Electricity</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={quickValues.electricity}
            onChange={(e) => setQuickValues(prev => ({ ...prev, electricity: parseInt(e.target.value) }))}
            className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-xs text-yellow-600 mt-1">{quickValues.electricity} kWh</div>
        </div>

        <div className="bg-green-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <UtensilsCrossed className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Meat Meals</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            value={quickValues.meatMeals}
            onChange={(e) => setQuickValues(prev => ({ ...prev, meatMeals: parseInt(e.target.value) }))}
            className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-xs text-green-600 mt-1">{quickValues.meatMeals} meals</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <ShoppingBag className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Shopping</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={quickValues.shopping}
            onChange={(e) => setQuickValues(prev => ({ ...prev, shopping: parseInt(e.target.value) }))}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-xs text-purple-600 mt-1">${quickValues.shopping}</div>
        </div>
      </div>

      {/* Voice Input Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={toggleVoiceInput}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
            isListening 
              ? 'bg-red-100 text-red-700 animate-pulse' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
        </button>
      </div>

      {/* Quick Add Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Add Activity</h3>
            
            {/* Category Selector */}
            <div className="flex space-x-2 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    selectedCategory === cat.id
                      ? `${cat.color} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <cat.icon className="h-4 w-4" />
                  <span className="text-sm">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Activities */}
            <div className="space-y-2 mb-4">
              {quickActivities[selectedCategory].map((activity, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAdd(activity)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium text-gray-800">{activity.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${activity.impact > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {activity.impact > 0 ? '+' : ''}{activity.impact} kg CO₂
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}