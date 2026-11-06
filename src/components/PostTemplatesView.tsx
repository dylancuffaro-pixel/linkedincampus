import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Copy, 
  Lightbulb, 
  PenTool,
  Bookmark
} from 'lucide-react';
import { POST_TEMPLATES } from '../data/templateData';
import { PostTemplate } from '../types';

interface PostTemplatesViewProps {
  onSelectTemplate: (templateId: string) => void;
}

export const PostTemplatesView: React.FC<PostTemplatesViewProps> = ({
  onSelectTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePreviewId, setActivePreviewId] = useState<string>(
    POST_TEMPLATES[0].id
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = POST_TEMPLATES.filter((tpl) => {
    if (selectedCategory === 'all') return true;
    return tpl.category === selectedCategory;
  });

  const activeTemplate =
    POST_TEMPLATES.find((t) => t.id === activePreviewId) || POST_TEMPLATES[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-2xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-[#0A66C2]">
              Post Scaffolding Studio
            </span>
            <span className="text-xs text-neutral-500">
              5 proven frameworks for student milestones
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-snug">
            Professional Post Templates with Training Wheels
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">
            Never face a blank text box again. Each template is structured with fill-in-the-blank placeholders, storytelling hooks, and built-in guardrails against boring corporate humble-brags.
          </p>
        </div>

        {/* Filter categories */}
        <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
          {[
            { id: 'all', label: 'All Templates (5)' },
            { id: 'milestone', label: 'Internships & Milestones' },
            { id: 'project', label: 'Side Projects & Demos' },
            { id: 'reflection', label: 'Learning in Public' },
            { id: 'outreach', label: 'Coffee Chats & Networking' },
            { id: 'conference', label: 'Conferences & Events' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Left list, Right live preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Template Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredTemplates.map((tpl) => {
            const isSelected = tpl.id === activePreviewId;

            return (
              <div
                key={tpl.id}
                onClick={() => setActivePreviewId(tpl.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#0A66C2] bg-blue-50/40 ring-1 ring-[#0A66C2] shadow-xs'
                    : 'border-neutral-200 bg-white hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-neutral-900">
                    {tpl.title}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                    {tpl.difficulty}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                  {tpl.tagline}
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-100">
                  <span className="text-[11px] text-neutral-400">
                    {tpl.tips.length} mentor tips
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate(tpl.id);
                    }}
                    className="flex items-center gap-1 font-semibold text-[#0A66C2] hover:underline"
                  >
                    <span>Use in Composer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Template Breakdown & Example (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-lg border border-neutral-200 p-5 sm:p-6 shadow-2xs space-y-5">
            <div className="flex items-start justify-between gap-3 border-b border-neutral-100 pb-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                  {activeTemplate.title}
                </h2>
                <p className="text-xs text-neutral-600 mt-0.5">
                  {activeTemplate.tagline}
                </p>
              </div>

              <button
                onClick={() => onSelectTemplate(activeTemplate.id)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] rounded-full shadow-xs transition-colors shrink-0"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Customize in Composer</span>
              </button>
            </div>

            {/* Scaffold Code / Text Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-700 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>Scaffolding Framework (Fill In The Blanks)</span>
                </span>
                <button
                  onClick={() => handleCopy(activeTemplate.id, activeTemplate.scaffoldText)}
                  className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 flex items-center gap-1"
                >
                  {copiedId === activeTemplate.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Scaffold</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-xs sm:text-sm text-neutral-800 font-mono whitespace-pre-line leading-relaxed max-h-72 overflow-y-auto">
                {activeTemplate.scaffoldText}
              </div>
            </div>

            {/* Mentor Tips for this template */}
            <div className="p-3.5 bg-amber-50/60 rounded-lg border border-amber-200 text-xs text-amber-950 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Tips from Alumni Mentors</span>
              </div>
              <ul className="space-y-1 pl-4 list-disc text-amber-900/90 leading-relaxed text-[11px]">
                {activeTemplate.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Full Finished Example */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <span className="text-xs font-bold text-neutral-700 block">
                What a Finished Post Looks Like (High Engagement Example):
              </span>
              <div className="p-4 bg-blue-50/40 rounded-lg border border-blue-100 text-xs text-neutral-800 font-sans whitespace-pre-line leading-relaxed">
                {activeTemplate.exampleCompletedPost}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
