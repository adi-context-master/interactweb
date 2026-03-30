"use client";

import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Workflow,
  BookOpen,
  Plug,
  Settings,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  Search,
  Bell,
  ChevronDown,
  Send,
  MoreVertical,
  Filter,
  Plus,
  Upload,
  FileText,
  Link2,
  Trash2,
  Edit,
  Check,
  X,
  Eye,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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
  { name: "High", value: 34, color: "#FF6B5A" },
  { name: "Medium", value: 45, color: "#FFA94D" },
  { name: "Low", value: 21, color: "#E0E0E0" },
];

const highIntentVisitors = [
  { email: "sarah.chen@acme.com", company: "Acme Corp", score: 98, lastActive: "2m ago", topQuestion: "Enterprise pricing?" },
  { email: "james.wilson@techco.io", company: "TechCo", score: 95, lastActive: "5m ago", topQuestion: "API integration" },
  { email: "emily.brown@startup.com", company: "Startup Inc", score: 92, lastActive: "12m ago", topQuestion: "Setup timeline" },
  { email: "michael.lee@bizware.com", company: "BizWare", score: 89, lastActive: "18m ago", topQuestion: "Security features" },
  { email: "lisa.garcia@growth.io", company: "Growth.io", score: 87, lastActive: "24m ago", topQuestion: "Custom workflows" },
];

const conversations = [
  {
    id: 1, visitor: "Sarah Chen", email: "sarah.chen@acme.com", company: "Acme Corp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    lastMessage: "Can you tell me more about your enterprise features?",
    time: "2m ago", unread: 2, status: "active", intent: "high",
  },
  {
    id: 2, visitor: "James Wilson", email: "james.wilson@techco.io", company: "TechCo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    lastMessage: "Looking for API documentation",
    time: "5m ago", unread: 0, status: "waiting", intent: "high",
  },
  {
    id: 3, visitor: "Emily Brown", email: "emily.brown@startup.com", company: "Startup Inc",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    lastMessage: "What's your typical setup timeline?",
    time: "12m ago", unread: 1, status: "active", intent: "medium",
  },
  {
    id: 4, visitor: "Michael Lee", email: "michael.lee@bizware.com", company: "BizWare",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    lastMessage: "Security compliance questions",
    time: "18m ago", unread: 0, status: "resolved", intent: "high",
  },
  {
    id: 5, visitor: "Lisa Garcia", email: "lisa.garcia@growth.io", company: "Growth.io",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    lastMessage: "Custom workflow possibilities?",
    time: "24m ago", unread: 0, status: "active", intent: "medium",
  },
];

const knowledgeBase = [
  { id: 1, title: "Getting Started with Engagely", type: "document", content: "Complete guide...", updatedAt: "2 days ago", words: 1240, status: "published" },
  { id: 2, title: "Product Pricing & Features", type: "document", content: "Comprehensive...", updatedAt: "1 week ago", words: 890, status: "published" },
  { id: 3, title: "API Integration Guide", type: "document", content: "Step-by-step...", updatedAt: "3 days ago", words: 2100, status: "published" },
  { id: 4, title: "Security & Compliance", type: "document", content: "Information...", updatedAt: "1 week ago", words: 1560, status: "published" },
  { id: 5, title: "Common FAQs", type: "url", content: "https://engagely.ai/help/faqs", updatedAt: "2 weeks ago", words: 0, status: "published" },
];

