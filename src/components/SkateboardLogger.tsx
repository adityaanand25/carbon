import React, { useState, useMemo } from 'react';

interface SkateboardLoggerProps {
  onClose: () => void;
  onLog: (logData: any) => void;
}

const vehicleData = [
  { name: 'Petrol Car', co2: 192, energy: 2.3 },
  { name: 'Diesel Car', co2: 171, energy: 2.0 },
  { name: 'Scooter/Motorbike', co2: 90, energy: 1.5 },
  { name: 'Electric Car', co2: 70, energy: 0.54 },
];

const skateboardConstants = {
  manual: {
    co2: 0,
    energy: 0.3,
  },
  electric: {
    co2: 13,
    energy: 0.06,
  },
};

export default function SkateboardLogger({ onClose, onLog }: SkateboardLoggerProps) {
  const [distance, setDistance] = useState('');
  const [skateboardType, setSkateboardType] = useState<'manual' | 'electric'>('manual');

  const savings = useMemo(() => {
    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) {
      return null;
    }

    const { co2: skateboardCO2, energy: skateboardEnergy } = skateboardConstants[skateboardType];

    return vehicleData.map((vehicle) => ({
      name: vehicle.name,
      co2Saved: (vehicle.co2 - skateboardCO2) * dist,
      energySaved: (vehicle.energy - skateboardEnergy) * dist,
    }));
  }, [distance, skateboardType]);

  const handleLogActivity = () => {
    if (savings) {
      onLog({
        activity: 'Skateboard',
        type: skateboardType,
        distance: parseFloat(distance),
        savings,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Log Skateboard Activity</h2>
        
        <div className="mb-4 flex justify-center space-x-2">
          <button 
            onClick={() => setSkateboardType('manual')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${skateboardType === 'manual' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-200 text-gray-700'}`}
          >
            Manual
          </button>
          <button 
            onClick={() => setSkateboardType('electric')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${skateboardType === 'electric' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-200 text-gray-700'}`}
          >
            Electric
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="distance" className="block text-gray-700 font-semibold mb-2">
            Distance (km)
          </label>
          <input
            type="number"
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="e.g., 5"
            className="w-full p-3 bg-white/50 border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
          />
        </div>

        {savings && (
          <div className="mb-6">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Estimated Savings:</h3>
            <div className="space-y-2">
              {savings.map((saving) => (
                <div key={saving.name} className="bg-gradient-to-br from-slate-50/90 to-indigo-50/90 p-3 rounded-lg shadow">
                  <p className="font-semibold text-gray-700">vs. {saving.name}</p>
                  <p className="text-sm text-emerald-700">
                    CO₂ Saved: {saving.co2Saved.toFixed(2)} g
                  </p>
                  <p className="text-sm text-blue-700">
                    Energy Saved: {saving.energySaved.toFixed(2)} MJ
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
          >
            Close
          </button>
          <button
            onClick={handleLogActivity}
            disabled={!savings}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-gray-400"
          >
            Log Activity
          </button>
        </div>
      </div>
    </div>
  );
}
