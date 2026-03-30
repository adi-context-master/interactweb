"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Workflow,
  BookOpen,
  Plug,
  Settings,
  Plus,
  Play,
  Save,
  Trash2,
  Copy,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface FlowNode {
  id: string;
  type: "start" | "message" | "question" | "media" | "calendar" | "email";
  label: string;
  x: number;
  y: number;
  connections?: string[];
}

const initialNodes: FlowNode[] = [
  { id: "1", type: "start", label: "Start", x: 100, y: 100 },
  { id: "2", type: "message", label: "Greeting", x: 100, y: 200, connections: ["3"] },
  { id: "3", type: "question", label: "What brings you here?", x: 100, y: 320, connections: ["4", "7", "10"] },
  { id: "4", type: "message", label: "See demo", x: 100, y: 480 },
  { id: "5", type: "media", label: "Demo video", x: 100, y: 580 },
  { id: "6", type: "calendar", label: "Book meeting", x: 100, y: 680 },
  { id: "7", type: "message", label: "Pricing", x: 400, y: 480 },
  { id: "8", type: "message", label: "Pricing info", x: 400, y: 580 },
  { id: "9", type: "email", label: "Email capture", x: 400, y: 680 },
  { id: "10", type: "message", label: "Talk to sales", x: 700, y: 480 },
  { id: "11", type: "email", label: "Email", x: 700, y: 580 },
  { id: "12", type: "calendar", label: "Schedule", x: 700, y: 680 },
];

const nodeColors: Record<string, string> = {
  start: "#9CA3AF",
  message: "#3B82F6",
  question: "#8B5CF6",
  media: "#F59E0B",
  calendar: "#10B981",
  email: "#FF6B5A",
};

const nodeIcons: Record<string, typeof Play> = {
  start: Play,
  message: MessageSquare,
  question: MessageSquare,
  media: Play,
  calendar: LayoutDashboard,
  email: MessageSquare,
};

