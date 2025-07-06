import React, { useState } from 'react';
import { MapPin, Car, Bus, Bike, Clock, DollarSign, Leaf, Navigation } from 'lucide-react';
import { RouteOption } from '../types';

interface RouteComparisonProps {
  onRouteSelect: (route: RouteOption) => void;
}

export default function RouteComparison({ onRouteSelect }: RouteComparisonProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock route data - in production, this would come from Google Maps API
  const mockRoutes: RouteOption[] = [
    {
      mode: 'Car',
      duration: 25,
      distance: 12.5,
      carbonImpact: 5.05,
      cost: 8.50,
      icon: 'Car',
      color: 'bg-red-500',
    },
    {
      mode: 'Public Transport',
      duration: 35,
      distance: 14.2,
      carbonImpact: 1.26,
      cost: 3.25,
      icon: 'Bus',
      color: 'bg-blue-500',
    },
    {
      mode: 'Cycling',
      duration: 45,
      distance: 12.8,
      carbonImpact: 0,
      cost: 0,
      icon: 'Bike',
      color: 'bg-green-500',
    },
    {
      mode: 'Walking',
      duration: 120,
      distance: 12.5,
      carbonImpact: 0,
      cost: 0,
      icon: 'MapPin',
      color: 'bg-emerald-500',
    },
  ];

  const handleSearch = async () => {
    if (!origin || !destination) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRoutes(mockRoutes);
      setIsLoading(false);
    }, 1500);
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Car, Bus, Bike, MapPin
    };
    return icons[iconName] || MapPin;
  };

  const getBestOption = () => {
    if (routes.length === 0) return null;
    return routes.reduce((best, current) => 
      current.carbonImpact < best.carbonImpact ? current : best
    );
  };

  const bestRoute = getBestOption();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Route Comparison</h2>
        <div className="bg-green-100 p-3 rounded-xl">
          <Navigation className="h-6 w-6 text-green-600" />
        </div>
      </div>

      {/* Search Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter starting location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!origin || !destination || isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              <span>Finding routes...</span>
            </>
          ) : (
            <>
              <Navigation className="h-5 w-5" />
              <span>Compare Routes</span>
            </>
          )}
        </button>
      </div>

      {/* Best Route Highlight */}
      {bestRoute && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Eco-Friendly Recommendation</h3>
              <p className="text-sm text-green-700">{bestRoute.mode} - Lowest carbon impact</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {bestRoute.carbonImpact.toFixed(2)} kg CO₂
          </div>
        </div>
      )}

      {/* Route Options */}
      {routes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Route Options</h3>
          {routes.map((route, index) => {
            const IconComponent = getIcon(route.icon);
            const isEcoFriendly = route === bestRoute;
            
            return (
              <div
                key={index}
                className={`border rounded-xl p-4 transition-all hover:shadow-md cursor-pointer ${
                  isEcoFriendly ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => onRouteSelect(route)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${route.color} bg-opacity-20`}>
                      <IconComponent className={`h-6 w-6 ${route.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{route.mode}</h4>
                      <p className="text-sm text-gray-600">{route.distance} miles</p>
                    </div>
                  </div>
                  
                  {isEcoFriendly && (
                    <div className="bg-green-100 px-3 py-1 rounded-full">
                      <span className="text-xs font-medium text-green-800">Best Choice</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Time</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">{route.duration}min</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Cost</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {route.cost === 0 ? 'Free' : `$${route.cost.toFixed(2)}`}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Leaf className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">CO₂</span>
                    </div>
                    <div className={`text-lg font-bold ${
                      route.carbonImpact === 0 ? 'text-green-600' : 
                      route.carbonImpact < 2 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {route.carbonImpact.toFixed(2)}kg
                    </div>
                  </div>
                </div>
                
                {/* Carbon Comparison Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Carbon Impact</span>
                    <span>vs Car: {route.mode === 'Car' ? '0%' : `-${(((mockRoutes[0].carbonImpact - route.carbonImpact) / mockRoutes[0].carbonImpact) * 100).toFixed(0)}%`}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        route.carbonImpact === 0 ? 'bg-green-500' :
                        route.carbonImpact < 2 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max(5, (route.carbonImpact / mockRoutes[0].carbonImpact) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Map Placeholder */}
      {routes.length > 0 && (
        <div className="mt-6 bg-gray-100 rounded-xl h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Interactive map would appear here</p>
            <p className="text-sm text-gray-500">Showing route visualization and real-time traffic</p>
          </div>
        </div>
      )}
    </div>
  );
}