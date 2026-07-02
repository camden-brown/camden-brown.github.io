// All portfolio content, lifted from the design handoff. Copy is final.

export interface Metric {
  n: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  dir: string;
  category: string;
  roleShort: string;
  role: string;
  dates: string;
  teaser: string;
  thesis: string;
  context: string;
  built: string[];
  metrics: Metric[];
  stack: string[];
  shotA: string;
  shotB: string;
  /** When set, shotA/shotB are real images under /public/<shotDir>/; otherwise they render as captioned placeholders. */
  shotDir?: string;
  /** Optional product-overview paragraph shown above the case-study columns. */
  overview?: string;
  /** Optional technical-highlights bullets (architecture / engineering). */
  engineering?: string[];
  /** Optional screenshot gallery (real images under /public/<shotDir>/) with a lightbox. */
  gallery?: { src: string; caption: string }[];
  /** Optional architecture/flow diagram, shown in place of screenshots (themed, no image needed). */
  diagram?: { caption?: string; stages: { label: string; sub?: string }[] };
  /** Optional note explaining why screenshots are omitted (confidential / NDA work). */
  confidentialNote?: string;
}

export const projects: Project[] = [
  {
    id: "sympliact",
    name: "Sympliact",
    dir: "sympliact/",
    category: "Health Tech",
    roleShort: "founding engineer · 2019–now",
    role: "Founding Engineer / Lead Full-Stack Engineer",
    dates: "Feb 2019 – Present",
    teaser:
      "Founding-engineer build of a healthcare platform — Practice & Patient Angular PWAs on a Rails + GraphQL API, greenfield → production.",
    thesis:
      "Architected and delivered Sympliact's healthcare platform from an empty repo to production — two Angular PWAs on a Rails + GraphQL backend, owning all frontend development as the founding engineer.",
    context:
      "A greenfield healthcare product with no engineering foundation. As founding engineer I built both the practice-facing and patient-facing experiences, set the technical direction, and made releases safe enough for a regulated, high-stakes domain.",
    built: [
      "Practice PWA — appointment scheduling (FullCalendar), patient management, provider & staff administration, configurable automated notifications, and usage metrics.",
      "Patient PWA — multi-profile health records, provider connections & authorizations, secure care-thread messaging, and record search with predictive suggestions.",
      "NgRx state architecture and Angular Material across both apps, delivered as offline-capable PWAs with Auth0 auth against a Rails + GraphQL API (Postgres, Elasticsearch, Sidekiq).",
      "Quality gates built on unit and Playwright integration tests, with automated QA running the same Playwright suite in two modes — mocked (intercepted GraphQL, forged Auth0 session, no backend) for fast PR checks, and live against a real backend for full end-to-end verification.",
    ],
    metrics: [
      { n: "4,200+", label: "patients onboarded" },
      { n: "45 states", label: "nationwide reach" },
      { n: "260+", label: "active practice staff" },
      { n: "Mock + Live", label: "automated Playwright QA" },
    ],
    stack: [
      "Angular",
      "NgRx",
      "TypeScript",
      "Angular Material",
      "Rails",
      "GraphQL",
      "PostgreSQL",
      "Auth0",
      "Playwright",
    ],
    shotA: "practice-dashboard.png",
    shotB: "patient-mobile-health-history.png",
    shotDir: "sympliact",
    overview:
      "Sympliact is a healthcare collaboration platform connecting medical practices with their patients. Practices run scheduling, patient management, and multi-channel patient communication from an admin web app; patients manage their own health records, connect to their providers, and message their care team from a companion app. Both are Angular PWAs sharing one Rails + GraphQL backend — built and owned end-to-end as the founding engineer over seven years, from an empty repo to production.",
    engineering: [
      "Two Angular PWAs (practice + patient) sharing typed GraphQL models against a Rails API — installable and offline-capable via a service worker.",
      "NgRx (store + effects) for predictable state across both apps, with Angular Material and a custom design system for the UI.",
      "Auth0 (Authorization Code + PKCE) authentication shared across the practice and patient experiences.",
      "Rails + GraphQL backend on PostgreSQL, with Elasticsearch-powered patient search and Sidekiq background jobs.",
      "Testing strategy combining unit tests with Playwright integration tests across both apps, driving strong coverage of the feature surface.",
      "Automated QA on a dual-mode Playwright harness: the same specs run mocked — intercepted GraphQL plus a forged Auth0 session, no backend required — as fast PR gates, and live against a real backend for end-to-end release verification.",
      "CI/CD with semantic-release, Sentry error monitoring, and PostHog product analytics.",
    ],
    gallery: [
      { src: "practice-dashboard.png", caption: "Practice · scheduling board + live notifications" },
      { src: "practice-patient-profile.png", caption: "Practice · patient demographics & insurance" },
      { src: "practice-health-history.png", caption: "Practice · clinical health history" },
      { src: "practice-care-threads.png", caption: "Practice · care-thread collaboration (SOAP notes)" },
      { src: "practice-profile.png", caption: "Practice · profile, HIPAA BAA & locations" },
      { src: "patient-mobile-profile-switcher.png", caption: "Patient · family profile switcher (mobile)" },
      { src: "patient-mobile-demographics.png", caption: "Patient · demographics & insurance (mobile)" },
      { src: "patient-mobile-health-history.png", caption: "Patient · health history (mobile)" },
      { src: "patient-mobile-providers.png", caption: "Patient · provider connections (mobile)" },
    ],
  },
  {
    id: "siriusxm",
    name: "SiriusXM",
    dir: "siriusxm/",
    category: "Media / Streaming",
    roleShort: "lead frontend · via Metova",
    role: "Lead Frontend Engineer (Metova)",
    dates: "2017 – 2018",
    teaser:
      "Led an 8-engineer team re-architecting the SiriusXM web player (AngularJS → Angular).",
    thesis:
      "Led an 8-engineer team at Metova re-architecting the SiriusXM web player from AngularJS to Angular — a modern, high-performance live audio & video streaming experience.",
    context:
      "SiriusXM's web player needed to move off AngularJS onto a modern framework. As lead frontend engineer at Metova, I drove the re-architecture, set the testing strategy, and led team delivery for a high-traffic streaming product.",
    built: [
      "Re-architected the SiriusXM web player from AngularJS to Angular for live audio & video streaming.",
      "Led an 8-engineer team, establishing frontend architecture and testing standards.",
      "Raised code coverage from 0% to 80% (Jasmine / Karma), cutting sprint bug rates from ~70% to under 20%.",
    ],
    metrics: [
      { n: "8-eng", label: "team led" },
      { n: "0 → 80%", label: "test coverage" },
      { n: "70 → 20%", label: "sprint bug rate" },
      { n: "AngularJS → Angular", label: "full re-architecture" },
    ],
    stack: ["Angular", "TypeScript", "Streaming Media", "Jasmine / Karma", "Team Lead"],
    shotA: "player-ui.png",
    shotB: "catalog.png",
    diagram: {
      caption: "Led an 8-engineer team; raised coverage 0 → 80% (Jasmine / Karma) and cut sprint bugs ~70% → under 20%.",
      stages: [
        { label: "AngularJS player", sub: "legacy web app" },
        { label: "Angular re-architecture", sub: "modern component SPA" },
        { label: "Live streaming player", sub: "audio & video at scale" },
      ],
    },
  },
  {
    id: "symetra",
    name: "Symetra",
    dir: "symetra/",
    category: "Fortune 500 · Internal",
    roleShort: "email-template platform",
    role: "Lead Frontend Engineer / Product",
    dates: "Consulting",
    teaser:
      "Figma-style visual email editor with live in-canvas rendering + campaign analytics for a Fortune 500 insurer.",
    thesis:
      "Led end-to-end design and build of an internal email-template platform for a Fortune 500 insurer — from product planning and UX to frontend architecture and delivery.",
    context:
      "Symetra’s teams needed to compose branded email templates without engineering help. I owned the whole thing — product planning, UX design, and frontend architecture — for an internal tool used across the company.",
    built: [
      "Designed and built a Figma-style visual editor that composes email templates with live, in-canvas rendering — edit content and see the final email update in real time.",
      "Built campaign analytics into the portal, surfacing template and campaign performance to drive data-informed decisions.",
      "Owned everything from product planning and UX design to frontend architecture and delivery.",
    ],
    metrics: [
      { n: "Figma-style", label: "visual template editor" },
      { n: "Live", label: "in-canvas email rendering" },
      { n: "Analytics", label: "campaign performance built in" },
      { n: "F500", label: "internal platform ownership" },
    ],
    stack: ["Angular", "TypeScript", "Rails", "Canvas / Editor", "UX Design"],
    shotA: "editor-canvas.png",
    shotB: "campaign-analytics.png",
    confidentialNote:
      "Internal platform for a Fortune 500 insurer — interface screenshots omitted for confidentiality.",
  },
  {
    id: "gov-ai",
    name: "Gov Gen-AI Chat",
    dir: "gov-ai/",
    category: "Confidential · Gov",
    roleShort: "air-gapped LLM frontend",
    role: "Senior Frontend Engineer",
    dates: "Consulting",
    teaser:
      "Gemini-style Angular UI over on-prem, air-gapped LLMs — real-time streaming + MCP tool integrations.",
    thesis:
      "Built a production generative-AI chat platform in Angular — a Gemini-style frontend over private, on-prem LLM infrastructure for sensitive government operations.",
    context:
      "A government client needed a secure conversational-AI experience with zero reliance on external APIs. I architected the frontend for an air-gapped, on-prem environment where performance and security were non-negotiable.",
    built: [
      "Gemini-style Angular chat frontend integrating with private, on-prem LLM infrastructure.",
      "Real-time streaming chat responses, MCP (Model Context Protocol) tool integrations, and usage analytics.",
      "Architected for performance and security in an air-gapped / on-prem environment — no external AI APIs.",
    ],
    metrics: [
      { n: "Air-gapped", label: "on-prem, no external APIs" },
      { n: "Streaming", label: "real-time token responses" },
      { n: "MCP", label: "tool-integration protocol" },
      { n: "Prod", label: "secure government deployment" },
    ],
    stack: ["Angular", "TypeScript", "SSE / Streaming", "MCP", "On-prem LLMs"],
    shotA: "chat-stream.png",
    shotB: "tool-calls.png",
    diagram: {
      caption: "Gemini-style chat streaming from private, on-prem models — no external AI APIs.",
      stages: [
        { label: "Angular UI", sub: "Gemini-style chat" },
        { label: "SSE streaming", sub: "real-time token responses" },
        { label: "On-prem LLMs", sub: "air-gapped, no external APIs" },
        { label: "MCP tools", sub: "tool integrations" },
      ],
    },
    confidentialNote:
      "Built for a government client in an air-gapped environment — interface screenshots omitted for confidentiality.",
  },
  {
    id: "hexa",
    name: "Hexa Containment",
    dir: "hexa/",
    category: "B2B SaaS",
    roleShort: "shipment & orders platform",
    role: "Senior Full-Stack Engineer · Consultant",
    dates: "Apr 2022 – Nov 2025",
    teaser:
      "Rails + Angular platform automating $1M+ inventory ops; self-serve portal driving $100K+ online orders.",
    thesis:
      "Architected a Rails + Angular shipment and order-management platform automating $1M+ in inventory operations.",
    context:
      "Hexa ran orders manually over the phone. I built a full platform to automate inventory operations, move customers to self-serve, and cut the manual overhead out of every order.",
    built: [
      "Rails + Angular shipment & order-management platform automating $1M+ in inventory operations.",
      "Customer self-serve portal replacing manual phone orders, driving $100K+ in online transactions.",
      "Loyalty feature generating $15K+ repeat business, plus an AWS email parser that ingests order emails and auto-generates shipping options.",
      "Directed development of a Next.js closed B2B marketplace.",
    ],
    metrics: [
      { n: "$1M+", label: "inventory ops automated" },
      { n: "$100K+", label: "online self-serve orders" },
      { n: "$15K+", label: "loyalty repeat business" },
      { n: "AWS", label: "email-to-order parser" },
    ],
    stack: ["Rails", "Angular", "AWS", "Next.js", "Automation"],
    shotA: "orders-dashboard.png",
    shotB: "self-serve-portal.png",
    diagram: {
      caption: "Automated $1M+ in inventory ops and $100K+ in self-serve orders on a Rails + Angular platform.",
      stages: [
        { label: "Order emails", sub: "AWS parser ingests & extracts items" },
        { label: "Rails API", sub: "orders, inventory, fulfillment" },
        { label: "Angular ops app", sub: "staff workflows" },
        { label: "Self-serve + marketplace", sub: "customer portal + Next.js B2B" },
      ],
    },
  },
  {
    id: "trade-bot",
    name: "Stonkss AI",
    dir: "stonkss-ai/",
    category: "Algorithmic Trading · AI",
    roleShort: "personal · solo build",
    role: "Solo Build",
    dates: "2025",
    teaser:
      "Full-stack, multi-broker algorithmic trading platform — a Claude tool-calling analysis engine and a Discord command interface over the Schwab & Alpaca APIs.",
    thesis:
      "Built a full-stack algorithmic trading platform as an Nx monorepo: a NestJS + Apollo GraphQL API on PostgreSQL, an Angular web client, a Claude-driven analysis engine with tool-calling, and a Discord bot — integrating the Charles Schwab (OAuth2) and Alpaca brokerages plus live market data.",
    context:
      "A personal project to explore agentic LLM tooling and trading systems end to end — giving Claude the right tools to reason over live market data, run technical-analysis strategies, and act through real brokerage APIs, all driven from Discord commands or a web UI.",
    built: [
      "NestJS + Apollo GraphQL API on PostgreSQL/TypeORM, an Angular web client, and Playwright e2e — all in an Nx monorepo.",
      "Claude (Anthropic) analysis engine with a tool-calling layer that runs technical-analysis strategies and entry/exit logic over live market data.",
      "Discord bot interface — scanner, price, and position commands with per-channel authorization and DM support.",
      "Broker abstraction with Charles Schwab (OAuth2) and Alpaca adapters, a scheduled market scanner, Finnhub market data, and encrypted credential storage.",
    ],
    metrics: [
      { n: "NestJS + GraphQL", label: "API on PostgreSQL / TypeORM" },
      { n: "Claude", label: "tool-calling analysis engine" },
      { n: "2 brokers", label: "Schwab (OAuth2) + Alpaca" },
      { n: "Nx monorepo", label: "API + Angular + Discord" },
    ],
    stack: ["TypeScript", "NestJS", "GraphQL", "PostgreSQL", "TypeORM", "Angular", "Claude API", "Discord", "Nx"],
    shotA: "discord-command.png",
    shotB: "trade-analysis.png",
    diagram: {
      caption: "Multi-broker algorithmic trading — Claude-driven analysis over live market data, driven from Discord or the web.",
      stages: [
        { label: "Discord + Angular", sub: "commands & web UI" },
        { label: "NestJS + GraphQL", sub: "API on PostgreSQL / TypeORM" },
        { label: "Claude engine", sub: "tool-calling + technical analysis" },
        { label: "Broker adapters", sub: "Schwab (OAuth2) + Alpaca" },
      ],
    },
  },
];

