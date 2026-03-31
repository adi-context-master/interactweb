"use client";

import { ArrowRight } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import { useState, useEffect } from "react";
import Link from "next/link";

function ShapeConfetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Circles */}
      <div className="absolute top-16 left-[8%] w-16 h-16 rounded-full bg-tertiary/30 animate-float" />
      <div className="absolute top-40 right-[12%] w-10 h-10 rounded-full bg-secondary/30 animate-float-slow" />
      <div className="absolute bottom-32 left-[15%] w-8 h-8 rounded-full bg-quaternary/40 animate-float" />
      {/* Triangles */}
      <div className="absolute top-24 right-[25%] w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[24px] border-b-accent/25 animate-float-slow" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-20 right-[10%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-tertiary/30 animate-float" style={{ animationDelay: "1s" }} />
      {/* Squares */}
      <div className="absolute top-60 left-[5%] w-6 h-6 bg-secondary/20 rotate-12 rounded-sm animate-float" style={{ animationDelay: "0.3s" }} />
      <div className="absolute bottom-40 right-[30%] w-8 h-8 bg-accent/15 rotate-45 rounded-sm animate-float-slow" />
      {/* Squiggle SVG */}
      <svg className="absolute top-[45%] left-[3%] w-24 h-8 opacity-20" viewBox="0 0 100 20"><path d="M0,10 Q15,0 30,10 Q45,20 60,10 Q75,0 90,10" fill="none" stroke="#8B5CF6" strokeWidth="3" /></svg>
      <svg className="absolute bottom-[20%] right-[5%] w-20 h-8 opacity-20" viewBox="0 0 100 20"><path d="M0,10 Q15,20 30,10 Q45,0 60,10 Q75,20 90,10" fill="none" stroke="#F472B6" strokeWidth="3" /></svg>
    </div>
  );
}

