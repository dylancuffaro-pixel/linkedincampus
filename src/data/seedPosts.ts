import { SandboxPost } from '../types';

export const CURRENT_USER = {
  name: 'Ananya Roy',
  university: 'University of Michigan',
  major: 'Computer Science & HCI',
  gradYear: 'Class of 2027',
  headline: 'Junior @ Michigan | Building accessible web tools | Researching human-AI collaboration',
  avatarUrl: '/src/assets/images/student_user_avatar_1793928573066.jpg',
  trainingWheelsLevel: 'Level 2: Confident Communicator',
  completedModulesCount: 2,
  promptStreak: 3,
};

export const INITIAL_SANDBOX_POSTS: SandboxPost[] = [
  {
    id: 'post-maya-1',
    author: {
      name: 'Maya Chen',
      university: 'UC Berkeley',
      major: 'Electrical Engineering & Computer Sciences',
      gradYear: 'Class of 2026',
      avatarUrl: '/src/assets/images/peer_student_avatar_1793928574174.jpg',
      headline: 'Senior @ Berkeley · President, Women in CS · Incoming Systems Intern',
    },
    promptTopicId: 'prompt-w42-mistakes',
    promptTopicTitle: 'The Mistake That Taught Me the Most',
    timestamp: '2 hours ago',
    content: `My biggest mistake as a sophomore project lead: I assumed everyone on my 4-person robotics team understood the ROS architecture just because nobody asked questions during our first planning meeting.

Two weeks in, we realized our motor controllers were sending contradictory signals over the CAN bus because two teammates had interpreted the coordinate frame completely backwards.

What this taught me:
Silence in meetings doesn't mean consensus—it almost always means people are feeling shy or intimidated.

Now, instead of asking "Any questions?", I ask:
"Can someone volunteer to walk through how the telemetry packet travels from sensor to dashboard in their own words?"

It eliminated 90% of our downstream integration bugs this semester.

Fellow students: how do you make sure your project groups are truly aligned before writing code?`,
    kudos: {
      relatable: 38,
      insightful: 42,
      inspiring: 19,
      clear: 27,
    },
    userKudos: ['insightful', 'relatable'],
    commentsCount: 6,
    comments: [
      {
        id: 'c1',
        authorName: 'Marcus Washington',
        authorSchool: 'Howard University \'26',
        text: 'The "Any questions?" trap is so real. I started doing quick 2-minute whiteboard recap sketches at the start of lab meetings and it helped our team immensely.',
        timestamp: '1 hour ago',
      },
      {
        id: 'c2',
        authorName: 'Rachel Vance',
        authorSchool: 'Staff SWE @ Stripe (Mentor)',
        text: 'Even senior engineers at tech companies fall into this exact trap. Asking for someone to recap the data flow is a textbook leadership habit. Fantastic takeaway Maya!',
        timestamp: '45 mins ago',
      },
    ],
  },
  {
    id: 'post-liam-2',
    author: {
      name: 'Liam Gallagher',
      university: 'Georgia Tech',
      major: 'Industrial & Systems Engineering',
      gradYear: 'Class of 2027',
      avatarUrl: '', // Will use elegant SVG fallback
      headline: 'Sophomore @ Georgia Tech · Supply Chain Analytics · Data Fellow',
    },
    promptTopicId: 'prompt-w42-mistakes',
    promptTopicTitle: 'The Mistake That Taught Me the Most',
    timestamp: '4 hours ago',
    content: `In my first analytics case competition last semester, our team spent 35 hours training a gradient boosting model with 94% validation accuracy on historical shipping delays.

During the final presentation, the lead judge asked:
"Why did you spend 35 hours optimizing a complex model when 80% of shipment delays in your dataset were caused by a known port strike in week 3?"

We had missed the simple domain story because we were too excited to play with XGBoost.

Lesson learned:
Always inspect your raw data and ask "What real-world event created this row?" before jumping straight to machine learning models.

What was your biggest lesson from your first technical competition or hackathon?`,
    kudos: {
      relatable: 54,
      insightful: 31,
      inspiring: 14,
      clear: 33,
    },
    commentsCount: 4,
    comments: [
      {
        id: 'c3',
        authorName: 'Priya Sharma',
        authorSchool: 'UT Austin \'26',
        text: 'This hurts because I did the exact same thing with an NLP sentiment model on product reviews! Domain context > raw hyperparameters every single time.',
        timestamp: '2 hours ago',
      },
    ],
  },
  {
    id: 'post-sam-3',
    author: {
      name: 'Samira Patel',
      university: 'Stanford University',
      major: 'Product Design & Symbolic Systems',
      gradYear: 'Class of 2028',
      avatarUrl: '', // fallback avatar
      headline: 'First-Year @ Stanford · Prototyping civic tech & student wellness tools',
    },
    promptTopicId: 'prompt-w42-mistakes',
    promptTopicTitle: 'The Mistake That Taught Me the Most',
    timestamp: 'Yesterday',
    content: `As a freshman, I was terrified to reach out to alumni. I thought every message needed to be a 4-paragraph formal essay showcasing my GPA and clubs.

Unsurprisingly, my reply rate was about 10%.

Then an upperclassman in my dorm shared their secret:
Keep it to 3 sentences. Be specific about ONE thing they worked on. Never ask for a job—ask for one piece of perspective.

I sent this to an alumnus working in municipal civic tech:
"Hi David, loved your work on digital transit ticketing in Seattle. As a freshman designing a campus shuttle tracker, could I ask one quick question about how you handled route delays?"

They replied in 20 minutes and offered a 15-minute phone call that completely changed our database schema.

Don't let intimidation keep you from asking curious questions!`,
    kudos: {
      relatable: 82,
      insightful: 49,
      inspiring: 65,
      clear: 58,
    },
    commentsCount: 8,
  },
];