export interface Role {
  role: string;
  company: string;
  period: string;
  points: string[];
  /** Key technologies used in this role, shown as a per-job tech line. */
  tech?: string[];
}

export const roles: Role[] = [
  {
    role: "Founding Engineer / Lead Full-Stack Engineer",
    company: "Sympliact, Inc",
    period: "Feb 2019 – Present · Part-time · Remote",
    points: [
      "Architected and delivered a healthcare platform from an empty repo to production, owning the entire frontend.",
      "Built Angular Practice & Patient PWAs (plus the marketing site) driving 4,200+ self-service patient sign-ups across 45 states and 260+ active practice staff.",
      "Established CI/CD and quality gates on unit and Playwright integration tests — with automated QA running the Playwright suite both mocked (no backend) and live — for a safe, low-regression release cadence.",
      "Designed a shared NgRx state architecture and offline-capable PWA foundation across both apps — a typed GraphQL client against a Rails API with Auth0 single sign-on.",
    ],
    tech: ["Angular", "TypeScript", "NgRx", "Rails", "GraphQL", "PostgreSQL", "Playwright"],
  },
  {
    role: "Senior Full-Stack Engineer",
    company: "Consultant / Self-Employed",
    period: "Feb 2019 – Present · Contract · Remote",
    points: [
      "Confidential government client — air-gapped, on-prem generative-AI chat platform in Angular (Gemini-style) with real-time streaming, MCP tool integrations, and usage analytics.",
      "Symetra (Fortune 500 insurance) — Figma-style email-template studio with live in-canvas rendering and campaign analytics; owned product, UX, and frontend.",
    ],
    tech: ["Angular", "TypeScript", "Rails", "SSE Streaming", "MCP"],
  },
  {
    role: "Lead Full-Stack Engineer · Consultant",
    company: "Hexa Containment",
    period: "Apr 2022 – Nov 2025 · Contract · Remote",
    points: [
      "Architected a Rails + Angular shipment & order-management platform that automated $1M+ in annual inventory operations.",
      "Launched a customer self-serve portal replacing manual phone ordering — $100K+ in online transactions — plus a loyalty feature generating $15K+ in repeat business.",
      "Built an AWS email-parsing pipeline that ingests order emails and auto-generates shipping options, and directed development of a Next.js closed B2B marketplace.",
    ],
    tech: ["Rails", "Angular", "Next.js", "AWS", "PostgreSQL"],
  },
  {
    role: "Senior Full-Stack Engineer",
    company: "Otus",
    period: "Sep 2021 – Feb 2022 · Remote",
    points: [
      "Led the migration of Login, Sign-up, and User-Management modules to a micro-frontend architecture for independent deploys and easier scaling.",
    ],
    tech: ["Angular", "Micro-frontends", "TypeScript", "Jest"],
  },
  {
    role: "Lead Software Engineer",
    company: "Airvel",
    period: "Feb 2019 – Oct 2019 · Remote",
    points: [
      "Built the Airvel B2B marketplace and flight-management site full-stack — Angular front end, Node.js + Apollo Federation GraphQL API, and Stripe Card + ACH payments ($50K–$150K).",
    ],
    tech: ["Angular", "Node.js", "Apollo GraphQL", "Stripe", "GCP"],
  },
  {
    role: "Front End Developer",
    company: "axialHealthcare",
    period: "Aug 2018 – Jan 2019 · Remote",
    points: [
      "Built clinician-facing Angular features supporting opioid-addiction case management.",
    ],
    tech: ["Angular", "TypeScript", "RxJS"],
  },
  {
    role: "Lead Frontend Engineer",
    company: "Metova, Inc.",
    period: "2015 – 2018 · Franklin, TN",
    points: [
      "Led an 8-engineer team re-architecting the SiriusXM web player (AngularJS → Angular) for live audio & video streaming.",
      "Raised code coverage from 0% to 80% (Jasmine / Karma), cutting sprint bug rates from ~70% to under 20%.",
      "Grew from full-stack intern to team lead over three years; earlier shipped a Ruby on Rails e-reader platform.",
    ],
    tech: ["Angular", "TypeScript", "Streaming Media", "Jasmine / Karma", "Rails"],
  },
];