const integrations = [
  { id: 1, name: "Salesforce", status: "connected", icon: "🔵", lastSync: "5m ago" },
  { id: 2, name: "HubSpot", status: "connected", icon: "🟠", lastSync: "2h ago" },
  { id: 3, name: "Google Calendar", status: "connected", icon: "🔴", lastSync: "30m ago" },
  { id: 4, name: "Slack", status: "connected", icon: "💬", lastSync: "1m ago" },
  { id: 5, name: "Zapier", status: "available", icon: "⚡", lastSync: null },
  { id: 6, name: "Intercom", status: "available", icon: "💙", lastSync: null },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  return (
    <div className="flex h-screen bg-[#FAFAF8]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1B2A4A] text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF6B5A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-semibold">Engagely</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { key: "overview", icon: LayoutDashboard, label: "Dashboard" },
            { key: "conversations", icon: MessageSquare, label: "Conversations", badge: conversations.filter((c) => c.unread > 0).reduce((s, c) => s + c.unread, 0) },
            { key: "analytics", icon: BarChart3, label: "Analytics" },
            { key: "flow-builder", icon: Workflow, label: "Flow Builder", href: "/flow-builder" },
            { key: "knowledge", icon: BookOpen, label: "Knowledge Base" },
            { key: "integrations", icon: Plug, label: "Integrations" },
            { key: "settings", icon: Settings, label: "Settings", href: "/settings" },
          ].map((item) => {
            const Icon = item.icon;
            if (item.href) {
              return (
                <Link key={item.key} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 transition-colors">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            }
            return (
              <button key={item.key} onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.key ? "bg-[#FF6B5A] text-white" : "text-white/70 hover:bg-white/10"}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
                {item.badge ? (
                  <span className="ml-auto bg-[#FF6B5A] text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6B5A] rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">AK</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Alex Kim</div>
              <div className="text-xs text-white/60">alex@company.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-[#1B2A4A]">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "conversations" && "Conversations"}
                {activeTab === "analytics" && "Analytics"}
                {activeTab === "knowledge" && "Knowledge Base"}
                {activeTab === "integrations" && "Integrations"}
              </h1>
              {activeTab === "analytics" && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-[#1B2A4A]">
                  <Calendar className="w-4 h-4" />
                  <span>Last 30 days</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A]" />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B5A] rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: "Total Visitors", value: "2,847", change: "12.5%", icon: Users },
                  { label: "Engaged", value: "40.1%", change: "8.2%", icon: MessageSquare },
                  { label: "Meetings Booked", value: "89", change: "24.1%", icon: Calendar },
                  { label: "Avg Session", value: "4m 32s", change: "5.4%", icon: Clock },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">{m.label}</span>
                        <Icon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="text-3xl font-bold text-[#1B2A4A]">{m.value}</div>
                      <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>{m.change}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1B2A4A] mb-4">Engagement Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }} />
                      <Line type="monotone" dataKey="visitors" stroke="#1B2A4A" strokeWidth={2} dot={{ fill: "#1B2A4A", r: 4 }} name="Total Visitors" />
                      <Line type="monotone" dataKey="engaged" stroke="#FF6B5A" strokeWidth={2} dot={{ fill: "#FF6B5A", r: 4 }} name="Engaged Visitors" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1B2A4A] mb-4">Intent Score</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={intentData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {intentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {intentData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-gray-600">{item.name}</span>
                        </div>
                        <span className="font-semibold text-[#1B2A4A]">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1B2A4A]">High-Intent Visitors</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {["Email", "Company", "Score", "Last Active", "Top Question", ""].map((h) => (
                          <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {highIntentVisitors.map((v, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-[#1B2A4A]">{v.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{v.company}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#FF6B5A] rounded-full" style={{ width: `${v.score}%` }} />
                              </div>
                              <span className="text-sm font-semibold text-[#1B2A4A]">{v.score}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{v.lastActive}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{v.topQuestion}</td>
                          <td className="px-6 py-4">
                            <button className="px-3 py-1.5 bg-[#FF6B5A] text-white text-xs rounded-lg hover:bg-[#FF5A48] transition-colors">Reach out</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Conversations Tab */}
          {activeTab === "conversations" && (
            <div className="grid grid-cols-3 gap-6 h-[calc(100vh-180px)]">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-[#1B2A4A]">All Conversations</h3>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {conversations.map((conv) => (
                    <button key={conv.id} onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${selectedConversation === conv.id ? "bg-[#FF6B5A]/5" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={conv.avatar} alt={conv.visitor} className="w-10 h-10 rounded-full object-cover" />
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${conv.status === "active" ? "bg-green-500" : conv.status === "waiting" ? "bg-yellow-500" : "bg-gray-400"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm text-[#1B2A4A] truncate">{conv.visitor}</span>
                            <span className="text-xs text-gray-500 ml-2">{conv.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{conv.company}</p>
                          <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        </div>
                        {conv.unread > 0 && (
                          <div className="w-5 h-5 bg-[#FF6B5A] rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0">{conv.unread}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-2 bg-white rounded-xl border border-gray-200 flex flex-col">
                {selectedConversation ? (
                  <>
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={conversations.find((c) => c.id === selectedConversation)?.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <h3 className="font-semibold text-[#1B2A4A]">{conversations.find((c) => c.id === selectedConversation)?.visitor}</h3>
                          <p className="text-xs text-gray-600">{conversations.find((c) => c.id === selectedConversation)?.company}</p>
                        </div>
                        <span className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold ${conversations.find((c) => c.id === selectedConversation)?.intent === "high" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {conversations.find((c) => c.id === selectedConversation)?.intent?.toUpperCase()} INTENT
                        </span>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                      <div className="flex justify-start">
                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[70%] shadow-sm border border-gray-200">
                          <p className="text-sm text-gray-700">Hi! I&apos;m interested in learning more about Engagely for my team.</p>
                          <span className="text-xs text-gray-400 mt-1 block">10:23 AM</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-[#FF6B5A] rounded-2xl rounded-tr-none px-4 py-3 max-w-[70%] shadow-sm">
                          <p className="text-sm text-white">Great! I&apos;d love to help. What&apos;s your current team size?</p>
                          <span className="text-xs text-white/70 mt-1 block">10:24 AM</span>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[70%] shadow-sm border border-gray-200">
                          <p className="text-sm text-gray-700">We have about 25 people in sales and support. Can you tell me more about your enterprise features?</p>
                          <span className="text-xs text-gray-400 mt-1 block">10:26 AM</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-[#FF6B5A] text-sm" />
                        <button className="p-3 bg-[#FF6B5A] text-white rounded-lg hover:bg-[#FF5A48] transition-colors">
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a conversation to view messages</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Knowledge Base Tab */}
          {activeTab === "knowledge" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Manage the information your AI agent uses to answer questions</p>
                <button className="px-4 py-2 bg-[#FF6B5A] text-white rounded-lg hover:bg-[#FF5A48] transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Document
                </button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Title", "Type", "Words", "Status", "Updated", ""].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {knowledgeBase.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type === "document" ? "bg-blue-100" : "bg-green-100"}`}>
                              {item.type === "document" ? <FileText className="w-5 h-5 text-blue-600" /> : <Link2 className="w-5 h-5 text-green-600" />}
                            </div>
                            <span className="text-sm font-medium text-[#1B2A4A]">{item.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">{item.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.words > 0 ? `${item.words} words` : "-"}</td>
                        <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">{item.status}</span></td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.updatedAt}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Eye className="w-4 h-4 text-gray-600" /></button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Edit className="w-4 h-4 text-gray-600" /></button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-red-600" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#1B2A4A] mb-2">Upload Documents</h3>
                <p className="text-gray-600 mb-4">Drop files here or click to browse</p>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Choose Files</button>
                <p className="text-xs text-gray-500 mt-4">Supports PDF, DOC, TXT, and web URLs</p>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === "integrations" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Connect Engagely with your favorite tools</p>
                <Link href="/integrations" className="px-4 py-2 bg-[#FF6B5A] text-white rounded-lg hover:bg-[#FF5A48] transition-colors">Browse All Integrations</Link>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1B2A4A] mb-4">Connected</h3>
                <div className="grid grid-cols-3 gap-6">
                  {integrations.filter((i) => i.status === "connected").map((integration) => (
                    <div key={integration.id} className="bg-white rounded-xl p-6 border-2 border-green-200 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{integration.icon}</div>
                          <div>
                            <h4 className="font-semibold text-[#1B2A4A]">{integration.name}</h4>
                            <p className="text-xs text-gray-500">Last sync: {integration.lastSync}</p>
                          </div>
                        </div>
                        <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold flex items-center gap-1"><Check className="w-3 h-3" /> Connected</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">Configure</button>
                        <button className="px-3 py-2 bg-gray-100 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1B2A4A] mb-4">Available</h3>
                <div className="grid grid-cols-3 gap-6">
                  {integrations.filter((i) => i.status === "available").map((integration) => (
                    <div key={integration.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-[#FF6B5A]/30 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-3xl">{integration.icon}</div>
                        <div>
                          <h4 className="font-semibold text-[#1B2A4A]">{integration.name}</h4>
                          <p className="text-xs text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <button className="w-full px-3 py-2 bg-[#FF6B5A] text-white rounded-lg text-sm hover:bg-[#FF5A48] transition-colors">Connect</button>
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
