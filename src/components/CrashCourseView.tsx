import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Send, 
  Feather, 
  MessageSquare, 
  ArrowRight, 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  Award
} from 'lucide-react';
import { CRASH_COURSE_MODULES } from '../data/crashCourseData';
import { CourseModule, QuizQuestion } from '../types';

interface CrashCourseViewProps {
  completedCourses: string[];
  onToggleCompleteCourse: (courseId: string) => void;
  onOpenComposerWithTemplate?: () => void;
}

export const CrashCourseView: React.FC<CrashCourseViewProps> = ({
  completedCourses,
  onToggleCompleteCourse,
  onOpenComposerWithTemplate,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    CRASH_COURSE_MODULES[0].id
  );
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<Record<string, boolean>>({});

  const currentModule =
    CRASH_COURSE_MODULES.find((m) => m.id === selectedModuleId) ||
    CRASH_COURSE_MODULES[0];

  const isCompleted = completedCourses.includes(currentModule.id);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-5 h-5" />;
      case 'Send':
        return <Send className="w-5 h-5" />;
      case 'Feather':
        return <Feather className="w-5 h-5" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: optionIdx });
  };

  const handleSubmitQuizQuestion = (questionId: string) => {
    setSubmittedQuiz({ ...submittedQuiz, [questionId]: true });
  };

  return (
    <div className="space-y-6">
      {/* Course Hero Banner */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-[#0A66C2]">
                Campus Crash Course
              </span>
              <span className="text-xs text-neutral-500">
                4 micro-lessons · ~15 minutes total
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-snug">
              Demystifying Corporate Life & Networking
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">
              Most students find LinkedIn intimidating because people talk in artificial corporate jargon. 
              These 4 bite-sized lessons give you concrete scripts, headline formulas, and psychological permission to share authentic student work.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex flex-col items-center justify-center min-w-44 text-center">
            <span className="text-xs text-neutral-500 font-semibold mb-1">Your Progress</span>
            <span className="text-2xl font-black text-[#0A66C2] tabular-nums">
              {completedCourses.length} / 4
            </span>
            <span className="text-[11px] text-neutral-600 mt-0.5">Modules Finished</span>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${(completedCourses.length / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left module tabs, Right module reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Module Picker (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-neutral-700 uppercase tracking-wide px-1">
            Course Modules
          </div>

          <div className="space-y-2">
            {CRASH_COURSE_MODULES.map((mod, idx) => {
              const active = mod.id === selectedModuleId;
              const done = completedCourses.includes(mod.id);

              return (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    active
                      ? 'border-[#0A66C2] bg-blue-50/40 ring-1 ring-[#0A66C2] shadow-xs'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                          active
                            ? 'bg-[#0A66C2] text-white'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {getModuleIcon(mod.iconName)}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-neutral-400 block leading-none mb-0.5">
                          Lesson 0{idx + 1} · {mod.duration}
                        </span>
                        <h4 className="text-xs font-bold text-neutral-900 leading-tight">
                          {mod.title}
                        </h4>
                      </div>
                    </div>

                    {done && (
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0" title="Completed">
                        <Check className="w-3 h-3 stroke-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick certificate banner */}
          {completedCourses.length === 4 && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>Training Wheels Certified!</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                You've completed all 4 foundational modules. You now possess the frameworks to network and post with genuine confidence!
              </p>
            </div>
          )}
        </div>

        {/* Selected Module Detail (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-lg border border-neutral-200 p-5 sm:p-6 shadow-2xs space-y-6">
            
            {/* Module Header */}
            <div className="border-b border-neutral-100 pb-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#0A66C2] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentModule.duration} read</span>
                </span>

                <button
                  onClick={() => onToggleCompleteCourse(currentModule.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                </button>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
                {currentModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                {currentModule.summary}
              </p>
            </div>

            {/* Key Takeaways */}
            <div>
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Core Rules of the Road</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentModule.keyTakeaways.map((takeaway, i) => (
                  <div
                    key={i}
                    className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-700 leading-relaxed"
                  >
                    <span className="font-bold text-[#0A66C2] block mb-1">
                      Rule 0{i + 1}
                    </span>
                    {takeaway}
                  </div>
                ))}
              </div>
            </div>

            {/* Dos and Don'ts */}
            <div>
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wide mb-2.5">
                What to Do vs. What to Avoid
              </h3>
              <div className="space-y-3">
                {currentModule.dosAndDonts.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs"
                  >
                    {/* DO */}
                    <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-emerald-950">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
                        <Check className="w-3.5 h-3.5 stroke-3" />
                        <span>DO THIS:</span>
                      </div>
                      <p className="leading-relaxed">{item.do}</p>
                    </div>

                    {/* DONT */}
                    <div className="p-3 bg-red-50/60 border border-red-200 rounded-lg text-red-950">
                      <div className="flex items-center gap-1.5 font-bold text-red-800 mb-1">
                        <X className="w-3.5 h-3.5 stroke-3" />
                        <span>AVOID THIS:</span>
                      </div>
                      <p className="leading-relaxed">{item.dont}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Makeover Studio */}
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3">
              <div>
                <span className="text-xs font-bold text-neutral-900 block">
                  {currentModule.interactiveExercise.title}
                </span>
                <p className="text-xs text-neutral-600 mt-0.5">
                  {currentModule.interactiveExercise.description}
                </p>
              </div>

              <div className="space-y-3">
                {currentModule.interactiveExercise.templatesOrExamples.map((ex, i) => (
                  <div key={i} className="bg-white p-3.5 rounded-lg border border-neutral-200 text-xs space-y-2">
                    <span className="font-bold text-neutral-800 block text-[11px] uppercase tracking-wide">
                      Scenario: {ex.label}
                    </span>

                    <div className="space-y-1.5">
                      <div className="p-2 bg-red-50/50 rounded border border-red-100 text-neutral-700">
                        <span className="font-bold text-red-700 text-[10px] block uppercase">
                          Intimidating / Cliché:
                        </span>
                        <p className="italic font-serif text-[11px]">"{ex.before}"</p>
                      </div>

                      <div className="p-2 bg-emerald-50/50 rounded border border-emerald-100 text-neutral-800">
                        <span className="font-bold text-emerald-700 text-[10px] block uppercase">
                          Authentic & Direct:
                        </span>
                        <p className="font-sans text-[12px] font-medium leading-relaxed">
                          "{ex.after}"
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#0A66C2] pt-1">
                      <strong>Why it works: </strong>
                      <span>{ex.why}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Check Quizzes */}
            <div>
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Quick Scenario Check</span>
              </h3>

              <div className="space-y-4">
                {currentModule.quiz.map((q) => {
                  const selected = quizAnswers[q.id];
                  const isSubmitted = submittedQuiz[q.id];
                  const isCorrect = selected === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-3"
                    >
                      <p className="font-bold text-neutral-900 text-xs sm:text-sm">
                        {q.question}
                      </p>

                      <div className="space-y-1.5">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          let btnStyle = 'border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50';

                          if (isSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                            } else if (isOptionSelected) {
                              btnStyle = 'border-red-400 bg-red-50 text-red-800';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'border-[#0A66C2] bg-blue-50 text-[#0A66C2] font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => !isSubmitted && handleSelectOption(q.id, optIdx)}
                              disabled={isSubmitted}
                              className={`w-full text-left p-2.5 rounded-md border text-xs transition-colors ${btnStyle}`}
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
                          onClick={() => handleSubmitQuizQuestion(q.id)}
                          className="px-3 py-1.5 bg-[#0A66C2] text-white rounded font-semibold text-xs hover:bg-[#004182] transition-colors"
                        >
                          Check Answer
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
                            {isCorrect ? '🎯 Spot on!' : '💡 Learning opportunity:'}
                          </div>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Module Completion & Next Step */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => onToggleCompleteCourse(currentModule.id)}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isCompleted
                    ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                    : 'bg-[#0A66C2] text-white hover:bg-[#004182]'
                }`}
              >
                <Check className="w-4 h-4 stroke-3" />
                <span>
                  {isCompleted ? 'Marked as Completed ✓' : 'Mark Lesson as Completed'}
                </span>
              </button>

              {onOpenComposerWithTemplate && (
                <button
                  onClick={onOpenComposerWithTemplate}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Practice with Post Templates</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
