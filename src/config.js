/**
 * =====================================================================
 * THE MASTER CONFIGURATION FILE
 * =====================================================================
 * Controlled in one single place. Updates across all pages instantly.
 */

export const CONFIG = {
  // BRAND IDENTITY (Hidden before the ribbon is cut!)
  companyName: "OMBRIX", // << Change company name here
  shortName: "OMBRIX",
  tagline: "The Grand Inauguration & Official Name Reveal.",
  subTagline: "Founded together, celebrated together. A milestone moment uniting our entire cohort.",
  foundedYear: 2026,
  launchDate: "2026-12-31T00:00:00.000Z",

  // PRE-CEREMONY MYSTERY STAGE
  mystery: {
    eventTitle: "THE GRAND INAUGURAL CEREMONY",
    eventSubtitle: "OFFICIAL COMPANY NAME REVEAL & CONCERT CELEBRATION",
    badge: "CONFIDENTIAL PROTOCOL // RIBBON INTACT",
    hint: "Cut the ribbon with the golden shears to launch the company and trigger the celebration!",
    statusLine: "MEMBERS ASSEMBLED • CEREMONIAL STAGE READY",
  },

  // PRELOADER PHRASES
  preloaderPhrases: [
    "Preparing the inaugural concert stage & lighting rigs...",
    "Polishing the 24-karat ceremonial golden shears...",
    "Ironing the royal crimson ribbon and ceremonial silk drape...",
    "Synthesizing celebratory fanfare, chimes, and stadium fireworks...",
    "Tuning the live audio synthesizers and festival speakers...",
    "Welcoming all group members to the celebration...",
    "Ready for the grand inaugural ribbon-cutting..."
  ],

  // STRATEGIC RESEARCH & SYSTEM DOMAINS
  pillars: [
    { title: "AI/ML Flood Prediction", metric: "Neural Temporal Models", icon: "activity" },
    { title: "Computer Vision Detection", metric: "Satellite & Drone Stream", icon: "cpu" },
    { title: "System Architecture", metric: "Distributed Resilient Mesh", icon: "layers" },
    { title: "Weather API & Telemetry", metric: "Atmospheric Sensor Sync", icon: "cloud" }
  ],

  // REGISTERED GROUP MEMBERS (Populated directly from form submissions)
  registeredMembers: [
    {
      id: "mem-1",
      name: "Rishabh",
      domain: "System Architecture",
      status: "Active",
      examNote: null,
      timestamp: "2026/11/16 9:25:23 am",
      badge: "Architecture Lead"
    },
    {
      id: "mem-2",
      name: "Sahara Singh",
      domain: "Computer Vision – Flood Detection",
      status: "Active",
      examNote: null,
      timestamp: "2026/11/15 11:42:07 pm",
      badge: "Core Researcher"
    },
    {
      id: "mem-3",
      name: "Divyanshu Jha",
      domain: "AI/ML – Flood Prediction",
      status: "In Exams",
      examNote: "Active exams — Available post 8th December",
      timestamp: "2026/11/15 11:49:48 pm",
      badge: "AI/ML Specialist"
    },
    {
      id: "mem-4",
      name: "Rushil",
      domain: "AI/ML – Flood Prediction",
      status: "Active",
      examNote: null,
      timestamp: "2026/11/16 1:09:25 am",
      badge: "Core Researcher"
    },
    {
      id: "mem-5",
      name: "Navrattna Jaiswal",
      domain: "Weather API",
      status: "Active",
      examNote: null,
      timestamp: "2026/11/16 9:18:38 am",
      badge: "Core Researcher"
    },
    {
      id: "mem-6",
      name: "Rohit Mestry",
      domain: "AI/ML – Flood Prediction",
      status: "Active",
      examNote: null,
      timestamp: "2026/11/16 9:32:25 am",
      badge: "AI/ML Specialist"
    },
    {
      id: "mem-7",
      name: "Aayan Khan",
      domain: "System Architecture",
      status: "Active",
      examNote: null,
      timestamp: "2026/11/16 12:43:11 pm",
      badge: "Systems Engineer"
    },
    {
      id: "mem-8",
      name: "Kshitij Kelkar",
      domain: "Weather API & System Architecture",
      status: "In Exams",
      examNote: "Active exams — Joining early December",
      timestamp: "2026/11/16 1:04:43 pm",
      badge: "Telemetry & Systems"
    },
    {
      id: "mem-9",
      name: "Lakshitha",
      domain: "Data Collection",
      status: "Active",
      examNote: null,
      timestamp: "2026/11/16 1:33:34 pm",
      badge: "Data Scientist"
    },
    {
      id: "mem-10",
      name: "Kriti Shah",
      domain: "AI/ML – Flood Prediction",
      status: "In Exams",
      examNote: "University Exams: 18th Nov – 18th Dec",
      timestamp: "2026/11/16 1:48:08 pm",
      badge: "AI/ML Researcher"
    },
    {
      id: "mem-11",
      name: "Tejasvi",
      domain: "Data Collection",
      status: "In Exams",
      examNote: "University Exams — Free post 1st December",
      timestamp: "2026/11/16 2:48:51 pm",
      badge: "Data Collection Lead"
    },
    {
      id: "mem-12",
      name: "Ansh Santosh Kadam",
      domain: "Data Collection",
      status: "Active",
      examNote: null,
      timestamp: "2026/11/16 3:55:49 pm",
      badge: "Data Specialist"
    },
    {
      id: "mem-13",
      name: "Harshali Salvi",
      domain: "Computer Vision – Flood Detection",
      status: "Active",
      examNote: null,
      timestamp: "2026/11/16 5:21:15 pm",
      badge: "Computer Vision Lead"
    },
    {
      id: "mem-14",
      name: "Jainesh Jhaverii",
      domain: "AI/ML – Flood Prediction",
      status: "Active",
      examNote: null,
      timestamp: "2026/11/16 6:21:59 pm",
      badge: "AI/ML Engineer"
    },
    {
      id: "mem-15",
      name: "Sarthak Deore",
      domain: "Weather API",
      status: "Active",
      examNote: null,
      timestamp: "2026/11/16 6:53:23 pm",
      badge: "API & Data Integrator"
    }
  ],

  // EXAM & COHORT STATISTICS
  examStats: {
    registeredCount: 15,
    inExamsCount: 5,
    pendingFormSubmissions: 14, // Students currently appearing for exams before registration
    totalProjectedTeam: 29
  },

  // VENTURE UNIVERSE (The 6 core research initiatives)
  products: [
    {
      id: "venture-1",
      code: "VENTURE ALPHA",
      codename: "HydraVision Drone Mesh",
      category: "Computer Vision",
      teaser: "Real-time aerial inundation detection from satellite SAR & drone footage.",
      revealedTitle: "Inundation CV Engine",
      revealedDescription: "Deep convolutional segmentation network that analyzes urban and riverine water flow in real time.",
      ribbonColor: "#DC2626",
      status: "locked",
      eta: "Q1 2027",
      features: ["Sub-pixel water edge segmentation", "SAR radar penetration in heavy cloud", "Autonomous drone flight path feed"]
    },
    {
      id: "venture-2",
      code: "VENTURE BETA",
      codename: "DeepFlood Temporal Predictor",
      category: "AI/ML Predictive",
      teaser: "LSTM & Transformer architecture predicting catchment overflow 72 hours ahead.",
      revealedTitle: "Catchment Predictive Kernel",
      revealedDescription: "High-throughput deterministic AI model running multi-basin hydrologic simulations with zero drift.",
      ribbonColor: "#D4AF37",
      status: "locked",
      eta: "Q2 2027",
      features: ["72-hour advance flood crest warning", "Soil saturation neural modeling", "Urban drainage backflow prediction"]
    },
    {
      id: "venture-3",
      code: "VENTURE GAMMA",
      codename: "AtmosphereSync Weather Gateway",
      category: "Weather API",
      teaser: "Micro-climate Doppler & atmospheric radar ingestion pipeline.",
      revealedTitle: "Atmospheric Telemetry Bridge",
      revealedDescription: "Ultra-fast ingestion pipeline pulling live precipitation, barometric gradients, and cloudburst vectors across 500+ weather stations.",
      ribbonColor: "#00F0FF",
      status: "locked",
      eta: "Q3 2027",
      features: ["Sub-second radar sweep sync", "Hyper-local rainfall classification", "Open API endpoint suite"]
    },
    {
      id: "venture-4",
      code: "VENTURE DELTA",
      codename: "Resilient Mesh Architecture",
      category: "System Architecture",
      teaser: "Distributed disaster-resilient cloud mesh operating during severe power outages.",
      revealedTitle: "Disaster Core Mesh",
      revealedDescription: "Distributed mesh cluster designed for uninterrupted uptime, disaster dispatch orchestration, and edge deployment.",
      ribbonColor: "#E11D48",
      status: "locked",
      eta: "Q4 2027",
      features: ["Edge-offline synchronization", "Zero single point of failure", "Civil authority dispatch relay"]
    },
    {
      id: "venture-5",
      code: "VENTURE EPSILON",
      codename: "GeoCollector Data Pipeline",
      category: "Data Collection",
      teaser: "Crowdsourced geo-tagged field sensory pipeline and river gauge validation.",
      revealedTitle: "GeoCollector Sensory Pipeline",
      revealedDescription: "Real-time field sensory pipeline aggregating IoT river ultrasonic gauges, civic water markers, and crowdsourced emergency tags.",
      ribbonColor: "#F59E0B",
      status: "locked",
      eta: "2028",
      features: ["Ultrasonic river level telemetry", "Cryptographically signed reports", "Low-bandwidth SMS fallback"]
    },
    {
      id: "venture-6",
      code: "VENTURE ZETA",
      codename: "Civilian Alert Sanctuary",
      category: "Public Safety",
      teaser: "Evacuation route mapping and community safety broadcast app.",
      revealedTitle: "LifeSafety Broadcast Suite",
      revealedDescription: "Instant hyper-targeted push broadcast alerting civilians to verified safe zones, high-ground evacuation, and relief centers.",
      ribbonColor: "#0284C7",
      status: "locked",
      eta: "2028",
      features: ["Multi-lingual audio siren", "Offline topographic evacuation maps", "Family rescue check-in"]
    }
  ],

  // STORY MILESTONES
  storyMilestones: [
    {
      id: "the-epiphany",
      tag: "Phase 01",
      title: "The Founding Realization",
      time: "November 2026",
      description: "Flood disasters don't wait for fragmented tools. We realized we needed a unified collective uniting Machine Learning, Computer Vision, Weather Telemetry, and System Architecture under one powerful company.",
      badge: "Core Vision",
      illustration: "lightbulb-spark"
    },
    {
      id: "the-chai-meeting",
      tag: "Phase 02",
      title: "Forming The Research Cohort",
      time: "Mid November 2026",
      description: "The registration form opened. 15 elite engineers and researchers immediately stepped forward to claim leads across flood prediction, computer vision, and system architecture, while cohort peers coordinated exam schedules.",
      badge: "15 Researchers",
      illustration: "chai-cup"
    },
    {
      id: "the-whiteboard",
      tag: "Phase 03",
      title: "System Architecture & AI Blueprint",
      time: "Late November 2026",
      description: "Architecting the end-to-end data pipeline: weather APIs feeding into temporal LSTM models, drone vision segmenting flood boundaries, and distributed systems ensuring zero downtime.",
      badge: "Architecture Set",
      illustration: "whiteboard"
    },
    {
      id: "the-decision",
      tag: "Phase 04",
      title: "The Ceremonial Declaration",
      time: "December 2026",
      description: "Marking our collective launch not with a whisper, but with a grand inaugural ribbon-cutting ceremony as members finish semester exams and mobilize into active research.",
      badge: "Inaugural Ceremony",
      illustration: "gavel"
    },
    {
      id: "today",
      tag: "Phase 05",
      title: "Today: The Ribbon is Cut",
      time: "Today",
      description: "The ceremonial shears are golden. The red ribbon is cut. The company identity is revealed. The journey begins.",
      badge: "Day One",
      illustration: "crown"
    }
  ],

  // ROADMAP STEPS
  roadmapSteps: [
    {
      phase: "Milestone 01",
      title: "Official Company Inauguration & Cohort Assembly",
      date: "Nov 2026 (Today)",
      desc: "Sever the ceremonial ribbon, reveal the company brand, and officially register our initial 15 researchers across 5 domains.",
      status: "current"
    },
    {
      phase: "Milestone 02",
      title: "Exam Completion & Full Cohort Onboarding",
      date: "Dec 18, 2026",
      desc: "Cohort members complete semester university exams (Divyanshu, Kriti, Kshitij, Tejasvi and upcoming members) and onboard into full-time model training.",
      status: "upcoming"
    },
    {
      phase: "Milestone 03",
      title: "AI/ML Predictor & CV Drone Mesh Beta",
      date: "Q1 2027",
      desc: "Debut the 72-hour flood catchment predictor and satellite/drone computer vision detection pipeline.",
      status: "upcoming"
    },
    {
      phase: "Milestone 04",
      title: "Disaster Mesh & Field Sensor Deployment",
      date: "Q2 2027",
      desc: "Deploy IoT river gauge telemetry and operationalize the resilient distributed mesh architecture.",
      status: "upcoming"
    },
    {
      phase: "Milestone 05",
      title: "Nationwide Civil Defense Integration",
      date: "2027 & Beyond",
      desc: "Scale the platform to provide automated live telemetry to national emergency management agencies.",
      status: "upcoming"
    }
  ],

  // SOCIALS & FOOTER
  footerJoke: "© 2026 FLOODGUARD AI. Built by an elite research and engineering collective.",
  socials: [
    { name: "GitHub Collective", url: "https://github.com", handle: "floodguard-ai" },
    { name: "Research Portal", url: "#", handle: "Consortium Registry" },
    { name: "Discord Lounge", url: "https://discord.com", handle: "Research Sync" }
  ]
};
