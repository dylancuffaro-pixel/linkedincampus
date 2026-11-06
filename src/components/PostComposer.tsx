import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Send, 
  RefreshCw, 
  FileText, 
  Layers, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { POST_TEMPLATES } from '../data/templateData';
import { PostTemplate, ToneCoachResponse, SandboxPost } from '../types';
import { CURRENT_USER } from '../data/seedPosts';

interface PostComposerProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishToSandbox: (post: SandboxPost) => void;
  initialPromptTopicId?: string;
  initialPromptTitle?: string;
}

export const PostComposer: React.FC<PostComposerProps> = ({
  isOpen,
  onClose,
  onPublishToSandbox,
  initialPromptTopicId,
  initialPromptTitle,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    initialPromptTopicId ? '' : POST_TEMPLATES[0].id
  );
  const [postContent, setPostContent] = useState<string>('');
  const [promptTopic, setPromptTopic] = useState<string>(initialPromptTitle || '');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ToneCoachResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'review' | 'templates'>('editor');
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);
  const [publishedNotice, setPublishedNotice] = useState<boolean>(false);

  // Initialize or update content when template or prompt changes
  useEffect(() => {
    if (initialPromptTitle) {
      setPromptTopic(initialPromptTitle);
      if (!postContent) {
        setPostContent(
          `In a project or internship last semester, I made a mistake that initially felt disastrous...\n\nHere is what happened:\n[Describe the mistake or unexpected bug]\n\nWhat I did to diagnose and fix it:\n[The steps you took to solve the root cause]\n\nThe #1 thing this taught me about my work:\n[The durable lesson or habit you adopted]\n\nFellow students: what was an early mistake that made you a much better problem-solver?`
        );
      }
    } else if (selectedTemplateId) {
      const tpl = POST_TEMPLATES.find((t) => t.id === selectedTemplateId);
      if (tpl && !postContent) {
        setPostContent(tpl.scaffoldText);
      }
    }
  }, [selectedTemplateId, initialPromptTitle]);

  if (!isOpen) return null;

  const handleSelectTemplate = (template: PostTemplate) => {
    setSelectedTemplateId(template.id);
    setPostContent(template.scaffoldText);
    setAnalysisResult(null);
    setActiveTab('editor');
  };

  const handleAnalyzeTone = async () => {
    if (!postContent.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/tone-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: postContent,
          category: selectedTemplateId || 'Student Experience',
        }),
      });

      if (!res.ok) {
        throw new Error('Analysis request failed');
      }

      const data: ToneCoachResponse = await res.json();
      setAnalysisResult(data);
      setActiveTab('review');
    } catch (err) {
      console.error('Failed to analyze tone:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReplaceJargon = (term: string, replacement: string) => {
    const cleanReplacement = replacement.split('/')[0].trim();
    const regex = new RegExp(term, 'gi');
    const updated = postContent.replace(regex, cleanReplacement);
    setPostContent(updated);

    // Update analysis result jargon hits
    if (analysisResult) {
      setAnalysisResult({
        ...analysisResult,
        jargonHits: analysisResult.jargonHits.filter((h) => h.term.toLowerCase() !== term.toLowerCase()),
        score: Math.min(100, analysisResult.score + 5),
      });
    }
  };

  const handleApplyPolishedVersion = () => {
    if (analysisResult?.polishedVersion) {
      setPostContent(analysisResult.polishedVersion);
    }
  };

  const handlePublish = () => {
    if (!postContent.trim()) return;

    const newPost: SandboxPost = {
      id: `post-${Date.now()}`,
      author: {
        name: CURRENT_USER.name,
        university: CURRENT_USER.university,
        major: CURRENT_USER.major,
        gradYear: CURRENT_USER.gradYear,
        avatarUrl: CURRENT_USER.avatarUrl,
        headline: CURRENT_USER.headline,
      },
      content: postContent,
      promptTopicId: initialPromptTopicId,
      promptTopicTitle: promptTopic,
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

    onPublishToSandbox(newPost);
    setPublishedNotice(true);
    setTimeout(() => {
      setPublishedNotice(false);
      onClose();
    }, 1200);
  };

  const handleCopyForLinkedIn = () => {
    navigator.clipboard.writeText(postContent);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full shadow-2xl border border-neutral-200 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0A66C2] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 leading-tight">
                Post Template Studio & Tone Coach
              </h3>
              <p className="text-[11px] text-neutral-500">
                Draft with training wheels: real-time buzzword removal & low-risk sandbox publishing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-5 py-2 border-b border-neutral-100 bg-white text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
                activeTab === 'editor'
                  ? 'bg-neutral-100 text-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Composer
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
                activeTab === 'templates'
                  ? 'bg-neutral-100 text-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Choose Template ({POST_TEMPLATES.length})
            </button>
            {analysisResult && (
              <button
                onClick={() => setActiveTab('review')}
                className={`px-3 py-1.5 font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'review'
                    ? 'bg-blue-50 text-[#0A66C2]'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span>AI Tone Review</span>
                <span className="px-1.5 py-0.2 rounded-full bg-blue-200 text-blue-800 text-[10px] font-bold">
                  {analysisResult.score}/100
                </span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-neutral-400">
              {postContent.length} characters · {postContent.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto">
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div className="text-xs text-neutral-600">
                Select a scaffolding template to jumpstart your writing. You can customize every sentence and replace placeholders in the editor:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {POST_TEMPLATES.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-[#0A66C2] hover:shadow-xs text-left ${
                      selectedTemplateId === tpl.id
                        ? 'border-[#0A66C2] bg-blue-50/40 ring-1 ring-[#0A66C2]'
                        : 'border-neutral-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-neutral-900">{tpl.title}</span>
                      <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wide">
                        {tpl.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mb-2 leading-relaxed">
                      {tpl.tagline}
                    </p>
                    <div className="text-[11px] text-[#0A66C2] font-semibold flex items-center gap-1">
                      <span>Use this template</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'editor' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left 2 Cols: Main Editor */}
              <div className="lg:col-span-2 space-y-3">
                {promptTopic && (
                  <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 font-medium flex items-center justify-between">
                    <span className="truncate">Responding to: <strong>{promptTopic}</strong></span>
                    <button 
                      onClick={() => setPromptTopic('')} 
                      className="text-amber-700 hover:text-amber-900 text-[10px] ml-2"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="relative">
                  <textarea
                    rows={12}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Write your authentic story here... (e.g., talk about an obstacle you solved or a tool you learned)"
                    className="w-full p-3.5 text-xs sm:text-sm text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] focus:outline-hidden leading-relaxed font-sans placeholder-neutral-400"
                  />
                  
                  {/* Subtle placeholder tips */}
                  <div className="text-[11px] text-neutral-500 mt-1 flex items-center justify-between">
                    <span>💡 Tip: Replace text in <code>[brackets]</code> with your authentic experiences.</span>
                    <button
                      onClick={() => setPostContent('')}
                      className="text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      Clear text
                    </button>
                  </div>
                </div>

                {/* Tone Coach Trigger Bar */}
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Before posting, check for corporate buzzwords and receive friendly rewrite suggestions.</span>
                  </div>

                  <button
                    onClick={handleAnalyzeTone}
                    disabled={isAnalyzing || !postContent.trim()}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:pointer-events-none rounded-md shadow-2xs transition-colors shrink-0"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Run AI Tone Coach</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Col: Instant Scaffolding Guide / De-Jargonizer Quick Hints */}
              <div className="space-y-3">
                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 text-xs">
                  <div className="font-bold text-neutral-900 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0A66C2]" />
                    <span>Student Writing Guardrails</span>
                  </div>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Lead with the obstacle:</strong> "I spent 4 hours stuck on..." creates instant curiosity.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Use double returns:</strong> Break long thoughts into 1-2 sentence digestible chunks.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-500 font-bold">✗</span>
                      <span><strong>Skip the boilerplate:</strong> Delete "humbled and honored" or "proud to announce".</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>End with a question:</strong> Invites peers and recruiters to start a conversation with you.</span>
                    </li>
                  </ul>
                </div>

                {analysisResult && (
                  <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3.5 text-xs animate-in fade-in duration-150">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-blue-900">Coach Feedback Ready</span>
                      <span className="font-bold text-[#0A66C2]">{analysisResult.score}/100</span>
                    </div>
                    <p className="text-neutral-700 text-[11px] mb-2 leading-relaxed">
                      {analysisResult.summary}
                    </p>
                    <button
                      onClick={() => setActiveTab('review')}
                      className="w-full py-1.5 bg-[#0A66C2] text-white rounded font-semibold text-center hover:bg-[#004182] transition-colors"
                    >
                      View Detailed Critique & Fixes
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'review' && analysisResult && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Scorecard Strip */}
              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#0A66C2] flex flex-col items-center justify-center shadow-xs">
                    <span className="text-lg font-extrabold text-[#0A66C2] leading-none tabular-nums">
                      {analysisResult.score}
                    </span>
                    <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">
                      Authenticity
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-neutral-900">Tone Assessment:</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        analysisResult.toneAssessment.includes('Authentic')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {analysisResult.toneAssessment}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 max-w-xl">
                      {analysisResult.summary}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('editor')}
                  className="px-3 py-1.5 text-xs font-semibold border border-neutral-300 rounded-md hover:bg-neutral-100 transition-colors shrink-0"
                >
                  Back to Editor
                </button>
              </div>

              {/* Jargon Hits Section */}
              {analysisResult.jargonHits.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Corporate Clichés Detected ({analysisResult.jargonHits.length})</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {analysisResult.jargonHits.map((hit, idx) => (
                      <div key={idx} className="p-3 bg-amber-50/50 border border-amber-200 rounded-lg text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                            "{hit.term}"
                          </span>
                          <button
                            onClick={() => handleReplaceJargon(hit.term, hit.replacement)}
                            className="text-[11px] font-semibold text-[#0A66C2] hover:underline"
                          >
                            Replace with "{hit.replacement.split('/')[0].trim()}"
                          </button>
                        </div>
                        <p className="text-neutral-600 text-[11px] leading-relaxed mb-1.5">
                          {hit.reason}
                        </p>
                        <div className="text-[11px] text-emerald-800 font-medium">
                          Suggested alternative: <strong>{hit.replacement}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No corporate buzzwords or posturing detected! Your wording sounds grounded and authentic.</span>
                </div>
              )}

              {/* Strengths & Suggestions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs">
                  <span className="font-bold text-neutral-900 block mb-2">Strengths</span>
                  <ul className="space-y-1.5 text-neutral-600">
                    {analysisResult.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs">
                  <span className="font-bold text-neutral-900 block mb-2">Suggestions to Elevate Clarity</span>
                  <ul className="space-y-1.5 text-neutral-600">
                    {analysisResult.suggestions.map((sug, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-blue-600 font-bold shrink-0">→</span>
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Polished Rewrite Comparison */}
              {analysisResult.polishedVersion && (
                <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-lg text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#0A66C2]" />
                      <span>AI Polished Suggestion (Conversational & Punchy)</span>
                    </span>
                    <button
                      onClick={handleApplyPolishedVersion}
                      className="px-2.5 py-1 text-xs font-semibold bg-[#0A66C2] text-white rounded hover:bg-[#004182] transition-colors"
                    >
                      Apply This Rewrite to Editor
                    </button>
                  </div>
                  <div className="p-3 bg-white border border-blue-100 rounded text-neutral-800 leading-relaxed font-sans whitespace-pre-line text-xs sm:text-sm">
                    {analysisResult.polishedVersion}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            {publishedNotice ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Published to Campus Sandbox!
              </span>
            ) : copiedNotice ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Copied formatted text to clipboard!
              </span>
            ) : (
              <span>Publish in the sandbox for peer kudos or copy directly to real LinkedIn.</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyForLinkedIn}
              disabled={!postContent.trim()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-100 disabled:opacity-50 rounded-lg transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy for LinkedIn</span>
            </button>

            <button
              onClick={handlePublish}
              disabled={!postContent.trim() || publishedNotice}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-50 rounded-lg shadow-2xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish to Campus Sandbox</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
