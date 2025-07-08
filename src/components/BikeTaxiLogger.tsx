import { useState } from 'react';
import { vehicleData, activityData } from '../lib/transportData';

interface BikeTaxiLoggerProps {
  onClose: () => void;
  onLog: (logData: any) => void;
}

const comparisonVehicles = Object.values(vehicleData);
const bikeTaxiData = activityData['Bike Taxi'];

export default function BikeTaxiLogger({ onClose, onLog }: BikeTaxiLoggerProps) {
  const [distance, setDistance] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(comparisonVehicles[0].name);

  const distanceKm = parseFloat(distance) || 0;
  const vehicle = comparisonVehicles.find(v => v.name === selectedVehicle);

  let co2Consumed = 0;
  let energyConsumed = 0;
  let co2Saved = 0;
  let energySaved = 0;

  if (vehicle && distanceKm > 0) {
    co2Consumed = distanceKm * bikeTaxiData.co2;
    energyConsumed = distanceKm * bikeTaxiData.energy;
    co2Saved = distanceKm * (vehicle.co2 - bikeTaxiData.co2);
    energySaved = distanceKm * (vehicle.energy - bikeTaxiData.energy);
  }

  const handleLog = () => {
    if (distanceKm > 0) {
      onLog({
        activity: 'Bike Taxi',
        distance: distanceKm,
        comparisonVehicle: selectedVehicle,
        co2Consumed: co2Consumed.toFixed(2),
        energyConsumed: energyConsumed.toFixed(2),
        co2Saved: co2Saved.toFixed(2),
        energySaved: energySaved.toFixed(2),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Log Bike Taxi Trip 🏍️</h2>
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
              placeholder="e.g., 12"
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
          <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200 space-y-2">
            <h3 className="text-lg font-semibold text-emerald-800">Trip Impact vs. {selectedVehicle}</h3>
            <div>
              <p className="text-emerald-700">
                <strong>CO₂ Emitted:</strong> {co2Consumed.toFixed(2)} g
              </p>
              <p className="text-emerald-700">
                <strong>CO₂ Saved:</strong> {co2Saved.toFixed(2)} g
              </p>
            </div>
            <div>
              <p className="text-emerald-700">
                <strong>Energy Used:</strong> {energyConsumed.toFixed(2)} MJ
              </p>
              <p className="text-emerald-700">
                <strong>Energy Saved:</strong> {energySaved.toFixed(2)} MJ
              </p>
            </div>
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