// Résumé header + sections not derivable from roles[]/skills[].
export interface Education {
  school: string;
  detail: string;
  period: string;
}

export const resume = {
  name: "Camden Brown",
  title: "Founding Engineer · Full-Stack Developer",
  location: "Cookeville, TN · Remote",
  summary:
    "Full-stack TypeScript engineer — Angular on the front end, Node and GraphQL on the back, plus Rails where it fits. Seven years building Sympliact's healthcare platform from an empty repo to production — now driving 4,200+ patient sign-ups across 45 states — alongside consulting across health-tech, government, and B2B SaaS. I care about clean architecture, automated quality gates, and shipping fast without breaking trust.",
  education: [
    {
      school: "Tennessee Technological University",
      detail: "Computer Science",
      period: "Cookeville, TN",
    },
  ] as Education[],
};

export const skills: string[] = [
  "Angular",
  "TypeScript",
  "Node.js",
  "RxJS",
  "Next.js",
  "GraphQL",
  "Rails",
  "AWS",
  "PostgreSQL",
  "Playwright",
  "RAG / LLMs",
  "Stripe",
];

// Social / contact links.
export const links = {
  github: "https://github.com/camden-brown",
  linkedin: "https://www.linkedin.com/in/camden-brown-b6287384/",
  email: "mailto:camdenebrown@gmail.com",
  emailAddress: "camdenebrown@gmail.com",
};
