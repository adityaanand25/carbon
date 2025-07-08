import React, { useState, useEffect } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/Header';
import CarbonFootprintCard from './components/CarbonFootprintCard';
import RecommendationsCard from './components/RecommendationsCard';
import ProgressCard from './components/ProgressCard';
import DailyActivityLogger from './components/DailyActivityLogger';
import RealTimeDashboard from './components/RealTimeDashboard';
import EcoSuggestionsPanel from './components/EcoSuggestionsPanel';
import GoalsStreakTracker from './components/GoalsStreakTracker';
import CarbonCalendar from './components/CarbonCalendar';
import GlobalImpactSimulation from './components/GlobalImpactSimulation';
import EcoCommunityFeed from './components/EcoCommunityFeed';
import ThemeCustomizer from './components/ThemeCustomizer';
import AIAssistant from './components/AIAssistant';
import RouteComparison from './components/RouteComparison';
import TransportActivities from './components/TransportActivities';
import { CarbonData, DailyActivity, Goal, Streak, Achievement, CalendarDay, CommunityPost, Recommendation, RouteOption } from './types';
import { calculateCarbonFootprint, getCarbonLevel } from './utils/carbonCalculator';
import { getPersonalizedRecommendations } from './utils/recommendations';
import { useAuth } from './hooks/useAuth';
import { supabase } from './lib/supabase';

const defaultData: CarbonData = {
  transport: {
    carMiles: 0,
    publicTransport: 0,
    flights: 0,
    walking: 0,
    cycling: 0,
  },
  energy: {
    electricity: 0,
    gas: 0,
    renewable: false,
  },
  food: {
    meat: 0,
    dairy: 0,
    local: 0,
    processed: 0,
    plantBased: 0,
  },
  lifestyle: {
    shopping: 0,
    waste: 0,
    recycling: 0,
  },
};

// Mock data for new features
const mockGoals: Goal[] = [];

const mockStreaks: Streak[] = [];

const mockAchievements: Achievement[] = [];

const mockCalendarData: CalendarDay[] = [];

const mockCommunityPosts: CommunityPost[] = [];

function AppContent() {
  const { user } = useAuth();
  const [carbonData, setCarbonData] = useState<CarbonData>(defaultData);
  const [daysActive, setDaysActive] = useState(15);
  const [targetReduction, setTargetReduction] = useState(25);
  const [currentView, setCurrentView] = useState('dashboard');
  const [activities, setActivities] = useState<DailyActivity[]>([]);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [colorBlindMode, setColorBlindMode] = useState(false);

  const footprint = calculateCarbonFootprint(carbonData);
  const level = getCarbonLevel(footprint.yearly);
  const weeklyTrend = -5.2; // Mock trend data

  useEffect(() => {
    const newRecommendations = getPersonalizedRecommendations(carbonData);
    setRecommendations(newRecommendations);
  }, [carbonData]);

  // Load user data from Supabase
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Load carbon data
      const { data: carbonDataResult } = await supabase
        .from('carbon_data')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (carbonDataResult) {
        setCarbonData(carbonDataResult.data);
      }

      // Load activities
      const { data: activitiesResult } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (activitiesResult) {
        setActivities(activitiesResult);
      }

      // Load goals
      const { data: goalsResult } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (goalsResult) {
        setGoals(goalsResult);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleAddActivity = async (activity: DailyActivity) => {
    if (!user) return;

    try {
      const { data: newActivity } = await supabase
        .from('activities')
        .insert({
          ...activity,
          user_id: user.id,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (newActivity) {
        setActivities(prev => [newActivity, ...prev]);
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const handleAddGoal = async (goal: Omit<Goal, 'id'>) => {
    if (!user) return;

    try {
      const { data: newGoal } = await supabase
        .from('goals')
        .insert({
          ...goal,
          user_id: user.id,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (newGoal) {
        setGoals(prev => [...prev, newGoal]);
      }
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleLikePost = (postId: string) => {
    setCommunityPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const handleAddPost = (content: string, image?: string) => {
    const newPost: CommunityPost = {
      id: Date.now().toString(),
      user: user?.name || 'You',
      avatar: '',
      content,
      carbonSaved: Math.random() * 10,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
      image,
    };
    setCommunityPosts(prev => [newPost, ...prev]);
  };

  const handleCompleteRecommendation = (id: string) => {
    setRecommendations(prev =>
      prev.map(rec =>
        rec.id === id ? { ...rec, completed: true } : rec
      )
    );
  };

  const handleRouteSelect = (route: RouteOption) => {
    console.log('Selected route:', route);
  };

  const handleInsightAction = (action: string) => {
    console.log('Taking action:', action);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <RealTimeDashboard 
                footprint={footprint} 
                todayActivities={activities.filter(a => a.date === new Date().toISOString().split('T')[0]).length}
                weeklyTrend={weeklyTrend}
              />
              <CarbonFootprintCard footprint={footprint} />
            </div>
            <div className="space-y-8">
              <ProgressCard 
                currentFootprint={footprint.yearly}
                targetReduction={targetReduction}
                daysActive={daysActive}
              />
              <GlobalImpactSimulation 
                userFootprint={footprint.yearly}
                userActions={activities.length}
              />
            </div>
          </div>
        );
      
      case 'activities':
        return <TransportActivities />;
      
      case 'suggestions':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EcoSuggestionsPanel 
              recommendations={recommendations}
              onCompleteRecommendation={handleCompleteRecommendation}
            />
            <RecommendationsCard recommendations={recommendations} />
          </div>
        );
      
      case 'goals':
        return (
          <GoalsStreakTracker 
            goals={goals}
            streaks={mockStreaks}
            achievements={mockAchievements}
            onAddGoal={handleAddGoal}
          />
        );
      
      case 'routes':
        return (
          <RouteComparison onRouteSelect={handleRouteSelect} />
        );
      
      case 'community':
        return (
          <EcoCommunityFeed 
            posts={communityPosts}
            onLikePost={handleLikePost}
            onAddPost={handleAddPost}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 
      theme === 'nature' ? 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50' :
      theme === 'ocean' ? 'bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50' :
      'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50'
    } ${colorBlindMode ? 'filter contrast-125' : ''}`}>
      <Header />
      
      {/* Navigation - Enhanced */}
      <nav className="bg-white/70 backdrop-blur-lg shadow-lg border-b border-emerald-100/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16">
            <div className="flex space-x-2">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'activities', label: 'Activities' },
                { id: 'suggestions', label: 'Suggestions' },
                { id: 'goals', label: 'Goals' },
                { id: 'routes', label: 'Routes' },
                { id: 'community', label: 'Community' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg border border-emerald-300/50'
                      : 'text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200/50 hover:shadow-md'
                  }`}
                >
                  {currentView === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 pointer-events-none rounded-xl"></div>
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-2 border border-white/30 shadow-lg">
              <ThemeCustomizer
                currentTheme={theme}
                onThemeChange={setTheme}
                language={language}
                onLanguageChange={setLanguage}
                colorBlindMode={colorBlindMode}
                onColorBlindModeToggle={() => setColorBlindMode(!colorBlindMode)}
              />
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>

      {/* AI Assistant */}
      <AIAssistant 
        carbonData={carbonData}
        weeklyTrend={weeklyTrend}
        onInsightAction={handleInsightAction}
      />
    </div>
  );
}

function App() {
  return (
    <ProtectedRoute>
      <AppContent />
    </ProtectedRoute>
  );
}

export default App;