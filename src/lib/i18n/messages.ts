// ============================================================
// All UI strings keyed by locale — EN/KO message dictionary
// ============================================================

const en = {
  // ── Common / Shared ──
  common: {
    gallery: "Gallery",
    back: "Back",
    home: "Home",
    backToHome: "Back to Home",
    goHome: "Go Home",
    retry: "Retry",
    next: "Next",
    previous: "Previous",
    views: "Views",
    likes: "Likes",
    forks: "Forks",
    share: "Share",
    copied: "Copied!",
    souls: "Souls",
    count: "",
    joinDate: "Joined:",
    private: "Private",
    like: "Like",
    justNow: "just now",
    minutesAgo: (n: number) => `${n}m ago`,
    hoursAgo: (n: number) => `${n}h ago`,
    daysAgo: (n: number) => `${n}d ago`,
    monthsAgo: (n: number) => `${n}mo ago`,
    yearsAgo: (n: number) => `${n}y ago`,
  },

  // ── Metadata ──
  meta: {
    description:
      "Create your own AI agent soul. Generate a unique AI persona through personality analysis, just like MBTI.",
    galleryTitle: "Soul Gallery | ABTI",
    galleryDescription:
      "Explore various AI souls, like them, and remix!",
    myProfileTitle: "My Profile | ABTI",
    myProfileDescription: "Manage your profile and souls.",
    profileNotFound: "Profile Not Found | ABTI",
    profileOf: "'s Profile | ABTI",
    profileDescriptionOf: "Check out {name}'s AI soul collection.",
  },

  // ── Landing Page ──
  landing: {
    heroTitle1: "Discover",
    heroTitle2: "Your AI Soul",
    heroSubtitle1: "Create a one-of-a-kind",
    heroSubtitle2: " AI agent through personality analysis",
    cta: "Get Started",
    howItWorks: "How does it work?",
    step1Title: "MBTI + Personality Analysis",
    step1Desc: "Analyze your personality with a quiz",
    step2Title: "AI Soul Generation",
    step2Desc: "Auto-generate soul from analysis!",
    step3Title: "Share & Apply",
    step3Desc1: "Share to gallery and apply to",
    step3Desc2: "AI tools right away",
    socialTagline: "What's your ABTI?",
    socialSubtitle1: "Ask like MBTI:",
    socialSubtitle2: "What's your ABTI?",
    featuresTitle: "What can you do with ABTI?",
    feature1Title: "Your Own AI Persona",
    feature1Desc: "Create a unique AI character based on personality analysis",
    feature2Title: "SOUL.md & System Prompt",
    feature2Desc: "Auto-generate ready-to-use prompts",
    feature3Title: "Claude, GPT, OpenClaw Compatible",
    feature3Desc: "Use on major AI platforms right away",
    feature4Title: "Pixel Avatar Auto-Generation",
    feature4Desc: "Cute pixel avatar matching your personality",
    galleryPreview: "Soul Gallery Preview",
    galleryMore: "See More Gallery",
    socialProof: (count: number) => `${count} souls created`,
    quizHook: "3 min quiz. Infinite personality.",
    trendingTitle: "Trending Souls",
  },

  // ── Create Flow ──
  create: {
    title1: "Create Your Own",
    title2: "AI Soul!",
    subtitle1: "Based on MBTI and personality quiz,",
    subtitle2: "we'll generate an AI agent tailored just for you.",
    step1Label: "Basic Personality",
    step1Desc: "MBTI + Personality Sliders",
    step2Label: "Situational Quiz",
    step2Desc: "5 fun questions",
    step3Label: "Final Touch",
    step3Desc: "Free text + naming",
    startButton: "Get Started",
    timeEstimate: "Takes about 3-5 min",
    backButton: "< back",
    backAria: "Go to previous step",
  },

  // ── Phase 1 ──
  phase1: {
    mbtiTitle: "Select MBTI Type",
    mbtiSubtitle:
      "Choose your MBTI. You can skip if you don't know!",
    adhdTitle: "ADHD Subtype",
    adhdSubtitle: "Shapes your agent's energy pattern and focus style",
    adhdNone: "None",
    adhdNoneDesc: "Steady focus",
    adhdInattentive: "Inattentive",
    adhdInattentiveDesc: "Dreamy, tangential",
    adhdHyperactive: "Hyperactive",
    adhdHyperactiveDesc: "Burst energy, expressive",
    adhdCombined: "Combined",
    adhdCombinedDesc: "Both traits mixed",
    sliderTitle: "Personality Sliders",
    sliderSubtitle: "Move the sliders to fine-tune your personality",
    traitIntroversion: "Introverted",
    traitExtroversion: "Extroverted",
    traitCalm: "Calm",
    traitPlayful: "Playful",
    traitEmotional: "Emotional",
    traitLogical: "Logical",
    traitIndividualistic: "Individualistic",
    traitEmpathetic: "Empathetic",
    traitOrderly: "Orderly",
    traitCarefree: "Carefree",
    traitCasual: "Casual",
    traitFormal: "Formal",
    nextButton: "Next \u2192",
  },

  // ── Phase 2 ──
  phase2: {
    autoAdvanceHint: "Select an option to auto-advance to the next question",
  },

  // ── Phase 3 ──
  phase3: {
    title1: "Finally,",
    title2: "Tell us your unique story",
    subtitle: "Any traits you want to communicate better to AI? (optional)",
    freeTextLabel: "Free Text",
    freeTextPlaceholder:
      "Ex: I forget things so I need reminders, I can't say no so I need decisive help, I like working at night so a late-night agent would be great...",
    nameLabel: "My AI Soul Name",
    nameRequired: "Required!",
    namePlaceholder: "Ex: Tsundere Secretary Mochi, Passionate Friend Soul...",
    generateButton: "Generate Soul \u2728",
    nameValidation: "Please enter a soul name!",
  },

  // ── Generating ──
  generating: {
    messages: [
      "Analyzing your soul...",
      "Interpreting MBTI...",
      "Combining personality traits...",
      "Creating your unique agent...",
      "Breathing life into the soul...",
      "Almost done!",
    ] as readonly string[],
    retry: "Try Again",
    goBack: "Go Back",
    pleaseWait: "Please wait a moment...",
    defaultError: "Soul generation failed. Please try again.",
    serverError: "Server error occurred.",
  },

  // ── Error Pages ──
  error: {
    title: "Something went wrong",
    subtitle: "Please try again later",
    retryButton: "Retry",
    homeButton: "Go Home",
  },
  notFound: {
    title: "Can't find this page",
    subtitle: "Please check the address",
    homeButton: "Go Home",
  },

  // ── Soul Detail ──
  soulDetail: {
    toGallery: "Gallery",
  },

  // ── Profile ──
  profile: {
    formatJoinDate: (year: number, month: number) => `${year}/${month}`,
    mySouls: "My Souls",
    createNew: "Create New Soul",
    noSoulsYet: "No souls yet!",
    createSoul: "Create Soul",
    viewPublicProfile: "View Public Profile",
  },

  // ── Gallery ──
  gallery: {
    title: "Soul Gallery",
    subtitle: "Explore various AI souls",
    noResults: "No souls found",
    noResultsHint: "Try different search terms or filters",
    searchPlaceholder: "Search souls...",
    sortPopular: "Popular",
    sortRecent: "Recent",
  },

  // ── Trait Display ──
  traits: {
    sectionTitle: "Personality Traits",
    communicationStyle: "Communication",
    energyPattern: "Energy Pattern",
    decisionMode: "Decision Mode",
    humorType: "Humor Type",
    responseStructure: "Response Structure",
    communication: {
      direct: "Direct",
      warm: "Warm",
      analytical: "Analytical",
      expressive: "Expressive",
    },
    energy: {
      steady: "Steady",
      burst: "Burst",
      reactive: "Reactive",
      ambient: "Ambient",
    },
    decision: {
      logical: "Logical",
      intuitive: "Intuitive",
      consensus: "Consensus",
      impulsive: "Impulsive",
    },
    humor: {
      dry: "Dry",
      pun: "Pun",
      sarcastic: "Sarcastic",
      wholesome: "Wholesome",
      absurd: "Absurd",
    },
    structure: {
      organized: "Organized",
      "stream-of-consciousness": "Stream of Consciousness",
      mixed: "Mixed",
    },
    verbosity: "Verbosity",
    emojiDensity: "Emoji Density",
    formalityLevel: "Formality",
    tangentProbability: "Tangent Probability",
    enthusiasmBaseline: "Enthusiasm",
    empathy: "Empathy",
    aiEnhancement: "AI Enhancement Traits",
    speakingQuirks: "Speaking Quirks",
    catchphrases: "Catchphrases",
    interests: "Interests",
    petPeeves: "Pet Peeves",
    uniquePerspective: "Unique Perspective",
  },

  // ── Sample Conversations ──
  conversations: {
    title: "Sample Conversations",
    conversation: "Conversation",
  },

  // ── Share Card ──
  shareCard: {
    title: "Share Your Soul",
    saveImage: "Save as Image",
    shareText: (mbti: string) => `I'm a ${mbti} soul! What's your ABTI?`,
  },

  // ── Share Buttons ──
  shareButtons: {
    shareText: "- Check out my ABTI soul!",
    shareOnX: "Share on X(Twitter)",
    shareOnKakao: "Share on KakaoTalk",
    copyUrl: "Copy URL",
    copied: "Copied!",
    kakao: "Kakao",
  },

  // ── Soul Actions ──
  soulActions: {
    copySystemPrompt: "Copy System Prompt",
    copySoulMd: "Copy SOUL.md",
    copied: "Copied!",
    share: "Share",
  },

  // ── Viewers ──
  viewer: {
    systemPromptTitle: "System Prompt",
    copy: "Copy",
    copied: "Copied!",
    collapse: "Collapse",
    viewFullSoulMd: "View Full SOUL.md",
    viewFullPrompt: "View Full Prompt",
  },

  // ── Quiz Progress ──
  quizProgress: {
    phase1: "Basic Setup",
    phase2: "Personality Quiz",
    phase3: "Final Touch",
  },

  // ── Export Menu ──
  exportMenu: {
    exportButton: "Export",
    selectFormat: "Select export format",
    soulMdDownload: "Download SOUL.md",
    soulMdDesc: "Markdown soul file",
    claudeSkillDownload: "Download Claude Skill",
    claudeSkillDesc: "Claude Code skill",
    openclawDownload: "Download OpenClaw Package",
    openclawDesc: "OpenClaw format",
    characterCardDownload: "Download Character Card",
    characterCardDesc: "SillyTavern compatible",
    downloading: "Downloading...",
    footer: "UTF-8 text file",
  },

  // ── Fork Button ──
  fork: {
    remix: "Remix",
  },

  // ── MBTI Selector ──
  mbtiSelector: {
    skip: "I don't know (start with defaults)",
  },

  // ── Quiz Questions ──
  quiz: {
    q_stress: {
      scenario:
        "Your friend forgot your plans and made you wait for an hour. What do you say?",
      options: [
        '"Oh it\'s fine~ I could forget too!" (secretly a bit sad but don\'t show it)',
        '"Hey, do you know how long an hour is? Set an alarm next time." (fact bomb)',
        '"So let me show you the meme I made while waiting lol" (humor it away)',
        '"Next time I\'ll make a to-do list while waiting to be productive" (systematic response)',
      ],
    },
    q_creative: {
      scenario:
        "3 AM, about to sleep, and suddenly a genius idea pops up! What do you do?",
      options: [
        "Get up immediately, open the laptop, and work all night (sleep is for the dead)",
        "Jot down keywords on the phone and just sleep. Sort it out tomorrow.",
        "Text bomb a friend at 3 AM sharing the excitement",
        "Analyze logically whether the idea is actually good before deciding",
      ],
    },
    q_team: {
      scenario:
        "Two team members completely disagree in a project. You're the mediator?",
      options: [
        "Listen to both sides, suggest a compromise that makes everyone happy",
        "Objectively analyze with data and evidence which side is right",
        '"Both are wrong, there\'s a third way..." (completely new suggestion)',
        '"Decide quick and just try it! We learn by doing!" (action first)',
      ],
    },
    q_recharge: {
      scenario:
        "Finally the weekend! After working hard all week, how do you recharge?",
      options: [
        "Netflix marathon in bed + food delivery (relationships on Monday)",
        "Brunch with friends + cafe tour + gossip marathon",
        "Dive into side projects or hobbies I've been wanting to try",
        "Read alone at a cafe + organize thoughts (quiet but still out)",
      ],
    },
    q_agent: {
      scenario:
        "I want my AI agent to have this personality! Most attractive type?",
      options: [
        "Tsundere secretary: meticulous about tasks but occasionally snarky",
        "High-energy friend: gets excited about everything, emoji spam type",
        "Wise mentor: deep insight and warm advice",
        "Brain partner: bounce ideas and expand thinking together",
      ],
    },
  },

  // ── API Error Messages ──
  api: {
    invalidRequest: "Invalid request format.",
    nameRequired: "Soul name is required.",
    loginRequired: "Login required.",
    generationFailed: "Soul generation failed. Please try again.",
    serverError: "Server error occurred. Please try again later.",
    invalidSoulId: "Invalid soul ID.",
    soulNotFound: "Soul not found.",
  },

  // ── Profile Errors (server actions) ──
  profileErrors: {
    loginRequired: "Login required.",
    displayNameLimit: "Display name must be 50 characters or less.",
    updateFailed: "Failed to update profile.",
  },

  // ── Tagline Labels ──
  tagline: {
    communication: {
      direct: "Direct",
      warm: "Warm",
      analytical: "Analytical",
      expressive: "Expressive",
    },
    humor: {
      dry: "Dry-Witted",
      pun: "Pun-Loving",
      sarcastic: "Sharply Sarcastic",
      wholesome: "Wholesome",
      absurd: "High-Energy",
    },
    aiSoul: "AI Soul",
  },
} as const;

