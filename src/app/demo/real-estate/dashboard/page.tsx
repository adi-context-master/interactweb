"use client";

import {
  BarChart3, Users, Home, TrendingUp, Calendar, Clock, Search, Bell, ChevronDown,
  Mail, Phone, ArrowUpRight, Eye, MessageSquare, Target, Zap, Filter,
  Star, MapPin, PoundSterling, UserCheck, Send, FileText, ChevronRight,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import { useState } from "react";
import Link from "next/link";

// --- Data ---

const engagementData = [
  { date: "Mar 1", visitors: 189, conversations: 67, viewings: 12 },
  { date: "Mar 5", visitors: 224, conversations: 89, viewings: 18 },
  { date: "Mar 10", visitors: 267, conversations: 104, viewings: 22 },
  { date: "Mar 15", visitors: 312, conversations: 128, viewings: 31 },
  { date: "Mar 20", visitors: 356, conversations: 148, viewings: 38 },
  { date: "Mar 25", visitors: 401, conversations: 167, viewings: 45 },
  { date: "Mar 30", visitors: 438, conversations: 186, viewings: 52 },
];

const intentBreakdown = [
  { name: "Ready to Buy", value: 28, color: "#10B981" },
  { name: "Actively Looking", value: 35, color: "#3B82F6" },
  { name: "Early Research", value: 22, color: "#F59E0B" },
  { name: "Just Browsing", value: 15, color: "#E2E8F0" },
];

const areaInterest = [
  { area: "Central", count: 86 },
  { area: "SW London", count: 72 },
  { area: "E London", count: 65 },
  { area: "N London", count: 48 },
  { area: "SE London", count: 34 },
  { area: "W London", count: 28 },
];

const budgetBreakdown = [
  { range: "<£500k", count: 42 },
  { range: "£500k-1M", count: 67 },
  { range: "£1M-3M", count: 54 },
  { range: "£3M+", count: 23 },
];

const leads = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah.mitchell@gmail.com",
    phone: "+44 7911 234567",
    score: 96,
    status: "Hot",
    statusColor: "bg-emerald-500",
    area: "Chelsea, SW3",
    budget: "£1M – £2M",
    beds: "3–4 bed",
    type: "First-time buyer",
    lastActive: "3m ago",
    messages: 14,
    topQuestion: "Victorian townhouse viewings this weekend?",
    interests: ["Period properties", "Garden", "Near good schools"],
    suggestedActions: ["Book weekend viewing", "Send Chelsea property brochure", "Add to premium mailing list"],
    conversationSummary: "Looking for a family home in Chelsea. Has 2 children starting school in September. Pre-approved mortgage up to £1.8M with Barclays. Very engaged — asked about 5 specific properties.",
  },
  {
    id: 2,
    name: "James Crawford",
    email: "j.crawford@techco.io",
    phone: "+44 7700 900123",
    score: 91,
    status: "Hot",
    statusColor: "bg-emerald-500",
    area: "Canary Wharf, E14",
    budget: "£500k – £800k",
    beds: "2 bed",
    type: "Investor",
    lastActive: "12m ago",
    messages: 8,
    topQuestion: "Rental yield on riverside apartments?",
    interests: ["High rental yield", "New build", "Transport links"],
    suggestedActions: ["Send investment analysis", "Schedule call with investment team", "Share rental yield data"],
    conversationSummary: "Buy-to-let investor looking for high yield. Already owns 2 properties in Manchester. Wants London exposure. Interested in Canary Wharf and Stratford areas.",
  },
  {
    id: 3,
    name: "Emma & David Park",
    email: "emma.park@outlook.com",
    phone: "+44 7456 789012",
    score: 87,
    status: "Warm",
    statusColor: "bg-amber-500",
    area: "Richmond, TW9",
    budget: "£1.2M – £1.8M",
    beds: "4–5 bed",
    type: "Upsizer",
    lastActive: "1h ago",
    messages: 11,
    topQuestion: "Family homes near Richmond Park?",
    interests: ["Large garden", "Close to park", "Good state schools"],
    suggestedActions: ["Send Richmond market report", "Book Saturday viewing", "Connect with mortgage adviser"],
    conversationSummary: "Young family upsizing from a 2-bed in Clapham. 3 children, need space and good schools. Visited Richmond Park area last weekend and loved it. Selling current property through another agent.",
  },
  {
    id: 4,
    name: "Olivia Chen",
    email: "olivia.chen@hsbc.com",
    phone: "+44 7890 123456",
    score: 82,
    status: "Warm",
    statusColor: "bg-amber-500",
    area: "Shoreditch, E2",
    budget: "£400k – £600k",
    beds: "1–2 bed",
    type: "First-time buyer",
    lastActive: "2h ago",
    messages: 6,
    topQuestion: "Help to Buy eligible properties?",
    interests: ["Modern interior", "Transport links", "Gym/amenities"],
    suggestedActions: ["Send first-time buyer guide", "Share Help to Buy properties", "Notify of new Shoreditch listings"],
    conversationSummary: "First-time buyer working in finance. Interested in Shoreditch loft-style properties. Asked about Help to Buy scheme eligibility and shared ownership options.",
  },
  {
    id: 5,
    name: "Richard Beaumont",
    email: "r.beaumont@law.co.uk",
    phone: "+44 7234 567890",
    score: 68,
    status: "Cool",
    statusColor: "bg-slate-400",
    area: "Hampstead, N2",
    budget: "£3M+",
    beds: "6+ bed",
    type: "Downsizer",
    lastActive: "1d ago",
    messages: 3,
    topQuestion: "Off-market properties available?",
    interests: ["Off-market", "Prestige address", "Quiet neighbourhood"],
    suggestedActions: ["Add to off-market notification list", "Schedule private consultation", "Send luxury market report"],
    conversationSummary: "Senior partner at a law firm. Currently owns a large home in Surrey, looking to move closer to London for work. Very private, prefers off-market listings. Early stages.",
  },
];

