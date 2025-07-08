import { useState } from 'react';
import { vehicleData } from '../lib/transportData';

interface CarpoolLoggerProps {
  onClose: () => void;
  onLog: (logData: any) => void;
}

const carTypes = Object.values(vehicleData);

export default function CarpoolLogger({ onClose, onLog }: CarpoolLoggerProps) {
  const [distance, setDistance] = useState('');
  const [people, setPeople] = useState('2');
  const [selectedCar, setSelectedCar] = useState(carTypes[0].name);

  const distanceKm = parseFloat(distance) || 0;
  const numPeople = parseInt(people, 10) || 1;
  const vehicle = carTypes.find((c) => c.name === selectedCar);

  let co2Consumed = 0;
  let energyConsumed = 0;
  let co2Saved = 0;
  let energySaved = 0;

  if (vehicle && distanceKm > 0 && numPeople > 1) {
    const totalEmissions = distanceKm * vehicle.co2;
    const totalEnergy = distanceKm * vehicle.energy;

    const perPersonEmissions = totalEmissions / numPeople;
    const perPersonEnergy = totalEnergy / numPeople;

    co2Consumed = perPersonEmissions;
    energyConsumed = perPersonEnergy;

    co2Saved = totalEmissions - perPersonEmissions;
    energySaved = totalEnergy - perPersonEnergy;
  }

  const handleLog = () => {
    if (distanceKm > 0 && numPeople > 1) {
      onLog({
        activity: 'Carpool',
        distance: distanceKm,
        vehicle: selectedCar,
        people: numPeople,
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Log Carpool Trip 🚗
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700"
            >
              Distance (km)
            </label>
            <input
              type="number"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g., 25"
            />
          </div>
          <div>
            <label
              htmlFor="people"
              className="block text-sm font-medium text-gray-700"
            >
              Number of People (including you)
            </label>
            <input
              type="number"
              id="people"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g., 3"
              min="2"
            />
          </div>
          <div>
            <label
              htmlFor="carType"
              className="block text-sm font-medium text-gray-700"
            >
              Car Type
            </label>
            <select
              id="carType"
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
            >
              {carTypes.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
        {distanceKm > 0 && numPeople > 1 && (
          <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200 space-y-2">
            <h3 className="text-lg font-semibold text-emerald-800">
              Your Share & Savings vs. Driving Alone
            </h3>
            <div>
              <p className="text-emerald-700">
                <strong>Your CO₂ Share:</strong> {co2Consumed.toFixed(2)} g
              </p>
              <p className="text-emerald-700">
                <strong>CO₂ Saved:</strong> {co2Saved.toFixed(2)} g
              </p>
            </div>
            <div>
              <p className="text-emerald-700">
                <strong>Your Energy Share:</strong> {energyConsumed.toFixed(2)} MJ
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
            disabled={!distanceKm || numPeople < 2}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
          >
            Log Activity
          </button>
        </div>
      </div>
    </div>
  );
}
