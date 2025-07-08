import React from 'react';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';

interface ProgressCardProps {
  currentFootprint: number;
  targetReduction: number;
  daysActive: number;
}

export default function ProgressCard({ currentFootprint, targetReduction, daysActive }: ProgressCardProps) {
  const globalAverage = 4800;
  const personalTarget = globalAverage * (1 - targetReduction / 100);
  const progressPercentage = Math.min(100, Math.max(0, ((globalAverage - currentFootprint) / (globalAverage - personalTarget)) * 100));
  
  const achievements = [
    { title: 'First Week', unlocked: daysActive >= 7, icon: Calendar },
    { title: 'Eco Warrior', unlocked: currentFootprint < globalAverage, icon: Award },
    { title: 'Green Streak', unlocked: daysActive >= 30, icon: TrendingUp },
  ];

  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-rose-100/50 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
      {/* Gloss overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none group-hover:from-white/40"></div>
      <div className="absolute top-0 left-0 w-24 h-24 bg-rose-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-28 h-28 bg-pink-200/15 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-700 to-pink-800 bg-clip-text text-transparent mb-8">
          Your Progress
        </h2>
        
        <div className="space-y-8">
          {/* Progress toward target */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-2xl group-hover:from-white/30"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-700">Reduction Goal</span>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                  {progressPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div
                  className="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 h-4 rounded-full transition-all duration-700 shadow-lg relative overflow-hidden"
                  style={{ width: `${progressPercentage}%` }}
                >
                  {/* Shine effect on progress bar */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-3 font-medium">
                <span>Current: {currentFootprint.toFixed(0)} kg/year</span>
                <span>Target: {personalTarget.toFixed(0)} kg/year</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-transparent pointer-events-none rounded-2xl group-hover:from-emerald-50/50"></div>
              <div className="relative z-10">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{daysActive}</div>
                <div className="text-sm text-gray-600 font-medium">Days Active</div>
              </div>
            </div>
            <div className="text-center bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent pointer-events-none rounded-2xl group-hover:from-blue-50/50"></div>
              <div className="relative z-10">
                <div className="text-3xl font-bold text-blue-600 mb-2">{targetReduction}%</div>
                <div className="text-sm text-gray-600 font-medium">Target Reduction</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl relative overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-2xl group-hover:from-white/30"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200/50 shadow-lg' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <div className={`p-2 rounded-xl ${
                      achievement.unlocked 
                        ? 'bg-emerald-500 text-white shadow-lg' 
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      <achievement.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-semibold ${
                        achievement.unlocked ? 'text-emerald-700' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </span>
                      {achievement.unlocked && (
                        <div className="text-xs text-emerald-600 font-medium">Unlocked!</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}