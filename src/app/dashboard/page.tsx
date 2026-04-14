"use client";

import React from "react";
import {
  LayoutDashboard, GitBranch, Users, BarChart3, Sliders, MessageSquare,
  Settings, LogOut, PlusCircle, Search, Bell, ChevronDown, Download,
  ShoppingCart, TrendingUp, Building2, AlertTriangle, Clock, Zap, MapPin,
  Map, Send, Calendar, Brain, Megaphone, LineChart as LineChartIcon,
  ShieldCheck, ChevronRight, Mail, Edit, BadgeCheck, Phone, MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

/* ─── palette tokens ─────────────────────────────────────────────── */
const P = "#7C5CFF";           // primary purple
const P10 = "rgba(124,92,255,0.10)";
const P5  = "rgba(124,92,255,0.05)";
const PDIM = "#6647e6";
const BG   = "#fffdf5";
const SFC  = "#f5f3eb";        // surface-container
const SFCL = "#faf8f0";        // surface-container-low
const SFCH = "#efede6";        // surface-container-high
const SFCHX = "#e8e5dc";       // surface-container-highest
const OBG  = "#1c1c1a";        // on-background
const OSV  = "#6b6c67";        // on-surface-variant
const OTL  = "#7a776e";        // outline
const OTLv = "#c9c7be";        // outline-variant
const ERR  = "#ba1a1a";
const SEC  = "#2d2e32";        // secondary (dark)

const editShadow = { boxShadow: "0px 12px 32px rgba(28,28,26,0.04)" };
const sideActive = { background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", color: P };

/* ─── nav items ──────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",           active: true },
  { icon: Zap,             label: "Intent Signals",     href: "/intent-signals",    active: false },
  { icon: GitBranch,       label: "Pipeline",           href: "/pipeline",          active: false },
  { icon: Users,           label: "Leads",        href: "/leads",     active: false },
  { icon: BarChart3,       label: "Insights",     href: "/insights",  active: false },
  { icon: Sliders,         label: "Lead Scoring", active: false },
  { icon: MessageSquare,   label: "Messages",     href: "/messages",  active: false },
];

/* ─── discovery cards ───────────────────────────────────────────── */
const DISCOVERIES = [
  {
    icon: ShoppingCart,
    count: "08",
    title: "Shopping Behavior",
    href: "/shopping-behavior",
    desc: "Users are deeply comparing specific mortgage structures over property features.",
    badge: { icon: TrendingUp, label: "Trending Up (14%)", color: P },
  },
  {
    icon: Building2,
    count: "06",
    title: "Financial Readiness",
    href: "/financial-readiness",
    desc: "High volume of queries regarding down-payment assistance programs this morning.",
    badge: { icon: AlertTriangle, label: "High Impact Priority", color: ERR },
  },
  {
    icon: Clock,
    count: "04",
    title: "Time Urgency",
    href: "#",
    desc: "Identified 4 leads with strict 30-day relocation timelines from out of state.",
    badge: { icon: Zap, label: "Urgent Segment", color: OSV },
  },
  {
    icon: MapPin,
    count: "12",
    title: "Location Specific",
    href: "/location-specific",
    desc: "South Bay interest has increased significantly. Focus content on school districts there.",
    badge: { icon: Map, label: "Cluster Detected", color: OSV },
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen font-body antialiased" style={{ background: BG, color: OBG, letterSpacing: "-0.01em" }}>

      {/* ── LEFT SIDEBAR ── */}
      <aside className="hidden xl:flex h-screen w-72 fixed left-0 top-0 flex-col p-8 gap-2 z-40 border-r"
        style={{ background: SFCL, borderColor: SFC }}>

        <div className="mb-10 px-2">
          <span className="font-heading font-extrabold text-2xl tracking-tighter" style={{ color: OBG }}>Engagely AI</span>
        </div>

        {/* Enterprise tier badge */}
        <div className="mb-8 px-4 py-3 rounded-2xl border" style={{ background: P5, borderColor: `${P}1a` }}>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: P }}>Account Level</p>
          <p className="text-sm font-bold flex items-center gap-2" style={{ color: OBG }}>
            Enterprise Tier <BadgeCheck className="w-3.5 h-3.5" style={{ color: P }} />
          </p>
        </div>

        {/* Nav */}
        <nav className="space-y-1.5">
          {NAV.map(({ icon: Icon, label, href, active }: { icon: React.ElementType; label: string; href?: string; active: boolean }) => (
            <Link
              key={label}
              href={href ?? "#"}
              className="flex items-center gap-3 px-5 py-3.5 rounded-full transition-all text-sm font-bold font-heading"
              style={active ? sideActive : { color: OSV }}
              onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = SFCH; }}
              onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <Icon className="w-[22px] h-[22px]" />
              {label}
            </Link>
          ))}
        </nav>

        {/* New Signal CTA */}
        <div className="mt-8">
          <button
            className="w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 text-sm font-heading active:scale-[0.98] transition-all"
            style={{ background: P, color: "white", boxShadow: `0 8px 24px ${P}33` }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}
          >
            <PlusCircle className="w-5 h-5" />
            New Signal
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 space-y-1 border-t" style={{ borderColor: SFCH }}>
          <Link href="/settings"
            className="flex items-center gap-3 px-5 py-3 rounded-full transition-all font-heading text-sm font-bold"
            style={{ color: OSV }}>
            <Settings className="w-[22px] h-[22px]" /> Settings
          </Link>
          <a href="#"
            className="flex items-center gap-3 px-5 py-3 rounded-full transition-all font-heading text-sm font-bold"
            style={{ color: ERR }}>
            <LogOut className="w-[22px] h-[22px]" /> Logout
          </a>
        </div>
      </aside>

      {/* ── TOP NAV ── */}
      <nav className="fixed top-0 right-0 left-0 xl:left-72 z-30 flex justify-between items-center px-12 h-20"
        style={{ background: `${BG}cc`, backdropFilter: "blur(12px)" }}>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: OTL }} />
          <input
            className="pl-11 pr-4 py-2.5 text-sm w-full rounded-full outline-none transition-all"
            style={{ background: SFCL, border: `1px solid ${SFCH}` }}
            placeholder="Search leads or signals..."
            type="text"
            onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 2px ${P}33`; e.currentTarget.style.borderColor = `${P}4d`; }}
            onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = SFCH; }}
          />
        </div>
        <div className="flex items-center gap-6">
          <button className="p-2 rounded-full transition-colors" style={{ color: OSV }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFC; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l" style={{ borderColor: SFCH }}>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none mb-0.5">Alex Rivers</p>
              <p className="text-[10px] font-bold uppercase tracking-wider leading-none" style={{ color: OTL }}>Admin</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Alex Rivers"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
              style={editShadow}
            />
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="xl:ml-72 pt-28 pb-20 px-12 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* ── CENTER COLUMN ── */}
          <div className="lg:col-span-8 space-y-14">

            {/* Hero header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-heading text-5xl font-extrabold tracking-tight mb-3" style={{ color: OBG }}>Dashboard</h1>
                <p className="text-lg leading-relaxed max-w-lg" style={{ color: OSV }}>
                  Advanced insights from your chatbot&apos;s interactions during the last 24 hours.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="bg-white border px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-colors"
                  style={{ borderColor: SFCH, ...editShadow }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SFCL; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
                  Last 24 Hours <ChevronDown className="w-[18px] h-[18px]" />
                </button>
                <button className="px-7 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all active:scale-95 text-white"
                  style={{ background: P, boxShadow: `0 8px 24px ${P}33` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PDIM; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = P; }}>
                  <Download className="w-[18px] h-[18px]" /> Export
                </button>
              </div>
            </header>

            {/* Stats bar */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Conversations", value: "12", suffix: "", badge: "+20%", bColor: P, bBg: P10 },
                { label: "Avg Duration",  value: "5.2", suffix: "min", badge: null },
                { label: "Contact Info",  value: "100%", suffix: "", badge: null },
                { label: "Intent Signals", value: "47", suffix: "", badge: null, purple: true },
              ].map((s) => (
                <div key={s.label} className="p-7 rounded-2xl border"
                  style={s.purple
                    ? { background: P, borderColor: "transparent", boxShadow: `0 8px 20px ${P}1a` }
                    : { background: "white", borderColor: SFCH, ...editShadow }}>
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest mb-3"
                    style={{ color: s.purple ? "rgba(255,255,255,0.7)" : OTL }}>
                    {s.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-extrabold"
                      style={{ color: s.purple ? "white" : OBG }}>
                      {s.value}
                    </span>
                    {s.suffix && <span className="text-sm font-medium" style={{ color: OTL }}>{s.suffix}</span>}
                    {s.badge && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ color: s.bColor!, background: s.bBg! }}>
                        {s.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </section>

            {/* What Your AI Discovered */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-heading text-2xl font-bold">What Your AI Discovered</h2>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider" style={{ color: P }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: P }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: P }} />
                  </span>
                  Live Inference
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {DISCOVERIES.map((d) => {
                  const Icon = d.icon;
                  const BadgeIcon = d.badge.icon;
                  return (
                    <Link key={d.title} href={d.href}
                      className="block bg-white p-8 rounded-2xl border transition-all group"
                      style={{ borderColor: SFCH, ...editShadow }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${P}4d`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = SFCH; }}>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: P5, color: P }}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-4xl font-heading font-extrabold leading-none" style={{ color: `${SFCHX}99` }}>
                          {d.count}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-3">{d.title}</h3>
                      <p className="text-sm mb-6 leading-relaxed" style={{ color: OSV }}>{d.desc}</p>
                      <div className="flex items-center gap-2 text-xs font-bold" style={{ color: d.badge.color }}>
                        <BadgeIcon className="w-4 h-4" /> {d.badge.label}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Intent Changes Today */}
            <section className="space-y-8">
              <h2 className="font-heading text-2xl font-bold">Intent Changes Today</h2>

              {/* Live notification */}
              <div className="p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between text-white shadow-xl relative overflow-hidden"
                style={{ background: SEC }}>
                <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border-2 border-white/20 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt="Sarah Chen"
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 rounded-full" style={{ borderColor: SEC }} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg">Sarah Chen is active now</h4>
                    <p className="text-sm text-white/70">Asking about property tax history on Listing #4492</p>
                  </div>
                </div>
                <button
                  className="mt-4 md:mt-0 bg-white px-8 py-3 rounded-full font-bold text-sm relative z-10 active:scale-95 transition-all"
                  style={{ color: SEC }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.9)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
                  Take Over Chat
                </button>
              </div>

              {/* Intent cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Biggest Gainer */}
                <div className="bg-white p-9 rounded-2xl border-t-4" style={{ borderTopColor: P, ...editShadow }}>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase" style={{ color: P }}>Biggest Gainer</span>
                    <span className="font-heading text-3xl font-extrabold" style={{ color: P }}>89%</span>
                  </div>
                  <h4 className="font-heading text-2xl font-bold mb-2">Sarah Chen</h4>
                  <p className="text-sm mb-6 leading-relaxed italic" style={{ color: OSV }}>
                    &ldquo;Transitioned from general browsing to transactional intent after reviewing financial disclosure documents.&rdquo;
                  </p>
                  <div className="p-5 rounded-2xl text-sm italic border" style={{ background: SFCL, borderColor: SFC }}>
                    &ldquo;This tax breakdown makes the monthly payment feel much more manageable for us.&rdquo;
                  </div>
                </div>
                {/* Stable High Performer */}
                <div className="bg-white p-9 rounded-2xl border-t-4" style={{ borderTopColor: SEC, ...editShadow }}>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase" style={{ color: OTL }}>Stable High Performer</span>
                    <span className="font-heading text-3xl font-extrabold" style={{ color: OBG }}>82%</span>
                  </div>
                  <h4 className="font-heading text-2xl font-bold mb-2">Marcus Wilson</h4>
                  <p className="text-sm mb-6 leading-relaxed italic" style={{ color: OSV }}>
                    &ldquo;Consistently engaging with high-value luxury listings. Ready for a walkthrough.&rdquo;
                  </p>
                  <div className="p-5 rounded-2xl text-sm italic border" style={{ background: SFCL, borderColor: SFC }}>
                    &ldquo;Can we schedule a private viewing for this Saturday around 11:00 AM?&rdquo;
                  </div>
                </div>
              </div>
            </section>

            {/* Hottest Leads */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="font-heading text-2xl font-bold">Your Hottest Leads</h2>
                <a href="#" className="text-sm font-bold hover:underline" style={{ color: P }}>View All Leads</a>
              </div>
              <div className="space-y-4">
                {/* Sarah Chen */}
                <div className="bg-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border transition-all"
                  style={{ borderColor: SFCH, ...editShadow }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = P; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = SFCH; }}>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-[rgba(124,92,255,0.05)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Sarah Chen" className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-lg">Sarah Chen</h5>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                          style={{ background: P10, color: P }}>Ready to Buy</span>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-green-100 text-green-700">Active Now</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 max-w-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: OTL }}>Last Inference</p>
                    <p className="text-sm italic truncate" style={{ color: OSV }}>
                      &ldquo;The school district ratings are my main priority for this zip code...&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1" style={{ color: OTL }}>Score</p>
                      <p className="text-3xl font-heading font-extrabold" style={{ color: P }}>89%</p>
                    </div>
                    <button className="h-12 w-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-105"
                      style={{ background: P, boxShadow: `0 8px 20px ${P}33` }}>
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Marcus Wilson */}
                <div className="bg-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border transition-all"
                  style={{ borderColor: SFCH, ...editShadow }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = P; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = SFCH; }}>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-black/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Marcus Wilson" className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-lg">Marcus Wilson</h5>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                          style={{ background: `${SEC}1a`, color: SEC }}>Luxury Tier</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 max-w-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: OTL }}>Last Inference</p>
                    <p className="text-sm italic truncate" style={{ color: OSV }}>
                      &ldquo;Is the wine cellar climate controlled or just insulated?&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1" style={{ color: OTL }}>Score</p>
                      <p className="text-3xl font-heading font-extrabold" style={{ color: OBG }}>82%</p>
                    </div>
                    <button className="h-12 w-12 rounded-full flex items-center justify-center transition-all hover:scale-105"
                      style={{ background: SFCH, color: OBG }}>
                      <Calendar className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="lg:col-span-4 space-y-10">

            {/* Pipeline by Intent */}
            <section className="bg-white p-9 rounded-2xl border" style={{ borderColor: SFCH, ...editShadow }}>
              <h3 className="font-heading text-xl font-bold mb-8">Pipeline by Intent</h3>
              <div className="space-y-8">
                {[
                  { label: "Hot Leads",   count: "3 Active",  pct: 25,  barColor: P,          textColor: P },
                  { label: "Warm Leads",  count: "5 Active",  pct: 42,  barColor: `${P}66`,   textColor: P },
                  { label: "Developing",  count: "12 Total",  pct: 80,  barColor: `${OTL}33`, textColor: OTL },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-3">
                      <span style={{ color: row.textColor === OTL ? OTL : OBG }}>{row.label}</span>
                      <span style={{ color: row.textColor }}>{row.count}</span>
                    </div>
                    <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: SFC }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${row.pct}%`, background: row.barColor }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Model Performance */}
            <section className="bg-white p-9 rounded-2xl border" style={{ borderColor: SFCH, ...editShadow }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: P10, color: P }}>
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold">Model Performance</h3>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: OTL }}>Confidence</p>
                  <p className="text-2xl font-heading font-extrabold" style={{ color: OBG }}>87%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: OTL }}>Accuracy</p>
                  <p className="text-2xl font-heading font-extrabold" style={{ color: OBG }}>73%</p>
                </div>
                <div className="col-span-2 pt-6 border-t" style={{ borderColor: SFCH }}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium" style={{ color: OSV }}>Signal Relevance</p>
                    <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ color: P, background: P5 }}>+25% vs LW</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Market Insights */}
            <section className="bg-white p-9 rounded-2xl border" style={{ borderColor: SFCH, ...editShadow }}>
              <h3 className="font-heading text-lg font-bold mb-8">Market Insights</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Megaphone,
                    iconColor: ERR,
                    label: "Inventory Alert",
                    desc: "South Bay supply dropped by 8%. Leads are feeling \u201clisting fatigue\u201d.",
                  },
                  {
                    icon: LineChartIcon,
                    iconColor: P,
                    label: "Rate Prediction",
                    desc: "Federal signals suggest a 0.25% drop. Mention this to 12 warm leads.",
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.label} className="p-5 rounded-2xl border" style={{ background: SFCL, borderColor: SFC }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-[18px] h-[18px]" style={{ color: card.iconColor }} />
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: OBG }}>{card.label}</p>
                      </div>
                      <p className="text-sm mb-4 leading-relaxed" style={{ color: OSV }}>{card.desc}</p>
                      <button
                        className="w-full py-2.5 bg-white border rounded-full text-xs font-bold transition-colors"
                        style={{ borderColor: SFCH, color: P }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = P5; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
                        Get Talk Track
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Next Best Actions */}
            <section className="p-9 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl"
              style={{ background: P, boxShadow: `0 24px 48px ${P}4d` }}>
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />
              <h3 className="font-heading text-xl font-bold mb-6 relative z-10">Next Best Actions</h3>
              <ul className="space-y-6 relative z-10">
                {[
                  { icon: AlertTriangle, text: "Call Sarah Chen regarding the property tax breakdown" },
                  { icon: Mail,          text: "Send luxury brochure update to Marcus Wilson" },
                  { icon: Edit,          text: "Update South Bay templates for inventory lows" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-4">
                    <span className="bg-white/20 p-1 rounded-lg flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <p className="text-sm font-medium leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* ── SYSTEM HEALTH FOOTER ── */}
          <section className="lg:col-span-12 mt-4">
            <div className="w-full p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer transition-all group"
              style={{ background: `${SFCH}66`, borderColor: SFCH }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${SFCH}99`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${SFCH}66`; }}>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm" style={{ color: P }}>
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">System Health Status</h4>
                  <p className="text-sm" style={{ color: OSV }}>Active across 4 channels with 99.9% uptime</p>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div className="hidden sm:flex gap-10">
                  {[
                    { label: "Latency",       value: "142ms" },
                    { label: "Hallucination", value: "0.02%" },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: OTL }}>{m.label}</p>
                      <p className="font-heading font-bold" style={{ color: OBG }}>{m.value}</p>
                    </div>
                  ))}
                </div>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" style={{ color: OTL }} />
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
