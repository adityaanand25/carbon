import { CarbonData, CarbonFootprint } from '../types';

// Carbon emission factors (kg CO2e per unit)
const EMISSION_FACTORS = {
  transport: {
    carMiles: 0.404, // kg CO2e per mile
    publicTransport: 0.089, // kg CO2e per mile
    flights: 0.255, // kg CO2e per mile
    walking: 0,
    cycling: 0,
  },
  energy: {
    electricity: 0.92, // kg CO2e per kWh
    gas: 2.04, // kg CO2e per therm
    renewableReduction: 0.8, // 80% reduction for renewable energy
  },
  food: {
    meat: 6.61, // kg CO2e per serving
    dairy: 3.2, // kg CO2e per serving
    local: -0.5, // reduction for local food
    processed: 2.5, // kg CO2e per serving
  },
  lifestyle: {
    shopping: 0.5, // kg CO2e per dollar spent
    waste: 0.46, // kg CO2e per kg waste
    recycling: -0.2, // reduction per kg recycled
  },
};

export function calculateCarbonFootprint(data: CarbonData): CarbonFootprint {
  // Calculate transport emissions
  const transport = 
    data.transport.carMiles * EMISSION_FACTORS.transport.carMiles +
    data.transport.publicTransport * EMISSION_FACTORS.transport.publicTransport +
    data.transport.flights * EMISSION_FACTORS.transport.flights;

  // Calculate energy emissions
  let energy = 
    data.energy.electricity * EMISSION_FACTORS.energy.electricity +
    data.energy.gas * EMISSION_FACTORS.energy.gas;
  
  if (data.energy.renewable) {
    energy *= (1 - EMISSION_FACTORS.energy.renewableReduction);
  }

  // Calculate food emissions
  const food = 
    data.food.meat * EMISSION_FACTORS.food.meat +
    data.food.dairy * EMISSION_FACTORS.food.dairy +
    data.food.local * EMISSION_FACTORS.food.local +
    data.food.processed * EMISSION_FACTORS.food.processed;

  // Calculate lifestyle emissions
  const lifestyle = 
    data.lifestyle.shopping * EMISSION_FACTORS.lifestyle.shopping +
    data.lifestyle.waste * EMISSION_FACTORS.lifestyle.waste +
    data.lifestyle.recycling * EMISSION_FACTORS.lifestyle.recycling;

  const daily = Math.max(0, transport + energy + food + lifestyle);

  return {
    daily,
    weekly: daily * 7,
    monthly: daily * 30,
    yearly: daily * 365,
    breakdown: {
      transport: Math.max(0, transport),
      energy: Math.max(0, energy),
      food: Math.max(0, food),
      lifestyle: Math.max(0, lifestyle),
    },
  };
}

export function getCarbonLevel(yearlyFootprint: number): { level: number; title: string; color: string } {
  if (yearlyFootprint < 2000) return { level: 5, title: 'Eco Champion', color: 'text-green-600' };
  if (yearlyFootprint < 4000) return { level: 4, title: 'Green Guardian', color: 'text-green-500' };
  if (yearlyFootprint < 6000) return { level: 3, title: 'Earth Friend', color: 'text-yellow-500' };
  if (yearlyFootprint < 8000) return { level: 2, title: 'Climate Aware', color: 'text-orange-500' };
  return { level: 1, title: 'Getting Started', color: 'text-red-500' };
}