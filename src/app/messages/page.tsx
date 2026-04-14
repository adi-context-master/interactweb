"use client";

import {
  LayoutDashboard, GitBranch, UserSearch, BarChart3, Sliders, MessageSquare,
  Settings, LogOut, BadgeCheck, PlusCircle, Search, ChevronDown,
  Phone, Calendar, MoreHorizontal, Sparkles, Pencil, Copy, Smile, Send,
  Zap, Paperclip, Edit, Check,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ─── palette ─────────────────────────────────────────────────────── */
const P     = "#7C5CFF";
const P5    = "rgba(124,92,255,0.05)";
const P10   = "rgba(124,92,255,0.10)";
const P15   = "rgba(124,92,255,0.15)";
const PDIM  = "#6647e6";
const BG    = "#fffdf5";
const SFCL  = "#faf8f0";
const SFCH  = "#e3e3dd";
const SFC   = "#e9e8e3";
const OBG   = "#2e2f2c";
const OSV   = "#5b5c58";
const OTL   = "#777773";
const ERR   = "#b41340";
const sideActive = { background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", color: P };

/* ─── sidebar nav ─────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",           href: "/dashboard",         active: false },
  { icon: Zap,             label: "Intent Signals",     href: "/intent-signals",    active: false },
  { icon: GitBranch,       label: "Pipeline",           href: "#",                  active: false },
  { icon: UserSearch,      label: "Leads",        href: "/leads",     active: false },
  { icon: BarChart3,       label: "Insights",     href: "/insights",  active: false },
  { icon: Sliders,         label: "Lead Scoring", href: "/lead-scoring", active: false },
  { icon: MessageSquare,   label: "Messages",     href: "/messages",     active: true  },
];

/* ─── conversations ────────────────────────────────────────────────── */
type ConvStatus = "awaiting" | "waiting" | "closed";

type Conv = {
  id: string;
  name: string;
  avatar: string;
  intentPct: number | null;
  intentLabel: string;
  time: string;
  preview: string;
  status: ConvStatus;
  urgency: string | null;
};

const CONVS: Conv[] = [
  {
    id: "sarah",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face",
    intentPct: 89, intentLabel: "89% Intent",
    time: "2:45 PM",
    preview: "Yes, definitely. But I need to stay under $850k...",
    status: "awaiting", urgency: "4h",
  },
  {
    id: "marcus",
    name: "Marcus Thorne",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
    intentPct: 42, intentLabel: "42% Intent",
    time: "11:20 AM",
    preview: "Let me check with my partner about the viewing...",
    status: "waiting", urgency: null,
  },
  {
    id: "elena",
    name: "Elena Rodriguez",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=96&h=96&fit=crop&crop=face",
    intentPct: null, intentLabel: "Closed",
    time: "Yesterday",
    preview: "Thanks again for the help with the contract!",
    status: "closed", urgency: null,
  },
];

/* ─── chat messages ────────────────────────────────────────────────── */
type Msg = { id: number; from: "ai" | "lead"; text: string; time: string };

const MESSAGES: Msg[] = [
  { id: 1, from: "ai",   text: "Do you require financing info for the Kensington project? We have exclusive rates for our early subscribers.", time: "2:15 PM" },
  { id: 2, from: "lead", text: "Planning to finalize my pre-approval this month. I\u2019m trying to figure out if we can push the budget a bit.", time: "2:22 PM" },
  { id: 3, from: "ai",   text: "Perfect. Understanding your budget flexibility helps us curate better off-market options. When\u2019s your ideal move-in timeline?", time: "2:23 PM" },
  { id: 4, from: "lead", text: "Need to close before school year starts in September. That\u2019s my hard deadline.", time: "2:30 PM" },
];

const AI_MSG = "\u201cHey Sarah, I saw your note about the September deadline. I have 3 off-market units under $850K that are perfect for your timeline. One has a private roof deck. Can we do a quick tour this Saturday at 2pm?\u201d";

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState("sarah");
  const [draftText, setDraftText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(AI_MSG.replace(/[\u201c\u201d]/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="font-body antialiased overflow-hidden" style={{ background: BG, color: OBG, height: "100vh" }}>

      {/* ── LEFT SIDEBAR ── */}
      <aside className="hidden xl:flex h-screen w-72 fixed left-0 top-0 flex-col p-8 gap-2 z-40 border-r"
        style={{ background: SFCL, borderColor: SFC }}>
        <div className="mb-10 px-2">
          <span className="font-heading font-extrabold text-2xl tracking-tighter" style={{ color: OBG }}>Engagely AI</span>
          <Link href="/demo/real-estate" className="flex items-center gap-1 mt-3 text-[11px] font-bold transition-colors hover:opacity-70" style={{ color: P }}>
            ← Back to Chat
          </Link>
        </div>
        <div className="mb-8 px-4 py-3 rounded-2xl border" style={{ background: P5, borderColor: `${P}1a` }}>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: P }}>Account Level</p>
          <p className="text-sm font-bold flex items-center gap-2" style={{ color: OBG }}>
            Enterprise Tier <BadgeCheck className="w-3.5 h-3.5" style={{ color: P }} />
          </p>
        </div>
        <nav className="space-y-1.5">
          {NAV.map(({ icon: Icon, label, href, active }) => (
            <Link key={label} href={href}
              className="flex items-center gap-3 px-5 py-3.5 rounded-full transition-all text-sm font-bold font-heading"
              style={active ? sideActive : { color: OSV }}
              onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = SFCH; }}
              onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              <Icon className="w-[22px] h-[22px]" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <button
            className="w-full py-4 rounded-full font-bold font-heading text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{ background: P, boxShadow: `0 8px 24px rgba(124,92,255,0.25)` }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
            <PlusCircle className="w-5 h-5" /> New Signal
          </button>
        </div>
        <div className="mt-auto pt-6 border-t space-y-1" style={{ borderColor: SFCH }}>
          <button className="w-full flex items-center gap-3 px-5 py-3 rounded-full text-sm font-bold font-heading transition-all"
            style={{ color: OSV }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCH; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <Settings className="w-[22px] h-[22px]" /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-5 py-3 rounded-full text-sm font-bold font-heading transition-all"
            style={{ color: ERR }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff0f0"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <LogOut className="w-[22px] h-[22px]" /> Logout
          </button>
        </div>
      </aside>

      {/* ── 2-PANEL MAIN ── */}
      <main className="xl:ml-72 flex" style={{ height: "100vh" }}>

        {/* ── CONVERSATION LIST ── */}
        <section className="w-[30%] flex flex-col border-r" style={{ borderColor: `${SFC}80`, background: BG }}>

          {/* List header */}
          <div className="flex-shrink-0 p-6 pb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-xl tracking-tight" style={{ color: OBG }}>Inbox</h2>
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all"
                style={{ background: P }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
                <Edit className="w-4 h-4" />
              </button>
            </div>
            {/* Filter */}
            <div className="relative mb-4">
              <select
                className="w-full rounded-xl px-4 py-3 text-sm font-semibold appearance-none focus:outline-none border-0"
                style={{ background: SFCL, color: OBG }}>
                <option>All messages</option>
                <option>Awaiting response</option>
                <option>Unread</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 pointer-events-none" style={{ color: OTL }} />
            </div>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-3 w-4 h-4" style={{ color: OTL }} />
              <input
                className="w-full rounded-xl pl-11 pr-4 py-3 text-sm border-0 focus:outline-none"
                placeholder="Search leads..."
                type="text"
                style={{ background: SFCL, color: OBG }}
              />
            </div>
          </div>

          {/* Cards */}
          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
            {CONVS.map((conv) => {
              const isActive = conv.id === activeConv;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConv(conv.id)}
                  className="p-4 rounded-xl cursor-pointer transition-all"
                  style={{
                    background: isActive ? SFCL : "transparent",
                    opacity: conv.id === "sarah" ? 1 : 0.65,
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = SFCL; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                  {/* Row 1: avatar + name + time */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt={conv.name}
                          className={`w-12 h-12 rounded-full object-cover${conv.id !== "sarah" ? " grayscale" : ""}`}
                          src={conv.avatar}
                        />
                        {conv.status === "awaiting" && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                            style={{ background: ERR, borderColor: BG }} />
                        )}
                        {conv.status === "waiting" && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                            style={{ background: OTL, borderColor: BG }} />
                        )}
                        {conv.status === "closed" && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                            style={{ background: "#22c55e", borderColor: BG }} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm" style={{ color: OBG }}>{conv.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={conv.intentPct !== null
                            ? { background: P10, color: P }
                            : { background: SFCH, color: OTL }}>
                          {conv.intentLabel}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium flex-shrink-0" style={{ color: OTL }}>{conv.time}</span>
                  </div>
                  {/* Row 2: preview */}
                  <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: OSV }}>
                    {conv.preview}
                  </p>
                  {/* Row 3: badge + dot */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {conv.status === "awaiting" && (
                        <>
                          <span className="px-2 py-1 text-[10px] font-bold rounded-md"
                            style={{ background: "#ffedea", color: "#410002" }}>
                            Awaiting your response
                          </span>
                          <span className="text-[10px] font-bold" style={{ color: ERR }}>{conv.urgency}</span>
                        </>
                      )}
                      {conv.status === "waiting" && (
                        <span className="px-2 py-1 text-[10px] font-bold rounded-md"
                          style={{ background: SFCH, color: OSV }}>
                          Waiting on lead
                        </span>
                      )}
                      {conv.status === "closed" && (
                        <span className="px-2 py-1 text-[10px] font-bold rounded-md"
                          style={{ background: "#dcfce7", color: "#166534" }}>
                          Closed
                        </span>
                      )}
                    </div>
                    {conv.status === "awaiting" && (
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ERR }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CONVERSATION THREAD ── */}
        <section className="flex-1 flex flex-col" style={{ background: "white" }}>

          {/* Thread header */}
          <header className="flex-shrink-0 h-20 flex items-center justify-between px-8 border-b z-10"
            style={{ background: "rgba(255,253,245,0.9)", backdropFilter: "blur(20px)", borderColor: SFC }}>
            <div className="flex items-center gap-4">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Sarah Chen"
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                  style={{ background: "#22c55e", borderColor: "white" }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-lg leading-none" style={{ color: OBG }}>Sarah Chen</h3>
                  <BadgeCheck className="w-4 h-4" style={{ color: P }} />
                  <span className="text-[10px] font-black tracking-tight text-white px-2 py-0.5 rounded-full"
                    style={{ background: P }}>
                    89% INTENT
                  </span>
                </div>
                <p className="text-xs font-medium mt-1" style={{ color: OTL }}>Online · Active 4m ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold font-heading transition-all"
                style={{ background: SFCL }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCH; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = SFCL; }}>
                <Phone className="w-4 h-4" /> Call
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold font-heading transition-all"
                style={{ background: SFCL }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCH; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = SFCL; }}>
                <Calendar className="w-4 h-4" /> Schedule
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all"
                style={{ background: SFCL }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCH; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = SFCL; }}>
                <MoreHorizontal className="w-5 h-5" style={{ color: OTL }} />
              </button>
            </div>
          </header>

          {/* Message thread scroll area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">

            {/* Date pill */}
            <div className="text-center">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
                style={{ background: SFCL, color: OTL }}>
                Yesterday
              </span>
            </div>

            {/* Bubbles */}
            <div className="flex flex-col gap-6">
              {MESSAGES.map((msg) =>
                msg.from === "ai" ? (
                  <div key={msg.id} className="flex flex-col items-start max-w-[70%]">
                    <div className="flex items-center gap-2 mb-1 ml-2">
                      <span className="text-[10px] font-bold" style={{ color: P }}>AI Assistant</span>
                      <span className="text-[10px]" style={{ color: OTL }}>{msg.time}</span>
                    </div>
                    <div className="px-5 py-3 rounded-2xl rounded-tl-none text-sm font-medium leading-relaxed shadow-sm"
                      style={{ background: "rgba(240,235,255,0.5)", color: "#2a0066" }}>
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex flex-col items-end self-end max-w-[70%]">
                    <div className="flex items-center gap-2 mb-1 mr-2">
                      <span className="text-[10px]" style={{ color: OTL }}>{msg.time}</span>
                      <span className="text-[10px] font-bold" style={{ color: OBG }}>Sarah</span>
                    </div>
                    <div className="px-5 py-3 rounded-2xl rounded-tr-none text-sm font-medium leading-relaxed shadow-sm"
                      style={{ background: SFCL, color: OBG }}>
                      {msg.text}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* SAY THIS NOW card */}
            <div className="rounded-xl p-6 border-2 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${P15} 0%, ${P5} 100%)`,
                borderColor: P10,
                boxShadow: `0 20px 48px ${P5}`,
              }}>
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: P10, filter: "blur(48px)" }} />
              <div className="flex items-center justify-between mb-4 relative">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚀</span>
                  <span className="font-heading font-extrabold text-sm tracking-widest uppercase" style={{ color: P }}>
                    SAY THIS NOW
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border"
                  style={{ background: "rgba(255,255,255,0.5)", borderColor: P10 }}>
                  <Sparkles className="w-3.5 h-3.5" style={{ color: P }} />
                  <span className="text-[10px] font-bold" style={{ color: P }}>AI Confidence: 89%</span>
                </div>
              </div>
              <p className="font-semibold text-lg leading-snug mb-6 relative" style={{ color: OBG }}>
                {AI_MSG}
              </p>
              <div className="flex items-center gap-3 relative">
                <button
                  className="px-8 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-[1.02]"
                  style={{ background: P, boxShadow: `0 8px 24px rgba(124,92,255,0.3)` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
                  SEND NOW
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all"
                  style={{ background: "rgba(255,255,255,0.6)", color: OBG }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.6)"; }}>
                  <Pencil className="w-4 h-4" /> EDIT
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    color: copied ? "#16a34a" : OBG,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.6)"; }}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "COPIED!" : "COPY"}
                </button>
              </div>
            </div>

            {/* Response time warning */}
            <div className="flex items-center justify-between p-4 rounded-xl"
              style={{ background: `${SFCL}99` }}>
              <div className="flex items-center gap-3">
                <span className="text-xl">⏱️</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: OBG }}>
                    You responded in{" "}
                    <span className="font-bold" style={{ color: ERR }}>4 hours</span>.
                  </p>
                  <p className="text-xs" style={{ color: OTL }}>
                    Hot leads usually get a response within 2 hours.
                  </p>
                </div>
              </div>
              <button className="text-xs font-bold underline decoration-2 underline-offset-4 flex-shrink-0"
                style={{ color: P }}>
                Speed tips
              </button>
            </div>

          </div>

          {/* Compose footer */}
          <footer className="flex-shrink-0 p-6 border-t"
            style={{ background: "rgba(255,253,245,0.95)", backdropFilter: "blur(12px)", borderColor: SFC }}>
            <div className="flex items-end gap-4 p-3 rounded-[2rem] border"
              style={{ background: SFCL, borderColor: `${SFC}80` }}>
              <button
                className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors"
                style={{ color: OTL }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = P; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = OTL; }}>
                <PlusCircle className="w-5 h-5" />
              </button>
              <textarea
                className="flex-1 border-0 focus:ring-0 focus:outline-none text-sm font-medium py-2 resize-none leading-relaxed bg-transparent"
                placeholder="Type a message to Sarah..."
                rows={1}
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                style={{ color: OBG, minHeight: "40px" }}
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className="w-10 h-10 flex items-center justify-center transition-colors"
                  style={{ color: OTL }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = P; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = OTL; }}>
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 flex-shrink-0"
                  style={{ background: P, boxShadow: `0 4px 16px rgba(124,92,255,0.35)` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-3 gap-6">
              <button
                className="text-[10px] font-bold flex items-center gap-1 transition-colors"
                style={{ color: OTL }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = P; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = OTL; }}>
                <Zap className="w-3 h-3" /> QUICK REPLIES
              </button>
              <button
                className="text-[10px] font-bold flex items-center gap-1 transition-colors"
                style={{ color: OTL }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = P; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = OTL; }}>
                <Paperclip className="w-3 h-3" /> ATTACH LISTING
              </button>
            </div>
          </footer>

        </section>
      </main>
    </div>
  );
}
