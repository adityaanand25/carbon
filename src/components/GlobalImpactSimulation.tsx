import React, { useState, useEffect } from 'react';
import { Globe, Users, TrendingUp, Leaf, Zap } from 'lucide-react';

interface GlobalImpactSimulationProps {
  userFootprint: number;
  userActions: number;
}

export default function GlobalImpactSimulation({ userFootprint, userActions }: GlobalImpactSimulationProps) {
  const [animatedStats, setAnimatedStats] = useState({
    totalUsers: 0,
    carbonSaved: 0,
    treesEquivalent: 0,
    energySaved: 0,
  });

  const globalStats = {
    totalUsers: 12847,
    carbonSaved: 2847.3, // tons CO2
    treesEquivalent: 1423,
    energySaved: 45892, // kWh
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(globalStats);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const userImpactPercentage = ((4800 - userFootprint) / 4800) * 100;
  const globalAverage = 4800;

  return (
    <div className="bg-gradient-to-br from-blue-600 via-green-600 to-emerald-700 rounded-2xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Global Impact</h2>
        <div className="bg-white/20 p-3 rounded-xl">
          <Globe className="h-6 w-6" />
        </div>
      </div>

      {/* Earth Visualization */}
      <div className="relative mb-8">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-green-400 rounded-full shadow-lg flex items-center justify-center mb-4 animate-pulse">
          <Globe className="h-16 w-16 text-white animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Your Impact Ripples Globally</p>
          <p className="text-sm opacity-90">
            Every action you take joins thousands of others creating positive change
          </p>
        </div>
      </div>

      {/* Global Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <Users className="h-6 w-6 mx-auto mb-2 text-blue-200" />
          <div className="text-2xl font-bold">
            {animatedStats.totalUsers.toLocaleString()}
          </div>
          <div className="text-sm opacity-90">Active Users</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-200" />
          <div className="text-2xl font-bold">
            {animatedStats.carbonSaved.toFixed(1)}T
          </div>
          <div className="text-sm opacity-90">CO₂ Saved</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <Leaf className="h-6 w-6 mx-auto mb-2 text-emerald-200" />
          <div className="text-2xl font-bold">
            {animatedStats.treesEquivalent.toLocaleString()}
          </div>
          <div className="text-sm opacity-90">Trees Planted</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-200" />
          <div className="text-2xl font-bold">
            {(animatedStats.energySaved / 1000).toFixed(0)}MWh
          </div>
          <div className="text-sm opacity-90">Energy Saved</div>
        </div>
      </div>

      {/* Collective Impact Scenarios */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">If Everyone Did What You Do...</h3>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Global CO₂ Reduction</span>
            <span className="font-bold">{userImpactPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all duration-2000"
              style={{ width: `${Math.min(100, userImpactPercentage)}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <h4 className="font-semibold mb-2">Collective Power</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>If 1,000 users took public transport today:</span>
              <span className="font-bold text-green-200">-8.2 tons CO₂</span>
            </div>
            <div className="flex justify-between">
              <span>If 1,000 users went plant-based for a day:</span>
              <span className="font-bold text-green-200">-6.6 tons CO₂</span>
            </div>
            <div className="flex justify-between">
              <span>If 1,000 users used renewable energy:</span>
              <span className="font-bold text-green-200">-12.4 tons CO₂</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <h4 className="font-semibold mb-2">Your Contribution</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm">Personal footprint vs global average:</span>
            <div className="flex items-center space-x-2">
              {userFootprint < globalAverage ? (
                <TrendingUp className="h-4 w-4 text-green-300 rotate-180" />
              ) : (
                <TrendingUp className="h-4 w-4 text-red-300" />
              )}
              <span className={`font-bold ${userFootprint < globalAverage ? 'text-green-300' : 'text-red-300'}`}>
                {((userFootprint - globalAverage) / globalAverage * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <p className="text-sm opacity-90 mb-3">
          Join the movement. Every small action creates a wave of change.
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            <span>Real-time impact</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
            <span>Global community</span>
          </div>
        </div>
      </div>
    </div>
  );
}