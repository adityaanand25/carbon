import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Target, Zap, TreePine } from 'lucide-react';
import { CarbonFootprint } from '../types';
import CarbonAnalytics from './CarbonAnalytics';

interface RealTimeDashboardProps {
  footprint: CarbonFootprint;
  todayActivities: number;
  weeklyTrend: number;
}

export default function RealTimeDashboard({ footprint, todayActivities, weeklyTrend }: RealTimeDashboardProps) {
  const [animatedDaily, setAnimatedDaily] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);
  
  // Mock data for the enhanced dashboard features
  const [dashboardData, setDashboardData] = useState({
    weeklyGoal: 50, // kg CO2e per week (converted from daily * 7)
    currentWeekEmissions: footprint.weekly || footprint.daily * 7,
    previousWeekEmissions: (footprint.daily * 7) + (weeklyTrend / 100 * footprint.daily * 7),
    streak: 5,
    totalTreesEquivalent: Math.floor((footprint.daily * 30) / 21.77), // Monthly equivalent
    userLevel: 3,
    totalPoints: 2750,
    weeklyRank: 12,
    challengeMultiplier: 1.5,
    dailyEmissions: [
      { date: '2025-07-01', emissions: footprint.daily * 0.8, transport: 'Public Transport' },
      { date: '2025-07-02', emissions: footprint.daily * 1.2, transport: 'Car' },
      { date: '2025-07-03', emissions: footprint.daily * 0.9, transport: 'Walking' },
      { date: '2025-07-04', emissions: footprint.daily * 0.7, transport: 'Cycling' },
      { date: '2025-07-05', emissions: footprint.daily * 1.1, transport: 'E-Scooter' },
      { date: '2025-07-06', emissions: footprint.daily * 0.6, transport: 'Public Transport' },
      { date: '2025-07-07', emissions: footprint.daily, transport: 'Walking' },
    ],
    weeklyData: [
      { week: 'Week 1', emissions: footprint.daily * 7 * 1.1, goal: 50 },
      { week: 'Week 2', emissions: footprint.daily * 7 * 1.05, goal: 50 },
      { week: 'Week 3', emissions: footprint.daily * 7 * 0.95, goal: 50 },
      { week: 'Week 4', emissions: footprint.daily * 7, goal: 50 },
    ],
    transportBreakdown: [
      { mode: 'Car', emissions: footprint.daily * 0.6, percentage: 60 },
      { mode: 'Public Transport', emissions: footprint.daily * 0.2, percentage: 20 },
      { mode: 'Walking/Cycling', emissions: footprint.daily * 0.05, percentage: 5 },
      { mode: 'E-Scooter', emissions: footprint.daily * 0.1, percentage: 10 },
      { mode: 'Other', emissions: footprint.daily * 0.05, percentage: 5 },
    ],
    monthlyComparison: [
      { month: 'This Month', current: footprint.daily * 30, previous: footprint.daily * 30 * 1.1 },
    ],
    calendarData: [
      // Generate mock calendar data for current month
      ...Array.from({ length: 30 }, (_, i) => ({
        date: `2025-07-${String(i + 1).padStart(2, '0')}`,
        carbonScore: footprint.daily * (0.7 + Math.random() * 0.6),
        emissions: footprint.daily * (0.7 + Math.random() * 0.6),
        level: Math.random() > 0.5 ? 'low' : Math.random() > 0.7 ? 'medium' : 'high' as 'low' | 'medium' | 'high' | 'very-high',
        activities: [],
        activitiesCount: Math.floor(Math.random() * 5) + 1,
        transport: [['Car', 'Walking', 'Public Transport', 'E-Scooter'][Math.floor(Math.random() * 4)]]
      }))
    ]
  });

  useEffect(() => {
    // Animate the daily score
    const timer = setTimeout(() => {
      setAnimatedDaily(footprint.daily);
    }, 100);

    // Trigger pulse animation when footprint changes
    setPulseActive(true);
    const pulseTimer = setTimeout(() => setPulseActive(false), 1000);

    // Update dashboard data when footprint changes
    setDashboardData(prev => ({
      ...prev,
      currentWeekEmissions: footprint.daily * 7,
      dailyEmissions: prev.dailyEmissions.map((day, index) => ({
        ...day,
        emissions: index === 6 ? footprint.daily : day.emissions
      }))
    }));

    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
    };
  }, [footprint.daily, weeklyTrend]);

  const getCarbonLevel = (score: number) => {
    if (score < 5) return { 
      level: 'Excellent', 
      color: 'text-emerald-700', 
      bg: 'bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100',
      glow: 'shadow-emerald-200/50'
    };
    if (score < 10) return { 
      level: 'Good', 
      color: 'text-green-700', 
      bg: 'bg-gradient-to-br from-green-100 via-lime-100 to-emerald-100',
      glow: 'shadow-green-200/50'
    };
    if (score < 15) return { 
      level: 'Fair', 
      color: 'text-yellow-700', 
      bg: 'bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100',
      glow: 'shadow-yellow-200/50'
    };
    return { 
      level: 'Needs Work', 
      color: 'text-red-700', 
      bg: 'bg-gradient-to-br from-red-100 via-pink-100 to-rose-100',
      glow: 'shadow-red-200/50'
    };
  };

  const level = getCarbonLevel(footprint.daily);
  const globalAverage = 13.1; // kg CO2e per day
  const percentageDiff = ((footprint.daily - globalAverage) / globalAverage) * 100;
  const todayProgress = (footprint.daily / (dashboardData.weeklyGoal / 7)) * 100;

  return (
    <div className="space-y-6">
      {/* Real-Time Status Bar */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl p-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span className="font-semibold text-sm">Live Carbon Dashboard</span>
            <span className="text-green-100 text-xs">Real-time tracking active</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-sm font-bold">{footprint.daily.toFixed(1)}kg</div>
              <div className="text-xs text-green-100">Today's CO₂</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold">{todayProgress.toFixed(1)}%</div>
              <div className="text-xs text-green-100">Daily Progress</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold">{dashboardData.streak} days</div>
              <div className="text-xs text-green-100">Current Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid - All cards stacked vertically */}
      <div className="space-y-6">
        {/* Real-Time Score Card */}
        <div className="w-full">
          <div className="h-[580px] bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 rounded-2xl shadow-xl p-5 relative overflow-hidden border border-cyan-100/50 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
            {/* Gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none group-hover:from-white/40"></div>
            <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-200/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-teal-200/15 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-700 to-teal-800 bg-clip-text text-transparent">
                  Real-Time Score
                </h2>
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-cyan-200/50 shadow-lg">
                  <Activity className={`h-4 w-4 text-cyan-600 ${pulseActive ? 'animate-pulse' : ''}`} />
                  <span className="text-xs font-semibold text-cyan-700">Live</span>
                </div>
              </div>

              {/* Main Score Display */}
              <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${level.bg} mb-4 ${pulseActive ? 'animate-pulse' : ''} shadow-xl ${level.glow} border border-white/40 relative overflow-hidden mx-auto`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full"></div>
                  <div className="absolute top-1 left-1 w-6 h-6 bg-white/30 rounded-full blur-lg"></div>
                  
                  <div className="text-center relative z-10">
                    <div className={`text-3xl font-bold ${level.color} transition-all duration-1000 drop-shadow-lg`}>
                      {animatedDaily.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">kg CO₂e</div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${level.color} mb-2 drop-shadow-sm`}>{level.level}</div>
                <div className="text-sm text-gray-600 font-medium">Today's Carbon Footprint</div>
              </div>

              {/* Comparison with Global Average */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/50 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">vs Global Average</span>
                  <div className="flex items-center space-x-2 bg-gray-50/80 rounded-lg px-2 py-1">
                    {percentageDiff < 0 ? (
                      <TrendingDown className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-xs font-bold ${percentageDiff < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {Math.abs(percentageDiff).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 shadow-lg ${
                      percentageDiff < 0 ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.abs(percentageDiff))}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1 font-medium">
                  <span>You: {footprint.daily.toFixed(1)} kg</span>
                  <span>Average: {globalAverage} kg</span>
                </div>
              </div>

              {/* Real-time Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 shadow-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Target className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-semibold text-gray-700">Activities</span>
                  </div>
                  <div className="text-xl font-bold text-blue-600">{todayActivities}</div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 shadow-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Zap className="h-3 w-3 text-emerald-600" />
                    <span className="text-xs font-semibold text-gray-700">Trend</span>
                  </div>
                  <div className={`text-xl font-bold ${weeklyTrend < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {weeklyTrend > 0 ? '+' : ''}{weeklyTrend.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard Card */}
        <div className="w-full">
          <CarbonAnalytics
            weeklyData={dashboardData.weeklyData}
            dailyData={dashboardData.dailyEmissions.map(day => ({
              ...day,
              transport: 'Mixed'
            }))}
            transportBreakdown={dashboardData.transportBreakdown}
            monthlyComparison={dashboardData.monthlyComparison}
          />
        </div>

        {/* Environmental Impact Card */}
        <div className="w-full">
          <div className="h-[580px] bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-4 border border-white/50 overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <TreePine className="w-5 h-5 mr-2 text-green-600" />
              Environmental Impact
            </h3>
            
            <div className="space-y-4">
              {/* Trees Equivalent */}
              <div className="bg-green-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Trees Planted Equivalent</span>
                  <span className="text-xl">🌳</span>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {Math.floor(weeklyTrend < 0 ? Math.abs(weeklyTrend) * 2 : 0)}
                </div>
                <div className="text-xs text-gray-600">Based on weekly carbon reduction</div>
              </div>

              {/* Weekly Comparison */}
              <div className="bg-blue-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Weekly Progress</span>
                  <span className="text-xl">📊</span>
                </div>
                <div className={`text-2xl font-bold mb-1 ${weeklyTrend < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {weeklyTrend > 0 ? '+' : ''}{weeklyTrend.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">
                  {weeklyTrend < 0 ? 'Improvement from last week!' : 'Try to reduce this week'}
                </div>
              </div>

              {/* Current Streak */}
              <div className="bg-purple-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Current Streak</span>
                  <span className="text-xl">🔥</span>
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {dashboardData.streak} days
                </div>
                <div className="text-xs text-gray-600">Keep up the momentum!</div>
              </div>

              {/* Monthly Overview */}
              <div className="bg-yellow-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Monthly Overview</span>
                  <span className="text-xl">📈</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {(footprint.daily * 30).toFixed(1)}g
                </div>
                <div className="text-xs text-gray-600">Total emissions this month</div>
              </div>

              {/* Goal Progress */}
              <div className="bg-indigo-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Goal Achievement</span>
                  <span className="text-xl">🎯</span>
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  {todayProgress.toFixed(0)}%
                </div>
                <div className="text-xs text-gray-600">Daily goal progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 border border-white/50 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Log Trip', icon: '🚗', color: 'bg-blue-500' },
            { label: 'Set Goal', icon: '🎯', color: 'bg-green-500' },
            { label: 'View Calendar', icon: '📅', color: 'bg-purple-500' },
            { label: 'Share Progress', icon: '📊', color: 'bg-orange-500' },
          ].map((action, index) => (
            <button
              key={index}
              className={`${action.color} text-white rounded-xl p-3 hover:scale-105 transition-transform duration-200 shadow-lg`}
            >
              <div className="text-xl mb-1">{action.icon}</div>
              <div className="font-semibold text-sm">{action.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Live Update Indicator */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/30 shadow-lg">
          <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full animate-pulse shadow-lg"></div>
          <span className="text-sm text-gray-600 font-medium">Dashboard updates automatically as you log activities</span>
        </div>
      </div>
    </div>
  );
}