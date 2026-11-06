import React from 'react';
import { 
  GraduationCap, 
  Flame, 
  Award, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import { CURRENT_USER } from '../data/seedPosts';

interface StudentProfileCardProps {
  completedCourses: string[];
  onOpenCourse: () => void;
  onOpenTemplates: () => void;
  onOpenDictionary: () => void;
}

export const StudentProfileCard: React.FC<StudentProfileCardProps> = ({
  completedCourses,
  onOpenCourse,
  onOpenTemplates,
  onOpenDictionary,
}) => {
  const completionPercent = Math.round((completedCourses.length / 4) * 100);

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-2xs">
        {/* Campus Header Banner */}
        <div className="h-16 bg-gradient-to-r from-[#0A66C2] via-[#004182] to-[#057642] relative">
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
            Student Member
          </div>
        </div>

        {/* Profile Avatar & Info */}
        <div className="px-4 pb-4 -mt-8 relative text-center">
          <div className="inline-block relative">
            <img
              src={CURRENT_USER.avatarUrl}
              alt={CURRENT_USER.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full border-2 border-white shadow-xs object-cover mx-auto"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Active on Campus" />
          </div>

          <h3 className="text-sm font-bold text-neutral-900 mt-2 leading-tight">
            {CURRENT_USER.name}
          </h3>
          <p className="text-xs text-neutral-600 font-medium mt-0.5 leading-snug">
            {CURRENT_USER.headline}
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 mt-1">
            <span>{CURRENT_USER.university}</span>
            <span aria-hidden="true">·</span>
            <span>{CURRENT_USER.gradYear}</span>
          </div>

          {/* Training Wheels Status Badge */}
          <div className="mt-3 py-1.5 px-2.5 bg-neutral-50 rounded-md border border-neutral-200 flex items-center justify-between text-left">
            <div>
              <div className="text-[10px] text-neutral-500 font-medium">Training Wheels Stage</div>
              <div className="text-xs font-bold text-[#0A66C2] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Level 2: Confident</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-1 rounded text-xs font-bold" title="Weekly Prompt Streak">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>3 Wk</span>
            </div>
          </div>
        </div>

        {/* Course Progress Section */}
        <div className="border-t border-neutral-200 px-4 py-3 bg-neutral-50/50">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-neutral-700">Crash Course</span>
            <span className="font-bold text-[#0A66C2]">{completedCourses.length}/4 Completed</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-600 transition-all duration-300" 
              style={{ width: `${completionPercent}%` }}
            />
          </div>

          <button
            onClick={onOpenCourse}
            className="w-full mt-2.5 flex items-center justify-between text-xs font-semibold text-[#0A66C2] hover:text-[#004182] py-1 transition-colors"
          >
            <span>{completedCourses.length === 4 ? 'Review Lessons' : 'Continue Lesson 3'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts */}
        <div className="border-t border-neutral-200 divide-y divide-neutral-100 text-xs">
          <button
            onClick={onOpenTemplates}
            className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-neutral-50 text-neutral-700 font-medium transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              <span>Post Scaffolding Templates</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-bold">5 ready</span>
          </button>

          <button
            onClick={onOpenDictionary}
            className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-neutral-50 text-neutral-700 font-medium transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
              <span>Corporate Jargon Decoder</span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">Free</span>
          </button>
        </div>
      </div>

      {/* Daily Confidence Tip */}
      <div className="bg-white rounded-lg border border-neutral-200 p-3.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Today's Training Wheel Tip</span>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed">
          "Don’t compare your Chapter 1 to someone else’s Chapter 20. When sharing a project, talk about what broke before it worked—vulnerability builds real respect."
        </p>
        <div className="mt-2 text-[10px] text-neutral-400 font-medium">
          Source: Alumni Mentors Network
        </div>
      </div>
    </div>
  );
};
