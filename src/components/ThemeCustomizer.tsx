import React, { useState } from 'react';
import { Palette, Sun, Moon, Globe, Eye, EyeOff } from 'lucide-react';
import { Theme } from '../types';

interface ThemeCustomizerProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  colorBlindMode: boolean;
  onColorBlindModeToggle: () => void;
}

export default function ThemeCustomizer({
  currentTheme,
  onThemeChange,
  language,
  onLanguageChange,
  colorBlindMode,
  onColorBlindModeToggle
}: ThemeCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      icon: Sun,
      preview: 'bg-gradient-to-br from-green-50 to-blue-50',
      colors: ['bg-green-500', 'bg-blue-500', 'bg-yellow-500']
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      icon: Moon,
      preview: 'bg-gradient-to-br from-gray-800 to-gray-900',
      colors: ['bg-green-400', 'bg-blue-400', 'bg-yellow-400']
    },
    {
      id: 'nature',
      name: 'Nature',
      icon: Palette,
      preview: 'bg-gradient-to-br from-green-100 to-emerald-100',
      colors: ['bg-green-600', 'bg-emerald-500', 'bg-teal-500']
    },
    {
      id: 'ocean',
      name: 'Ocean',
      icon: Palette,
      preview: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      colors: ['bg-blue-600', 'bg-cyan-500', 'bg-teal-500']
    }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white hover:bg-gray-50 border border-gray-200 p-3 rounded-xl shadow-sm transition-colors"
        title="Customize Theme & Accessibility"
      >
        <Palette className="h-5 w-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 z-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Customize Experience</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Theme Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <span>Theme</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onThemeChange(theme.id)}
                  className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                    currentTheme === theme.id
                      ? 'border-green-500 ring-2 ring-green-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-full h-12 rounded-lg mb-2 ${theme.preview}`} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">{theme.name}</span>
                    <div className="flex space-x-1">
                      {theme.colors.map((color, index) => (
                        <div key={index} className={`w-3 h-3 rounded-full ${color}`} />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Language</span>
            </h4>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Accessibility Options */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Accessibility</h4>
            
            <div className="space-y-3">
              <button
                onClick={onColorBlindModeToggle}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  colorBlindMode
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {colorBlindMode ? (
                    <Eye className="h-5 w-5 text-green-600" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  )}
                  <div className="text-left">
                    <div className="font-medium">Color Blind Friendly</div>
                    <div className="text-xs opacity-75">Enhanced contrast and patterns</div>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  colorBlindMode ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ${
                    colorBlindMode ? 'translate-x-6 ml-1' : 'translate-x-0.5'
                  }`} />
                </div>
              </button>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm font-medium text-blue-800">More Options Coming Soon</span>
                </div>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• High contrast mode</li>
                  <li>• Font size adjustment</li>
                  <li>• Screen reader optimization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full" />
                <div>
                  <div className="font-medium text-gray-800">Sample Card</div>
                  <div className="text-sm text-gray-600">This is how content will look</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-3/4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}