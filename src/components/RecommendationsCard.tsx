import { ArrowRight } from 'lucide-react';
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
    <div className="h-[580px] bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl shadow-xl p-6 relative overflow-hidden border border-amber-100/50 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 group cursor-pointer">
      {/* Gloss overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none group-hover:from-white/40"></div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200/15 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 h-full flex flex-col">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-800 bg-clip-text text-transparent mb-6">
          Personalized Recommendations
        </h2>
        
        <div className="space-y-3 flex-1 overflow-y-auto">
          {recommendations.map((rec) => {
            const IconComponent = getIcon(rec.icon);
            return (
              <div key={rec.id} className="bg-white/70 backdrop-blur-sm border border-emerald-200/50 rounded-xl p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-xl group-hover:from-white/30"></div>
                <div className="relative z-10 flex items-start space-x-3">
                  <div className="bg-gradient-to-br from-emerald-100 to-green-200 p-2 rounded-lg shadow-sm border border-emerald-200/50">
                    <IconComponent className="h-5 w-5 text-emerald-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm truncate">{rec.title}</h3>
                      <div className="flex items-center space-x-1 ml-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(rec.difficulty)} shadow-sm`}>
                          {rec.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-xs mb-3 leading-relaxed overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{rec.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                        -{rec.impact}% CO₂
                      </span>
                      <button className="flex items-center space-x-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105">
                        <span>Action</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
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