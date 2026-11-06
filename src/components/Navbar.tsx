import React from 'react';
import { Sparkles, Shield, BookOpen, PenTool, Flame, HelpCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: 'prompt' | 'templates' | 'course' | 'dictionary';
  setActiveTab: (tab: 'prompt' | 'templates' | 'course' | 'dictionary') => void;
  completedCourseCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  completedCourseCount,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        
        {/* Brand Lockup: Soft, friendly, reassuring */}
        <div 
          onClick={() => setActiveTab('prompt')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-md bg-[#0A66C2] flex items-center justify-center text-white font-bold text-base shadow-2xs">
            in
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-slate-900 tracking-tight">
              LinkedIn Campus
            </span>
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>Training Wheels Active</span>
            </span>
          </div>
        </div>

        {/* Primary Tabs: Clean, single-line, tranquil */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'prompt'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Weekly Prompt
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'templates'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Post Templates
          </button>

          <button
            onClick={() => setActiveTab('course')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'course'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Crash Course</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'course' ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {completedCourseCount}/4
            </span>
          </button>

          <button
            onClick={() => setActiveTab('dictionary')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'dictionary'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Jargon Decoder
          </button>
        </nav>
      </div>
    </header>
  );
};
