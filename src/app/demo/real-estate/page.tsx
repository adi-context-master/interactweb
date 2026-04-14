"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, Bot, RotateCcw, MapPin, Bed, Bath, Square, X,
  BadgeCheck, Sparkles, Pencil, Copy, Check, Smile, Send, PlusCircle, Zap, Paperclip, LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

/* ── /messages palette ─────────────────────────────────────────────── */
const P    = "#7C5CFF";
const P5   = "rgba(124,92,255,0.05)";
const P10  = "rgba(124,92,255,0.10)";
const P15  = "rgba(124,92,255,0.15)";
const PDIM = "#6647e6";
const BG   = "#fffdf5";
const SFCL = "#faf8f0";
const SFCH = "#e3e3dd";
const SFC  = "#e9e8e3";
const OBG  = "#2e2f2c";
const OSV  = "#5b5c58";
const OTL  = "#777773";

/* ── Images ─────────────────────────────────────────────────────────── */
const HERO_IMG =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80";

const ADVISOR_IMGS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
];

const SARAH_AVATAR =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face";

const MARCUS_AVATAR =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face";

const AGENT_IMG =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face";

/* ── Properties ─────────────────────────────────────────────────────── */
const properties = [
  { id: 1, title: "Modern Loft with Skyline Views",    price: "$1,050,000", address: "428 Brannan St, SoMa",           beds: 2, baths: 2, sqft: "1,250", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80", tag: "New Listing" },
  { id: 2, title: "Victorian Flat, Pacific Heights",   price: "$1,375,000", address: "2841 Fillmore St, Pacific Hts",  beds: 3, baths: 2, sqft: "1,850", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", tag: "Premium" },
  { id: 3, title: "Contemporary Condo, Marina Views",  price: "$875,000",   address: "3421 Scott St, Marina District", beds: 2, baths: 1, sqft: "980",   image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80", tag: "Price Reduced" },
  { id: 4, title: "Penthouse Suite, Hayes Valley",     price: "$2,200,000", address: "450 Octavia Blvd, Hayes Valley", beds: 3, baths: 3, sqft: "2,400", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80", tag: "Exclusive" },
  { id: 5, title: "Studio Loft, Tech Corridor",        price: "$650,000",   address: "1288 Howard St, SoMa",           beds: 1, baths: 1, sqft: "680",   image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=600&q=80", tag: "Popular" },
  { id: 6, title: "Family Home, Noe Valley",           price: "$1,650,000", address: "3722 23rd St, Noe Valley",       beds: 4, baths: 3, sqft: "2,800", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80", tag: "Under Offer" },
];

const testimonials = [
  { name: "James & Sophie W.", text: "Found our dream home in two weeks. The assistant understood exactly what we needed before we did.", location: "SoMa, SF" },
  { name: "David K.",          text: "I told it my budget and it instantly surfaced options I'd never have found browsing on my own.",       location: "Marina District" },
  { name: "Priya M.",          text: "As a first-time buyer I had endless questions. The assistant was patient, precise, and never pushy.",  location: "Hayes Valley" },
];

/* ── Signal types ─────────────────────────────────────────────────── */
type SignalType = "financial_readiness" | "time_urgency" | "location_specificity" | "shopping_behaviour";

const SIGNAL_CONFIG: Record<SignalType, { label: string; color: string }> = {
  financial_readiness:  { label: "Financial Readiness",  color: "#16a34a" },
  time_urgency:         { label: "Time Urgency",          color: "#d97706" },
  location_specificity: { label: "Location Specificity",  color: "#2563eb" },
  shopping_behaviour:   { label: "Shopping Behaviour",    color: "#7c3aed" },
};

interface DemoMessage {
  id: number;
  sender: "agent" | "visitor";
  text: string;
  delay: number;
  signal?: { type: SignalType; level: string; score: number; confidence: number; indicators: string[] };
}

/* ── Sarah — High Intent ──────────────────────────────────────────── */
const SARAH_SCRIPT: DemoMessage[] = [
  { id: 1,  sender: "agent",   text: "Hey! Looking at our SoMa properties? Happy to help 👋", delay: 600 },
  { id: 2,  sender: "visitor", text: "Yeah, actually. I've been browsing for a while. We're thinking about moving in the next few months.", delay: 2400,
    signal: { type: "time_urgency", level: "Medium", score: 35, confidence: 0.65, indicators: ['"next few months" = 3-6 month timeline (defined but not immediate)'] } },
  { id: 3,  sender: "agent",   text: "Nice. First time looking in SoMa or are you familiar with the area?", delay: 4200 },
  { id: 4,  sender: "visitor", text: "We've looked at a few places in SoMa and Marina District. Really like the vibe in SoMa — walkable, close to work.", delay: 6600,
    signal: { type: "location_specificity", level: "High", score: 82, confidence: 0.82, indicators: ["Specific neighborhoods: SoMa + Marina District", "Clear preference: SoMa (walkable, close to work)"] } },
  { id: 5,  sender: "agent",   text: "SoMa's great for that. What's bringing the move — new job or just ready for a change?", delay: 8400 },
  { id: 6,  sender: "visitor", text: "New job actually. Starting in September. My partner and I want to be close to the office but also have space for a home office.", delay: 11000,
    signal: { type: "time_urgency", level: "High", score: 88, confidence: 0.94, indicators: ["Hard deadline: September start date", "External trigger (new job) = specific urgency"] } },
  { id: 7,  sender: "agent",   text: "Congrats on the new role! Will you need to be settled by September?", delay: 12800 },
  { id: 8,  sender: "visitor", text: "Yeah, ideally settled by then. We're actually in pre-approval already — ready to move when the right place comes up.", delay: 15400,
    signal: { type: "financial_readiness", level: "Very High", score: 91, confidence: 0.91, indicators: ["Pre-approved for mortgage = financing locked", '"ready to move" = decision-ready'] } },
  { id: 9,  sender: "agent",   text: "Pre-approval is huge. What price range are you thinking?", delay: 17200 },
  { id: 10, sender: "visitor", text: "Pre-approved up to $900k but probably looking around $800k–$850k. Want to leave some breathing room.", delay: 19800,
    signal: { type: "financial_readiness", level: "Confirmed", score: 94, confidence: 0.94, indicators: ["Specific budget: ~$850k", "Pre-approval confirmed: $900k"] } },
  { id: 11, sender: "agent",   text: "Smart move. How long have you been looking seriously?", delay: 21600 },
  { id: 12, sender: "visitor", text: "About 6 weeks. We're not in a rush to buy just anything — it has to be the right fit.", delay: 24200,
    signal: { type: "shopping_behaviour", level: "High", score: 78, confidence: 0.78, indicators: ["Active search for 6 weeks = engaged buyer", "Selective — quality-conscious"] } },
  { id: 13, sender: "agent",   text: "I've got new listings coming Friday in your range — SoMa and a couple in Marina. Want me to send them over?", delay: 26000 },
  { id: 14, sender: "visitor", text: "Yeah, definitely. And do you have time for a quick call this week? We have questions about inspections and closing timelines.", delay: 28400,
    signal: { type: "shopping_behaviour", level: "Very High", score: 87, confidence: 0.87, indicators: ["Requesting seller info (inspections, timelines)", "Requesting direct call = high engagement"] } },
  { id: 15, sender: "agent",   text: "100%. Wednesday afternoon or Thursday morning — which works?", delay: 30200 },
  { id: 16, sender: "visitor", text: "Thursday morning. 9 or 10am if you have it?", delay: 32000,
    signal: { type: "shopping_behaviour", level: "Intent Confirmed", score: 92, confidence: 0.92, indicators: ["Specific time commitment made", "Thursday 9am call scheduled"] } },
  { id: 17, sender: "agent",   text: "Perfect — Thursday 9am it is. I'll send SoMa listings Wednesday evening. Talk soon!", delay: 33800 },
];

/* ── Marcus — Low Intent ──────────────────────────────────────────── */
const MARCUS_SCRIPT: DemoMessage[] = [
  { id: 1,  sender: "agent",   text: "Hey! Browsing our listings today?", delay: 600 },
  { id: 2,  sender: "visitor", text: "Yeah, just kind of looking around. My company might relocate to the area, so I'm checking out neighborhoods.", delay: 2400,
    signal: { type: "time_urgency", level: "Very Low", score: 15, confidence: 0.28, indicators: ['"might relocate" = speculative, not confirmed · 28% confidence'] } },
  { id: 3,  sender: "agent",   text: "Oh interesting! When are you thinking that might happen?", delay: 4200 },
  { id: 4,  sender: "visitor", text: "Honestly, not sure yet. Could be next year, could be in a few years. Still pretty early stages.", delay: 6600,
    signal: { type: "time_urgency", level: "Confirmed Low", score: 15, confidence: 0.15, indicators: ["Multi-year horizon (1–3+ years) · 15% confidence"] } },
  { id: 5,  sender: "agent",   text: "Got it. What areas are you curious about?", delay: 8400 },
  { id: 6,  sender: "visitor", text: "I don't know, maybe around here? SoMa seems popular but I've heard good things about Oakland. Haven't narrowed it down.", delay: 10800,
    signal: { type: "location_specificity", level: "Low", score: 31, confidence: 0.31, indicators: ['Vague preferences · considering competing cities (SoMa vs Oakland)'] } },
  { id: 7,  sender: "agent",   text: "Both great options! Are you looking at properties yet, or still in research phase?", delay: 12600 },
  { id: 8,  sender: "visitor", text: "Research phase for sure. We haven't even talked to a lender. Just getting a feel for what's out there.", delay: 15000,
    signal: { type: "financial_readiness", level: "None", score: 8, confidence: 0.05, indicators: ['No pre-approval, no lender contact · "just getting a feel"'] } },
  { id: 9,  sender: "agent",   text: "Smart to do your homework. What price range, ballpark?", delay: 16800 },
  { id: 10, sender: "visitor", text: "I mean, I don't really know. Maybe $800k-ish? Depends on what the company does about relocation benefits.", delay: 19200,
    signal: { type: "financial_readiness", level: "Confirmed None", score: 8, confidence: 0.08, indicators: ['Vague budget ("maybe $800k-ish") · tied to unknown corporate decision'] } },
  { id: 11, sender: "agent",   text: "Makes sense. Feel free to browse — anything specific you want to know?", delay: 21000 },
  { id: 12, sender: "visitor", text: "Nah, just browsing for now. Maybe I'll check back in a few months if things change.", delay: 23400,
    signal: { type: "shopping_behaviour", level: "Very Low", score: 12, confidence: 0.12, indicators: ['Passive ("just browsing") · no specific questions · vague future intent'] } },
  { id: 13, sender: "agent",   text: "Sounds good — I'm here if you need anything!", delay: 25200 },
  { id: 14, sender: "visitor", text: "Cool, thanks!", delay: 27000 },
];

interface SignalState { score: number; confidence: number; level: string; indicators: string[] }

const emptySignals = (): Record<SignalType, SignalState> => ({
  financial_readiness:  { score: 0, confidence: 0, level: "", indicators: [] },
  time_urgency:         { score: 0, confidence: 0, level: "", indicators: [] },
  location_specificity: { score: 0, confidence: 0, level: "", indicators: [] },
  shopping_behaviour:   { score: 0, confidence: 0, level: "", indicators: [] },
});

const AI_SUGGEST_SARAH = "\"Hey Sarah, I saw your note about the September deadline. I have 3 off-market units under $1.1M that are perfect for your timeline. One has a private roof deck. Can we do a quick tour this Saturday at 2pm?\"";

export default function RealEstateDemoPage() {
  const [chatOpen, setChatOpen]           = useState(false);
  const [demoMode, setDemoMode]           = useState<"sarah" | "marcus">("sarah");
  const [visibleMsgIds, setVisibleMsgIds] = useState<Set<number>>(new Set());
  const [visibleSigIds, setVisibleSigIds] = useState<Set<number>>(new Set());
  const [signalScores, setSignalScores]   = useState<Record<SignalType, SignalState>>(emptySignals());
  const [compositeScore, setCompositeScore] = useState(0);
  const [isPlaying, setIsPlaying]         = useState(false);
  const [demoComplete, setDemoComplete]   = useState(false);
  const [draftText, setDraftText]         = useState("");
  const [copied, setCopied]               = useState(false);
  const timeoutsRef    = useRef<ReturnType<typeof setTimeout>[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [visibleMsgIds, visibleSigIds]);

  useEffect(() => {
    const scores = Object.values(signalScores).map(s => s.score).filter(s => s > 0);
    setCompositeScore(scores.length === 0 ? 0 : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length));
  }, [signalScores]);

  const clearAll = useCallback(() => { timeoutsRef.current.forEach(clearTimeout); timeoutsRef.current = []; }, []);

  const playDemo = useCallback((mode: "sarah" | "marcus") => {
    clearAll();
    setVisibleMsgIds(new Set()); setVisibleSigIds(new Set());
    setSignalScores(emptySignals()); setCompositeScore(0);
    setIsPlaying(true); setDemoComplete(false); setDemoMode(mode);
    const script = mode === "sarah" ? SARAH_SCRIPT : MARCUS_SCRIPT;
    script.forEach(msg => {
      const t1 = setTimeout(() => {
        setVisibleMsgIds(prev => new Set([...prev, msg.id]));
        if (msg.signal) {
          const sig = msg.signal;
          const t2 = setTimeout(() => {
            setVisibleSigIds(prev => new Set([...prev, msg.id]));
            setSignalScores(prev => ({ ...prev, [sig.type]: { score: sig.score, confidence: sig.confidence, level: sig.level, indicators: sig.indicators } }));
          }, 800);
          timeoutsRef.current.push(t2);
        }
      }, msg.delay);
      timeoutsRef.current.push(t1);
    });
    const tFinal = setTimeout(() => { setIsPlaying(false); setDemoComplete(true); }, script[script.length - 1].delay + 2000);
    timeoutsRef.current.push(tFinal);
  }, [clearAll]);

  const openChat = useCallback(() => {
    setChatOpen(true);
    setTimeout(() => playDemo("sarah"), 400);
  }, [playDemo]);

  useEffect(() => () => clearAll(), [clearAll]);

  const currentScript   = demoMode === "sarah" ? SARAH_SCRIPT : MARCUS_SCRIPT;
  const visibleMessages = currentScript.filter(m => visibleMsgIds.has(m.id));
  const lastMsg         = visibleMessages[visibleMessages.length - 1];
  const showTyping      = isPlaying && lastMsg?.sender === "visitor";

  const compositeColor     = compositeScore >= 70 ? "#16a34a" : compositeScore >= 40 ? "#d97706" : "#dc2626";
  const recommendedAction  = compositeScore >= 70 ? "CALL NOW"   : compositeScore >= 40 ? "FOLLOW UP" : "EMAIL NURTURE";

  const activeAvatar = demoMode === "sarah" ? SARAH_AVATAR : MARCUS_AVATAR;
  const activeName   = demoMode === "sarah" ? "Sarah Chen"  : "Marcus Thorne";
  const activeIntent = demoMode === "sarah" ? "89% Intent"  : "17% Intent";
  const activeIntentPct = demoMode === "sarah" ? 89 : 17;

  const handleCopy = () => {
    navigator.clipboard.writeText(AI_SUGGEST_SARAH.replace(/[""]/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif", background: BG, color: OBG }}>

      {/* ══ LEFT — scrollable website ══ */}
      <div className="transition-all duration-500 overflow-y-auto" style={{ width: chatOpen ? "52%" : "100%", height: "100%", flexShrink: 0 }}>

        {/* Hero */}
        <div className="relative overflow-hidden" style={{ minHeight: chatOpen ? "44vh" : "52vh" }}>
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Luxury SF Home" className="w-full h-full object-cover" src={HERO_IMG} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(255,253,245,1) 32%, rgba(255,253,245,0) 100%)" }} />
          </div>
          <header className="relative z-20 w-full flex items-center justify-between px-10 py-5">
            <div className="flex items-center gap-12">
              <span style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif", fontWeight: 800, color: OBG, fontSize: "1rem", letterSpacing: "-0.02em", textTransform: "uppercase" }}>
                Meridian<span style={{ color: P, marginLeft: 4 }}>Properties</span>
              </span>
              <nav className="hidden md:flex items-center gap-8" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: OTL }}>
                {["Collections", "Neighborhoods", "About"].map(item => (
                  <a key={item} className="transition-colors hover:text-[#2e2f2c]" href="#">{item}</a>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/dashboard" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: OSV, borderBottom: `1px solid ${SFC}` }}>
                Agent Login
              </Link>
              <button
                className="rounded-full text-white transition-all hover:opacity-90"
                style={{ background: P, padding: "10px 24px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", boxShadow: `0 8px 24px rgba(124,92,255,0.25)` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = P; }}
              >
                Private Viewings
              </button>
            </div>
          </header>
          <main className="relative z-10 flex items-center px-10" style={{ paddingTop: "2vh", paddingBottom: "4vh" }}>
            <div style={{ maxWidth: 440 }}>
              <div className="inline-flex items-center px-3 py-1 rounded-full mb-4" style={{ background: P10 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.15em" }}>San Francisco Collection</span>
              </div>
              <h1 className="mb-4 leading-none tracking-tight" style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.2vw, 3rem)", color: OBG }}>
                The Art of<br />
                <span style={{ color: P, fontStyle: "italic", fontFamily: "Georgia, serif" }}>Curated Living.</span>
              </h1>
              <div className="flex items-center rounded-2xl border" style={{ background: "white", padding: 6, boxShadow: "0 20px 50px -12px rgba(148,163,184,0.4)", borderColor: SFC, maxWidth: 400, marginTop: "1.5rem" }}>
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search size={16} className="shrink-0" style={{ color: OTL }} />
                  <input className="w-full border-none outline-none text-sm bg-transparent" placeholder="Search by neighborhood or style..." style={{ color: OBG }} type="text" />
                </div>
                <button
                  className="rounded-xl text-white font-bold text-xs transition-all hover:opacity-90"
                  style={{ background: P, padding: "10px 18px" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = P; }}
                >
                  Find Home
                </button>
              </div>
              <div className="flex items-center gap-4 mt-5">
                <div className="flex -space-x-3">
                  {ADVISOR_IMGS.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} alt="Advisor" className="w-8 h-8 rounded-full object-cover" style={{ border: "2px solid white" }} src={src} />
                  ))}
                </div>
                <p className="text-xs font-medium italic" style={{ color: OTL }}>Our advisors are available for consultation.</p>
              </div>
            </div>
          </main>
        </div>

        {/* Properties */}
        <section style={{ padding: chatOpen ? "32px 40px" : "48px 40px", background: "white" }}>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif", fontWeight: 800, fontSize: chatOpen ? "1.4rem" : "1.75rem", color: OBG, letterSpacing: "-0.02em" }}>Featured Properties</h2>
              <p className="text-sm mt-1" style={{ color: OTL }}>Hand-picked homes across San Francisco</p>
            </div>
            <div className="flex gap-1.5">
              {["All", "Buy", "Rent"].map((f, i) => (
                <button key={f} className="rounded-full text-xs font-bold px-4 py-2 transition-all"
                  style={{ background: i === 0 ? P : SFCL, color: i === 0 ? "white" : OSV }}
                  onMouseEnter={e => { if (i !== 0) (e.currentTarget as HTMLElement).style.background = SFCH; }}
                  onMouseLeave={e => { if (i !== 0) (e.currentTarget as HTMLElement).style.background = SFCL; }}
                >{f}</button>
              ))}
            </div>
          </div>
          <div className={`grid gap-5 ${chatOpen ? "grid-cols-2" : "grid-cols-3"}`}>
            {properties.map(p => (
              <div key={p.id} className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg" style={{ border: `1px solid ${SFC}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div className="relative overflow-hidden" style={{ height: chatOpen ? 140 : 172 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: P }}>{p.tag}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-bold text-sm leading-snug flex-1 mr-2" style={{ color: OBG }}>{p.title}</p>
                    <p className="font-bold shrink-0" style={{ color: P, fontSize: 13 }}>{p.price}</p>
                  </div>
                  <p className="text-xs flex items-center gap-1 mb-3" style={{ color: OTL }}><MapPin size={11} className="shrink-0" />{p.address}</p>
                  <div className="flex items-center gap-4 pt-3" style={{ borderTop: `1px solid ${SFC}` }}>
                    <span className="flex items-center gap-1 text-xs" style={{ color: OTL }}><Bed size={12} /> {p.beds} bed</span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: OTL }}><Bath size={12} /> {p.baths} bath</span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: OTL }}><Square size={12} /> {p.sqft} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: chatOpen ? "32px 40px" : "48px 40px", background: SFCL }}>
          <h2 className="text-center mb-8" style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: OBG, letterSpacing: "-0.02em" }}>What Our Clients Say</h2>
          <div className={`grid gap-5 ${chatOpen ? "grid-cols-2" : "grid-cols-3"}`}>
            {testimonials.slice(0, chatOpen ? 2 : 3).map(t => (
              <div key={t.name} className="rounded-2xl p-6" style={{ background: "white", border: `1px solid ${SFC}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <p className="italic leading-relaxed text-sm mb-4" style={{ color: OSV }}>&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-sm" style={{ color: OBG }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: OTL }}>{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden" style={{ padding: "56px 40px", background: P }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at top center, rgba(255,255,255,0.1) 0%, transparent 60%)" }} />
          <div className="relative text-center" style={{ maxWidth: 480, margin: "0 auto" }}>
            <h2 className="mb-3 text-white" style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif", fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.02em" }}>
              Ready to Find Your<br /><span style={{ fontStyle: "italic", fontFamily: "Georgia, serif" }}>Dream Home?</span>
            </h2>
            <p className="mb-8 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Chat with our intelligent assistant for personalised recommendations in seconds.</p>
            <button onClick={openChat}
              className="rounded-full font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "white", color: P, padding: "14px 36px", fontFamily: "var(--font-outfit), Outfit, sans-serif" }}>
              Ask the Assistant →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: "36px 40px", background: OBG, color: "white" }}>
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif", fontWeight: 800, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
              Meridian<span style={{ color: P, marginLeft: 4 }}>Properties</span>
            </span>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>AI assistant by <span style={{ color: "rgba(255,255,255,0.7)" }}>Engagely</span> · © 2026</p>
          </div>
        </footer>

        {!chatOpen && <div style={{ height: 72 }} />}
      </div>

      {/* ══ RIGHT — Chat panel (slides in) ══ */}
      <div
        className="transition-all duration-500 flex flex-col shrink-0"
        style={{ width: chatOpen ? "48%" : "0", height: "100%", overflow: "hidden", borderLeft: `1px solid ${SFC}`, background: "white" }}
      >
        {chatOpen && (
          <>
            {/* ─ Thread header ─ */}
            <header
              className="flex-shrink-0 flex items-center justify-between px-6 border-b"
              style={{ height: 80, background: `rgba(255,253,245,0.92)`, backdropFilter: "blur(20px)", borderColor: SFC }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={activeName} className="w-10 h-10 rounded-full object-cover" src={activeAvatar} />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2" style={{ background: "#22c55e", borderColor: "white" }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link href="/profile" style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: OBG, lineHeight: 1, textDecoration: "none" }} className="hover:underline">{activeName}</Link>
                    <BadgeCheck size={15} style={{ color: P }} />
                    <span className="text-[10px] font-black tracking-tight text-white px-2 py-0.5 rounded-full" style={{ background: activeIntentPct >= 70 ? P : activeIntentPct >= 40 ? "#d97706" : "#dc2626" }}>
                      {activeIntent.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs font-medium mt-0.5" style={{ color: OTL }}>Online · Active 4m ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Sarah / Marcus toggle */}
                <div className="flex rounded-full overflow-hidden mr-1" style={{ border: `1px solid ${SFC}` }}>
                  {(["sarah", "marcus"] as const).map(m => (
                    <button key={m}
                      onClick={() => { setDemoMode(m); playDemo(m); }}
                      className="text-xs font-bold capitalize transition-all"
                      style={{ padding: "6px 14px", background: demoMode === m ? OBG : "transparent", color: demoMode === m ? "white" : OTL, fontSize: 11 }}
                    >{m === "sarah" ? "Sarah" : "Marcus"}</button>
                  ))}
                </div>
                <button onClick={() => { setChatOpen(false); clearAll(); }} className="transition-colors" style={{ color: OTL }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = OBG; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = OTL; }}
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            {/* ─ Messages scroll area ─ */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5" style={{ minHeight: 0 }}>

              {/* Date pill */}
              <div className="text-center">
                <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{ background: SFCL, color: OTL }}>Today</span>
              </div>

              {visibleMessages.map(msg =>
                msg.sender === "agent" ? (
                  /* ── AI bubble ── */
                  <div key={msg.id} className="flex flex-col items-start" style={{ maxWidth: "72%" }}>
                    <div className="flex items-center gap-2 mb-1 ml-2">
                      <span className="text-[10px] font-bold" style={{ color: P }}>AI Assistant</span>
                    </div>
                    <div className="px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm"
                      style={{ background: "rgba(240,235,255,0.55)", color: "#2a0066", borderRadius: "0 1rem 1rem 1rem" }}>
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  /* ── Visitor bubble + signal ── */
                  <div key={msg.id} className="flex flex-col items-end self-end" style={{ maxWidth: "72%", marginLeft: "auto" }}>
                    <div className="flex items-center gap-2 mb-1 mr-2">
                      <span className="text-[10px] font-bold" style={{ color: OBG }}>{activeName.split(" ")[0]}</span>
                    </div>
                    <div className="px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm"
                      style={{ background: SFCL, color: OBG, borderRadius: "1rem 1rem 0 1rem" }}>
                      {msg.text}
                    </div>
                    {msg.signal && visibleSigIds.has(msg.id) && (
                      <div className="mt-1 px-2.5 py-1.5 rounded-lg" style={{ background: `${SIGNAL_CONFIG[msg.signal.type].color}08`, borderLeft: `1.5px solid ${SIGNAL_CONFIG[msg.signal.type].color}40`, maxWidth: "100%" }}>
                        <p style={{ fontSize: 10, fontWeight: 600, color: `${SIGNAL_CONFIG[msg.signal.type].color}bb` }}>
                          {SIGNAL_CONFIG[msg.signal.type].label} · {msg.signal.level}
                        </p>
                        <p style={{ fontSize: 10, color: OTL, marginTop: 1 }}>{msg.signal.indicators[0]}</p>
                      </div>
                    )}
                  </div>
                )
              )}

              {/* Typing dots */}
              {showTyping && (
                <div className="flex flex-col items-start" style={{ maxWidth: "72%" }}>
                  <div className="flex items-center gap-2 mb-1 ml-2">
                    <span className="text-[10px] font-bold" style={{ color: P }}>AI Assistant</span>
                  </div>
                  <div className="px-4 py-3 flex items-center gap-1.5 rounded-2xl shadow-sm"
                    style={{ background: "rgba(240,235,255,0.55)", borderRadius: "0 1rem 1rem 1rem" }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} className="block w-2 h-2 rounded-full animate-bounce" style={{ background: P, opacity: 0.6, animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* SAY THIS NOW card — shown when demo complete & Sarah */}
              {demoComplete && demoMode === "sarah" && (
                <div className="rounded-2xl p-5 border-2 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${P15} 0%, ${P5} 100%)`, borderColor: P10, boxShadow: `0 20px 48px ${P5}` }}>
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full pointer-events-none" style={{ background: P10, filter: "blur(48px)" }} />
                  <div className="flex items-center justify-between mb-3 relative">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚀</span>
                      <span className="font-bold text-xs tracking-widest uppercase" style={{ color: P, fontFamily: "var(--font-outfit), Outfit, sans-serif" }}>SAY THIS NOW</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border" style={{ background: "rgba(255,255,255,0.5)", borderColor: P10 }}>
                      <Sparkles size={12} style={{ color: P }} />
                      <span className="text-[10px] font-bold" style={{ color: P }}>AI Confidence: 89%</span>
                    </div>
                  </div>
                  <p className="font-semibold text-sm leading-relaxed mb-4 relative" style={{ color: OBG }}>{AI_SUGGEST_SARAH}</p>
                  <div className="flex items-center gap-2 relative">
                    <button
                      className="px-5 py-2.5 rounded-full font-bold text-xs text-white transition-all hover:scale-[1.02]"
                      style={{ background: P, boxShadow: `0 6px 20px rgba(124,92,255,0.3)`, fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = P; }}
                    >SEND NOW</button>
                    <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all" style={{ background: "rgba(255,255,255,0.6)", color: OBG }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "white"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.6)"; }}>
                      <Pencil size={13} /> Edit
                    </button>
                    <button onClick={handleCopy} className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all"
                      style={{ background: "rgba(255,255,255,0.6)", color: copied ? "#16a34a" : OBG }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "white"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.6)"; }}>
                      {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ─ Signal panel ─ */}
            <div className="shrink-0 px-6 py-4 border-t" style={{ background: SFCL, borderColor: SFC }}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: OTL }}>Composite Intent Score</p>
                  <div className="font-bold leading-none mt-1 transition-all duration-700"
                    style={{ fontSize: "2rem", color: compositeScore > 0 ? compositeColor : SFCH, fontFamily: "var(--font-outfit), Outfit, sans-serif" }}>
                    {compositeScore}<span style={{ fontSize: "0.9rem" }}>%</span>
                  </div>
                </div>
                <div className="text-right">
                  {demoComplete ? (
                    <>
                      <span className="inline-block px-3 py-1.5 rounded-full text-white font-bold mb-1"
                        style={{ background: compositeColor, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-outfit), Outfit, sans-serif" }}>
                        {recommendedAction}
                      </span>
                      <p style={{ fontSize: 9, color: OTL, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                        {compositeScore >= 70 ? "HIGH" : compositeScore >= 40 ? "MEDIUM" : "LOW"} URGENCY
                      </p>
                    </>
                  ) : isPlaying ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: P }} />
                      <span style={{ fontSize: 10, color: OTL, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Analyzing</span>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {(Object.entries(SIGNAL_CONFIG) as [SignalType, { label: string; color: string }][]).map(([type, config]) => {
                  const s = signalScores[type];
                  return (
                    <div key={type}>
                      <div className="flex items-center justify-between mb-1">
                        <span style={{ fontSize: 10, fontWeight: 600, color: OSV }}>{config.label}</span>
                        <span className="font-bold transition-colors duration-300" style={{ fontSize: 11, color: s.score > 0 ? config.color : SFCH }}>
                          {s.score > 0 ? `${s.score}%` : "—"}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: SFC }}>
                        <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${s.score}%`, background: config.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-3">
                {demoComplete && demoMode === "sarah" && (
                  <p style={{ fontSize: 10, color: P, fontWeight: 600, fontStyle: "italic" }}>Sarah closed a $1.05M SoMa deal 24 days later.</p>
                )}
                {demoComplete && demoMode === "marcus" && (
                  <p style={{ fontSize: 10, color: "#dc2626", fontWeight: 600, fontStyle: "italic" }}>Marcus added to 6-month nurture sequence.</p>
                )}
                {!demoComplete && <span />}
                {demoComplete && (
                  <button
                    onClick={() => { const t = setTimeout(() => playDemo(demoMode), 80); timeoutsRef.current.push(t); }}
                    className="flex items-center gap-1.5 font-semibold transition-colors"
                    style={{ fontSize: 11, color: OTL }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = OBG; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = OTL; }}
                  >
                    <RotateCcw size={11} /> Replay
                  </button>
                )}
              </div>
            </div>

            {/* ─ Compose footer ─ */}
            <footer className="flex-shrink-0 px-6 py-4 border-t" style={{ background: `rgba(255,253,245,0.95)`, backdropFilter: "blur(12px)", borderColor: SFC }}>
              <div className="flex items-end gap-3 p-3 rounded-[2rem] border" style={{ background: SFCL, borderColor: `${SFC}80` }}>
                <button
                  className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ color: OTL }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = P; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = OTL; }}
                >
                  <PlusCircle size={18} />
                </button>
                <textarea
                  className="flex-1 border-0 focus:ring-0 focus:outline-none text-sm font-medium py-1.5 resize-none leading-relaxed bg-transparent"
                  placeholder={`Type a message to ${activeName.split(" ")[0]}…`}
                  rows={1}
                  value={draftText}
                  onChange={e => setDraftText(e.target.value)}
                  style={{ color: OBG, minHeight: "36px" }}
                />
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    className="w-9 h-9 flex items-center justify-center transition-colors"
                    style={{ color: OTL }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = P; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = OTL; }}
                  >
                    <Smile size={18} />
                  </button>
                  <button
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 flex-shrink-0"
                    style={{ background: P, boxShadow: `0 4px 16px rgba(124,92,255,0.35)` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = P; }}
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
              <div className="flex justify-center mt-2.5 gap-6">
                <button className="text-[10px] font-bold flex items-center gap-1 transition-colors" style={{ color: OTL }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = P; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = OTL; }}>
                  <Zap size={11} /> QUICK REPLIES
                </button>
                <button className="text-[10px] font-bold flex items-center gap-1 transition-colors" style={{ color: OTL }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = P; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = OTL; }}>
                  <Paperclip size={11} /> ATTACH LISTING
                </button>
                <Link href="/dashboard" className="text-[10px] font-bold flex items-center gap-1 transition-colors" style={{ color: OTL }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = P; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = OTL; }}>
                  <LayoutDashboard size={11} /> DASHBOARD
                </Link>
              </div>
            </footer>
          </>
        )}
      </div>

      {/* ── Sticky chat trigger ── */}
      {!chatOpen && (
        <div className="fixed bottom-6 left-1/2 z-50" style={{ transform: "translateX(-50%)" }}>
          <button
            onClick={openChat}
            className="flex items-center gap-3 group"
            style={{
              background: "rgba(255,253,245,0.97)",
              backdropFilter: "blur(16px)",
              border: `1px solid ${SFC}`,
              borderRadius: 999,
              padding: "10px 14px 10px 10px",
              boxShadow: "0 8px 32px -4px rgba(46,47,44,0.14), 0 2px 8px -2px rgba(46,47,44,0.06)",
              whiteSpace: "nowrap",
            }}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0" style={{ border: `2px solid ${P10}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Agent" className="w-full h-full object-cover" src={AGENT_IMG} />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full" style={{ border: "2px solid white" }} />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm leading-tight" style={{ color: OBG, fontFamily: "var(--font-outfit), Outfit, sans-serif" }}>Property Assistant</p>
              <p style={{ fontSize: 10, color: OTL, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Powered by Engagely · Live demo</p>
            </div>
            <div className="rounded-full text-white text-xs font-bold transition-all group-hover:opacity-90 ml-2"
              style={{ background: P, padding: "9px 20px", boxShadow: `0 4px 12px rgba(124,92,255,0.3)`, fontFamily: "var(--font-outfit), Outfit, sans-serif" }}>
              Open Chat →
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
