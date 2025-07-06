import React from 'react';
import { Leaf, Award, TrendingDown, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  level: { level: number; title: string; color: string };
  yearlyFootprint: number;
}

export default function Header({ level, yearlyFootprint }: HeaderProps) {
  const { user, signOut } = useAuth();
  const globalAverage = 4800; // kg CO2e per year
  const percentageReduction = Math.round(((globalAverage - yearlyFootprint) / globalAverage) * 100);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          <Leaf className="w-6 h-6 text-primary" />
          Carbon Tracker
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Award className="w-5 h-5 text-accent" />
            <span className="font-bold text-accent">Level {level.level}</span>
            <span className="text-sm text-base-content/70 hidden md:block">{level.title}</span>
          </div>
          {percentageReduction > 0 && (
            <div className="flex items-center gap-1">
              <TrendingDown className="w-5 h-5 text-success" />
              <span className="font-bold text-success">{percentageReduction}%</span>
              <span className="text-sm text-base-content/70 hidden md:block">Below Average</span>
            </div>
          )}
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost flex items-center gap-2">
            <div className="w-10 rounded-full">
              <User />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-base-content">{user?.name || 'User'}</p>
              <p className="text-xs text-base-content/70">{user?.email}</p>
            </div>
            <ChevronDown className="h-4 w-4" />
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={signOut}><LogOut className="w-4 h-4 mr-2"/>Sign Out</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}