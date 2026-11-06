# LinkedIn Campus: Professional Training Wheels

A transition platform embedded into the LinkedIn interface that equips college students and early-career jobseekers with interactive training wheels—including a bite-sized crash course, scaffolding post templates with real-time AI tone coaching and corporate de-jargonizing, and a low-stakes weekly community prompt sandbox.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and user experience decisions have been aligned based on your preferences:

- **Confirmed Interface Experience**: LinkedIn Campus is designed as an authentic LinkedIn web client with an ambient "Campus Training Wheels" toggle in the top header. When active, it unlocks contextual guided tooltips, the Training Wheels dock, and the Campus Sandbox alongside the familiar feed.
- **Confirmed AI Drafting Assistance**: An interactive Post Builder equipped with a real-time AI Tone Coach and Corporate De-Jargonizer (powered by Gemini). It evaluates draft posts for corporate authenticity, confidence, and clarity, while translating intimidating corporate jargon (e.g., "synergy", "bandwidth", "circle back", "touch base") into authentic early-career storytelling.
- **Confirmed Weekly Community Format**: A low-stakes peer sandbox feed where students across universities respond to a shared weekly prompt (e.g., *"What is one mistake you made in your first internship or project, and what did it teach you?"*), featuring supportive kudos badges, mentor advice bookmarks, and direct one-click publishing to real LinkedIn when ready.

---

## 1. Overview & Core Concept

### What It Does
LinkedIn Campus reduces the intimidation gap of corporate networking. It wraps LinkedIn's core feed, profile, and messaging workflows in an encouraging, psychologically safe learning layer. Users can:
1. **Complete the LinkedIn Crash Course**: 4 interactive micro-modules breaking down profile anatomy, outreach etiquette, connection requests, and storytelling without corporate posturing.
2. **Build Posts via Scaffolding Templates**: Pre-structured frameworks for internship announcements, project spotlights, learning reflections, and career pivots.
3. **Analyze Tone & Demystify Jargon**: A real-time coach highlights buzzwords, offers conversational alternatives, and calculates an "Authenticity & Clarity" score before publishing.
4. **Participate in the Weekly Prompt Sandbox**: A supportive peer arena to practice writing in public with encouraging peer kudos (e.g., "Super Relatable", "Great Takeaway", "Inspiring Vulnerability") before hitting the live global feed.

### Target Audience & Persona
- **College Students & Recent Graduates**: Intimidated by performative "humbled and honored" LinkedIn posts; unsure what they have of value to share.
- **Career Changers & First-Time Interns**: Seeking concrete scripts for reaching out to alumni and recruiters without feeling awkward.

### Key Value
Replaces performative anxiety with structured practice, building authentic professional communication habits in a low-risk environment.

---

## 2. User Experience & Visual Design

### Key User Flows

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│  [in] Search  [Home] [Crash Course] [Templates] [Weekly Prompt] [Me]  │
│                   [ 🎓 Campus Mode: ACTIVE (Switch) ]                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼───────────────────────────┐
       ▼                            ▼                           ▼
