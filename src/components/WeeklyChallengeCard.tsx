import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Award, TreePine, Target, Trophy, Star, Flame } from 'lucide-react';

interface WeeklyChallengeCardProps {
  weeklyGoal: number;
  currentWeekEmissions: number;
  previousWeekEmissions: number;
  dailyEmissions: { date: string; emissions: number; transport?: string }[];
  streak?: number;
  userLevel?: number;
  totalPoints?: number;
  weeklyRank?: number;
  challengeMultiplier?: number;
}

const badges = [
  { 
    id: 'eco-warrior', 
    name: 'Eco Warrior', 
    icon: '🌍', 
    threshold: 50, 
    description: 'Reduce CO₂ by 50g in a week',
    rarity: 'common',
    points: 100
  },
  { 
    id: 'tree-hugger', 
    name: 'Tree Hugger', 
    icon: '🌳', 
    threshold: 100, 
    description: 'Save equivalent of planting 5 trees',
    rarity: 'rare',
    points: 250
  },
  { 
    id: 'green-streak', 
    name: 'Green Streak', 
    icon: '⚡', 
    threshold: 7, 
    description: '7 days of excellent emissions',
    rarity: 'epic',
    points: 500
  },
  { 
    id: 'carbon-crusher', 
    name: 'Carbon Crusher', 
    icon: '💪', 
    threshold: 200, 
    description: 'Reduce CO₂ by 200g in a week',
    rarity: 'legendary',
    points: 750
  },
  { 
    id: 'week-champion', 
    name: 'Week Champion', 
    icon: '🏆', 
    threshold: 300, 
    description: 'Achieve weekly goal with 300g+ reduction',
    rarity: 'legendary',
    points: 1000
  },
  { 
    id: 'consistency-king', 
    name: 'Consistency King', 
    icon: '👑', 
    threshold: 14, 
    description: '14-day green streak',
    rarity: 'mythic',
    points: 1500
  },
  { 
    id: 'perfect-week', 
    name: 'Perfect Week', 
    icon: '✨', 
    threshold: 0, 
    description: 'All 7 days excellent performance',
    rarity: 'mythic',
    points: 2000
  },
  { 
    id: 'transport-master', 
    name: 'Transport Master', 
    icon: '🚲', 
    threshold: 0, 
    description: 'Use only eco-friendly transport',
    rarity: 'epic',
    points: 400
  },
  { 
    id: 'early-bird', 
    name: 'Early Bird', 
    icon: '🌅', 
    threshold: 0, 
    description: 'Log activities before 9 AM',
    rarity: 'rare',
    points: 200
  }
];

