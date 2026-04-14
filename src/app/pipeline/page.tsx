"use client";

import {
  LayoutDashboard, GitBranch, Users, BarChart3, Sliders, MessageSquare,
  Settings, Plus, Search, Bell, User, MoreHorizontal, Phone, MessageCircle,
  ChevronDown, TrendingDown, Zap,
} from "lucide-react";
import Link from "next/link";

/* ─── palette ─────────────────────────────────────────────────────── */
const P    = "#7C5CFF";
const P5   = "rgba(124,92,255,0.05)";
const P10  = "rgba(124,92,255,0.10)";
const BG   = "#fffdf5";
const OBG  = "#2e2f2c";
const OSV  = "#5b5c58";
const ERR  = "#b41340";

/* ─── side nav ────────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",           href: "/dashboard",         active: false, dot: false },
  { icon: Zap,             label: "Intent Signals",     href: "/intent-signals",    active: false, dot: false },
  { icon: GitBranch,       label: "Pipeline",           href: "/pipeline",          active: true,  dot: false },
  { icon: Users,           label: "Leads",        href: "/leads",     active: false, dot: false },
  { icon: BarChart3,       label: "Insights",     href: "/insights",  active: false, dot: false },
  { icon: Sliders,         label: "Lead Scoring", href: "/lead-scoring", active: false, dot: true  },
  { icon: MessageSquare,   label: "Messages",     href: "/messages",  active: false, dot: false },
  { icon: Settings,        label: "Settings",     href: "#",          active: false, dot: false },
];

/* ─── lead data ────────────────────────────────────────────────────── */
const SECONDARY = [
  {
    id: "marcus", name: "Marcus Thorne", intent: 72,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=112&h=112&fit=crop&crop=face",
  },
  {
    id: "elena", name: "Elena Rodriguez", intent: 68,
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=112&h=112&fit=crop&crop=face",
  },
];

