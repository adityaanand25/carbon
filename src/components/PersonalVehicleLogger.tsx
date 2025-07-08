import { useState } from 'react';
import { activityData } from '../lib/transportData';

interface PersonalVehicleLoggerProps {
  onClose: () => void;
  onLog: (logData: any) => void;
  vehicleType: keyof typeof personalVehicleInfo;
}

const personalVehicleInfo = {
    'Petrol Car': { icon: '🚗', name: 'Petrol Car' },
    'Diesel Car': { icon: '🚙', name: 'Diesel Car' },
    'CNG Car': { icon: '🚐', name: 'CNG Car' },
    'Electric Car': { icon: '⚡️🚗', name: 'Electric Car' },
    'Motorcycle/Scooter (Petrol)': { icon: '🏍️', name: 'Motorcycle/Scooter (Petrol)' },
    'Electric Scooter/Bike': { icon: '⚡️🚲', name: 'Electric Scooter/Bike' },
}

export default function PersonalVehicleLogger({ onClose, onLog, vehicleType }: PersonalVehicleLoggerProps) {
  const [distance, setDistance] = useState('');

  const distanceKm = parseFloat(distance) || 0;
  const vehicle = activityData[vehicleType];

  const co2Consumed = distanceKm * vehicle.co2;
  const energyConsumed = distanceKm * vehicle.energy;

  const handleLog = () => {
    if (distanceKm > 0) {
      onLog({
        activity: vehicleType,
        distance: distanceKm,
        co2Consumed: co2Consumed.toFixed(2),
        energyConsumed: energyConsumed.toFixed(2),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Log {personalVehicleInfo[vehicleType].name} Trip {personalVehicleInfo[vehicleType].icon}</h2>
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
              placeholder="e.g., 42"
            />
          </div>
        </div>
        {distanceKm > 0 && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800">Trip Impact</h3>
            <p className="text-red-700">
              <strong>CO₂ Emitted:</strong> {co2Consumed.toFixed(2)} grams
            </p>
            <p className="text-red-700">
              <strong>Energy Consumed:</strong> {energyConsumed.toFixed(2)} MJ
            </p>
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
