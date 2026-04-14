"use client";

import React from "react";
import {
  LayoutDashboard, GitBranch, UserSearch, BarChart3, Sliders, MessageSquare,
  Settings, LogOut, BadgeCheck, PlusCircle, ChevronRight,
  Sparkles, Zap, Check, MessageCircle, Wallet, ShieldCheck, CreditCard, Key,
  BarChart2, ChevronDown, ExternalLink,
} from "lucide-react";
import Link from "next/link";

/* ─── palette ─────────────────────────────────────────────────────── */
const P      = "#7C5CFF";
const P5     = "rgba(124,92,255,0.05)";
const P10    = "rgba(124,92,255,0.10)";
const PDIM   = "#6648e6";
const BG     = "#fffdf5";
const SFCL   = "#faf8f0";
const SFCLOW = "#fffef9";
const SFCH   = "#e3e3dd";
const SFC    = "#e9e8e3";
const SFCHIGH= "#f0ede6";
const OBG    = "#2e2f2c";
const OSV    = "#5b5c58";
const OTL    = "#777773";
const ERR    = "#b41340";

const sideActive = { background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", color: P };

/* ─── nav ─────────────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",           href: "/dashboard",           active: false },
  { icon: Zap,             label: "Intent Signals",      href: "/intent-signals",      active: false },
  { icon: GitBranch,       label: "Pipeline",            href: "/pipeline",            active: false },
  { icon: UserSearch,      label: "Leads",               href: "/leads",               active: false },
  { icon: BarChart3,       label: "Insights",            href: "/insights",            active: false },
  { icon: Sliders,         label: "Lead Scoring",        href: "/lead-scoring",        active: false },
  { icon: MessageSquare,   label: "Messages",            href: "/messages",            active: false },
];

/* ─── data ─────────────────────────────────────────────────────────── */
const CAPACITY = [
  { label: "Pre-approved",  value: "$8.7M", pct: 70.16, color: "#22c55e", dot: "#22c55e", textColor: "#16a34a" },
  { label: "Self-funded",   value: "$2.1M", pct: 16.94, color: "#3b82f6", dot: "#3b82f6", textColor: "#2563eb" },
  { label: "Under review",  value: "$1.6M", pct: 12.90, color: "#f97316", dot: "#f97316", textColor: "#ea580c" },
];

const STATS = [
  { value: "80%",   label: "Lender Inquiries",      desc: "Direct referral requests for pre-approved lenders.", accent: false },
  { value: "100%",  label: "Budget Transparency",   desc: "Complete fiscal breakdown provided in sessions.",     accent: false },
  { value: "14–30", label: "Conversion Window",     desc: "Projected days to close for this specific segment.",  accent: true  },
];

const FUNNEL_STEPS = [
  { icon: MessageCircle, label: "Initial Discussion", stage: "Stage 1", active: true,  avatar: null,    name: null     },
  { icon: Wallet,        label: "Budget Disclosed",   stage: "Stage 2", active: true,  avatar: null,    name: null     },
  { icon: ShieldCheck,   label: "Pre-approved",       stage: "Stage 3", active: true,  avatar: "ER",    name: "ELENA"  },
  { icon: CreditCard,    label: "Down-payment",       stage: "Stage 4", active: true,  avatar: "MW",    name: "MARCUS" },
  { icon: Key,           label: "Ready to Close",     stage: "Target",  active: false, avatar: null,    name: null     },
];

const LEADS = [
  {
    initials: "MW", name: "Marcus Wilson",  role: "Commercial Specialist",
    intent: 82, closing: "14–21 days", closingColor: P,
    status: "Pre-approved",  statusBg: "#f0fdf4", statusText: "#16a34a", statusRing: "#bbf7d0",
    action: "Send Guide",
  },
  {
    initials: "JK", name: "Jordan King",    role: "Portfolio Investor",
    intent: 81, closing: "30–45 days", closingColor: OBG,
    status: "Self-funded",   statusBg: "#eff6ff", statusText: "#2563eb", statusRing: "#bfdbfe",
    action: "Intro Partner",
  },
  {
    initials: "ER", name: "Elena Rodriguez", role: "Residential Buyer",
    intent: 78, closing: "45–60 days", closingColor: OBG,
    status: "Pre-approved",  statusBg: "#f0fdf4", statusText: "#16a34a", statusRing: "#bbf7d0",
    action: "Schedule Call",
  },
];

export default function FinancialReadinessPage() {
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
      <main className="xl:ml-72 p-12 min-h-screen space-y-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-medium" style={{ color: `${OSV}99` }}>
          <Link href="/dashboard" className="transition-colors hover:text-[#7C5CFF]">Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <span style={{ color: OBG }}>Financial Readiness</span>
        </nav>

        {/* ── 1. PIPELINE CAPACITY GAUGE ── */}
        <section className="bg-white rounded-[2.5rem] p-10 border"
          style={{ borderColor: `${SFCHIGH}80`, boxShadow: "0px 32px 64px rgba(46,47,44,0.04)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${OSV}80` }}>
                Total Pipeline Capacity
              </p>
              <div className="flex items-baseline gap-4">
                <span className="font-heading font-extrabold tracking-tighter" style={{ fontSize: "3.75rem", color: OBG, lineHeight: 1 }}>
                  $12.4M
                </span>
                <span className="text-lg font-bold" style={{ color: P }}>Live Liquidity</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {CAPACITY.map((c) => (
                <div key={c.label} className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-tight flex items-center gap-2"
                    style={{ color: c.textColor }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.dot }} />
                    {c.label}
                  </p>
                  <p className="text-2xl font-bold tracking-tight" style={{ color: OBG }}>{c.value}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Segmented bar */}
          <div className="relative h-4 w-full flex rounded-full overflow-hidden"
            style={{ background: SFCHIGH, boxShadow: `0 0 0 8px ${SFCHIGH}50` }}>
            {CAPACITY.map((c) => (
              <div key={c.label} className="h-full transition-all duration-1000"
                style={{ width: `${c.pct}%`, background: c.color }} />
            ))}
          </div>
        </section>

        {/* ── 2 & 3. EDITORIAL SUMMARY + RECOMMENDED ACTION ── */}
        <div className="grid grid-cols-12 gap-8">

          {/* Editorial summary */}
          <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-[2.5rem] border relative overflow-hidden"
            style={{ borderColor: `${SFCHIGH}80`, boxShadow: "0px 8px 24px rgba(46,47,44,0.03)" }}>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8" style={{ color: P }}>
                <Sparkles className="w-4 h-4" /> Market Intelligence
              </div>
              <h2 className="font-heading font-extrabold tracking-tight leading-[1.1] mb-4" style={{ fontSize: "2.25rem", color: OBG }}>
                6 leads are pre-approved + actively discussing financing ={" "}
                <span style={{ color: P }}>$6.2M</span>
              </h2>
              <p className="text-lg mb-10 max-w-xl" style={{ color: OSV }}>
                High-intent segment identifying near-term closing potential within current portfolio liquidity signals.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STATS.map((s) => (
                  <div key={s.label} className="p-6 rounded-2xl border"
                    style={{
                      background: s.accent ? P5 : `${SFCLOW}80`,
                      borderColor: s.accent ? P10 : `${SFCHIGH}80`,
                    }}>
                    <p className="font-heading font-extrabold text-3xl mb-1" style={{ color: P }}>{s.value}</p>
                    <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: OBG }}>{s.label}</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: OSV }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: P5 }} />
          </div>

          {/* Recommended action */}
          <div className="col-span-12 lg:col-span-4 rounded-[2.5rem] p-10 flex flex-col justify-between text-white"
            style={{ background: P, boxShadow: `0 20px 48px ${P}30` }}>
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border"
                style={{ background: "rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.20)" }}>
                Priority Action
              </div>
              <h3 className="font-heading text-3xl font-bold leading-tight mb-4">Deploy Lender Partnership Campaign</h3>
              <p className="text-sm font-medium mb-10" style={{ color: "rgba(255,255,255,0.70)" }}>
                Projected ROI: +12.4% engagement lift through automated outreach.
              </p>
              <ul className="space-y-4">
                {["Send pre-approval guides", "Introduce lender partners", "Schedule rate lock calls"].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-sm font-semibold">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.20)" }}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full bg-white py-5 rounded-full font-bold flex items-center justify-center gap-3 mt-12 active:scale-[0.98] transition-all"
              style={{ color: P, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.92"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
              <Zap className="w-4 h-4" />
              Execute Campaign
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md" style={{ background: P10, color: P }}>AI</span>
            </button>
          </div>
        </div>

        {/* ── 4. ACTIVE FUNNEL READINESS ── */}
        <div className="bg-white rounded-[2.5rem] p-10 border"
          style={{ borderColor: `${SFCHIGH}80`, boxShadow: "0px 8px 24px rgba(46,47,44,0.03)" }}>
          <div className="flex justify-between items-center mb-16">
            <h3 className="font-heading text-2xl font-bold tracking-tight" style={{ color: OBG }}>
              Active Funnel Readiness
            </h3>
            <div className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: OSV }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: P }} />
              Tracking 6 Live Segments
            </div>
          </div>

          <div className="relative px-12">
            {/* connecting line */}
            <div className="absolute top-[30px] left-24 right-24 h-px" style={{ background: `${SFCHIGH}80` }} />

            <div className="flex justify-between relative">
              {FUNNEL_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex flex-col items-center gap-4 w-32 relative"
                    style={{ opacity: step.active ? 1 : 0.35 }}>
                    {/* avatar above */}
                    {step.avatar && (
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group cursor-help">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-lg"
                          style={{ background: P10, color: P, boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}>
                          {step.avatar}
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: "white", color: OBG }}>
                          {step.name}
                        </span>
                      </div>
                    )}
                    {/* circle */}
                    <div className="w-16 h-16 rounded-full flex items-center justify-center z-10 border-[6px] border-white shadow-md"
                      style={{
                        background: step.active ? P : SFCHIGH,
                        color: step.active ? "white" : OSV,
                      }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] font-bold uppercase tracking-tight mb-1"
                        style={{ color: step.active && (i === 2 || i === 3) ? P : OBG }}>
                        {step.label}
                      </p>
                      <p className="text-[10px]" style={{ color: OSV }}>{step.stage}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 5. QUALIFIED READINESS TABLE ── */}
        <div className="bg-white rounded-[2.5rem] border overflow-hidden"
          style={{ borderColor: `${SFCHIGH}80`, boxShadow: "0px 8px 24px rgba(46,47,44,0.03)" }}>
          <div className="px-10 py-8 border-b flex flex-col sm:flex-row justify-between sm:items-center gap-4"
            style={{ borderColor: `${SFCHIGH}40` }}>
            <div>
              <h3 className="font-heading text-2xl font-extrabold tracking-tight" style={{ color: OBG }}>
                Qualified Readiness Segment
              </h3>
              <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: `${OSV}60` }}>
                Leads matching "High Potential" criteria
              </p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold transition-colors"
              style={{ color: P }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "underline"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "none"; }}>
              Segment Analytics <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: 700 }}>
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] font-extrabold"
                  style={{ color: `${OSV}50` }}>
                  {["Lead Identity", "Intent Score", "Financial Status", "Closing Est.", "Action"].map((h, i) => (
                    <th key={h} className="px-10 py-6 font-extrabold"
                      style={{ textAlign: i === 1 || i === 3 ? "center" : i === 4 ? "right" : "left" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LEADS.map((lead, i) => (
                  <tr key={lead.name}
                    className="transition-colors border-t"
                    style={{ borderColor: `${SFCHIGH}40` }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${SFCLOW}80`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>

                    {/* Identity */}
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{ background: P10, color: P }}>
                          {lead.initials}
                        </div>
                        <div>
                          <p className="font-bold text-lg leading-tight" style={{ color: OBG }}>{lead.name}</p>
                          <p className="text-xs" style={{ color: `${OSV}70` }}>{lead.role}</p>
                        </div>
                      </div>
                    </td>

                    {/* Intent */}
                    <td className="px-10 py-8 text-center">
                      <span className="font-heading text-2xl font-black" style={{ color: P }}>{lead.intent}%</span>
                    </td>

                    {/* Status */}
                    <td className="px-10 py-8">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-tight ring-1"
                        style={{ background: lead.statusBg, color: lead.statusText, outline: `1px solid ${lead.statusRing}` }}>
                        <BadgeCheck className="w-3.5 h-3.5" />
                        {lead.status}
                      </span>
                    </td>

                    {/* Closing */}
                    <td className="px-10 py-8 text-center">
                      <span className="text-sm font-bold tracking-tight" style={{ color: lead.closingColor }}>{lead.closing}</span>
                    </td>

                    {/* Action */}
                    <td className="px-10 py-8 text-right">
                      <button className="px-6 py-2.5 text-white text-xs font-black rounded-full uppercase tracking-widest transition-all hover:shadow-lg active:scale-95"
                        style={{ background: P }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
                        {lead.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 flex justify-center border-t" style={{ background: `${SFCLOW}40`, borderColor: `${SFCHIGH}40` }}>
            <button className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest transition-all hover:scale-105"
              style={{ color: P }}>
              View 42 More Pipeline Leads <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── 6. FOOTER INTELLIGENCE ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-[2.5rem] p-10 border"
          style={{ borderColor: `${SFCHIGH}80`, boxShadow: "0px 8px 24px rgba(46,47,44,0.02)" }}>
          <div className="flex items-start gap-6">
            <div className="p-5 rounded-3xl flex-shrink-0" style={{ background: P10, color: P }}>
              <BarChart2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-heading text-xl font-bold mb-3" style={{ color: OBG }}>Intent Intelligence Engine</h4>
              <p className="text-sm leading-relaxed" style={{ color: OSV }}>
                Financial Readiness breakdown is weighted by real-time conversational signals: Direct lender referrals (40%), Pre-approval status (30%), Budget disclosure (20%).
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className="px-8 py-4 bg-white font-bold rounded-full text-sm border transition-colors"
              style={{ color: OBG, borderColor: `${SFCHIGH}80` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCHIGH; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
              Download Dataset
            </button>
            <button className="px-8 py-4 font-bold rounded-full text-sm text-white transition-all"
              style={{ background: P, boxShadow: `0 8px 24px ${P}33` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
              Schedule Readiness Audit
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
