import React, { useState } from 'react';
import WalkingLogger from './WalkingLogger';
import BicycleLogger from './BicycleLogger';
import SkateboardLogger from './SkateboardLogger';
import EScooterLogger from './EScooterLogger';
import EBikeLogger from './EBikeLogger';
import CityBusLogger from './CityBusLogger';
import MetroLogger from './MetroLogger';
import TramLogger from './TramLogger';
import LocalTrainLogger from './LocalTrainLogger';
import FerryLogger from './FerryLogger';
import AutoRickshawLogger from './AutoRickshawLogger';
import CycleRickshawLogger from './CycleRickshawLogger';
import TaxiLogger from './TaxiLogger';
import ElectricTaxiLogger from './ElectricTaxiLogger';
import RideHailingLogger from './RideHailingLogger';
import CarpoolLogger from './CarpoolLogger';
import BikeTaxiLogger from './BikeTaxiLogger';
import PersonalVehicleLogger from './PersonalVehicleLogger';

const transportCategories = [
	{
		emoji: '🚶',
		title: 'Non-Motorized Travel',
		items: ['Walking', 'Bicycle', 'Skateboard'],
	},
	{
		emoji: '🛴',
		title: 'Light Electric Personal Transport',
		items: ['E-Scooter', 'E-Bike'],
	},
	{
		emoji: '🚍',
		title: 'Public Transport',
		items: [
			'City Bus',
			'Metro/Subway',
			'Tram/Light Rail',
			'Local Train',
			'Ferry/Water Taxi',
		],
	},
	{
		emoji: '🚕',
		title: 'Shared & On-Demand Mobility',
		items: [
			'Auto-Rickshaw',
			'Cycle-Rickshaw',
			'Taxi (Petrol/Diesel)',
			'Electric Taxi',
			'Ola/Uber/Rapido',
			'Carpool (Private/Shared)',
			'Bike Taxi',
		],
	},
	{
		emoji: '🚗',
		title: 'Personal Vehicle',
		items: [
			'Petrol Car',
			'Diesel Car',
			'CNG Car',
			'Electric Car',
			'Motorcycle/Scooter (Petrol)',
			'Electric Scooter/Bike',
		],
	},
];

