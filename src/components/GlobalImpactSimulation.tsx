import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, Leaf, Zap } from 'lucide-react';

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
    <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
      {/* Enhanced gloss overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none group-hover:from-white/30"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/15"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-violet-300/10 to-purple-300/5 rounded-full blur-3xl group-hover:from-violet-300/20 group-hover:to-purple-300/10"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">Global Impact</h2>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/30">
            <span className="text-sm font-semibold">Community Power</span>
          </div>
        </div>

        {/* Global Stats Grid - Enhanced */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl group-hover:from-white/20"></div>
            <div className="relative z-10">
              <Users className="h-8 w-8 mx-auto mb-3 text-emerald-200 drop-shadow-lg" />
              <div className="text-3xl font-bold mb-1 text-white drop-shadow-lg">
                {animatedStats.totalUsers.toLocaleString()}
              </div>
              <div className="text-sm opacity-90 font-medium">Active Users</div>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl group-hover:from-white/20"></div>
            <div className="relative z-10">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-green-200 drop-shadow-lg" />
              <div className="text-3xl font-bold mb-1 text-white drop-shadow-lg">
                {animatedStats.carbonSaved.toFixed(1)}T
              </div>
              <div className="text-sm opacity-90 font-medium">CO₂ Saved</div>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl group-hover:from-white/20"></div>
            <div className="relative z-10">
              <Leaf className="h-8 w-8 mx-auto mb-3 text-teal-200 drop-shadow-lg" />
              <div className="text-3xl font-bold mb-1 text-white drop-shadow-lg">
                {animatedStats.treesEquivalent.toLocaleString()}
              </div>
              <div className="text-sm opacity-90 font-medium">Trees Planted</div>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl group-hover:from-white/20"></div>
            <div className="relative z-10">
              <Zap className="h-8 w-8 mx-auto mb-3 text-yellow-200 drop-shadow-lg" />
              <div className="text-3xl font-bold mb-1 text-white drop-shadow-lg">
                {(animatedStats.energySaved / 1000).toFixed(1)}K
              </div>
              <div className="text-sm opacity-90 font-medium">kWh Saved</div>
            </div>
          </div>
        </div>

        {/* Community Impact Examples */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl group-hover:from-white/20"></div>
          <div className="relative z-10">
            <h4 className="font-bold mb-4 text-lg text-white drop-shadow-lg">Today's Community Impact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-emerald-100">If 1,000 users took public transport today:</span>
                <span className="font-bold text-emerald-200 bg-white/10 px-3 py-1 rounded-lg">-8.2 tons CO₂</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-emerald-100">If 1,000 users went plant-based for a day:</span>
                <span className="font-bold text-emerald-200 bg-white/10 px-3 py-1 rounded-lg">-6.6 tons CO₂</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-emerald-100">If 1,000 users used renewable energy:</span>
                <span className="font-bold text-emerald-200 bg-white/10 px-3 py-1 rounded-lg">-12.4 tons CO₂</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl group-hover:from-white/20"></div>
          <div className="relative z-10">
            <h4 className="font-bold mb-4 text-lg text-white drop-shadow-lg">Your Contribution</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-200 drop-shadow-lg">
                  {userImpactPercentage > 0 ? userImpactPercentage.toFixed(1) : 0}%
                </div>
                <div className="text-xs opacity-90">Below Global Average</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-200 drop-shadow-lg">{userActions}</div>
                <div className="text-xs opacity-90">Eco Actions Taken</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}