// Recursively widen string literals to `string` while preserving structure.
// This lets `ko` have different string values than `en` while enforcing
// the same shape (same keys, functions, arrays).
type DeepString<T> =
  T extends (...args: infer A) => infer R ? (...args: A) => DeepString<R> :
  T extends readonly (infer U)[] ? readonly DeepString<U>[] :
  T extends object ? { [K in keyof T]: DeepString<T[K]> } :
  T extends string ? string :
  T;

type MessagesShape = DeepString<typeof en>;

const ko: MessagesShape = {
  common: {
    gallery: "\uAC24\uB7EC\uB9AC",
    back: "\uB3CC\uC544\uAC00\uAE30",
    home: "\uD648\uC73C\uB85C",
    backToHome: "\uD648\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30",
    goHome: "\uD648\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30",
    retry: "\uB2E4\uC2DC \uC2DC\uB3C4",
    next: "\uB2E4\uC74C",
    previous: "\uC774\uC804",
    views: "\uC870\uD68C",
    likes: "\uC88B\uC544\uC694",
    forks: "\uD3EC\uD06C",
    share: "\uACF5\uC720\uD558\uAE30",
    copied: "\uBCF5\uC0AC\uB428!",
    souls: "\uC18C\uC6B8",
    count: "\uAC1C",
    joinDate: "\uAC00\uC785\uC77C:",
    private: "\uBE44\uACF5\uAC1C",
    like: "\uC88B\uC544\uC694",
    justNow: "\uBC29\uAE08 \uC804",
    minutesAgo: (n: number) => `${n}\uBD84 \uC804`,
    hoursAgo: (n: number) => `${n}\uC2DC\uAC04 \uC804`,
    daysAgo: (n: number) => `${n}\uC77C \uC804`,
    monthsAgo: (n: number) => `${n}\uAC1C\uC6D4 \uC804`,
    yearsAgo: (n: number) => `${n}\uB144 \uC804`,
  },

  meta: {
    description:
      "\uB098\uB9CC\uC758 AI \uC5D0\uC774\uC804\uD2B8 \uC18C\uC6B8\uC744 \uB9CC\uB4E4\uC5B4\uBCF4\uC138\uC694. MBTI\uCC98\uB7FC \uC131\uACA9 \uBD84\uC11D\uC73C\uB85C \uC138\uC0C1\uC5D0 \uD558\uB098\uBFD0\uC778 AI \uD398\uB974\uC18C\uB098\uB97C \uC0DD\uC131\uD569\uB2C8\uB2E4.",
    galleryTitle: "\uC18C\uC6B8 \uAC24\uB7EC\uB9AC | ABTI",
    galleryDescription:
      "\uB2E4\uC591\uD55C AI \uC18C\uC6B8\uC744 \uD0D0\uC0C9\uD558\uACE0, \uC88B\uC544\uC694\uB97C \uB204\uB974\uACE0, \uB9AC\uBBF9\uC2A4\uD574\uBCF4\uC138\uC694!",
    myProfileTitle: "\uB0B4 \uD504\uB85C\uD544 | ABTI",
    myProfileDescription: "\uB0B4 \uD504\uB85C\uD544\uACFC \uC18C\uC6B8\uC744 \uAD00\uB9AC\uD558\uC138\uC694.",
    profileNotFound: "\uD504\uB85C\uD544\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4\uC694 | ABTI",
    profileOf: "\uC758 \uD504\uB85C\uD544 | ABTI",
    profileDescriptionOf: "{name}\uB2D8\uC758 AI \uC18C\uC6B8 \uCEEC\uB809\uC158\uC744 \uD655\uC778\uD574\uBCF4\uC138\uC694.",
  },

  landing: {
    heroTitle1: "\uB098\uB9CC\uC758 AI \uC18C\uC6B8\uC744",
    heroTitle2: "\uBC1C\uACAC\uD558\uC138\uC694",
    heroSubtitle1: "\uC131\uACA9 \uBD84\uC11D\uC73C\uB85C \uB9CC\uB4DC\uB294",
    heroSubtitle2: " \uC138\uC0C1\uC5D0 \uD558\uB098\uBFD0\uC778 AI \uC5D0\uC774\uC804\uD2B8",
    cta: "\uC9C0\uAE08 \uC2DC\uC791\uD558\uAE30",
    howItWorks: "\uC5B4\uB5BB\uAC8C \uB9CC\uB4E4\uC5B4\uC9C0\uB098\uC694?",
    step1Title: "MBTI + \uC131\uACA9 \uBD84\uC11D",
    step1Desc: "\uD034\uC988\uB85C \uB2F9\uC2E0\uC758 \uC131\uACA9\uC744 \uBD84\uC11D\uD574\uC694",
    step2Title: "AI \uC18C\uC6B8 \uC0DD\uC131",
    step2Desc: "\uBD84\uC11D \uACB0\uACFC\uB85C \uC18C\uC6B8\uC744 \uC790\uB3D9 \uC0DD\uC131!",
    step3Title: "\uACF5\uC720 & \uD65C\uC6A9",
    step3Desc1: "\uAC24\uB7EC\uB9AC\uC5D0 \uACF5\uC720\uD558\uACE0 AI \uB3C4\uAD6C\uC5D0",
    step3Desc2: "\uBC14\uB85C \uC801\uC6A9\uD558\uC138\uC694",
    socialTagline: "What's your ABTI?",
    socialSubtitle1: "MBTI\uCC98\uB7FC \uBB3C\uC5B4\uBCF4\uC138\uC694:",
    socialSubtitle2: "\uB108 ABTI \uBB50\uC57C?",
    featuresTitle: "ABTI\uB85C \uBB58 \uD560 \uC218 \uC788\uB098\uC694?",
    feature1Title: "\uB098\uB9CC\uC758 AI \uD398\uB974\uC18C\uB098",
    feature1Desc: "\uC131\uACA9 \uBD84\uC11D \uAE30\uBC18 \uACE0\uC720\uD55C AI \uCE90\uB9AD\uD130 \uC0DD\uC131",
    feature2Title: "SOUL.md & \uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8",
    feature2Desc: "\uBC14\uB85C \uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uD504\uB86C\uD504\uD2B8 \uC790\uB3D9 \uC0DD\uC131",
    feature3Title: "Claude, GPT, OpenClaw \uD638\uD658",
    feature3Desc: "\uC8FC\uC694 AI \uD50C\uB7AB\uD3FC\uC5D0\uC11C \uBC14\uB85C \uD65C\uC6A9",
    feature4Title: "\uD53D\uC140 \uC544\uBC14\uD0C0 \uC790\uB3D9 \uC0DD\uC131",
    feature4Desc: "\uC131\uACA9\uC5D0 \uB9DE\uB294 \uADC0\uC5EC\uC6B4 \uD53D\uC140 \uC544\uBC14\uD0C0",
    galleryPreview: "\uC18C\uC6B8 \uAC24\uB7EC\uB9AC \uBBF8\uB9AC\uBCF4\uAE30",
    galleryMore: "\uAC24\uB7EC\uB9AC \uB354 \uBCF4\uAE30",
    socialProof: (count: number) => `${count}개의 소울이 탄생했어요`,
    quizHook: "3분 퀴즈. 무한한 개성.",
    trendingTitle: "인기 소울",
  },

  create: {
    title1: "\uB098\uB9CC\uC758 AI \uC18C\uC6B8\uC744",
    title2: "\uB9CC\uB4E4\uC5B4\uBCF4\uC138\uC694!",
    subtitle1: "MBTI\uC640 \uC131\uACA9 \uD034\uC988\uB97C \uAE30\uBC18\uC73C\uB85C",
    subtitle2: "\uB2F9\uC2E0\uC5D0\uAC8C \uB531 \uB9DE\uB294 AI \uC5D0\uC774\uC804\uD2B8\uB97C \uC0DD\uC131\uD569\uB2C8\uB2E4.",
    step1Label: "\uAE30\uBCF8 \uC131\uACA9 \uC124\uC815",
    step1Desc: "MBTI + \uC131\uACA9 \uC2AC\uB77C\uC774\uB354",
    step2Label: "\uC0C1\uD669 \uD034\uC988",
    step2Desc: "5\uAC00\uC9C0 \uC7AC\uBBF8\uC788\uB294 \uC9C8\uBB38",
    step3Label: "\uB9C8\uC9C0\uB9C9 \uD130\uCE58",
    step3Desc: "\uC790\uC720 \uD14D\uC2A4\uD2B8 + \uC774\uB984 \uC9D3\uAE30",
    startButton: "\uC2DC\uC791\uD558\uAE30",
    timeEstimate: "\uC57D 3~5\uBD84 \uC18C\uC694",
    backButton: "< \uB4A4\uB85C",
    backAria: "\uC774\uC804 \uB2E8\uACC4\uB85C",
  },

  phase1: {
    mbtiTitle: "MBTI \uC720\uD615 \uC120\uD0DD",
    mbtiSubtitle:
      "\uB2F9\uC2E0\uC758 MBTI\uB97C \uC120\uD0DD\uD558\uC138\uC694. \uBAA8\uB974\uBA74 \uAC74\uB108\uB6F8 \uC218 \uC788\uC5B4\uC694!",
    adhdTitle: "ADHD Subtype",
    adhdSubtitle: "Shapes your agent's energy pattern and focus style",
    adhdNone: "None",
    adhdNoneDesc: "Steady focus",
    adhdInattentive: "Inattentive",
    adhdInattentiveDesc: "Dreamy, tangential",
    adhdHyperactive: "Hyperactive",
    adhdHyperactiveDesc: "Burst energy, expressive",
    adhdCombined: "Combined",
    adhdCombinedDesc: "Both traits mixed",
    sliderTitle: "\uC131\uACA9 \uC2AC\uB77C\uC774\uB354",
    sliderSubtitle: "\uC2AC\uB77C\uC774\uB354\uB97C \uC6C0\uC9C1\uC5EC\uC11C \uC131\uACA9\uC744 \uC138\uBC00\uD558\uAC8C \uC870\uC815\uD558\uC138\uC694",
    traitIntroversion: "\uB0B4\uD5A5\uC801",
    traitExtroversion: "\uC678\uD5A5\uC801",
    traitCalm: "\uCC28\uBD84\uD55C",
    traitPlayful: "\uC7A5\uB09C\uAE30",
    traitEmotional: "\uAC10\uC131\uC801",
    traitLogical: "\uB17C\uB9AC\uC801",
    traitIndividualistic: "\uAC1C\uC778\uC8FC\uC758",
    traitEmpathetic: "\uACF5\uAC10\uC801",
    traitOrderly: "\uC9C8\uC11C\uC815\uC5F0",
    traitCarefree: "\uC790\uC720\uBD84\uBC29",
    traitCasual: "\uCE90\uC8FC\uC5BC",
    traitFormal: "\uD3EC\uBA40",
    nextButton: "\uB2E4\uC74C \u2192",
  },

  phase2: {
    autoAdvanceHint: "\uC120\uD0DD\uD558\uBA74 \uC790\uB3D9\uC73C\uB85C \uB2E4\uC74C \uC9C8\uBB38\uC73C\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4",
  },

  phase3: {
    title1: "\uB9C8\uC9C0\uB9C9\uC73C\uB85C,",
    title2: "\uB2F9\uC2E0\uB9CC\uC758 \uC774\uC57C\uAE30\uB97C \uB4E4\uB824\uC8FC\uC138\uC694",
    subtitle: "AI\uC5D0\uAC8C \uB354 \uC798 \uC804\uB2EC\uD558\uACE0 \uC2F6\uC740 \uD2B9\uC131\uC774 \uC788\uB098\uC694? (\uC120\uD0DD\uC0AC\uD56D)",
    freeTextLabel: "\uC790\uC720 \uD14D\uC2A4\uD2B8",
    freeTextPlaceholder:
      "\uC608: \uC798 \uAE4C\uBA39\uC5B4\uC11C \uB9AC\uB9C8\uC778\uB354 \uD544\uC694, \uAC70\uC808\uC744 \uC798 \uBABB\uD574\uC11C \uB2E8\uD638\uD558\uAC8C \uB3C4\uC640\uC904 \uC0AC\uB78C \uD544\uC694, \uBC24\uC5D0 \uC791\uC5C5\uD558\uB294 \uAC78 \uC88B\uC544\uD574\uC11C \uC0C8\uBCBD\uD615 \uC5D0\uC774\uC804\uD2B8\uAC00 \uC88B\uACA0\uC5B4\uC694...",
    nameLabel: "\uB098\uC758 AI \uC18C\uC6B8 \uC774\uB984",
    nameRequired: "\uD544\uC218 \uD56D\uBAA9\uC774\uC5D0\uC694!",
    namePlaceholder: "\uC608: \uCE20\uB370\uB808 \uBE44\uC11C \uBAA8\uCC0C, \uC5F4\uC815 \uCE5C\uAD6C \uC18C\uC6B8\uC774...",
    generateButton: "\uC18C\uC6B8 \uC0DD\uC131\uD558\uAE30 \u2728",
    nameValidation: "\uC18C\uC6B8 \uC774\uB984\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694!",
  },

  generating: {
    messages: [
      "\uC18C\uC6B8\uC744 \uBD84\uC11D\uD558\uACE0 \uC788\uC5B4\uC694...",
      "MBTI\uB97C \uD574\uC11D\uD558\uB294 \uC911...",
      "\uC131\uACA9 \uD2B9\uC131\uC744 \uC870\uD569\uD558\uACE0 \uC788\uC5B4\uC694...",
      "\uB2F9\uC2E0\uB9CC\uC758 \uC5D0\uC774\uC804\uD2B8\uB97C \uB9CC\uB4DC\uB294 \uC911...",
      "\uC18C\uC6B8\uC5D0 \uC0DD\uBA85\uC744 \uBD88\uC5B4\uB123\uACE0 \uC788\uC5B4\uC694...",
      "\uAC70\uC758 \uB2E4 \uB410\uC5B4\uC694!",
    ] as readonly string[],
    retry: "\uB2E4\uC2DC \uC2DC\uB3C4\uD558\uAE30",
    goBack: "\uB3CC\uC544\uAC00\uAE30",
    pleaseWait: "\uC7A0\uC2DC\uB9CC \uAE30\uB2E4\uB824\uC8FC\uC138\uC694...",
    defaultError: "\uC18C\uC6B8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.",
    serverError: "\uC11C\uBC84 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
  },

  error: {
    title: "\uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC5B4\uC694",
    subtitle: "\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694",
    retryButton: "\uB2E4\uC2DC \uC2DC\uB3C4",
    homeButton: "\uD648\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30",
  },
  notFound: {
    title: "\uC774 \uD398\uC774\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC5B4\uC694",
    subtitle: "\uC8FC\uC18C\uB97C \uB2E4\uC2DC \uD655\uC778\uD574\uC8FC\uC138\uC694",
    homeButton: "\uD648\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30",
  },

  soulDetail: {
    toGallery: "\uAC24\uB7EC\uB9AC\uB85C",
  },

  profile: {
    formatJoinDate: (year: number, month: number) => `${year}\uB144 ${month}\uC6D4`,
    mySouls: "\uB098\uC758 \uC18C\uC6B8\uB4E4",
    createNew: "\uC0C8 \uC18C\uC6B8 \uB9CC\uB4E4\uAE30",
    noSoulsYet: "\uC544\uC9C1 \uC18C\uC6B8\uC774 \uC5C6\uC5B4\uC694!",
    createSoul: "\uC18C\uC6B8 \uB9CC\uB4E4\uAE30",
    viewPublicProfile: "\uACF5\uAC1C \uD504\uB85C\uD544 \uBCF4\uAE30",
  },

  gallery: {
    title: "\uC18C\uC6B8 \uAC24\uB7EC\uB9AC",
    subtitle: "\uB2E4\uC591\uD55C AI \uC18C\uC6B8\uC744 \uD0D0\uC0C9\uD574\uBCF4\uC138\uC694",
    noResults: "\uC18C\uC6B8\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4\uC694",
    noResultsHint: "\uB2E4\uB978 \uAC80\uC0C9\uC5B4\uB098 \uD544\uD130\uB97C \uC2DC\uB3C4\uD574\uBCF4\uC138\uC694",
    searchPlaceholder: "\uC18C\uC6B8 \uAC80\uC0C9...",
    sortPopular: "\uC778\uAE30\uC21C",
    sortRecent: "\uCD5C\uC2E0\uC21C",
  },

  traits: {
    sectionTitle: "\uC131\uACA9 \uD2B9\uC131",
    communicationStyle: "\uC18C\uD1B5 \uC2A4\uD0C0\uC77C",
    energyPattern: "\uC5D0\uB108\uC9C0 \uD328\uD134",
    decisionMode: "\uACB0\uC815 \uBC29\uC2DD",
    humorType: "\uC720\uBA38 \uD0C0\uC785",
    responseStructure: "\uC751\uB2F5 \uAD6C\uC870",
    communication: {
      direct: "\uC9C1\uC811\uC801",
      warm: "\uB530\uB73B\uD55C",
      analytical: "\uBD84\uC11D\uC801",
      expressive: "\uD45C\uD604\uC801",
    },
    energy: {
      steady: "\uC548\uC815\uC801",
      burst: "\uD3ED\uBC1C\uC801",
      reactive: "\uBC18\uC751\uC801",
      ambient: "\uC740\uC740\uD55C",
    },
    decision: {
      logical: "\uB17C\uB9AC\uC801",
      intuitive: "\uC9C1\uAD00\uC801",
      consensus: "\uD569\uC758\uD615",
      impulsive: "\uC989\uD765\uC801",
    },
    humor: {
      dry: "\uAC74\uC870\uD55C",
      pun: "\uB9D0\uC7A5\uB09C",
      sarcastic: "\uD48D\uC790\uC801",
      wholesome: "\uD790\uB9C1",
      absurd: "\uD669\uB2F9\uD55C",
    },
    structure: {
      organized: "\uCCB4\uACC4\uC801",
      "stream-of-consciousness": "\uC758\uC2DD\uC758 \uD750\uB984",
      mixed: "\uD63C\uD569\uD615",
    },
    verbosity: "\uC218\uB2E4 \uB808\uBCA8",
    emojiDensity: "\uC774\uBAA8\uC9C0 \uBC00\uB3C4",
    formalityLevel: "\uACA9\uC2DD \uC218\uC900",
    tangentProbability: "\uC0BC\uCC9C\uD3EC \uD655\uB960",
    enthusiasmBaseline: "\uC5F4\uC815 \uAE30\uBCF8\uAC12",
    empathy: "\uACF5\uAC10 \uB2A5\uB825",
    aiEnhancement: "AI \uAC15\uD654 \uD2B9\uC131",
    speakingQuirks: "\uB9D0\uBC84\uB987",
    catchphrases: "\uCE90\uCE58\uD504\uB808\uC774\uC988",
    interests: "\uAD00\uC2EC\uC0AC",
    petPeeves: "\uC2EB\uC5B4\uD558\uB294 \uAC83",
    uniquePerspective: "\uACE0\uC720 \uAD00\uC810",
  },

  conversations: {
    title: "\uC0D8\uD50C \uB300\uD654",
    conversation: "\uB300\uD654",
  },

  shareCard: {
    title: "나의 소울 공유하기",
    saveImage: "이미지로 저장",
    shareText: (mbti: string) => `나는 ${mbti} 소울! 너의 ABTI는?`,
  },

  shareButtons: {
    shareText: "- \uB098\uC758 ABTI \uC18C\uC6B8\uC744 \uD655\uC778\uD574\uBCF4\uC138\uC694!",
    shareOnX: "X(Twitter)\uC5D0 \uACF5\uC720",
    shareOnKakao: "\uCE74\uCE74\uC624\uD1A1\uC5D0 \uACF5\uC720",
    copyUrl: "URL \uBCF5\uC0AC",
    copied: "\uBCF5\uC0AC\uB428!",
    kakao: "\uCE74\uCE74\uC624",
  },

  soulActions: {
    copySystemPrompt: "\uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8 \uBCF5\uC0AC",
    copySoulMd: "SOUL.md \uBCF5\uC0AC",
    copied: "\uBCF5\uC0AC\uB428!",
    share: "\uACF5\uC720\uD558\uAE30",
  },

  viewer: {
    systemPromptTitle: "\uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8",
    copy: "\uBCF5\uC0AC",
    copied: "\uBCF5\uC0AC\uB428!",
    collapse: "\uC811\uAE30",
    viewFullSoulMd: "\uC804\uCCB4 SOUL.md \uBCF4\uAE30",
    viewFullPrompt: "\uC804\uCCB4 \uD504\uB86C\uD504\uD2B8 \uBCF4\uAE30",
  },

  quizProgress: {
    phase1: "\uAE30\uBCF8 \uC124\uC815",
    phase2: "\uC131\uACA9 \uD034\uC988",
    phase3: "\uB9C8\uC9C0\uB9C9 \uD130\uCE58",
  },

  exportMenu: {
    exportButton: "\uB0B4\uBCF4\uB0B4\uAE30",
    selectFormat: "\uB0B4\uBCF4\uB0B4\uAE30 \uD615\uC2DD \uC120\uD0DD",
    soulMdDownload: "SOUL.md \uB2E4\uC6B4\uB85C\uB4DC",
    soulMdDesc: "\uB9C8\uD06C\uB2E4\uC6B4 \uC18C\uC6B8 \uD30C\uC77C",
    claudeSkillDownload: "Claude Skill \uB2E4\uC6B4\uB85C\uB4DC",
    claudeSkillDesc: "Claude Code \uC2A4\uD0AC",
    openclawDownload: "OpenClaw \uD328\uD0A4\uC9C0 \uB2E4\uC6B4\uB85C\uB4DC",
    openclawDesc: "OpenClaw \uD615\uC2DD",
    characterCardDownload: "Character Card \uB2E4\uC6B4\uB85C\uB4DC",
    characterCardDesc: "SillyTavern \uD638\uD658",
    downloading: "\uB2E4\uC6B4\uB85C\uB4DC \uC911...",
    footer: "UTF-8 \uD14D\uC2A4\uD2B8 \uD30C\uC77C",
  },

  fork: {
    remix: "\uB9AC\uBBF9\uC2A4",
  },

  mbtiSelector: {
    skip: "\uBAA8\uB974\uACA0\uC5B4\uC694 (\uAE30\uBCF8 \uC124\uC815\uC73C\uB85C \uC2DC\uC791)",
  },

  quiz: {
    q_stress: {
      scenario:
        "\uCE5C\uAD6C\uAC00 \uC57D\uC18D\uC744 \uAE4C\uBA39\uACE0 1\uC2DC\uAC04\uC774\uB098 \uAE30\uB2E4\uB9AC\uAC8C \uD588\uC5B4\uC694. \uCE5C\uAD6C\uD55C\uD14C \uBB50\uB77C\uACE0 \uD560 \uAC74\uAC00\uC694?",
      options: [
        '"\uC544 \uAD1C\uCC2E\uC544~ \uB098\uB3C4 \uAE4C\uBA39\uC744 \uC218 \uC788\uC9C0 \uBB50!" (\uC18D\uC73C\uB860 \uC880 \uC11C\uC6B4\uD558\uC9C0\uB9CC \uD2F0 \uC548 \uB0C4)',
        '"\uC57C, 1\uC2DC\uAC04\uC774 \uC5BC\uB9C8\uB098 \uAE34 \uAC74\uC9C0 \uC54C\uC544? \uB2E4\uC74C\uC5D4 \uC54C\uB78C \uB9DE\uCDB0." (\uD329\uD2B8 \uD3ED\uACA9)',
        '"\uADF8\uB798\uC11C \uB0B4\uAC00 \uAE30\uB2E4\uB9AC\uBA74\uC11C \uB9CC\uB4E0 \uBC08 \uBCF4\uC5EC\uC904\uAC8C \u314B\u314B" (\uC720\uBA38\uB85C \uB118\uAE40)',
        '"\uB2E4\uC74C\uBD80\uD130 \uAE30\uB2E4\uB9AC\uB294 \uB3D9\uC548 \uD560 \uC77C \uB9AC\uC2A4\uD2B8 \uB9CC\uB4E4\uC5B4\uC11C \uC0DD\uC0B0\uC801\uC73C\uB85C \uC4F8\uAC8C" (\uCCB4\uACC4\uC801 \uB300\uC751)',
      ],
    },
    q_creative: {
      scenario:
        "\uC0C8\uBCBD 3\uC2DC, \uC790\uB824\uACE0 \uB204\uC6E0\uB294\uB370 \uAC11\uC790\uAE30 \uCC9C\uC7AC\uC801\uC778 \uC544\uC774\uB514\uC5B4\uAC00 \uB5A0\uC62C\uB790\uC5B4\uC694! \uC5B4\uB5BB\uAC8C \uD558\uC2DC\uACA0\uC5B4\uC694?",
      options: [
        "\uBC14\uB85C \uC77C\uC5B4\uB098\uC11C \uB178\uD2B8\uBD81 \uCF1C\uACE0 \uC0C8\uBCBD \uB0B4\uB0B4 \uC791\uC5C5 \uC2DC\uC791 (\uC7A0\uC740 \uC8FD\uC5B4\uC11C \uC790\uC9C0)",
        "\uD578\uB4DC\uD3F0 \uBA54\uBAA8\uC7A5\uC5D0 \uD0A4\uC6CC\uB4DC\uB9CC \uC801\uC5B4\uB450\uACE0 \uC77C\uB2E8 \uC7A0. \uB0B4\uC77C \uC815\uB9AC\uD558\uC790.",
        "\uCE5C\uAD6C\uD55C\uD14C \uC0C8\uBCBD 3\uC2DC\uC5D0 \uCE74\uD1A1 \uD3ED\uACA9 \uBCF4\uB0B4\uBA74\uC11C \uD765\uBD84 \uACF5\uC720",
        "\uC544\uC774\uB514\uC5B4\uAC00 \uC815\uB9D0 \uC88B\uC740 \uAC74\uC9C0 \uB17C\uB9AC\uC801\uC73C\uB85C \uB530\uC838\uBCF8 \uD6C4 \uD310\uB2E8",
      ],
    },
    q_team: {
      scenario:
        "\uD300 \uD504\uB85C\uC81D\uD2B8\uC5D0\uC11C \uB450 \uBA85\uC758 \uC758\uACAC\uC774 \uC644\uC804 \uBC18\uB300\uC608\uC694. \uB2F9\uC2E0\uC774 \uC911\uC7AC\uC790\uB77C\uBA74?",
      options: [
        "\uC77C\uB2E8 \uC591\uCABD \uB2E4 \uB4E4\uC5B4\uBCF4\uACE0, \uB458 \uB2E4 \uAE30\uBD84 \uB098\uC058\uC9C0 \uC54A\uAC8C \uC808\uCDA9\uC548 \uC81C\uC2DC",
        "\uB370\uC774\uD130\uB791 \uADFC\uAC70\uB97C \uAE30\uBC18\uC73C\uB85C \uC5B4\uB290 \uCABD\uC774 \uB9DE\uB294\uC9C0 \uAC1D\uAD00\uC801\uC73C\uB85C \uBD84\uC11D",
        '"\uC544 \uB458 \uB2E4 \uD2C0\uB838\uACE0 \uC81C3\uC758 \uBC29\uBC95\uC774 \uC788\uB294\uB370..." (\uC804\uD600 \uC0C8\uB85C\uC6B4 \uC81C\uC548)',
        '"\uBE68\uB9AC \uC815\uD558\uACE0 \uC77C\uB2E8 \uD574\uBCF4\uC790! \uD574\uBD10\uC57C \uC544\uB294 \uAC70\uC9C0!" (\uD589\uB3D9 \uC6B0\uC120)',
      ],
    },
    q_recharge: {
      scenario: "\uB4DC\uB514\uC5B4 \uC8FC\uB9D0! \uD55C \uC8FC \uB3D9\uC548 \uC5F4\uC2EC\uD788 \uC77C\uD55C \uB098, \uC5D0\uB108\uC9C0 \uCDA9\uC804 \uBC29\uBC95\uC740?",
      options: [
        "\uCE68\uB300\uC5D0\uC11C \uB137\uD50C\uB9AD\uC2A4 \uC815\uC8FC\uD589 + \uBC30\uB2EC \uC74C\uC2DD (\uC778\uAC04\uAD00\uACC4\uB294 \uC6D4\uC694\uC77C\uC5D0)",
        "\uCE5C\uAD6C\uB4E4\uC774\uB791 \uBE0C\uB7F0\uCE58 + \uCE74\uD398 \uD22C\uC5B4 + \uC218\uB2E4 \uB9C8\uB77C\uD1A4",
        "\uADF8\uB3D9\uC548 \uD558\uACE0 \uC2F6\uC5C8\uB358 \uC0AC\uC774\uB4DC \uD504\uB85C\uC81D\uD2B8\uB098 \uCDE8\uBBF8 \uD65C\uB3D9\uC5D0 \uBAB0\uB450",
        "\uCE74\uD398\uC5D0\uC11C \uD63C\uC790 \uCC45 \uC77D\uAE30 + \uC0DD\uAC01 \uC815\uB9AC (\uC870\uC6A9\uD558\uC9C0\uB9CC \uBC16\uC5D0\uB294 \uB098\uAC10)",
      ],
    },
    q_agent: {
      scenario:
        "\uB0B4 AI \uC5D0\uC774\uC804\uD2B8\uAC00 \uC774\uB7F0 \uC131\uACA9\uC774\uC5C8\uC73C\uBA74 \uC88B\uACA0\uB2E4! \uAC00\uC7A5 \uB04C\uB9AC\uB294 \uD0C0\uC785\uC740?",
      options: [
        "\uCE20\uB370\uB808 \uBE44\uC11C: \uD560 \uC77C \uAF3C\uAF3C\uD788 \uCC59\uAE30\uBA74\uC11C \uAC00\uB054 \uD55C\uB9C8\uB514 \uD558\uB294 \uD0C0\uC785",
        "\uD150\uC158 \uB192\uC740 \uCE5C\uAD6C: \uBB58 \uD574\uB3C4 \uAC19\uC774 \uC2E0\uB098\uD558\uACE0 \uC774\uBAA8\uC9C0 \uD3ED\uACA9\uD558\uB294 \uD0C0\uC785",
        "\uD604\uC790 \uBA58\uD1A0: \uAE4A\uC740 \uD1B5\uCC30\uACFC \uB530\uB73B\uD55C \uC870\uC5B8\uC744 \uC8FC\uB294 \uD0C0\uC785",
        "\uBE0C\uB808\uC778 \uD30C\uD2B8\uB108: \uC544\uC774\uB514\uC5B4 \uD295\uAE30\uBA74\uC11C \uAC19\uC774 \uC0AC\uACE0 \uD655\uC7A5\uD558\uB294 \uD0C0\uC785",
      ],
    },
  },

  api: {
    invalidRequest: "\uC798\uBABB\uB41C \uC694\uCCAD \uD615\uC2DD\uC785\uB2C8\uB2E4.",
    nameRequired: "\uC18C\uC6B8 \uC774\uB984\uC740 \uD544\uC218 \uD56D\uBAA9\uC785\uB2C8\uB2E4.",
    loginRequired: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.",
    generationFailed: "\uC18C\uC6B8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.",
    serverError: "\uC11C\uBC84 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.",
    invalidSoulId: "\uC798\uBABB\uB41C \uC18C\uC6B8 ID\uC785\uB2C8\uB2E4.",
    soulNotFound: "\uC18C\uC6B8\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
  },

  profileErrors: {
    loginRequired: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.",
    displayNameLimit: "\uD45C\uC2DC \uC774\uB984\uC740 50\uC790 \uC774\uB0B4\uB85C \uC785\uB825\uD574\uC8FC\uC138\uC694.",
    updateFailed: "\uD504\uB85C\uD544 \uC5C5\uB370\uC774\uD2B8\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",
  },

  tagline: {
    communication: {
      direct: "\uC9C1\uC124\uC801\uC778",
      warm: "\uB530\uB73B\uD55C",
      analytical: "\uBD84\uC11D\uC801\uC778",
      expressive: "\uD45C\uD604\uB825 \uD48D\uBD80\uD55C",
    },
    humor: {
      dry: "\uB4DC\uB77C\uC774 \uC704\uD2B8\uC758",
      pun: "\uB9D0\uC7A5\uB09C\uC744 \uC0AC\uB791\uD558\uB294",
      sarcastic: "\uB0A0\uCE74\uB85C\uC6B4 \uD48D\uC790\uC758",
      wholesome: "\uD790\uB9C1 \uC720\uBA38\uC758",
      absurd: "\uD150\uC158 \uD3ED\uBC1C\uC758",
    },
    aiSoul: "AI \uC18C\uC6B8",
  },
};

export type Messages = MessagesShape;
export const messages: Record<"en" | "ko", Messages> = { en, ko };
