export const profile = {
  name: "Somnath Chattaraj",
  role: "Software engineer",
  location: "Kolkata, India",
  email: "somnathchattaraj5@gmail.com",
  github: "https://github.com/Somnath-Chattaraj",
  linkedin: "https://www.linkedin.com/in/somnath-chattaraj910/",
  resume: "/resume.pdf",
  site: "https://portfolio.somnathc.xyz",
};

export const projects = [
  {
    id: "01",
    kind: "On-chain infrastructure",
    title: "EcoX",
    subtitle: "Carbon offset & environmental verification engine",
    summary:
      "An authorized ERC-721 minting pipeline that turns certificate-derived quantities into tradable carbon-credit tokens on Avalanche.",
    detail:
      "Gemini extracts company and emissions data; Pinata stores IPFS metadata. Ethers waits for a mint receipt before refreshing a Prisma/PostgreSQL mirror. Chainlink Automation settles eligible marketplace auctions.",
    metric: "ERC-721 × IPFS",
    qualifier: "receipt-first issuance pipeline",
    tools: [
      "Solidity",
      "Avalanche",
      "Ethers",
      "IPFS / Pinata",
      "React",
      "Express",
      "Prisma / PostgreSQL",
    ],
    flow: ["Extract", "Mint", "Reconcile"],
    tone: "sage",
    source: "https://github.com/Somnath-Chattaraj/EcoNFT",
    demo: "https://ecox.wedevs.xyz/login",
    demoLabel: "Live platform",
    image: "/projects/ecox.png",
    imageWidth: 1280,
    imageHeight: 800,
    imageAlt:
      "Actual EcoX authentication screen with email login and carbon-credit artwork",
    capture: "Live authentication interface",
    architecture: [
      "An owner/minter allowlist guards minting. Tokens store quantity, expiry, retirement state, and a certificate URI; retirement burns the NFT and records reward points.",
      "The verification endpoint uploads the certificate, extracts fields, pins metadata, mints, waits for a receipt, then calls an off-chain upsert by token ID.",
    ],
    tradeoff:
      "Chain and database writes are separate; the refresh is not awaited by the response path. Reconciliation and validation of LLM-extracted quantities remain important consistency boundaries.",
    evidence: [
      {
        label: "Token mechanics",
        url: "https://github.com/Somnath-Chattaraj/EcoNFT/blob/e885287afc2c9f4d04910d3b7af4849cd4afb004/SmartContract/src/CarbonCreditsNFT2.0.sol",
      },
      {
        label: "Issuance pipeline",
        url: "https://github.com/Somnath-Chattaraj/EcoNFT/blob/e885287afc2c9f4d04910d3b7af4849cd4afb004/backend/src/controllers/projectVerification.controller.ts",
      },
    ],
    mediaLabel: "ecox.wedevs.xyz/login",
  },
  {
    id: "02",
    kind: "Distributed workflow orchestration",
    title: "AutoFlow",
    subtitle: "Webhook-to-worker automation engine",
    summary:
      "A four-service workflow system built around a PostgreSQL outbox and Kafka’s zap-events topic, with ordered email and Solana transfer actions.",
    detail:
      "The hooks service writes ZapRun and ZapRunOutbox together. A processor polls ten outbox rows every three seconds; workers consume stage-indexed events, interpolate payload fields, and publish the next stage.",
    metric: "zap-events",
    qualifier: "PostgreSQL outbox → Kafka → worker",
    tools: [
      "TypeScript",
      "KafkaJS",
      "Express",
      "Prisma / PostgreSQL",
      "Solana web3.js",
      "SMTP",
    ],
    flow: ["Webhook", "Outbox", "Worker"],
    tone: "sand",
    source: "https://github.com/Somnath-Chattaraj/Zapier",
    demo: "https://youtu.be/30KZ1txxvWY",
    demoLabel: "Video walkthrough",
    video: true,
    architecture: [
      "User → Zap → Trigger / ordered Actions describes definitions. ZapRun retains input metadata; ZapRunOutbox bridges committed runs into the event bus. Each service keeps a local Prisma schema.",
      "The worker disables auto-commit, executes the matching sortingOrder stage, and commits offset + 1. Actions include SMTP email and a signed SOL transfer on Solana testnet through JSON-RPC.",
    ],
    tradeoff:
      "The processor does not await Kafka publication before deleting outbox rows; the worker commits failed action offsets. This is a prototype delivery model, without an exactly-once guarantee or automatic action retries.",
    evidence: [
      {
        label: "Outbox processor",
        url: "https://github.com/Somnath-Chattaraj/Zapier/blob/ee4ea316b351bdbc9edb5887a797d1a61b528a04/processor/src/index.ts",
      },
      {
        label: "Stage worker",
        url: "https://github.com/Somnath-Chattaraj/Zapier/blob/ee4ea316b351bdbc9edb5887a797d1a61b528a04/worker/src/index.ts",
      },
    ],
    image: "/projects/autoflow.png",
    capture: "AutoFlow · supplied project image",
    imageAlt:
      "AutoFlow landing page with Automate as fast as you can type headline",
    mediaLabel: "AutoFlow / supplied capture",
    imageWidth: 2472,
    imageHeight: 1456,
  },
  {
    id: "03",
    kind: "Observability & remediation",
    title: "AI_SRE",
    subtitle: "Incident detection, retrieval & patch orchestration",
    summary:
      "A rule-gated anomaly pipeline connects Prometheus probes to a BullMQ worker pool, then retrieves source context for LLM-generated patches and GitHub pull requests.",
    detail:
      "A 15-second scheduler fans out checks to ten concurrent workers. Downtime, HTTP 5xx, or sustained latency spikes gate AI analysis; confidence below 0.7 and a five-minute incident cooldown suppress escalation.",
    metric: "15s / 10 workers",
    qualifier: "configured scheduler / queue concurrency",
    tools: [
      "TypeScript / Bun",
      "BullMQ / Redis",
      "Prometheus",
      "Prisma / MongoDB",
      "Chroma",
      "MiniLM",
      "Cerebras",
    ],
    flow: ["Probe", "Retrieve", "Patch / PR"],
    tone: "blue",
    source: "https://github.com/Somnath-Chattaraj/AI_SRE",
    demo: null,
    image: "/projects/ai_sre.png",
    imageWidth: 1440,
    imageHeight: 950,
    imageAlt:
      "Locally built AI_SRE OpSmith dashboard showing its empty overview, service panels, and activity area",
    capture: "Local build · API disconnected · no seeded telemetry",
    architecture: [
      "Latency detection requires both latest samples above 3σ and two seconds. BullMQ jobs have three attempts with exponential backoff. Source is split into 1,500-character chunks with 200-character overlap, embedded with MiniLM, and upserted into Chroma.",
      "The patcher deduplicates multi-query retrieval, generates search/replace patches, validates paths, creates patch/<incidentId>, commits, records a health check, and attempts a GitHub PR through the REST API.",
    ],
    tradeoff:
      "The inspected patcher does not execute patches in an isolated sandbox or run a build/test suite. Its health check does not gate PR creation. The screenshot is a real local UI capture, not evidence of an active production incident.",
    evidence: [
      {
        label: "Anomaly rules",
        url: "https://github.com/Somnath-Chattaraj/AI_SRE/blob/a8324450d656a239b6e31c21e8ef9e7231d45cc6/sre_anomaly/src/services/anomaly.service.ts",
      },
      {
        label: "Patch lifecycle",
        url: "https://github.com/Somnath-Chattaraj/AI_SRE/blob/a8324450d656a239b6e31c21e8ef9e7231d45cc6/patcher-rag/src/main.ts",
      },
    ],
    mediaLabel: "localhost:3001/dashboard",
  },
  {
    id: "04",
    kind: "Community platform",
    title: "Campus Chatter",
    subtitle: "Identity-aware campus discussions",
    summary:
      "A discussion platform combining reCAPTCHA-backed registration, academic-domain classification, cookie-based JWT authentication, and college/course relationships.",
    detail:
      "Express routes read relational posts, comments, and likes through Prisma/PostgreSQL. Redis caches feed/search results; Fuse.js performs in-memory fuzzy search over plain-text post content.",
    metric: "100 requests / 60s",
    qualifier: "configured per-user Redis rate limit",
    tools: [
      "React",
      "Express",
      "Prisma / PostgreSQL",
      "Redis",
      "JWT",
      "reCAPTCHA",
      "Fuse.js",
    ],
    flow: ["Identity", "Community", "Discussion"],
    tone: "sage",
    source: "https://github.com/Somnath-Chattaraj/Campus-Chatter",
    demo: "https://www.campusify.space",
    demoLabel: "Website",
    architecture: [
      "Registration verifies reCAPTCHA and classifies institutional domains using a local allowlist with an academic-email fallback. Academic accounts attach college/course records; email links verify mailbox ownership.",
      "Authenticated discussion endpoints apply a Redis counter with a 60-second expiry. Search results are cached for 300 seconds after HTML-to-text conversion and Fuse.js ranking.",
    ],
    tradeoff:
      "Non-academic emails can register too; institutional classification is not a universal access gate. Search scans retrieved posts in memory, favoring simplicity over database-scale full-text indexing.",
    evidence: [
      {
        label: "Identity flow",
        url: "https://github.com/Somnath-Chattaraj/Campus-Chatter/blob/d9677897248813835ff63eb3053478c2298ec69d/backend/src/controllers/userControllers.ts",
      },
      {
        label: "Feed & search",
        url: "https://github.com/Somnath-Chattaraj/Campus-Chatter/blob/d9677897248813835ff63eb3053478c2298ec69d/backend/src/controllers/postController.ts",
      },
    ],
    image: "/projects/campus-chatter.png",
    capture: "Campus Chatter · locally built landing page",
    imageAlt: "Locally built Campus Chatter public landing page",
    mediaLabel: "Campus Chatter / local build",
    imageWidth: 1440,
    imageHeight: 950,
  },
  {
    id: "05",
    kind: "Developer tooling",
    title: "Echo",
    subtitle: "Embeddable feedback collection",
    summary:
      "A project-keyed JavaScript widget captures feedback categories and page URLs, with an authenticated dashboard for triage, labels, and sentiment analysis.",
    detail:
      "A Next.js route emits an embeddable script that injects a feedback UI with prefixed styles and IDs. The widget posts to a CORS-enabled endpoint; Prisma persists typed feedback in PostgreSQL and TanStack Query retrieves paginated results.",
    metric: "20 items / page",
    qualifier: "HTTP query pagination",
    tools: [
      "Next.js",
      "TypeScript",
      "Prisma / PostgreSQL",
      "Better Auth",
      "TanStack Query",
      "Gemini",
    ],
    flow: ["Embed", "Capture", "Triage"],
    tone: "blue",
    source: "https://github.com/Somnath-Chattaraj/Echo",
    demo: "https://echo.somnath.site",
    demoLabel: "Website",
    architecture: [
      "Project UUID keys identify public widget submissions. The script captures content, category, and window.location.href. Dashboard reads verify the session and project owner before returning newest-first feedback with labels.",
      "A server action sends feedback text to Gemini 2.5 Flash and persists POSITIVE, NEUTRAL, or NEGATIVE sentiment. Filters and page numbers form the client query-cache key.",
    ],
    tradeoff:
      "The dashboard is request-driven, not a WebSocket or SSE stream. Sentiment analysis is user-triggered; no automatic real-time analytics pipeline was found in the inspected source.",
    evidence: [
      {
        label: "Embedded widget",
        url: "https://github.com/Somnath-Chattaraj/Echo/blob/c25cebd80ed6a7a2a7037557dd41c6395457cc77/app/embed/[projectKey]/route.ts",
      },
      {
        label: "Capture & read API",
        url: "https://github.com/Somnath-Chattaraj/Echo/blob/c25cebd80ed6a7a2a7037557dd41c6395457cc77/app/api/feedback/route.ts",
      },
    ],
    image: "/projects/echo.png",
    capture: "Echo · supplied project image",
    imageAlt:
      "Echo landing page with Listen to every Echo of your users headline",
    mediaLabel: "Echo / supplied capture",
    imageWidth: 2814,
    imageHeight: 1608,
  },
];

export const skills = [
  {
    title: "Languages",
    items: "Java, JavaScript, TypeScript, C++, Python, Kotlin, C, SQL",
  },
  {
    title: "Application & data",
    items:
      "Node.js, Express.js, React.js, MERN, REST APIs, Kafka, Redis, BullMQ, PostgreSQL, Prisma",
  },
  {
    title: "Cloud & reliability",
    items: "Docker, Kubernetes, Google Cloud Platform, Prometheus, monitoring",
  },
  {
    title: "Engineering practice",
    items:
      "Git, code review, production testing, debugging, performance optimization, technical documentation",
  },
  {
    title: "AI tooling",
    items:
      "LLMs, retrieval-augmented generation (RAG), ChromaDB, LangChain, AI-assisted development, output validation",
  },
];
