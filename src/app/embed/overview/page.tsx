"use client";

import { Monitor, Users, BarChart3, Zap, Shield, Calendar } from "lucide-react";

export default function EmbedOverview() {
  return (
    <div className="p-5 space-y-5">
      <div className="text-center mb-2">
        <h2 className="text-lg font-extrabold text-foreground font-heading">Engagely Platform</h2>
        <p className="text-[11px] text-muted-fg">Interactive AI agent for B2B websites</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Monitor, title: "AI Video Avatar", desc: "Lifelike agent with lip-sync and natural expressions", color: "shadow-hard-violet", bg: "bg-accent/10" },
          { icon: BarChart3, title: "Analytics", desc: "Visitor engagement, intent scoring, and conversion tracking", color: "shadow-hard-yellow", bg: "bg-tertiary/10" },
          { icon: Users, title: "CRM Sync", desc: "Auto-sync leads to Salesforce, HubSpot, Pipedrive", color: "shadow-hard-pink", bg: "bg-secondary/10" },
          { icon: Zap, title: "Flow Builder", desc: "Visual drag-and-drop conversation editor", color: "shadow-hard", bg: "bg-muted" },
          { icon: Shield, title: "Security", desc: "TLS 1.3, AES-256, SOC 2, GDPR compliant", color: "shadow-hard-violet", bg: "bg-quaternary/10" },
          { icon: Calendar, title: "Booking", desc: "Calendar integration for inline meeting scheduling", color: "shadow-hard-yellow", bg: "bg-tertiary/10" },
        ].map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className={`${f.bg} rounded-xl p-4 border-2 border-foreground ${f.color} bounce-transition hover:-translate-y-1`}>
              <div className="w-8 h-8 bg-card rounded-lg border-2 border-foreground flex items-center justify-center mb-2"><Icon className="w-4 h-4 text-accent" strokeWidth={2.5} /></div>
              <h3 className="text-[11px] font-extrabold text-foreground font-heading mb-1">{f.title}</h3>
              <p className="text-[9px] text-muted-fg leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { value: "40%", label: "Engagement" },
          { value: "3x", label: "More meetings" },
          { value: "24/7", label: "Always on" },
          { value: "<1hr", label: "Go-live time" },
        ].map((s) => (
          <div key={s.label} className="text-center bg-card rounded-xl p-3 border-2 border-foreground shadow-hard">
            <div className="text-lg font-extrabold text-foreground font-heading">{s.value}</div>
            <div className="text-[9px] text-muted-fg font-bold">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