export default function FlowBuilder() {
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-accent rounded-xl border-2 border-foreground flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-heading font-extrabold">Engagely</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-full text-white/70 hover:bg-white/10 bounce-transition">
            <LayoutDashboard className="w-5 h-5" /><span className="text-sm font-bold">Dashboard</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-full text-white/70 hover:bg-white/10 bounce-transition">
            <MessageSquare className="w-5 h-5" /><span className="text-sm font-bold">Conversations</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-full text-white/70 hover:bg-white/10 bounce-transition">
            <BarChart3 className="w-5 h-5" /><span className="text-sm font-bold">Analytics</span>
          </Link>
          <Link href="/flow-builder" className="flex items-center gap-3 px-4 py-3 rounded-full bg-accent text-white border-2 border-white/20">
            <Workflow className="w-5 h-5" /><span className="text-sm font-bold">Flow Builder</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-full text-white/70 hover:bg-white/10 bounce-transition">
            <BookOpen className="w-5 h-5" /><span className="text-sm font-bold">Knowledge Base</span>
          </Link>
          <Link href="/integrations" className="flex items-center gap-3 px-4 py-3 rounded-full text-white/70 hover:bg-white/10 bounce-transition">
            <Plug className="w-5 h-5" /><span className="text-sm font-bold">Integrations</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-full text-white/70 hover:bg-white/10 bounce-transition">
            <Settings className="w-5 h-5" /><span className="text-sm font-bold">Settings</span>
          </Link>
        </nav>

        <div className="px-6 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-full border-2 border-white/20 flex items-center justify-center">
              <span className="text-sm font-bold text-white">AK</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">Alex Kim</div>
              <div className="text-xs text-white/60">alex@company.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Node Palette */}
      <aside className="w-64 bg-card border-r-2 border-foreground">
        <div className="px-6 py-6 border-b-2 border-foreground">
          <h3 className="text-sm font-heading font-extrabold text-foreground uppercase tracking-wide">Node Types</h3>
        </div>
        <div className="p-4 space-y-2">
          {[
            { type: "message", label: "Message", color: "#3B82F6" },
            { type: "question", label: "Question", color: "#8B5CF6" },
            { type: "media", label: "Media", color: "#F59E0B" },
            { type: "calendar", label: "Calendar", color: "#10B981" },
            { type: "email", label: "Email Capture", color: "#FF6B5A" },
          ].map((nodeType) => (
            <div key={nodeType.type} className="flex items-center gap-3 px-4 py-3 bg-background rounded-2xl border-2 border-foreground shadow-hard cursor-move bounce-transition hover:-translate-y-1">
              <div className="w-8 h-8 rounded-xl border-2 border-foreground flex items-center justify-center" style={{ backgroundColor: nodeType.color + "20" }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nodeType.color }} />
              </div>
              <span className="text-sm font-bold text-foreground">{nodeType.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b-2 border-foreground px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-heading font-extrabold text-foreground">Lead Qualification Flow</h1>
                <span className="px-3 py-1 bg-tertiary text-foreground text-xs font-bold rounded-full border-2 border-foreground shadow-hard-yellow">Draft</span>
              </div>
              <p className="text-sm text-muted-fg mt-1">Last edited 5 minutes ago</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 rounded-full bounce-transition border-2 border-foreground bg-card shadow-hard font-bold flex items-center gap-2">
                <Play className="w-4 h-4" /> Preview
              </button>
              <button className="px-4 py-2 bg-accent text-white rounded-full text-sm border-2 border-foreground shadow-hard bounce-transition hover:shadow-hard-hover font-bold flex items-center gap-2">
                <Save className="w-4 h-4" /> Publish
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-background bg-dots">
          <div className="relative min-w-[1200px] min-h-[1000px] p-8">
            {/* Connection Lines */}
            <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
              {initialNodes.map((node) =>
                node.connections?.map((targetId) => {
                  const target = initialNodes.find((n) => n.id === targetId);
                  if (!target) return null;
                  return (
                    <line key={`${node.id}-${targetId}`} x1={node.x + 140} y1={node.y + 30} x2={target.x} y2={target.y + 30} stroke="#1E293B" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrowhead)" />
                  );
                })
              )}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#1E293B" />
                </marker>
              </defs>
            </svg>

            {/* Nodes */}
            {initialNodes.map((node) => {
              const Icon = nodeIcons[node.type];
              const color = nodeColors[node.type];
              return (
                <div
                  key={node.id}
                  className={`absolute bg-card rounded-2xl shadow-hard border-2 border-foreground cursor-pointer bounce-transition hover:-translate-y-1 ${selectedNode?.id === node.id ? "shadow-hard-violet" : ""}`}
                  style={{ left: node.x, top: node.y, width: 140 }}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg border-2 border-foreground flex items-center justify-center" style={{ backgroundColor: color + "20" }}>
                        <Icon className="w-3 h-3" style={{ color }} />
                      </div>
                      <span className="text-xs font-bold text-muted-fg uppercase">{node.type}</span>
                    </div>
                    <p className="text-sm text-foreground font-bold">{node.label}</p>
                  </div>
                  {node.connections && node.connections.length > 0 && (
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-card border-2 border-foreground rounded-full flex items-center justify-center shadow-hard">
                      <ChevronRight className="w-3 h-3 text-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Panel - Node Properties */}
      {selectedNode && (
        <aside className="w-80 bg-card border-l-2 border-foreground overflow-y-auto">
          <div className="px-6 py-6 border-b-2 border-foreground">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-extrabold text-foreground">Node Properties</h3>
              <button className="p-2 hover:bg-background rounded-full border-2 border-foreground bounce-transition hover:-translate-y-0.5"><Trash2 className="w-4 h-4 text-foreground" /></button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl border-2 border-foreground flex items-center justify-center" style={{ backgroundColor: nodeColors[selectedNode.type] + "20" }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nodeColors[selectedNode.type] }} />
              </div>
              <div>
                <div className="text-xs text-muted-fg font-bold uppercase">{selectedNode.type}</div>
                <div className="text-sm font-bold text-foreground">{selectedNode.label}</div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Label</label>
              <input type="text" defaultValue={selectedNode.label} className="w-full px-3 py-2 border-2 border-foreground rounded-2xl text-sm outline-none focus:border-accent focus:shadow-hard-violet bg-card" />
            </div>
            {selectedNode.type === "message" && (
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Message Content</label>
                <textarea className="w-full px-3 py-2 border-2 border-foreground rounded-2xl text-sm outline-none focus:border-accent focus:shadow-hard-violet min-h-[100px] bg-card" placeholder="Enter your message here..." defaultValue="Hi! Welcome to Engagely. How can I help you today?" />
              </div>
            )}
            {selectedNode.type === "question" && (
              <>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Question</label>
                  <textarea className="w-full px-3 py-2 border-2 border-foreground rounded-2xl text-sm outline-none focus:border-accent focus:shadow-hard-violet min-h-[80px] bg-card" placeholder="Enter your question..." defaultValue="What brings you to our website today?" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Response Options</label>
                  <div className="space-y-2">
                    {["See a demo", "Pricing information", "Talk to sales"].map((opt) => (
                      <input key={opt} type="text" defaultValue={opt} className="w-full px-3 py-2 border-2 border-foreground rounded-2xl text-sm outline-none focus:border-accent focus:shadow-hard-violet bg-card" />
                    ))}
                    <button className="w-full px-3 py-2 border-2 border-dashed border-foreground rounded-full text-sm text-muted-fg hover:border-accent hover:text-accent bounce-transition hover:-translate-y-0.5 font-bold flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" /> Add option
                    </button>
                  </div>
                </div>
              </>
            )}
            {selectedNode.type === "media" && (
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Media URL</label>
                <input type="text" placeholder="https://..." className="w-full px-3 py-2 border-2 border-foreground rounded-2xl text-sm outline-none focus:border-accent focus:shadow-hard-violet bg-card" />
              </div>
            )}
            <div className="pt-4 border-t-2 border-foreground">
              <button className="w-full px-4 py-2 bg-background text-foreground rounded-full text-sm border-2 border-foreground shadow-hard bounce-transition hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 font-bold flex items-center justify-center gap-2">
                <Copy className="w-4 h-4" /> Duplicate Node
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
