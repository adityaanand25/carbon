export const vehicleData = {
  'Petrol Car': { name: 'Petrol Car', co2: 192, energy: 2.3 },
  'Diesel Car': { name: 'Diesel Car', co2: 171, energy: 2.0 },
  'Electric Car': { name: 'Electric Car', co2: 70, energy: 0.54 },
  'Petrol Scooter': { name: 'Petrol Scooter', co2: 90, energy: 1.5 },
};

export const activityData: Record<string, { name: string; co2: number; energy: number }> = {
  // Non-Motorized
  Walking: { name: 'Walking', co2: 0, energy: 0.2 }, // Metabolic energy
  Bicycle: { name: 'Bicycle', co2: 16, energy: 0.4 }, // Food + lifecycle
  Skateboard: { name: 'Skateboard', co2: 0, energy: 0.3 }, // Metabolic
  Rollerblades: { name: 'Rollerblades', co2: 0, energy: 0.25 },

  // Light Electric
  'E-Scooter': { name: 'E-Scooter', co2: 25, energy: 0.075 },
  'E-Bike': { name: 'E-Bike', co2: 20, energy: 0.06 },
  'Electric Skateboard': { name: 'Electric Skateboard', co2: 13, energy: 0.06 },

  // Public Transport (per passenger-km)
  'City Bus': { name: 'City Bus', co2: 105, energy: 1.5 },
  'Metro/Subway': { name: 'Metro/Subway', co2: 65, energy: 0.8 },
  'Tram/Light Rail': { name: 'Tram/Light Rail', co2: 45, energy: 0.6 },
  'Local Train': { name: 'Local Train', co2: 85, energy: 1.1 },
  'Ferry/Water Taxi': { name: 'Ferry/Water Taxi', co2: 300, energy: 3.5 },

  // Shared & On-Demand
  'Auto-Rickshaw': { name: 'Auto-Rickshaw', co2: 110, energy: 1.8 },
  'Cycle-Rickshaw': { name: 'Cycle-Rickshaw', co2: 5, energy: 0.5 }, // Rider's effort
  'Taxi (Petrol/Diesel)': { name: 'Taxi (Petrol/Diesel)', co2: 180, energy: 2.2 },
  'Electric Taxi': { name: 'Electric Taxi', co2: 65, energy: 0.5 },
  'Ride-Hailing (Ola/Uber)': { name: 'Ride-Hailing (Ola/Uber)', co2: 160, energy: 2.0 }, // Includes deadheading
  'Carpool (Private/Shared)': { name: 'Carpool (Private/Shared)', co2: 96, energy: 1.15 }, // Assumes 2 people
  'Bike Taxi': { name: 'Bike Taxi', co2: 80, energy: 1.3 },

  // Personal Vehicle
  'Petrol Car': { name: 'Petrol Car', co2: 192, energy: 2.3 },
  'Diesel Car': { name: 'Diesel Car', co2: 171, energy: 2.0 },
  'CNG Car': { name: 'CNG Car', co2: 140, energy: 1.9 },
  'Electric Car': { name: 'Electric Car', co2: 70, energy: 0.54 },
  'Motorcycle/Scooter (Petrol)': { name: 'Motorcycle/Scooter (Petrol)', co2: 90, energy: 1.5 },
  'Electric Scooter/Bike': { name: 'Electric Scooter/Bike', co2: 22, energy: 0.07 },
};

export const transportData = { ...vehicleData, ...activityData };

export type TransportMode = keyof typeof transportData;
