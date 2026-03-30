"use client";

import { useState } from "react";
import { Copy, Check, Upload, Globe, Palette, MessageSquare, Bell, Shield, User } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("general");
  const snippet = `<script src="https://cdn.engagely.io/widget.js" data-id="wgt_abc123xyz" async></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { id: "general", label: "General", icon: Globe },
    { id: "widget", label: "Widget", icon: MessageSquare },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "account", label: "Account", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b-2 border-foreground px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent rounded-xl border-2 border-foreground shadow-hard flex items-center justify-center">
            <span className="text-white font-extrabold text-lg">E</span>
          </div>
          <span className="text-xl font-heading font-extrabold text-foreground">Engagely</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-foreground font-bold hover:text-accent bounce-transition">Dashboard</Link>
          <button className="px-5 py-2.5 bg-accent text-white rounded-full border-2 border-foreground shadow-hard font-extrabold text-sm bounce-transition hover:shadow-hard-hover">Save Changes</button>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <h1 className="text-3xl font-heading font-extrabold text-foreground mb-8">Settings</h1>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-56 shrink-0">
            <div className="space-y-1">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <button key={s.id} onClick={() => setActiveSection(s.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm bounce-transition ${activeSection === s.id ? "bg-accent/10 text-accent font-bold" : "text-muted-fg hover:bg-accent/5"}`}
                  >
                    <Icon className="w-5 h-5" /> {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8">
            {/* Embed Snippet */}
            <div className="bg-card rounded-2xl border-2 border-foreground shadow-hard p-8">
              <h2 className="text-xl font-heading font-extrabold text-foreground mb-2">Embed Snippet</h2>
              <p className="text-sm text-muted-fg mb-6">Add this script tag to your website to embed the Engagely widget. It loads asynchronously and won&apos;t affect page performance.</p>
              <div className="relative">
                <pre className="bg-foreground rounded-2xl border-2 border-foreground p-6 text-sm text-quaternary overflow-x-auto font-mono">{snippet}</pre>
                <button onClick={handleCopy} className="absolute top-4 right-4 flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white text-xs font-bold bounce-transition">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Widget Configuration */}
            <div className="bg-card rounded-2xl border-2 border-foreground shadow-hard-pink p-8">
              <h2 className="text-xl font-heading font-extrabold text-foreground mb-6">Widget Configuration</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-foreground mb-2">Agent Name</label>
                  <input type="text" defaultValue="Arya" className="w-full px-4 py-3 border-2 border-foreground rounded-xl text-sm outline-none focus:shadow-hard-violet bounce-transition" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-foreground mb-2">Widget Position</label>
                  <select className="w-full px-4 py-3 border-2 border-foreground rounded-xl text-sm outline-none focus:shadow-hard-violet bounce-transition">
                    <option>Bottom Center</option>
                    <option>Bottom Right</option>
                    <option>Bottom Left</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-foreground mb-2">Greeting Message</label>
                  <input type="text" defaultValue="Hi, I'm Arya. How can I help you today?" className="w-full px-4 py-3 border-2 border-foreground rounded-xl text-sm outline-none focus:shadow-hard-violet bounce-transition" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-foreground mb-2">Greeting Delay (seconds)</label>
                  <input type="number" defaultValue={3} className="w-full px-4 py-3 border-2 border-foreground rounded-xl text-sm outline-none focus:shadow-hard-violet bounce-transition" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-foreground mb-2">Theme</label>
                  <div className="flex items-center gap-3">
                    <button className="flex-1 py-3 rounded-full border-2 border-accent bg-accent/10 text-sm font-bold text-accent bounce-transition">Light</button>
                    <button className="flex-1 py-3 rounded-full border-2 border-foreground text-sm text-muted-fg hover:bg-accent/5 bounce-transition">Dark</button>
                    <button className="flex-1 py-3 rounded-full border-2 border-foreground text-sm text-muted-fg hover:bg-accent/5 bounce-transition">Auto</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="bg-card rounded-2xl border-2 border-foreground shadow-hard-yellow p-8">
              <h2 className="text-xl font-heading font-extrabold text-foreground mb-6">Branding</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-foreground mb-2">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent border-2 border-foreground cursor-pointer bounce-transition" />
                    <input type="text" defaultValue="#8B5CF6" className="w-32 px-4 py-2.5 border-2 border-foreground rounded-xl text-sm outline-none focus:shadow-hard-violet bounce-transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-foreground mb-2">Company Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-background border-2 border-dashed border-foreground flex items-center justify-center bounce-transition">
                      <Upload className="w-6 h-6 text-muted-fg" />
                    </div>
                    <button className="px-4 py-2 border-2 border-foreground rounded-full text-sm text-foreground font-bold hover:bg-accent/5 bounce-transition">Upload Logo</button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-foreground mb-2">Agent Avatar</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-foreground">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <button className="px-4 py-2 border-2 border-foreground rounded-full text-sm text-foreground font-bold hover:bg-accent/5 bounce-transition">Change Avatar</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save */}
            <div className="flex justify-end">
              <button className="px-8 py-3 bg-accent text-white rounded-full border-2 border-foreground shadow-hard font-extrabold bounce-transition hover:shadow-hard-hover">Save All Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
