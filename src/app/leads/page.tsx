"use client";

import {
  LayoutDashboard, GitBranch, UserSearch, BarChart3, Sliders, MessageSquare,
  Settings, LogOut, PlusCircle, Bell, BadgeCheck, Download, Search,
  ChevronsUpDown, TrendingUp, TrendingDown, Minus, MapPin, Phone, Eye, Calendar,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ─── palette ─────────────────────────────────────────────────────── */
const P       = "#7C5CFF";
const P5      = "rgba(124,92,255,0.05)";
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
  { icon: LayoutDashboard, label: "Dashboard",    href: "/dashboard", active: false },
  { icon: GitBranch,       label: "Pipeline",     href: "/pipeline",  active: false },
  { icon: UserSearch,      label: "Leads",        href: "/leads",     active: true  },
  { icon: BarChart3,       label: "Insights",     href: "/insights",  active: false },
  { icon: Sliders,         label: "Lead Scoring", href: "/lead-scoring", active: false },
  { icon: MessageSquare,   label: "Messages",     href: "/messages",     active: false },
];

/* ─── leads data ──────────────────────────────────────────────────── */
type Lead = {
  initials: string;
  avatarBg: string;
  avatarText: string;
  name: string;
  email: string;
  score: number;
  trend: "up" | "flat" | "down";
  tier: "hot" | "warm" | "developing" | "early";
  online: boolean;
  badges: { emoji: string; label: string }[];
  inference: string;
  inferenceBg: string;
  inferenceBorder: string;
  inferenceText: string;
  budget: string;
  timeline: string;
  property: string;
  location: string;
  rowBg: string;
  rowHover: string;
  statusColor: string;
  statusLabel: string;
};

const LEADS: Lead[] = [
  {
    initials: "SC", avatarBg: "#b41340", avatarText: "white",
    name: "Sarah Chen", email: "sarah.c@example.com",
    score: 89, trend: "up",
    tier: "hot", online: true,
    badges: [
      { emoji: "💰", label: "Pre-approved buyer" },
      { emoji: "⏰", label: "Urgent Timeline" },
      { emoji: "🏠", label: "Specific Listing Match" },
    ],
    inference: "Pre-approved, Sept deadline, 7 properties viewed",
    inferenceBg: "rgba(238,242,255,0.5)", inferenceBorder: "rgba(199,210,254,0.3)", inferenceText: "#312e81",
    budget: "$750K – $850K", timeline: "This month", property: "Condo", location: "Downtown Lofts",
    rowBg: "rgba(254,226,226,0.2)", rowHover: "rgba(254,226,226,0.4)",
    statusColor: "#b41340", statusLabel: "HOT • ONLINE",
  },
  {
    initials: "MW", avatarBg: "#D97706", avatarText: "white",
    name: "Marcus Wilson", email: "m.wilson@mail.com",
    score: 82, trend: "flat",
    tier: "warm", online: false,
    badges: [
      { emoji: "🏠", label: "Strong Property Focus" },
      { emoji: "🏡", label: "Interested in Single Family" },
    ],
    inference: "Relocating from Chicago, 3-month window, pre-approved",
    inferenceBg: "rgba(255,251,235,0.5)", inferenceBorder: "rgba(253,230,138,0.3)", inferenceText: "#78350f",
    budget: "$600K – $750K", timeline: "3 months", property: "Single Family", location: "Beverly Hills",
    rowBg: "rgba(254,243,199,0.2)", rowHover: "rgba(254,243,199,0.4)",
    statusColor: "#B45309", statusLabel: "WARM • OFFLINE",
  },
  {
    initials: "ER", avatarBg: "#D97706", avatarText: "white",
    name: "Elena Rodriguez", email: "elena.r@agency.com",
    score: 78, trend: "up",
    tier: "warm", online: true,
    badges: [{ emoji: "🔍", label: "Initial Research Phase" }],
    inference: "Interested in coastal properties, 2nd home buyer",
    inferenceBg: "rgba(255,251,235,0.5)", inferenceBorder: "rgba(253,230,138,0.3)", inferenceText: "#78350f",
    budget: "$1.2M – $1.5M", timeline: "6 months", property: "Villa", location: "Malibu Coast",
    rowBg: "rgba(254,243,199,0.2)", rowHover: "rgba(254,243,199,0.4)",
    statusColor: "#B45309", statusLabel: "WARM • ONLINE",
  },
  {
    initials: "JK", avatarBg: "#2563EB", avatarText: "white",
    name: "Jordan King", email: "j.king@provider.com",
    score: 55, trend: "down",
    tier: "developing", online: false,
    badges: [{ emoji: "🔍", label: "Initial Research Phase" }],
    inference: "First-time land buyer, investigating zoning requirements",
    inferenceBg: "rgba(239,246,255,0.5)", inferenceBorder: "rgba(191,219,254,0.3)", inferenceText: "#1e3a8a",
    budget: "$500K – $650K", timeline: "Unknown", property: "Land", location: "Oakland",
    rowBg: "rgba(239,246,255,0.2)", rowHover: "rgba(239,246,255,0.4)",
    statusColor: "#1E40AF", statusLabel: "DEVELOPING",
  },
  {
    initials: "AM", avatarBg: "#d6d3d1", avatarText: "#78716c",
    name: "Alex Miller", email: "a.miller@service.net",
    score: 32, trend: "flat",
    tier: "early", online: false,
    badges: [],
    inference: "Browsing general market trends, no specific search criteria yet",
    inferenceBg: "white", inferenceBorder: "#e7e5e4", inferenceText: "#57534e",
    budget: "Not set", timeline: "Planning", property: "Any", location: "San Francisco",
    rowBg: "rgba(245,245,244,0.3)", rowHover: "rgba(245,245,244,0.5)",
    statusColor: "#78716c", statusLabel: "EARLY STAGE",
  },
];

