import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check,
  Smile
} from 'lucide-react';
import { CORPORATE_DICTIONARY, JargonEntry } from '../data/dictionaryData';

export const CorporateDictionaryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Common' | 'Overused' | 'Avoid'>('All');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const filteredEntries = CORPORATE_DICTIONARY.filter((entry) => {
    if (selectedLevel !== 'All' && entry.level !== selectedLevel) {
      return false;
    }
    if (
      searchTerm &&
      !entry.term.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !entry.translation.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleCopyAlternative = (term: string, alt: string) => {
    navigator.clipboard.writeText(alt);
    setCopiedTerm(term);
    setTimeout(() => setCopiedTerm(null), 1800);
  };

  const getLevelBadgeStyle = (level: 'Common' | 'Overused' | 'Avoid') => {
    switch (level) {
      case 'Common':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Overused':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Avoid':
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const toggleExpand = (term: string) => {
    setExpandedTerm((prev) => (prev === term ? null : term));
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <Smile className="w-3.5 h-3.5" />
          <span>Decoding business-speak so you never feel out of the loop</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Corporate Jargon Decoder
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Ever heard someone say "Let's circle back offline to optimize our bandwidth" and wondered what on earth they meant? Click any term below to see the plain-English translation.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-3 max-w-md mx-auto space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search words (e.g. bandwidth, synergy, circle back)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0A66C2] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs">
            {(['All', 'Common', 'Overused', 'Avoid'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl === 'All' ? 'All Buzzwords' : lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion Jargon List */}
      <div className="space-y-2.5">
        {filteredEntries.map((entry) => {
          const isExpanded = expandedTerm === entry.term;

          return (
            <div
              key={entry.term}
              className={`bg-white rounded-lg border transition-all shadow-2xs overflow-hidden ${
                isExpanded ? 'border-slate-400' : 'border-slate-200'
              }`}
            >
              <button
                onClick={() => toggleExpand(entry.term)}
                className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900">
                    "{entry.term}"
                  </span>
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    means: <em>{entry.translation}</em>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getLevelBadgeStyle(
                      entry.level
                    )}`}
                  >
                    {entry.level}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50 text-xs space-y-3 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 bg-white rounded-md border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Plain English Meaning:
                      </span>
                      <p className="text-slate-800 font-medium">{entry.translation}</p>
                    </div>

                    <div className="p-3 bg-amber-50/50 rounded-md border border-amber-200 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-amber-700 block">
                        College Equivalent:
                      </span>
                      <p className="text-amber-950 italic">{entry.studentTranslation}</p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded border border-slate-200">
                    <strong>Heard in meetings: </strong>
                    <span className="italic">"{entry.exampleInTheWild}"</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                        What to say instead:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {entry.recommendedAlternative}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleCopyAlternative(entry.term, entry.recommendedAlternative)
                      }
                      className="px-2.5 py-1 text-xs font-semibold text-[#0A66C2] hover:bg-blue-50 rounded transition-colors flex items-center gap-1"
                    >
                      {copiedTerm === entry.term ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy phrase</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
