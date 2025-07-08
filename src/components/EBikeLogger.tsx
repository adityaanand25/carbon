import { useState } from 'react';

interface EBikeLoggerProps {
  onClose: () => void;
  onLog: (logData: any) => void;
}

const vehicleData = {
  'Petrol Car': { co2: 192, energy: 2.3 },
  'Diesel Car': { co2: 171, energy: 2.0 },
  'Scooter/Motorbike': { co2: 90, energy: 1.5 },
  'Electric Car': { co2: 70, energy: 0.54 },
};

const eBikeData = { co2: 15, energy: 0.05 };

export default function EBikeLogger({ onClose, onLog }: EBikeLoggerProps) {
  const [distance, setDistance] = useState('');
  const [savings, setSavings] = useState<any>(null);

  const calculateSavings = () => {
    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) {
      alert('Please enter a valid distance.');
      return;
    }

    const calculatedSavings = Object.entries(vehicleData).map(([vehicle, data]) => {
      const co2Saved = dist * (data.co2 - eBikeData.co2);
      const energySaved = dist * (data.energy - eBikeData.energy);
      return {
        vehicle,
        co2Saved: co2Saved.toFixed(2),
        energySaved: energySaved.toFixed(2),
      };
    });

    setSavings({
      type: 'E-Bike',
      distance: dist,
      savings: calculatedSavings,
    });
  };

  const handleLogActivity = () => {
    if (!savings) {
      alert('Please calculate savings first.');
      return;
    }
    onLog(savings);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-white/90 to-slate-100/90 rounded-3xl shadow-2xl p-8 border border-white/50 w-full max-w-2xl transform transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Log E-Bike Activity 🚲⚡</h2>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Distance in km"
              className="flex-grow p-3 bg-white/80 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
            />
            <button
              onClick={calculateSavings}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-transform transform hover:scale-105 shadow-md"
            >
              Calculate Savings
            </button>
          </div>
        </div>

        {savings && (
          <div className="mt-8 p-6 bg-white/70 rounded-2xl border border-white/30">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Savings for {savings.distance} km on an E-Bike
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              {savings.savings.map((s: any) => (
                <div key={s.vehicle} className="bg-slate-50/80 p-4 rounded-xl shadow-sm border">
                  <p className="font-bold text-emerald-700">{s.vehicle}</p>
                  <p className="text-gray-600">
                    <span className="font-semibold">{s.co2Saved}g</span> CO₂ saved
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">{s.energySaved} MJ</span> energy saved
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={handleLogActivity}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
              >
                Log Activity
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
