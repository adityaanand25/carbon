import React, { useState, useEffect } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/Header';
import CarbonFootprintCard from './components/CarbonFootprintCard';
import DataInputForm from './components/DataInputForm';
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
import { CarbonData, DailyActivity, Goal, Streak, Achievement, CalendarDay, CommunityPost, Recommendation, RouteOption } from './types';
import { calculateCarbonFootprint, getCarbonLevel } from './utils/carbonCalculator';
import { getPersonalizedRecommendations } from './utils/recommendations';
import { useAuth } from './hooks/useAuth';
import { supabase } from './lib/supabase';

const defaultData: CarbonData = {
  transport: {
    carMiles: 50,
    publicTransport: 10,
    flights: 0,
    walking: 5,
    cycling: 2,
  },
  energy: {
    electricity: 250,
    gas: 15,
    renewable: false,
  },
  food: {
    meat: 7,
    dairy: 10,
    local: 3,
    processed: 5,
    plantBased: 3,
  },
  lifestyle: {
    shopping: 100,
    waste: 3,
    recycling: 1,
  },
};

// Mock data for new features
const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Reduce Car Usage',
    description: 'Use public transport for 50% of trips',
    target: 25,
    current: 18,
    deadline: '2024-03-01',
    category: 'transport',
    icon: 'Car',
    completed: false,
  },
  {
    id: '2',
    title: 'Plant-Based Meals',
    description: 'Have 10 plant-based meals this month',
    target: 10,
    current: 7,
    deadline: '2024-02-29',
    category: 'food',
    icon: 'Leaf',
    completed: false,
  },
];

const mockStreaks: Streak[] = [
  {
    type: 'public-transport',
    count: 12,
    lastDate: '2024-01-15',
    icon: 'Bus',
    title: 'Public Transport',
  },
  {
    type: 'plant-based',
    count: 5,
    lastDate: '2024-01-15',
    icon: 'Leaf',
    title: 'Plant-Based Meals',
  },
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Week',
    description: 'Completed your first week of tracking',
    icon: 'Calendar',
    unlocked: true,
    progress: 100,
    target: 100,
    category: 'general',
    points: 50,
  },
  {
    id: '2',
    title: 'Eco Warrior',
    description: 'Reduced footprint below global average',
    icon: 'Award',
    unlocked: true,
    progress: 100,
    target: 100,
    category: 'reduction',
    points: 100,
  },
];

const mockCalendarData: CalendarDay[] = [
  {
    date: '2024-01-15',
    carbonScore: 8.5,
    level: 'medium',
    activities: [
      { id: '1', date: '2024-01-15', type: 'transport', activity: 'Drove to work', impact: 8.2, description: 'Car commute', icon: 'Car' },
      { id: '2', date: '2024-01-15', type: 'food', activity: 'Plant-based lunch', impact: -1.2, description: 'Sustainable meal', icon: 'Leaf' },
    ],
  },
  {
    date: '2024-01-14',
    carbonScore: 4.2,
    level: 'low',
    activities: [
      { id: '3', date: '2024-01-14', type: 'transport', activity: 'Took bus to work', impact: 2.1, description: 'Public transport', icon: 'Bus' },
      { id: '4', date: '2024-01-14', type: 'energy', activity: 'Used renewable energy', impact: -2.5, description: 'Green energy', icon: 'Zap' },
    ],
  },
];

const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    user: 'EcoSarah',
    avatar: '',
    content: 'Just completed my first week of cycling to work! The morning fresh air is amazing and I\'ve already saved 15kg of CO₂. Who else is joining the bike commute challenge?',
    achievement: 'Bike Week',
    carbonSaved: 15.2,
    likes: 24,
    comments: 8,
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    user: 'GreenMike',
    avatar: '',
    content: 'Switched to renewable energy this month and my carbon footprint dropped by 30%! The process was easier than I thought. Happy to share tips with anyone interested.',
    carbonSaved: 45.8,
    likes: 31,
    comments: 12,
    timestamp: '2024-01-14T15:45:00Z',
  },
];

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

  const saveCarbonData = async (data: CarbonData) => {
    if (!user) return;

    try {
      await supabase
        .from('carbon_data')
        .upsert({
          user_id: user.id,
          data,
          updated_at: new Date().toISOString(),
        });
    } catch (error) {
      console.error('Error saving carbon data:', error);
    }
  };

  const handleUpdateCarbonData = (data: CarbonData) => {
    setCarbonData(data);
    saveCarbonData(data);
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
              <DataInputForm data={carbonData} onUpdate={handleUpdateCarbonData} />
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
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DailyActivityLogger onAddActivity={handleAddActivity} />
            <CarbonCalendar calendarData={mockCalendarData} />
          </div>
        );
      
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
      theme === 'nature' ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50' :
      theme === 'ocean' ? 'bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50' :
      'bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50'
    } ${colorBlindMode ? 'filter contrast-125' : ''}`}>
      <Header level={level} yearlyFootprint={footprint.yearly} />
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex space-x-8">
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
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === item.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
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