import { CourseModule } from '../types';

export const CRASH_COURSE_MODULES: CourseModule[] = [
  {
    id: 'module-profile',
    title: 'Anatomy of an Authentic Student Profile',
    duration: '4 min',
    summary: 'Turn your profile from a dry list of coursework into an authentic signal of curiosity and grit without fake titles like "Aspiring CEO".',
    iconName: 'UserCheck',
    keyTakeaways: [
      'Your headline is your search query: include what you build, languages/tools you use, and what problems you care about.',
      'Write your "About" section in first person ("I build...", not "Dylan is a results-driven professional...").',
      'Feature real projects with screenshots, GitHub links, or slide decks rather than just listing class names.',
    ],
    dosAndDonts: [
      {
        do: 'Computer Science @ Michigan | Researching distributed systems | Built an open-source query profiler (C++ / Rust)',
        dont: 'Aspiring Software Architect | Synergistic Innovator | Disrupting the tech sphere',
      },
      {
        do: 'Tell the story of how you solved a challenging bug or organized a hackathon in your About summary.',
        dont: 'Copy-paste a laundry list of 30 buzzwords and soft skills with zero context.',
      },
      {
        do: 'Ask a former professor or internship buddy for a 2-sentence recommendation highlighting your dependability.',
        dont: 'Beg random connections for endorsements on skills you have never demonstrated.',
      },
    ],
    interactiveExercise: {
      title: 'Headline Makeover Studio',
      description: 'See the difference between robotic corporate posturing and authentic student credibility:',
      templatesOrExamples: [
        {
          label: 'CS / Engineering Major',
          before: 'Passionate and driven student actively seeking ambitious summer internships with industry giants.',
          after: 'ECE @ Georgia Tech · Building low-power IoT sensors · Exploring embedded firmware & C++',
          why: 'Gives recruiters immediate keywords (school, domain, tools) instead of generic fluff words.',
        },
        {
          label: 'Business / Finance Major',
          before: 'Dynamic business undergraduate with a penchant for high-growth financial markets and cross-functional synergy.',
          after: 'Finance & Econ @ UT Austin | President, Student Investment Club | Valuing renewable energy infrastructure',
          why: 'Proves initiative with concrete leadership and a specific domain of interest.',
        },
        {
          label: 'Design / Product Major',
          before: 'Visionary product leader focused on human-centric digital transformation paradigms.',
          after: 'Design & Informatics @ UW | Re-designing campus bus schedules | Prototyping in Figma & React',
          why: 'Demonstrates what you actually designed instead of claiming visionary status as a student.',
        },
      ],
    },
    quiz: [
      {
        id: 'q1-1',
        question: 'Which of the following makes the strongest LinkedIn headline for a college sophomore?',
        options: [
          'Passionate self-starter looking to leverage cross-functional capabilities.',
          'Mechanical Engineering @ Purdue · Formula SAE Suspension Lead · CAD & FEA modeling.',
          'Future Fortune 500 Executive & Strategic Thought Leader.',
          'Student at Purdue University.',
        ],
        correctIndex: 1,
        explanation: 'Concrete roles, teams (Formula SAE), and hard skills (CAD, FEA) give instant proof of work without empty buzzwords.',
      },
      {
        id: 'q1-2',
        question: 'How should a student write their "About" summary?',
        options: [
          'In third person to sound like a distinguished executive biography.',
          'As a giant bulleted list of 25 soft skills like "problem solver" and "team player".',
          'In first person, telling the story of why they chose their field and what they love building.',
          'Leave it completely blank until graduating.',
        ],
        correctIndex: 2,
        explanation: 'Writing in first person makes you approachable, genuine, and memorable to recruiters and peers alike.',
      },
    ],
  },
  {
    id: 'module-outreach',
    title: 'Cold Outreach Without the Awkwardness',
    duration: '5 min',
    summary: 'Master the 3-sentence connection note that alumni and hiring managers actually accept and reply to.',
    iconName: 'Send',
    keyTakeaways: [
      'Never send a blank connection request to someone you do not know.',
      'The 3-Sentence Rule: 1) The shared connection, 2) The specific question/work of theirs you admire, 3) The low-pressure ask.',
      'Never ask for a job or referral in the first message—ask for 15 minutes of perspective.',
    ],
    dosAndDonts: [
      {
        do: 'Hi Sarah, loved your recent post on distributed cache failures at Figma. As a junior at CMU exploring DB systems, could I ask one quick question about your team transition?',
        dont: 'Dear Hiring Manager, please review my resume for all open new grad engineering roles.',
      },
      {
        do: 'Follow up politely once after 7 days if they have not replied; if still silent, move on graciously.',
        dont: 'Message their personal cell, send 5 reminder pings, or complain on their public feed.',
      },
      {
        do: 'Keep your ask under 15 minutes and offer to send questions asynchronously via message.',
        dont: 'Demand a 45-minute Zoom call on their calendar for general "mentorship".',
      },
    ],
    interactiveExercise: {
      title: 'The 3-Sentence Connection Formula',
      description: 'Plug-and-play frameworks tailored for student outreach:',
      templatesOrExamples: [
        {
          label: 'Reaching out to a University Alumni',
          before: 'Hey! I see you work at Google. Can you give me a referral for the APM role?',
          after: 'Hi Marcus, saw you graduated from Michigan CS in 2021—I’m currently a junior in EECS! Really inspired by your shift from engineering to PM at Google. Would you be open to sharing one piece of advice you wish you knew as a junior?',
          why: 'Alumni love helping their alma mater students when the ask is genuine and honors their trajectory.',
        },
        {
          label: 'Connecting after a Conference or Webinar',
          before: 'Great talk yesterday. Let’s connect!',
          after: 'Hi Elena, really enjoyed your keynote at IEEE Southeast yesterday, especially your point on edge compute tradeoffs. Would love to stay connected as I prepare my senior capstone project.',
          why: 'References specific substance from their talk, proving you paid genuine attention.',
        },
      ],
    },
    quiz: [
      {
        id: 'q2-1',
        question: 'What is the biggest mistake students make when sending a connection request to an engineer or recruiter?',
        options: [
          'Including their university graduation date.',
          'Immediately asking for a job referral or interview before building any rapport.',
          'Keeping the message under 300 characters.',
          'Mentioning a shared interest or alma mater.',
        ],
        correctIndex: 1,
        explanation: 'Referrals are earned through trust or conversation. Asking immediately feels transactional and almost always gets ignored.',
      },
    ],
  },
  {
    id: 'module-storytelling',
    title: 'Authentic Storytelling vs. Corporate Posturing',
    duration: '5 min',
    summary: 'Why sharing an unexpected bug, a failed first attempt, or a raw learning lesson drives 10x more genuine engagement than humble-bragging.',
    iconName: 'Feather',
    keyTakeaways: [
      'Audiences are tired of "I am humbled and thrilled to announce..." boilerplate.',
      'The Narrative Arc: 1) The Hook, 2) The Obstacle, 3) The Solution / Pivot, 4) The Community Takeaway.',
      'Be vulnerable about what did NOT work—it shows engineering maturity and self-awareness.',
    ],
    dosAndDonts: [
      {
        do: 'I spent 6 hours debugging a race condition yesterday, only to realize I was mutating state directly inside a loop. Here is what I learned about immutability...',
        dont: 'So humbled and honored to be recognized as the ultimate innovator in my university hackathon cohort.',
      },
      {
        do: 'Tag teammates, mentors, or professors who directly assisted you and credit their guidance.',
        dont: 'Tag 40 influential people who have no idea who you are in hopes of gaming the algorithm.',
      },
      {
        do: 'Use double line breaks between sentences so mobile readers do not get hit by an unreadable text block.',
        dont: 'Post a 15-paragraph unbroken essay with 45 hashtags at the bottom.',
      },
    ],
    interactiveExercise: {
      title: 'Humble-Brag to Real Story Transformation',
      description: 'Watch how stripping corporate clichés makes your work shine:',
      templatesOrExamples: [
        {
          label: 'Hackathon Project Announcement',
          before: 'I am beyond thrilled, blessed, and humbled to share that my team achieved first place at PennApps. Huge thanks to all sponsors for enabling our synergy.',
          after: '36 hours, 4 red bulls, and 1 database crash later... we built CarePulse at PennApps!\n\nThe hardest part wasn’t the code—it was deciding what features to ruthlessly cut at 3 AM so we had a working demo.\n\nCode is open-source below. What’s your #1 rule for hackathons?',
          why: 'Tells a memorable story, highlights real decision-making, and engages the audience with a question.',
        },
      ],
    },
    quiz: [
      {
        id: 'q3-1',
        question: 'Why does sharing an obstacle or failure often perform better than a simple victory announcement?',
        options: [
          'Because people love seeing students fail.',
          'Because it demonstrates critical problem-solving, resilience, and teaches the reader something useful.',
          'Because the LinkedIn algorithm penalizes successful project announcements.',
          'It doesn’t; you should never talk about mistakes on LinkedIn.',
        ],
        correctIndex: 1,
        explanation: 'Engineers, managers, and mentors value how you handle roadblocks far more than perfection.',
      },
    ],
  },
  {
    id: 'module-commenting',
    title: 'Commenting as Networking (The Stealth Superpower)',
    duration: '3 min',
    summary: 'How thoughtful 2-sentence comments on senior engineers’ posts build a network faster than publishing from scratch.',
    iconName: 'MessageSquare',
    keyTakeaways: [
      'You do not have to write viral posts every week. High-quality comments get seen by everyone in that author’s network.',
      'Avoid 1-word generic praise like "Great post!", "Interested", or "CFBR" (Commenting for better reach).',
      'The Golden Comment Formula: Acknowledge the core point + add your personal experience or ask a clarifying question.',
    ],
    dosAndDonts: [
      {
        do: 'Add a nuanced reflection: "This tradeoff between latency and memory hits home—when we benchmarked our student project, Redis cut our P99 by 40% but doubled container memory."',
        dont: 'Comment "CFBR" or "Insightful post, check out my profile!"',
      },
      {
        do: 'Bookmark 5-10 leaders or alumni in your dream field and thoughtfully contribute to their discussions once a week.',
        dont: 'Spam 50 comments in 10 minutes using automated bots or copy-pasted templates.',
      },
    ],
    interactiveExercise: {
      title: 'Comment Upgrade Examples',
      description: 'How to turn a dead comment into an organic profile visit magnet:',
      templatesOrExamples: [
        {
          label: 'Reacting to a Senior Engineer’s Tech Post',
          before: 'Great post, thank you for sharing!',
          after: 'Great breakdown of PostgreSQL vs MongoDB for high-write feeds. When you made the switch, did you have to rethink your cache invalidation strategy, or did Redis handle the brunt of it?',
          why: 'Shows deep technical curiosity and invites the author to engage in a technical conversation with you.',
        },
      ],
    },
    quiz: [
      {
        id: 'q4-1',
        question: 'What is the most effective comment strategy for an early-career student?',
        options: [
          'Type "CFBR" on 100 posts a day.',
          'Disagree aggressively with everyone to get attention.',
          'Write a thoughtful 2-sentence comment that adds a student perspective or asks a genuine technical question.',
          'Copy and paste your resume link under popular recruiter posts.',
        ],
        correctIndex: 2,
        explanation: 'Thoughtful comments signal intellectual curiosity and often lead to the post author visiting your profile and sending a connection request.',
      },
    ],
  },
];
