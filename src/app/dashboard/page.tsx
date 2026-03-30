"use client";

import {
  LayoutDashboard, MessageSquare, BarChart3, Workflow, BookOpen, Plug, Settings,
  TrendingUp, Users, Calendar, Clock, Search, Bell, ChevronDown, Send,
  MoreVertical, Filter, Plus, Upload, FileText, Link2, Trash2, Edit, Check, X, Eye,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { useState } from "react";
import Link from "next/link";

const engagementData = [
  { date: "Mar 1", visitors: 245, engaged: 98 },
  { date: "Mar 5", visitors: 289, engaged: 118 },
  { date: "Mar 10", visitors: 312, engaged: 128 },
  { date: "Mar 15", visitors: 356, engaged: 145 },
  { date: "Mar 20", visitors: 401, engaged: 168 },
  { date: "Mar 24", visitors: 428, engaged: 172 },
];

const intentData = [
  { name: "High", value: 34, color: "#8B5CF6" },
  { name: "Medium", value: 45, color: "#FBBF24" },
  { name: "Low", value: 21, color: "#E2E8F0" },
];

const highIntentVisitors = [
  { email: "sarah.chen@acme.com", company: "Acme Corp", score: 98, lastActive: "2m ago", topQuestion: "Enterprise pricing?" },
  { email: "james.wilson@techco.io", company: "TechCo", score: 95, lastActive: "5m ago", topQuestion: "API integration" },
  { email: "emily.brown@startup.com", company: "Startup Inc", score: 92, lastActive: "12m ago", topQuestion: "Setup timeline" },
  { email: "michael.lee@bizware.com", company: "BizWare", score: 89, lastActive: "18m ago", topQuestion: "Security features" },
  { email: "lisa.garcia@growth.io", company: "Growth.io", score: 87, lastActive: "24m ago", topQuestion: "Custom workflows" },
];

const conversations = [
  { id: 1, visitor: "Sarah Chen", company: "Acme Corp", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", lastMessage: "Can you tell me more about enterprise features?", time: "2m ago", unread: 2, status: "active", intent: "high" },
  { id: 2, visitor: "James Wilson", company: "TechCo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", lastMessage: "Looking for API documentation", time: "5m ago", unread: 0, status: "waiting", intent: "high" },
  { id: 3, visitor: "Emily Brown", company: "Startup Inc", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80", lastMessage: "What's your typical setup timeline?", time: "12m ago", unread: 1, status: "active", intent: "medium" },
];

const knowledgeBase = [
  { id: 1, title: "Getting Started with Engagely", type: "document", updatedAt: "2 days ago", words: 1240, status: "published" },
  { id: 2, title: "Product Pricing & Features", type: "document", updatedAt: "1 week ago", words: 890, status: "published" },
  { id: 3, title: "API Integration Guide", type: "document", updatedAt: "3 days ago", words: 2100, status: "published" },
  { id: 4, title: "Common FAQs", type: "url", updatedAt: "2 weeks ago", words: 0, status: "published" },
];

const integrations = [
  { id: 1, name: "Salesforce", status: "connected", icon: "🔵", lastSync: "5m ago" },
  { id: 2, name: "HubSpot", status: "connected", icon: "🟠", lastSync: "2h ago" },
  { id: 3, name: "Google Calendar", status: "connected", icon: "📅", lastSync: "30m ago" },
  { id: 4, name: "Slack", status: "connected", icon: "💬", lastSync: "1m ago" },
  { id: 5, name: "Zapier", status: "available", icon: "⚡" },
  { id: 6, name: "Intercom", status: "available", icon: "💙" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  const navItems = [
    { key: "analytics", icon: BarChart3, label: "Analytics" },
    { key: "conversations", icon: MessageSquare, label: "Conversations", badge: 3 },
    { key: "knowledge", icon: BookOpen, label: "Knowledge Base" },
    { key: "integrations", icon: Plug, label: "Integrations" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground flex flex-col border-r-2 border-foreground">
        <div className="px-5 py-5 border-b-2 border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-accent rounded-xl border-2 border-white/30 flex items-center justify-center">
              <span className="text-white font-extrabold text-lg font-heading">E</span>
            </div>
            <span className="text-xl font-extrabold text-white font-heading">Engagely</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.key} onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm bounce-transition ${activeTab === item.key ? "bg-accent text-white border-2 border-white/20 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]" : "text-white/60 hover:bg-white/10"}`}>
                <Icon className="w-5 h-5" strokeWidth={2.5} />
                <span>{item.label}</span>
                {item.badge ? <span className="ml-auto bg-secondary text-white text-xs px-2 py-0.5 rounded-full font-extrabold border border-white/20">{item.badge}</span> : null}
              </button>
            );
          })}
          <Link href="/flow-builder" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/10 bounce-transition font-bold text-sm">
            <Workflow className="w-5 h-5" strokeWidth={2.5} /><span>Flow Builder</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/10 bounce-transition font-bold text-sm">
            <Settings className="w-5 h-5" strokeWidth={2.5} /><span>Settings</span>
          </Link>
        </nav>

        <div className="px-4 py-4 border-t-2 border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tertiary rounded-full border-2 border-white/30 flex items-center justify-center">
              <span className="text-foreground text-sm font-extrabold">AK</span>
            </div>
            <div><div className="text-sm font-bold text-white">Alex Kim</div><div className="text-xs text-white/50">alex@company.com</div></div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b-2 border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-extrabold text-foreground font-heading">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              {activeTab === "analytics" && (
                <div className="flex items-center gap-2 px-4 py-2 bg-muted border-2 border-border rounded-full text-sm font-bold text-foreground">
                  <Calendar className="w-4 h-4" /><span>Last 30 days</span><ChevronDown className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-fg" />
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-muted border-2 border-border rounded-full text-sm outline-none focus:border-accent focus:shadow-hard-violet bounce-transition font-medium" />
              </div>
              <button className="relative p-2 border-2 border-border rounded-full hover:bg-muted bounce-transition">
                <Bell className="w-5 h-5 text-foreground" strokeWidth={2.5} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-card" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Analytics */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-5">
                {[
                  { label: "Total Visitors", value: "2,847", change: "12.5%", icon: Users, color: "shadow-hard-violet" },
                  { label: "Engaged", value: "40.1%", change: "8.2%", icon: MessageSquare, color: "shadow-hard-pink" },
                  { label: "Meetings Booked", value: "89", change: "24.1%", icon: Calendar, color: "shadow-hard-yellow" },
                  { label: "Avg Session", value: "4m 32s", change: "5.4%", icon: Clock, color: "shadow-hard" },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className={`bg-card rounded-2xl p-6 border-2 border-foreground ${m.color} hover:-translate-y-1 bounce-transition`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-muted-fg">{m.label}</span>
                        <div className="w-8 h-8 bg-muted rounded-full border-2 border-border flex items-center justify-center">
                          <Icon className="w-4 h-4 text-muted-fg" strokeWidth={2.5} />
                        </div>
                      </div>
                      <div className="text-3xl font-extrabold text-foreground font-heading">{m.value}</div>
                      <div className="flex items-center gap-1 mt-2 text-quaternary text-sm font-bold">
                        <TrendingUp className="w-4 h-4" strokeWidth={2.5} /><span>{m.change}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-card rounded-2xl p-6 border-2 border-foreground shadow-hard-lg">
                  <h3 className="text-lg font-extrabold text-foreground mb-4 font-heading">Engagement Trend</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="date" stroke="#64748B" fontSize={12} fontWeight={600} />
                      <YAxis stroke="#64748B" fontSize={12} fontWeight={600} />
                      <Tooltip contentStyle={{ backgroundColor: "#FFFDF5", border: "2px solid #1E293B", borderRadius: "12px", fontSize: "12px", fontWeight: 600, boxShadow: "4px 4px 0px #1E293B" }} />
                      <Line type="monotone" dataKey="visitors" stroke="#1E293B" strokeWidth={3} dot={{ fill: "#1E293B", r: 5, strokeWidth: 2 }} name="Visitors" />
                      <Line type="monotone" dataKey="engaged" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: "#8B5CF6", r: 5, strokeWidth: 2 }} name="Engaged" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-card rounded-2xl p-6 border-2 border-foreground shadow-hard-pink">
                  <h3 className="text-lg font-extrabold text-foreground mb-4 font-heading">Intent Score</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={intentData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" strokeWidth={2} stroke="#1E293B">
                        {intentData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-3 space-y-2">
                    {intentData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full border-2 border-foreground" style={{ backgroundColor: item.color }} />
                          <span className="font-medium text-muted-fg">{item.name}</span>
                        </div>
                        <span className="font-extrabold text-foreground">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl border-2 border-foreground shadow-hard-lg">
                <div className="px-6 py-4 border-b-2 border-border"><h3 className="text-lg font-extrabold text-foreground font-heading">High-Intent Visitors</h3></div>
                <table className="w-full">
                  <thead><tr className="border-b-2 border-border">
                    {["Email", "Company", "Score", "Last Active", "Top Question", ""].map((h) => <th key={h} className="px-6 py-3 text-left text-xs font-extrabold text-muted-fg uppercase tracking-widest">{h}</th>)}
                  </tr></thead>
                  <tbody className="divide-y-2 divide-border">
                    {highIntentVisitors.map((v, i) => (
                      <tr key={i} className="hover:bg-muted bounce-transition">
                        <td className="px-6 py-4 text-sm font-bold text-foreground">{v.email}</td>
                        <td className="px-6 py-4 text-sm text-muted-fg font-medium">{v.company}</td>
                        <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="w-12 h-2.5 bg-muted rounded-full border border-border overflow-hidden"><div className="h-full bg-accent rounded-full" style={{ width: `${v.score}%` }} /></div><span className="text-sm font-extrabold text-foreground">{v.score}</span></div></td>
                        <td className="px-6 py-4 text-sm text-muted-fg font-medium">{v.lastActive}</td>
                        <td className="px-6 py-4 text-sm text-muted-fg font-medium">{v.topQuestion}</td>
                        <td className="px-6 py-4"><button className="px-4 py-1.5 bg-accent text-white text-xs font-bold rounded-full border-2 border-foreground shadow-hard-active hover:shadow-hard bounce-transition">Reach out</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Conversations */}
          {activeTab === "conversations" && (
            <div className="grid grid-cols-3 gap-6 h-[calc(100vh-180px)]">
              <div className="bg-card rounded-2xl border-2 border-foreground shadow-hard overflow-hidden flex flex-col">
                <div className="p-4 border-b-2 border-border flex items-center justify-between">
                  <h3 className="font-extrabold text-foreground font-heading">Conversations</h3>
                  <button className="p-2 border-2 border-border rounded-full hover:bg-muted bounce-transition"><Filter className="w-4 h-4" strokeWidth={2.5} /></button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {conversations.map((conv) => (
                    <button key={conv.id} onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full p-4 border-b-2 border-border hover:bg-tertiary/10 bounce-transition text-left ${selectedConversation === conv.id ? "bg-accent/5" : ""}`}>
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={conv.avatar} alt={conv.visitor} className="w-10 h-10 rounded-full border-2 border-foreground object-cover" />
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card ${conv.status === "active" ? "bg-quaternary" : conv.status === "waiting" ? "bg-tertiary" : "bg-muted-fg"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5"><span className="font-bold text-sm text-foreground truncate">{conv.visitor}</span><span className="text-[10px] text-muted-fg font-medium ml-2">{conv.time}</span></div>
                          <p className="text-xs text-muted-fg font-medium">{conv.company}</p>
                          <p className="text-sm text-muted-fg truncate mt-0.5">{conv.lastMessage}</p>
                        </div>
                        {conv.unread > 0 && <div className="w-5 h-5 bg-secondary rounded-full border-2 border-foreground flex items-center justify-center text-white text-[10px] font-extrabold">{conv.unread}</div>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-span-2 bg-card rounded-2xl border-2 border-foreground shadow-hard-pink flex flex-col">
                {selectedConversation ? (
                  <>
                    <div className="p-4 border-b-2 border-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={conversations.find((c) => c.id === selectedConversation)?.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-foreground object-cover" />
                        <div><h3 className="font-extrabold text-foreground font-heading">{conversations.find((c) => c.id === selectedConversation)?.visitor}</h3><p className="text-xs text-muted-fg font-medium">{conversations.find((c) => c.id === selectedConversation)?.company}</p></div>
                        <span className="ml-3 px-3 py-1 rounded-full text-xs font-extrabold border-2 border-foreground bg-accent/10 text-accent">{conversations.find((c) => c.id === selectedConversation)?.intent?.toUpperCase()} INTENT</span>
                      </div>
                      <button className="p-2 border-2 border-border rounded-full hover:bg-muted bounce-transition"><MoreVertical className="w-5 h-5" strokeWidth={2.5} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-dots">
                      <div className="flex justify-start"><div className="bg-card rounded-2xl rounded-tl-none px-4 py-3 max-w-[70%] border-2 border-foreground shadow-hard"><p className="text-sm font-medium text-foreground">Hi! I&apos;m interested in Engagely for my team.</p></div></div>
                      <div className="flex justify-end"><div className="bg-accent rounded-2xl rounded-tr-none px-4 py-3 max-w-[70%] border-2 border-foreground shadow-hard-pink"><p className="text-sm font-medium text-white">Great! What&apos;s your current team size?</p></div></div>
                    </div>
                    <div className="p-4 border-t-2 border-border">
                      <div className="flex items-center gap-3">
                        <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-3 bg-muted border-2 border-border rounded-full outline-none focus:border-accent focus:shadow-hard-violet bounce-transition text-sm font-medium" />
                        <button className="p-3 bg-accent text-white rounded-full border-2 border-foreground shadow-hard hover:shadow-hard-hover bounce-transition"><Send className="w-5 h-5" strokeWidth={2.5} /></button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center"><div className="text-center"><MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-fg/30" strokeWidth={2.5} /><p className="text-muted-fg font-bold">Select a conversation</p></div></div>
                )}
              </div>
            </div>
          )}

          {/* Knowledge Base */}
          {activeTab === "knowledge" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-fg font-medium">Manage the information your AI agent uses</p>
                <button className="px-5 py-2.5 bg-accent text-white rounded-full border-2 border-foreground shadow-hard hover:shadow-hard-hover bounce-transition font-bold text-sm flex items-center gap-2"><Plus className="w-4 h-4" strokeWidth={2.5} /> Add Document</button>
              </div>
              <div className="bg-card rounded-2xl border-2 border-foreground shadow-hard-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted"><tr>{["Title", "Type", "Words", "Status", "Updated", ""].map((h) => <th key={h} className="px-6 py-3 text-left text-xs font-extrabold text-muted-fg uppercase tracking-widest">{h}</th>)}</tr></thead>
                  <tbody className="divide-y-2 divide-border">
                    {knowledgeBase.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/50 bounce-transition">
                        <td className="px-6 py-4"><div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-xl border-2 border-foreground flex items-center justify-center ${item.type === "document" ? "bg-blue-100" : "bg-green-100"}`}>{item.type === "document" ? <FileText className="w-5 h-5 text-blue-600" strokeWidth={2.5} /> : <Link2 className="w-5 h-5 text-green-600" strokeWidth={2.5} />}</div><span className="text-sm font-bold text-foreground">{item.title}</span></div></td>
                        <td className="px-6 py-4 text-sm text-muted-fg font-medium capitalize">{item.type}</td>
                        <td className="px-6 py-4 text-sm text-muted-fg font-medium">{item.words > 0 ? `${item.words}` : "-"}</td>
                        <td className="px-6 py-4"><span className="px-3 py-1 bg-quaternary/20 text-foreground rounded-full text-xs font-extrabold border-2 border-foreground">{item.status}</span></td>
                        <td className="px-6 py-4 text-sm text-muted-fg font-medium">{item.updatedAt}</td>
                        <td className="px-6 py-4"><div className="flex items-center gap-1">{[Eye, Edit, Trash2].map((Icon, idx) => <button key={idx} className="p-2 hover:bg-muted rounded-full bounce-transition"><Icon className={`w-4 h-4 ${idx === 2 ? "text-secondary" : "text-muted-fg"}`} strokeWidth={2.5} /></button>)}</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-card rounded-2xl border-2 border-dashed border-foreground/30 p-12 text-center">
                <Upload className="w-12 h-12 text-muted-fg mx-auto mb-4" strokeWidth={2.5} />
                <h3 className="text-lg font-extrabold text-foreground mb-2 font-heading">Upload Documents</h3>
                <p className="text-muted-fg font-medium mb-4">Drop files here or click to browse</p>
                <button className="px-6 py-3 bg-muted text-foreground rounded-full border-2 border-foreground shadow-hard hover:shadow-hard-hover bounce-transition font-bold">Choose Files</button>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-fg font-medium">Connect Engagely with your tools</p>
                <Link href="/integrations" className="px-5 py-2.5 bg-accent text-white rounded-full border-2 border-foreground shadow-hard hover:shadow-hard-hover bounce-transition font-bold text-sm">Browse All</Link>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-foreground mb-4 font-heading">Connected</h3>
                <div className="grid grid-cols-3 gap-5">
                  {integrations.filter((i) => i.status === "connected").map((ig) => (
                    <div key={ig.id} className="bg-card rounded-2xl p-5 border-2 border-quaternary shadow-hard hover:-translate-y-1 bounce-transition">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3"><div className="text-2xl">{ig.icon}</div><div><h4 className="font-extrabold text-foreground font-heading">{ig.name}</h4><p className="text-[10px] text-muted-fg font-medium">Sync: {ig.lastSync}</p></div></div>
                        <span className="flex items-center gap-1 px-2 py-1 bg-quaternary/20 text-foreground rounded-full text-[10px] font-extrabold border border-foreground"><Check className="w-3 h-3" /> On</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-muted text-foreground rounded-full text-sm font-bold border-2 border-border hover:bg-tertiary bounce-transition">Configure</button>
                        <button className="px-3 py-2 bg-muted text-secondary rounded-full text-sm border-2 border-border hover:bg-secondary/10 bounce-transition"><X className="w-4 h-4" strokeWidth={2.5} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-foreground mb-4 font-heading">Available</h3>
                <div className="grid grid-cols-3 gap-5">
                  {integrations.filter((i) => i.status === "available").map((ig) => (
                    <div key={ig.id} className="bg-card rounded-2xl p-5 border-2 border-foreground shadow-hard hover:shadow-hard-violet hover:-translate-y-1 bounce-transition">
                      <div className="flex items-center gap-3 mb-3"><div className="text-2xl">{ig.icon}</div><div><h4 className="font-extrabold text-foreground font-heading">{ig.name}</h4><p className="text-[10px] text-muted-fg font-medium">Not connected</p></div></div>
                      <button className="w-full px-3 py-2 bg-accent text-white rounded-full text-sm font-bold border-2 border-foreground shadow-hard-active hover:shadow-hard bounce-transition">Connect</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