const recentConversations = [
  { id: 1, visitor: "Anonymous (IP: Kensington)", startedAt: "10:32 AM", duration: "4m 22s", messages: 8, intent: "High", outcome: "Viewing requested" },
  { id: 2, visitor: "sarah.mitchell@gmail.com", startedAt: "10:18 AM", duration: "6m 15s", messages: 14, intent: "High", outcome: "Brochure sent" },
  { id: 3, visitor: "Anonymous (IP: Canary Wharf)", startedAt: "9:45 AM", duration: "2m 10s", messages: 4, intent: "Low", outcome: "Browsing only" },
  { id: 4, visitor: "j.crawford@techco.io", startedAt: "9:20 AM", duration: "3m 48s", messages: 8, intent: "High", outcome: "Investment call booked" },
];

// --- Component ---

export default function RealEstateDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLead, setSelectedLead] = useState<number | null>(null);

  const lead = leads.find((l) => l.id === selectedLead);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/demo/real-estate" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <span className="text-base font-bold text-white">Prestige Properties</span>
              <p className="text-[10px] text-slate-400">Engagely Dashboard</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { key: "overview", icon: BarChart3, label: "Overview" },
            { key: "leads", icon: Target, label: "Lead Intelligence", badge: 5 },
            { key: "conversations", icon: MessageSquare, label: "Conversations", badge: 12 },
            { key: "actions", icon: Zap, label: "Suggested Actions", badge: 8 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => { setActiveTab(item.key); setSelectedLead(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === item.key
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${
                    activeTab === item.key ? "bg-white/20 text-white" : "bg-slate-700 text-slate-300"
                  }`}>{item.badge}</span>
                )}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/10">
            <Link href="/demo/real-estate" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors font-medium text-sm">
              <Eye className="w-5 h-5" />
              <span>View Live Site</span>
            </Link>
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors font-medium text-sm">
              <Home className="w-5 h-5" />
              <span>Back to Engagely</span>
            </Link>
          </div>
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">MP</div>
            <div>
              <div className="text-sm font-medium text-white">Marcus Price</div>
              <div className="text-xs text-slate-400">Agency Owner</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-slate-900">
                {activeTab === "overview" && "Analytics Overview"}
                {activeTab === "leads" && "Lead Intelligence"}
                {activeTab === "conversations" && "Conversations"}
                {activeTab === "actions" && "Suggested Actions"}
              </h1>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-slate-600">
                <Calendar className="w-4 h-4" /> Last 30 days <ChevronDown className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search leads..." className="pl-9 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-all w-56" />
              </div>
              <button className="relative p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Metric cards */}
              <div className="grid grid-cols-4 gap-5">
                {[
                  { label: "Website Visitors", value: "2,187", change: "+18.3%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "AI Conversations", value: "786", change: "+42.1%", icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Viewings Booked", value: "52", change: "+67.5%", icon: Calendar, color: "text-violet-600", bg: "bg-violet-50" },
                  { label: "Hot Leads", value: "23", change: "+31.2%", icon: Target, color: "text-amber-600", bg: "bg-amber-50" },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-500">{m.label}</span>
                        <div className={`w-9 h-9 ${m.bg} rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${m.color}`} />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-slate-900">{m.value}</div>
                      <div className="flex items-center gap-1 mt-1 text-emerald-600 text-sm font-medium">
                        <TrendingUp className="w-3.5 h-3.5" /> {m.change}
                        <span className="text-slate-400 font-normal">vs last month</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-3 gap-6">
                {/* Engagement trend */}
                <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Engagement Trend</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
                      <YAxis stroke="#94A3B8" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "12px" }} />
                      <Line type="monotone" dataKey="visitors" stroke="#94A3B8" strokeWidth={2} dot={{ r: 3 }} name="Visitors" />
                      <Line type="monotone" dataKey="conversations" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, fill: "#10B981" }} name="AI Conversations" />
                      <Line type="monotone" dataKey="viewings" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} name="Viewings Booked" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Intent breakdown */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Visitor Intent</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={intentBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value" strokeWidth={0}>
                        {intentBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {intentBreakdown.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-slate-600">{item.name}</span>
                        </div>
                        <span className="font-semibold text-slate-900">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Area + Budget */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Area Interest
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={areaInterest} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                      <XAxis type="number" stroke="#94A3B8" fontSize={12} />
                      <YAxis type="category" dataKey="area" stroke="#94A3B8" fontSize={12} width={80} />
                      <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "12px" }} />
                      <Bar dataKey="count" fill="#10B981" radius={[0, 4, 4, 0]} name="Enquiries" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <PoundSterling className="w-4 h-4 text-emerald-600" /> Budget Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={budgetBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="range" stroke="#94A3B8" fontSize={12} />
                      <YAxis stroke="#94A3B8" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "12px" }} />
                      <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Leads" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent conversations */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">Recent Conversations</h3>
                  <button className="text-sm text-emerald-600 font-medium hover:underline" onClick={() => setActiveTab("conversations")}>View all</button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {["Visitor", "Started", "Duration", "Messages", "Intent", "Outcome"].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentConversations.map((conv) => (
                      <tr key={conv.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-sm text-slate-800 font-medium">{conv.visitor}</td>
                        <td className="px-6 py-3 text-sm text-slate-500">{conv.startedAt}</td>
                        <td className="px-6 py-3 text-sm text-slate-500">{conv.duration}</td>
                        <td className="px-6 py-3 text-sm text-slate-500">{conv.messages}</td>
                        <td className="px-6 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            conv.intent === "High" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                          }`}>{conv.intent}</span>
                        </td>
                        <td className="px-6 py-3 text-sm text-slate-600">{conv.outcome}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* LEADS TAB */}
          {activeTab === "leads" && (
            <div className="grid grid-cols-5 gap-6 h-[calc(100vh-140px)]">
              {/* Lead list */}
              <div className="col-span-2 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                  <h3 className="font-semibold text-slate-900">All Leads ({leads.length})</h3>
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><Filter className="w-4 h-4 text-slate-500" /></button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {leads.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setSelectedLead(l.id)}
                      className={`w-full px-5 py-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors ${selectedLead === l.id ? "bg-emerald-50 border-l-2 border-l-emerald-500" : ""}`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${l.score >= 90 ? "bg-emerald-500" : l.score >= 80 ? "bg-amber-500" : "bg-slate-400"}`}>
                            {l.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{l.name}</p>
                            <p className="text-xs text-slate-500">{l.type} • {l.area}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${l.statusColor}`} />
                            <span className="text-xs font-semibold text-slate-700">{l.score}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">{l.lastActive}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-1">&ldquo;{l.topQuestion}&rdquo;</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lead detail */}
              <div className="col-span-3 overflow-y-auto">
                {lead ? (
                  <div className="space-y-5">
                    {/* Lead header */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold ${lead.score >= 90 ? "bg-emerald-500" : lead.score >= 80 ? "bg-amber-500" : "bg-slate-400"}`}>
                            {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">{lead.name}</h2>
                            <p className="text-sm text-slate-500">{lead.type} • {lead.area}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full text-white ${lead.statusColor}`}>{lead.status} Lead</span>
                            <span className="text-2xl font-bold text-slate-900">{lead.score}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">Intent Score</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="w-4 h-4 text-slate-400" /> {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-4 h-4 text-slate-400" /> {lead.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MessageSquare className="w-4 h-4 text-slate-400" /> {lead.messages} messages
                        </div>
                      </div>
                    </div>

                    {/* AI Summary */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center">
                          <Star className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h3 className="font-semibold text-emerald-900">AI Conversation Summary</h3>
                      </div>
                      <p className="text-sm text-emerald-800 leading-relaxed">{lead.conversationSummary}</p>
                    </div>

                    {/* What they want */}
                    <div className="grid grid-cols-2 gap-5">
                      <div className="bg-white rounded-xl border border-gray-200 p-5">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">Property Requirements</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Budget</span>
                            <span className="font-semibold text-slate-900">{lead.budget}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Bedrooms</span>
                            <span className="font-semibold text-slate-900">{lead.beds}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Area</span>
                            <span className="font-semibold text-slate-900">{lead.area}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Buyer Type</span>
                            <span className="font-semibold text-slate-900">{lead.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 p-5">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">Key Interests</h3>
                        <div className="flex flex-wrap gap-2">
                          {lead.interests.map((interest) => (
                            <span key={interest} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">{interest}</span>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <p className="text-xs text-slate-500 mb-1">Top Question</p>
                          <p className="text-sm text-slate-800 font-medium">&ldquo;{lead.topQuestion}&rdquo;</p>
                        </div>
                      </div>
                    </div>

                    {/* Suggested actions */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <h3 className="text-sm font-semibold text-slate-900">Suggested Next Steps</h3>
                      </div>
                      <div className="space-y-2">
                        {lead.suggestedActions.map((action, i) => (
                          <button key={i} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-lg transition-colors group">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 bg-emerald-100 rounded-md flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                {i === 0 ? <Calendar className="w-3.5 h-3.5 text-emerald-600" /> : i === 1 ? <Send className="w-3.5 h-3.5 text-emerald-600" /> : <FileText className="w-3.5 h-3.5 text-emerald-600" />}
                              </div>
                              <span className="text-sm font-medium text-slate-700">{action}</span>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex items-center gap-3">
                      <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" /> Call Lead
                      </button>
                      <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" /> Send Email
                      </button>
                      <button className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border border-gray-200">
                        <UserCheck className="w-4 h-4" /> Add to CRM
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full bg-white rounded-xl border border-gray-200">
                    <div className="text-center">
                      <Target className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      <p className="text-slate-500 font-medium">Select a lead to see their full profile</p>
                      <p className="text-sm text-slate-400 mt-1">AI-generated insights from their conversations</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CONVERSATIONS TAB */}
          {activeTab === "conversations" && (
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">All Conversations (186 this month)</h3>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-gray-100 text-slate-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> Filter
                  </button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Visitor", "Started", "Duration", "Messages", "Intent", "Outcome", ""].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[...recentConversations, ...recentConversations].map((conv, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-800 font-medium">{conv.visitor}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{conv.startedAt}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{conv.duration}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{conv.messages}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          conv.intent === "High" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                        }`}>{conv.intent}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{conv.outcome}</td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-emerald-600 font-medium hover:underline flex items-center gap-1">View <ChevronRight className="w-3 h-3" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ACTIONS TAB */}
          {activeTab === "actions" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
                <h3 className="text-lg font-bold text-emerald-900 mb-1">AI-Recommended Actions</h3>
                <p className="text-sm text-emerald-700">Based on today&apos;s conversations, here are the highest-impact actions to take right now.</p>
              </div>

              <div className="space-y-3">
                {leads.filter((l) => l.score >= 80).flatMap((l) =>
                  l.suggestedActions.map((action, i) => ({
                    lead: l.name,
                    score: l.score,
                    action,
                    priority: i === 0 ? "High" : i === 1 ? "Medium" : "Low",
                    type: i === 0 ? "viewing" : i === 1 ? "email" : "list",
                  }))
                ).sort((a, b) => b.score - a.score).slice(0, 8).map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        item.type === "viewing" ? "bg-emerald-100" : item.type === "email" ? "bg-blue-100" : "bg-amber-100"
                      }`}>
                        {item.type === "viewing" ? <Calendar className="w-5 h-5 text-emerald-600" /> : item.type === "email" ? <Mail className="w-5 h-5 text-blue-600" /> : <FileText className="w-5 h-5 text-amber-600" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.action}</p>
                        <p className="text-xs text-slate-500">For {item.lead} • Intent score: {item.score}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        item.priority === "High" ? "bg-rose-100 text-rose-700" : item.priority === "Medium" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"
                      }`}>{item.priority}</span>
                      <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
                        Do it
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Integration callouts */}
              <div className="grid grid-cols-3 gap-5 mt-8">
                {[
                  { name: "Mailchimp", desc: "Auto-send property alerts to segmented leads based on their budget and area preferences.", icon: "📧", connected: true },
                  { name: "HubSpot CRM", desc: "Sync all lead data, conversation summaries, and intent scores directly to your CRM pipeline.", icon: "🔶", connected: true },
                  { name: "Google Calendar", desc: "Auto-book viewings in your team's calendar when a lead requests one via the AI assistant.", icon: "📅", connected: false },
                ].map((integration) => (
                  <div key={integration.name} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{integration.name}</h4>
                        <span className={`text-xs font-medium ${integration.connected ? "text-emerald-600" : "text-slate-400"}`}>
                          {integration.connected ? "Connected" : "Not connected"}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{integration.desc}</p>
                    <button className={`mt-3 w-full py-2 text-sm font-medium rounded-lg transition-colors ${
                      integration.connected ? "bg-gray-100 text-slate-600 hover:bg-gray-200" : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}>
                      {integration.connected ? "Configure" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
