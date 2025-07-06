import React, { useState, useEffect } from 'react';
import { Bot, X, Send, Lightbulb } from 'lucide-react';
import { AIInsight, CarbonData } from '../types';

interface AIAssistantProps {
  carbonData: CarbonData;
  weeklyTrend: number;
  onInsightAction: (action: string) => void;
}

export default function AIAssistant({ carbonData, weeklyTrend, onInsightAction }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'ai' | 'user'; content: string; timestamp: Date }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [insights, setInsights] = useState<AIInsight[]>([]);

  useEffect(() => {
    // Generate AI insights based on user data
    const newInsights = generateInsights(carbonData, weeklyTrend);
    setInsights(newInsights);
    
    // Add welcome message if first time
    if (messages.length === 0) {
      setMessages([{
        type: 'ai',
        content: "Hi! I'm your AI sustainability assistant. I've analyzed your carbon footprint and have some personalized suggestions. How can I help you reduce your environmental impact today?",
        timestamp: new Date()
      }]);
    }
  }, [carbonData, weeklyTrend]);

  const generateInsights = (data: CarbonData, trend: number): AIInsight[] => {
    const insights: AIInsight[] = [];

    // Transport insights
    if (data.transport.carMiles > 30) {
      insights.push({
        id: 'high-car-usage',
        type: 'warning',
        title: 'High Car Usage Detected',
        message: `You're driving ${data.transport.carMiles} miles/week. Consider carpooling or public transport for 2-3 trips to save ~15% CO₂.`,
        icon: 'Car',
        priority: 'high',
        actionable: true,
        action: 'reduce-driving'
      });
    }

    // Energy insights
    if (data.energy.electricity > 300 && !data.energy.renewable) {
      insights.push({
        id: 'high-energy-usage',
        type: 'suggestion',
        title: 'Energy Optimization Opportunity',
        message: 'Your electricity usage is above average. Switching to renewable energy could reduce your footprint by 30%.',
        icon: 'Zap',
        priority: 'medium',
        actionable: true,
        action: 'switch-renewable'
      });
    }

    // Food insights
    if (data.food.meat > 7) {
      insights.push({
        id: 'high-meat-consumption',
        type: 'tip',
        title: 'Plant-Based Opportunity',
        message: 'Try "Meatless Monday" - replacing just one meat meal per week can save 6.6kg CO₂ annually.',
        icon: 'Leaf',
        priority: 'medium',
        actionable: true,
        action: 'reduce-meat'
      });
    }

    // Trend insights
    if (trend > 10) {
      insights.push({
        id: 'increasing-trend',
        type: 'warning',
        title: 'Footprint Increasing',
        message: `Your carbon footprint has increased by ${trend.toFixed(1)}% this week. Let's identify the main contributors.`,
        icon: 'TrendingUp',
        priority: 'high',
        actionable: true,
        action: 'analyze-trend'
      });
    } else if (trend < -5) {
      insights.push({
        id: 'positive-trend',
        type: 'achievement',
        title: 'Great Progress!',
        message: `Excellent! You've reduced your footprint by ${Math.abs(trend).toFixed(1)}% this week. Keep up the momentum!`,
        icon: 'Award',
        priority: 'low',
        actionable: false
      });
    }

    return insights.slice(0, 3); // Return top 3 insights
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, carbonData);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }]);
    }, 1000);

    setInputMessage('');
  };

  const generateAIResponse = (userInput: string, data: CarbonData): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('transport') || input.includes('car') || input.includes('drive')) {
      return `Based on your ${data.transport.carMiles} miles/week of driving, I recommend trying public transport for 2-3 trips. This could save you about 8.2kg CO₂ per week. Would you like specific route suggestions?`;
    }
    
    if (input.includes('energy') || input.includes('electric')) {
      return `Your electricity usage is ${data.energy.electricity} kWh/month. ${data.energy.renewable ? 'Great job using renewable energy!' : 'Consider switching to renewable energy to reduce your footprint by up to 30%.'} I can help you find local renewable energy providers.`;
    }
    
    if (input.includes('food') || input.includes('meat')) {
      return `You're having ${data.food.meat} meat servings per week. Even reducing this by just 1-2 servings could save 6.6-13.2kg CO₂ weekly. Would you like some delicious plant-based recipe suggestions?`;
    }
    
    if (input.includes('goal') || input.includes('target')) {
      return "Setting specific goals is key to success! I recommend starting with a 20% reduction target over 3 months. We can break this down into weekly actions. What area would you like to focus on first?";
    }
    
    return "I'm here to help you reduce your carbon footprint! You can ask me about transportation alternatives, energy savings, sustainable food choices, or setting reduction goals. What would you like to explore?";
  };

  const getInsightIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Car: require('lucide-react').Car,
      Zap: require('lucide-react').Zap,
      Leaf: require('lucide-react').Leaf,
      TrendingUp: require('lucide-react').TrendingUp,
      Award: require('lucide-react').Award,
    };
    return icons[iconName] || Lightbulb;
  };

  return (
    <>
      {/* AI Assistant Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 btn btn-primary btn-circle shadow-lg hover:scale-110 transition-transform z-40"
      >
        <Bot className="h-6 w-6" />
      </button>

      {/* AI Assistant Panel */}
      <div className={`fixed bottom-6 right-6 w-96 h-[600px] bg-base-100 rounded-2xl shadow-2xl border border-base-300 flex flex-col z-50 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          {/* Header */}
          <div className="bg-base-200 text-base-content p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="avatar online">
                <div className="w-10 rounded-full bg-primary text-primary-content">
                  <Bot className="h-6 w-6 mx-auto mt-2" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">AI Eco Assistant</h3>
                <p className="text-sm opacity-70">Your sustainability coach</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-ghost btn-circle"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Insights Section */}
          {insights.length > 0 && (
            <div className="p-4 border-b border-base-300">
              <h4 className="text-sm font-semibold text-base-content mb-3">Smart Insights</h4>
              <div className="space-y-2">
                {insights.map((insight) => {
                  const alertType = insight.type === 'warning' ? 'alert-warning' : insight.type === 'achievement' ? 'alert-success' : 'alert-info';
                  return (
                    <div key={insight.id} className={`alert ${alertType} shadow-sm p-3`}>
                      <div>
                        <insight.icon className="h-5 w-5" />
                        <div>
                          <h5 className="font-bold text-sm">{insight.title}</h5>
                          <p className="text-xs">{insight.message}</p>
                          {insight.actionable && (
                            <button
                              onClick={() => onInsightAction(insight.action!)}
                              className="btn btn-xs btn-outline mt-2"
                            >
                              Take Action
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`chat ${message.type === 'user' ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-bubble">
                  {message.content}
                </div>
                 <div className="chat-footer opacity-50 text-xs">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-base-300">
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask for eco-friendly tips..."
                  className="input input-bordered w-full text-sm"
                />
                <button onClick={handleSendMessage} className="btn btn-square btn-primary">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}