┌──────────────┐         ┌──────────────────────┐    ┌──────────────────┐
│ Left Rail    │         │ Main Workspace       │    │ Right Rail       │
│ • Student    │         │ • Weekly Prompt Card │    │ • AI Coach Deck  │
│   Profile    │         │ • Post Composer /    │    │ • Corporate      │
│ • Training   │         │   Template Studio    │    │   Buzzword Dict  │
│   Wheel      │         │ • Sandbox Peer Feed  │    │ • Peer Kudos &   │
│   Progress   │         │   (Low-Stakes)       │    │   Alumni Tips    │
└──────────────┘         └──────────────────────┘    └──────────────────┘
```

1. **Orientation & Crash Course Modal / View**:
   - Bite-sized interactive cards covering:
     - *Module 1: The Anatomy of a High-Impact Student Profile* (Headline formulas without fake titles).
     - *Module 2: Cold Outreach without the Cringe* (3-sentence connection request templates with 85%+ accept rates).
     - *Module 3: Authentic Storytelling vs. Posturing* (Why sharing failures and learnings outperforms humble-bragging).
     - *Module 4: Commenting as Networking* (How thoughtful comments get recruiters visiting your profile).
   - Interactive quizzes with instant feedback and progress badges.

2. **Template Studio & AI Tone / De-Jargonizer Composer**:
   - Template selection tabs: *Internship / Job Milestone*, *Project Build Breakdown*, *Book / Podcast Takeaway*, *Asking for Advice / Coffee Chat Reflection*.
   - Live side-by-side composer: Text editor with variable placeholders (e.g. `[What I built]`, `[The hardest roadblock]`, `[Key takeaway]`).
   - Real-time Tone & Jargon inspection:
     - **De-Jargonizer**: Flags clichés ("excited to announce", "deep dive", "leverage", "move the needle") with 1-click humanizing rewrites.
     - **Clarity & Hook Meter**: Assesses opening line readability, line-break formatting, and call-to-action strength.
     - **Copy or Post Direct**: One-click copy formatted text or share to Sandbox / LinkedIn.

3. **Weekly Prompt Sandbox Feed**:
   - Current Week's Topic banner (e.g., *"Week 42: What is an unconventional skill or hobby that makes you better at your work?"*).
   - Peer answers from verified student profiles (Stanford, Georgia Tech, UT Austin, Howard, etc.).
   - Low-stakes reaction bar: "Relatable", "Thought-Provoking", "Cheering for You", "Clear Takeaway" (replacing vanity metrics with constructive encouragement).
   - "Alumni Spotlight": Shows how a senior product manager or engineer would tackle this prompt with commentary.

### Visual Identity & Theme
- **Aesthetic Direction**: High-trust LinkedIn enterprise design language blended with a refreshing, modern educational touch (clean borders, generous whitespace, friendly feedback indicators).
- **Color Palette**:
  - Primary Canvas: `#F3F2F0` (Authentic LinkedIn off-white background) and `#FFFFFF` (Surface cards).
  - Brand Accent: `#0A66C2` (LinkedIn Core Blue) and `#004182` (Deep Navy).
  - Campus Warmth Accent: `#057642` (Encouragement Green) and `#915907` (Warm Gold for badges & tips).
  - Text: `#191919` (High-contrast charcoal), `#56687A` (Muted secondary metadata).
  - Hairline Borders: `#E0DFDC` / `rgba(0,0,0,0.08)`.
- **Typography**:
  - Headings & Wordmark: `Plus Jakarta Sans` (Display SemiBold / Bold).
  - Body & Form Controls: `Public Sans` / `system-ui` for readable prose.
  - Metrics & Counts: `tabular-nums` for reading times, word counts, and streak tracking.
- **Micro-Interactions**:
  - Smooth tab switching with `motion` transitions.
  - Highlight ripple on jargon terms with popover explanations.
  - Confidence progress bar animated on keystroke debounced review.

---

