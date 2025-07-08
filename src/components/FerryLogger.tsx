import { useState } from 'react';
import { activityData, vehicleData } from '../lib/transportData';

interface FerryLoggerProps {
  onClose: () => void;
  onLog: (logData: any) => void;
}

export default function FerryLogger({ onClose, onLog }: FerryLoggerProps) {
  const [distance, setDistance] = useState('');
  const [replacedVehicle, setReplacedVehicle] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const calculateSavings = () => {
    if (!distance || !replacedVehicle) {
      alert('Please enter distance and select a replaced vehicle.');
      return;
    }

    const distanceKm = parseFloat(distance);
    const ferryData = activityData['Ferry/Water Taxi'];

    if (!ferryData) {
      alert('Ferry/Water Taxi data not found.');
      return;
    }

    const energyConsumedKcal = ferryData.energy * distanceKm;
    const co2EmissionsGrams = ferryData.co2 * distanceKm;

    const replacedVehicleData = vehicleData[replacedVehicle as keyof typeof vehicleData];

    if (!replacedVehicleData) {
      alert('Replaced vehicle data not found.');
      return;
    }

    const replacedEnergyKcal =
      replacedVehicleData.energy * distanceKm;
    const replacedCo2Grams = replacedVehicleData.co2 * distanceKm;

    const energySavedKcal = replacedEnergyKcal - energyConsumedKcal;
    const co2SavedGrams = replacedCo2Grams - co2EmissionsGrams;

    const logData = {
      activity: 'Ferry/Water Taxi',
      distance: distanceKm,
      replacedVehicle: replacedVehicle,
      energyConsumedKcal,
      co2EmissionsGrams,
      energySavedKcal,
      co2SavedGrams,
    };

    setResults(logData);
  };

  const handleLog = () => {
    if (results) {
      onLog(results);
    }
  };

  const vehicleOptions = Object.keys(vehicleData);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Log Ferry/Water Taxi Trip</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Distance (km)</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            What vehicle did you replace?
          </label>
          <select
            onChange={(e) => setReplacedVehicle(e.target.value)}
            className="w-full p-2 border rounded"
            value={replacedVehicle || ''}
          >
            <option value="" disabled>
              Select a vehicle
            </option>
            {vehicleOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={calculateSavings}
          className="w-full bg-emerald-500 text-white p-2 rounded"
        >
          Calculate Savings
        </button>
        {results && (
          <div className="mt-4">
            <h3 className="text-xl font-bold">Results</h3>
            <p>Energy Consumed: {results.energyConsumedKcal.toFixed(2)} kcal</p>
            <p>CO₂ Emissions: {results.co2EmissionsGrams.toFixed(2)} g</p>
            <p>Energy Saved: {results.energySavedKcal.toFixed(2)} kcal</p>
            <p>CO₂ Saved: {results.co2SavedGrams.toFixed(2)} g</p>
            <button
              onClick={handleLog}
              className="w-full bg-green-500 text-white p-2 rounded mt-4"
            >
              Log Activity
            </button>
          </div>
        )}
        <button
          onClick={onClose}
          className="w-full bg-gray-500 text-white p-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}