export default function WeeklyChallengeCard({ 
  weeklyGoal, 
  currentWeekEmissions, 
  previousWeekEmissions, 
  dailyEmissions,
  streak = 0,
  userLevel = 1,
  totalPoints = 0,
  weeklyRank = 0,
  challengeMultiplier = 1.0
}: WeeklyChallengeCardProps) {
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [weeklyPoints, setWeeklyPoints] = useState(0);
  
  const progressPercentage = Math.min((weeklyGoal - currentWeekEmissions) / weeklyGoal * 100, 100);
  const weeklyReduction = previousWeekEmissions - currentWeekEmissions;
  const treesEquivalent = Math.floor(weeklyReduction / 21.77); // 1 tree absorbs ~21.77kg CO₂/year
  const isGoalAchieved = currentWeekEmissions <= weeklyGoal;
  
  // Calculate user level progress
  const pointsForCurrentLevel = userLevel * 1000;
  const pointsForNextLevel = (userLevel + 1) * 1000;
  const levelProgress = ((totalPoints - pointsForCurrentLevel) / (pointsForNextLevel - pointsForCurrentLevel)) * 100;
  
  useEffect(() => {
    const newBadges: string[] = [];
    let pointsEarned = 0;
    
    // Check badge conditions
    if (weeklyReduction >= 50) {
      newBadges.push('eco-warrior');
      pointsEarned += badges.find(b => b.id === 'eco-warrior')?.points || 0;
    }
    if (treesEquivalent >= 5) {
      newBadges.push('tree-hugger');
      pointsEarned += badges.find(b => b.id === 'tree-hugger')?.points || 0;
    }
    if (weeklyReduction >= 200) {
      newBadges.push('carbon-crusher');
      pointsEarned += badges.find(b => b.id === 'carbon-crusher')?.points || 0;
    }
    if (weeklyReduction >= 300) {
      newBadges.push('week-champion');
      pointsEarned += badges.find(b => b.id === 'week-champion')?.points || 0;
    }
    
    const excellentDays = dailyEmissions.filter(day => day.emissions <= (weeklyGoal / 7) * 0.7).length;
    if (excellentDays >= 7) {
      newBadges.push('green-streak');
      newBadges.push('perfect-week');
      pointsEarned += badges.find(b => b.id === 'green-streak')?.points || 0;
      pointsEarned += badges.find(b => b.id === 'perfect-week')?.points || 0;
    } else if (excellentDays >= 7) {
      newBadges.push('green-streak');
      pointsEarned += badges.find(b => b.id === 'green-streak')?.points || 0;
    }
    
    if (streak >= 14) {
      newBadges.push('consistency-king');
      pointsEarned += badges.find(b => b.id === 'consistency-king')?.points || 0;
    }
    
    // Check for transport-based badges
    const ecoTransportDays = dailyEmissions.filter(day => 
      day.transport && ['Walking', 'Cycling', 'Public Transport', 'E-Bike'].includes(day.transport)
    ).length;
    if (ecoTransportDays === 7) {
      newBadges.push('transport-master');
      pointsEarned += badges.find(b => b.id === 'transport-master')?.points || 0;
    }
    
    // Apply challenge multiplier
    pointsEarned = Math.floor(pointsEarned * challengeMultiplier);
    setWeeklyPoints(pointsEarned);
    
    // Trigger animation if new badges earned
    if (newBadges.length > earnedBadges.length) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 2000);
    }
    
    setEarnedBadges(newBadges);
  }, [weeklyReduction, treesEquivalent, dailyEmissions, weeklyGoal, streak, earnedBadges.length, challengeMultiplier]);

  const getDayColor = (emissions: number) => {
    const dailyTarget = weeklyGoal / 7;
    if (emissions <= dailyTarget * 0.7) return 'bg-green-500'; // Green - excellent
    if (emissions <= dailyTarget) return 'bg-yellow-500'; // Yellow - good
    return 'bg-red-500'; // Red - needs improvement
  };

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'mythic': return 'from-pink-400 to-red-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return date;
    });
  };

  return (
    <div className="h-[580px] bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-4 border border-white/50 overflow-y-auto">
      {/* Gamified Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-3 mb-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">🎮</span>
            </div>
            <div>
              <h2 className="text-lg font-bold">Level {userLevel} Player</h2>
              <p className="text-white/80 text-xs">{totalPoints.toLocaleString()} Total Points</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold">{weeklyPoints} pts</div>
            <div className="text-white/80 text-xs">This Week</div>
          </div>
        </div>
        
        {/* Level Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Level {userLevel}</span>
            <span>Level {userLevel + 1}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(0, Math.min(100, levelProgress))}%` }}
            />
          </div>
          <div className="text-center text-xs text-white/80">
            {pointsForNextLevel - totalPoints} points to next level
          </div>
        </div>

        {/* Weekly Ranking */}
        {weeklyRank > 0 && (
          <div className="mt-2 text-center">
            <div className="inline-flex items-center bg-white/20 rounded-full px-2 py-1">
              <Trophy className="w-3 h-3 mr-1" />
              <span className="text-xs font-semibold">#{weeklyRank} in weekly leaderboard</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          <Target className="w-5 h-5 mr-2 text-emerald-600" />
          Weekly Challenge
          {isGoalAchieved && <span className="ml-2 text-green-500 animate-pulse">🎯</span>}
        </h3>
        <div className="flex space-x-1">
          {earnedBadges.slice(0, 3).map(badgeId => {
            const badge = badges.find(b => b.id === badgeId);
            return badge ? (
              <div 
                key={badgeId}
                className={`w-8 h-8 bg-gradient-to-br ${getBadgeRarityColor(badge.rarity)} rounded-full flex items-center justify-center shadow-lg ${showAnimation ? 'animate-bounce' : ''} cursor-pointer hover:scale-110 transition-transform`}
                title={`${badge.name}: ${badge.description} (+${badge.points} pts)`}
                onClick={() => setShowBadgeModal(badgeId)}
              >
                <span className="text-sm">{badge.icon}</span>
              </div>
            ) : null;
          })}
          {earnedBadges.length > 3 && (
            <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg text-white text-xs font-bold">
              +{earnedBadges.length - 3}
            </div>
          )}
        </div>
      </div>

      {/* Goal Achievement Banner */}
      {isGoalAchieved && (
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl p-4 mb-6 animate-pulse">
          <div className="flex items-center justify-center">
            <Award className="w-6 h-6 mr-2" />
            <span className="font-bold">🎉 Weekly Goal Achieved! 🎉</span>
          </div>
        </div>
      )}

      {/* Progress Bar with Enhanced UI */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Weekly Goal Progress</span>
          <span className={`text-sm font-bold ${isGoalAchieved ? 'text-green-600' : 'text-emerald-600'}`}>
            {progressPercentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
          <div 
            className={`bg-gradient-to-r ${isGoalAchieved ? 'from-green-500 to-emerald-600' : 'from-emerald-500 to-green-600'} h-4 rounded-full transition-all duration-1000 shadow-lg ${isGoalAchieved ? 'animate-pulse' : ''}`}
            style={{ width: `${Math.max(0, progressPercentage)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{currentWeekEmissions}g CO₂</span>
          <span>Goal: {weeklyGoal}g CO₂</span>
        </div>
      </div>

      {/* Enhanced Statistics Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-emerald-50 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className={`text-sm font-bold ${weeklyReduction >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {weeklyReduction >= 0 ? '↓' : '↑'} {Math.abs(weeklyReduction).toFixed(0)}g
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">vs Last Week</p>
        </div>
        
        <div className="bg-green-50 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <TreePine className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-600">{treesEquivalent}</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">Trees Equivalent</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <Flame className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-600">{streak}</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">Day Streak</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <Star className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-purple-600">{earnedBadges.length}</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">Badges Earned</p>
        </div>
      </div>

      {/* Enhanced Daily Calendar */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          This Week's Performance
        </h4>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const dayData = dailyEmissions[index];
            const dayColor = dayData ? getDayColor(dayData.emissions) : 'bg-gray-200';
            const weekDates = getCurrentWeekDates();
            const isToday = weekDates[index].toDateString() === new Date().toDateString();
            
            return (
              <div key={day} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{day}</div>
                <div 
                  className={`w-8 h-8 rounded-full ${dayColor} flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-110 ${isToday ? 'ring-2 ring-blue-400 ring-offset-1' : ''}`}
                  title={dayData ? `${dayData.emissions}g CO₂` : 'No data'}
                >
                  <span className="text-xs text-white font-bold">
                    {weekDates[index].getDate()}
                  </span>
                </div>
                {isToday && <div className="text-xs text-blue-600 font-semibold mt-1">Today</div>}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center space-x-4 mt-3 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span>Excellent (&lt;70%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
            <span>Good (&lt;100%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <span>Needs Work</span>
          </div>
        </div>
      </div>

      {/* Enhanced Badges Section */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Achievements ({earnedBadges.length}/{badges.length})
          </h4>
          <div className="text-sm text-purple-600 font-bold">
            {weeklyPoints > 0 && `+${weeklyPoints} pts this week!`}
          </div>
        </div>
        
        {/* Progress towards next badge */}
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-sm font-semibold text-gray-700 mb-2">Next Achievement</div>
          {(() => {
            const nextBadge = badges.find(badge => !earnedBadges.includes(badge.id));
            if (nextBadge) {
              let progress = 0;
              let maxProgress = 1;
              
              // Calculate progress based on badge type
              switch (nextBadge.id) {
                case 'eco-warrior':
                  progress = Math.min(weeklyReduction, 50);
                  maxProgress = 50;
                  break;
                case 'carbon-crusher':
                  progress = Math.min(weeklyReduction, 200);
                  maxProgress = 200;
                  break;
                case 'week-champion':
                  progress = Math.min(weeklyReduction, 300);
                  maxProgress = 300;
                  break;
                case 'green-streak':
                  progress = dailyEmissions.filter(day => day.emissions <= (weeklyGoal / 7) * 0.7).length;
                  maxProgress = 7;
                  break;
                case 'consistency-king':
                  progress = Math.min(streak, 14);
                  maxProgress = 14;
                  break;
                default:
                  progress = 0;
                  maxProgress = 1;
              }
              
              const progressPercentage = (progress / maxProgress) * 100;
              
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{nextBadge.icon}</span>
                      <span className="text-sm font-medium">{nextBadge.name}</span>
                    </div>
                    <span className="text-xs text-gray-600">{progress}/{maxProgress}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">{nextBadge.description}</div>
                </div>
              );
            }
            return (
              <div className="text-center text-gray-500 text-sm">
                🏆 All badges earned! You're amazing!
              </div>
            );
          })()}
        </div>

        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {badges.map(badge => {
            const isEarned = earnedBadges.includes(badge.id);
            return (
              <div 
                key={badge.id}
                className={`p-2 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  isEarned
                    ? `border-opacity-100 bg-gradient-to-br ${getBadgeRarityColor(badge.rarity)} bg-opacity-10 shadow-lg transform` 
                    : 'border-gray-200 bg-gray-50 opacity-60 hover:opacity-80'
                }`}
                onClick={() => setShowBadgeModal(badge.id)}
              >
                <div className="flex items-center space-x-2">
                  <span className={`text-lg ${isEarned ? 'animate-pulse' : 'grayscale'}`}>
                    {badge.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-semibold truncate ${isEarned ? 'text-gray-800' : 'text-gray-600'}`}>
                        {badge.name}
                      </p>
                      {isEarned && (
                        <span className="text-xs font-bold text-green-600">+{badge.points}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{badge.description}</p>
                    <div className={`text-xs font-bold capitalize ${
                      badge.rarity === 'common' ? 'text-gray-600' :
                      badge.rarity === 'rare' ? 'text-blue-600' :
                      badge.rarity === 'epic' ? 'text-purple-600' :
                      badge.rarity === 'legendary' ? 'text-yellow-600' :
                      'text-pink-600'
                    }`}>
                      {badge.rarity}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
