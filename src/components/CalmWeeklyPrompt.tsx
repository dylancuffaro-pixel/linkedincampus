import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Check, 
  Copy, 
  Send, 
  RefreshCw, 
  ShieldCheck, 
  Heart, 
  MessageSquare,
  Smile,
  AlertCircle
} from 'lucide-react';
import { CURRENT_WEEKLY_PROMPT } from '../data/promptData';
import { SandboxPost, KudosType, ToneCoachResponse } from '../types';

interface CalmWeeklyPromptProps {
  posts: SandboxPost[];
  onAddPost: (post: SandboxPost) => void;
  onAddKudos: (postId: string, type: KudosType) => void;
}

export const CalmWeeklyPrompt: React.FC<CalmWeeklyPromptProps> = ({
  posts,
  onAddPost,
  onAddKudos,
}) => {
  const prompt = CURRENT_WEEKLY_PROMPT;

  // Accordion tabs state
  const [expandedTab, setExpandedTab] = useState<'why' | 'mentor' | 'peers' | null>(null);

  // Drafting state
  const [draftText, setDraftText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<ToneCoachResponse | null>(null);
  const [showCoach, setShowCoach] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const toggleTab = (tab: 'why' | 'mentor' | 'peers') => {
    setExpandedTab((prev) => (prev === tab ? null : tab));
  };

  const handleUseStarter = () => {
    setDraftText(
      `In a project or internship last semester, I made a mistake that initially felt disastrous...\n\nHere is what happened:\n[Describe the mistake or unexpected bug]\n\nWhat I did to diagnose and fix it:\n[The steps you took to solve the root cause]\n\nThe #1 thing this taught me about my work:\n[The durable lesson or habit you adopted]\n\nFellow students: what was an early mistake that made you a much better problem-solver?`
    );
  };

  const handleAnalyze = async () => {
    if (!draftText.trim()) return;
    setIsAnalyzing(true);
    setShowCoach(true);

    try {
      const res = await fetch('/api/tone-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: draftText,
          category: 'Weekly Prompt Response',
        }),
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReplaceTerm = (term: string, replacement: string) => {
    const clean = replacement.split('/')[0].trim();
    const regex = new RegExp(term, 'gi');
    setDraftText((prev) => prev.replace(regex, clean));
    if (analysis) {
      setAnalysis({
        ...analysis,
        jargonHits: analysis.jargonHits.filter((h) => h.term.toLowerCase() !== term.toLowerCase()),
        score: Math.min(100, analysis.score + 5),
      });
    }
  };

  const handleSaveToSandbox = () => {
    if (!draftText.trim()) return;

    const newPost: SandboxPost = {
      id: `post-${Date.now()}`,
      author: {
        name: 'Ananya Roy',
        university: 'University of Michigan',
        major: 'Computer Science',
        gradYear: 'Class of 2027',
        avatarUrl: '/src/assets/images/student_user_avatar_1793928573066.jpg',
        headline: 'Junior @ Michigan · Training Wheels Member',
      },
      content: draftText,
      promptTopicId: prompt.id,
      promptTopicTitle: prompt.title,
      timestamp: 'Just now',
      kudos: {
        relatable: 1,
        insightful: 0,
        inspiring: 0,
        clear: 1,
      },
      commentsCount: 0,
      isCurrentUser: true,
    };

    onAddPost(newPost);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const promptPosts = posts.filter((p) => p.promptTopicId === prompt.id);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Calm Welcome Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <Smile className="w-3.5 h-3.5 text-emerald-600" />
          <span>No pressure, no judgment · Week 42 Student Challenge</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          "{prompt.promptQuestion}"
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Sharing a mistake or unexpected bug shows intellectual honesty and maturity. 
          Use the expandable tabs below to get advice, read peer drafts, or practice writing your response.
        </p>
      </div>

      {/* Expandable Info Tabs (Progressive Disclosure) */}
      <div className="space-y-2.5">
        {/* Tab 1: Why this matters */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
          <button
            onClick={() => toggleTab('why')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <span className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span className="text-base">💡</span>
              <span>Why you shouldn't be nervous about this prompt</span>
            </span>
            {expandedTab === 'why' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {expandedTab === 'why' && (
            <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 space-y-2 bg-slate-50/50">
              <p>
                {prompt.whyThisMatters}
              </p>
              <div className="p-3 bg-white rounded-md border border-slate-200 text-slate-700">
                <strong>Remember:</strong> Nobody expects a college sophomore or new graduate to have 10 years of flawless executive wins. 
                What hiring managers look for is whether you say <em>"Here is what broke, and here is how I diagnosed it"</em> instead of pretending you never make mistakes.
              </div>
            </div>
          )}
        </div>

        {/* Tab 2: Mentor advice */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
          <button
            onClick={() => toggleTab('mentor')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <span className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span className="text-base">👩‍💻</span>
              <span>Alumni Mentor Advice (Rachel Vance, Staff Engineer @ Stripe)</span>
            </span>
            {expandedTab === 'mentor' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {expandedTab === 'mentor' && (
            <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 space-y-3 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <img
                  src={prompt.mentorTip.avatarUrl}
                  alt={prompt.mentorTip.authorName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="font-bold text-slate-900">{prompt.mentorTip.authorName}</div>
                  <div className="text-[11px] text-slate-500">
                    {prompt.mentorTip.authorRole} · {prompt.mentorTip.authorCompany}
                  </div>
                </div>
              </div>

              <blockquote className="p-3 bg-white rounded-md border border-slate-200 text-slate-700 italic">
                "{prompt.mentorTip.tip}"
              </blockquote>

              <div className="text-slate-700">
                <span className="font-semibold text-[#0A66C2]">Example Hook to Borrow: </span>
                <span>"{prompt.mentorTip.exampleOpening}"</span>
              </div>
            </div>
          )}
        </div>

        {/* Tab 3: See peer sandbox posts */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
          <button
            onClick={() => toggleTab('peers')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <span className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span className="text-base">🤝</span>
              <span>Peer Sandbox Responses ({promptPosts.length} student drafts)</span>
            </span>
            {expandedTab === 'peers' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {expandedTab === 'peers' && (
            <div className="px-5 pb-5 border-t border-slate-100 pt-3 space-y-4 bg-slate-50/50">
              <p className="text-xs text-slate-500">
                These are real student drafts shared in the low-stakes campus sandbox:
              </p>

              <div className="space-y-3">
                {promptPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-white rounded-lg border border-slate-200 text-xs space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {post.author.avatarUrl ? (
                          <img
                            src={post.author.avatarUrl}
                            alt={post.author.name}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-slate-200 font-bold flex items-center justify-center text-[10px]">
                            {post.author.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-slate-900">{post.author.name}</span>
                          <span className="text-[11px] text-slate-400 ml-1.5">
                            {post.author.university}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                    </div>

                    <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                      {post.content}
                    </p>

                    {/* Simple kudos reaction */}
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-[11px]">
                      <button
                        onClick={() => onAddKudos(post.id, 'relatable')}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1"
                      >
                        <span>🤝 Relatable</span>
                        <span className="font-bold tabular-nums">{post.kudos.relatable}</span>
                      </button>
                      <button
                        onClick={() => onAddKudos(post.id, 'insightful')}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1"
                      >
                        <span>💡 Insightful</span>
                        <span className="font-bold tabular-nums">{post.kudos.insightful}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gentle Drafting Workspace */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Your Practice Draft</span>
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Sandbox only
            </span>
          </div>

          <button
            onClick={handleUseStarter}
            className="text-xs font-semibold text-[#0A66C2] hover:underline"
          >
            + Insert sentence starter
          </button>
        </div>

        <textarea
          rows={7}
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          placeholder="Start typing your story here... (e.g., 'In my lab project last month, I made a mistake...')"
          className="w-full p-3.5 text-xs sm:text-sm text-slate-900 bg-slate-50/50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0A66C2] focus:outline-hidden leading-relaxed"
        />

        {/* Expandable Coach Section */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => {
              if (!showCoach && !analysis) handleAnalyze();
              else setShowCoach(!showCoach);
            }}
            disabled={!draftText.trim()}
            className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 disabled:opacity-50 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {isAnalyzing
                  ? 'Analyzing your draft...'
                  : analysis
                  ? `AI Coach Feedback (${analysis.score}/100 Clarity)`
                  : 'Check Draft for Corporate Buzzwords & Tone'}
              </span>
            </span>
            {showCoach ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showCoach && (
            <div className="p-4 bg-white text-xs space-y-3 border-t border-slate-200 animate-in fade-in duration-150">
              {isAnalyzing ? (
                <div className="flex items-center gap-2 text-slate-500 py-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Looking for stiff jargon and checking readability...</span>
                </div>
              ) : analysis ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      Tone: <span className="text-emerald-700">{analysis.toneAssessment}</span>
                    </span>
                    <span className="font-bold text-[#0A66C2]">{analysis.score} / 100</span>
                  </div>

                  <p className="text-slate-600 leading-relaxed">{analysis.summary}</p>

                  {analysis.jargonHits.length > 0 && (
                    <div className="p-3 bg-amber-50 rounded-md border border-amber-200 space-y-2">
                      <span className="font-bold text-amber-900 block text-[11px] uppercase">
                        Buzzwords to Humanize ({analysis.jargonHits.length})
                      </span>
                      {analysis.jargonHits.map((hit, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-800">"{hit.term}"</span>
                          <button
                            onClick={() => handleReplaceTerm(hit.term, hit.replacement)}
                            className="text-[#0A66C2] hover:underline font-medium"
                          >
                            Replace with "{hit.replacement.split('/')[0].trim()}"
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {analysis.polishedVersion && (
                    <div className="p-3 bg-blue-50/50 rounded-md border border-blue-100 space-y-1.5">
                      <span className="font-bold text-blue-900 text-[11px] block">
                        Conversational Rewrite Suggestion:
                      </span>
                      <p className="text-slate-700 whitespace-pre-line leading-relaxed text-[11px]">
                        {analysis.polishedVersion}
                      </p>
                      <button
                        onClick={() => setDraftText(analysis.polishedVersion)}
                        className="text-[11px] font-semibold text-[#0A66C2] hover:underline"
                      >
                        Apply this version to my draft
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-[11px] text-slate-500">
            {savedNotice ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved to Peer Sandbox!
              </span>
            ) : copied ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Copied text to clipboard!
              </span>
            ) : (
              <span>Saved drafts remain safe in your sandbox until you export.</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              disabled={!draftText.trim()}
              className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy for LinkedIn</span>
            </button>

            <button
              onClick={handleSaveToSandbox}
              disabled={!draftText.trim()}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Save to Sandbox</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
