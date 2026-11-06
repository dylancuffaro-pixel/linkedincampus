export interface JargonEntry {
  term: string;
  corporateContext: string;
  translation: string;
  studentTranslation: string;
  exampleInTheWild: string;
  recommendedAlternative: string;
  level: 'Common' | 'Overused' | 'Avoid';
}

export const CORPORATE_DICTIONARY: JargonEntry[] = [
  {
    term: 'Bandwidth',
    corporateContext: 'Used by managers and teammates to describe human availability.',
    translation: 'Available time, energy, or mental capacity.',
    studentTranslation: '"I have two exams and a problem set due tomorrow; I physically cannot take this on."',
    exampleInTheWild: '"I’d love to support your initiative, but I simply don’t have the bandwidth this sprint."',
    recommendedAlternative: '"I don\'t have the capacity this week, but I can review on Monday."',
    level: 'Common',
  },
  {
    term: 'Circle Back',
    corporateContext: 'Used when someone wants to delay a topic or revisit a discussion later.',
    translation: 'Postpone discussing this until a later date.',
    studentTranslation: '"Let’s not talk about this right now."',
    exampleInTheWild: '"Good thought on the data schema, let’s circle back on that during tomorrow’s standup."',
    recommendedAlternative: '"Let\'s discuss that tomorrow once we have the test results."',
    level: 'Common',
  },
  {
    term: 'Take This Offline',
    corporateContext: 'Spoken when a meeting discussion is derailing or becoming too detailed for the group.',
    translation: 'Stop talking in this big meeting and talk one-on-one afterward.',
    studentTranslation: '"Stop arguing during lecture; let\'s talk after class."',
    exampleInTheWild: '"Hey folks, this is getting into the weeds—let’s take this offline between Dave and Elena."',
    recommendedAlternative: '"Let\'s continue this in a quick 1-on-1 after the meeting so we don\'t hold everyone up."',
    level: 'Common',
  },
  {
    term: 'Synergy',
    corporateContext: 'The king of all corporate buzzwords. Used to justify mergers or multi-team projects.',
    translation: 'Working together effectively so the combined output is better.',
    studentTranslation: '"Our group project partners actually pull their own weight."',
    exampleInTheWild: '"By aligning our backend with their marketing tools, we will unlock massive synergistic value."',
    recommendedAlternative: '"By working together, we can share data and save several days of engineering."',
    level: 'Avoid',
  },
  {
    term: 'Move the Needle',
    corporateContext: 'Used in performance reviews and project roadmaps to demand visible results.',
    translation: 'Make a measurable, tangible difference to key metrics.',
    studentTranslation: '"Will this actually bump our GPA, or is it busywork?"',
    exampleInTheWild: '"That redesign looks pretty, but will it really move the needle on checkout conversion?"',
    recommendedAlternative: '"Will this have a noticeable impact on our sign-up numbers?"',
    level: 'Overused',
  },
  {
    term: 'Low-Hanging Fruit',
    corporateContext: 'Tasks that require minimal effort to achieve an immediate win.',
    translation: 'The easiest, most obvious tasks that should be done first.',
    studentTranslation: '"The easy multiple-choice questions on page 1 of the midterm."',
    exampleInTheWild: '"Before we refactor the entire architecture, let’s pick the low-hanging fruit and compress our images."',
    recommendedAlternative: '"Let\'s tackle the quick wins first to get immediate momentum."',
    level: 'Overused',
  },
  {
    term: 'Boil the Ocean',
    corporateContext: 'Warning against taking on an impossibly vast scope.',
    translation: 'Attempting to solve an overwhelmingly huge problem all at once.',
    studentTranslation: '"Trying to study an entire semester of organic chemistry in 6 hours."',
    exampleInTheWild: '"We don’t need to boil the ocean for v1. Let’s ship a basic prototype first."',
    recommendedAlternative: '"Let\'s keep the scope realistic and focus on the core flow first."',
    level: 'Overused',
  },
  {
    term: 'Touch Base / Ping',
    corporateContext: 'Informal request to reach out or send a brief message.',
    translation: 'Send a quick message or have a brief conversation.',
    studentTranslation: '"DM me on Discord / Slack when you get a second."',
    exampleInTheWild: '"I’ll ping you on Slack after lunch to touch base on the slides."',
    recommendedAlternative: '"I\'ll send you a quick note after lunch."',
    level: 'Common',
  },
  {
    term: 'Humbled and Honored',
    corporateContext: 'The standard LinkedIn trope opening for any personal award, promotion, or new job.',
    translation: 'I am proud of this milestone, but feel awkward bragging so I pretend to be humbled.',
    studentTranslation: '"I got the internship offer and I am genuinely really happy!"',
    exampleInTheWild: '"I am beyond humbled, honored, and blessed to share that I have been appointed..."',
    recommendedAlternative: '"Excited to share that I\'m joining the team! Huge thanks to everyone who supported me."',
    level: 'Avoid',
  },
  {
    term: 'Pleased to Announce',
    corporateContext: 'Stiff press-release wording used by students copying senior executives.',
    translation: 'I want to share news with my network.',
    studentTranslation: '"Big news for my upcoming semester!"',
    exampleInTheWild: '"I am pleased to announce my appointment as Junior Analyst Intern..."',
    recommendedAlternative: '"Thrilled to start as a Software Engineering Intern with the team at..."',
    level: 'Overused',
  },
];
