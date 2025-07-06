export interface CarbonData {
  transport: {
    carMiles: number;
    publicTransport: number;
    flights: number;
    walking: number;
    cycling: number;
  };
  energy: {
    electricity: number;
    gas: number;
    renewable: boolean;
  };
  food: {
    meat: number;
    dairy: number;
    local: number;
    processed: number;
    plantBased: number;
  };
  lifestyle: {
    shopping: number;
    waste: number;
    recycling: number;
  };
}

export interface CarbonFootprint {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  breakdown: {
    transport: number;
    energy: number;
    food: number;
    lifestyle: number;
  };
}

export interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  impact: number;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  savings?: string;
  completed?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
  category: string;
  points: number;
}

export interface UserLevel {
  level: number;
  title: string;
  progress: number;
  nextLevelAt: number;
  color: string;
}

export interface DailyActivity {
  id: string;
  date: string;
  type: 'transport' | 'energy' | 'food' | 'lifestyle';
  activity: string;
  impact: number;
  description: string;
  icon: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
  icon: string;
  completed: boolean;
}

export interface Streak {
  type: string;
  count: number;
  lastDate: string;
  icon: string;
  title: string;
}

export interface CalendarDay {
  date: string;
  carbonScore: number;
  level: 'low' | 'medium' | 'high' | 'very-high';
  activities: DailyActivity[];
}

export interface RouteOption {
  mode: string;
  duration: number;
  distance: number;
  carbonImpact: number;
  cost: number;
  icon: string;
  color: string;
}

export interface CommunityPost {
  id: string;
  user: string;
  avatar: string;
  content: string;
  achievement?: string;
  carbonSaved: number;
  likes: number;
  comments: number;
  timestamp: string;
  image?: string;
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
}

export interface AIInsight {
  id: string;
  type: 'tip' | 'warning' | 'achievement' | 'suggestion';
  title: string;
  message: string;
  icon: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  action?: string;
}