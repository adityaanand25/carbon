import React, { useState } from 'react';

interface BicycleLoggerProps {
  onClose: () => void;
  onLog: (logData: any) => void;
}

const comparisonVehicles = [
  { name: 'Petrol Car', co2: 192, energy: 2.3 },
  { name: 'Diesel Car', co2: 171, energy: null },
  { name: 'Scooter/Motorbike', co2: 90, energy: 1.5 },
  { name: 'Electric Car', co2: 70, energy: 0.54 },
];

export default function BicycleLogger({ onClose, onLog }: BicycleLoggerProps) {
  const [distance, setDistance] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(comparisonVehicles[0].name);

  const vehicle = comparisonVehicles.find(v => v.name === selectedVehicle);
  const distanceKm = parseFloat(distance) || 0;

  const co2Saved = vehicle ? distanceKm * (vehicle.co2 - 16) : 0;
  const energySaved = vehicle && vehicle.energy ? distanceKm * (vehicle.energy - 0.4) : 0;

  const handleLog = () => {
    if (distanceKm > 0) {
      onLog({
        activity: 'Bicycle',
        distance: distanceKm,
        comparisonVehicle: selectedVehicle,
        co2Saved: co2Saved.toFixed(2),
        energySaved: energySaved.toFixed(2),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Log Bicycle Trip 🚴</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
              Distance (km)
            </label>
            <input
              type="number"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g., 5.3"
            />
          </div>
          <div>
            <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
              Compared to...
            </label>
            <select
              id="vehicle"
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
            >
              {comparisonVehicles.map(v => <option key={v.name}>{v.name}</option>)}
            </select>
          </div>
        </div>
        {distanceKm > 0 && (
          <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <h3 className="text-lg font-semibold text-emerald-800">Estimated Savings</h3>
            <p className="text-emerald-700">
              <strong>CO₂ Saved:</strong> {co2Saved.toFixed(2)} grams
            </p>
            {vehicle && vehicle.energy && (
              <p className="text-emerald-700">
                <strong>Energy Saved:</strong> {energySaved.toFixed(2)} MJ
              </p>
            )}
             {vehicle && !vehicle.energy && (
              <p className="text-sm text-gray-500">
                Energy savings calculation not available for {vehicle.name}.
              </p>
            )}
          </div>
        )}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleLog}
            disabled={!distanceKm}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
          >
            Log Activity
          </button>
        </div>
      </div>
    </div>
  );
}
