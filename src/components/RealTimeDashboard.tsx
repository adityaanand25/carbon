import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Target, Zap } from 'lucide-react';
import { CarbonFootprint } from '../types';

interface RealTimeDashboardProps {
  footprint: CarbonFootprint;
  todayActivities: number;
  weeklyTrend: number;
}

export default function RealTimeDashboard({ footprint, todayActivities, weeklyTrend }: RealTimeDashboardProps) {
  const [animatedDaily, setAnimatedDaily] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    // Animate the daily score
    const timer = setTimeout(() => {
      setAnimatedDaily(footprint.daily);
    }, 100);

    // Trigger pulse animation when footprint changes
    setPulseActive(true);
    const pulseTimer = setTimeout(() => setPulseActive(false), 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
    };
  }, [footprint.daily]);

  const getCarbonLevel = (score: number) => {
    if (score < 5) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score < 10) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score < 15) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Needs Work', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const level = getCarbonLevel(footprint.daily);
  const globalAverage = 13.1; // kg CO2e per day
  const percentageDiff = ((footprint.daily - globalAverage) / globalAverage) * 100;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Real-Time Carbon Score</h2>
        <div className="flex items-center space-x-2">
          <Activity className={`h-5 w-5 text-green-600 ${pulseActive ? 'animate-pulse' : ''}`} />
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      {/* Main Score Display */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${level.bg} mb-4 ${pulseActive ? 'animate-pulse' : ''}`}>
          <div className="text-center">
            <div className={`text-4xl font-bold ${level.color} transition-all duration-1000`}>
              {animatedDaily.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">kg CO₂e</div>
          </div>
        </div>
        <div className={`text-lg font-semibold ${level.color} mb-2`}>{level.level}</div>
        <div className="text-sm text-gray-600">Today's Carbon Footprint</div>
      </div>

      {/* Comparison with Global Average */}
      <div className="bg-white rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">vs Global Average</span>
          <div className="flex items-center space-x-1">
            {percentageDiff < 0 ? (
              <TrendingDown className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingUp className="h-4 w-4 text-red-600" />
            )}
            <span className={`text-sm font-bold ${percentageDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(percentageDiff).toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${
              percentageDiff < 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(100, Math.abs(percentageDiff))}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>You: {footprint.daily.toFixed(1)} kg</span>
          <span>Average: {globalAverage} kg</span>
        </div>
      </div>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Today's Activities</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{todayActivities}</div>
          <div className="text-xs text-gray-600">logged actions</div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Weekly Trend</span>
          </div>
          <div className={`text-2xl font-bold ${weeklyTrend < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {weeklyTrend > 0 ? '+' : ''}{weeklyTrend.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-600">vs last week</div>
        </div>
      </div>

      {/* Category Breakdown with Animation */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Today's Breakdown</h3>
        {[
          { name: 'Transport', value: footprint.breakdown.transport, color: 'bg-blue-500', max: 20 },
          { name: 'Energy', value: footprint.breakdown.energy, color: 'bg-yellow-500', max: 15 },
          { name: 'Food', value: footprint.breakdown.food, color: 'bg-green-500', max: 10 },
          { name: 'Lifestyle', value: footprint.breakdown.lifestyle, color: 'bg-purple-500', max: 8 },
        ].map((category) => (
          <div key={category.name} className="flex items-center space-x-3">
            <div className="w-16 text-xs font-medium text-gray-600">{category.name}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className={`${category.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${Math.min(100, (category.value / category.max) * 100)}%` }}
              />
            </div>
            <div className="w-12 text-xs font-bold text-gray-800 text-right">
              {category.value.toFixed(1)}
            </div>
          </div>
        ))}
      </div>

      {/* Live Update Indicator */}
      <div className="flex items-center justify-center mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Updates automatically as you log activities</span>
        </div>
      </div>
    </div>
  );
}