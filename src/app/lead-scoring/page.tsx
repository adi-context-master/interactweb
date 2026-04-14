"use client";

import {
  LayoutDashboard, GitBranch, UserSearch, BarChart3, Sliders, MessageSquare,
  Settings, LogOut, BadgeCheck, PlusCircle, TrendingUp, Activity,
  Clock, CreditCard, Wallet, Sparkles, SlidersHorizontal, ChevronDown,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ─── palette ─────────────────────────────────────────────────────── */
const P      = "#7C5CFF";
const P5     = "rgba(124,92,255,0.05)";
const P10    = "rgba(124,92,255,0.10)";
const PDIM   = "#6648e6";
const BG     = "#fffdf5";
const SFCL   = "#faf8f0";
const SFCLOW = "#f7f6f1";
const SFCMID = "#f1f0e9";
const SFCH   = "#e8e7e1";
const OBG    = "#2e2f2c";
const OSV    = "#5b5c58";
const ERR    = "#b41340";
const HOT    = "#E53935";
const SUCCESS = "#2E7D32";
const sideActive = { background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", color: P };

/* ─── nav ─────────────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",    href: "/dashboard",    active: false },
  { icon: GitBranch,       label: "Pipeline",     href: "/pipeline",     active: false },
  { icon: UserSearch,      label: "Leads",        href: "/leads",        active: false },
  { icon: BarChart3,       label: "Insights",     href: "/insights",     active: false },
  { icon: Sliders,         label: "Lead Scoring", href: "/lead-scoring", active: true  },
  { icon: MessageSquare,   label: "Messages",     href: "/messages",     active: false },
];

/* ─── scoring model cards ─────────────────────────────────────────── */
const SCORE_MODEL = [
  { pct: "25%", label: "Timeline Urgency",     borderColor: P,          textColor: P },
  { pct: "25%", label: "Financial Readiness",  borderColor: "#e0d7ff",  textColor: "#1d0061" },
  { pct: "20%", label: "Property Specificity", borderColor: "#ebeae3",  textColor: OBG },
  { pct: "15%", label: "Location Focus",       borderColor: "#f5f6ff",  textColor: "#595b62" },
  { pct: "15%", label: "Engagement Depth",     borderColor: "#adada9",  textColor: OSV },
];

/* ─── toggle components ───────────────────────────────────────────── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={onChange}
      className="relative inline-flex rounded-full transition-all duration-200 flex-shrink-0"
      style={{ width: 44, height: 24, background: checked ? P : SFCH }}>
      <span className="absolute rounded-full bg-white shadow-sm transition-all duration-200"
        style={{ width: 20, height: 20, top: 2, left: checked ? 22 : 2 }} />
    </button>
  );
}

function SmallToggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={onChange}
      className="relative inline-flex rounded-full transition-all duration-200 flex-shrink-0"
      style={{ width: 36, height: 20, background: checked ? P : "#e1e0d9" }}>
      <span className="absolute rounded-full bg-white shadow-sm transition-all duration-200"
        style={{ width: 16, height: 16, top: 2, left: checked ? 18 : 2 }} />
    </button>
  );
}

/* ─── slider row helper ───────────────────────────────────────────── */
function SliderRow({ id, value, onChange }: { id: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="px-2">
      <input id={id} type="range" min={10} max={40} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="scoring-range w-full" />
      <div className="flex justify-between mt-2 px-1">
        <span className="text-[10px] font-bold" style={{ color: `${OSV}55` }}>10pts</span>
        <span className="text-[10px] font-bold" style={{ color: `${OSV}55` }}>40pts</span>
      </div>
    </div>
  );
}

/* ─── page ────────────────────────────────────────────────────────── */
export default function LeadScoringPage() {
  const [pts, setPts]     = useState({ q1: 25, q2: 25, q3: 20, q4: 15, q5: 15 });
  const [enabled, setEnabled] = useState({ q1: true, q2: true });
  const [followups, setFollowups] = useState({ housing: false, viewed: false, concerns: true, close: false });
  const [advanced, setAdvanced]   = useState({ custom: false, seasonal: true });
  const [advOpen, setAdvOpen]     = useState(false);

  const setQ = (key: keyof typeof pts) => (v: number) => setPts((p) => ({ ...p, [key]: v }));

  return (
    <div className="min-h-screen font-body antialiased" style={{ background: BG, color: OBG }}>

      {/* ── SIDEBAR ── */}
      <aside className="hidden xl:flex h-screen w-72 fixed left-0 top-0 flex-col py-8 px-8 z-40 border-r"
        style={{ background: SFCL, borderColor: SFCMID }}>
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
          <button
            className="w-full py-4 rounded-full font-bold font-heading text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{ background: P, boxShadow: `0 8px 24px rgba(124,92,255,0.25)` }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
            <PlusCircle className="w-5 h-5" /> New Signal
          </button>
        </div>
        <div className="mt-auto pt-6 border-t space-y-1 mb-6" style={{ borderColor: SFCH }}>
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
        <div className="pt-6 border-t" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Julian Thorne"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[rgba(124,92,255,0.12)]"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=44&h=44&fit=crop&crop=face" />
            <div className="flex flex-col">
              <span className="text-[13px] font-bold" style={{ color: OBG }}>Julian Thorne</span>
              <span className="text-[11px] font-medium" style={{ color: `${OBG}50` }}>Senior Curator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── FIXED HEADER ── */}
      <header className="fixed top-0 left-0 xl:left-72 right-0 h-20 flex justify-between items-center px-12 z-40 border-b"
        style={{ background: "rgba(255,253,245,0.88)", backdropFilter: "blur(16px)", borderColor: SFCMID }}>
        <div>
          <h2 className="text-2xl font-black tracking-tight font-heading" style={{ color: P }}>Lead Scoring</h2>
          <p className="text-sm font-medium" style={{ color: OSV }}>Customize how we calculate buyer intent for your market</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-full border text-sm font-semibold transition-colors"
            style={{ borderColor: "rgba(173,173,169,0.3)", color: OBG }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCLOW; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            Reset to default
          </button>
          <button className="px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
            style={{ background: SFCH, color: OBG }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#e1e0d9"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = SFCH; }}>
            Preview scoring
          </button>
          <button className="px-8 py-2.5 rounded-full text-white text-sm font-bold transition-all hover:scale-105 active:scale-95"
            style={{ background: P, boxShadow: `0 8px 24px rgba(124,92,255,0.2)` }}>
            Save changes
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="xl:ml-72 pb-24">
        <div className="pt-32 px-12 space-y-12 max-w-7xl mx-auto">

          {/* ── Scoring Model Overview ── */}
          <section>
            <div className="flex items-end justify-between mb-6">
              <h3 className="text-xl font-bold font-heading" style={{ color: OBG }}>Scoring Model Overview</h3>
              <p className="text-sm font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                style={{ background: "rgba(224,215,255,0.4)", color: P }}>
                Total Weight: 100%
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {SCORE_MODEL.map((card) => (
                <div key={card.label} className="bg-white p-6 rounded-[2rem] border-l-4"
                  style={{ borderLeftColor: card.borderColor, boxShadow: "0 20px 40px rgba(46,47,44,0.04)" }}>
                  <p className="text-3xl font-black font-heading mb-1" style={{ color: card.textColor }}>{card.pct}</p>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: OSV }}>{card.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Market Benchmarks ── */}
          <section>
            <h3 className="text-xl font-bold font-heading mb-6" style={{ color: OBG }}>Market Benchmarks</h3>
            <div className="bg-white p-8 rounded-[2rem] border grid grid-cols-1 md:grid-cols-2 gap-8"
              style={{ borderColor: "rgba(173,173,169,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
              <div className="flex justify-between items-center border-r pr-8"
                style={{ borderColor: "rgba(173,173,169,0.1)" }}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: OSV }}>Avg Intent Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black" style={{ color: OBG }}>68%</span>
                    <span className="text-xs font-medium" style={{ color: OSV }}>vs 71% regional avg</span>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ border: `4px solid ${P}22`, borderTopColor: P }}>
                  <TrendingUp className="w-5 h-5" style={{ color: P }} />
                </div>
              </div>
              <div className="flex justify-between items-center pl-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: OSV }}>Conversion Rate</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black" style={{ color: OBG }}>17%</span>
                    <span className="text-xs font-medium" style={{ color: OSV }}>vs 21% regional avg</span>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ border: `4px solid rgba(229,57,53,0.12)`, borderTopColor: HOT }}>
                  <Activity className="w-5 h-5" style={{ color: HOT }} />
                </div>
              </div>
            </div>
          </section>

          {/* ── Core Intent Qualifiers + Sidebar ── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: Questions (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold font-heading mb-4" style={{ color: OBG }}>Core Intent Qualifiers</h3>

              {/* Q1: Timeline */}
              <div className="bg-white p-8 rounded-[2rem] border"
                style={{ borderColor: "rgba(173,173,169,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: P10, color: P }}>
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-tight" style={{ color: OBG }}>When are you looking to move?</h4>
                      <p className="text-sm mt-1" style={{ color: OSV }}>Measures temporal urgency of the lead journey.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold" style={{ color: OSV }}>ENABLE</span>
                      <Toggle checked={enabled.q1} onChange={() => setEnabled((e) => ({ ...e, q1: !e.q1 }))} />
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="font-black text-xl" style={{ color: P }}>{pts.q1}</span>
                      <span className="font-bold text-sm" style={{ color: P }}>pts</span>
                    </div>
                  </div>
                </div>
                <SliderRow id="q1" value={pts.q1} onChange={setQ("q1")} />
                <div className="mt-6 p-4 rounded-2xl flex items-start gap-3"
                  style={{ background: "rgba(245,246,255,0.6)" }}>
                  <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#595b62" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "#5b5d64" }}>
                    <strong>Recommendation:</strong> High-demand markets like SF benefit from a 25+ point weight for timeline to filter casual browsers.
                  </p>
                </div>
              </div>

              {/* Q2: Financing */}
              <div className="bg-white p-8 rounded-[2rem] border"
                style={{ borderColor: "rgba(173,173,169,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: P10, color: P }}>
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-tight" style={{ color: OBG }}>Do you require financing info?</h4>
                      <p className="text-sm mt-1" style={{ color: OSV }}>Tracks pre-approval status and capital readiness.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0 ml-4">
                    <Toggle checked={enabled.q2} onChange={() => setEnabled((e) => ({ ...e, q2: !e.q2 }))} />
                    <div className="flex items-center gap-1 mt-2">
                      <span className="font-black text-xl" style={{ color: P }}>{pts.q2}</span>
                      <span className="font-bold text-sm" style={{ color: P }}>pts</span>
                    </div>
                  </div>
                </div>
                <SliderRow id="q2" value={pts.q2} onChange={setQ("q2")} />
              </div>

              {/* Q3 + Q4 small grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "q3" as const, label: "Property Type Interest", desc: "Focus on specific assets." },
                  { key: "q4" as const, label: "Neighborhood Focus",     desc: "Geographic intent depth." },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="bg-white p-6 rounded-[2rem] border"
                    style={{ borderColor: "rgba(173,173,169,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-base mb-1" style={{ color: OBG }}>{label}</h4>
                        <p className="text-xs" style={{ color: OSV }}>{desc}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-black text-lg" style={{ color: P }}>{pts[key]}</span>
                        <span className="font-bold text-xs" style={{ color: P }}>pts</span>
                      </div>
                    </div>
                    <input type="range" min={10} max={40} value={pts[key]}
                      onChange={(e) => setQ(key)(Number(e.target.value))}
                      className="scoring-range w-full" />
                  </div>
                ))}
              </div>

              {/* Q5: Budget */}
              <div className="bg-white p-8 rounded-[2rem] border"
                style={{ borderColor: "rgba(173,173,169,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: P10, color: P }}>
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-tight" style={{ color: OBG }}>What&apos;s your budget?</h4>
                      <p className="text-sm mt-1" style={{ color: OSV }}>Price range alignment with portfolio.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 ml-4">
                    <span className="font-black text-xl" style={{ color: P }}>{pts.q5}</span>
                    <span className="font-bold text-sm" style={{ color: P }}>pts</span>
                  </div>
                </div>
                <SliderRow id="q5" value={pts.q5} onChange={setQ("q5")} />
                <div className="flex flex-wrap gap-2 mt-6">
                  {[
                    { label: "UNDER $1M (+5)",   bg: SFCLOW,                    text: OBG },
                    { label: "$1.5M \u2013 $3M (+15)", bg: "rgba(224,215,255,0.4)", text: "#1d0061" },
                    { label: "OVER $5M (+10)",    bg: SFCLOW,                    text: OBG },
                  ].map((b) => (
                    <span key={b.label} className="px-3 py-1 rounded-full text-[10px] font-bold"
                      style={{ background: b.bg, color: b.text }}>
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: sidebar (1 col) */}
            <div className="space-y-8">

              {/* Optional Follow-ups */}
              <div className="p-8 rounded-[2rem]" style={{ background: SFCMID }}>
                <h3 className="text-lg font-bold font-heading mb-6" style={{ color: OBG }}>Optional Follow-ups</h3>
                <div className="space-y-6">
                  {([
                    { key: "housing",  label: "Current housing situation" },
                    { key: "viewed",   label: "Viewed properties before" },
                    { key: "concerns", label: "Concerns or deal-breakers" },
                    { key: "close",    label: "When do you want to close" },
                  ] as { key: keyof typeof followups; label: string }[]).map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: OBG }}>{label}</span>
                      <SmallToggle checked={followups[key]} onChange={() => setFollowups((f) => ({ ...f, [key]: !f[key] }))} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimize for SF */}
              <div className="p-8 rounded-[2rem] text-white"
                style={{ background: P, boxShadow: `0 20px 48px rgba(124,92,255,0.25)` }}>
                <h3 className="text-lg font-bold font-heading mb-2">Optimize for San Francisco</h3>
                <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Current market benchmarks for your active region.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Avg Transaction Price", value: "$1.2M" },
                    { label: "Pre-approval Rate",     value: "68%" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between pb-2 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                      <span className="text-xs font-medium">{row.label}</span>
                      <span className="text-xs font-black">{row.value}</span>
                    </div>
                  ))}
                  <div className="mt-6">
                    <p className="text-xs font-bold mb-2 uppercase tracking-tight" style={{ color: "#e0d7ff" }}>
                      Suggested Action
                    </p>
                    <p className="text-xs leading-relaxed italic opacity-90">
                      &ldquo;Increase &lsquo;Financing readiness&rsquo; weight to 35% as market volatility in SF has led to higher fallout rates among non-approved buyers.&rdquo;
                    </p>
                    <button
                      className="mt-4 w-full py-2 rounded-full text-xs font-black transition-all"
                      style={{ background: "white", color: P }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.9)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
                      APPLY ADAPTIVE MODEL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── See How Scoring Works ── */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xl font-bold font-heading whitespace-nowrap" style={{ color: OBG }}>See How Scoring Works</h3>
              <div className="flex-1 h-px" style={{ background: "rgba(173,173,169,0.2)" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Sarah Chen – HOT */}
              <div className="bg-white p-6 rounded-[2rem] border relative shadow-sm"
                style={{ borderColor: `${HOT}22` }}>
                <div className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-[10px] font-black"
                  style={{ background: HOT }}>HOT</div>
                <div className="flex items-center gap-4 mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Sarah Chen" className="w-12 h-12 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=48&h=48&fit=crop&crop=face" />
                  <div>
                    <h5 className="font-bold" style={{ color: OBG }}>Sarah Chen</h5>
                    <p className="text-xs" style={{ color: OSV }}>Looking in Noe Valley</p>
                  </div>
                </div>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-xs font-bold uppercase" style={{ color: OSV }}>Intent Score</span>
                  <span className="text-2xl font-black" style={{ color: HOT }}>100%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: SFCLOW }}>
                  <div className="h-full rounded-full w-full" style={{ background: HOT }} />
                </div>
                <p className="text-[11px] mt-4 leading-relaxed" style={{ color: OSV }}>
                  Highly specific property needs, 30-day move timeline, and proof of funds already uploaded.
                </p>
              </div>

              {/* Elena Rodriguez – WARM */}
              <div className="bg-white p-6 rounded-[2rem] border relative shadow-sm"
                style={{ borderColor: P10 }}>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black"
                  style={{ background: P10, color: P }}>WARM</div>
                <div className="flex items-center gap-4 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Elena Rodriguez" className="w-12 h-12 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop&crop=face" />
                  <div>
                    <h5 className="font-bold" style={{ color: OBG }}>Elena Rodriguez</h5>
                    <p className="text-xs" style={{ color: OSV }}>Pacific Heights</p>
                  </div>
                </div>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-xs font-bold uppercase" style={{ color: OSV }}>Intent Score</span>
                  <span className="text-2xl font-black" style={{ color: P }}>65%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden mb-4" style={{ background: SFCLOW }}>
                  <div className="h-full rounded-full" style={{ width: "65%", background: P }} />
                </div>
                <div className="grid grid-cols-5 gap-1 mb-4">
                  {[
                    { v: 15, lbl: "Time" }, { v: 18, lbl: "Fin" },
                    { v: 8,  lbl: "Prop" }, { v: 12, lbl: "Loc" }, { v: 12, lbl: "Eng" },
                  ].map((s) => (
                    <div key={s.lbl} className="h-8 rounded flex flex-col items-center justify-center"
                      style={{ background: SFCLOW }}>
                      <span className="text-[9px] font-black" style={{ color: P }}>{s.v}</span>
                      <span className="text-[6px] font-bold uppercase" style={{ color: OSV }}>{s.lbl}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl border" style={{ background: P5, borderColor: P10 }}>
                  <p className="text-[10px] font-semibold italic leading-snug" style={{ color: OBG }}>
                    &ldquo;Strategic Nurture: Lead is serious but needs more inventory options before a tour.&rdquo;
                  </p>
                </div>
              </div>

              {/* Marcus Wilson – WARM */}
              <div className="bg-white p-6 rounded-[2rem] border shadow-sm relative"
                style={{ borderColor: "rgba(173,173,169,0.1)" }}>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black"
                  style={{ background: "#e0d7ff", color: "#1d0061" }}>WARM</div>
                <div className="flex items-center gap-4 mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Marcus Wilson" className="w-12 h-12 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face" />
                  <div>
                    <h5 className="font-bold" style={{ color: OBG }}>Marcus Wilson</h5>
                    <p className="text-xs" style={{ color: OSV }}>General SF interest</p>
                  </div>
                </div>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-xs font-bold uppercase" style={{ color: OSV }}>Intent Score</span>
                  <span className="text-2xl font-black" style={{ color: P }}>57%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: SFCLOW }}>
                  <div className="h-full rounded-full" style={{ width: "57%", background: P }} />
                </div>
                <p className="text-[11px] mt-4 leading-relaxed" style={{ color: OSV }}>
                  Needs financing info. 3\u20136 month timeline. Engaged with 4 listing emails this week.
                </p>
              </div>

            </div>
          </section>

          {/* ── Advanced Options ── */}
          <section>
            <h3 className="text-xl font-bold font-heading mb-6" style={{ color: OBG }}>Advanced Options</h3>
            <div className="rounded-3xl border overflow-hidden max-w-2xl"
              style={{ background: `${SFCLOW}aa`, borderColor: "rgba(173,173,169,0.1)" }}>
              <button onClick={() => setAdvOpen((v) => !v)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors"
                style={{ color: OBG }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCLOW; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                <div className="flex items-center gap-4">
                  <SlidersHorizontal className="w-5 h-5" style={{ color: OSV }} />
                  <span className="font-bold">Model Parameters</span>
                </div>
                <ChevronDown className="w-5 h-5 transition-transform duration-200" style={{
                  color: OSV, transform: advOpen ? "rotate(180deg)" : "rotate(0deg)",
                }} />
              </button>
              {advOpen && (
                <div className="px-6 pb-6 space-y-6 border-t pt-6" style={{ borderColor: "rgba(173,173,169,0.1)" }}>
                  {[
                    { key: "custom" as const,   label: "Custom intent model",    desc: "Enable proprietary AI-driven behavior tracking beyond basic questions." },
                    { key: "seasonal" as const, label: "Seasonal adjustment",    desc: "Automatically recalibrate scoring based on SF seasonal market volume." },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="max-w-[70%]">
                        <p className="text-sm font-bold" style={{ color: OBG }}>{label}</p>
                        <p className="text-xs mt-0.5" style={{ color: OSV }}>{desc}</p>
                      </div>
                      <SmallToggle checked={advanced[key]} onChange={() => setAdvanced((a) => ({ ...a, [key]: !a[key] }))} />
                    </div>
                  ))}
                  <button
                    className="w-full py-3 border-2 border-dashed text-xs font-bold flex items-center justify-center gap-2 rounded-full transition-colors"
                    style={{ borderColor: "rgba(173,173,169,0.35)", color: OSV }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCLOW; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    <PlusCircle className="w-4 h-4" /> ADD CUSTOM QUESTION
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ── Save footer ── */}
          <div className="mt-20 pt-12 border-t flex items-center justify-between"
            style={{ borderColor: "rgba(173,173,169,0.1)" }}>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: SUCCESS }} />
              <span className="text-sm font-medium" style={{ color: OSV }}>
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
                style={{ background: P, boxShadow: `0 16px 40px rgba(124,92,255,0.3)` }}>
                Apply &amp; Save Engine
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
