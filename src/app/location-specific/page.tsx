"use client";

import React from "react";
import {
  LayoutDashboard, GitBranch, UserSearch, BarChart3, Sliders, MessageSquare,
  Settings, LogOut, BadgeCheck, PlusCircle, TrendingUp, TrendingDown,
  MapPin, Zap, ChevronRight, Send, CheckCircle2, Clock, Phone,
  Sparkles, MoreVertical, Flame,
} from "lucide-react";
import Link from "next/link";

/* ─── palette ─────────────────────────────────────────────────────── */
const P     = "#7C5CFF";
const P5    = "rgba(124,92,255,0.05)";
const P10   = "rgba(124,92,255,0.10)";
const PDIM  = "#6648e6";
const BG    = "#fffdf5";
const SFCL  = "#faf8f0";
const SFCLOW= "#fffef9";
const SFCH  = "#e3e3dd";
const SFC   = "#e9e8e3";
const SFCHIGH="#f0ede6";
const OBG   = "#2e2f2c";
const OSV   = "#5b5c58";
const OTL   = "#777773";
const ERR   = "#b41340";

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
const CLUSTERS = [
  { id: "soma",    label: "SOMA District",       leads: 5, intent: 89, color: "#ef4444", top: "60%", left: "60%", size: 64, pulse: true  },
  { id: "marina",  label: "Marina / Pac Heights", leads: 4, intent: 76, color: "#f97316", top: "25%", left: "30%", size: 56, pulse: false },
  { id: "mission", label: "Mission District",     leads: 3, intent: 65, color: "#eab308", top: "75%", left: "45%", size: 48, pulse: false },
];

const TRENDS = [
  {
    area: "SOMA Search Volume",
    pct: "+31%",
    dir: "up",
    color: "#ef4444",
    borderColor: "#fee2e2",
    textColor: "#dc2626",
    path: "M0 35 Q 25 35, 40 20 T 70 10 T 100 5",
    desc: "Consistent growth in luxury loft searches this month.",
    action: "+31% → High demand. Prioritize these 5 leads for same-day follow-up.",
  },
  {
    area: "Marina / Pacific Heights",
    pct: "+12%",
    dir: "up",
    color: "#f97316",
    borderColor: "#ffedd5",
    textColor: "#ea580c",
    path: "M0 30 Q 30 25, 50 28 T 80 15 T 100 12",
    desc: "Stable interest with slight uptick in family rentals.",
    action: "+12% → Steady demand. Standard 24h follow-up cadence.",
  },
  {
    area: "Mission District",
    pct: "-4%",
    dir: "down",
    color: OTL,
    borderColor: SFCHIGH,
    textColor: OSV,
    path: "M0 10 Q 30 15, 60 25 T 100 30",
    desc: "Cooling period following peak spring activity.",
    action: "-4% → Cooling. Move these to nurture sequence, lower priority.",
  },
];

const LEADS = [
  {
    name: "Sarah Chen",   initials: "SC", since: "Active 2h ago",
    intent: 89, area: "SOMA District",  areaColor: "#ef4444", areaBg: "#fee2e2", areaBorder: "#fecaca",
    commonality: "High-rise luxury focus, pre-approval confirmed",
    daysToClose: "14–21 days", daysColor: ERR,
    window: "Call within 2h", windowSub: "Peak 2–4pm", windowColor: ERR,
  },
  {
    name: "Marcus Wilson", initials: "MW", since: "Active 5h ago",
    intent: 82, area: "Marina/PacHts", areaColor: "#f97316", areaBg: "#ffedd5", areaBorder: "#fed7aa",
    commonality: "School district priority, Victorian architecture",
    daysToClose: "30–45 days", daysColor: OBG,
    window: "Evening window", windowSub: "Peak 6–8pm", windowColor: OBG,
  },
  {
    name: "Jordan Wu",    initials: "JW", since: "Active yesterday",
    intent: 65, area: "Mission District", areaColor: "#ca8a04", areaBg: "#fef9c3", areaBorder: "#fde68a",
    commonality: "Creative workspace needs, transit proximity",
    daysToClose: "60+ days", daysColor: OTL,
    window: "Nurture Phase", windowSub: "Weekend focus", windowColor: OTL,
  },
];