export default function PipelinePage() {
  return (
    <div className="min-h-screen font-body antialiased" style={{ background: BG, color: OBG }}>

      {/* ── TOP NAV ── */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-12 h-20 border-b"
        style={{ background: "rgba(255,253,245,0.85)", backdropFilter: "blur(20px)", borderColor: "rgba(0,0,0,0.05)" }}>
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: P }}>
              <span className="text-white font-black text-lg font-heading">E</span>
            </div>
            <span className="text-xl font-black font-heading tracking-tight" style={{ color: OBG }}>Engagely</span>
          </div>
          <div className="hidden md:flex items-center gap-10 font-heading font-bold text-[13px] uppercase tracking-widest">
            <span className="pb-1 border-b-2 cursor-default" style={{ color: P, borderColor: P }}>Leads</span>
            {["Properties", "Market", "Team"].map((item) => (
              <a key={item} href="#"
                className="transition-colors"
                style={{ color: `${OBG}99` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = P; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${OBG}99`; }}>
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: `${OBG}40` }} />
            <input
              className="pl-10 pr-6 py-2.5 rounded-full w-72 text-sm font-medium border-0 focus:outline-none"
              placeholder="Search curated leads..."
              type="text"
              style={{ background: `${OBG}08`, color: OBG }}
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{ color: `${OBG}70` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${OBG}08`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${OBG}10` }}>
              <User className="w-5 h-5" style={{ color: `${OBG}60` }} />
            </div>
          </div>
        </div>
      </nav>

      {/* ── SIDE NAV ── */}
      <aside className="fixed left-0 top-20 w-72 flex flex-col py-12 px-8 gap-10 z-40 border-r"
        style={{ height: "calc(100vh - 5rem)", background: BG, borderColor: "rgba(0,0,0,0.05)" }}>
        <button
          className="w-full text-white font-heading font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
          style={{ background: OBG, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#111"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = OBG; }}>
          <Plus className="w-5 h-5" /> Add New Lead
        </button>
        <nav className="flex flex-col gap-1">
          {NAV.map(({ icon: Icon, label, href, active, dot }) => (
            <Link key={label} href={href}
              className="flex items-center justify-between px-5 py-3.5 rounded-xl transition-all text-sm font-semibold"
              style={active ? { background: P10, color: P } : { color: `${OBG}60` }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = `${OBG}06`;
                  (e.currentTarget as HTMLElement).style.color = OBG;
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = `${OBG}60`;
                }
              }}>
              <div className="flex items-center gap-4">
                <Icon className="w-5 h-5" />
                {label}
              </div>
              {dot && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ERR }} />}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8 border-t" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Julian Thorne"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[rgba(124,92,255,0.12)]"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=44&h=44&fit=crop&crop=face"
            />
            <div className="flex flex-col">
              <span className="text-[13px] font-bold" style={{ color: OBG }}>Julian Thorne</span>
              <span className="text-[11px] font-medium" style={{ color: `${OBG}50` }}>Senior Curator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="ml-72 pt-28 p-12 min-h-screen">

        {/* Page header */}
        <header className="mb-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-6xl font-heading font-black leading-[1.1] tracking-tight" style={{ color: OBG }}>
                20 High-Intent Leads<br />in Pipeline
              </h1>
              <div className="flex gap-4 mt-8">
                <span className="px-5 py-2.5 font-heading font-extrabold text-xs uppercase tracking-widest rounded-full border"
                  style={{ background: `${ERR}08`, color: ERR, borderColor: `${ERR}18` }}>
                  3 Hot
                </span>
                <span className="px-5 py-2.5 font-heading font-extrabold text-xs uppercase tracking-widest rounded-full border"
                  style={{ background: P5, color: P, borderColor: `${P}18` }}>
                  5 Warm
                </span>
                <span className="px-5 py-2.5 font-heading font-extrabold text-xs uppercase tracking-widest rounded-full"
                  style={{ background: `${OBG}06`, color: OSV }}>
                  12 Developing
                </span>
              </div>
            </div>
          </div>

          {/* Alert banner */}
          <div className="relative overflow-hidden p-8 rounded-2xl flex items-center justify-between text-white"
            style={{ background: P, boxShadow: `0 20px 48px rgba(124,92,255,0.25)` }}>
            <div className="flex items-center gap-6 relative z-10">
              <span className="text-3xl">⚡</span>
              <div>
                <h2 className="text-xl font-heading font-black uppercase tracking-tight">
                  IMMEDIATE ACTION: Sarah Chen
                </h2>
                <p className="opacity-90 font-medium text-sm mt-1">
                  Viewing activity spiked in last 30 mins on Oak Street Listing. 2 other agents viewing profile.
                </p>
              </div>
            </div>
            <button
              className="relative z-10 px-8 py-3 font-black text-xs uppercase tracking-widest rounded-xl transition-all flex-shrink-0"
              style={{ background: "white", color: P }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BG; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
              View Details
            </button>
          </div>
        </header>

        {/* 12-col grid */}
        <div className="grid grid-cols-12 gap-12 items-start">

          {/* ─ Main leads column (8 cols) ─ */}
          <div className="col-span-12 lg:col-span-8 space-y-12">

            {/* Sarah Chen featured card */}
            <div className="bg-white rounded-3xl p-12 border border-black/5"
              style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)" }}>
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Sarah Chen"
                      className="w-28 h-28 rounded-3xl object-cover ring-4 ring-[rgba(124,92,255,0.05)]"
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=112&h=112&fit=crop&crop=face"
                    />
                    <div className="absolute -bottom-2 -right-2 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-md"
                      style={{ background: P }}>
                      Active
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-heading font-black tracking-tight mb-2" style={{ color: OBG }}>
                      Sarah Chen
                    </h3>
                    <p className="font-semibold text-sm flex items-center gap-2" style={{ color: OSV }}>
                      <span className="w-2 h-2 rounded-full inline-block bg-green-500" />
                      Active 4m ago
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-6xl font-heading font-black" style={{ color: P }}>89%</span>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] mt-2" style={{ color: OSV }}>
                    Intent Score
                  </p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-8 mb-10">
                {[
                  { label: "Activity",  value: "7 properties / 48hrs" },
                  { label: "Budget",    value: "$750k \u2013 $850k" },
                  { label: "Timeline",  value: "This month" },
                ].map((item) => (
                  <div key={item.label} className="p-6 rounded-2xl border" style={{ background: `${BG}99`, borderColor: "rgba(0,0,0,0.05)" }}>
                    <span className="text-[11px] font-black uppercase tracking-widest block mb-3" style={{ color: OSV }}>
                      {item.label}
                    </span>
                    <span className="text-xl font-bold" style={{ color: OBG }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-12">
                <div className="px-5 py-2.5 font-bold text-xs rounded-full flex items-center gap-2"
                  style={{ background: P10, color: P }}>
                  <MessageCircle className="w-4 h-4" />
                  AI Agent: 5-message conversation | 89% confidence
                </div>
                <div className="px-5 py-2.5 font-bold text-xs rounded-full border"
                  style={{ background: "white", borderColor: "rgba(0,0,0,0.06)", color: `${OBG}60` }}>
                  Serious Shopper (from 7-property viewing pattern)
                </div>
                <div className="px-5 py-2.5 font-bold text-xs rounded-full border"
                  style={{ background: "white", borderColor: "rgba(0,0,0,0.06)", color: `${OBG}60` }}>
                  Hard Deadline
                </div>
              </div>

              {/* CTA */}
              <button
                className="w-full py-8 rounded-2xl text-white font-heading font-black text-xl uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all"
                style={{ background: ERR, boxShadow: `0 20px 48px rgba(180,19,64,0.25)` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "none"; }}>
                <Phone className="w-7 h-7" />
                Start Call Now
              </button>
            </div>

            {/* Secondary leads grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SECONDARY.map((lead) => (
                <div key={lead.id}
                  className="bg-white p-8 rounded-3xl border transition-all group"
                  style={{ borderColor: "rgba(0,0,0,0.05)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.02)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${P}30`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.05)"; }}>
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={lead.name}
                        className="w-28 h-28 rounded-3xl object-cover"
                        src={lead.avatar}
                      />
                      <div>
                        <h4 className="font-black text-2xl font-heading tracking-tight" style={{ color: OBG }}>
                          {lead.name}
                        </h4>
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-1"
                          style={{ background: P10 }}>
                          <span className="text-sm font-black" style={{ color: P }}>{lead.intent}%</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest"
                            style={{ color: `${P}99` }}>
                            Intent
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="text-black/20 group-hover:text-black/60 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="flex-1 py-4 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all"
                      style={{ background: ERR }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.08)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "none"; }}>
                      Call
                    </button>
                    <button
                      className="flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all"
                      style={{ background: BG, borderColor: "rgba(0,0,0,0.06)", color: OBG }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = P5;
                        (e.currentTarget as HTMLElement).style.color = P;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = BG;
                        (e.currentTarget as HTMLElement).style.color = OBG;
                      }}>
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Show more */}
            <button
              className="w-full py-10 border-2 border-dashed font-black text-lg uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3"
              style={{ borderColor: "rgba(0,0,0,0.10)", color: OBG }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              Show 17 More Leads <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* ─ Intelligence sidebar (4 cols) ─ */}
          <div className="col-span-12 lg:col-span-4 space-y-12">
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-heading font-black tracking-tight" style={{ color: OBG }}>
                  Intelligence
                </h2>
                <span className="px-3 py-1 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded"
                  style={{ background: P }}>
                  AI Extract
                </span>
              </div>
              <div className="space-y-8">

                {/* Inventory Alert */}
                <div className="bg-white p-8 rounded-3xl border border-black/5 relative overflow-hidden"
                  style={{ boxShadow: "0 10px 15px -3px rgba(0,0,0,0.02)" }}>
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: ERR }} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 block" style={{ color: ERR }}>
                    Inventory Alert
                  </span>
                  <h4 className="text-2xl font-heading font-black mb-4 leading-tight" style={{ color: OBG }}>
                    Supply Shortage in 90210
                  </h4>
                  <p className="font-medium leading-relaxed mb-8" style={{ color: OSV }}>
                    Inventory down 12% WoW. Sellers are hesitating. Use the \u2018Market Leverage\u2019 talk track today.
                  </p>
                  <button
                    className="w-full py-4 text-white font-black text-[11px] uppercase tracking-[0.15em] rounded-xl transition-all"
                    style={{ background: OBG }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#111"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = OBG; }}>
                    Generate Talk Track
                  </button>
                </div>

                {/* Rate Prediction */}
                <div className="p-8 rounded-3xl text-white"
                  style={{ background: P, boxShadow: `0 20px 48px rgba(124,92,255,0.25)` }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.2)" }}>
                      <TrendingDown className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-xl font-heading font-black uppercase tracking-tight">Rate Prediction</h4>
                  </div>
                  <p className="opacity-80 font-medium leading-relaxed mb-8">
                    Fed signals suggest a 0.25% dip. 8 leads in your pipeline are \u2018Rate Sensitive\u2019.
                  </p>
                  <button
                    className="w-full py-4 font-black text-[11px] uppercase tracking-[0.15em] rounded-xl transition-all"
                    style={{ background: "white", color: P }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                    Generate Talk Track
                  </button>
                </div>

              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}
