import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Recommendation } from '../types';

interface RecommendationsCardProps {
  recommendations: Recommendation[];
}

export default function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? IconComponent : Icons.Leaf;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personalized Recommendations</h2>
      
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const IconComponent = getIcon(rec.icon);
          return (
            <div key={rec.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <IconComponent className="h-6 w-6 text-green-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{rec.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(rec.difficulty)}`}>
                        {rec.difficulty}
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        -{rec.impact}% CO₂
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                  
                  <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm font-medium">
                    <span>Take action</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}