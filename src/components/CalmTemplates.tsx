import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Send,
  FileText,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { POST_TEMPLATES } from '../data/templateData';
import { PostTemplate, ToneCoachResponse, SandboxPost } from '../types';

interface CalmTemplatesProps {
  onAddPost: (post: SandboxPost) => void;
}

export const CalmTemplates: React.FC<CalmTemplatesProps> = ({ onAddPost }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(POST_TEMPLATES[0].id);
  const currentTemplate = POST_TEMPLATES.find((t) => t.id === selectedTemplateId) || POST_TEMPLATES[0];

  // Accordion tabs inside template
  const [openSection, setOpenSection] = useState<'tips' | 'example' | null>(null);

  // Editor state
  const [userDraft, setUserDraft] = useState<string>(currentTemplate.scaffoldText);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<ToneCoachResponse | null>(null);
  const [showCoach, setShowCoach] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleSelectTemplate = (tpl: PostTemplate) => {
    setSelectedTemplateId(tpl.id);
    setUserDraft(tpl.scaffoldText);
    setAnalysis(null);
    setShowCoach(false);
    setOpenSection(null);
  };

  const handleAnalyze = async () => {
    if (!userDraft.trim()) return;
    setIsAnalyzing(true);
    setShowCoach(true);

    try {
      const res = await fetch('/api/tone-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: userDraft,
          category: currentTemplate.title,
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
    setUserDraft((prev) => prev.replace(regex, clean));
    if (analysis) {
      setAnalysis({
        ...analysis,
        jargonHits: analysis.jargonHits.filter((h) => h.term.toLowerCase() !== term.toLowerCase()),
        score: Math.min(100, analysis.score + 5),
      });
    }
  };

  const handleSaveToSandbox = () => {
    if (!userDraft.trim()) return;

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
      content: userDraft,
      timestamp: 'Just now',
      kudos: {
        relatable: 1,
        insightful: 1,
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
    navigator.clipboard.writeText(userDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Intro Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs text-center space-y-1.5">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Post Scaffolding Templates
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Writing on LinkedIn doesn't have to feel awkward. Pick a scenario below, customize the fill-in-the-blank text, and expand the tabs for tips and examples.
        </p>
      </div>

      {/* Clean Template Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-200/70 rounded-xl">
        {POST_TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => handleSelectTemplate(tpl)}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedTemplateId === tpl.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
            }`}
          >
            {tpl.title}
          </button>
        ))}
      </div>

      {/* Selected Template Guide & Expandable Sections */}
      <div className="space-y-2.5">
        {/* Expandable Tab 1: Mentor Advice */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
          <button
            onClick={() => setOpenSection(openSection === 'tips' ? null : 'tips')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <span className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Writing Tips for "{currentTemplate.title}" ({currentTemplate.tips.length} points)</span>
            </span>
            {openSection === 'tips' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openSection === 'tips' && (
            <div className="px-5 pb-4 text-xs text-slate-600 border-t border-slate-100 pt-3 bg-slate-50/50 space-y-2">
              <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                {currentTemplate.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Expandable Tab 2: Finished Example */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
          <button
            onClick={() => setOpenSection(openSection === 'example' ? null : 'example')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <span className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>See What a Finished, Natural Post Looks Like</span>
            </span>
            {openSection === 'example' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openSection === 'example' && (
            <div className="px-5 pb-4 text-xs text-slate-700 border-t border-slate-100 pt-3 bg-slate-50/50 space-y-2 leading-relaxed whitespace-pre-line">
              <div className="p-3.5 bg-white rounded-md border border-slate-200">
                {currentTemplate.exampleCompletedPost}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editor Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-slate-900 block">
              Customize Your Post
            </span>
            <span className="text-xs text-slate-500">
              Replace text in <code>[brackets]</code> with your actual experiences.
            </span>
          </div>

          <button
            onClick={() => setUserDraft(currentTemplate.scaffoldText)}
            className="text-xs text-slate-500 hover:text-slate-800 underline"
          >
            Reset template
          </button>
        </div>

        <textarea
          rows={9}
          value={userDraft}
          onChange={(e) => setUserDraft(e.target.value)}
          className="w-full p-3.5 text-xs sm:text-sm text-slate-900 bg-slate-50/50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0A66C2] focus:outline-hidden leading-relaxed font-sans"
        />

        {/* Expandable Coach Section */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => {
              if (!showCoach && !analysis) handleAnalyze();
              else setShowCoach(!showCoach);
            }}
            disabled={!userDraft.trim()}
            className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 disabled:opacity-50 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {isAnalyzing
                  ? 'Checking tone and buzzwords...'
                  : analysis
                  ? `AI Coach Review (${analysis.score}/100)`
                  : 'Check Draft for Corporate Buzzwords'}
              </span>
            </span>
            {showCoach ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showCoach && (
            <div className="p-4 bg-white text-xs space-y-3 border-t border-slate-200 animate-in fade-in duration-150">
              {isAnalyzing ? (
                <div className="flex items-center gap-2 text-slate-500 py-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning text for posturing or robot-like buzzwords...</span>
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
                        Polished Human Rewrite:
                      </span>
                      <p className="text-slate-700 whitespace-pre-line leading-relaxed text-[11px]">
                        {analysis.polishedVersion}
                      </p>
                      <button
                        onClick={() => setUserDraft(analysis.polishedVersion)}
                        className="text-[11px] font-semibold text-[#0A66C2] hover:underline"
                      >
                        Use this version in my editor
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
              <span>Take your time · You can edit anytime.</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              disabled={!userDraft.trim()}
              className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy for LinkedIn</span>
            </button>

            <button
              onClick={handleSaveToSandbox}
              disabled={!userDraft.trim()}
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
