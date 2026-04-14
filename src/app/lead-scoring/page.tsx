"use client";

import React, { useState } from "react";
import {
  LayoutDashboard, GitBranch, UserSearch, BarChart3, Sliders, MessageSquare,
  Settings, LogOut, BadgeCheck, PlusCircle, Zap,
  Clock, CreditCard, Wallet, TrendingUp, BarChart2,
  Sparkles, ChevronDown, CheckCircle, PlusCircle as PlusIcon, Settings2,
} from "lucide-react";
import Link from "next/link";

/* ─── palette ─────────────────────────────────────────────────────── */
const P      = "#7C5CFF";
const P5     = "rgba(124,92,255,0.05)";
const P10    = "rgba(124,92,255,0.10)";
const P20    = "rgba(124,92,255,0.20)";
const PDIM   = "#6648e6";
const PCONT  = "#e0d7ff";
const BG     = "#fffdf5";
const SFCL   = "#faf8f0";
const SFCLOW = "#f7f6f1";
const SFCMID = "#f1f0e9";
const SFCH   = "#e8e7e1";
const SFCHIGH= "#ebeae3";
const SFC    = "#e9e8e3";
const OBG    = "#2e2f2c";
const OSV    = "#5b5c58";
const OTL    = "#777773";
const ERR    = "#b41340";
const HOT    = "#E53935";
const SUCCESS= "#2E7D32";

const sideActive = { background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", color: P };

/* ─── nav ─────────────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",          href: "/dashboard",         active: false },
  { icon: Zap,             label: "Intent Signals",     href: "/intent-signals",    active: false },
  { icon: GitBranch,       label: "Pipeline",           href: "/pipeline",          active: false },
  { icon: UserSearch,      label: "Leads",              href: "/leads",             active: false },
  { icon: BarChart3,       label: "Insights",           href: "/insights",          active: false },
  { icon: Sliders,         label: "Lead Scoring",       href: "/lead-scoring",      active: true  },
  { icon: MessageSquare,   label: "Messages",           href: "/messages",          active: false },
];

/* ─── static data ─────────────────────────────────────────────────── */
const SCORE_MODEL = [
  { pct: "25%", label: "Timeline Urgency",     borderColor: P,       textColor: P        },
  { pct: "25%", label: "Financial Readiness",  borderColor: PCONT,   textColor: "#1d0061"},
  { pct: "20%", label: "Property Specificity", borderColor: SFCHIGH, textColor: OBG      },
  { pct: "15%", label: "Location Focus",       borderColor: "#f5f6ff",textColor: "#595b62"},
  { pct: "15%", label: "Engagement Depth",     borderColor: OTL,     textColor: OSV      },
];

const PREVIEW_LEADS = [
  {
    initials: "SC", name: "Sarah Chen",     area: "Noe Valley",      score: 100, tier: "HOT",
    tierBg: HOT, tierText: "white", barColor: HOT, barWidth: "100%",
    scoreColor: HOT,
    desc: "Highly specific property needs, 30-day move timeline, and proof of funds already uploaded.",
    breakdown: null,
    aiNote: null,
  },
  {
    initials: "ER", name: "Elena Rodriguez", area: "Pacific Heights", score: 65,  tier: "WARM",
    tierBg: P20, tierText: P, barColor: P, barWidth: "65%",
    scoreColor: P,
    desc: null,
    breakdown: [
      { key: "Time", val: 15 }, { key: "Fin", val: 18 }, { key: "Prop", val: 8 },
      { key: "Loc",  val: 12 }, { key: "Eng", val: 12 },
    ],
    aiNote: "Strategic Nurture: Lead is serious but needs more inventory options before a tour.",
  },
  {
    initials: "MW", name: "Marcus Wilson",  area: "General SF interest", score: 57, tier: "WARM",
    tierBg: PCONT, tierText: "#1d0061", barColor: P, barWidth: "57%",
    scoreColor: P,
    desc: "Needs financing info. 3–6 month timeline. Engaged with 4 listing emails this week.",
    breakdown: null,
    aiNote: null,
  },
];

/* ─── reusable toggle ─────────────────────────────────────────────── */
function Toggle({ checked, onChange, small = false }: { checked: boolean; onChange: () => void; small?: boolean }) {
  const w = small ? "w-9 h-5" : "w-11 h-6";
  const thumb = small ? "w-4 h-4" : "w-5 h-5";
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={onChange}
      className={`relative inline-flex items-center rounded-full transition-colors flex-shrink-0 ${w}`}
      style={{ background: checked ? P : SFCH }}>
      <span className={`inline-block rounded-full bg-white shadow transition-transform ${thumb}`}
        style={{ transform: checked ? `translateX(${small ? "16px" : "20px"})` : "translateX(2px)" }} />
    </button>
  );
}

