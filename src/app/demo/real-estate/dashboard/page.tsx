"use client";

import {
  BarChart3, Users, Home, TrendingUp, Calendar, Search, Bell, ChevronDown,
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
  { name: "Ready to Buy", value: 28, color: "#000000" },
  { name: "Actively Looking", value: 35, color: "#525252" },
  { name: "Early Research", value: 22, color: "#A3A3A3" },
  { name: "Just Browsing", value: 15, color: "#E5E5E5" },
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
    id: 1, name: "Sarah Mitchell", email: "sarah.mitchell@gmail.com", phone: "+44 7911 234567",
    score: 96, status: "Hot", area: "Chelsea, SW3", budget: "£1M – £2M", beds: "3–4 bed",
    type: "First-time buyer", lastActive: "3m ago", messages: 14,
    topQuestion: "Victorian townhouse viewings this weekend?",
    interests: ["Period properties", "Garden", "Near good schools"],
    suggestedActions: ["Book weekend viewing", "Send Chelsea property brochure", "Add to premium mailing list"],
    conversationSummary: "Looking for a family home in Chelsea. Has 2 children starting school in September. Pre-approved mortgage up to £1.8M with Barclays. Very engaged — asked about 5 specific properties.",
  },
  {
    id: 2, name: "James Crawford", email: "j.crawford@techco.io", phone: "+44 7700 900123",
    score: 91, status: "Hot", area: "Canary Wharf, E14", budget: "£500k – £800k", beds: "2 bed",
    type: "Investor", lastActive: "12m ago", messages: 8,
    topQuestion: "Rental yield on riverside apartments?",
    interests: ["High rental yield", "New build", "Transport links"],
    suggestedActions: ["Send investment analysis", "Schedule call with investment team", "Share rental yield data"],
    conversationSummary: "Buy-to-let investor looking for high yield. Already owns 2 properties in Manchester. Wants London exposure. Interested in Canary Wharf and Stratford areas.",
  },
  {
    id: 3, name: "Emma & David Park", email: "emma.park@outlook.com", phone: "+44 7456 789012",
    score: 87, status: "Warm", area: "Richmond, TW9", budget: "£1.2M – £1.8M", beds: "4–5 bed",
    type: "Upsizer", lastActive: "1h ago", messages: 11,
    topQuestion: "Family homes near Richmond Park?",
    interests: ["Large garden", "Close to park", "Good state schools"],
    suggestedActions: ["Send Richmond market report", "Book Saturday viewing", "Connect with mortgage adviser"],
    conversationSummary: "Young family upsizing from a 2-bed in Clapham. 3 children, need space and good schools. Visited Richmond Park area last weekend and loved it. Selling current property through another agent.",
  },
  {
    id: 4, name: "Olivia Chen", email: "olivia.chen@hsbc.com", phone: "+44 7890 123456",
    score: 82, status: "Warm", area: "Shoreditch, E2", budget: "£400k – £600k", beds: "1–2 bed",
    type: "First-time buyer", lastActive: "2h ago", messages: 6,
    topQuestion: "Help to Buy eligible properties?",
    interests: ["Modern interior", "Transport links", "Gym/amenities"],
    suggestedActions: ["Send first-time buyer guide", "Share Help to Buy properties", "Notify of new Shoreditch listings"],
    conversationSummary: "First-time buyer working in finance. Interested in Shoreditch loft-style properties. Asked about Help to Buy scheme eligibility and shared ownership options.",
  },
  {
    id: 5, name: "Richard Beaumont", email: "r.beaumont@law.co.uk", phone: "+44 7234 567890",
    score: 68, status: "Cool", area: "Hampstead, N2", budget: "£3M+", beds: "6+ bed",
    type: "Downsizer", lastActive: "1d ago", messages: 3,
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

const mono = { fontFamily: "var(--font-jetbrains), monospace" };
const serif = { fontFamily: "var(--font-source-serif), Georgia, serif" };
const display = { fontFamily: "var(--font-playfair), Georgia, serif" };

const tooltipStyle = { backgroundColor: "#fff", border: "2px solid #000", borderRadius: "0px", fontSize: "11px", fontFamily: "monospace" };

// --- Component ---

export default function RealEstateDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLead, setSelectedLead] = useState<number | null>(null);

  const lead = leads.find((l) => l.id === selectedLead);

  return (
    <div className="flex h-screen bg-white" style={serif}>
      {/* Sidebar */}
      <aside className="w-60 bg-black flex flex-col flex-shrink-0 border-r-2 border-black">
        <div className="px-5 py-5 border-b border-white/15">
          <Link href="/demo/real-estate" className="flex items-center gap-2.5">
            <div className="w-8 h-8 border-2 border-white flex items-center justify-center">
              <span className="text-white text-sm italic" style={{ ...display, fontWeight: 700 }}>P</span>
            </div>
            <div>
              <span className="text-sm text-white tracking-tight" style={{ ...display, fontWeight: 700 }}>Prestige Properties</span>
              <p className="text-[9px] text-neutral-500 tracking-widest uppercase" style={mono}>Engagely Dashboard</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
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
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-100 ${
                  activeTab === item.key
                    ? "bg-white text-black"
                    : "text-neutral-500 hover:text-white"
                }`}
                style={serif}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-[10px] px-2 py-0.5 ${
                    activeTab === item.key ? "bg-black text-white" : "border border-neutral-700 text-neutral-500"
                  }`} style={mono}>{item.badge}</span>
                )}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/10">
            <Link href="/demo/real-estate" className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:text-white transition-all duration-100 text-sm" style={serif}>
              <Eye className="w-4 h-4" strokeWidth={1.5} />
              <span>View Live Site</span>
            </Link>
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:text-white transition-all duration-100 text-sm" style={serif}>
              <Home className="w-4 h-4" strokeWidth={1.5} />
              <span>Back to Engagely</span>
            </Link>
          </div>
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-white flex items-center justify-center text-white text-[10px] tracking-widest uppercase" style={mono}>MP</div>
            <div>
              <div className="text-sm text-white" style={serif}>Marcus Price</div>
              <div className="text-[10px] text-neutral-500 tracking-widest uppercase" style={mono}>Agency Owner</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-neutral-50">
        {/* Header */}
        <header className="bg-white border-b-2 border-black px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl tracking-tight text-black" style={{ ...display, fontWeight: 700 }}>
                {activeTab === "overview" && "Analytics Overview"}
                {activeTab === "leads" && "Lead Intelligence"}
                {activeTab === "conversations" && "Conversations"}
                {activeTab === "actions" && "Suggested Actions"}
              </h1>
              <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-black text-[11px] text-black tracking-widest uppercase" style={mono}>
                <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} /> Last 30 days <ChevronDown className="w-3 h-3" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" strokeWidth={1.5} />
                <input type="text" placeholder="Search leads..." className="pl-9 pr-4 py-2 border-b-2 border-black bg-transparent text-sm outline-none focus:border-b-4 transition-all w-56 placeholder:text-neutral-400 placeholder:italic" style={serif} />
              </div>
              <button className="relative p-2 border-2 border-black hover:bg-black hover:text-white transition-all duration-100 text-black">
                <Bell className="w-5 h-5" strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] font-bold flex items-center justify-center" style={mono}>3</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Metric cards */}
              <div className="grid grid-cols-4 gap-0">
                {[
                  { label: "Website Visitors", value: "2,187", change: "+18.3%", icon: Users },
                  { label: "AI Conversations", value: "786", change: "+42.1%", icon: MessageSquare },
                  { label: "Viewings Booked", value: "52", change: "+67.5%", icon: Calendar },
                  { label: "Hot Leads", value: "23", change: "+31.2%", icon: Target },
                ].map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className={`bg-white p-6 border-2 border-black ${i > 0 ? "-ml-[2px]" : ""} group hover:bg-black transition-all duration-100`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] text-neutral-500 group-hover:text-neutral-400 tracking-widest uppercase" style={mono}>{m.label}</span>
                        <Icon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-500" strokeWidth={1.5} />
                      </div>
                      <div className="text-3xl text-black group-hover:text-white tracking-tight" style={{ ...display, fontWeight: 700 }}>{m.value}</div>
                      <div className="flex items-center gap-1.5 mt-2 text-neutral-500 group-hover:text-neutral-400 text-[11px]" style={mono}>
                        <TrendingUp className="w-3 h-3" strokeWidth={1.5} /> {m.change}
                        <span className="text-neutral-400">vs last month</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-white p-6 border-2 border-black">
                  <h3 className="text-base tracking-tight text-black mb-4" style={{ ...display, fontWeight: 700 }}>Engagement Trend</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={engagementData}>
                      <CartesianGrid stroke="#E5E5E5" strokeDasharray="none" />
                      <XAxis dataKey="date" stroke="#525252" fontSize={11} fontFamily="monospace" />
                      <YAxis stroke="#525252" fontSize={11} fontFamily="monospace" />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line type="monotone" dataKey="visitors" stroke="#A3A3A3" strokeWidth={1.5} dot={{ r: 3, fill: "#fff", stroke: "#A3A3A3", strokeWidth: 1.5 }} name="Visitors" />
                      <Line type="monotone" dataKey="conversations" stroke="#000000" strokeWidth={2.5} dot={{ r: 4, fill: "#000", stroke: "#000" }} name="AI Conversations" />
                      <Line type="monotone" dataKey="viewings" stroke="#525252" strokeWidth={1.5} dot={{ r: 3, fill: "#fff", stroke: "#525252", strokeWidth: 1.5 }} name="Viewings Booked" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 border-2 border-black">
                  <h3 className="text-base tracking-tight text-black mb-4" style={{ ...display, fontWeight: 700 }}>Visitor Intent</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={intentBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="#000" strokeWidth={1}>
                        {intentBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2.5 mt-3">
                    {intentBreakdown.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border border-black" style={{ backgroundColor: item.color }} />
                          <span className="text-neutral-600" style={serif}>{item.name}</span>
                        </div>
                        <span className="text-black" style={{ ...mono, fontWeight: 500 }}>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Area + Budget */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 border-2 border-black">
                  <h3 className="text-base tracking-tight text-black mb-4 flex items-center gap-2" style={{ ...display, fontWeight: 700 }}>
                    <MapPin className="w-4 h-4" strokeWidth={1.5} /> Area Interest
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={areaInterest} layout="vertical">
                      <CartesianGrid stroke="#E5E5E5" strokeDasharray="none" horizontal={false} />
                      <XAxis type="number" stroke="#525252" fontSize={11} fontFamily="monospace" />
                      <YAxis type="category" dataKey="area" stroke="#525252" fontSize={11} fontFamily="monospace" width={80} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="count" fill="#000000" radius={0} name="Enquiries" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 border-2 border-black">
                  <h3 className="text-base tracking-tight text-black mb-4 flex items-center gap-2" style={{ ...display, fontWeight: 700 }}>
                    <PoundSterling className="w-4 h-4" strokeWidth={1.5} /> Budget Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={budgetBreakdown}>
                      <CartesianGrid stroke="#E5E5E5" strokeDasharray="none" />
                      <XAxis dataKey="range" stroke="#525252" fontSize={11} fontFamily="monospace" />
                      <YAxis stroke="#525252" fontSize={11} fontFamily="monospace" />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="count" fill="#000000" radius={0} name="Leads" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent conversations */}
              <div className="bg-white border-2 border-black">
                <div className="px-6 py-4 border-b-2 border-black flex items-center justify-between">
                  <h3 className="text-base tracking-tight text-black" style={{ ...display, fontWeight: 700 }}>Recent Conversations</h3>
                  <button className="text-[10px] text-black uppercase tracking-widest hover:underline underline-offset-4" style={mono} onClick={() => setActiveTab("conversations")}>View all &rarr;</button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-black">
                      {["Visitor", "Started", "Duration", "Messages", "Intent", "Outcome"].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-[10px] text-neutral-500 uppercase tracking-widest" style={mono}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentConversations.map((conv) => (
                      <tr key={conv.id} className="border-b border-neutral-200 hover:bg-black hover:text-white transition-all duration-100 group">
                        <td className="px-6 py-3 text-sm text-black group-hover:text-white" style={serif}>{conv.visitor}</td>
                        <td className="px-6 py-3 text-[11px] text-neutral-500 group-hover:text-neutral-400" style={mono}>{conv.startedAt}</td>
                        <td className="px-6 py-3 text-[11px] text-neutral-500 group-hover:text-neutral-400" style={mono}>{conv.duration}</td>
                        <td className="px-6 py-3 text-[11px] text-neutral-500 group-hover:text-neutral-400" style={mono}>{conv.messages}</td>
                        <td className="px-6 py-3">
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-1 ${
                            conv.intent === "High" ? "bg-black text-white group-hover:bg-white group-hover:text-black" : "border border-neutral-300 text-neutral-500 group-hover:border-neutral-600"
                          }`} style={mono}>{conv.intent}</span>
                        </td>
                        <td className="px-6 py-3 text-sm text-neutral-600 group-hover:text-neutral-300" style={serif}>{conv.outcome}</td>
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
              <div className="col-span-2 bg-white border-2 border-black flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b-2 border-black flex items-center justify-between flex-shrink-0">
                  <h3 className="text-sm tracking-tight text-black" style={{ ...display, fontWeight: 700 }}>All Leads ({leads.length})</h3>
                  <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all duration-100"><Filter className="w-4 h-4" strokeWidth={1.5} /></button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {leads.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setSelectedLead(l.id)}
                      className={`w-full px-5 py-4 border-b border-neutral-200 text-left hover:bg-neutral-100 transition-all duration-100 ${selectedLead === l.id ? "bg-black text-white" : ""}`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 flex items-center justify-center text-[10px] tracking-widest uppercase ${
                            selectedLead === l.id ? "border-2 border-white text-white" : "border-2 border-black text-black"
                          }`} style={mono}>
                            {l.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className={`text-sm ${selectedLead === l.id ? "text-white" : "text-black"}`} style={{ ...display, fontWeight: 600 }}>{l.name}</p>
                            <p className={`text-[10px] tracking-widest uppercase ${selectedLead === l.id ? "text-neutral-400" : "text-neutral-500"}`} style={mono}>{l.type} &middot; {l.area}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm ${selectedLead === l.id ? "text-white" : "text-black"}`} style={{ ...display, fontWeight: 700 }}>{l.score}</span>
                          <p className={`text-[9px] tracking-widest uppercase ${selectedLead === l.id ? "text-neutral-500" : "text-neutral-400"}`} style={mono}>{l.lastActive}</p>
                        </div>
                      </div>
                      <p className={`text-xs italic truncate mt-1.5 ${selectedLead === l.id ? "text-neutral-400" : "text-neutral-500"}`} style={serif}>&ldquo;{l.topQuestion}&rdquo;</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lead detail */}
              <div className="col-span-3 overflow-y-auto">
                {lead ? (
                  <div className="space-y-5">
                    {/* Lead header */}
                    <div className="bg-white border-2 border-black p-6">
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 border-2 border-black flex items-center justify-center text-sm tracking-widest uppercase" style={mono}>
                            {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <h2 className="text-2xl tracking-tight text-black" style={{ ...display, fontWeight: 700 }}>{lead.name}</h2>
                            <p className="text-[10px] text-neutral-500 tracking-widest uppercase mt-0.5" style={mono}>{lead.type} &middot; {lead.area}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-black text-white" style={mono}>{lead.status}</span>
                            <span className="text-3xl text-black tracking-tight" style={{ ...display, fontWeight: 700 }}>{lead.score}</span>
                          </div>
                          <p className="text-[9px] text-neutral-400 tracking-widest uppercase mt-1" style={mono}>Intent Score</p>
                        </div>
                      </div>
                      <div className="border-t-2 border-black pt-4 grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-600" style={serif}>
                          <Mail className="w-4 h-4 text-neutral-400" strokeWidth={1.5} /> {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600" style={serif}>
                          <Phone className="w-4 h-4 text-neutral-400" strokeWidth={1.5} /> {lead.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600" style={serif}>
                          <MessageSquare className="w-4 h-4 text-neutral-400" strokeWidth={1.5} /> {lead.messages} messages
                        </div>
                      </div>
                    </div>

                    {/* AI Summary */}
                    <div className="bg-black text-white p-6 border-2 border-black">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-white" strokeWidth={1.5} />
                        <h3 className="text-sm tracking-tight" style={{ ...display, fontWeight: 700 }}>AI Conversation Summary</h3>
                      </div>
                      <p className="text-sm text-neutral-300 leading-relaxed" style={serif}>{lead.conversationSummary}</p>
                    </div>

                    {/* What they want */}
                    <div className="grid grid-cols-2 gap-0">
                      <div className="bg-white border-2 border-black p-5">
                        <h3 className="text-xs tracking-widest uppercase text-neutral-500 mb-4" style={mono}>Property Requirements</h3>
                        <div className="space-y-3">
                          {[
                            { label: "Budget", val: lead.budget },
                            { label: "Bedrooms", val: lead.beds },
                            { label: "Area", val: lead.area },
                            { label: "Buyer Type", val: lead.type },
                          ].map((row) => (
                            <div key={row.label} className="flex items-center justify-between text-sm border-b border-neutral-200 pb-2 last:border-0 last:pb-0">
                              <span className="text-neutral-500" style={serif}>{row.label}</span>
                              <span className="text-black" style={{ ...serif, fontWeight: 600 }}>{row.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white border-2 border-black -ml-[2px] p-5">
                        <h3 className="text-xs tracking-widest uppercase text-neutral-500 mb-4" style={mono}>Key Interests</h3>
                        <div className="flex flex-wrap gap-2">
                          {lead.interests.map((interest) => (
                            <span key={interest} className="px-3 py-1.5 border-2 border-black text-black text-xs" style={serif}>{interest}</span>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t-2 border-black">
                          <p className="text-[10px] text-neutral-500 tracking-widest uppercase mb-1" style={mono}>Top Question</p>
                          <p className="text-sm text-black italic" style={{ ...display }}>&ldquo;{lead.topQuestion}&rdquo;</p>
                        </div>
                      </div>
                    </div>

                    {/* Suggested actions */}
                    <div className="bg-white border-2 border-black p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-4 h-4 text-black" strokeWidth={1.5} />
                        <h3 className="text-xs tracking-widest uppercase text-neutral-500" style={mono}>Suggested Next Steps</h3>
                      </div>
                      <div className="space-y-0">
                        {lead.suggestedActions.map((action, i) => (
                          <button key={i} className="w-full flex items-center justify-between px-4 py-3 border-2 border-black -mt-[2px] first:mt-0 hover:bg-black hover:text-white transition-all duration-100 group">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 border border-black group-hover:border-white flex items-center justify-center transition-all duration-100">
                                {i === 0 ? <Calendar className="w-3 h-3" strokeWidth={1.5} /> : i === 1 ? <Send className="w-3 h-3" strokeWidth={1.5} /> : <FileText className="w-3 h-3" strokeWidth={1.5} />}
                              </div>
                              <span className="text-sm" style={serif}>{action}</span>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-all duration-100" strokeWidth={1.5} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex items-center gap-0">
                      <button className="flex-1 py-3 bg-black text-white text-xs uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-all duration-100 flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" strokeWidth={1.5} /> Call Lead
                      </button>
                      <button className="flex-1 py-3 bg-white text-black text-xs uppercase tracking-widest border-2 border-black -ml-[2px] hover:bg-black hover:text-white transition-all duration-100 flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" strokeWidth={1.5} /> Send Email
                      </button>
                      <button className="flex-1 py-3 bg-white text-black text-xs uppercase tracking-widest border-2 border-black -ml-[2px] hover:bg-black hover:text-white transition-all duration-100 flex items-center justify-center gap-2">
                        <UserCheck className="w-4 h-4" strokeWidth={1.5} /> Add to CRM
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full bg-white border-2 border-black">
                    <div className="text-center">
                      <Target className="w-12 h-12 mx-auto mb-3 text-neutral-300" strokeWidth={1} />
                      <p className="text-black" style={{ ...display, fontWeight: 600 }}>Select a lead</p>
                      <p className="text-sm text-neutral-500 mt-1" style={serif}>AI-generated insights from their conversations</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CONVERSATIONS TAB */}
          {activeTab === "conversations" && (
            <div className="bg-white border-2 border-black">
              <div className="px-6 py-4 border-b-2 border-black flex items-center justify-between">
                <h3 className="text-base tracking-tight text-black" style={{ ...display, fontWeight: 700 }}>All Conversations <span className="text-neutral-500 text-sm font-normal" style={serif}>(186 this month)</span></h3>
                <button className="px-4 py-2 border-2 border-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-100 flex items-center gap-1.5" style={mono}>
                  <Filter className="w-3.5 h-3.5" strokeWidth={1.5} /> Filter
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    {["Visitor", "Started", "Duration", "Messages", "Intent", "Outcome", ""].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-[10px] text-neutral-500 uppercase tracking-widest" style={mono}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...recentConversations, ...recentConversations].map((conv, i) => (
                    <tr key={i} className="border-b border-neutral-200 hover:bg-black hover:text-white transition-all duration-100 group">
                      <td className="px-6 py-4 text-sm text-black group-hover:text-white" style={serif}>{conv.visitor}</td>
                      <td className="px-6 py-4 text-[11px] text-neutral-500 group-hover:text-neutral-400" style={mono}>{conv.startedAt}</td>
                      <td className="px-6 py-4 text-[11px] text-neutral-500 group-hover:text-neutral-400" style={mono}>{conv.duration}</td>
                      <td className="px-6 py-4 text-[11px] text-neutral-500 group-hover:text-neutral-400" style={mono}>{conv.messages}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] uppercase tracking-widest px-2 py-1 ${
                          conv.intent === "High" ? "bg-black text-white group-hover:bg-white group-hover:text-black" : "border border-neutral-300 text-neutral-500"
                        }`} style={mono}>{conv.intent}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600 group-hover:text-neutral-300" style={serif}>{conv.outcome}</td>
                      <td className="px-6 py-4">
                        <button className="text-[10px] text-black group-hover:text-white uppercase tracking-widest hover:underline underline-offset-4 flex items-center gap-1" style={mono}>View <ChevronRight className="w-3 h-3" strokeWidth={1.5} /></button>
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
              <div className="bg-black text-white p-6 border-2 border-black">
                <h3 className="text-lg tracking-tight mb-1" style={{ ...display, fontWeight: 700 }}>AI-Recommended Actions</h3>
                <p className="text-sm text-neutral-400" style={serif}>Based on today&apos;s conversations, the highest-impact actions to take right now.</p>
              </div>

              <div className="space-y-0">
                {leads.filter((l) => l.score >= 80).flatMap((l) =>
                  l.suggestedActions.map((action, i) => ({
                    lead: l.name, score: l.score, action,
                    priority: i === 0 ? "High" : i === 1 ? "Medium" : "Low",
                    type: i === 0 ? "viewing" : i === 1 ? "email" : "list",
                  }))
                ).sort((a, b) => b.score - a.score).slice(0, 8).map((item, i) => (
                  <div key={i} className="bg-white border-2 border-black -mt-[2px] first:mt-0 p-5 flex items-center justify-between group hover:bg-black hover:text-white transition-all duration-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 border-2 border-black group-hover:border-white flex items-center justify-center transition-all duration-100">
                        {item.type === "viewing" ? <Calendar className="w-5 h-5" strokeWidth={1.5} /> : item.type === "email" ? <Mail className="w-5 h-5" strokeWidth={1.5} /> : <FileText className="w-5 h-5" strokeWidth={1.5} />}
                      </div>
                      <div>
                        <p className="text-sm text-black group-hover:text-white" style={{ ...serif, fontWeight: 600 }}>{item.action}</p>
                        <p className="text-[10px] text-neutral-500 group-hover:text-neutral-400 tracking-widest uppercase" style={mono}>For {item.lead} &middot; Score: {item.score}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-1 ${
                        item.priority === "High" ? "bg-black text-white group-hover:bg-white group-hover:text-black" : "border border-neutral-300 text-neutral-500 group-hover:border-neutral-600"
                      }`} style={mono}>{item.priority}</span>
                      <button className="px-4 py-2 bg-black text-white text-[10px] uppercase tracking-widest border-2 border-black group-hover:bg-white group-hover:text-black transition-all duration-100" style={mono}>
                        Execute &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Integration callouts */}
              <div className="h-[4px] bg-black mt-8" />
              <div className="grid grid-cols-3 gap-0">
                {[
                  { name: "Mailchimp", desc: "Auto-send property alerts to segmented leads based on their budget and area preferences.", connected: true },
                  { name: "HubSpot CRM", desc: "Sync all lead data, conversation summaries, and intent scores directly to your CRM pipeline.", connected: true },
                  { name: "Google Calendar", desc: "Auto-book viewings in your team's calendar when a lead requests one via the AI assistant.", connected: false },
                ].map((integration, i) => (
                  <div key={integration.name} className={`bg-white border-2 border-black p-6 ${i > 0 ? "-ml-[2px]" : ""} group hover:bg-black hover:text-white transition-all duration-100`}>
                    <div className="mb-3">
                      <h4 className="text-sm tracking-tight text-black group-hover:text-white" style={{ ...display, fontWeight: 700 }}>{integration.name}</h4>
                      <span className={`text-[10px] tracking-widest uppercase ${integration.connected ? "text-black group-hover:text-white" : "text-neutral-400"}`} style={mono}>
                        {integration.connected ? "Connected" : "Not connected"}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 group-hover:text-neutral-400 leading-relaxed mb-4" style={serif}>{integration.desc}</p>
                    <button className={`w-full py-2 text-[10px] uppercase tracking-widest border-2 transition-all duration-100 ${
                      integration.connected
                        ? "border-black text-black group-hover:border-white group-hover:text-white"
                        : "bg-black text-white border-black group-hover:bg-white group-hover:text-black"
                    }`} style={mono}>
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
