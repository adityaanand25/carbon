import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight, TrendingDown, Lightbulb, Star } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Recommendation } from '../types';

interface EcoSuggestionsPanelProps {
  recommendations: Recommendation[];
  onCompleteRecommendation: (id: string) => void;
}

export default function EcoSuggestionsPanel({ recommendations, onCompleteRecommendation }: EcoSuggestionsPanelProps) {
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [sortBy, setSortBy] = useState<'impact' | 'difficulty'>('impact');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? IconComponent : Icons.Leaf;
  };

  const filteredRecommendations = recommendations
    .filter(rec => filter === 'all' || rec.difficulty === filter)
    .sort((a, b) => {
      if (sortBy === 'impact') return b.impact - a.impact;
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });

  const totalPotentialSavings = recommendations.reduce((sum, rec) => sum + rec.impact, 0);
  const completedCount = recommendations.filter(rec => rec.completed).length;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Eco Suggestions</h2>
          <p className="text-sm text-gray-600">
            {completedCount}/{recommendations.length} completed • Save up to {totalPotentialSavings}% CO₂
          </p>
        </div>
        <div className="bg-green-100 p-3 rounded-xl">
          <Lightbulb className="h-6 w-6 text-green-600" />
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Weekly Progress</span>
          <span className="text-sm font-bold text-green-600">
            {((completedCount / recommendations.length) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-white rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / recommendations.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Potential savings: {totalPotentialSavings.toFixed(1)}kg CO₂/week</span>
          <span>{recommendations.length - completedCount} actions remaining</span>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          {['all', 'easy', 'medium', 'hard'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="impact">Sort by Impact</option>
          <option value="difficulty">Sort by Difficulty</option>
        </select>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations.map((rec) => {
          const IconComponent = getIcon(rec.icon);
          return (
            <div
              key={rec.id}
              className={`border rounded-xl p-4 transition-all hover:shadow-md ${
                rec.completed ? 'bg-green-50 border-green-200' : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${rec.completed ? 'bg-green-200' : 'bg-green-100'}`}>
                  <IconComponent className={`h-6 w-6 ${rec.completed ? 'text-green-700' : 'text-green-600'}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-semibold ${rec.completed ? 'text-green-800' : 'text-gray-800'}`}>
                      {rec.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(rec.difficulty)}`}>
                        {rec.difficulty}
                      </span>
                      <div className="flex items-center space-x-1">
                        <TrendingDown className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-bold text-green-600">-{rec.impact}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                  
                  {rec.savings && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Estimated Savings</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">{rec.savings}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => onCompleteRecommendation(rec.id)}
                      className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                        rec.completed
                          ? 'text-green-700 cursor-default'
                          : 'text-green-600 hover:text-green-700'
                      }`}
                      disabled={rec.completed}
                    >
                      {rec.completed ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          <span>Completed!</span>
                        </>
                      ) : (
                        <>
                          <Circle className="h-4 w-4" />
                          <span>Mark as done</span>
                        </>
                      )}
                    </button>
                    
                    {!rec.completed && (
                      <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm font-medium">
                        <span>Learn more</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-8">
          <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Lightbulb className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600">No suggestions match your current filter.</p>
          <button
            onClick={() => setFilter('all')}
            className="text-green-600 hover:text-green-700 font-medium mt-2"
          >
            Show all suggestions
          </button>
        </div>
      )}
    </div>
  );
}