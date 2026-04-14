"use client";

import {
  LayoutDashboard, GitBranch, BarChart3, Sliders, MessageSquare,
  Settings, LogOut, BadgeCheck, Download,
  Sparkles, CheckCircle, AlertTriangle, Lightbulb, TrendingUp,
  PlusCircle, ChevronDown, Medal, Users, MessageCircle, Clock,
  ArrowUp, ArrowDown, Minus as MinusIcon, Target, Zap,
  UserSearch,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ─── palette ─────────────────────────────────────────────────────── */
const P       = "#7C5CFF";
const P5      = "rgba(124,92,255,0.05)";
const P10     = "rgba(124,92,255,0.10)";
const PDIM    = "#6647e6";
const BG      = "#fffdf5";
const SFCL    = "#faf8f0";
const SFCH    = "#e3e3dd";
const SFC     = "#e9e8e3";
const OBG     = "#2e2f2c";
const OSV     = "#5b5c58";
const OTL     = "#777773";
const ERR     = "#b41340";
const sideActive = { background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", color: P };

/* ─── sidebar nav ─────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",           href: "/dashboard",         active: false },
  { icon: Zap,             label: "Intent Signals",     href: "/intent-signals",    active: false },
  { icon: GitBranch,       label: "Pipeline",           href: "/pipeline",          active: false },
  { icon: UserSearch,      label: "Leads",        href: "/leads",     active: false },
  { icon: BarChart3,       label: "Insights",     href: "/insights",  active: true  },
  { icon: Sliders,         label: "Lead Scoring", href: "/lead-scoring", active: false },
  { icon: MessageSquare,   label: "Messages",     href: "/messages",     active: false },
];

/* ─── team leaderboard data ───────────────────────────────────────── */
type TeamMember = {
  initials: string;
  bg: string;
  text: string;
  name: string;
  role: string;
  leads: number;
  convRate: string;
  responseTime: string;
  satisfaction: string;
  isYou: boolean;
};

const TEAM: TeamMember[] = [
  {
    initials: "JT", bg: "#b41340", text: "white",
    name: "Jessica Taylor", role: "Senior Agent",
    leads: 23, convRate: "34%", responseTime: "2.1hrs", satisfaction: "4.9",
    isYou: false,
  },
  {
    initials: "MV", bg: P, text: "white",
    name: "Marcus Vega", role: "Your Account",
    leads: 18, convRate: "28%", responseTime: "3.2hrs", satisfaction: "4.7",
    isYou: true,
  },
  {
    initials: "ER", bg: "#D97706", text: "white",
    name: "Elena Reyes", role: "Junior Agent",
    leads: 12, convRate: "19%", responseTime: "5.4hrs", satisfaction: "4.5",
    isYou: false,
  },
];

/* ─── funnel steps ────────────────────────────────────────────────── */
const FUNNEL = [
  { label: "Conversations", value: 127, pct: 100, color: P },
  { label: "Completed",     value: 94,  pct: 74,  color: "#818cf8" },
  { label: "Contact Info",  value: 61,  pct: 48,  color: "#a5b4fc" },
  { label: "Tours",         value: 31,  pct: 24,  color: "#c7d2fe" },
];

/* ─── funnel mini-metrics ─────────────────────────────────────────── */
const FUNNEL_METRICS = [
  { label: "Avg Session",    value: "4m 23s", icon: Clock,        trend: "+0.5m",  up: true  },
  { label: "Drop-off Rate",  value: "26%",    icon: ArrowDown,    trend: "-3%",    up: true  },
  { label: "Return Users",   value: "42%",    icon: Users,        trend: "+8%",    up: true  },
  { label: "Peak Hour",      value: "2-4 PM", icon: Zap,          trend: "Tue-Thu",up: null  },
  { label: "Tours Booked",   value: "31",     icon: Target,       trend: "+5",     up: true  },
  { label: "Unqualified",    value: "33",     icon: MessageCircle,trend: "-4",     up: true  },
];

/* ─── bar chart data ──────────────────────────────────────────────── */
const BARS = [
  { day: "Apr 1",  h: 45, active: false },
  { day: "Apr 2",  h: 62, active: false },
  { day: "Apr 3",  h: 55, active: false },
  { day: "Apr 4",  h: 78, active: false },
  { day: "Apr 5",  h: 40, active: false },
  { day: "Apr 6",  h: 35, active: false },
  { day: "Apr 7",  h: 58, active: false },
  { day: "Apr 8",  h: 85, active: false },
  { day: "Apr 9",  h: 70, active: false },
  { day: "Apr 10", h: 92, active: false },
  { day: "Apr 11", h: 68, active: false },
  { day: "Apr 12", h: 75, active: false },
  { day: "Apr 13", h: 100,active: true  },
  { day: "Apr 14", h: 88, active: false },
];

/* ─── insight cards ───────────────────────────────────────────────── */
const INSIGHT_CARDS = [
  {
    icon: CheckCircle,
    title: "What\u2019s Working",
    accent: "#16a34a",
    bg: "rgba(240,253,244,0.7)",
    border: "rgba(134,239,172,0.4)",
    items: [
      "After-hours chatbot converts 47% better than during business hours",
      "Leads from Instagram ads have 2.3x higher engagement scores",
      "Video property tours increase tour booking rate by 31%",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Needs Improvement",
    accent: "#d97706",
    bg: "rgba(255,251,235,0.7)",
    border: "rgba(253,230,138,0.4)",
    items: [
      "Response times above 4hrs dropping conversion by ~18%",
      "27 leads went cold this month \u2014 no follow-up after initial chat",
      "Mobile users have 40% lower completion rate \u2014 optimize mobile flow",
    ],
  },
  {
    icon: Lightbulb,
    title: "Recommendations",
    accent: P,
    bg: P5,
    border: P10,
    items: [
      "Set up auto-follow-up for leads inactive >48hrs to recover cold leads",
      "A/B test shorter qualifying forms \u2014 target 3 questions max",
      "Schedule campaigns for 7\u20139 PM based on peak engagement patterns",
    ],
  },
];

/* ─── quick stats ─────────────────────────────────────────────────── */
const QUICK_STATS = [
  { label: "Leads Generated", value: "47",   change: "+12% vs last month", up: true,  accent: P,        borderColor: P },
  { label: "Lead Quality",    value: "78%",  change: "+5% vs last month",  up: true,  accent: "#16a34a", borderColor: "#86efac" },
  { label: "Conversion Rate", value: "24%",  change: "+3% vs last month",  up: true,  accent: "#2563eb", borderColor: "#93c5fd" },
  { label: "Response Time",   value: "4.2h", change: "+0.8h vs last month",up: false, accent: "#d97706", borderColor: "#fcd34d" },
];

export default function InsightsPage() {
  const [timePeriod, setTimePeriod] = useState("This month");

  return (
    <div className="min-h-screen font-body antialiased" style={{ background: BG, color: OBG }}>

      {/* ── LEFT SIDEBAR ── */}
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
        <div className="mt-auto space-y-1">
          <button className="w-full flex items-center gap-3 px-5 py-3.5 rounded-full text-sm font-bold font-heading transition-all"
            style={{ color: OSV }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCH; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <Settings className="w-[22px] h-[22px]" /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-5 py-3.5 rounded-full text-sm font-bold font-heading transition-all"
            style={{ color: OSV }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCH; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <LogOut className="w-[22px] h-[22px]" /> Log out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="xl:pl-72">
        <div className="max-w-[1200px] mx-auto px-6 py-10 pb-32">

          {/* ── PAGE HEADER ── */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-extrabold text-3xl tracking-tight" style={{ color: OBG }}>Insights</h1>
              <p className="text-sm mt-1" style={{ color: OTL }}>Performance analytics and recommendations</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-bold font-heading transition-all"
                style={{ background: "white", borderColor: SFC, color: OBG }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = P; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = SFC; }}>
                {timePeriod} <ChevronDown className="w-4 h-4" style={{ color: OTL }} />
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold font-heading transition-all"
                style={{ background: OBG, color: "white" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = OSV; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = OBG; }}>
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
          </div>

          {/* ── TOP QUALITY INSIGHT BANNER ── */}
          <div className="rounded-3xl p-6 mb-8 flex items-start justify-between gap-4"
            style={{ background: `linear-gradient(135deg, ${P} 0%, #9b7aff 50%, #b8a0ff 100%)` }}>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.2)" }}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70 mb-1">Top Quality Insight</p>
                <p className="font-heading font-bold text-lg text-white leading-snug">
                  Leads from evening campaigns (7\u20139 PM) convert 47% better
                </p>
                <p className="text-sm text-white/80 mt-1.5">
                  Based on 3 months of engagement data across 284 chatbot sessions
                </p>
              </div>
            </div>
            <button
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold font-heading transition-all"
              style={{ background: "white", color: P }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.9)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
              <Sparkles className="w-4 h-4" /> Apply Campaign
            </button>
          </div>

          {/* ── QUICK STATS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {QUICK_STATS.map((s) => (
              <div key={s.label}
                className="rounded-2xl border-l-4 p-5"
                style={{ background: "white", borderLeftColor: s.borderColor, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.1em] mb-3" style={{ color: OTL }}>{s.label}</p>
                <p className="font-heading font-extrabold text-3xl mb-2" style={{ color: OBG }}>{s.value}</p>
                <p className="text-xs font-semibold flex items-center gap-1"
                  style={{ color: s.up ? "#16a34a" : ERR }}>
                  {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {s.change}
                </p>
              </div>
            ))}
          </div>

          {/* ── TWO-COLUMN ROW: Leaderboard + Funnel ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* Team Performance Leaderboard */}
            <div className="rounded-3xl border p-6" style={{ background: "white", borderColor: SFC, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-heading font-bold text-lg" style={{ color: OBG }}>Team Performance</h2>
                  <p className="text-xs mt-0.5" style={{ color: OTL }}>Leaderboard · This month</p>
                </div>
                <Medal className="w-5 h-5" style={{ color: "#d97706" }} />
              </div>
              <div className="space-y-2">
                {/* Table header */}
                <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 px-3 py-2">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em]" style={{ color: OTL }}>Agent</span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-right" style={{ color: OTL }}>Leads</span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-right" style={{ color: OTL }}>Conv.</span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-right" style={{ color: OTL }}>Resp.</span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-right" style={{ color: OTL }}>Sat.</span>
                </div>
                {TEAM.map((m, i) => (
                  <div key={m.name}
                    className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 px-3 py-3 rounded-2xl items-center"
                    style={m.isYou ? {
                      background: P5,
                      borderLeft: `3px solid ${P}`,
                      paddingLeft: "0.625rem",
                    } : { background: i % 2 === 0 ? SFCL : "transparent" }}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: m.bg, color: m.text }}>
                        {m.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: OBG }}>{m.name}</p>
                        <p className="text-[0.65rem]" style={{ color: OTL }}>{m.role}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-right" style={{ color: OBG }}>{m.leads}</span>
                    <span className="text-sm font-bold text-right" style={{ color: "#16a34a" }}>{m.convRate}</span>
                    <span className="text-sm text-right" style={{ color: OTL }}>{m.responseTime}</span>
                    <span className="text-sm font-bold text-right" style={{ color: "#d97706" }}>{m.satisfaction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chatbot Funnel Efficiency */}
            <div className="rounded-3xl border p-6" style={{ background: "white", borderColor: SFC, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-heading font-bold text-lg" style={{ color: OBG }}>Chatbot Funnel</h2>
                  <p className="text-xs mt-0.5" style={{ color: OTL }}>Efficiency breakdown · 127 sessions</p>
                </div>
                <TrendingUp className="w-5 h-5" style={{ color: P }} />
              </div>
              {/* Funnel bars */}
              <div className="space-y-3 mb-5">
                {FUNNEL.map((step) => (
                  <div key={step.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold" style={{ color: OBG }}>{step.label}</span>
                      <span className="text-xs font-bold" style={{ color: step.color }}>{step.value}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: SFC }}>
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${step.pct}%`, background: step.color }} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Mini metric grid */}
              <div className="grid grid-cols-3 gap-2">
                {FUNNEL_METRICS.map((m) => (
                  <div key={m.label} className="rounded-xl p-3 text-center" style={{ background: SFCL }}>
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: OTL }}>{m.label}</p>
                    <p className="font-heading font-bold text-sm" style={{ color: OBG }}>{m.value}</p>
                    <p className="text-[0.6rem] mt-0.5 font-semibold"
                      style={{ color: m.up === true ? "#16a34a" : m.up === false ? ERR : OTL }}>
                      {m.trend}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── ENGAGEMENT ACTIVITY TRENDS ── */}
          <div className="rounded-3xl border p-6 mb-6" style={{ background: "white", borderColor: SFC, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading font-bold text-lg" style={{ color: OBG }}>Engagement Activity Trends</h2>
                <p className="text-xs mt-0.5" style={{ color: OTL }}>Daily lead interactions · April 2025</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: OTL }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: P }} />
                  Interactions
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: `${P}30` }} />
                  Today
                </span>
              </div>
            </div>
            {/* Bar chart */}
            <div className="flex items-end gap-1.5 h-40 mb-3">
              {BARS.map((b) => (
                <div key={b.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${b.h}%`,
                      background: b.active
                        ? P
                        : `linear-gradient(180deg, ${P}80 0%, ${P}40 100%)`,
                      boxShadow: b.active ? `0 -3px 12px ${P}50` : "none",
                    }}
                  />
                </div>
              ))}
            </div>
            {/* X-axis labels */}
            <div className="flex items-start gap-1.5">
              {BARS.map((b) => (
                <div key={b.day} className="flex-1 text-center">
                  <span className="text-[0.55rem] font-medium" style={{ color: b.active ? P : OTL }}>
                    {b.day.split(" ")[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── INSIGHTS & RECOMMENDATIONS ── */}
          <div>
            <h2 className="font-heading font-bold text-lg mb-4" style={{ color: OBG }}>Insights &amp; Recommendations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {INSIGHT_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-3xl border p-5"
                    style={{ background: card.bg, borderColor: card.border, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${card.accent}18` }}>
                        <Icon className="w-5 h-5" style={{ color: card.accent }} />
                      </div>
                      <h3 className="font-heading font-bold text-sm" style={{ color: OBG }}>{card.title}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {card.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: card.accent }} />
                          <p className="text-sm leading-snug" style={{ color: OSV }}>{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* ── FLOATING ACTION BUTTON ── */}
      <button
        className="fixed bottom-10 right-10 flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold font-heading shadow-lg transition-all z-50"
        style={{ background: P, color: "white", boxShadow: `0 8px 24px ${P}50` }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
        <PlusCircle className="w-4.5 h-4.5" /> Create Custom Report
      </button>

    </div>
  );
}
