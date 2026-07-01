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
}

export const projects: Project[] = [
  {
    id: "sympliact",
    name: "Sympliact",
    dir: "sympliact/",
    category: "Health Tech",
    roleShort: "founding engineer · 2019–now",
    role: "Founding Engineer · Lead Full-Stack",
    dates: "Feb 2019 – Present",
    teaser:
      "End-to-end healthcare platform, greenfield → production. Angular practice & patient apps at 500+ weekly sign-ups.",
    thesis:
      "Architected and delivered an end-to-end healthcare platform from greenfield to production — owning all frontend development as the founding engineer.",
    context:
      "A greenfield healthcare product with no engineering foundation. I joined as founding engineer to build the practice and patient experiences, set technical direction, and make releases safe enough for a regulated, high-stakes domain.",
    built: [
      "Angular Practice & Patient platforms scaling to 500+ weekly sign-ups and 200+ active staff users.",
      "Automated CI/CD pipelines and quality gates sustaining 80% coverage across 90% of feature work.",
      "Lean-startup delivery as sole frontend dev, driving high-impact technical and business decisions.",
    ],
    metrics: [
      { n: "500+", label: "weekly patient sign-ups" },
      { n: "200+", label: "active staff users" },
      { n: "80%", label: "sustained test coverage" },
      { n: "7 yrs", label: "sole FE owner, greenfield → prod" },
    ],
    stack: [
      "Angular",
      "TypeScript",
      "RxJS",
      "CI/CD",
      "Jest / Cypress",
      "HIPAA-aware",
    ],
    shotA: "patient-dashboard.png",
    shotB: "scheduling.png",
  },
  {
    id: "siriusxm",
    name: "SiriusXM",
    dir: "siriusxm/",
    category: "Media / Lead",
    roleShort: "technical PM · lead",
    role: "Technical Project Manager · Team Lead",
    dates: "Contract",
    teaser:
      "Led the team and managed delivery of an Angular 2 frontend rewrite.",
    thesis:
      "Led a team of engineers to rewrite the SiriusXM web frontend in Angular 2 — owning delivery and project management end to end.",
    context:
      "SiriusXM needed a modern web frontend. I stepped in as technical project manager and lead — coordinating engineers, defining scope, and keeping delivery on track through a full framework migration.",
    built: [
      "Rewrote the SiriusXM web frontend in Angular 2.",
      "Led and coordinated a team of engineers as technical project manager.",
      "Owned scope, planning, and delivery across the migration.",
    ],
    metrics: [
      { n: "Lead", label: "engineering team + delivery" },
      { n: "Angular 2", label: "full framework migration" },
      { n: "End-to-end", label: "scope → ship" },
    ],
    stack: ["Angular 2", "TypeScript", "Team Lead", "Delivery"],
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
    dates: "Consulting",
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
];

export interface Role {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export const roles: Role[] = [
  {
    role: "Founding Engineer / Lead Full-Stack",
    company: "Sympliact, Inc",
    period: "Feb 2019 – Present · Remote",
    points: [
      "Architected an end-to-end healthcare platform from greenfield to production, managing all frontend development.",
      "Built Angular practice & patient platforms scaling to 500+ weekly sign-ups and 200+ active staff users.",
      "Established CI/CD pipelines and quality gates sustaining 80% coverage and a low-regression release cadence.",
    ],
  },
  {
    role: "Senior Full-Stack Engineer",
    company: "Consultant / Self-Employed",
    period: "Feb 2019 – Present · Remote",
    points: [
      "Symetra — Figma-style email-template studio with live rendering + campaign analytics for a Fortune 500 insurer.",
      "Confidential government client — air-gapped generative-AI chat platform in Angular with streaming + MCP tools.",
      "Hexa Containment — Rails + Angular platform automating $1M+ inventory ops and $100K+ self-serve orders.",
    ],
  },
  {
    role: "Technical Project Manager · Lead",
    company: "SiriusXM",
    period: "Prior",
    points: [
      "Led a team of engineers to rewrite the SiriusXM web frontend in Angular 2.",
      "Owned project management, scope, and delivery across the migration.",
    ],
  },
];

export const skills: string[] = [
  "Angular",
  "TypeScript",
  "RxJS",
  "Rails",
  "Next.js",
  "AWS",
  "CI/CD",
  "Jest",
  "Cypress",
  "MCP",
  "Streaming / SSE",
  "UX Design",
];

// Social / contact links.
export const links = {
  github: "https://github.com/camden-brown",
  linkedin: "https://www.linkedin.com/in/camden-brown-b6287384/",
  email: "mailto:camdenebrown@gmail.com",
  emailAddress: "camdenebrown@gmail.com",
};
