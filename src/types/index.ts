export type KudosType = 'relatable' | 'insightful' | 'inspiring' | 'clear';

export interface JargonHit {
  term: string;
  reason: string;
  replacement: string;
}

export interface ToneCoachResponse {
  score: number;
  toneAssessment: string;
  summary: string;
  jargonHits: JargonHit[];
  strengths: string[];
  suggestions: string[];
  polishedVersion: string;
}

export interface PostTemplate {
  id: string;
  category: 'milestone' | 'project' | 'reflection' | 'outreach' | 'conference';
  title: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate';
  scaffoldText: string;
  placeholderHints: Record<string, string>;
  tips: string[];
  exampleCompletedPost: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  summary: string;
  iconName: string;
  keyTakeaways: string[];
  dosAndDonts: {
    do: string;
    dont: string;
  }[];
  interactiveExercise: {
    title: string;
    description: string;
    templatesOrExamples: {
      label: string;
      before: string;
      after: string;
      why: string;
    }[];
  };
  quiz: QuizQuestion[];
}

export interface WeeklyPrompt {
  id: string;
  weekNumber: number;
  title: string;
  promptQuestion: string;
  description: string;
  whyThisMatters: string;
  daysRemaining: number;
  totalSubmissions: number;
  mentorTip: {
    authorName: string;
    authorRole: string;
    authorCompany: string;
    avatarUrl: string;
    tip: string;
    exampleOpening: string;
  };
}

export interface SandboxPost {
  id: string;
  author: {
    name: string;
    university: string;
    major: string;
    gradYear: string;
    avatarUrl: string;
    headline: string;
  };
  content: string;
  promptTopicId?: string;
  promptTopicTitle?: string;
  timestamp: string;
  kudos: {
    relatable: number;
    insightful: number;
    inspiring: number;
    clear: number;
  };
  userKudos?: KudosType[];
  commentsCount: number;
  comments?: Array<{
    id: string;
    authorName: string;
    authorSchool: string;
    text: string;
    timestamp: string;
  }>;
  isCurrentUser?: boolean;
}
