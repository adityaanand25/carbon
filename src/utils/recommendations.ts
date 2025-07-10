import { Recommendation, CarbonData } from '../types';

export function getPersonalizedRecommendations(data: CarbonData): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Transport recommendations
  if (data.transport.carMiles > 20) {
    recommendations.push({
      id: 'reduce-driving',
      category: 'transport',
      title: 'Try Public Transport',
      description: 'Replace 2-3 car trips per week with public transport or carpooling',
      impact: 15,
      difficulty: 'easy',
      icon: 'Bus',
    });
  }

  if (data.transport.flights > 2) {
    recommendations.push({
      id: 'reduce-flights',
      category: 'transport',
      title: 'Consider Local Vacations',
      description: 'Explore nearby destinations instead of flying for short trips',
      impact: 25,
      difficulty: 'medium',
      icon: 'MapPin',
    });
  }

  // Energy recommendations
  if (data.energy.electricity > 30) {
    recommendations.push({
      id: 'reduce-electricity',
      category: 'energy',
      title: 'Switch to LED Bulbs',
      description: 'Replace incandescent bulbs with LED lights to reduce energy consumption',
      impact: 8,
      difficulty: 'easy',
      icon: 'Lightbulb',
    });
  }

  if (!data.energy.renewable) {
    recommendations.push({
      id: 'renewable-energy',
      category: 'energy',
      title: 'Switch to Renewable Energy',
      description: 'Contact your utility provider about renewable energy options',
      impact: 30,
      difficulty: 'medium',
      icon: 'Sun',
    });
  }

  // Food recommendations
  if (data.food.meat > 5) {
    recommendations.push({
      id: 'reduce-meat',
      category: 'food',
      title: 'Try Meatless Mondays',
      description: 'Reduce meat consumption by having one plant-based day per week',
      impact: 12,
      difficulty: 'easy',
      icon: 'Leaf',
    });
  }

  if (data.food.local < 3) {
    recommendations.push({
      id: 'buy-local',
      category: 'food',
      title: 'Shop Local Produce',
      description: 'Visit farmers markets and buy seasonal, local produce',
      impact: 8,
      difficulty: 'easy',
      icon: 'ShoppingBasket',
    });
  }

  // Lifestyle recommendations
  if (data.lifestyle.waste > 2) {
    recommendations.push({
      id: 'reduce-waste',
      category: 'lifestyle',
      title: 'Embrace Minimalism',
      description: 'Buy only what you need and choose quality over quantity',
      impact: 10,
      difficulty: 'medium',
      icon: 'Package',
    });
  }

  if (data.lifestyle.recycling < 2) {
    recommendations.push({
      id: 'increase-recycling',
      category: 'lifestyle',
      title: 'Improve Recycling Habits',
      description: 'Set up a proper recycling system at home',
      impact: 6,
      difficulty: 'easy',
      icon: 'RotateCcw',
    });
  }

  // Add some default recommendations if the list is empty or short
  if (recommendations.length < 3) {
    const defaultRecommendations: Recommendation[] = [
      {
        id: 'use-reusable-bags',
        category: 'lifestyle',
        title: 'Use Reusable Shopping Bags',
        description: 'Bring your own bags when shopping to reduce plastic waste',
        impact: 5,
        difficulty: 'easy',
        icon: 'ShoppingBag',
        completed: false
      },
      {
        id: 'optimize-heating',
        category: 'energy',
        title: 'Optimize Home Heating',
        description: 'Lower your thermostat by 1-2 degrees to save energy',
        impact: 10,
        difficulty: 'easy',
        icon: 'Thermometer',
        completed: false
      },
      {
        id: 'use-stairs',
        category: 'lifestyle',
        title: 'Take the Stairs',
        description: 'Use stairs instead of elevators for light exercise and energy savings',
        impact: 3,
        difficulty: 'easy',
        icon: 'ArrowUp',
        completed: false
      },
      {
        id: 'digital-receipts',
        category: 'lifestyle',
        title: 'Go Digital with Receipts',
        description: 'Choose email receipts over paper to reduce paper waste',
        impact: 4,
        difficulty: 'easy',
        icon: 'Mail',
        completed: false
      },
      {
        id: 'unplug-devices',
        category: 'energy',
        title: 'Unplug Unused Devices',
        description: 'Unplug electronics when not in use to eliminate phantom power draw',
        impact: 7,
        difficulty: 'easy',
        icon: 'Unplug',
        completed: false
      }
    ];

    // Add defaults that aren't already in the list
    defaultRecommendations.forEach(defaultRec => {
      if (!recommendations.find(rec => rec.id === defaultRec.id)) {
        recommendations.push(defaultRec);
      }
    });
  }

  return recommendations.slice(0, 6); // Return top 6 recommendations
}