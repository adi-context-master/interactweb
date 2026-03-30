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
    <div className="min-h-screen bg-[#FAFAF8]">
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF6B5A] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-semibold text-[#1B2A4A]">Engagely</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-[#1B2A4A] hover:text-[#FF6B5A] transition-colors">Dashboard</Link>
          <button className="px-5 py-2.5 bg-[#FF6B5A] text-white rounded-lg text-sm hover:bg-[#FF5A48] transition-all">Save Changes</button>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-[#1B2A4A] mb-8">Settings</h1>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-56 shrink-0">
            <div className="space-y-1">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <button key={s.id} onClick={() => setActiveSection(s.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeSection === s.id ? "bg-[#FF6B5A]/10 text-[#FF6B5A] font-medium" : "text-gray-600 hover:bg-gray-100"}`}
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
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-[#1B2A4A] mb-2">Embed Snippet</h2>
              <p className="text-sm text-gray-600 mb-6">Add this script tag to your website to embed the Engagely widget. It loads asynchronously and won&apos;t affect page performance.</p>
              <div className="relative">
                <pre className="bg-[#1B2A4A] rounded-xl p-6 text-sm text-green-400 overflow-x-auto font-mono">{snippet}</pre>
                <button onClick={handleCopy} className="absolute top-4 right-4 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Widget Configuration */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-[#1B2A4A] mb-6">Widget Configuration</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Agent Name</label>
                  <input type="text" defaultValue="Arya" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A]/20 focus:border-[#FF6B5A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Widget Position</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A]/20 focus:border-[#FF6B5A]">
                    <option>Bottom Center</option>
                    <option>Bottom Right</option>
                    <option>Bottom Left</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Greeting Message</label>
                  <input type="text" defaultValue="Hi, I'm Arya. How can I help you today?" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A]/20 focus:border-[#FF6B5A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Greeting Delay (seconds)</label>
                  <input type="number" defaultValue={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A]/20 focus:border-[#FF6B5A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Theme</label>
                  <div className="flex items-center gap-3">
                    <button className="flex-1 py-3 rounded-xl border-2 border-[#FF6B5A] bg-[#FF6B5A]/5 text-sm font-medium text-[#FF6B5A]">Light</button>
                    <button className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Dark</button>
                    <button className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Auto</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-[#1B2A4A] mb-6">Branding</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B5A] border border-gray-200 cursor-pointer" />
                    <input type="text" defaultValue="#FF6B5A" className="w-32 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A]/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Company Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">Upload Logo</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Agent Avatar</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">Change Avatar</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save */}
            <div className="flex justify-end">
              <button className="px-8 py-3 bg-[#FF6B5A] text-white rounded-xl font-semibold hover:bg-[#FF5A48] transition-colors shadow-lg shadow-[#FF6B5A]/20">Save All Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
