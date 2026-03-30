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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary/20 border-2 border-foreground rounded-full shadow-hard">
              <span className="text-sm font-bold text-foreground">Now with AI Video Agents</span>
              <span className="text-lg">&#x2728;</span>
            </div>

            <h1 className="text-5xl font-extrabold text-foreground leading-[1.15] font-heading">
              Turn every visit into a{" "}
              <span className="text-accent underline decoration-tertiary decoration-4 underline-offset-4">conversation.</span>{" "}
              <span className="text-secondary">Turn every conversation into pipeline.</span>
            </h1>

            <p className="text-lg text-muted-fg leading-relaxed">
              Replace your static website with an <strong className="text-foreground">AI video agent</strong> that qualifies leads, books meetings, and answers questions 24/7.
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

            <div className="relative rounded-3xl overflow-hidden border-2 border-foreground shadow-[8px_8px_0px_0px_#1E293B] hover:shadow-[12px_12px_0px_0px_#1E293B] hover:-translate-x-1 hover:-translate-y-1 bounce-transition">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1080&q=80"
                alt="Engagely Dashboard"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />

              {/* Floating cards */}
              <div className="absolute bottom-6 left-6 bg-card border-2 border-foreground rounded-xl p-4 shadow-hard flex items-center gap-3 animate-float">
                <div className="w-10 h-10 bg-quaternary rounded-full border-2 border-foreground flex items-center justify-center">
                  <span className="text-white font-bold text-xs">+</span>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-foreground font-heading">+240%</p>
                  <p className="text-[10px] font-medium text-muted-fg">Meeting Booking Rate</p>
                </div>
              </div>

              <div className="absolute top-6 right-6 bg-card border-2 border-foreground rounded-xl p-3 shadow-hard-pink flex items-center gap-2 animate-float-slow">
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
          <button
            onClick={handleTryDemo}
            className="bg-accent border-2 border-foreground rounded-2xl p-5 text-left shadow-hard hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 bounce-transition"
          >
            <h3 className="font-bold text-white font-heading mb-1">Live Demo</h3>
            <p className="text-xs text-white/70">Try the AI agent now</p>
          </button>
          <Link href="/" className="bg-foreground border-2 border-foreground rounded-2xl p-5 text-left shadow-hard-yellow hover:-translate-x-0.5 hover:-translate-y-0.5 bounce-transition">
            <h3 className="font-bold text-white font-heading mb-1">Landing Page</h3>
            <p className="text-xs text-white/60">You are here</p>
          </Link>
        </div>
      </section>

      {showWidget && <ChatWidget forceOpen={forceOpen} />}
    </div>
  );
}