## 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Rationale | Alternatives Considered |
| :--- | :--- | :--- | :--- |
| **Experience Framing** | Embedded "LinkedIn Campus" mode with live toggle switch | Provides familiarity with the actual LinkedIn UI while immediately lowering anxiety via training wheels. | Standalone disconnected website (loses the authentic context of LinkedIn). |
| **AI Tone Assistance** | Server-side Gemini 3.8 Flash analysis via Express API | Offers deep semantic nuance (identifies buzzwords, evaluates tone sincerity, generates customized rewrites) while protecting API keys server-side. | Client-side regex rules (too rigid, misses context of natural student speech). |
| **Sandbox Mechanics** | Low-stakes Peer Sandbox with encouraging Kudos | Shields students from public employer scrutiny while building publishing confidence in front of peers. | Direct live publishing only (too intimidating, discourages beginners). |
| **Data Persistence** | Reactive client-side storage (`localStorage`) initialized with rich student cohort seed data | Instant zero-latency responses, works offline, allows user to edit and save drafts and sandbox posts without auth barrier. | Heavy backend database requirement for preview testing. |

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                             Client (React 19)                         │
│                                                                        │
│  ┌──────────────────────┐  ┌────────────────────┐  ┌────────────────┐  │
│  │     TopBar & Nav     │  │ CrashCourseModal   │  │ WeeklyPrompt   │  │
│  │ (Campus Mode Toggle) │  │  (4 Modules + Q&A) │  │  Banner Card   │  │
│  └──────────┬───────────┘  └─────────┬──────────┘  └────────┬───────┘  │
│             │                        │                      │          │
│  ┌──────────▼────────────────────────▼──────────────────────▼───────┐  │
│  │                 PostStudio / Composer Component                  │  │
│  │   • Template Selector  • Live Drafting Area  • Jargon Decoder    │  │
│  └───────────────────────────────────┬──────────────────────────────┘  │
│                                      │                                 │
│  ┌───────────────────────────────────▼──────────────────────────────┐  │
│  │                 SandboxFeed & Peer Kudos System                  │  │
│  │   • Filter by Campus  • Supportive Reactions  • Alumni Examples  │  │
│  └───────────────────────────────────┬──────────────────────────────┘  │
└──────────────────────────────────────┼─────────────────────────────────┘
                                       │ HTTP POST /api/tone-coach
                                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Express Backend (server.ts)                     │
│  • Rate limiting & validation                                          │
│  • @google/genai SDK with gemini-3.8-flash                             │
│  • Structured JSON schema for tone, jargon hits, and humanized fixes   │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Models

```typescript
interface PostTemplate {
  id: string;
  category: 'milestone' | 'project' | 'reflection' | 'outreach';
  title: string;
  description: string;
  scaffoldText: string;
  tips: string[];
  exampleCompletedPost: string;
}

interface JargonAnalysisResult {
  score: number; // 0 - 100 authenticity score
  summary: string;
  jargonHits: Array<{
    term: string;
    reason: string;
    replacement: string;
  }>;
  toneAssessment: 'Too Formal / Posturing' | 'Authentic & Engaging' | 'Too Casual';
  polishedSuggestions: string[];
}

interface SandboxPost {
  id: string;
  author: {
    name: string;
    university: string;
    major: string;
    gradYear: string;
    avatar: string;
  };
  content: string;
  promptTopicId: string;
  timestamp: string;
  kudos: {
    relatable: number;
    insightful: number;
    inspiring: number;
    clear: number;
  };
  userKudos?: string[];
  commentsCount: number;
}
```

### Implementation Steps

1. **Backend Server Setup (`server.ts`)**:
   - Configure Express server with proxy support for Vite.
   - Implement `POST /api/tone-coach` using `@google/genai` (`gemini-3.8-flash`) with structured JSON schema returning jargon detection, clarity score, and constructive rewrites.
2. **Crash Course Interactive Modules**:
   - 4 digestible interactive lessons with actionable dos & don'ts, real before-and-after profile headlines, cold connection request scripts, and knowledge checks.
3. **Template Studio & AI De-Jargonizer**:
   - Template library covering essential early-career scenarios.
   - Interactive variable injector, live character counter, and instant AI Coach feedback pane.
4. **Weekly Prompt Challenge & Peer Sandbox**:
   - Weekly prompt card with timer countdown, prompt guidance, and prompt response composer.
   - Interactive peer feed with kudos reactions, filtered by university and industry track.
5. **Full Integration & Responsive Refinement**:
   - Authentic LinkedIn chrome (search bar, profile summary card, trending campus topics, news rail).
   - Campus Mode toggle with onboarding guide tooltips.
