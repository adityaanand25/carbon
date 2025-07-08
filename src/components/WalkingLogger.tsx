import React, { useState } from 'react';

const vehicleData = {
  'Petrol Car': { co2: 192, energy: 2.3 },
  'Diesel Car': { co2: 171, energy: 2.0 },
  'Petrol Scooter': { co2: 90, energy: 1.5 },
  'Electric Car': { co2: 70, energy: 0.54 },
};

interface WalkingLoggerProps {
  onClose: () => void;
  onLog: (savings: { co2: number; energy: number }) => void;
}

export default function WalkingLogger({ onClose, onLog }: WalkingLoggerProps) {
  const [distance, setDistance] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('Petrol Car');
  const [savings, setSavings] = useState<{ co2: number; energy: number } | null>(null);

  const handleCalculate = () => {
    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) {
      setSavings(null);
      return;
    }

    const vehicle = vehicleData[selectedVehicle];
    const co2Saved = dist * vehicle.co2;
    const energySaved = dist * vehicle.energy;

    setSavings({ co2: co2Saved, energy: energySaved });
  };

  const handleLogActivity = () => {
    if (savings) {
      onLog(savings);
      onClose();
    } else {
      alert("Please calculate savings first.");
    }
  };
  
  // Recalculate on input change
  React.useEffect(() => {
    handleCalculate();
  }, [distance, selectedVehicle]);


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-50 to-blue-100 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/50">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center"><span className="text-3xl mr-3">🚶</span>Log Your Walk</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <div className="space-y-6">
          <div>
            <label htmlFor="distance" className="block text-sm font-medium text-gray-600 mb-1">
              Distance (km)
            </label>
            <input
              type="number"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              placeholder="e.g., 5"
            />
          </div>
          <div>
            <label htmlFor="vehicle" className="block text-sm font-medium text-gray-600 mb-1">
              Instead of using a...
            </label>
            <select
              id="vehicle"
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm rounded-lg transition"
            >
              {Object.keys(vehicleData).map((vehicle) => (
                <option key={vehicle}>{vehicle}</option>
              ))}
            </select>
          </div>
        </div>

        {savings && (
            <div className="mt-8 p-6 bg-emerald-50/80 rounded-xl border border-emerald-200/50">
                <h4 className="text-lg font-semibold text-emerald-800 mb-3 text-center">Estimated Savings</h4>
                <div className="flex justify-around text-center">
                    <div>
                        <p className="text-2xl font-bold text-emerald-600">{savings.co2.toFixed(1)}g</p>
                        <p className="text-sm text-gray-600">CO₂ Saved</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-emerald-600">{savings.energy.toFixed(2)} MJ</p>
                        <p className="text-sm text-gray-600">Energy Saved</p>
                    </div>
                </div>
            </div>
        )}

        <div className="mt-8">
          <button
            onClick={handleLogActivity}
            disabled={!savings}
            className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
          >
            Log Activity
          </button>
        </div>
      </div>
    </div>
  );
}
