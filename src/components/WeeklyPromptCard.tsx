import React, { useState } from 'react';
import { 
  Flame, 
  Clock, 
  Users, 
  PenTool, 
  HelpCircle, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Quote, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { CURRENT_WEEKLY_PROMPT } from '../data/promptData';

interface WeeklyPromptCardProps {
  onRespond: (promptTopicId: string, promptTitle: string) => void;
}

export const WeeklyPromptCard: React.FC<WeeklyPromptCardProps> = ({ onRespond }) => {
  const [showMentorTip, setShowMentorTip] = useState(false);
  const prompt = CURRENT_WEEKLY_PROMPT;

  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-2xs">
      {/* Top Banner Stripe */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 px-4 py-2.5 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide">
            <Flame className="w-3.5 h-3.5 fill-current" />
            WEEK {prompt.weekNumber} CHALLENGE
          </span>
          <span className="text-xs font-semibold hidden sm:inline text-amber-100">
            Open to all college students & young grads
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium text-amber-100">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-semibold text-white">{prompt.daysRemaining} days</span> left
          </span>
          <span className="hidden md:flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span className="font-semibold text-white">{prompt.totalSubmissions}</span> responses
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight leading-snug">
              {prompt.promptQuestion}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {prompt.description}
            </p>
          </div>
        </div>

        {/* Why this matters callout */}
        <div className="mt-3 p-3 bg-neutral-50 rounded-md border border-neutral-200 text-xs flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-neutral-700 leading-relaxed">
            <span className="font-semibold text-neutral-900">Why recruiters love this prompt: </span>
            {prompt.whyThisMatters}
          </div>
        </div>

        {/* Mentor Advice Toggle Section */}
        <div className="mt-4 border-t border-neutral-100 pt-3">
          <button
            onClick={() => setShowMentorTip(!showMentorTip)}
            className="flex items-center justify-between w-full text-xs font-semibold text-[#0A66C2] hover:text-[#004182] py-1 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5" />
              <span>Advice from Alumni Mentor Rachel Vance (Staff SWE @ Stripe)</span>
            </span>
            {showMentorTip ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showMentorTip && (
            <div className="mt-2.5 p-3.5 bg-blue-50/70 border border-blue-100 rounded-lg text-xs animate-in fade-in duration-150">
              <div className="flex items-center gap-2.5 mb-2">
                <img
                  src={prompt.mentorTip.avatarUrl}
                  alt={prompt.mentorTip.authorName}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-blue-200"
                />
                <div>
                  <div className="font-bold text-neutral-900 leading-tight">
                    {prompt.mentorTip.authorName}
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    {prompt.mentorTip.authorRole} · {prompt.mentorTip.authorCompany}
                  </div>
                </div>
              </div>

              <p className="text-neutral-700 italic leading-relaxed mb-2.5">
                "{prompt.mentorTip.tip}"
              </p>

              <div className="bg-white p-2 rounded border border-blue-100 text-[11px] text-neutral-600">
                <span className="font-semibold text-[#0A66C2]">Try an opening line like: </span>
                <span>"{prompt.mentorTip.exampleOpening}"</span>
              </div>
            </div>
          )}
        </div>

        {/* Primary CTA */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div className="text-xs text-neutral-500">
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mr-1">
              Low-Stakes Sandbox
            </span>
            <span>Only peers & mentors see sandbox drafts.</span>
          </div>

          <button
            onClick={() => onRespond(prompt.id, prompt.title)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] active:bg-[#003366] rounded-full shadow-xs transition-colors shrink-0"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Respond in Sandbox</span>
          </button>
        </div>
      </div>
    </div>
  );
};
