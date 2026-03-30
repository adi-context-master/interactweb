"use client";

import { Zap, ArrowRight, Mail, Calendar, Users, Bell } from "lucide-react";

const automations = [
  { trigger: "High-intent visitor detected", action: "Notify sales rep on Slack", icon: Bell, status: "active" },
  { trigger: "Email captured", action: "Create lead in HubSpot", icon: Users, status: "active" },
  { trigger: "Meeting booked", action: "Send confirmation + calendar invite", icon: Calendar, status: "active" },
  { trigger: "Conversation ended", action: "Email summary to visitor", icon: Mail, status: "paused" },
];

export default function EmbedWorkflows() {
  return (
    <div className="p-5 space-y-5">
      <div className="text-center mb-2">
        <h2 className="text-lg font-extrabold text-foreground font-heading">Workflow Automation</h2>
        <p className="text-[11px] text-muted-fg">Automate actions based on conversation events</p>
      </div>
      <div className="space-y-3">
        {automations.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className={`bg-card rounded-xl p-4 border-2 border-foreground ${a.status === "active" ? "shadow-hard" : "shadow-hard opacity-60"} bounce-transition hover:-translate-y-0.5`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-tertiary/20 rounded-xl border-2 border-foreground flex items-center justify-center">
                  <Zap className="w-4 h-4 text-tertiary" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-foreground">When: {a.trigger}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-fg" />
                <div className="w-9 h-9 bg-accent/10 rounded-xl border-2 border-foreground flex items-center justify-center">
                  <Icon className="w-4 h-4 text-accent" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-foreground">Then: {a.action}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-extrabold border-2 border-foreground ${a.status === "active" ? "bg-quaternary/20 text-foreground" : "bg-muted text-muted-fg"}`}>
                  {a.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-card rounded-xl border-2 border-dashed border-foreground/30 p-6 text-center">
        <Zap className="w-8 h-8 text-muted-fg mx-auto mb-2" strokeWidth={2.5} />
        <h3 className="text-sm font-extrabold text-foreground font-heading mb-1">Create Automation</h3>
        <p className="text-[10px] text-muted-fg mb-3">Connect conversation events to any action</p>
        <button className="px-4 py-2 bg-accent text-white rounded-full border-2 border-foreground shadow-hard text-[10px] font-bold">New Workflow</button>
      </div>
    </div>
  );
}
