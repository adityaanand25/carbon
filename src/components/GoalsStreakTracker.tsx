import React, { useState } from 'react';
import { Target, Flame, Award, Plus, Calendar, TrendingUp } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Goal, Streak, Achievement } from '../types';

interface GoalsStreakTrackerProps {
  goals: Goal[];
  streaks: Streak[];
  achievements: Achievement[];
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
}

export default function GoalsStreakTracker({ goals, streaks, achievements, onAddGoal }: GoalsStreakTrackerProps) {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target: 0,
    deadline: '',
    category: 'transport',
  });

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? IconComponent : Icons.Target;
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target > 0) {
      onAddGoal({
        ...newGoal,
        current: 0,
        completed: false,
        icon: 'Target',
      });
      setNewGoal({ title: '', description: '', target: 0, deadline: '', category: 'transport' });
      setShowAddGoal(false);
    }
  };

  const activeStreaks = streaks.filter(streak => streak.count > 0);
  const unlockedAchievements = achievements.filter(achievement => achievement.unlocked);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Goals & Streaks</h2>
        <button
          onClick={() => setShowAddGoal(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Active Streaks */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span>Active Streaks</span>
        </h3>
        
        {activeStreaks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeStreaks.map((streak, index) => {
              const IconComponent = getIcon(streak.icon);
              return (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <IconComponent className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{streak.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="text-2xl font-bold text-orange-600">{streak.count}</span>
                        <span className="text-sm text-gray-600">days</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-xl">
            <Flame className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Start building your eco-streaks!</p>
          </div>
        )}
      </div>

      {/* Goals Progress */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
          <Target className="h-5 w-5 text-blue-500" />
          <span>Green Goals</span>
        </h3>
        
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = Math.min(100, (goal.current / goal.target) * 100);
            const IconComponent = getIcon(goal.icon);
            
            return (
              <div key={goal.id} className={`border rounded-xl p-4 ${goal.completed ? 'bg-green-50 border-green-200' : 'border-gray-200'}`}>
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${goal.completed ? 'bg-green-200' : 'bg-blue-100'}`}>
                    <IconComponent className={`h-5 w-5 ${goal.completed ? 'text-green-700' : 'text-blue-600'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{goal.title}</h4>
                      {goal.completed && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Award className="h-4 w-4" />
                          <span className="text-sm font-medium">Completed!</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{goal.current}/{goal.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            goal.completed ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    
                    {goal.deadline && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <span>Recent Achievements</span>
        </h3>
        
        {unlockedAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.slice(0, 4).map((achievement) => {
              const IconComponent = getIcon(achievement.icon);
              return (
                <div key={achievement.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <IconComponent className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-700">+{achievement.points} points</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-xl">
            <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Complete goals to unlock achievements!</p>
          </div>
        )}
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Goal</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Reduce car usage"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Describe your goal..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, target: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddGoal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}