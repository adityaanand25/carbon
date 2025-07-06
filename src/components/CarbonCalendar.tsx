import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { CalendarDay } from '../types';

interface CarbonCalendarProps {
  calendarData: CalendarDay[];
}

export default function CarbonCalendar({ calendarData }: CarbonCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const getCarbonLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'very-high': return 'bg-red-500';
      default: return 'bg-gray-200';
    }
  };

  const getCarbonLevelText = (level: string) => {
    switch (level) {
      case 'low': return 'Low Impact';
      case 'medium': return 'Medium Impact';
      case 'high': return 'High Impact';
      case 'very-high': return 'Very High Impact';
      default: return 'No Data';
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDayData = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarData.find(data => data.date === dateStr);
  };

  const monthlyAverage = calendarData
    .filter(day => day.date.startsWith(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`))
    .reduce((sum, day, _, arr) => sum + day.carbonScore / arr.length, 0);

  const previousMonthAverage = calendarData
    .filter(day => {
      const prevMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
      const prevYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
      return day.date.startsWith(`${prevYear}-${String(prevMonth + 1).padStart(2, '0')}`);
    })
    .reduce((sum, day, _, arr) => arr.length > 0 ? sum + day.carbonScore / arr.length : 0, 0);

  const monthlyTrend = previousMonthAverage > 0 ? ((monthlyAverage - previousMonthAverage) / previousMonthAverage) * 100 : 0;

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Carbon Calendar</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            {monthlyTrend !== 0 && (
              <>
                {monthlyTrend < 0 ? (
                  <TrendingDown className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-red-600" />
                )}
                <span className={`font-medium ${monthlyTrend < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(monthlyTrend).toFixed(1)}% vs last month
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <h3 className="text-xl font-semibold text-gray-800">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600">{monthlyAverage.toFixed(1)}</div>
          <div className="text-sm text-blue-800">Avg kg CO₂/day</div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-600">
            {calendarData.filter(day => day.level === 'low').length}
          </div>
          <div className="text-sm text-green-800">Low impact days</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {calendarData.filter(day => day.activities.length > 0).length}
          </div>
          <div className="text-sm text-yellow-800">Active days</div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
        
        {emptyDays.map(day => (
          <div key={`empty-${day}`} className="h-12" />
        ))}
        
        {days.map(day => {
          const dayData = getDayData(day);
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
          
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(dayData || null)}
              className={`h-12 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                isToday ? 'ring-2 ring-blue-500' : ''
              } ${
                dayData 
                  ? `${getCarbonLevelColor(dayData.level)} text-white hover:opacity-80`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span>Low</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded" />
          <span>Medium</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-orange-500 rounded" />
          <span>High</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span>Very High</span>
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDay && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">
              {new Date(selectedDay.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded ${getCarbonLevelColor(selectedDay.level)}`} />
              <span className="text-sm font-medium">{getCarbonLevelText(selectedDay.level)}</span>
            </div>
          </div>
          
          <div className="mb-3">
            <span className="text-2xl font-bold text-gray-800">{selectedDay.carbonScore.toFixed(1)}</span>
            <span className="text-sm text-gray-600 ml-1">kg CO₂e</span>
          </div>
          
          {selectedDay.activities.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Activities:</h5>
              <div className="space-y-1">
                {selectedDay.activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{activity.activity}</span>
                    <span className={`font-medium ${activity.impact > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {activity.impact > 0 ? '+' : ''}{activity.impact.toFixed(1)} kg
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}