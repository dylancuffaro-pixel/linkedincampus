import { PostTemplate } from '../types';

export const POST_TEMPLATES: PostTemplate[] = [
  {
    id: 'tpl-internship-reflection',
    category: 'milestone',
    title: 'Internship / Project Wrap-Up',
    tagline: 'Celebrate real milestones with technical takeaways instead of boilerplate thank-yous.',
    difficulty: 'Beginner',
    scaffoldText: `This week marks the end of my [internship / term project] with [Company or Team Name]!

Going into this, my main goal was to learn how [specific technical or business area] works at scale.

Here are 3 unexpected lessons I took away:
1. [Surprising technical lesson, e.g., how important clean telemetry is before optimizing code]
2. [Team collaboration lesson, e.g., asynchronous design reviews saved us 10+ hours of meetings]
3. [Personal growth lesson, e.g., asking for clarifying feedback on Day 1 is 10x better than assuming]

Huge thank you to [Mentor/Manager Name] and [Teammate Name] for patiently answering my endless questions and reviewing my pull requests.

To fellow students starting internships this term: what’s one habit that helped you ramp up fastest?`,
    placeholderHints: {
      '[internship / term project]': 'e.g., Summer software engineering internship',
      '[Company or Team Name]': 'e.g., the Cloud Storage team at Acme',
      '[Mentor/Manager Name]': 'e.g., Sarah Chen',
    },
    tips: [
      'Focus on what surprised you—surprises are much more engaging to read than routine responsibilities.',
      'Tag your mentor or teammates directly if they helped you; it gives them public kudos.',
      'Always finish with an engaging question for the comments section.',
    ],
    exampleCompletedPost: `This week marks the end of my summer software engineering internship with the Data Infrastructure team at Datadog!

Going into this, my main goal was to understand how high-throughput Kafka streaming pipelines operate under real production spikes.

Here are 3 unexpected lessons I took away:
1. Latency spikes are rarely code bugs—in our case, 80% came from disk I/O bottlenecks and unoptimized partition rebalancing.
2. Writing a clear 1-page Request for Comment (RFC) before writing 500 lines of code saved our team nearly two weeks of refactoring.
3. Don't be afraid to say "I don't know, but let me test it and find out" during standups.

Huge thank you to Jordan Rivera for reviewing my PRs and teaching me how to profile Go services without fear.

To fellow engineers and students: what was your biggest technical "aha" moment during your first industry role?`,
  },
  {
    id: 'tpl-project-breakdown',
    category: 'project',
    title: 'Side Project / Capstone Launch',
    tagline: 'Showcase what you built, the hardest bug you crushed, and why it matters.',
    difficulty: 'Intermediate',
    scaffoldText: `Over the past [duration, e.g. 3 weeks], I built [Project Name]—[1-sentence explanation of what it does].

The reason I built this: [Explain the real problem or frustration you experienced].

Tech Stack:
• [Frontend, e.g., React 19 + Tailwind CSS]
• [Backend / DB, e.g., Node.js + PostgreSQL]
• [Specialized tool, e.g., Gemini API for semantic parsing]

The hardest obstacle:
[Describe 1 tricky bug or architectural decision you wrestled with and how you solved it].

If I were to rebuild this from scratch, I would [what you learned or would change].

GitHub repo / Live demo link is in the first comment! I’d love your constructive feedback—what feature would you add next?`,
    placeholderHints: {
      '[duration, e.g. 3 weeks]': 'e.g., 2 weekends',
      '[Project Name]': 'e.g., CampusQueue',
      '[1-sentence explanation of what it does]': 'e.g., a real-time dining hall wait-time estimator for students',
    },
    tips: [
      'Put links in the comments, as the LinkedIn algorithm often deprioritizes posts with external outbound links in the body.',
      'Highlighting what you would change shows humility and continuous learning.',
    ],
    exampleCompletedPost: `Over the past 2 weekends, I built CampusQueue—a lightweight web app that estimates dining hall lines across campus using crowd-sourced check-ins.

The reason I built this: Waiting 35 minutes for lunch between 50-minute lectures was causing students to skip meals or arrive late.

Tech Stack:
• Frontend: Vite + React + Tailwind CSS
• Backend: Express + SQLite with WebSockets for instant queue updates
• Hosting: Cloud Run

The hardest obstacle:
Preventing duplicate spam check-ins without requiring an intimidating student ID login. I implemented an anonymous time-window hash using local storage and geolocation proximity.

If I were to rebuild this from scratch, I’d switch to server-sent events (SSE) instead of full WebSockets to reduce battery drain on student phones.

Code is open-source (link in comments). What's a campus problem you wish had a simple digital fix?`,
  },
  {
    id: 'tpl-learning-in-public',
    category: 'reflection',
    title: 'Learning in Public / Skill Journey',
    tagline: 'Document a new tool or framework you are mastering and share resources with peers.',
    difficulty: 'Beginner',
    scaffoldText: `I recently decided to teach myself [Skill / Tool / Concept, e.g., Docker & Containerization].

Before starting, it felt like an intimidating wall of confusing jargon ([e.g., daemon, images vs containers, port binding]).

Here is what finally made it click for me:
[Share 1 helpful mental model or analogy that helped you understand it].

If anyone else is currently learning [Skill], here are the 2 resources that helped me most:
1. [Resource 1, e.g., a specific YouTube tutorial, interactive sandbox, or documentation page]
2. [Resource 2, e.g., building a tiny 1-container static site first]

What concept in tech took you the longest to finally "click"?`,
    placeholderHints: {
      '[Skill / Tool / Concept]': 'e.g., SQL Window Functions',
      '[Mental model]': 'e.g., Thinking of a container as a portable bento box with all ingredients bundled',
    },
    tips: [
      'Explaining complex concepts using everyday analogies proves deep understanding.',
      'Students love posts that curate resources because they save other learners time.',
    ],
    exampleCompletedPost: `I recently decided to teach myself Docker & Containerization.

Before starting, it felt like an intimidating wall of confusing jargon—daemons, layers, bridge networks, and image registries.

Here is the mental model that finally made it click:
A container isn't a miniature operating system; it's just a regular process wearing a blindfold. It only sees the filesystem and ports you hand to it in its Dockerfile "bento box."

If anyone else is currently tackling this, these 2 resources were pure gold:
1. "Docker for Beginners" by Nana on YouTube (visualizing container lifecycles).
2. Building a 1-page HTML app container and running it locally before touching multi-stage builds.

What concept in software engineering took you the longest to finally "click"?`,
  },
  {
    id: 'tpl-coffee-chat-takeaway',
    category: 'outreach',
    title: 'Networking & Coffee Chat Takeaway',
    tagline: 'Turn 1 conversation with an alumni into an insightful post that honors their time.',
    difficulty: 'Beginner',
    scaffoldText: `Had an insightful 20-minute coffee chat this morning with [Mentor Name or "a Senior Engineer in Fintech"].

I asked them: "What separates an average junior hire from someone who accelerates their first year?"

Their answer surprised me:
"[Insert 1-2 sentence quote or summary of their advice, e.g. It’s not how fast you write code, but how clearly you communicate when you are blocked]."

Here is how I’m applying this advice today:
[1 concrete step you took or are taking, e.g. creating a weekly recap document for my lab project].

Gratitude to mentors who take 15 minutes out of their day to guide students transitioning to industry.

What was the single best piece of career advice you received before your first full-time role?`,
    placeholderHints: {
      '[Mentor Name]': 'e.g., an alumnus at Microsoft',
      '[Insert 1-2 sentence quote]': 'e.g., The best engineers write docs that make them replaceable so they can get promoted.',
    },
    tips: [
      'Always ask the mentor for permission before tagging them by name.',
      'Focusing on how you applied their advice shows you don’t just listen—you execute.',
    ],
    exampleCompletedPost: `Had an insightful 20-minute coffee chat this morning with a Senior Product Manager at Spotify (and fellow alumni!).

I asked them: "What separates an average junior candidate from someone who stands out immediately?"

Their answer surprised me:
"Most candidates recite their resume accomplishments. The memorable ones can explain why a project failed and what they would do if given a second chance with double the budget."

Here is how I’m applying this advice today:
I’m rewriting my portfolio case studies to include a "What Broke & What I’d Change" section for every single project.

Huge gratitude to alumni who dedicate time to demystify early careers for students.

What was the single best piece of career advice you received when you were just starting out?`,
  },
  {
    id: 'tpl-conference-insight',
    category: 'conference',
    title: 'Event / Hackathon / Conference Reflection',
    tagline: 'Share key speaker insights, industry shifts, or student networking highlights.',
    difficulty: 'Intermediate',
    scaffoldText: `Spent the weekend at [Conference or Hackathon Name, e.g., Grace Hopper / HackMIT]!

Beyond meeting incredible fellow students, here are 2 key industry shifts that stood out to me from the technical panels:

1. [Key trend or shift, e.g. How observability is shifting from reactive log alerts to predictive agent traces]
2. [Career advice takeaway, e.g. Why T-shaped generalists who understand product context are thriving in early-stage startups]

Favorite moment: [Share 1 human highlight, e.g. pairing with 3 students from different countries to debug our demo at 2 AM].

If you were at [Conference Name], what was your biggest takeaway from this year?`,
    placeholderHints: {
      '[Conference or Hackathon Name]': 'e.g., NSBE Annual Convention 2026',
    },
    tips: [
      'Skip the cliché photo with the sponsor booth unless accompanied by real intellectual takeaways.',
      'Tag the conference organizers and speakers whose sessions you attended.',
    ],
    exampleCompletedPost: `Spent the weekend at the Midwest Tech Conference!

Beyond meeting dozens of passionate students and alumni, here are 2 technical shifts that stood out from the infrastructure sessions:

1. Small language models running on device edge are outperforming cloud models for local data privacy and zero-latency UX.
2. Code reviews are increasingly focusing on system architecture and test coverage rather than syntax nitpicks.

Favorite moment: A spontaneous 45-minute whiteboard session with 4 other students sketching an open-source peer tutoring app.

If you attended the conference, what was your favorite talk or speaker?`,
  },
];