export default function LocationSpecificPage() {
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
        <nav className="mb-8 flex items-center gap-2 text-sm font-medium" style={{ color: `${OSV}99` }}>
          <Link href="/dashboard" className="transition-colors hover:text-[#7C5CFF]">Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <span style={{ color: OBG }}>Location Specificity</span>
        </nav>

        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-heading font-extrabold tracking-tight leading-tight"
              style={{ fontSize: "3.5rem", color: OBG }}>
              Location Specific Insights
            </h1>
            <div className="mt-3 space-y-1.5">
              <p className="flex items-center gap-2 font-medium" style={{ color: OSV }}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: P }} />
                12 leads with hyper-local neighborhood focus (within 1.4-mile radius)
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm font-bold flex items-center gap-1" style={{ color: ERR }}>
                  <TrendingUp className="w-4 h-4" /> Engagement rate: 31% above market average
                </span>
                <span className="text-xs italic" style={{ color: `${OSV}80` }}>
                  Location specificity signals correlate with 67% faster showing bookings
                </span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-4 px-8 py-4 rounded-full text-white font-bold font-heading active:scale-95 transition-all flex-shrink-0"
            style={{ background: P, boxShadow: `0 8px 24px ${P}44` }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
            <Send className="w-4 h-4" />
            Send Exclusive Neighborhood Inventory Alert
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.2)" }}>
              2.1x Engagement
            </span>
          </button>
        </header>

        {/* ── MAP + STRATEGY ── */}
        <div className="grid grid-cols-12 gap-8 mb-8">

          {/* Map */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl overflow-hidden border flex flex-col"
            style={{ borderColor: `${SFCHIGH}80`, minHeight: 500 }}>
            <div className="flex-grow relative bg-stone-100">
              {/* base map texture */}
              <div className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(124,92,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(124,92,255,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                  background: "#f5f3ee",
                }} />
              {/* soft gradient overlay */}
              <div className="absolute inset-0 opacity-30"
                style={{ background: "radial-gradient(ellipse at 60% 60%, rgba(239,68,68,0.15), transparent 60%)" }} />

              {/* Cluster pins */}
              {CLUSTERS.map((c) => (
                <div key={c.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ top: c.top, left: c.left }}>
                  {/* ripple */}
                  <div className={`rounded-full flex items-center justify-center border-2 ${c.pulse ? "animate-pulse" : ""}`}
                    style={{
                      width: c.size, height: c.size,
                      background: `${c.color}28`,
                      borderColor: c.color,
                    }}>
                    <div className="w-4 h-4 rounded-full shadow-lg" style={{ background: c.color }} />
                  </div>
                  {/* tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-white rounded-xl shadow-xl border z-20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ borderColor: `${c.color}30` }}>
                    <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: c.color }}>{c.label}</p>
                    <p className="text-xs font-semibold" style={{ color: OBG }}>{c.leads} Leads · {c.intent}% Avg Intent</p>
                  </div>
                </div>
              ))}

              {/* District labels */}
              <div className="absolute top-[54%] left-[64%] text-[10px] font-black uppercase tracking-wider" style={{ color: "#ef4444" }}>SOMA</div>
              <div className="absolute top-[19%] left-[34%] text-[10px] font-black uppercase tracking-wider" style={{ color: "#f97316" }}>MARINA</div>
              <div className="absolute top-[69%] left-[49%] text-[10px] font-black uppercase tracking-wider" style={{ color: "#ca8a04" }}>MISSION</div>
            </div>

            {/* Legend */}
            <div className="bg-white border-t flex flex-wrap gap-6 items-center justify-center p-4"
              style={{ borderColor: `${SFCHIGH}80` }}>
              {CLUSTERS.map((c) => (
                <div key={c.id} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="text-xs font-bold" style={{ color: OBG }}>{c.label.split(" /")[0]}</span>
                  <span className="text-xs" style={{ color: OSV }}>{c.leads} Leads ({c.intent}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy card */}
          <div className="col-span-12 lg:col-span-4 rounded-2xl p-8 flex flex-col relative overflow-hidden text-white"
            style={{ background: P, boxShadow: `0 20px 40px ${P}28` }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 blur-2xl"
              style={{ background: "rgba(255,255,255,0.12)" }} />
            <div className="mb-auto relative z-10">
              <Sparkles className="w-9 h-9 mb-4 opacity-90" />
              <h3 className="font-heading text-2xl font-bold mb-4">Recommended Action Strategy</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Based on hyper-local data, these leads are 2.1× more likely to engage with neighborhood-exclusive off-market listings.
              </p>

              {/* Execution steps */}
              <div className="rounded-2xl p-5 mb-8 space-y-4 border"
                style={{ background: "rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.08)" }}>
                {[
                  { icon: CheckCircle2, done: true,  label: "Curate SOMA Off-Market List",  sub: "Done"              },
                  { icon: Clock,        done: false, label: "Send to 5 leads via email",     sub: "Scheduled: Tomorrow 9am" },
                  { icon: Phone,        done: false, label: "Follow-up call within 48h",     sub: "If no response"    },
                ].map(({ icon: Icon, done, label, sub }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: done ? "#4ade80" : "rgba(255,255,255,0.2)" }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: done ? P : "white" }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{label}
                        <span className="ml-1 font-medium opacity-60">{done ? `(${sub})` : ""}</span>
                      </p>
                      {!done && <p className="text-[10px] opacity-60">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-white py-4 rounded-xl font-bold text-sm flex flex-col items-center gap-0.5 transition-all active:scale-95 relative z-10"
              style={{ color: P }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.92"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Auto-curate SOMA Off-Market List
              </span>
              <span className="text-[10px] font-medium opacity-60">tailored to these 5 leads' criteria</span>
            </button>
            <p className="text-[11px] text-center mt-3 opacity-60 relative z-10">
              Historical Impact: +18% engagement vs. generic outreach
            </p>
          </div>
        </div>

        {/* ── NEIGHBORHOOD TRENDS ── */}
        <div className="bg-white rounded-2xl p-8 mb-8 border"
          style={{ borderColor: `${SFCHIGH}80`, boxShadow: "0px 20px 40px rgba(46,47,44,0.04)" }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold" style={{ color: OBG }}>Neighborhood Trends</h2>
              <p className="text-xs font-medium mt-1" style={{ color: OSV }}>Search volume volatility over last 30 days</p>
            </div>
            <div className="flex items-center gap-2 font-bold text-sm" style={{ color: "#ef4444" }}>
              <Flame className="w-4 h-4" /> SOMA Heating
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRENDS.map((t) => (
              <div key={t.area} className="p-6 rounded-xl border flex flex-col"
                style={{ background: `${SFCLOW}60`, borderColor: `${SFCHIGH}80` }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest mb-1" style={{ color: OTL }}>{t.area}</p>
                    <p className="text-2xl font-black flex items-center gap-1" style={{ color: t.color }}>
                      {t.pct}
                      {t.dir === "up"
                        ? <TrendingUp className="w-5 h-5 inline" />
                        : <TrendingDown className="w-5 h-5 inline" />}
                    </p>
                  </div>
                  <div className="w-20 h-10 flex-shrink-0">
                    <svg viewBox="0 0 100 40" className="w-full h-full">
                      <path d={t.path} fill="none" stroke={t.color} strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs leading-relaxed flex-grow mb-4" style={{ color: OSV }}>{t.desc}</p>
                <p className="text-[11px] font-bold pt-3 border-t" style={{ color: t.textColor, borderColor: t.borderColor }}>
                  {t.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── LEAD TABLE ── */}
        <div className="bg-white rounded-2xl p-8 border"
          style={{ borderColor: `${SFCHIGH}80`, boxShadow: "0px 20px 40px rgba(46,47,44,0.04)" }}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold" style={{ color: OBG }}>Qualified Neighborhood Leads</h2>
            <div className="flex gap-2">
              <span className="px-4 py-2 rounded-full text-xs font-semibold" style={{ background: SFCLOW, color: OSV }}>
                12 Active Leads
              </span>
              <span className="px-4 py-2 rounded-full text-xs font-semibold" style={{ background: P10, color: P }}>
                Priority View
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ minWidth: 800 }}>
              <thead>
                <tr className="border-b text-[10px] uppercase tracking-widest" style={{ borderColor: `${SFCHIGH}80`, color: OTL }}>
                  {["Lead Profile", "Intent Signal", "Neighborhood", "Commonality", "Days to Close", "Peak Window", ""].map((h) => (
                    <th key={h} className="pb-4 font-semibold pr-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LEADS.map((lead, i) => (
                  <tr key={lead.name}
                    className="border-b transition-colors group"
                    style={{ borderColor: i === LEADS.length - 1 ? "transparent" : `${SFCHIGH}60` }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${SFCLOW}80`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>

                    {/* Profile */}
                    <td className="py-5 pr-6">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{ background: P10, color: P }}>
                          {lead.initials}
                        </div>
                        <div>
                          <p className="font-bold font-heading" style={{ color: OBG }}>{lead.name}</p>
                          <p className="text-xs" style={{ color: `${OSV}80` }}>{lead.since}</p>
                        </div>
                      </div>
                    </td>

                    {/* Intent */}
                    <td className="py-5 pr-6">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: SFCHIGH }}>
                          <div className="h-full rounded-full" style={{ width: `${lead.intent}%`, background: P, opacity: lead.intent >= 80 ? 1 : 0.5 }} />
                        </div>
                        <span className="font-bold text-sm" style={{ color: lead.intent >= 80 ? P : `${P}80` }}>
                          {lead.intent}%
                        </span>
                      </div>
                    </td>

                    {/* Neighborhood */}
                    <td className="py-5 pr-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight border"
                        style={{ background: lead.areaBg, color: lead.areaColor, borderColor: lead.areaBorder }}>
                        {lead.area}
                      </span>
                    </td>

                    {/* Commonality */}
                    <td className="py-5 pr-6">
                      <p className="text-xs font-medium" style={{ color: P }}>{lead.commonality}</p>
                    </td>

                    {/* Days to close */}
                    <td className="py-5 pr-6">
                      <span className="text-xs font-bold" style={{ color: lead.daysColor }}>{lead.daysToClose}</span>
                    </td>

                    {/* Peak window */}
                    <td className="py-5 pr-6">
                      <p className="text-[10px] font-black uppercase tracking-tight" style={{ color: lead.windowColor }}>{lead.window}</p>
                      <p className="text-[10px] italic" style={{ color: `${OSV}70` }}>{lead.windowSub}</p>
                    </td>

                    {/* Action */}
                    <td className="py-5">
                      <button className="transition-colors" style={{ color: OTL }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = P; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = OTL; }}>
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-6 border-t flex justify-center" style={{ borderColor: `${SFCHIGH}60` }}>
            <button className="text-sm font-bold flex items-center gap-2 transition-colors"
              style={{ color: P }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "underline"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "none"; }}>
              View all 12 neighborhood leads <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
