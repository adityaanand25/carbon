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
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Progress</h2>
      
      <div className="space-y-6">
        {/* Progress toward target */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Reduction Goal</span>
            <span className="text-sm font-bold text-green-600">{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Current: {currentFootprint.toFixed(0)} kg/year</span>
            <span>Target: {personalTarget.toFixed(0)} kg/year</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{daysActive}</div>
            <div className="text-sm text-gray-600">Days Active</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{targetReduction}%</div>
            <div className="text-sm text-gray-600">Target Reduction</div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Achievements</h3>
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <achievement.icon className={`h-5 w-5 ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <span className={`font-medium ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                  {achievement.title}
                </span>
                {achievement.unlocked && (
                  <div className="text-green-600">
                    <Award className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}