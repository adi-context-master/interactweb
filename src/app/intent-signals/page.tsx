"use client";

import React, { useState } from "react";
import {
  LayoutDashboard, GitBranch, UserSearch, BarChart3, Sliders, MessageSquare,
  Settings, LogOut, BadgeCheck, PlusCircle,
  Zap, ShoppingCart, CreditCard, Clock, MapPin,
  TrendingUp, Filter, Download, RefreshCw, ChevronRight,
  Eye, Phone, MessageCircle,
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
const SFCH   = "#e3e3dd";
const SFC    = "#e9e8e3";
const OBG    = "#2e2f2c";
const OSV    = "#5b5c58";
const ERR    = "#b41340";

const sideActive = { background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", color: P };

/* ─── nav ─────────────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",       href: "/dashboard",      active: false },
  { icon: Zap,             label: "Intent Signals",  href: "/intent-signals", active: true  },
  { icon: GitBranch,       label: "Pipeline",        href: "/pipeline",       active: false },
  { icon: UserSearch,      label: "Leads",           href: "/leads",          active: false },
  { icon: BarChart3,       label: "Insights",        href: "/insights",       active: false },
  { icon: Sliders,         label: "Lead Scoring",    href: "/lead-scoring",   active: false },
  { icon: MessageSquare,   label: "Messages",        href: "/messages",       active: false },
];

/* ─── signal type data ─────────────────────────────────────────────── */
const SIGNAL_TYPES = [
  { label: "Shopping",  pct: 38, color: P,      count: 18, icon: ShoppingCart },
  { label: "Financial", pct: 26, color: "#10b981", count: 12, icon: CreditCard  },
  { label: "Urgency",   pct: 21, color: "#f59e0b", count: 10, icon: Clock       },
  { label: "Location",  pct: 15, color: "#3b82f6", count:  7, icon: MapPin      },
];

/* ─── detection timeline (6 hours × 4 rows of signal types) ────────── */
// Rows: Shopping, Financial, Urgency, Location. Cols: 24 half-hour buckets
const HOURS = Array.from({ length: 24 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? "00" : "30";
  return `${h.toString().padStart(2, "0")}:${m}`;
});

// Intensity 0-3 per cell (0=none, 1=low, 2=mid, 3=high)
const TIMELINE_DATA: number[][] = [
  // Shopping
  [0,0,0,0,0,0,0,1,1,2,3,3, 2,2,3,3,2,1,1,0,0,0,0,0],
  // Financial
  [0,0,0,0,0,0,0,0,1,1,2,2, 3,3,2,2,1,1,0,0,0,0,0,0],
  // Urgency
  [0,0,0,0,0,0,0,0,0,1,2,3, 3,3,3,2,1,0,0,0,0,0,0,0],
  // Location
  [0,0,0,0,0,0,0,0,1,1,1,2, 2,2,1,1,0,0,0,0,0,0,0,0],
];

const INTENSITY_COLORS = [
  "rgba(0,0,0,0.04)",        // 0: none
  "rgba(124,92,255,0.18)",   // 1: low
  "rgba(124,92,255,0.50)",   // 2: mid
  "rgba(124,92,255,0.90)",   // 3: high
];

/* ─── recent signals ───────────────────────────────────────────────── */
const RECENT_SIGNALS = [
  {
    initials: "SC", name: "Sarah Chen", time: "2 min ago",
    signals: [
      { type: "Shopping", icon: ShoppingCart, color: P,         detail: "Viewed 6 properties in Marina District" },
      { type: "Financial",icon: CreditCard,   color: "#10b981", detail: "Asked about pre-approval timeline" },
    ],
    score: 94, badge: "HOT", badgeColor: ERR,
  },
  {
    initials: "MW", name: "Marcus Wilson", time: "18 min ago",
    signals: [
      { type: "Urgency",  icon: Clock,        color: "#f59e0b", detail: "Mentioned lease ending in 45 days" },
      { type: "Location", icon: MapPin,        color: "#3b82f6", detail: "Focused on SOMA and Mission only" },
    ],
    score: 78, badge: "WARM", badgeColor: "#f59e0b",
  },
  {
    initials: "ER", name: "Elena Rodriguez", time: "41 min ago",
    signals: [
      { type: "Shopping", icon: ShoppingCart, color: P,         detail: "Saved 4 listings to shortlist" },
    ],
    score: 65, badge: "WARM", badgeColor: "#f59e0b",
  },
];

/* ─── helper components ────────────────────────────────────────────── */
function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
      style={{ background: `linear-gradient(135deg, ${P} 0%, ${PDIM} 100%)` }}>
      {initials}
    </div>
  );
}

