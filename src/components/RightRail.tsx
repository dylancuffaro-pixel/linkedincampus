import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Users, 
  ExternalLink,
  Award
} from 'lucide-react';
import { CURRENT_WEEKLY_PROMPT } from '../data/promptData';

interface RightRailProps {
  onOpenDictionary: () => void;
  onOpenWeeklyPrompt: () => void;
}

export const RightRail: React.FC<RightRailProps> = ({
  onOpenDictionary,
  onOpenWeeklyPrompt,
}) => {
  return (
    <div className="space-y-4">
      {/* Mentor Spotlight Card */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-2.5">
          <Award className="w-3.5 h-3.5 text-[#0A66C2]" />
          <span>Alumni Mentor on Duty</span>
        </div>

        <div className="flex items-center gap-2.5 mb-2.5">
          <img
            src={CURRENT_WEEKLY_PROMPT.mentorTip.avatarUrl}
            alt={CURRENT_WEEKLY_PROMPT.mentorTip.authorName}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-neutral-200"
          />
          <div>
            <div className="text-xs font-bold text-neutral-900 leading-tight">
              {CURRENT_WEEKLY_PROMPT.mentorTip.authorName}
            </div>
            <div className="text-[11px] text-neutral-500 leading-tight">
              {CURRENT_WEEKLY_PROMPT.mentorTip.authorRole}
            </div>
            <div className="text-[10px] text-neutral-400">
              {CURRENT_WEEKLY_PROMPT.mentorTip.authorCompany}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-neutral-600 leading-relaxed italic border-l-2 border-[#0A66C2] pl-2.5 my-2">
          "Don’t pretend to know everything on day 1. The students who ask the clearest clarifying questions learn twice as fast."
        </p>

        <button
          onClick={onOpenWeeklyPrompt}
          className="w-full mt-2 py-1.5 text-xs font-semibold text-[#0A66C2] hover:bg-blue-50/60 rounded border border-blue-200 transition-colors text-center"
        >
          View Mentor's Prompt Breakdown
        </button>
      </div>

      {/* Trending Campus Topics */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-3">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Campus Trending Debates</span>
          </span>
          <span className="text-[10px] text-neutral-400">Live</span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div>
            <div className="font-semibold text-neutral-800 hover:text-[#0A66C2] cursor-pointer transition-colors leading-tight">
              #ShouldYouColdDMProfessors
            </div>
            <div className="text-[10px] text-neutral-500">2,410 student insights · 4 alumni chimed in</div>
          </div>

          <div>
            <div className="font-semibold text-neutral-800 hover:text-[#0A66C2] cursor-pointer transition-colors leading-tight">
              #DeJargoningMyResume
            </div>
            <div className="text-[10px] text-neutral-500">1,890 template shares</div>
          </div>

          <div>
            <div className="font-semibold text-neutral-800 hover:text-[#0A66C2] cursor-pointer transition-colors leading-tight">
              #ImposterSyndromeFirstInternship
            </div>
            <div className="text-[10px] text-neutral-500">3,720 peer kudos given</div>
          </div>

          <div>
            <div className="font-semibold text-neutral-800 hover:text-[#0A66C2] cursor-pointer transition-colors leading-tight">
              #GitHubPortfolioCheck
            </div>
            <div className="text-[10px] text-neutral-500">980 peer reviews</div>
          </div>
        </div>
      </div>

      {/* Corporate Buzzword of the Day */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-2">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Buzzword of the Day</span>
          </span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
            Overused
          </span>
        </div>

        <div className="p-2.5 bg-neutral-50 rounded-md border border-neutral-100 text-xs mb-2.5">
          <span className="font-bold text-neutral-900 text-xs block mb-0.5">"Synergy"</span>
          <p className="text-[11px] text-neutral-600 leading-snug">
            <strong>Translation:</strong> Two groups actually talking to each other and avoiding duplicate work.
          </p>
        </div>

        <button
          onClick={onOpenDictionary}
          className="w-full text-[11px] font-semibold text-[#0A66C2] hover:text-[#004182] text-center"
        >
          Explore All 10 Corporate Translations →
        </button>
      </div>

      {/* Safety & Ground Rules */}
      <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-[11px] text-emerald-950 space-y-1">
        <div className="flex items-center gap-1 font-bold text-emerald-900">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Campus Safety Promise</span>
        </div>
        <p className="text-emerald-900/80 leading-relaxed">
          Sandbox posts are kept within the student & alumni learning network. No recruiters or employers can see private drafts until you explicitly export them.
        </p>
      </div>
    </div>
  );
};