type Filter = "all" | "hot" | "warm" | "developing" | "early";

const FILTERS: { key: Filter; label: string; activeBg: string; activeText: string; inactiveBg: string; inactiveText: string }[] = [
  { key: "all",        label: "ALL LEADS",      activeBg: "#4f46e5", activeText: "white",   inactiveBg: "#f7f6f1", inactiveText: OTL },
  { key: "hot",        label: "HOT (3)",         activeBg: "#fecaca", activeText: ERR,       inactiveBg: "#fecaca", inactiveText: ERR },
  { key: "warm",       label: "WARM (5)",        activeBg: "#fde68a", activeText: "#92400e", inactiveBg: "#fef3c7", inactiveText: "#92400e" },
  { key: "developing", label: "DEVELOPING (12)", activeBg: "#bfdbfe", activeText: "#1e40af", inactiveBg: "#eff6ff", inactiveText: "#1e40af" },
  { key: "early",      label: "EARLY STAGE (7)", activeBg: "#e7e5e4", activeText: "#57534e", inactiveBg: "#f5f5f4", inactiveText: "#57534e" },
];

const SCORE_COLORS: Record<Lead["tier"], string> = {
  hot: "#b41340", warm: "#D97706", developing: "#2563EB", early: "#a8a29e",
};

export default function LeadsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [timePeriod, setTimePeriod] = useState<"today" | "week" | "month" | "all">("today");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = activeFilter === "all" ? LEADS : LEADS.filter((l) => l.tier === activeFilter);

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
        <div className="mt-8">
          <button className="w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 text-sm font-heading active:scale-[0.98] transition-all text-white"
            style={{ background: P, boxShadow: `0 8px 24px ${P}33` }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
            <PlusCircle className="w-5 h-5" /> New Signal
          </button>
        </div>
        <div className="mt-auto pt-6 border-t space-y-1" style={{ borderColor: SFCH }}>
          <Link href="/settings" className="flex items-center gap-3 px-5 py-3 rounded-full transition-all font-heading text-sm font-bold" style={{ color: OSV }}>
            <Settings className="w-[22px] h-[22px]" /> Settings
          </Link>
          <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-full transition-all font-heading text-sm font-bold" style={{ color: ERR }}>
            <LogOut className="w-[22px] h-[22px]" /> Logout
          </a>
        </div>
      </aside>

      {/* ── TOP NAV ── */}
      <header className="fixed top-0 right-0 left-0 xl:left-72 z-30 flex justify-between items-center px-12 h-20"
        style={{ background: `${BG}cc`, backdropFilter: "blur(12px)" }}>
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: OTL }} />
          <input className="w-full pl-12 pr-4 py-2.5 rounded-full text-sm outline-none transition-all"
            style={{ background: "#f1f1ec", border: "none" }}
            placeholder="Quick Search" type="text"
            onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 2px ${P}33`; }}
            onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }} />
        </div>
        <div className="flex items-center gap-6">
          <button className="p-2 rounded-full transition-colors" style={{ color: OTL }}>
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full transition-colors" style={{ color: OTL }}>
            <Settings className="w-5 h-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Agent Profile" className="w-10 h-10 rounded-full object-cover border-2"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            style={{ borderColor: "#a491ff" }} />
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="xl:ml-72 pt-28 pb-20 px-12 min-h-screen" style={{ background: BG }}>

        {/* Header */}
        <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-heading font-extrabold leading-tight tracking-tight" style={{ fontSize: "3.5rem", color: OBG }}>Leads</h2>
            <p className="text-lg mt-2 max-w-2xl opacity-80" style={{ color: OSV }}>
              Complete list of all website visitors who engaged with your chatbot
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Time filter pills */}
            <div className="flex p-1 rounded-full border" style={{ background: "#f1f1ec", borderColor: `${OTL}33` }}>
              {(["today", "week", "month", "all"] as const).map((t, i) => (
                <button key={t}
                  onClick={() => setTimePeriod(t)}
                  className="px-6 py-2 text-sm font-semibold rounded-full transition-all"
                  style={timePeriod === t
                    ? { background: "white", color: OBG, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
                    : { color: OSV }}>
                  {["Today", "This week", "This month", "All time"][i]}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 py-3 px-6 rounded-full font-bold text-sm transition-all active:scale-95"
              style={{ background: OBG, color: "#f7f6f1", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
              <Download className="w-4 h-4" /> Export to CSV
            </button>
          </div>
        </section>

        {/* Filter bar */}
        <section className="bg-white p-6 rounded-2xl mb-8 flex flex-col lg:flex-row gap-6 items-center"
          style={{ boxShadow: "0px 20px 40px rgba(46,47,44,0.04)" }}>
          {/* Search */}
          <div className="relative flex-1 w-full">
            <UserSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: OTL }} />
            <input className="w-full pl-12 pr-4 py-3 rounded-2xl text-sm outline-none"
              style={{ background: "#f1f1ec" }}
              placeholder="Search by name, email, or phone..."
              onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 2px ${P}33`; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }} />
          </div>
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {FILTERS.map((f) => (
              <button key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className="px-5 py-2.5 text-xs font-bold rounded-full uppercase tracking-wider transition-all"
                style={{
                  background: activeFilter === f.key
                    ? (f.key === "all" ? "#4f46e5" : f.activeBg)
                    : f.inactiveBg,
                  color: activeFilter === f.key
                    ? (f.key === "all" ? "white" : f.activeText)
                    : f.inactiveText,
                }}>
                {f.label}
              </button>
            ))}
          </div>
          {/* Sort */}
          <div className="relative w-full lg:w-48">
            <select className="w-full pl-4 pr-10 py-3 rounded-2xl appearance-none text-sm font-semibold cursor-pointer outline-none"
              style={{ background: "#f1f1ec", color: OBG }}>
              <option>Sort by: Intent ↓</option>
              <option>Sort by: Budget ↓</option>
              <option>Sort by: Activity ↓</option>
            </select>
            <ChevronsUpDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: OTL }} />
          </div>
        </section>

        {/* Table */}
        <section className="overflow-x-auto bg-white rounded-3xl border border-stone-100"
          style={{ boxShadow: "0px 20px 40px rgba(46,47,44,0.04)" }}>
          <table className="w-full text-left border-collapse" style={{ minWidth: 1400 }}>
            <thead>
              <tr className="border-b" style={{ borderColor: "#f5f5f4", background: "rgba(250,250,249,0.5)" }}>
                {["Name", "Intent Score", "Status", "Key Inference (AI Summary)", "Budget", "Timeline", "Property", "Location", "Actions"].map((h, i) => (
                  <th key={h} className="px-6 py-6 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: OTL, textAlign: i === 1 || i === 8 ? "center" : "left" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => {
                const TrendIcon = lead.trend === "up" ? TrendingUp : lead.trend === "down" ? TrendingDown : Minus;
                return (
                  <tr key={lead.email}
                    className="transition-colors cursor-pointer"
                    style={{ background: hovered === lead.email ? lead.rowHover : lead.rowBg }}
                    onMouseEnter={() => setHovered(lead.email)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => router.push("/profile")}>

                    {/* Name */}
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{ background: lead.avatarBg, color: lead.avatarText }}>
                          {lead.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold transition-colors" style={{ color: hovered === lead.email ? "#4f46e5" : OBG }}>
                            {lead.name}
                          </span>
                          <span className="text-xs opacity-60" style={{ color: OSV }}>{lead.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Intent Score */}
                    <td className="px-6 py-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xl font-extrabold font-heading" style={{ color: SCORE_COLORS[lead.tier] }}>
                          {lead.score}%
                        </span>
                        <TrendIcon className="w-4 h-4" style={{ color: SCORE_COLORS[lead.tier] }} />
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full inline-block flex-shrink-0 ${lead.online && lead.tier === "hot" ? "animate-pulse" : ""}`}
                          style={{ background: SCORE_COLORS[lead.tier] }} />
                        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: lead.statusColor }}>
                          {lead.statusLabel}
                        </span>
                        {lead.badges.length > 0 && (
                          <div className="flex gap-1 ml-1">
                            {lead.badges.map((b) => (
                              <div key={b.emoji} className="relative group/tip">
                                <span className="text-xs cursor-pointer hover:bg-stone-200/50 px-1 py-0.5 rounded-md transition-colors">
                                  {b.emoji}
                                </span>
                                <div className="invisible group-hover/tip:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-[#2e2f2c] text-white text-[10px] whitespace-nowrap rounded z-10 opacity-0 group-hover/tip:opacity-100 transition-opacity">
                                  {b.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Key Inference */}
                    <td className="px-6 py-6">
                      <p className="text-sm font-medium px-3 py-1.5 rounded-lg border"
                        style={{ background: lead.inferenceBg, borderColor: lead.inferenceBorder, color: lead.inferenceText }}>
                        {lead.inference}
                      </p>
                    </td>

                    {/* Budget */}
                    <td className="px-6 py-6 font-bold" style={{ color: OBG }}>{lead.budget}</td>

                    {/* Timeline */}
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 bg-white border rounded-full text-[11px] font-bold uppercase tracking-tight"
                        style={{ borderColor: "#e7e5e4" }}>
                        {lead.timeline}
                      </span>
                    </td>

                    {/* Property */}
                    <td className="px-6 py-6 text-sm font-medium" style={{ color: OBG }}>{lead.property}</td>

                    {/* Location */}
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-1 text-sm font-medium" style={{ color: OSV }}>
                        <MapPin className="w-4 h-4 opacity-50" />
                        {lead.location}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {[
                          { icon: Phone,         title: "Call",         href: null },
                          { icon: MessageSquare, title: "Chat",         href: null },
                          { icon: Eye,           title: "View Details", href: "/profile" },
                          { icon: Calendar,      title: "Schedule",     href: null },
                        ].map(({ icon: Icon, title, href }) =>
                          href ? (
                            <Link key={title} href={href}
                              title={title}
                              className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-stone-100 shadow-sm transition-all"
                              style={{ color: P }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.color = PDIM;
                                (e.currentTarget as HTMLElement).style.borderColor = "#c7d2fe";
                                (e.currentTarget as HTMLElement).style.background = P5;
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.color = P;
                                (e.currentTarget as HTMLElement).style.borderColor = "#f5f5f4";
                                (e.currentTarget as HTMLElement).style.background = "white";
                              }}>
                              <Icon className="w-4 h-4" />
                            </Link>
                          ) : (
                            <button key={title}
                              title={title}
                              className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-stone-100 shadow-sm transition-all"
                              style={{ color: OSV }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "#4f46e5";
                                (e.currentTarget as HTMLElement).style.borderColor = "#c7d2fe";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.color = OSV;
                                (e.currentTarget as HTMLElement).style.borderColor = "#f5f5f4";
                              }}>
                              <Icon className="w-4 h-4" />
                            </button>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination footer */}
          <footer className="p-8 flex items-center justify-between border-t"
            style={{ borderColor: "#f5f5f4", background: "rgba(250,249,248,0.5)" }}>
            <p className="text-sm font-semibold" style={{ color: OSV }}>Showing 1–20 of 47 leads</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider mr-4" style={{ color: OSV }}>Page 1 of 3</span>
              <button className="p-2.5 bg-white border rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ borderColor: "#e7e5e4", color: OSV }} disabled>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((n) => (
                  <button key={n}
                    className="w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-colors"
                    style={n === 1
                      ? { background: "#4f46e5", color: "white", boxShadow: "0 4px 8px rgba(79,70,229,0.3)" }
                      : { background: "white", border: "1px solid #e7e5e4", color: OSV }}>
                    {n}
                  </button>
                ))}
              </div>
              <button className="p-2.5 bg-white border rounded-xl transition-colors"
                style={{ borderColor: "#e7e5e4", color: OSV }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#4f46e5"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = OSV; }}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
