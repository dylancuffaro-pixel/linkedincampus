import { WeeklyPrompt } from '../types';

export const CURRENT_WEEKLY_PROMPT: WeeklyPrompt = {
  id: 'prompt-w42-mistakes',
  weekNumber: 42,
  title: 'The Mistake That Taught Me the Most',
  promptQuestion: 'What is one mistake you made in a class project, student club, or internship—and what did fixing it teach you about your work?',
  description: 'Corporate culture makes people pretend they never fail. But top hiring managers look for candidates who can own an error, diagnose the root cause with intellectual humility, and implement a durable fix.',
  whyThisMatters: 'Demonstrating self-reflection and resilience is the #1 trait that distinguishes high-potential early-career talent from candidates who only share polished vanity highlights.',
  daysRemaining: 4,
  totalSubmissions: 342,
  mentorTip: {
    authorName: 'Rachel Vance',
    authorRole: 'Staff Software Engineer & Campus Mentor',
    authorCompany: 'Stripe (Alumna @ Michigan \'18)',
    avatarUrl: '/src/assets/images/alumni_mentor_avatar_1793928574387.jpg',
    tip: 'When interviewing new grads, I always ask: "Tell me about something you built that completely broke." The candidates who answer with humor, ownership, and a clear breakdown of what they changed always get my strong hire recommendation.',
    exampleOpening: 'In my sophomore operating systems lab, I accidentally committed our private AWS tokens to a public GitHub repo at 2 AM. Here is what happened next, and the automated pre-commit secret scanner I wrote because of it...',
  },
};

export const PAST_WEEKLY_PROMPTS = [
  {
    weekNumber: 41,
    title: 'The Unconventional Hobby',
    question: 'What non-academic hobby or creative interest makes you surprisingly better at your major or technical work?',
    submissions: 512,
  },
  {
    weekNumber: 40,
    title: 'De-Jargoning My First Paper',
    question: 'Explain a technical paper or complex project you worked on using words a 12-year-old would understand.',
    submissions: 428,
  },
  {
    weekNumber: 39,
    title: 'The Best Advice I Received',
    question: 'What is one piece of advice an upperclassman, professor, or mentor gave you that saved you hours of grief?',
    submissions: 680,
  },
];
