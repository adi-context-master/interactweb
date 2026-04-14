"use client";

import React, { useState } from "react";
import {
  ArrowLeft, Bot, CheckCheck, CreditCard, MapPin, Calendar,
  Zap, Copy, Phone, MessageSquare, CalendarDays,
  AlertTriangle, Globe, Settings, LogOut, BadgeCheck, Check, Gauge,
  LayoutDashboard, GitBranch, UserSearch, BarChart3, Sliders, PlusCircle, ShoppingCart,
} from "lucide-react";
import Link from "next/link";

/* ─── palette ─────────────────────────────────────────────────────── */
const P    = "#7C5CFF";
const P5   = "rgba(124,92,255,0.05)";
const P10  = "rgba(124,92,255,0.10)";
const PDIM = "#6648e6";
const BG   = "#fffdf5";
const SFCL = "#faf8f0";
const SFCH = "#e3e3dd";
const SFC  = "#e9e8e3";
const OBG  = "#2e2f2c";
const OSV  = "#5b5c58";
const ERR  = "#b41340";

const sideActive = { background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", color: P };

/* ─── sidebar nav ─────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",           href: "/dashboard",         active: false },
  { icon: ShoppingCart,    label: "Shopping Behaviors", href: "/shopping-behavior", active: false },
  { icon: GitBranch,       label: "Pipeline",           href: "/pipeline",          active: false },
  { icon: UserSearch,      label: "Leads",        href: "/leads",        active: true  },
  { icon: BarChart3,       label: "Insights",     href: "/insights",     active: false },
  { icon: Sliders,         label: "Lead Scoring", href: "/lead-scoring", active: false },
  { icon: MessageSquare,   label: "Messages",     href: "/messages",     active: false },
];

/* ─── chat data ───────────────────────────────────────────────────── */
type ChatMsg = {
  from: "ai" | "lead";
  text: string;
  time: string;
  signals: { Icon: React.ElementType; label: string }[];
};

const CHAT: ChatMsg[] = [
  {
    from: "ai",
    text: "Hi Sarah! I noticed you were looking at the 3rd floor loft at 450 Bryant. Are you still targeting a move-in before the September semester starts?",
    time: "10:42 AM",
    signals: [],
  },
  {
    from: "lead",
    text: "Yes, definitely. But I need to stay under $850k and I\u2019m worried about the HOA fees on that building. Do you have anything else in the area?",
    time: "10:45 AM",
    signals: [
      { Icon: CreditCard, label: "Financing Signal" },
      { Icon: MapPin,     label: "Area Signal" },
    ],
  },
  {
    from: "ai",
    text: "Understood. I\u2019ve found 3 off-market units that meet that criteria. One has a private roof deck. Should I have my human partner, Marcus, send over the spreadsheets for those today?",
    time: "10:46 AM",
    signals: [],
  },
  {
    from: "lead",
    text: "That would be great. I\u2019m actually free Saturday morning if we could do a quick tour of any of them.",
    time: "11:02 AM",
    signals: [{ Icon: Calendar, label: "Timeline Signal" }],
  },
];

const SAY_THIS = "\u201cHey Sarah, Marcus here. Just saw your note about Saturday. I\u2019ve secured early access to 3 units under $850k near that Downtown Loft you liked. One is still being renovated but looks perfect for your Sept deadline. Can we do a 15-min tour this Sat at 10am?\u201d";

const FOOTPRINT = [
  { active: true,  label: "Pre-approved up to $900k", sub: "Confirmed via SoFi connection" },
  { active: false, label: "Viewed 12 Lofts",          sub: "Focus: SOMA & South Beach"     },
  { active: true,  label: "Sept 1st Hard Deadline",   sub: "Starting faculty position at UCSF" },
];

const SIGNALS = [
  { emoji: "🏠", title: "Shopping Behavior", desc: "Industrial lofts with high ceilings." },
  { emoji: "💰", title: "Financial Ready",   desc: "Proof of funds uploaded. 20% down."  },
];

export default function ProfilePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SAY_THIS.replace(/[\u201c\u201d]/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen font-body antialiased" style={{ background: BG, color: OBG }}>

      {/* ── SIDEBAR ── */}
      <aside className="hidden xl:flex h-screen w-72 fixed left-0 top-0 flex-col p-8 gap-2 z-40 border-r"
        style={{ background: SFCL, borderColor: SFC }}>
        <div className="mb-10 px-2">
          <span className="font-heading font-extrabold text-2xl tracking-tighter" style={{ color: OBG }}>Engagely AI</span>
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
          <button className="w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 text-sm font-heading active:scale-[0.98] transition-all text-white"
            style={{ background: P, boxShadow: `0 8px 24px ${P}33` }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
            <PlusCircle className="w-5 h-5" /> New Signal
          </button>
        </div>

        <div className="mt-auto pt-6 border-t space-y-1" style={{ borderColor: SFCH }}>
          <Link href="/settings"
            className="flex items-center gap-3 px-5 py-3 rounded-full transition-all font-heading text-sm font-bold"
            style={{ color: OSV }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCH; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <Settings className="w-[22px] h-[22px]" /> Settings
          </Link>
          <a href="#"
            className="flex items-center gap-3 px-5 py-3 rounded-full transition-all font-heading text-sm font-bold"
            style={{ color: ERR }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff0f0"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <LogOut className="w-[22px] h-[22px]" /> Logout
          </a>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: SFCH }}>
            <div className="flex items-center gap-3 px-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Julian Thorne"
                className="w-10 h-10 rounded-full object-cover"
                style={{ boxShadow: `0 0 0 2px ${P}20` }}
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
              <div className="flex flex-col">
                <span className="text-[13px] font-bold" style={{ color: OBG }}>Julian Thorne</span>
                <span className="text-[11px] font-medium" style={{ color: `${OBG}50` }}>Senior Curator</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="xl:ml-72 p-12 min-h-screen">
        <div className="max-w-6xl mx-auto">

          {/* Page header */}
          <header className="flex items-center gap-8 mb-12">
            <Link href="/leads"
              className="w-12 h-12 flex items-center justify-center rounded-2xl border transition-all flex-shrink-0"
              style={{ background: "white", borderColor: "rgba(0,0,0,0.05)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${OBG}06`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
              <ArrowLeft className="w-5 h-5" style={{ color: OBG }} />
            </Link>
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-5xl font-black font-heading tracking-tight leading-none" style={{ color: OBG }}>
                  Sarah Chen
                </h1>
                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border"
                  style={{ background: P10, color: P, borderColor: P10 }}>
                  89% INTENT
                </span>
              </div>
              <p className="text-sm font-semibold mt-2 flex items-center gap-2" style={{ color: `${OBG}55` }}>
                <span className="w-2 h-2 rounded-full inline-block bg-green-500" />
                Last active: 4 mins ago · San Francisco, CA
              </p>
            </div>
          </header>

          {/* 12-col grid */}
          <div className="grid grid-cols-12 gap-12 items-start">

            {/* ─ LEFT COLUMN (8 cols) ─ */}
            <div className="col-span-12 lg:col-span-8 space-y-10">

              {/* AI Concierge Protocol */}
              <section className="bg-white rounded-[2rem] p-10 border border-black/5"
                style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-heading font-black text-xl flex items-center gap-3" style={{ color: OBG }}>
                    <Bot className="w-6 h-6" style={{ color: P }} />
                    AI Concierge Protocol
                  </h2>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: P }}>Live Thread</span>
                </div>

                <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 scrollbar-none">
                  {CHAT.map((msg, i) =>
                    msg.from === "ai" ? (
                      <div key={i} className="flex flex-col items-start max-w-[85%]">
                        <div className="p-6 rounded-3xl rounded-tl-none border text-sm font-medium leading-relaxed"
                          style={{ background: P5, color: OBG, borderColor: `${P}0e` }}>
                          {msg.text}
                        </div>
                        <div className="flex gap-3 mt-2 px-2 items-center">
                          <CheckCheck className="w-3 h-3" style={{ color: `${P}50` }} />
                          <span className="text-[10px] font-bold" style={{ color: `${OBG}40` }}>{msg.time}</span>
                        </div>
                      </div>
                    ) : (
                      <div key={i} className="flex flex-col items-end ml-auto max-w-[85%]">
                        <div className="p-6 rounded-3xl rounded-tr-none border text-sm font-medium leading-relaxed"
                          style={{ background: `${OBG}09`, color: OBG, borderColor: "rgba(0,0,0,0.05)" }}>
                          {msg.text}
                        </div>
                        <div className="flex gap-2 mt-2 px-2 items-center">
                          {msg.signals.map(({ Icon, label }) => (
                            <Icon key={label} className="w-3.5 h-3.5" style={{ color: P }} />
                          ))}
                          <span className="text-[10px] font-bold" style={{ color: `${OBG}40` }}>{msg.time}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* Say This Now */}
              <section className="bg-white rounded-[2rem] p-10 border border-black/5 relative overflow-hidden"
                style={{ boxShadow: `0 20px 48px rgba(124,92,255,0.07)` }}>
                {/* Left accent stripe */}
                <div className="absolute top-0 left-0 bottom-0 w-2" style={{ background: P }} />

                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: P, boxShadow: `0 8px 24px rgba(124,92,255,0.3)` }}>
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-black tracking-tight uppercase text-sm" style={{ color: OBG }}>
                        Say This Now
                      </h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: P }}>
                          AI Confidence: 89%
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: `${OBG}30` }}>
                          Est. Duration: 12m
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                    style={{ background: `${OBG}08`, color: `${OBG}60` }}>
                    Optimized for Response
                  </span>
                </div>

                <div className="p-8 rounded-2xl mb-10 border" style={{ background: BG, borderColor: "rgba(0,0,0,0.05)" }}>
                  <p className="text-xl font-bold italic font-heading tracking-tight leading-relaxed" style={{ color: OBG }}>
                    {SAY_THIS}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    className="flex-[2] py-5 rounded-2xl font-heading font-black text-sm uppercase tracking-[0.15em] text-white transition-all"
                    style={{ background: P, boxShadow: `0 12px 32px rgba(124,92,255,0.25)` }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
                    Send Now
                  </button>
                  <button
                    className="flex-1 py-5 rounded-2xl font-heading font-bold text-sm uppercase tracking-widest transition-all"
                    style={{ background: `${OBG}08`, color: OBG }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${OBG}14`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${OBG}08`; }}>
                    Edit
                  </button>
                  <button
                    onClick={handleCopy}
                    className="w-16 h-16 flex items-center justify-center rounded-2xl transition-all flex-shrink-0"
                    style={{
                      background: copied ? "rgba(22,163,74,0.1)" : `${OBG}08`,
                      color: copied ? "#16a34a" : OBG,
                    }}
                    onMouseEnter={(e) => { if (!copied) (e.currentTarget as HTMLElement).style.background = `${OBG}14`; }}
                    onMouseLeave={(e) => { if (!copied) (e.currentTarget as HTMLElement).style.background = `${OBG}08`; }}>
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </section>
            </div>

            {/* ─ RIGHT COLUMN (4 cols) ─ */}
            <aside className="col-span-12 lg:col-span-4 space-y-8">

              {/* Primary Actions */}
              <div className="bg-white p-8 rounded-[2rem] border border-black/5 space-y-4"
                style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)" }}>
                <button
                  className="w-full flex items-center justify-center gap-4 text-white py-6 rounded-2xl font-heading font-black text-lg uppercase tracking-[0.2em] transition-all"
                  style={{ background: ERR, boxShadow: `0 16px 40px rgba(180,19,64,0.25)` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "none"; }}>
                  <Phone className="w-6 h-6" /> Call Now
                </button>
                <button
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-heading font-black text-xs uppercase tracking-widest border-2 transition-all"
                  style={{ borderColor: `${P}30`, color: P }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = P5; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                  <MessageSquare className="w-4 h-4" /> Send Message
                </button>
                <button
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-heading font-black text-xs uppercase tracking-widest transition-all"
                  style={{ background: `${OBG}08`, color: `${OBG}60` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${OBG}14`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${OBG}08`; }}>
                  <CalendarDays className="w-4 h-4" /> Schedule Tour
                </button>
              </div>

              {/* Digital Footprint */}
              <div className="bg-white p-8 rounded-[2rem] border"
                style={{ borderColor: "#f1f5f9", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.02)" }}>
                <h4 className="font-heading font-black text-xs uppercase tracking-[0.2em] mb-8"
                  style={{ color: `${OBG}40` }}>
                  Digital Footprint
                </h4>
                <div className="relative pl-8 space-y-8" style={{ borderLeft: `2px solid ${P}28` }}>
                  {FOOTPRINT.map((item, i) => (
                    <div key={i} className="relative">
                      <div
                        className="absolute -left-[2.55rem] top-1 w-5 h-5 rounded-full"
                        style={{
                          background: item.active ? P : `${OBG}20`,
                          boxShadow: `0 0 0 4px ${BG}, 0 2px 6px rgba(0,0,0,0.12)`,
                        }}
                      />
                      <p className="text-sm font-black" style={{ color: OBG }}>{item.label}</p>
                      <p className="text-[11px] font-medium mt-1" style={{ color: `${OBG}50` }}>{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signals */}
              <div className="space-y-4">
                {SIGNALS.map((s) => (
                  <div key={s.title} className="bg-white p-6 rounded-2xl flex gap-5 items-center border"
                    style={{ borderColor: "#f1f5f9", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.02)" }}>
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl flex-shrink-0"
                      style={{ background: P5 }}>
                      {s.emoji}
                    </div>
                    <div>
                      <h5 className="text-[11px] font-black font-heading uppercase tracking-widest"
                        style={{ color: `${OBG}40` }}>
                        {s.title}
                      </h5>
                      <p className="text-xs font-bold leading-tight mt-1" style={{ color: OBG }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Move Fast Alert */}
              <div className="p-8 rounded-[2rem] text-white relative overflow-hidden"
                style={{ background: P, boxShadow: `0 20px 48px rgba(124,92,255,0.35)` }}>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4" />
                    <h4 className="font-heading font-black text-xs tracking-widest uppercase">Move Fast</h4>
                  </div>
                  <p className="text-4xl font-heading font-black mb-2 leading-none">~2 HOUR WINDOW</p>
                  <p className="text-[11px] font-medium opacity-80 mb-6 leading-relaxed">
                    Detected high Zillow activity on 3 saved properties. 2 competitor agents viewed profile.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border"
                      style={{ background: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.1)" }}>
                      Actively Shopping
                    </span>
                    <Globe className="w-5 h-5 opacity-50 animate-pulse" />
                  </div>
                </div>
                {/* Decorative icon */}
                <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                  <Gauge className="w-36 h-36 text-white" />
                </div>
              </div>

            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
