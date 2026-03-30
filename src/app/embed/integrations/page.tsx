"use client";

import { Check, ArrowRight, X } from "lucide-react";

const integrations = [
  { name: "Salesforce", icon: "🔵", status: "connected", sync: "5m ago" },
  { name: "HubSpot", icon: "🟠", status: "connected", sync: "2h ago" },
  { name: "Google Calendar", icon: "📅", status: "connected", sync: "30m ago" },
  { name: "Slack", icon: "💬", status: "connected", sync: "1m ago" },
  { name: "Zapier", icon: "⚡", status: "available" },
  { name: "Intercom", icon: "💙", status: "available" },
  { name: "Pipedrive", icon: "🟢", status: "available" },
  { name: "Webhooks", icon: "🔗", status: "available" },
];

export default function EmbedIntegrations() {
  return (
    <div className="p-5 space-y-5">
      <div>
        <h3 className="text-sm font-extrabold text-foreground mb-3 font-heading">Connected</h3>
        <div className="grid grid-cols-2 gap-3">
          {integrations.filter((i) => i.status === "connected").map((ig) => (
            <div key={ig.name} className="bg-card rounded-xl p-3.5 border-2 border-quaternary shadow-hard bounce-transition hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2"><span className="text-xl">{ig.icon}</span><div><h4 className="text-[11px] font-extrabold text-foreground font-heading">{ig.name}</h4><p className="text-[9px] text-muted-fg">Sync: {ig.sync}</p></div></div>
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-quaternary/20 text-foreground rounded-full text-[8px] font-extrabold border border-foreground"><Check className="w-2.5 h-2.5" /> On</span>
              </div>
              <div className="flex gap-1.5">
                <button className="flex-1 px-2 py-1.5 bg-muted text-foreground rounded-full text-[10px] font-bold border border-border">Configure</button>
                <button className="px-2 py-1.5 bg-muted text-secondary rounded-full text-[10px] border border-border"><X className="w-3 h-3" strokeWidth={2.5} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-extrabold text-foreground mb-3 font-heading">Available</h3>
        <div className="grid grid-cols-2 gap-3">
          {integrations.filter((i) => i.status === "available").map((ig) => (
            <div key={ig.name} className="bg-card rounded-xl p-3.5 border-2 border-foreground shadow-hard bounce-transition hover:shadow-hard-violet hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-2"><span className="text-xl">{ig.icon}</span><div><h4 className="text-[11px] font-extrabold text-foreground font-heading">{ig.name}</h4><p className="text-[9px] text-muted-fg">Not connected</p></div></div>
              <button className="w-full px-2 py-1.5 bg-accent text-white rounded-full text-[10px] font-bold border-2 border-foreground shadow-hard-active flex items-center justify-center gap-1">Connect <ArrowRight className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