export default function TransportActivities() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [showWalkingLogger, setShowWalkingLogger] = useState(false);
	const [showBicycleLogger, setShowBicycleLogger] = useState(false);
	const [showSkateboardLogger, setShowSkateboardLogger] = useState(false);
	const [showEScooterLogger, setShowEScooterLogger] = useState(false);
	const [showEBikeLogger, setShowEBikeLogger] = useState(false);
	const [showCityBusLogger, setShowCityBusLogger] = useState(false);
	const [showMetroLogger, setShowMetroLogger] = useState(false);
	const [showTramLogger, setShowTramLogger] = useState(false);
	const [showLocalTrainLogger, setShowLocalTrainLogger] = useState(false);
	const [showFerryLogger, setShowFerryLogger] = useState(false);
	const [showAutoRickshawLogger, setShowAutoRickshawLogger] = useState(false);
	const [showCycleRickshawLogger, setShowCycleRickshawLogger] = useState(false);
	const [showTaxiLogger, setShowTaxiLogger] = useState(false);
	const [showElectricTaxiLogger, setShowElectricTaxiLogger] = useState(false);
	const [showRideHailingLogger, setShowRideHailingLogger] = useState(false);
	const [showCarpoolLogger, setShowCarpoolLogger] = useState(false);
	const [showBikeTaxiLogger, setShowBikeTaxiLogger] = useState(false);
	const [showPersonalVehicleLogger, setShowPersonalVehicleLogger] = useState(false);
    const [personalVehicleType, setPersonalVehicleType] = useState<any>(null)

	const toggleDropdown = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const handleLogClick = (item: string) => {
		if (item === 'Walking') {
			setShowWalkingLogger(true);
		} else if (item === 'Bicycle') {
			setShowBicycleLogger(true);
		} else if (item === 'Skateboard') {
			setShowSkateboardLogger(true);
		} else if (item === 'E-Scooter') {
			setShowEScooterLogger(true);
		} else if (item === 'E-Bike') {
			setShowEBikeLogger(true);
		} else if (item === 'City Bus') {
			setShowCityBusLogger(true);
		} else if (item === 'Metro/Subway') {
			setShowMetroLogger(true);
		} else if (item === 'Tram/Light Rail') {
			setShowTramLogger(true);
		} else if (item === 'Local Train') {
			setShowLocalTrainLogger(true);
		} else if (item === 'Ferry/Water Taxi') {
			setShowFerryLogger(true);
		} else if (item === 'Auto-Rickshaw') {
			setShowAutoRickshawLogger(true);
		} else if (item === 'Cycle-Rickshaw') {
			setShowCycleRickshawLogger(true);
		} else if (item === 'Taxi (Petrol/Diesel)') {
			setShowTaxiLogger(true);
		} else if (item === 'Electric Taxi') {
			setShowElectricTaxiLogger(true);
		} else if (item === 'Ola/Uber/Rapido') {
			setShowRideHailingLogger(true);
		} else if (item === 'Carpool (Private/Shared)') {
			setShowCarpoolLogger(true);
		} else if (item === 'Bike Taxi') {
			setShowBikeTaxiLogger(true);
		} else if (['Petrol Car', 'Diesel Car', 'CNG Car', 'Electric Car', 'Motorcycle/Scooter (Petrol)', 'Electric Scooter/Bike'].includes(item)) {
            setPersonalVehicleType(item);
            setShowPersonalVehicleLogger(true);
        } else {
			alert(`Logging for ${item} is not yet implemented.`);
		}
	};

	const handleLog = (logData: any) => {
		console.log('Activity Logged:', logData);
		// Here you would typically send the data to a backend or update global state
		setShowWalkingLogger(false);
		setShowBicycleLogger(false);
		setShowSkateboardLogger(false);
		setShowEScooterLogger(false);
		setShowEBikeLogger(false);
		setShowCityBusLogger(false);
		setShowMetroLogger(false);
		setShowTramLogger(false);
		setShowLocalTrainLogger(false);
		setShowFerryLogger(false);
		setShowAutoRickshawLogger(false);
		setShowCycleRickshawLogger(false);
		setShowTaxiLogger(false);
		setShowElectricTaxiLogger(false);
		setShowRideHailingLogger(false);
		setShowCarpoolLogger(false);
		setShowBikeTaxiLogger(false);
        setShowPersonalVehicleLogger(false);
	};

	return (
		<>
			<div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50">
				<h2 className="text-3xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
					Log Your Travel Activity
				</h2>
				<div className="space-y-4">
					{transportCategories.map((category, index) => (
						<div
							key={category.title}
							className="bg-gradient-to-br from-slate-50/90 via-blue-50/80 to-indigo-50/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 transition-all duration-300"
						>
							<button
								onClick={() => toggleDropdown(index)}
								className="w-full text-left p-6 flex justify-between items-center cursor-pointer hover:bg-white/30 transition rounded-2xl"
							>
								<h3 className="text-xl font-bold text-gray-800 flex items-center">
									<span className="text-2xl mr-3">{category.emoji}</span>
									{category.title}
								</h3>
								<span className="text-gray-600 text-xl">
									{openIndex === index ? '▲' : '▼'}
								</span>
							</button>
							{openIndex === index && (
								<ul className="px-6 pb-4 space-y-2">
									{category.items.map((item) => (
										<li
											key={item}
											className="text-gray-700 hover:text-emerald-600 cursor-pointer flex items-center justify-between group p-2"
										>
											<span>{item}</span>
											<button
												onClick={() => handleLogClick(item)}
												className="opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-500 text-white text-xs px-2 py-1 rounded-lg"
											>
												Log
											</button>
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
			{showWalkingLogger && (
				<WalkingLogger
					onClose={() => setShowWalkingLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showBicycleLogger && (
				<BicycleLogger
					onClose={() => setShowBicycleLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showSkateboardLogger && (
				<SkateboardLogger
					onClose={() => setShowSkateboardLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showEScooterLogger && (
				<EScooterLogger
					onClose={() => setShowEScooterLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showEBikeLogger && (
				<EBikeLogger
					onClose={() => setShowEBikeLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showCityBusLogger && (
				<CityBusLogger
					onClose={() => setShowCityBusLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showMetroLogger && (
				<MetroLogger
					onClose={() => setShowMetroLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showTramLogger && (
				<TramLogger
					onClose={() => setShowTramLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showLocalTrainLogger && (
				<LocalTrainLogger
					onClose={() => setShowLocalTrainLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showFerryLogger && (
				<FerryLogger
					onClose={() => setShowFerryLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showAutoRickshawLogger && (
				<AutoRickshawLogger
					onClose={() => setShowAutoRickshawLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showCycleRickshawLogger && (
				<CycleRickshawLogger
					onClose={() => setShowCycleRickshawLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showTaxiLogger && (
				<TaxiLogger
					onClose={() => setShowTaxiLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showElectricTaxiLogger && (
				<ElectricTaxiLogger
					onClose={() => setShowElectricTaxiLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showRideHailingLogger && (
				<RideHailingLogger
					onClose={() => setShowRideHailingLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showCarpoolLogger && (
				<CarpoolLogger
					onClose={() => setShowCarpoolLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showBikeTaxiLogger && (
				<BikeTaxiLogger
					onClose={() => setShowBikeTaxiLogger(false)}
					onLog={handleLog}
				/>
			)}
			{showPersonalVehicleLogger && personalVehicleType && (
				<PersonalVehicleLogger
					vehicleType={personalVehicleType}
					onClose={() => setShowPersonalVehicleLogger(false)}
					onLog={handleLog}
				/>
			)}
		</>
	);
}
