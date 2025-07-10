import { TrendingDown, BarChart3, Calendar, TreePine, TrendingUp } from 'lucide-react';

interface CarbonAnalyticsProps {
  weeklyData: { week: string; emissions: number; goal: number }[];
  dailyData: { date: string; emissions: number; transport: string }[];
  transportBreakdown: { mode: string; emissions: number; percentage: number }[];
  monthlyComparison: { month: string; current: number; previous: number }[];
}

export default function CarbonAnalytics({ 
  weeklyData, 
  dailyData, 
  transportBreakdown 
}: CarbonAnalyticsProps) {
  
  // Calculate statistics
  const totalEmissionsThisWeek = dailyData.reduce((sum, day) => sum + day.emissions, 0);
  const avgDailyEmissions = totalEmissionsThisWeek / 7;
  const trendPercentage = weeklyData.length > 1 
    ? ((weeklyData[weeklyData.length - 1].emissions - weeklyData[weeklyData.length - 2].emissions) / weeklyData[weeklyData.length - 2].emissions) * 100
    : 0;

  // Simple chart component using CSS
  const SimpleBarChart = ({ data, title }: { data: any[], title: string }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.current || d.emissions, d.previous || d.goal)));
    
    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700">{title}</h4>
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{item.week || item.month}</span>
              <span>{item.emissions || item.current}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((item.emissions || item.current) / maxValue) * 100}%` }}
              />
            </div>
            {(item.goal || item.previous) && (
              <div className="text-xs text-gray-500">
                Goal/Previous: {item.goal || item.previous}g
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const SimplePieChart = ({ data, title }: { data: any[], title: string }) => {
    let startAngle = 0;
    const total = data.reduce((sum, item) => sum + item.percentage, 0);
    
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-700">{title}</h4>
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {data.map((item, index) => {
                const percentage = (item.percentage / total) * 100;
                const strokeDasharray = `${percentage} ${100 - percentage}`;
                const strokeDashoffset = -startAngle;
                startAngle += percentage;
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="15.915"
                    fill="transparent"
                    stroke={colors[index % colors.length]}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
          </div>
          <div className="space-y-2 flex-1">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="text-sm text-gray-700">{item.mode}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[580px] bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-4 border border-white/50 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-emerald-800 bg-clip-text text-transparent">
          Analytics Dashboard
        </h2>
        <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-blue-200/50 shadow-lg">
          <BarChart3 className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-semibold text-blue-700">Live Data</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">Week Total</span>
              <Calendar className="w-3 h-3 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-blue-600">{totalEmissionsThisWeek.toFixed(1)}kg</div>
            <div className="text-xs text-gray-600">CO₂ emissions</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-3 border border-emerald-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">Daily Avg</span>
              <TreePine className="w-3 h-3 text-emerald-600" />
            </div>
            <div className="text-lg font-bold text-emerald-600">{avgDailyEmissions.toFixed(1)}kg</div>
            <div className="text-xs text-gray-600">Per day</div>
          </div>
        </div>

        {/* Trend Indicator */}
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-3 border border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Weekly Trend</span>
              <div className={`text-lg font-bold ${trendPercentage < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {trendPercentage > 0 ? '+' : ''}{trendPercentage.toFixed(1)}%
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {trendPercentage < 0 ? (
                <TrendingDown className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-xs font-medium ${trendPercentage < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                vs last week
              </span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-4">
          {/* Weekly Trend Chart */}
          <div className="bg-white/90 backdrop-blur-lg rounded-xl p-4 border border-white/50 shadow-lg">
            <SimpleBarChart data={weeklyData} title="Weekly Emissions Trend" />
          </div>

          {/* Transport Breakdown */}
          <div className="bg-white/90 backdrop-blur-lg rounded-xl p-4 border border-white/50 shadow-lg">
            <SimplePieChart data={transportBreakdown} title="Transport Mode Breakdown" />
          </div>

          {/* Weekly Overview */}
          <div className="bg-white/90 backdrop-blur-lg rounded-xl p-4 border border-white/50 shadow-lg">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-emerald-600" />
              Weekly Progress Overview
            </h4>
            <div className="space-y-3">
              {weeklyData.map((week, index) => {
                const percentage = (week.emissions / week.goal) * 100;
                const isOverGoal = percentage > 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{week.week}</span>
                      <span className={isOverGoal ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                        {week.emissions.toFixed(1)}kg / {week.goal}kg
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isOverGoal 
                            ? 'bg-gradient-to-r from-red-400 to-red-600' 
                            : 'bg-gradient-to-r from-emerald-400 to-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      {isOverGoal ? `${(percentage - 100).toFixed(1)}% over goal` : `${(100 - percentage).toFixed(1)}% under goal`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-4 border border-white/50 shadow-lg">
          <h4 className="font-semibold text-gray-700 mb-3">📊 Insights & Recommendations</h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-blue-600 font-semibold text-sm">💡</span>
                <span className="text-sm font-medium text-blue-800">Top Insight</span>
              </div>
              <p className="text-xs text-blue-700">
                {trendPercentage < 0 
                  ? `Great job! You've reduced emissions by ${Math.abs(trendPercentage).toFixed(1)}% this week.`
                  : `Consider using more eco-friendly transport to reduce your ${trendPercentage.toFixed(1)}% increase.`
                }
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-emerald-600 font-semibold text-sm">🚴</span>
                <span className="text-sm font-medium text-emerald-800">Recommendation</span>
              </div>
              <p className="text-xs text-emerald-700">
                Try cycling or walking for short trips. This could reduce your weekly emissions by up to 20%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