export default function LandingPage() {
  const [showWidget, setShowWidget] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWidget(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleTryDemo = () => {
    setShowWidget(true);
    setForceOpen(true);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ShapeConfetti />

      {/* Navigation */}
      <nav className="relative z-10 px-8 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-accent rounded-xl border-2 border-foreground shadow-hard flex items-center justify-center">
            <span className="text-white font-extrabold text-xl font-heading">E</span>
          </div>
          <span className="text-2xl font-extrabold text-foreground font-heading">Engagely</span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/templates", label: "Templates" },
            { href: "/flow-builder", label: "Flow Builder" },
            { href: "/pricing", label: "Pricing" },
            { href: "/integrations", label: "Integrations" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-foreground hover:text-accent bounce-transition">
              {item.label}
            </Link>
          ))}
          <button className="px-5 py-2.5 text-sm font-bold text-foreground border-2 border-foreground rounded-full hover:bg-tertiary bounce-transition">
            Sign in
          </button>
          <button className="px-5 py-2.5 bg-accent text-white text-sm font-bold border-2 border-foreground rounded-full shadow-hard hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-hard-active active:translate-x-0.5 active:translate-y-0.5 bounce-transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-8 pt-16 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-8 animate-pop-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-quaternary/20 border-2 border-foreground rounded-full shadow-hard">
              <span className="text-sm font-bold text-foreground">See it live on a real website</span>
              <Link href="/demo/real-estate" className="text-sm font-extrabold text-accent hover:underline">Try the demo &rarr;</Link>
            </div>

            <h1 className="text-5xl font-extrabold text-foreground leading-[1.15] font-heading">
              Turn every visit into a{" "}
              <span className="text-accent underline decoration-tertiary decoration-4 underline-offset-4">conversation.</span>{" "}
              <span className="text-secondary">Turn every conversation into pipeline.</span>
            </h1>

            <p className="text-lg text-muted-fg leading-relaxed">
              Replace your static website with an <strong className="text-foreground">AI assistant</strong> that qualifies leads, books meetings, and answers questions 24/7.
            </p>

            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-accent text-white rounded-full border-2 border-foreground shadow-hard hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-hard-active active:translate-x-0.5 active:translate-y-0.5 bounce-transition flex items-center gap-3 text-lg font-bold">
                Get Early Access
                <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-accent" />
                </span>
              </button>
              <button className="px-8 py-4 bg-transparent text-foreground rounded-full border-2 border-foreground hover:bg-tertiary bounce-transition text-lg font-bold">
                Watch Demo
              </button>
            </div>

            {/* Integration logos */}
            <div className="pt-6">
              <p className="text-xs font-bold text-muted-fg uppercase tracking-widest mb-4">Integrates with</p>
              <div className="flex items-center gap-6">
                {["Salesforce", "HubSpot", "Calendar"].map((name, i) => (
                  <div key={name} className={`px-4 py-2 border-2 border-foreground rounded-full text-xs font-bold shadow-hard bounce-transition hover:-translate-y-1 ${i === 0 ? "bg-blue-100" : i === 1 ? "bg-orange-100" : "bg-green-100"}`}>
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Product showcase */}
          <div className="relative animate-pop-in" style={{ animationDelay: "0.2s" }}>
            {/* Yellow circle behind */}
            <div className="absolute -top-8 -left-8 w-80 h-80 bg-tertiary/30 rounded-full -z-10" />
            {/* Dot grid behind */}
            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-dots rounded-2xl -z-10 opacity-50" />

            <div className="relative rounded-3xl overflow-hidden border-2 border-foreground shadow-[8px_8px_0px_0px_#1E293B] hover:shadow-[12px_12px_0px_0px_#1E293B] hover:-translate-x-1 hover:-translate-y-1 bounce-transition bg-card">
              {/* Engagely Dashboard Mockup */}
              <div className="h-[520px] flex">
                {/* Sidebar */}
                <div className="w-14 bg-foreground flex flex-col items-center py-4 gap-3 flex-shrink-0">
                  <div className="w-8 h-8 bg-accent rounded-lg border border-white/20 flex items-center justify-center text-white text-[10px] font-extrabold">E</div>
                  <div className="w-1 h-4" />
                  {["bg-accent", "bg-white/20", "bg-white/20", "bg-white/20", "bg-white/20"].map((bg, i) => (
                    <div key={i} className={`w-7 h-7 ${bg} rounded-lg`} />
                  ))}
                  <div className="mt-auto w-7 h-7 bg-tertiary rounded-full border border-white/20" />
                </div>
                {/* Main content */}
                <div className="flex-1 flex flex-col bg-background overflow-hidden">
                  {/* Header */}
                  <div className="h-11 bg-card border-b-2 border-border flex items-center justify-between px-4 flex-shrink-0">
                    <span className="text-[11px] font-extrabold text-foreground font-heading">Analytics</span>
                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 bg-muted rounded-full text-[8px] font-bold text-muted-fg">Last 30 days</div>
                      <div className="w-5 h-5 bg-muted rounded-full" />
                    </div>
                  </div>
                  <div className="flex-1 p-3 overflow-hidden">
                    {/* Metric cards */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[
                        { label: "Visitors", value: "2,847", color: "shadow-[3px_3px_0px_0px_#8B5CF6]" },
                        { label: "Engaged", value: "40.1%", color: "shadow-[3px_3px_0px_0px_#F472B6]" },
                        { label: "Meetings", value: "89", color: "shadow-[3px_3px_0px_0px_#FBBF24]" },
                        { label: "Avg Session", value: "4m 32s", color: "shadow-[3px_3px_0px_0px_#1E293B]" },
                      ].map((m) => (
                        <div key={m.label} className={`bg-card rounded-lg p-2.5 border-2 border-foreground ${m.color}`}>
                          <p className="text-[7px] font-bold text-muted-fg">{m.label}</p>
                          <p className="text-sm font-extrabold text-foreground font-heading">{m.value}</p>
                          <p className="text-[7px] font-bold text-quaternary">+12%</p>
                        </div>
                      ))}
                    </div>
                    {/* Charts row */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {/* Line chart area */}
                      <div className="col-span-2 bg-card rounded-lg p-3 border-2 border-foreground shadow-[3px_3px_0px_0px_#E2E8F0]">
                        <p className="text-[8px] font-extrabold text-foreground mb-2 font-heading">Engagement Trend</p>
                        <svg viewBox="0 0 300 100" className="w-full h-24">
                          <defs>
                            <linearGradient id="gfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" /><stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" /></linearGradient>
                          </defs>
                          {[0, 1, 2, 3, 4].map((i) => <line key={i} x1="0" y1={i * 25} x2="300" y2={i * 25} stroke="#E2E8F0" strokeWidth="0.5" />)}
                          <path d="M0,80 L50,72 L100,60 L150,50 L200,35 L250,28 L300,20" fill="none" stroke="#1E293B" strokeWidth="2.5" />
                          <path d="M0,85 L50,80 L100,70 L150,65 L200,50 L250,42 L300,38" fill="url(#gfill)" stroke="#8B5CF6" strokeWidth="2.5" />
                          {[0, 50, 100, 150, 200, 250, 300].map((x, i) => <circle key={i} cx={x} cy={[85, 80, 70, 65, 50, 42, 38][i]} r="3" fill="#8B5CF6" stroke="#1E293B" strokeWidth="1" />)}
                        </svg>
                      </div>
                      {/* Donut chart */}
                      <div className="bg-card rounded-lg p-3 border-2 border-foreground shadow-[3px_3px_0px_0px_#F472B6]">
                        <p className="text-[8px] font-extrabold text-foreground mb-2 font-heading">Intent</p>
                        <svg viewBox="0 0 80 80" className="w-16 h-16 mx-auto">
                          <circle cx="40" cy="40" r="28" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                          <circle cx="40" cy="40" r="28" fill="none" stroke="#FBBF24" strokeWidth="10" strokeDasharray="79.2 176" strokeDashoffset="0" />
                          <circle cx="40" cy="40" r="28" fill="none" stroke="#8B5CF6" strokeWidth="10" strokeDasharray="59.8 176" strokeDashoffset="-79.2" />
                        </svg>
                        <div className="mt-2 space-y-1">
                          {[{ c: "bg-accent", l: "High 34%" }, { c: "bg-tertiary", l: "Med 45%" }, { c: "bg-border", l: "Low 21%" }].map((d) => (
                            <div key={d.l} className="flex items-center gap-1"><div className={`w-2 h-2 rounded-full ${d.c} border border-foreground`} /><span className="text-[7px] text-muted-fg font-medium">{d.l}</span></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Table */}
                    <div className="bg-card rounded-lg border-2 border-foreground shadow-[3px_3px_0px_0px_#E2E8F0]">
                      <div className="px-3 py-1.5 border-b-2 border-border"><p className="text-[8px] font-extrabold text-foreground font-heading">High-Intent Visitors</p></div>
                      {[
                        { email: "sarah@acme.com", co: "Acme Corp", score: 98 },
                        { email: "james@techco.io", co: "TechCo", score: 95 },
                        { email: "emily@startup.com", co: "Startup Inc", score: 92 },
                      ].map((v) => (
                        <div key={v.email} className="px-3 py-1.5 flex items-center justify-between border-b border-border last:border-0">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-accent/20 rounded-full border border-foreground" />
                            <span className="text-[8px] font-bold text-foreground">{v.email}</span>
                            <span className="text-[7px] text-muted-fg">{v.co}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-accent rounded-full" style={{ width: `${v.score}%` }} /></div>
                            <span className="text-[8px] font-extrabold text-foreground">{v.score}</span>
                            <span className="px-1.5 py-0.5 bg-accent text-white text-[6px] font-extrabold rounded-full border border-foreground">Reach out</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute bottom-6 left-20 bg-card border-2 border-foreground rounded-xl p-4 shadow-hard flex items-center gap-3 animate-float">
                <div className="w-10 h-10 bg-quaternary rounded-full border-2 border-foreground flex items-center justify-center">
                  <span className="text-white font-bold text-xs">+</span>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-foreground font-heading">+240%</p>
                  <p className="text-[10px] font-medium text-muted-fg">Meeting Booking Rate</p>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-card border-2 border-foreground rounded-xl p-3 shadow-hard-pink flex items-center gap-2 animate-float-slow">
                <div className="w-7 h-7 bg-accent rounded-full border-2 border-foreground flex items-center justify-center text-white text-[10px] font-extrabold">AI</div>
                <div>
                  <p className="text-xs font-bold text-foreground">Arya Agent Live</p>
                  <p className="text-[9px] text-muted-fg">Handling 43 visitors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-8 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-4 gap-6">
          {[
            { value: "40%", label: "Engagement rate", color: "bg-accent/10 shadow-hard-violet" },
            { value: "3x", label: "More meetings", color: "bg-secondary/10 shadow-hard-pink" },
            { value: "24/7", label: "Always-on", color: "bg-tertiary/10 shadow-hard-yellow" },
            { value: "60%", label: "Shorter sales cycle", color: "bg-quaternary/10 shadow-hard" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`text-center border-2 border-foreground rounded-2xl p-8 ${stat.color} hover:-translate-y-2 bounce-transition animate-pop-in`}
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="text-4xl font-extrabold text-foreground font-heading mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-muted-fg">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigate All Screens */}
      <section className="relative z-10 px-8 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-foreground font-heading mb-2">Explore All Screens</h2>
          <p className="text-muted-fg font-medium">Jump to any page to see the full product</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {[
            { href: "/dashboard", label: "Dashboard", desc: "Analytics & conversations", color: "hover:shadow-hard-violet" },
            { href: "/flow-builder", label: "Flow Builder", desc: "Visual conversation editor", color: "hover:shadow-hard-pink" },
            { href: "/templates", label: "Templates", desc: "Pre-built flow library", color: "hover:shadow-hard-yellow" },
            { href: "/pricing", label: "Pricing", desc: "Plans & comparison", color: "hover:shadow-hard" },
            { href: "/integrations", label: "Integrations", desc: "CRM, calendar & more", color: "hover:shadow-hard-violet" },
            { href: "/settings", label: "Settings", desc: "Widget & branding config", color: "hover:shadow-hard-pink" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`bg-card border-2 border-foreground rounded-2xl p-5 text-left shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 bounce-transition group ${item.color}`}
            >
              <h3 className="font-bold text-foreground group-hover:text-accent bounce-transition font-heading mb-1">{item.label}</h3>
              <p className="text-xs text-muted-fg">{item.desc}</p>
            </Link>
          ))}
          <Link
            href="/demo/real-estate"
            className="bg-quaternary border-2 border-foreground rounded-2xl p-5 text-left shadow-hard hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 bounce-transition"
          >
            <h3 className="font-bold text-foreground font-heading mb-1">Real Estate Demo</h3>
            <p className="text-xs text-foreground/70">See it on a live site</p>
          </Link>
          <button
            onClick={handleTryDemo}
            className="bg-accent border-2 border-foreground rounded-2xl p-5 text-left shadow-hard hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 bounce-transition"
          >
            <h3 className="font-bold text-white font-heading mb-1">Live Demo</h3>
            <p className="text-xs text-white/70">Try the AI agent now</p>
          </button>
        </div>
      </section>

      {showWidget && <ChatWidget forceOpen={forceOpen} />}
    </div>
  );
}
