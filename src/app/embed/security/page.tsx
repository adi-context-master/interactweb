"use client";

import { Shield, Lock, Key, Server, CheckCircle } from "lucide-react";

export default function EmbedSecurity() {
  return (
    <div className="p-5 space-y-5">
      <div className="text-center mb-2">
        <h2 className="text-lg font-extrabold text-foreground font-heading">Security & Compliance</h2>
        <p className="text-[11px] text-muted-fg">Enterprise-grade protection for your data</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Shield, title: "SOC 2 Type II", desc: "Certification in progress — full audit trail and controls", color: "shadow-hard-violet" },
          { icon: Lock, title: "TLS 1.3 + AES-256", desc: "All data encrypted in transit and at rest", color: "shadow-hard-pink" },
          { icon: Key, title: "OAuth 2.0", desc: "Secure authentication for all integrations", color: "shadow-hard-yellow" },
          { icon: Server, title: "Tenant Isolation", desc: "Strict multi-tenant data boundaries", color: "shadow-hard" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className={`bg-card rounded-xl p-4 border-2 border-foreground ${item.color} bounce-transition hover:-translate-y-0.5`}>
              <div className="w-10 h-10 bg-accent/10 rounded-xl border-2 border-foreground flex items-center justify-center mb-3"><Icon className="w-5 h-5 text-accent" strokeWidth={2.5} /></div>
              <h3 className="text-[12px] font-extrabold text-foreground font-heading mb-1">{item.title}</h3>
              <p className="text-[10px] text-muted-fg">{item.desc}</p>
            </div>
          );
        })}
      </div>
      <div className="bg-card rounded-xl border-2 border-foreground shadow-hard-lg p-4">
        <h3 className="text-sm font-extrabold text-foreground mb-3 font-heading">Compliance Checklist</h3>
        <div className="space-y-2">
          {["GDPR compliant — data deletion & consent management", "No customer data used for model training", "All integrations use OAuth 2.0 — no plaintext API keys", "Data retained for 12 months minimum", "Webhook encryption and retry logic"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-quaternary flex-shrink-0" strokeWidth={2.5} />
              <span className="text-[11px] text-foreground font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
