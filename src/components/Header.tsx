import React from 'react';
import { Leaf, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 shadow-lg border-b border-emerald-100/50 relative overflow-hidden">
      {/* Subtle gloss overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 pointer-events-none"></div>
      
      <div className="relative z-10 navbar">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl hover:bg-white/30 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-xl shadow-lg">
                <Leaf className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-800 bg-clip-text text-transparent">
                Carbon Tracker
              </span>
            </div>
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost flex items-center gap-3 hover:bg-white/30 transition-all duration-300 rounded-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-200 rounded-full flex items-center justify-center shadow-lg border border-white/30">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-700">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow-2xl menu menu-sm dropdown-content bg-white/90 backdrop-blur-lg rounded-2xl w-52 border border-white/50">
              <li>
                <a className="justify-between hover:bg-emerald-50 rounded-xl transition-colors duration-200">
                  Profile
                  <span className="badge badge-primary bg-gradient-to-r from-emerald-500 to-green-600 border-none text-white">New</span>
                </a>
              </li>
              <li><a className="hover:bg-emerald-50 rounded-xl transition-colors duration-200">Settings</a></li>
              <li>
                <button
                  onClick={async () => {
                    try {
                      console.log('Logout button clicked');
                      await signOut();
                      console.log('Logout completed');
                    } catch (error) {
                      console.error('Logout error:', error);
                    }
                  }} 
                  className="w-full text-left hover:bg-red-50 rounded-xl transition-colors duration-200 text-red-600 cursor-pointer px-4 py-2 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2"/>Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}