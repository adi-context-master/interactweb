// In-memory stores — swap for a database in production

export interface Lead {
  id: string;
  email: string;
  company?: string;
  intent: "HIGH" | "MEDIUM" | "LOW";
  interests: string[];
  conversationId: string;
  createdAt: Date;
}

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  messages: Message[];
  lead?: Lead;
  intent: "HIGH" | "MEDIUM" | "LOW";
  startedAt: Date;
  lastActiveAt: Date;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  content: string;
  type: "text" | "url" | "pdf";
  createdAt: Date;
}

// --- In-memory stores ---

const conversations = new Map<string, Conversation>();
const leads = new Map<string, Lead>();
const knowledgeDocs = new Map<string, KnowledgeDoc>();

// Seed default knowledge
const defaultKnowledge: KnowledgeDoc[] = [
  {
    id: "k1",
    title: "Product Overview",
    content: `Engagely is an interactive AI agent that B2B companies embed on their websites. It replaces static pages and forms with a split-screen experience: AI video avatar with chat on the left, live interactive product demo on the right. Visitors get personalized, conversational demos 24/7. The agent qualifies leads, captures emails, answers questions from a knowledge base, and books meetings.`,
    type: "text",
    createdAt: new Date(),
  },
  {
    id: "k2",
    title: "Pricing",
    content: `Engagely has three plans:
- Starter ($149/mo): 1 AI agent, 500 conversations/month, basic flow builder, email capture, calendar booking, basic analytics.
- Growth ($399/mo): 3 AI agents, 3,000 conversations/month, full flow builder, custom avatar + voice, CRM sync (Salesforce, HubSpot, Pipedrive), intent scoring, knowledge base RAG, priority support.
- Enterprise (Custom, $1,200+/mo): Unlimited agents and conversations, white-label, SSO/RBAC, dedicated account manager, custom integrations, SLA guarantee.
Early access: first 50 customers get 6 months at 50% off.`,
    type: "text",
    createdAt: new Date(),
  },
  {
    id: "k3",
    title: "Features",
    content: `Key features:
- AI Video Avatar: lifelike agent with lip-sync, natural expressions, pre-recorded clips for common moments
- Conversation Flow Builder: visual drag-and-drop node editor with branching logic
- Knowledge Base (RAG): upload PDFs, URLs, text — agent answers from your docs, never hallucinates
- CRM Sync: real-time sync to Salesforce, HubSpot, Pipedrive with intent scores
- Intent Scoring: automatic HIGH/MEDIUM/LOW scoring based on engagement
- Calendar Integration: Google Calendar, Outlook — meetings booked inline
- Analytics Dashboard: visitor sessions, transcripts, engagement metrics, top questions
- Embed: single JS snippet, under 5KB, no layout shift, works on any site`,
    type: "text",
    createdAt: new Date(),
  },
  {
    id: "k4",
    title: "Setup & Onboarding",
    content: `Getting started with Engagely takes under 1 hour:
1. Sign up and configure your agent name, avatar, and greeting
2. Upload your knowledge base documents (PDFs, URLs, or text)
3. Choose a conversation flow template or build your own
4. Copy the JS snippet and paste it into your website
5. Go live — the widget appears for visitors immediately
No engineering team required. The snippet is async and doesn't block page load.`,
    type: "text",
    createdAt: new Date(),
  },
  {
    id: "k5",
    title: "Security & Compliance",
    content: `Engagely security:
- All data encrypted in transit (TLS 1.3) and at rest (AES-256)
- Multi-tenant with strict data isolation
- OAuth 2.0 for all integrations
- GDPR compliant: data deletion, consent management
- SOC 2 Type II certification in progress
- No customer data used for model training`,
    type: "text",
    createdAt: new Date(),
  },
  {
    id: "k6",
    title: "Analytics Dashboard",
    content: `The Analytics dashboard gives you complete visibility into visitor engagement:
- Total Visitors: track how many people visit your site and see the widget
- Engagement Rate: percentage of visitors who interact with the AI agent (industry average ~5%, Engagely averages 40%)
- Meetings Booked: count of meetings scheduled through the widget's calendar integration
- Average Session Duration: how long visitors spend talking to the agent (Engagely average: 4+ minutes vs 30 seconds for typical websites)
- Engagement Trend Chart: line chart showing visitors vs engaged visitors over time (7/30/90 day views)
- Intent Score Breakdown: pie chart showing HIGH/MEDIUM/LOW intent distribution across all conversations
- High-Intent Visitors Table: prioritized list with email, company, intent score, last active time, and top question asked — with a "Reach out" action button
- All data is filterable by date range and exportable as CSV or JSON
- Data is retained for 12 months minimum`,
    type: "text",
    createdAt: new Date(),
  },
  {
    id: "k7",
    title: "Conversations",
    content: `The Conversations tab is a real-time inbox for all visitor interactions:
- All Conversations List: shows every visitor session with avatar, name, company, last message, timestamp, and unread count
- Status Indicators: green dot = active (currently chatting), yellow = waiting (visitor sent a message, agent hasn't responded), gray = resolved
- Intent Badges: each conversation is tagged HIGH, MEDIUM, or LOW intent
- Conversation Detail View: click any conversation to see the full transcript with timestamps
- Message Types: visitor messages appear on the right (colored), agent/AI messages on the left (gray/white)
- Filter & Search: filter conversations by status, intent level, or search by visitor name/email/company
- Live Updates: new messages appear in real-time without page refresh
- Full Context: when a sales rep opens a conversation, they see everything — what the visitor asked, what features they explored, how long they engaged, and what their intent score is`,
    type: "text",
    createdAt: new Date(),
  },
  {
    id: "k8",
    title: "Knowledge Base Management",
    content: `The Knowledge Base is what makes the AI agent smart and accurate:
- Document Types: upload PDFs, paste web URLs (auto-crawled), or add plain text directly
- How It Works: documents are chunked, indexed, and used for RAG (Retrieval-Augmented Generation) — the AI searches your docs to answer visitor questions
- Zero Hallucination: if the answer isn't in your knowledge base, the agent says "Let me connect you with our team" instead of making something up
- Document Table: shows title, type (document/URL), word count, status (published/processing/error), and last updated date
- Actions: view, edit, or delete any document
- Upload Area: drag-and-drop file upload supporting PDF, DOC, TXT, and web URLs
- Testing: you can test questions against your knowledge base before going live to see exactly how the agent would respond
- Updates take effect within 5 minutes of upload
- The knowledge base powers all free-form visitor questions that fall outside the scripted conversation flow`,
    type: "text",
    createdAt: new Date(),
  },
  {
    id: "k9",
    title: "Integrations",
    content: `Engagely integrates with the tools your team already uses:
- CRM Integrations: Salesforce, HubSpot, Pipedrive — automatically creates leads, syncs conversation transcripts, engagement duration, topics discussed, and intent scores as custom fields. Duplicate detection by email.
- Calendar Integrations: Google Calendar, Microsoft Outlook — visitors can book meetings directly from the chat. Round-robin assignment distributes across your sales team. Booked meetings include conversation summary and visitor context.
- Messaging: Slack — get real-time notifications when high-intent visitors engage. Configure which events trigger alerts.
- Automation: Zapier — connect to 5,000+ apps. Trigger workflows based on conversation events.
- Developer: Custom Webhooks — send event data to any system via HTTP POST. Full payload with conversation data, intent scores, and lead info.
- All integrations use OAuth 2.0 — no API keys stored in plaintext
- CRM sync happens in real-time (within 30 seconds of conversation end)
- Connected integrations show last sync time and can be configured or disconnected from the dashboard`,
    type: "text",
    createdAt: new Date(),
  },
  {
    id: "k10",
    title: "Flow Builder",
    content: `The Flow Builder is a visual, drag-and-drop conversation editor:
- Canvas: a grid-based workspace where you design conversation logic by connecting nodes
- Node Types: Message (send text to visitor), Question (ask with response options), Media (show video/image in demo panel), Calendar (book a meeting), Email Capture (collect visitor email)
- Node Properties: click any node to configure its label, message content, response options, media URL, or calendar settings in the right-side properties panel
- Connections: nodes connect with arrow lines showing the conversation flow path. Question nodes can branch to multiple paths based on visitor response.
- Templates: start from pre-built templates (B2B SaaS Lead Qualifier, Customer Support Triage, E-commerce Product Recommender, etc.) and customize, or build from scratch
- Preview: test your flow before publishing to see exactly what visitors will experience
- Publish: flows can be saved as drafts or published live. Version history allows rollback.
- The flow builder controls the scripted conversation path. For free-form questions outside the flow, the agent falls back to RAG over the knowledge base.`,
    type: "text",
    createdAt: new Date(),
  },
  {
    id: "k11",
    title: "Settings & Configuration",
    content: `The Settings page lets you configure everything about your Engagely widget:
- Embed Snippet: a single <script> tag (under 5KB gzipped) that you paste into your website HTML. Loads asynchronously, no layout shift, works on any site.
- Agent Name: customize what your AI agent is called (e.g., "Arya", "Sarah", or your company name)
- Greeting Message: the welcome message visitors see in the collapsed widget bubble
- Widget Position: choose Bottom Center, Bottom Right, or Bottom Left
- Greeting Delay: how many seconds after page load before the widget greeting appears (default: 3 seconds)
- Theme: Light, Dark, or Auto (detects from host page)
- Branding: set your primary brand color, upload your company logo, and upload or choose an agent avatar photo
- The widget is fully white-labelable — customers on Growth and Enterprise plans can remove Engagely branding and use their own colors, logo, and avatar`,
    type: "text",
    createdAt: new Date(),
  },
];