/* ─── range slider ────────────────────────────────────────────────── */
function RangeSlider({ value, onChange, min = 10, max = 40 }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="px-2">
      <div className="relative">
        <input type="range" min={min} max={max} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none outline-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${P} ${pct}%, ${SFCH} ${pct}%)`,
            accentColor: P,
          }} />
      </div>
      <div className="flex justify-between mt-2 px-1">
        <span className="text-[10px] font-bold" style={{ color: `${OSV}40` }}>{min}pts</span>
        <span className="text-[10px] font-bold" style={{ color: `${OSV}40` }}>{max}pts</span>
      </div>
    </div>
  );
}

export default function LeadScoringPage() {
  /* slider state */
  const [sliders, setSliders] = useState({ q1: 25, q2: 25, q3: 20, q4: 15, q5: 15 });
  const setSlider = (key: keyof typeof sliders) => (v: number) =>
    setSliders((s) => ({ ...s, [key]: v }));

  /* toggle state */
  const [enables, setEnables]     = useState({ q1: true, q2: true });
  const [followUps, setFollowUps] = useState({ housing: false, viewed: false, concerns: true, close: false });
  const [advanced, setAdvanced]   = useState({ customModel: false, seasonal: true });
  const [advOpen, setAdvOpen]     = useState(false);

  const toggleEnable = (k: keyof typeof enables) => () => setEnables((s) => ({ ...s, [k]: !s[k] }));
  const toggleFollowUp = (k: keyof typeof followUps) => () => setFollowUps((s) => ({ ...s, [k]: !s[k] }));
  const toggleAdv = (k: keyof typeof advanced) => () => setAdvanced((s) => ({ ...s, [k]: !s[k] }));

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
              <img alt="Julian Thorne" className="w-10 h-10 rounded-full object-cover"
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

      {/* ── FIXED HEADER ── */}
      <header className="fixed top-0 right-0 xl:left-72 left-0 h-20 z-40 flex justify-between items-center px-12 border-b"
        style={{ background: `${BG}cc`, backdropFilter: "blur(12px)", borderColor: SFC }}>
        <div>
          <h2 className="font-heading text-2xl font-black tracking-tight" style={{ color: P }}>Lead Scoring</h2>
          <p className="text-sm font-medium" style={{ color: OSV }}>Customize how we calculate buyer intent for your market</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-full border text-sm font-semibold transition-colors"
            style={{ borderColor: `${OTL}30`, color: OBG }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCLOW; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            Reset to default
          </button>
          <button className="px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
            style={{ background: SFCHIGH, color: OBG }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCH; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = SFCHIGH; }}>
            Preview scoring
          </button>
          <button className="px-8 py-2.5 rounded-full text-white text-sm font-bold transition-all hover:scale-105 active:scale-95"
            style={{ background: P, boxShadow: `0 8px 24px ${P}33` }}>
            Save changes
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="xl:ml-72 pt-32 px-12 pb-24 max-w-7xl mx-auto space-y-12">

        {/* ── 1. SCORING MODEL OVERVIEW ── */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <h3 className="font-heading text-xl font-bold" style={{ color: OBG }}>Scoring Model Overview</h3>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: P10, color: P }}>
              Total Weight: 100%
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {SCORE_MODEL.map((s) => (
              <div key={s.label} className="bg-white p-6 rounded-[2rem] border-l-4"
                style={{
                  borderLeftColor: s.borderColor,
                  boxShadow: "0px 20px 40px rgba(46,47,44,0.04)",
                }}>
                <p className="font-heading text-3xl font-black mb-1" style={{ color: s.textColor }}>{s.pct}</p>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: OSV }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. MARKET BENCHMARKS ── */}
        <section>
          <h3 className="font-heading text-xl font-bold mb-6" style={{ color: OBG }}>Market Benchmarks</h3>
          <div className="bg-white p-8 rounded-[2rem] border grid grid-cols-1 md:grid-cols-2 gap-8"
            style={{ borderColor: `${SFCH}80`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div className="flex justify-between items-center border-r pr-8" style={{ borderColor: `${SFCH}80` }}>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: OSV }}>Avg Intent Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-3xl font-black" style={{ color: OBG }}>68%</span>
                  <span className="text-xs font-medium" style={{ color: OSV }}>vs 71% regional avg</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: `${P}18`, borderTopColor: P }}>
                <TrendingUp className="w-5 h-5" style={{ color: P }} />
              </div>
            </div>
            <div className="flex justify-between items-center pl-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: OSV }}>Conversion Rate</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-3xl font-black" style={{ color: OBG }}>17%</span>
                  <span className="text-xs font-medium" style={{ color: OSV }}>vs 21% regional avg</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: `${HOT}18`, borderTopColor: HOT }}>
                <BarChart2 className="w-5 h-5" style={{ color: HOT }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. CORE INTENT QUALIFIERS + SIDEBAR ── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-heading text-xl font-bold mb-4" style={{ color: OBG }}>Core Intent Qualifiers</h3>

            {/* Q1 – Timeline */}
            <div className="bg-white p-8 rounded-[2rem] border relative overflow-hidden"
              style={{ borderColor: `${SFCH}80`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: P10, color: P }}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight" style={{ color: OBG }}>When are you looking to move?</h4>
                    <p className="text-sm mt-1" style={{ color: OSV }}>Measures temporal urgency of the lead journey.</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold" style={{ color: OSV }}>ENABLE</span>
                    <Toggle checked={enables.q1} onChange={toggleEnable("q1")} />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-xl font-black" style={{ color: P }}>{sliders.q1}</span>
                    <span className="font-bold text-sm" style={{ color: P }}>pts</span>
                  </div>
                </div>
              </div>
              <RangeSlider value={sliders.q1} onChange={setSlider("q1")} />
              <div className="mt-6 p-4 rounded-2xl flex items-start gap-3"
                style={{ background: "rgba(245,246,255,0.5)" }}>
                <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#595b62" }} />
                <p className="text-xs leading-relaxed" style={{ color: "#5b5d64" }}>
                  <strong>Recommendation:</strong> High-demand markets like SF benefit from a 25+ point weight for timeline to filter casual browsers.
                </p>
              </div>
            </div>

            {/* Q2 – Financing */}
            <div className="bg-white p-8 rounded-[2rem] border"
              style={{ borderColor: `${SFCH}80`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: P10, color: P }}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight" style={{ color: OBG }}>Do you require financing info?</h4>
                    <p className="text-sm mt-1" style={{ color: OSV }}>Tracks pre-approval status and capital readiness.</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Toggle checked={enables.q2} onChange={toggleEnable("q2")} />
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-xl font-black" style={{ color: P }}>{sliders.q2}</span>
                    <span className="font-bold text-sm" style={{ color: P }}>pts</span>
                  </div>
                </div>
              </div>
              <RangeSlider value={sliders.q2} onChange={setSlider("q2")} />
            </div>

            {/* Q3 & Q4 – small grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "q3" as const, label: "Property Type Interest", desc: "Focus on specific assets." },
                { key: "q4" as const, label: "Neighborhood Focus",     desc: "Geographic intent depth." },
              ].map(({ key, label, desc }) => (
                <div key={key} className="bg-white p-6 rounded-[2rem] border"
                  style={{ borderColor: `${SFCH}80`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-base" style={{ color: OBG }}>{label}</h4>
                      <p className="text-xs mt-0.5" style={{ color: OSV }}>{desc}</p>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading font-black text-lg" style={{ color: P }}>{sliders[key]}</span>
                      <span className="font-bold text-xs" style={{ color: P }}>pts</span>
                    </div>
                  </div>
                  <RangeSlider value={sliders[key]} onChange={setSlider(key)} />
                </div>
              ))}
            </div>

            {/* Q5 – Budget */}
            <div className="bg-white p-8 rounded-[2rem] border"
              style={{ borderColor: `${SFCH}80`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: P10, color: P }}>
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight" style={{ color: OBG }}>What's your budget?</h4>
                    <p className="text-sm mt-1" style={{ color: OSV }}>Price range alignment with portfolio.</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-xl font-black" style={{ color: P }}>{sliders.q5}</span>
                  <span className="font-bold text-sm" style={{ color: P }}>pts</span>
                </div>
              </div>
              <RangeSlider value={sliders.q5} onChange={setSlider("q5")} />
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { label: "UNDER $1M (+5)",    active: false },
                  { label: "$1.5M – $3M (+15)", active: true  },
                  { label: "OVER $5M (+10)",    active: false },
                ].map((tag) => (
                  <span key={tag.label} className="px-3 py-1 rounded-full text-[10px] font-bold"
                    style={tag.active
                      ? { background: `${PCONT}66`, color: "#1d0061" }
                      : { background: SFCLOW, color: OBG }}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="space-y-8">

            {/* Optional Follow-ups */}
            <div className="p-8 rounded-[2rem]" style={{ background: SFCMID }}>
              <h3 className="font-heading text-lg font-bold mb-6" style={{ color: OBG }}>Optional Follow-ups</h3>
              <div className="space-y-6">
                {([
                  { key: "housing"  as const, label: "Current housing situation" },
                  { key: "viewed"   as const, label: "Viewed properties before"  },
                  { key: "concerns" as const, label: "Concerns or deal-breakers" },
                  { key: "close"    as const, label: "When do you want to close" },
                ] as const).map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: OBG }}>{label}</span>
                    <Toggle small checked={followUps[key]} onChange={toggleFollowUp(key)} />
                  </div>
                ))}
              </div>
            </div>

            {/* SF Optimization */}
            <div className="p-8 rounded-[2rem] text-white"
              style={{ background: P, boxShadow: `0 20px 48px ${P}30` }}>
              <h3 className="font-heading text-lg font-bold mb-2">Optimize for San Francisco</h3>
              <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Current market benchmarks for your active region.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Avg Transaction Price", val: "$1.2M" },
                  { label: "Pre-approval Rate",     val: "68%"   },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between border-b pb-2"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                    <span className="text-xs font-medium opacity-80">{row.label}</span>
                    <span className="text-xs font-black">{row.val}</span>
                  </div>
                ))}
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-tight mb-2" style={{ color: PCONT }}>
                    Suggested Action
                  </p>
                  <p className="text-xs leading-relaxed italic" style={{ color: "rgba(255,255,255,0.85)" }}>
                    "Increase 'Financing readiness' weight to 35% as market volatility in SF has led to higher fallout rates among non-approved buyers."
                  </p>
                  <button className="mt-4 w-full py-2 bg-white rounded-full text-xs font-black transition-colors"
                    style={{ color: P }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
                    APPLY ADAPTIVE MODEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. SCORING PREVIEW ── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-heading text-xl font-bold" style={{ color: OBG }}>See How Scoring Works</h3>
            <div className="h-px flex-1" style={{ background: `${SFCH}80` }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PREVIEW_LEADS.map((lead) => (
              <div key={lead.name} className="bg-white p-6 rounded-[2rem] border relative"
                style={{
                  borderColor: lead.tier === "HOT" ? `${HOT}1a` : lead.tier === "WARM" && lead.breakdown ? `${P}1a` : `${SFCH}80`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black"
                  style={{ background: lead.tierBg, color: lead.tierText }}>
                  {lead.tier}
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ background: P10, color: P }}>
                    {lead.initials}
                  </div>
                  <div>
                    <h5 className="font-bold" style={{ color: OBG }}>{lead.name}</h5>
                    <p className="text-xs" style={{ color: OSV }}>{lead.area}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-xs font-bold uppercase" style={{ color: OSV }}>Intent Score</span>
                  <span className="font-heading text-2xl font-black" style={{ color: lead.scoreColor }}>{lead.score}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: SFCLOW }}>
                  <div className="h-full rounded-full" style={{ width: lead.barWidth, background: lead.barColor }} />
                </div>
                {lead.breakdown && (
                  <div className="grid grid-cols-5 gap-1 mt-4 mb-4">
                    {lead.breakdown.map((b) => (
                      <div key={b.key} className="h-8 rounded flex flex-col items-center justify-center"
                        style={{ background: SFCLOW }}>
                        <span className="text-[9px] font-black" style={{ color: P }}>{b.val}</span>
                        <span className="text-[6px] font-bold uppercase" style={{ color: OSV }}>{b.key}</span>
                      </div>
                    ))}
                  </div>
                )}
                {lead.aiNote && (
                  <div className="mt-4 p-3 rounded-xl border" style={{ background: P5, borderColor: P10 }}>
                    <p className="text-[10px] font-semibold italic leading-snug" style={{ color: OBG }}>
                      "{lead.aiNote}"
                    </p>
                  </div>
                )}
                {lead.desc && (
                  <p className="text-[11px] leading-relaxed mt-4" style={{ color: OSV }}>{lead.desc}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. ADVANCED OPTIONS ── */}
        <section>
          <h3 className="font-heading text-xl font-bold mb-6" style={{ color: OBG }}>Advanced Options</h3>
          <div className="rounded-[1.5rem] border overflow-hidden max-w-2xl"
            style={{ background: `${SFCLOW}80`, borderColor: `${SFCH}80` }}>
            <button className="w-full flex items-center justify-between p-6 text-left"
              onClick={() => setAdvOpen((v) => !v)}>
              <div className="flex items-center gap-4">
                <Settings2 className="w-5 h-5" style={{ color: OSV }} />
                <span className="font-bold" style={{ color: OBG }}>Model Parameters</span>
              </div>
              <ChevronDown className="w-5 h-5 transition-transform" style={{
                color: OSV,
                transform: advOpen ? "rotate(180deg)" : "rotate(0deg)",
              }} />
            </button>
            {advOpen && (
              <div className="px-6 pb-6 space-y-6 border-t" style={{ borderColor: `${SFCH}80` }}>
                <div className="pt-6 flex items-center justify-between">
                  <div className="max-w-[70%]">
                    <p className="text-sm font-bold" style={{ color: OBG }}>Custom intent model</p>
                    <p className="text-xs mt-0.5" style={{ color: OSV }}>Enable proprietary AI-driven behavior tracking beyond basic questions.</p>
                  </div>
                  <Toggle small checked={advanced.customModel} onChange={toggleAdv("customModel")} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="max-w-[70%]">
                    <p className="text-sm font-bold" style={{ color: OBG }}>Seasonal adjustment</p>
                    <p className="text-xs mt-0.5" style={{ color: OSV }}>Automatically recalibrate scoring based on SF seasonal market volume.</p>
                  </div>
                  <Toggle small checked={advanced.seasonal} onChange={toggleAdv("seasonal")} />
                </div>
                <button className="w-full py-3 rounded-full border border-dashed text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  style={{ borderColor: `${OTL}40`, color: OSV }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCLOW; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                  <PlusIcon className="w-4 h-4" /> ADD CUSTOM QUESTION
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── SAVE FOOTER ── */}
        <div className="pt-12 border-t flex items-center justify-between" style={{ borderColor: `${SFCH}60` }}>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5" style={{ color: SUCCESS }} />
            <span className="text-sm font-medium" style={{ color: "#595b62" }}>
              Changes here will apply to all 124 active leads in your pipeline.
            </span>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-full font-bold text-sm transition-colors"
              style={{ color: OSV }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCLOW; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              Discard changes
            </button>
            <button className="px-12 py-3 rounded-full text-white font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{ background: P, boxShadow: `0 8px 32px ${P}40` }}>
              Apply &amp; Save Engine
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
