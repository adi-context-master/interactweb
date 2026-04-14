"use client";

import React, { useState } from "react";
import {
  LayoutDashboard, GitBranch, UserSearch, BarChart3, Sliders, MessageSquare,
  Settings, LogOut, BadgeCheck, PlusCircle, ChevronRight, Zap, Clock,
  Phone, Check, TriangleAlert, ArrowRight, RefreshCw, X, TrendingUp,
  PhoneForwarded, Quote, History,
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
const ERR5   = "rgba(180,19,64,0.05)";
const ERR10  = "rgba(180,19,64,0.10)";
const ERR20  = "rgba(180,19,64,0.20)";

const sideActive = { background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", color: P };

/* ─── nav ─────────────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",      href: "/dashboard",      active: false },
  { icon: Zap,             label: "Intent Signals", href: "/intent-signals", active: false },
  { icon: GitBranch,       label: "Pipeline",       href: "/pipeline",       active: false },
  { icon: UserSearch,      label: "Leads",          href: "/leads",          active: false },
  { icon: BarChart3,       label: "Insights",       href: "/insights",       active: false },
  { icon: Sliders,         label: "Lead Scoring",   href: "/lead-scoring",   active: false },
  { icon: MessageSquare,   label: "Messages",       href: "/messages",       active: false },
];

/* ─── data ─────────────────────────────────────────────────────────── */
const DEADLINE_BARS = [
  { label: "Today",         leads: 2, pct: 50,  color: ERR,        textColor: "#fff" },
  { label: "Tomorrow",      leads: 1, pct: 25,  color: "#f97316",  textColor: "#fff" },
  { label: "Within 3 Days", leads: 1, pct: 25,  color: "#eab308",  textColor: "#fff" },
  { label: "Within 7 Days", leads: 0, pct: 0,   color: SFCH,       textColor: OTL  },
];

const ACTION_STEPS = [
  {
    num: 1, done: true,
    name: "Marcus Thorne",
    tag: "Actioned", tagColor: "#16a34a", tagBg: "#dcfce7",
    time: "09:42 AM",
    outcome: "Outcome: Voicemail / SMS Sent", outcomeCl: "#16a34a",
    bg: "rgba(34,197,94,0.05)", border: "rgba(34,197,94,0.12)",
  },
  {
    num: 2, done: false,
    name: "Call Sarah Chen now",
    tag: "Deadline Today", tagColor: ERR, tagBg: ERR5,
    bg: ERR5, border: ERR10,
  },
  {
    num: 3, done: false,
    name: "Message David Lee by EOD",
    tag: "Deadline Tomorrow", tagColor: "#f97316", tagBg: "#fff7ed",
    bg: "rgba(249,115,22,0.05)", border: "rgba(249,115,22,0.12)",
  },
  {
    num: 4, done: false,
    name: "Follow up remaining leads",
    tag: "Complete by Friday", tagColor: OTL, tagBg: SFCH,
    bg: SFCL, border: SFCH,
  },
];

const LEADS = [
  {
    name: "Sarah Chen",
    role: "Relocation Specialist Contact",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuADUQHTrWSRJeVvb-6ihE10ZxeWAyX3vudizWoY5Xi9zHqcHeSAqVm2IkBSKVG6U14HK5S2PdomIQ0GltjelDmYgtOwRyD4azqHMZhC82AE6PQday2naLvEv473E6d0Z7-ylIrzqS_p10Oijeq2tcHFHg4Xq78dYI9_4lj1SpZDz77cc8rDIhNJQm5TPmAE5KfxD0tUOX643jMCsdbXKWA2psroWUIeJK3Bf-aC-zR4DLruMk0mdEULrrZYG-tjfqXF40dH9yabMmdW",
    score: 89,
    urgencyTag: "ASAP (TODAY)",
    urgencyColor: ERR,
    urgencyBg: "#fff",
    urgencyText: "#fff",
    quote: '"Need to settle before school year starts"',
    statusDot: ERR,
    statusLabel: "Awaiting Contact",
    statusColor: ERR,
    canCall: true,
    opacity: 1,
  },
  {
    name: "David Lee",
    role: "Corporate Executive",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAXuFd10M_UYp-owjnVNWTwr-UN_Pt4LYMDfvYTJV_ONn3ep2J4ixgXaSLGd_0s7FUf5LYiUj35u8zsLxHrvWn-mpIB-swUSq3imF7kVvpHRbB3imOIjO2qQTNo9BAFp0myycYGqDxI_i3dWfSsY9-JaFAbMT_hFFkZ8sMt1y3j8E-mJ8QMm04_PfP4IVc9icR-Ev_swwj8xSPFPlYTjUNlw6qTlxOaPDRZyMcZQUqIJHAUp0C8Xko3A91gA_Oux0C1x12DwxBvc4d",
    score: 72,
    urgencyTag: "1–2 DAYS",
    urgencyColor: "#f97316",
    urgencyBg: "#fff7ed",
    urgencyText: "#fff",
    quote: '"Job start scheduled for end of month"',
    statusDot: "#22c55e",
    statusLabel: "Callback Scheduled",
    statusColor: "#16a34a",
    statusSub: "Auto-synced to LionDesk",
    canCall: false,
    opacity: 0.7,
  },
];

/* ─── component ────────────────────────────────────────────────────── */
export default function TimeUrgencyPage() {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="min-h-screen font-body antialiased" style={{ background: BG, color: OBG }}>

      {/* ── PRE-CALL PANEL ── */}
      <div
        className="fixed top-0 right-0 h-screen w-96 z-[100] overflow-y-auto"
        style={{
          background: "#fff",
          boxShadow: "0 0 60px rgba(0,0,0,0.12)",
          borderLeft: `1px solid ${SFCH}`,
          transform: panelOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading font-extrabold text-2xl tracking-tight" style={{ color: OBG }}>Pre-Call Intelligence</h2>
            <button
              onClick={() => setPanelOpen(false)}
              className="p-2 rounded-full transition-colors"
              style={{ color: OSV }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFC; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl mb-8 border" style={{ background: P5, borderColor: P10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LEADS[0].avatar} alt="Sarah Chen" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
            <div>
              <p className="font-bold text-lg" style={{ color: OBG }}>Sarah Chen</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">Recording Started</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] mb-3" style={{ color: OTL }}>Suggested Script</p>
              <div className="p-5 rounded-xl italic font-medium leading-relaxed text-sm"
                style={{ background: SFCL, borderLeft: `4px solid ${P}`, color: OBG }}>
                "Hi Sarah, I noticed you were looking at several listings near the{" "}
                <strong>Oak Street school district</strong> this morning. Since you need to settle before the school
                year starts, I have two off-market properties there I'd love to show you..."
              </div>
            </section>

            <section>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] mb-3" style={{ color: OTL }}>Live Insights</p>
              <div className="flex gap-3">
                <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: P }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: OBG }}>Oak Street Listing Spike</p>
                  <p className="text-xs" style={{ color: OSV }}>Viewed 4 times in last 2 hours</p>
                </div>
              </div>
            </section>

            <section className="pt-6 border-t" style={{ borderColor: SFCH }}>
              <div className="flex items-center gap-2 mb-6">
                <RefreshCw className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold text-green-700">Auto-logging to kvCORE enabled</span>
              </div>
              <button
                className="w-full text-white font-bold py-4 rounded-full flex items-center justify-center gap-3 transition-all text-sm"
                style={{ background: ERR, boxShadow: `0 12px 28px ${ERR}30` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#9a0e30"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ERR; }}>
                <Phone className="w-4 h-4" /> Dial Number Now
              </button>
            </section>
          </div>
        </div>
      </div>

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
            <Link key={label} href={href ?? "#"}
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
          <button className="w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 text-sm font-heading text-white active:scale-[0.98] transition-all"
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
        <nav className="mb-8 flex items-center gap-2 text-sm font-medium" style={{ color: `${OSV}99` }}>
          <Link href="/dashboard" className="transition-colors hover:text-[#7C5CFF]">Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <span style={{ color: OBG }}>Time Urgency</span>
        </nav>

        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-heading font-extrabold tracking-tight leading-none mb-4"
              style={{ fontSize: "3.5rem", color: OBG }}>
              Time Urgency Insights
            </h1>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border"
              style={{ background: `${ERR}08`, borderColor: ERR20 }}>
              <span className="text-sm font-extrabold uppercase tracking-wider" style={{ color: ERR }}>Revenue at Risk:</span>
              <span className="text-2xl font-black" style={{ color: ERR }}>~$4.2M</span>
            </div>
          </div>
          <button className="px-6 py-3 rounded-full text-sm font-bold transition-all"
            style={{ background: SFCH, color: OSV }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCHIGH; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = SFCH; }}>
            Refine Parameters
          </button>
        </header>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">

          {/* Hero Signal Card */}
          <div className="md:col-span-8 rounded-2xl p-8 relative overflow-hidden border"
            style={{ background: SFCLOW, borderColor: `${OBG}08`, boxShadow: "0 20px 40px rgba(46,47,44,0.06)" }}>
            {/* background orb */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: `${P}08`, filter: "blur(60px)", transform: "translate(30%, -30%)" }} />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 font-bold text-sm uppercase tracking-widest" style={{ color: ERR }}>
                <Zap className="w-4 h-4" />
                High Priority Signal
              </div>

              <h2 className="font-heading font-extrabold mb-6 leading-none" style={{ fontSize: "3rem", color: OBG }}>
                4 leads{" "}
                <span className="font-light" style={{ color: `${OBG}30` }}>with hard deadlines</span>
              </h2>

              {/* Deadline Distribution Bar */}
              <div className="mb-8">
                <p className="text-[10px] font-black uppercase tracking-wider mb-4" style={{ color: OTL }}>
                  Deadline Distribution
                </p>
                <div className="flex h-8 rounded-xl overflow-hidden" style={{ background: SFC }}>
                  <div className="flex items-center justify-center text-[10px] font-black text-white" style={{ width: "50%", background: ERR }}>TODAY (2)</div>
                  <div className="flex items-center justify-center text-[10px] font-black text-white" style={{ width: "25%", background: "#f97316" }}>TOMORROW (1)</div>
                  <div className="flex items-center justify-center text-[10px] font-black text-white" style={{ width: "25%", background: "#eab308" }}>&lt;3 DAYS (1)</div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t" style={{ borderColor: `${OBG}08` }}>
                {[
                  { label: "Common Driver",    value: "Job / School Start" },
                  { label: "Response Target",  value: "15 Minutes" },
                  { label: "Match Accuracy",   value: "100% Mentioned" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: OTL }}>{label}</p>
                    <p className="text-lg font-bold" style={{ color: OBG }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strategic Alert Card */}
          <div className="md:col-span-4 rounded-2xl p-8 flex flex-col border"
            style={{ background: `${ERR}0a`, borderColor: ERR20, boxShadow: `0 20px 40px ${ERR}1a` }}>
            <div className="mb-auto">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full text-white inline-block"
                  style={{ background: ERR }}>
                  Strategic Alert
                </span>
                <span className="text-[11px] font-black animate-pulse" style={{ color: ERR }}>
                  ⚡ PEAK WINDOW: Next 6h
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl mb-4 leading-tight" style={{ color: OBG }}>
                Trigger Immediate Callback
              </h3>
              <p className="text-sm font-medium leading-relaxed mb-6" style={{ color: OSV }}>
                Our predictive model shows a{" "}
                <span className="font-black" style={{ color: ERR }}>34% conversion drop</span>{" "}
                after just 2 hours for this segment.
              </p>

              <div className="p-4 rounded-xl mb-8 border" style={{ background: "rgba(255,255,255,0.5)", borderColor: ERR10 }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: OSV }}>Response Progress</span>
                  <span className="text-[10px] font-bold" style={{ color: OSV }}>1 / 4 actioned today</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: ERR10 }}>
                  <div className="h-full rounded-full" style={{ width: "25%", background: ERR }} />
                </div>
              </div>
            </div>

            <button className="w-full text-white font-bold py-4 rounded-full flex flex-col items-center justify-center gap-1 transition-all text-sm"
              style={{ background: ERR, boxShadow: `0 12px 32px ${ERR}30` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#9a0e30"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ERR; }}>
              <div className="flex items-center gap-3">
                Power Dialer: Start Sequence (4 Leads)
                <PhoneForwarded className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium opacity-80">Auto-SMS fallback for non-responses enabled</span>
            </button>
          </div>

          {/* Recommended Action Sequence */}
          <div className="md:col-span-12 rounded-2xl p-8 border"
            style={{ background: SFCLOW, borderColor: `${OBG}08`, boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-heading font-bold text-lg flex items-center gap-3" style={{ color: OBG }}>
                <ArrowRight className="w-5 h-5" style={{ color: P }} />
                Recommended Action Sequence
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: OTL }}>Updated 2m ago</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {ACTION_STEPS.map((step) => (
                <div key={step.num}
                  className="flex items-start gap-4 p-4 rounded-xl border relative overflow-hidden"
                  style={{ background: step.bg, borderColor: step.border }}>
                  {step.done ? (
                    <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                      style={{
                        background: step.num === 2 ? ERR : step.num === 3 ? "#f97316" : OTL,
                      }}>
                      {step.num}
                    </span>
                  )}
                  <div>
                    <p className={`font-bold text-sm ${step.done ? "line-through opacity-50" : ""}`}
                      style={{ color: OBG }}>{step.name}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter"
                        style={{ color: step.tagColor, background: step.tagBg }}>
                        {step.tag}
                      </span>
                      {step.time && (
                        <span className="text-[10px] font-medium" style={{ color: OTL }}>{step.time}</span>
                      )}
                    </div>
                    {step.outcome && (
                      <p className="text-[10px] font-bold mt-1 uppercase tracking-tighter" style={{ color: step.outcomeCl }}>
                        {step.outcome}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Table */}
          <div className="md:col-span-12 rounded-2xl overflow-hidden border"
            style={{ background: SFCLOW, borderColor: `${OBG}08`, boxShadow: "0 20px 40px rgba(46,47,44,0.06)" }}>
            <div className="px-8 py-6 flex justify-between items-center border-b" style={{ borderColor: `${OBG}06` }}>
              <h3 className="font-heading font-bold text-xl" style={{ color: OBG }}>Identified Leads</h3>
              <span className="px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2"
                style={{ background: SFC, color: OSV }}>
                <span className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-pulse" />
                Live Processing
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: `${SFC}80` }}>
                    {["Lead Profile", "Intent Score", "Urgency Tag", "Key Mention", "Outcome / Status", ""].map((h) => (
                      <th key={h} className="px-8 py-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                        style={{ color: OTL }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LEADS.map((lead) => (
                    <tr key={lead.name}
                      className="border-t transition-colors"
                      style={{ borderColor: `${OBG}06`, opacity: lead.opacity }}>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={lead.avatar} alt={lead.name}
                            className={`w-12 h-12 rounded-full object-cover flex-shrink-0 ${!lead.canCall ? "grayscale" : ""}`} />
                          <div>
                            <p className="font-bold text-sm" style={{ color: OBG }}>{lead.name}</p>
                            <p className="text-xs font-medium" style={{ color: OSV }}>{lead.role}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex flex-col items-center w-fit">
                          <span className="text-2xl font-extrabold" style={{ color: P }}>{lead.score}%</span>
                          <div className="w-16 h-1 rounded-full overflow-hidden mt-1" style={{ background: SFCH }}>
                            <div className="h-full rounded-full" style={{ width: `${lead.score}%`, background: P }} />
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white"
                          style={{ background: lead.urgencyColor }}>
                          {lead.urgencyTag}
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-sm font-medium italic" style={{ color: OBG }}>
                          <Quote className="w-4 h-4 flex-shrink-0" style={{ color: `${OBG}30` }} />
                          {lead.quote}
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ background: lead.statusDot }} />
                          <div>
                            <span className="font-bold text-xs uppercase" style={{ color: lead.statusColor }}>{lead.statusLabel}</span>
                            {lead.statusSub && (
                              <p className="text-[10px] font-medium" style={{ color: OSV }}>{lead.statusSub}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6 text-right">
                        {lead.canCall ? (
                          <button
                            onClick={() => setPanelOpen(true)}
                            className="p-3 rounded-full text-white transition-all relative group"
                            style={{ background: ERR, boxShadow: `0 8px 20px ${ERR}20` }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#9a0e30"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ERR; }}>
                            <Phone className="w-5 h-5" />
                            <span className="absolute right-full mr-2 bg-[#1c1c1a] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Pre-Call Intelligence
                            </span>
                          </button>
                        ) : (
                          <button className="p-3 rounded-full transition-all" style={{ background: SFCH, color: OSV }}>
                            <History className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deadline Distribution Timeline */}
          <div className="md:col-span-6 rounded-2xl p-8 border" style={{ background: SFCL, borderColor: SFCH }}>
            <h4 className="font-heading font-bold text-lg mb-6 flex items-center gap-3" style={{ color: OBG }}>
              <BarChart3 className="w-5 h-5" style={{ color: P }} />
              Deadline Distribution Timeline
            </h4>
            <div className="space-y-6">
              {DEADLINE_BARS.map(({ label, leads, pct, color }) => (
                <div key={label} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span style={{ color: pct > 0 ? OBG : OSV }}>{label}</span>
                    <span style={{ color: pct > 0 ? OBG : OSV }}>{leads} {leads === 1 ? "Lead" : "Leads"}</span>
                  </div>
                  <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: SFCH }}>
                    {pct > 0 && <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Velocity */}
          <div className="md:col-span-6 rounded-2xl p-8 border" style={{ background: SFCL, borderColor: SFCH }}>
            <h4 className="font-heading font-bold text-lg mb-6 flex items-center gap-3" style={{ color: OBG }}>
              <Clock className="w-5 h-5" style={{ color: P }} />
              Avg. Response Velocity
            </h4>

            <div className="flex items-end gap-3 mb-4">
              <span className="font-heading font-black leading-none" style={{ fontSize: "3rem", color: OBG }}>15</span>
              <span className="text-xl font-bold mb-1" style={{ color: `${OBG}40` }}>Mins</span>
              <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-1 border"
                style={{ background: "rgba(34,197,94,0.08)", color: "#16a34a", borderColor: "rgba(34,197,94,0.2)" }}>
                <Check className="w-3.5 h-3.5" />
                STATUS: ON TRACK
              </div>
            </div>

            <div className="w-full h-2 rounded-full overflow-hidden relative" style={{ background: SFCH }}>
              <div className="absolute left-1/4 top-0 h-full w-0.5 z-10" style={{ background: OSV }} />
              <div className="h-full rounded-full" style={{ width: "25%", background: P }} />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: OTL }}>Target: 15 mins</span>
              <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: P }}>Current: 15 mins</span>
            </div>

            <div className="mt-8 pt-6 border-t flex items-center gap-3 text-sm" style={{ borderColor: SFCH }}>
              <TriangleAlert className="w-4 h-4 flex-shrink-0" style={{ color: ERR }} />
              <p className="font-medium leading-snug" style={{ color: OSV }}>
                Response time past <strong style={{ color: ERR }}>30 min</strong> correlates with a{" "}
                <strong style={{ color: ERR }}>34% drop</strong> in conversion for this segment.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
