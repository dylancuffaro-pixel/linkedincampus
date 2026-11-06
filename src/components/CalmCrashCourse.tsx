import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Clock, 
  Smile, 
  Award,
  X
} from 'lucide-react';
import { CRASH_COURSE_MODULES } from '../data/crashCourseData';
import { CourseModule } from '../types';

interface CalmCrashCourseProps {
  completedCourses: string[];
  onToggleCompleteCourse: (courseId: string) => void;
}

export const CalmCrashCourse: React.FC<CalmCrashCourseProps> = ({
  completedCourses,
  onToggleCompleteCourse,
}) => {
  const [openModuleId, setOpenModuleId] = useState<string | null>(CRASH_COURSE_MODULES[0].id);
  const [activeSubTab, setActiveSubTab] = useState<'takeaways' | 'makeover' | 'quiz'>('takeaways');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  const toggleModule = (id: string) => {
    setOpenModuleId((prev) => (prev === id ? null : id));
    setActiveSubTab('takeaways');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Friendly Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0A66C2]">
          <Smile className="w-3.5 h-3.5" />
          <span>Bite-sized, zero-stress guides for students</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          LinkedIn Crash Course
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Four 3-minute lessons to replace corporate anxiety with authentic confidence. 
          Expand each module to see rules, before & after examples, and scenario checks.
        </p>

        {/* Progress Pill */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
          <span>Your progress:</span>
          <span className="text-[#0A66C2] font-bold">{completedCourses.length} of 4 finished</span>
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{ width: `${(completedCourses.length / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Accordion Module Cards */}
      <div className="space-y-3">
        {CRASH_COURSE_MODULES.map((mod, idx) => {
          const isOpen = openModuleId === mod.id;
          const isDone = completedCourses.includes(mod.id);

          return (
            <div
              key={mod.id}
              className={`bg-white rounded-xl border transition-all shadow-2xs overflow-hidden ${
                isOpen ? 'border-[#0A66C2] ring-1 ring-[#0A66C2]' : 'border-slate-200'
              }`}
            >
              {/* Module Header Bar */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isDone ? '✓' : `0${idx + 1}`}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {mod.title}
                    </h3>
                    <p className="text-[11px] text-slate-500">{mod.duration} read · {mod.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isDone && (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full hidden sm:inline">
                      Completed
                    </span>
                  )}
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Module Details with Clean Sub-Tabs */}
              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-5 space-y-4 text-xs animate-in fade-in duration-150">
                  {/* Sub-Tabs */}
                  <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-lg w-fit">
                    <button
                      onClick={() => setActiveSubTab('takeaways')}
                      className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                        activeSubTab === 'takeaways'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Core Rules
                    </button>
                    <button
                      onClick={() => setActiveSubTab('makeover')}
                      className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                        activeSubTab === 'makeover'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Before & After Examples
                    </button>
                    <button
                      onClick={() => setActiveSubTab('quiz')}
                      className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                        activeSubTab === 'quiz'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Scenario Check
                    </button>
                  </div>

                  {/* SUB-TAB 1: Core Rules & Dos/Don'ts */}
                  {activeSubTab === 'takeaways' && (
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide">
                          Key Rules of the Road
                        </span>
                        <ul className="space-y-2 text-slate-700">
                          {mod.keyTakeaways.map((point, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#0A66C2] font-bold shrink-0">0{i + 1}.</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {mod.dosAndDonts.map((item, i) => (
                          <div key={i} className="space-y-2">
                            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-emerald-950">
                              <span className="font-bold text-emerald-800 text-[10px] block uppercase mb-1">
                                ✓ Authentic Way:
                              </span>
                              <p className="leading-relaxed">{item.do}</p>
                            </div>

                            <div className="p-3 bg-red-50/70 border border-red-200 rounded-lg text-red-950">
                              <span className="font-bold text-red-800 text-[10px] block uppercase mb-1">
                                ✗ Stiff / Robotic Way:
                              </span>
                              <p className="leading-relaxed">{item.dont}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 2: Makeover Examples */}
                  {activeSubTab === 'makeover' && (
                    <div className="space-y-3">
                      {mod.interactiveExercise.templatesOrExamples.map((ex, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 space-y-2.5">
                          <span className="font-bold text-slate-900 text-xs">
                            Scenario: {ex.label}
                          </span>

                          <div className="space-y-2">
                            <div className="p-2.5 bg-red-50/50 rounded border border-red-100 text-slate-700">
                              <span className="text-[10px] font-bold text-red-700 block uppercase">
                                Intimidating Boilerplate:
                              </span>
                              <p className="italic font-serif">"{ex.before}"</p>
                            </div>

                            <div className="p-2.5 bg-emerald-50/50 rounded border border-emerald-100 text-slate-800">
                              <span className="text-[10px] font-bold text-emerald-700 block uppercase">
                                Human & Authentic:
                              </span>
                              <p className="font-medium">"{ex.after}"</p>
                            </div>
                          </div>

                          <div className="text-[11px] text-[#0A66C2]">
                            <strong>Why recruiters love this: </strong>
                            <span>{ex.why}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SUB-TAB 3: Scenario Quiz */}
                  {activeSubTab === 'quiz' && (
                    <div className="space-y-4">
                      {mod.quiz.map((q) => {
                        const selected = quizAnswers[q.id];
                        const isSubmitted = quizSubmitted[q.id];
                        const isCorrect = selected === q.correctIndex;

                        return (
                          <div key={q.id} className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                            <p className="font-bold text-slate-900 text-xs sm:text-sm">
                              {q.question}
                            </p>

                            <div className="space-y-1.5">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = selected === optIdx;
                                let btnClass = 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100';

                                if (isSubmitted) {
                                  if (optIdx === q.correctIndex) {
                                    btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                                  } else if (isSelected) {
                                    btnClass = 'border-red-400 bg-red-50 text-red-800';
                                  }
                                } else if (isSelected) {
                                  btnClass = 'border-[#0A66C2] bg-blue-50 text-[#0A66C2] font-semibold';
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    onClick={() =>
                                      !isSubmitted &&
                                      setQuizAnswers({ ...quizAnswers, [q.id]: optIdx })
                                    }
                                    disabled={isSubmitted}
                                    className={`w-full text-left p-2.5 rounded-md border text-xs transition-colors ${btnClass}`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0">
                                        {String.fromCharCode(65 + optIdx)}
                                      </span>
                                      <span>{opt}</span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {!isSubmitted && selected !== undefined && (
                              <button
                                onClick={() =>
                                  setQuizSubmitted({ ...quizSubmitted, [q.id]: true })
                                }
                                className="px-3 py-1.5 bg-[#0A66C2] text-white rounded text-xs font-semibold hover:bg-[#004182] transition-colors"
                              >
                                Check My Answer
                              </button>
                            )}

                            {isSubmitted && (
                              <div
                                className={`p-3 rounded-md text-xs leading-relaxed ${
                                  isCorrect
                                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-950 border border-amber-200'
                                }`}
                              >
                                <div className="font-bold mb-0.5">
                                  {isCorrect ? '🎯 Exactly right!' : '💡 Remember:'}
                                </div>
                                <p>{q.explanation}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Toggle Complete Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => onToggleCompleteCourse(mod.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        isDone
                          ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-3" />
                      <span>{isDone ? 'Finished! (Click to uncheck)' : 'Mark Lesson as Finished'}</span>
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
