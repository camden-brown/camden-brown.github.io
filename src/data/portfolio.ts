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
      "Quality gates sustaining ~80% coverage — unit tests plus a mocked Playwright acceptance harness that exercises full flows with no backend required.",
    ],
    metrics: [
      { n: "500+", label: "weekly patient sign-ups" },
      { n: "200+", label: "active staff users" },
      { n: "80%", label: "sustained test coverage" },
      { n: "2 PWAs", label: "practice + patient" },
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
    ],
    shotA: "practice-scheduling.png",
    shotB: "patient-records.png",
    shotDir: "sympliact",
    overview:
      "Sympliact is a healthcare collaboration platform connecting medical practices with their patients. Practices run scheduling, patient management, and multi-channel patient communication from an admin web app; patients manage their own health records, connect to their providers, and message their care team from a companion app. Both are Angular PWAs sharing one Rails + GraphQL backend — built and owned end-to-end as the founding engineer over seven years, from an empty repo to production.",
    engineering: [
      "Two Angular PWAs (practice + patient) sharing typed GraphQL models against a Rails API — installable and offline-capable via a service worker.",
      "NgRx (store + effects) for predictable state across both apps, with Angular Material and a custom design system for the UI.",
      "Auth0 (Authorization Code + PKCE) authentication shared across the practice and patient experiences.",
      "Rails + GraphQL backend on PostgreSQL, with Elasticsearch-powered patient search and Sidekiq background jobs.",
      "A bespoke mocked Playwright acceptance harness — every screen exercises full flows against intercepted GraphQL with a forged Auth0 session, no backend required — behind an ~80% coverage gate.",
      "CI/CD with semantic-release, Sentry error monitoring, and PostHog product analytics.",
    ],
    gallery: [
      { src: "practice-scheduling.png", caption: "Practice · resource scheduling calendar" },
      { src: "practice-patients.png", caption: "Practice · patient roster" },
      { src: "practice-metrics.png", caption: "Practice · billing & metrics" },
      { src: "patient-records.png", caption: "Patient · health history" },
      { src: "patient-providers.png", caption: "Patient · provider connections" },
      { src: "patient-appointments.png", caption: "Patient · upcoming appointments" },
      { src: "patient-care-threads.png", caption: "Patient · care threads" },
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
  },
  {
    id: "trade-bot",
    name: "AI Trade Bot",
    dir: "trade-bot/",
    category: "AI · Side Project",
    roleShort: "personal · 2025",
    role: "Solo Build",
    dates: "Oct 2025",
    teaser:
      "Discord trading assistant — Claude-driven trade reasoning over live market data, RAG, and the Schwab API.",
    thesis:
      "Built a Discord bot that reasons about trades with Claude, combining retrieval-augmented context, live market-data APIs, and technical-analysis tools over a Schwab brokerage integration.",
    context:
      "A personal project to explore agentic LLM tooling end to end: give Claude the right context and tools to reason about real market data and surface trade ideas, all from a natural-language Discord command.",
    built: [
      "Discord bot that turns natural-language commands into Claude-driven trade reasoning.",
      "Retrieval-augmented pipeline blending live market-data APIs and technical-analysis tools as model context.",
      "Schwab API integration for live account and market data.",
    ],
    metrics: [
      { n: "Claude", label: "trade-reasoning engine" },
      { n: "RAG", label: "market-data + TA context" },
      { n: "Schwab API", label: "live brokerage integration" },
      { n: "Discord", label: "chat-native interface" },
    ],
    stack: ["Claude API", "RAG", "Market Data APIs", "Schwab API", "Discord"],
    shotA: "discord-command.png",
    shotB: "trade-analysis.png",
  },
];

export interface Role {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export const roles: Role[] = [
  {
    role: "Founding Engineer / Lead Full-Stack Engineer",
    company: "Sympliact, Inc",
    period: "Feb 2019 – Present · Part-time · Remote",
    points: [
      "Architected and delivered an end-to-end healthcare platform from greenfield to production, owning all frontend development.",
      "Built Angular Practice & Patient PWAs (plus the marketing site) scaling to 500+ weekly patient sign-ups and 200+ active staff users.",
      "Established CI/CD and quality gates sustaining 80% test coverage across 90% of feature work, with a safe, low-regression release cadence.",
      "Applied Lean Startup principles to drive rapid delivery as the sole frontend developer, shaping high-impact technical and business decisions.",
    ],
  },
  {
    role: "Senior Full-Stack Engineer",
    company: "Consultant / Self-Employed",
    period: "Feb 2019 – Present · Contract · Remote",
    points: [
      "Hexa Containment — Rails + Angular platform automating $1M+ inventory ops, a $100K+ self-serve portal, a $15K+ loyalty feature, an AWS email parser, and a Next.js B2B marketplace.",
      "Confidential government client — air-gapped, on-prem generative-AI chat platform in Angular (Gemini-style) with real-time streaming, MCP tool integrations, and usage analytics.",
      "Symetra (Fortune 500 insurance) — Figma-style email-template studio with live in-canvas rendering and campaign analytics; owned product, UX, and frontend.",
    ],
  },
  {
    role: "Senior Full-Stack Engineer",
    company: "Otus",
    period: "Sep 2021 – Feb 2022 · Remote",
    points: [
      "Partnered with the Principal Frontend Engineer on architecture — micro-frontends, refactoring strategy, and testing standards — improving scalability and maintainability.",
      "Drove scalable, maintainable solutions for authentication / authorization microservices alongside backend leadership.",
      "Led architectural planning to convert Login, Sign-up, and User-Management modules to micro-frontend patterns.",
    ],
  },
  {
    role: "Lead Software Engineer",
    company: "Airvel",
    period: "Feb 2019 – Oct 2019 · Remote",
    points: [
      "Led implementation of the Airvel marketplace and flight-management site for businesses, full-stack in Angular.",
      "Architected an efficient, scalable API using Apollo Federated GraphQL with the backend team.",
      "Integrated Stripe for secure Card + ACH payments in the $50K–$150K range.",
    ],
  },
  {
    role: "Front End Developer",
    company: "axialHealthcare",
    period: "Aug 2018 – Jan 2019 · Remote",
    points: [
      "Built key features for a pharmacist-focused Angular application supporting opioid-addiction management.",
      "Took the initiative to learn iOS development, proof-of-concepting ideas and expanding the platform's direction.",
    ],
  },
  {
    role: "Lead Frontend Engineer",
    company: "Metova, Inc.",
    period: "2015 – 2018 · Franklin, TN",
    points: [
      "Led an 8-engineer team re-architecting the SiriusXM web player (AngularJS → Angular) for live audio & video streaming.",
      "Raised code coverage from 0% to 80% (Jasmine / Karma), cutting sprint bug rates from ~70% to under 20%.",
      "Applied The Phoenix Project principles to build the org's highest-velocity team; grew from full-stack intern to lead, including a Ruby on Rails e-reader platform.",
    ],
  },
];

export const skills: string[] = [
  "Angular",
  "TypeScript",
  "RxJS",
  "Next.js",
  "Rails",
  "GraphQL",
  "AWS",
  "PostgreSQL",
  "CI/CD",
  "Jest / Cypress",
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
