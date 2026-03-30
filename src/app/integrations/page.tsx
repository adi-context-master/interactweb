"use client";

import { Search, Check, ExternalLink, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const allIntegrations = [
  { id: 1, name: "Salesforce", category: "CRM", icon: "🔵", description: "Sync leads, contacts, and conversation data automatically", status: "available", popular: true },
  { id: 2, name: "HubSpot", category: "CRM", icon: "🟠", description: "Create and enrich contacts with conversation insights", status: "available", popular: true },
  { id: 3, name: "Pipedrive", category: "CRM", icon: "🟢", description: "Push deals and activity data to your pipeline", status: "available", popular: false },
  { id: 4, name: "Google Calendar", category: "Calendar", icon: "📅", description: "Enable meeting booking directly from conversations", status: "available", popular: true },
  { id: 5, name: "Microsoft Outlook", category: "Calendar", icon: "📧", description: "Sync meetings and contacts with Microsoft 365", status: "available", popular: false },
  { id: 6, name: "Slack", category: "Messaging", icon: "💬", description: "Get real-time notifications for high-intent visitors", status: "available", popular: true },
  { id: 7, name: "Zapier", category: "Automation", icon: "⚡", description: "Connect to 5,000+ apps through Zapier automations", status: "available", popular: true },
  { id: 8, name: "Webhooks", category: "Developer", icon: "🔗", description: "Send event data to any system via custom webhooks", status: "available", popular: false },
  { id: 9, name: "Intercom", category: "Support", icon: "💙", description: "Hand off conversations to Intercom live chat agents", status: "coming_soon", popular: false },
  { id: 10, name: "Zendesk", category: "Support", icon: "🎯", description: "Create support tickets from visitor conversations", status: "coming_soon", popular: false },
  { id: 11, name: "Segment", category: "Analytics", icon: "📊", description: "Send visitor engagement events to your data warehouse", status: "coming_soon", popular: false },
  { id: 12, name: "Amplitude", category: "Analytics", icon: "📈", description: "Track visitor behavior and engagement metrics", status: "coming_soon", popular: false },
];

const categoriesAll = ["All", "CRM", "Calendar", "Messaging", "Automation", "Developer", "Support", "Analytics"];

export default function Integrations() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = allIntegrations.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || i.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b-2 border-foreground px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent rounded-xl border-2 border-foreground shadow-hard flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-heading font-extrabold text-foreground">Engagely</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-bold text-foreground hover:text-accent bounce-transition">Dashboard</Link>
          <button className="px-5 py-2.5 bg-accent text-white rounded-full border-2 border-foreground shadow-hard text-sm font-bold bounce-transition hover:-translate-y-1 hover:shadow-hard-hover">Get Started</button>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-extrabold text-foreground mb-4">Integrations</h1>
          <p className="text-lg text-muted-fg max-w-xl mx-auto">Connect Engagely with the tools your team already uses. Seamless data flow, zero manual work.</p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-fg" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search integrations..." className="w-full pl-12 pr-4 py-3 bg-card border-2 border-foreground rounded-xl text-sm text-foreground outline-none focus:shadow-hard-violet bounce-transition" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categoriesAll.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold border-2 border-foreground bounce-transition ${category === cat ? "bg-accent text-white shadow-hard" : "bg-card text-foreground hover:-translate-y-1 hover:shadow-hard-violet"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {filtered.map((integ) => (
            <div key={integ.id} className={`bg-card rounded-2xl p-6 border-2 bounce-transition ${integ.status === "coming_soon" ? "border-foreground opacity-70 shadow-hard" : "border-foreground shadow-hard hover:shadow-hard-violet hover:-translate-y-1"}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-xl border-2 border-border flex items-center justify-center text-2xl">{integ.icon}</div>
                  <div>
                    <h3 className="font-heading font-extrabold text-foreground">{integ.name}</h3>
                    <span className="text-xs text-muted-fg">{integ.category}</span>
                  </div>
                </div>
                {integ.popular && <span className="px-2 py-1 bg-secondary/20 text-secondary border-2 border-secondary text-[10px] font-extrabold rounded-full">Popular</span>}
              </div>
              <p className="text-sm text-muted-fg mb-4">{integ.description}</p>
              {integ.status === "coming_soon" ? (
                <button className="w-full py-2.5 bg-muted text-muted-fg border-2 border-border rounded-full text-sm font-bold cursor-not-allowed">Coming Soon</button>
              ) : (
                <button className="w-full py-2.5 bg-accent text-white rounded-full border-2 border-foreground shadow-hard text-sm font-bold bounce-transition hover:-translate-y-1 hover:shadow-hard-hover flex items-center justify-center gap-2">
                  Connect <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
