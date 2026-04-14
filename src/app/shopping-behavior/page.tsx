"use client";

import React from "react";
import {
  LayoutDashboard, GitBranch, UserSearch, BarChart3, Sliders, MessageSquare,
  Settings, LogOut, BadgeCheck, PlusCircle, TrendingUp, Eye, MousePointer2,
  MessageCircle, Clock, Bell, Send, ShoppingCart, ChevronRight, CreditCard, Zap,
} from "lucide-react";
import Link from "next/link";

/* ─── palette ─────────────────────────────────────────────────────── */
const P      = "#7C5CFF";
const P5     = "rgba(124,92,255,0.05)";
const P10    = "rgba(124,92,255,0.10)";
const P20    = "rgba(124,92,255,0.20)";
const PDIM   = "#6648e6";
const BG     = "#fffdf5";
const SFCL   = "#faf8f0";
const SFCLOW = "#fffef9";
const SFCH   = "#e3e3dd";
const SFCHIGH= "#f0ede6";
const SFC    = "#e9e8e3";
const OBG    = "#2e2f2c";
const OSV    = "#5b5c58";
const ERR    = "#b41340";

const sideActive = { background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", color: P };

/* ─── nav ─────────────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",           href: "/dashboard",         active: false },
  { icon: Zap,             label: "Intent Signals",      href: "/intent-signals",    active: false },
  { icon: GitBranch,       label: "Pipeline",            href: "/pipeline",          active: false },
  { icon: UserSearch,      label: "Leads",               href: "/leads",             active: false },
  { icon: BarChart3,       label: "Insights",            href: "/insights",          active: false },
  { icon: Sliders,         label: "Lead Scoring",        href: "/lead-scoring",      active: false },
  { icon: MessageSquare,   label: "Messages",            href: "/messages",          active: false },
];

/* ─── data ─────────────────────────────────────────────────────────── */
const SEQUENCE = [
  { num: "01", title: "Discovery",    desc: "Initial filter application and neighborhood scoping.", accent: true },
  { num: "02", title: "Engagement",   desc: "Repeated views and photo gallery interaction depth.", accent: false },
  { num: "03", title: "Conversation", desc: "Specific inquiries regarding property tax or HOA.", accent: false },
  { num: "04", title: "Decision",     desc: "Request for tour or private showing validation.", accent: false },
];

const METRICS = [
  { icon: Eye,           label: "Avg Properties Viewed", value: "8.4", badge: "+12% vs LW", badgeColor: P },
  { icon: MousePointer2, label: "Engagement Depth",      value: "24m", badge: "Stable",     badgeColor: P },
  { icon: MessageCircle, label: "Conversation Patterns", value: "High",badge: "Intense",    badgeColor: PDIM },
  { icon: Clock,         label: "Timeline Correlation",  value: "42h", badge: "−4h Shift",  badgeColor: ERR },
];

const DONUTS = [
  { pct: 78, offset: 80.2,  label: "Ask about neighborhood" },
  { pct: 81, offset: 69.2,  label: "Request viewing" },
  { pct: 80, offset: 72.8,  label: "Discuss financing" },
];

const LEADS = [
  { initials: "SC", name: "Sarah Chen",    match: 89, top: true  },
  { initials: "JK", name: "Jordan King",   match: 81, top: false },
  { initials: "MW", name: "Marcus Wilson", match: 82, top: false },
];

const PLAYBOOK = [
  { step: "01", title: "Respond Fast",            desc: "Within 2 hours — critical for conversion."  },
  { step: "02", title: "Lead with Financing",     desc: "They asked, they're ready for numbers."     },
  { step: "03", title: "Focus on Neighborhoods",  desc: "They know exactly what they want."          },
  { step: "04", title: "Suggest Immediate Tour",  desc: "Timing matters. Close the viewing today."   },
];

export default function ShoppingBehaviorPage() {
  return (
    <div className="min-h-screen font-body antialiased" style={{ background: BG, color: OBG }}>

      {/* ── SIDEBAR ── */}
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
              <div>
                <p className="text-[13px] font-bold" style={{ color: OBG }}>Julian Thorne</p>
                <p className="text-[11px] font-medium" style={{ color: `${OBG}50` }}>Senior Curator</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="xl:ml-72 p-12 min-h-screen">

        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-sm font-medium" style={{ color: `${OSV}99` }}>
          <Link href="/dashboard" className="transition-colors hover:text-[#7C5CFF]">Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <span style={{ color: OBG }}>Shopping Behavior Analytics</span>
        </nav>

        {/* Header */}
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="font-heading font-extrabold tracking-tight leading-tight"
              style={{ fontSize: "3.5rem", color: OBG }}>
              Shopping Behavior Analytics
            </h1>
            <p className="text-lg mt-2" style={{ color: OSV }}>
              Behavioral patterns of high-intent property shoppers
            </p>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <button className="p-3 rounded-full transition-colors"
              style={{ background: SFCLOW }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCH; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = SFCLOW; }}>
              <Bell className="w-5 h-5" style={{ color: OBG }} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Agent Profile"
              className="w-12 h-12 rounded-full object-cover border-2"
              style={{ borderColor: P20 }}
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" />
          </div>
        </header>

        {/* ── HERO ── */}
        <section className="mb-16 relative overflow-hidden rounded-2xl p-12 flex items-center min-h-[300px]"
          style={{ background: `rgba(164,145,255,0.25)` }}>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 text-white"
              style={{ background: P }}>
              Flash Insight
            </span>
            <h3 className="font-heading text-4xl font-bold mb-4"
              style={{ color: "#230075" }}>
              "High-intent shoppers view 5+ properties within 48 hours"
            </h3>
            <div className="flex items-center gap-2 font-bold text-2xl" style={{ color: P }}>
              <TrendingUp className="w-6 h-6" />
              37% conversion lift
            </div>
          </div>
          {/* decorative overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(135deg, transparent 60%, ${P}15)` }} />
        </section>

        {/* ── BEHAVIORAL SEQUENCE ── */}
        <section className="mb-16">
          <SectionTitle>The Behavioral Sequence</SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {SEQUENCE.map((s) => (
              <div key={s.num} className="bg-white p-8 rounded-2xl border-t-4"
                style={{
                  borderTopColor: s.accent ? P : `${P}33`,
                  boxShadow: "0px 20px 40px rgba(46,47,44,0.04)",
                }}>
                <div className="text-4xl font-black font-heading mb-4" style={{ color: P, opacity: 0.2 }}>
                  {s.num}
                </div>
                <p className="font-heading text-lg font-bold" style={{ color: OBG }}>{s.title}</p>
                <p className="text-sm leading-relaxed mt-2" style={{ color: OSV }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── METRICS ── */}
        <section className="mb-16">
          <SectionTitle>Detection Timeline &amp; Metrics</SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {METRICS.map(({ icon: Icon, label, value, badge, badgeColor }) => (
              <div key={label} className="p-8 rounded-2xl border"
                style={{ background: SFCLOW, borderColor: `${SFCHIGH}80` }}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-2 rounded-full" style={{ background: P10 }}>
                    <Icon className="w-5 h-5" style={{ color: P }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: badgeColor }}>{badge}</span>
                </div>
                <div className="text-4xl font-heading font-extrabold" style={{ color: OBG }}>{value}</div>
                <p className="text-sm font-semibold uppercase tracking-wider mt-1" style={{ color: OSV }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONVERSATION PATTERNS ── */}
        <section className="mb-16 bg-white rounded-2xl p-10"
          style={{ boxShadow: "0px 20px 40px rgba(46,47,44,0.04)" }}>
          <SectionTitle>Conversation Patterns</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            {DONUTS.map(({ pct, offset, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="58" fill="transparent"
                      stroke={SFCHIGH} strokeWidth="8" />
                    <circle cx="64" cy="64" r="58" fill="transparent"
                      stroke={P} strokeWidth="8"
                      strokeDasharray="364.4"
                      strokeDashoffset={offset}
                      strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-2xl font-heading font-extrabold" style={{ color: OBG }}>
                    {pct}%
                  </span>
                </div>
                <p className="text-sm font-bold uppercase tracking-wide" style={{ color: OBG }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SIGNAL TYPES + VALUE PER LEAD ── */}
        <section className="grid grid-cols-12 gap-12 mb-16">

          {/* Left: bars + lead list */}
          <div className="col-span-12 lg:col-span-7 space-y-12">

            {/* Signal accuracy bars */}
            <div>
              <SectionTitle>Signal Types vs Other Signals</SectionTitle>
              <div className="space-y-6 mt-8">
                {/* Shopping Behavior */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase"
                      style={{ background: P10, color: P }}>
                      Shopping Behavior
                    </span>
                    <span className="text-xs font-semibold" style={{ color: P }}>88% Accuracy</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: SFCHIGH }}>
                    <div className="h-full rounded-full" style={{ width: "88%", background: P }} />
                  </div>
                </div>
                {/* Generic Search */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase"
                      style={{ background: SFCHIGH, color: OSV }}>
                      Generic Search
                    </span>
                    <span className="text-xs font-semibold" style={{ color: OSV }}>42% Accuracy</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: SFCHIGH }}>
                    <div className="h-full rounded-full" style={{ width: "42%", background: "#777773" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent signals */}
            <div>
              <h4 className="font-heading text-xl font-bold flex items-center gap-3 mb-6" style={{ color: OBG }}>
                <UserSearch className="w-5 h-5" style={{ color: P }} />
                Recent Signals &amp; Lead Examples
              </h4>
              <div className="space-y-3">
                {LEADS.map(({ initials, name, match, top }) => (
                  <div key={name}
                    className="flex items-center justify-between p-4 rounded-xl border-l-4"
                    style={{
                      background: SFCLOW,
                      borderLeftColor: top ? P : `${P}66`,
                    }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{ background: P10, color: P }}>
                        {initials}
                      </div>
                      <span className="font-bold" style={{ color: OBG }}>{name}</span>
                    </div>
                    <span className="px-4 py-1 rounded-full text-sm font-bold text-white"
                      style={{ background: top ? P : P20, color: top ? "white" : P }}>
                      {match}% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: value per lead */}
          <div className="col-span-12 lg:col-span-5 bg-white p-10 rounded-2xl relative overflow-hidden border"
            style={{ borderColor: `${SFCHIGH}80`, boxShadow: "0px 20px 40px rgba(46,47,44,0.04)" }}>
            <div className="relative z-10">
              <h4 className="font-heading text-2xl font-bold mb-2" style={{ color: OBG }}>Value per Lead</h4>
              <p className="mb-6" style={{ color: OSV }}>Calculated ROI based on high-intent shopping triggers.</p>
              <div className="font-heading font-extrabold" style={{ fontSize: "3.75rem", color: P, lineHeight: 1 }}>
                $1,240
                <span className="text-lg font-medium" style={{ color: OSV }}>/lead</span>
              </div>
              <div className="mt-8 flex gap-4">
                <span className="px-4 py-2 rounded-full text-xs font-bold" style={{ background: P10, color: P }}>
                  P-Index: 0.92
                </span>
                <span className="px-4 py-2 rounded-full text-xs font-bold" style={{ background: P10, color: P }}>
                  Growth: +14%
                </span>
              </div>
            </div>
            {/* decorative */}
            <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
              <CreditCard className="w-48 h-48" style={{ color: OBG }} />
            </div>
          </div>
        </section>

        {/* ── AGENT PLAYBOOK ── */}
        <section className="rounded-2xl p-12 relative overflow-hidden" style={{ background: OBG }}>
          <div className="relative z-10">
            <h4 className="font-heading text-3xl font-bold mb-4 text-white">Agent Playbook</h4>
            <p className="text-lg leading-relaxed mb-10 max-w-3xl"
              style={{ color: `${SFCHIGH}cc` }}>
              When a shopper hits the 48-hour threshold, speed to response is the primary driver for capture.
              Deploy this optimized 4-step sequence to secure the client.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {PLAYBOOK.map(({ step, title, desc }) => (
                <div key={step} className="p-6 rounded-xl border"
                  style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.10)" }}>
                  <p className="text-sm font-bold mb-2" style={{ color: P }}>STEP {step}</p>
                  <p className="font-heading font-bold text-lg uppercase tracking-wide text-white mb-2">{title}</p>
                  <p className="text-sm" style={{ color: `${SFCHIGH}99` }}>{desc}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all"
                style={{ background: P, boxShadow: `0 8px 24px ${P}44` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
                <Send className="w-4 h-4" /> Launch Automation
              </button>
              <button className="px-8 py-4 rounded-full font-bold text-white border transition-all"
                style={{ borderColor: "rgba(255,255,255,0.30)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                View Full Guide
              </button>
            </div>
          </div>
          {/* decorative orb */}
          <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full pointer-events-none opacity-10 blur-3xl"
            style={{ background: `linear-gradient(135deg, ${P}, #a491ff)` }} />
        </section>

      </main>
    </div>
  );
}

/* ── shared section title ── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-heading text-xl font-bold flex items-center gap-3" style={{ color: "#2e2f2c" }}>
      <span className="w-8 flex-shrink-0" style={{ height: 2, background: "#7C5CFF", display: "inline-block" }} />
      {children}
    </h4>
  );
}