defaultKnowledge.forEach((doc) => knowledgeDocs.set(doc.id, doc));

// --- Conversation Store ---

export function createConversation(): Conversation {
  const id = crypto.randomUUID();
  const conv: Conversation = {
    id,
    messages: [],
    intent: "LOW",
    startedAt: new Date(),
    lastActiveAt: new Date(),
  };
  conversations.set(id, conv);
  return conv;
}

export function getConversation(id: string): Conversation | undefined {
  return conversations.get(id);
}

export function addMessage(convId: string, message: Message): void {
  const conv = conversations.get(convId);
  if (conv) {
    conv.messages.push(message);
    conv.lastActiveAt = new Date();
  }
}

export function updateIntent(convId: string, intent: "HIGH" | "MEDIUM" | "LOW"): void {
  const conv = conversations.get(convId);
  if (conv) conv.intent = intent;
}

export function getAllConversations(): Conversation[] {
  return Array.from(conversations.values()).sort(
    (a, b) => b.lastActiveAt.getTime() - a.lastActiveAt.getTime()
  );
}

// --- Lead Store ---

export function createLead(lead: Lead): void {
  leads.set(lead.id, lead);
  const conv = conversations.get(lead.conversationId);
  if (conv) conv.lead = lead;
}

export function getAllLeads(): Lead[] {
  return Array.from(leads.values()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

// --- Knowledge Base ---

export function getKnowledge(): KnowledgeDoc[] {
  return Array.from(knowledgeDocs.values());
}

export function addKnowledgeDoc(doc: KnowledgeDoc): void {
  knowledgeDocs.set(doc.id, doc);
}

export function removeKnowledgeDoc(id: string): void {
  knowledgeDocs.delete(id);
}

export function getKnowledgeContext(): string {
  return Array.from(knowledgeDocs.values())
    .map((doc) => `### ${doc.title}\n${doc.content}`)
    .join("\n\n");
}