export default function IntentSignalsPage() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");

  return (
    <div className="min-h-screen font-body antialiased" style={{ background: BG, color: OBG }}>

      {/* ── SIDEBAR ── */}
      <aside className="hidden xl:flex h-screen w-72 fixed left-0 top-0 flex-col p-8 gap-2 z-40 border-r"
        style={{ background: SFCL, borderColor: SFC }}>

        {/* logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: P }}>
            <span className="text-white font-black text-sm">E</span>
          </div>
          <span className="font-black text-lg tracking-tight" style={{ color: OBG }}>Engagely</span>
        </div>

        {/* nav items */}
        {NAV.map(({ icon: Icon, label, href, active }) => (
          <Link key={label} href={href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
            style={active ? sideActive : { color: OSV }}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </Link>
        ))}

        <div className="mt-auto flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold"
            style={{ color: OSV }}>
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold"
            style={{ color: OSV }}>
            <LogOut className="w-4 h-4" /> Log out
          </button>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl mt-2"
            style={{ background: P10 }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: P }}>JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: OBG }}>Jordan Davis</p>
              <p className="text-xs truncate" style={{ color: OSV }}>Senior Agent</p>
            </div>
            <BadgeCheck className="w-4 h-4 flex-shrink-0" style={{ color: P }} />
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="xl:pl-72">
        <div className="max-w-6xl mx-auto px-8 py-10">

          {/* ── PAGE HEADER ── */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: P10 }}>
                  <Zap className="w-5 h-5" style={{ color: P }} />
                </div>
                <h1 className="text-2xl font-black tracking-tight" style={{ color: OBG }}>
                  Intent Signals
                </h1>
              </div>
              <p className="text-sm ml-12" style={{ color: OSV }}>
                Real-time buyer intent detected across all active conversations
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* time range toggle */}
              <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: SFC }}>
                {(["24h", "7d", "30d"] as const).map(r => (
                  <button key={r} onClick={() => setTimeRange(r)}
                    className="px-4 py-2 text-xs font-bold transition-all"
                    style={timeRange === r
                      ? { background: P, color: "white" }
                      : { background: "white", color: OSV }}>
                    {r}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all"
                style={{ background: "white", borderColor: SFC, color: OSV }}>
                <Filter className="w-3.5 h-3.5" /> Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all"
                style={{ background: "white", borderColor: SFC, color: OSV }}>
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
          </div>

          {/* ── 4 SIGNAL COUNT CARDS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {SIGNAL_TYPES.map(({ label, count, icon: Icon, color }) => (
              <div key={label} className="rounded-2xl p-5 flex items-center gap-4"
                style={{ background: "white", border: `1px solid ${SFC}` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}18` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-2xl font-black" style={{ color: OBG }}>{count}</p>
                  <p className="text-xs font-semibold" style={{ color: OSV }}>{label} signals</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── SIGNAL DISTRIBUTION + PEAK HOUR ── */}
          <div className="grid grid-cols-3 gap-6 mb-8">

            {/* stacked bar distribution — 2/3 width */}
            <div className="col-span-2 rounded-2xl p-6"
              style={{ background: "white", border: `1px solid ${SFC}` }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold" style={{ color: OBG }}>Signal Type Distribution</h2>
                <span className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: P10, color: P }}>Last {timeRange}</span>
              </div>

              {/* stacked bar */}
              <div className="flex h-10 rounded-xl overflow-hidden mb-5 gap-0.5">
                {SIGNAL_TYPES.map(({ label, pct, color }) => (
                  <div key={label} className="flex items-center justify-center text-white text-xs font-bold transition-all"
                    style={{ width: `${pct}%`, background: color }}>
                    {pct >= 20 ? `${pct}%` : ""}
                  </div>
                ))}
              </div>

              {/* legend + detail rows */}
              <div className="space-y-3">
                {SIGNAL_TYPES.map(({ label, pct, color, count, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: color }} />
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
                    <span className="text-xs font-semibold flex-1" style={{ color: OBG }}>{label}</span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: SFCH }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                    </div>
                    <span className="text-xs font-bold w-8 text-right" style={{ color: OBG }}>{pct}%</span>
                    <span className="text-xs w-16 text-right" style={{ color: OSV }}>{count} signals</span>
                  </div>
                ))}
              </div>
            </div>

            {/* peak signal hour card — 1/3 width */}
            <div className="rounded-2xl p-6 flex flex-col justify-between"
              style={{ background: `linear-gradient(135deg, ${P} 0%, ${PDIM} 100%)`, color: "white" }}>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 opacity-80" />
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">Peak Signal Hour</span>
                </div>
                <p className="text-4xl font-black tracking-tight mb-1">2:00–</p>
                <p className="text-4xl font-black tracking-tight mb-4">4:00 PM</p>
                <p className="text-xs opacity-70 leading-relaxed">
                  Highest buyer intent concentration during afternoon window. Ideal for proactive outreach.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs opacity-60 mb-0.5">Avg signals/hr</p>
                  <p className="text-lg font-black">11.8</p>
                </div>
                <div>
                  <p className="text-xs opacity-60 mb-0.5">Conversion lift</p>
                  <p className="text-lg font-black">+34%</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── DETECTION TIMELINE ── */}
          <div className="rounded-2xl p-6 mb-8"
            style={{ background: "white", border: `1px solid ${SFC}` }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-bold" style={{ color: OBG }}>Detection Timeline</h2>
                <p className="text-xs mt-0.5" style={{ color: OSV }}>Signal intensity by type over the last 24 hours</p>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: OSV }}>
                <RefreshCw className="w-3 h-3" /> Live
                <span className="w-1.5 h-1.5 rounded-full animate-pulse ml-0.5"
                  style={{ background: "#10b981", display: "inline-block" }} />
              </button>
            </div>

            {/* grid */}
            <div className="overflow-x-auto">
              <div style={{ minWidth: 640 }}>
                {/* hour labels */}
                <div className="flex mb-2 ml-24">
                  {HOURS.filter((_, i) => i % 4 === 0).map(h => (
                    <div key={h} className="text-xs flex-1 text-center" style={{ color: OSV }}>{h}</div>
                  ))}
                </div>
                {/* rows */}
                {TIMELINE_DATA.map((row, ri) => {
                  const sig = SIGNAL_TYPES[ri];
                  return (
                    <div key={sig.label} className="flex items-center gap-3 mb-1.5">
                      <div className="w-20 flex items-center gap-1.5 flex-shrink-0">
                        <sig.icon className="w-3 h-3 flex-shrink-0" style={{ color: sig.color }} />
                        <span className="text-xs font-semibold" style={{ color: OSV }}>{sig.label}</span>
                      </div>
                      <div className="flex gap-0.5 flex-1">
                        {row.map((intensity, ci) => (
                          <div key={ci}
                            className="flex-1 h-7 rounded-sm transition-all cursor-pointer hover:opacity-80"
                            style={{ background: intensity > 0
                              ? INTENSITY_COLORS[intensity].replace("124,92,255",
                                  sig.color === P ? "124,92,255" :
                                  sig.color === "#10b981" ? "16,185,129" :
                                  sig.color === "#f59e0b" ? "245,158,11" : "59,130,246")
                              : INTENSITY_COLORS[0]
                            }}
                            title={`${sig.label} at ${HOURS[ci]}: ${["none","low","medium","high"][intensity]}`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
                {/* intensity legend */}
                <div className="flex items-center gap-3 mt-3 ml-24">
                  <span className="text-xs" style={{ color: OSV }}>Intensity:</span>
                  {["None", "Low", "Medium", "High"].map((lbl, i) => (
                    <div key={lbl} className="flex items-center gap-1">
                      <div className="w-4 h-3 rounded-sm" style={{ background: INTENSITY_COLORS[i] }} />
                      <span className="text-xs" style={{ color: OSV }}>{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RECENT SIGNALS ── */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "white", border: `1px solid ${SFC}` }}>
            <div className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: SFC }}>
              <h2 className="text-sm font-bold" style={{ color: OBG }}>Recent Signals</h2>
              <Link href="/leads"
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: P }}>
                View all leads <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y" style={{ borderColor: SFC }}>
              {RECENT_SIGNALS.map(({ initials, name, time, signals, score, badge, badgeColor }) => (
                <div key={name} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <Avatar initials={initials} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold" style={{ color: OBG }}>{name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{ background: `${badgeColor}18`, color: badgeColor }}>
                        {badge}
                      </span>
                      <span className="text-xs ml-auto" style={{ color: OSV }}>{time}</span>
                    </div>

                    <div className="space-y-1.5">
                      {signals.map(({ type, icon: Icon, color, detail }) => (
                        <div key={type} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${color}18` }}>
                            <Icon className="w-3 h-3" style={{ color }} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold mr-1" style={{ color }}>{type}</span>
                            <span className="text-xs" style={{ color: OSV }}>{detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* score */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="text-sm font-black" style={{ color: OBG }}>{score}</div>
                    <div className="text-xs" style={{ color: OSV }}>score</div>
                    <div className="flex gap-1">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all hover:border-purple-400"
                        style={{ borderColor: SFC }}>
                        <Eye className="w-3.5 h-3.5" style={{ color: OSV }} />
                      </button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all hover:border-purple-400"
                        style={{ borderColor: SFC }}>
                        <MessageCircle className="w-3.5 h-3.5" style={{ color: OSV }} />
                      </button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all hover:border-purple-400"
                        style={{ borderColor: SFC }}>
                        <Phone className="w-3.5 h-3.5" style={{ color: OSV }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* footer */}
            <div className="px-6 py-3 flex items-center justify-between border-t"
              style={{ borderColor: SFC, background: SFCL }}>
              <span className="text-xs" style={{ color: OSV }}>
                Showing 3 of 47 signals in the last {timeRange}
              </span>
              <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                style={{ background: P10, color: P }}>
                Load more <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
