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
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 transition-colors">
            <LayoutDashboard className="w-5 h-5" /><span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 transition-colors">
            <MessageSquare className="w-5 h-5" /><span className="text-sm">Conversations</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 transition-colors">
            <BarChart3 className="w-5 h-5" /><span className="text-sm">Analytics</span>
          </Link>
          <Link href="/flow-builder" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#FF6B5A] text-white">
            <Workflow className="w-5 h-5" /><span className="text-sm">Flow Builder</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 transition-colors">
            <BookOpen className="w-5 h-5" /><span className="text-sm">Knowledge Base</span>
          </Link>
          <Link href="/integrations" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 transition-colors">
            <Plug className="w-5 h-5" /><span className="text-sm">Integrations</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5" /><span className="text-sm">Settings</span>
          </Link>
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

      {/* Node Palette */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="px-6 py-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-[#1B2A4A] uppercase tracking-wide">Node Types</h3>
        </div>
        <div className="p-4 space-y-2">
          {[
            { type: "message", label: "Message", color: "#3B82F6" },
            { type: "question", label: "Question", color: "#8B5CF6" },
            { type: "media", label: "Media", color: "#F59E0B" },
            { type: "calendar", label: "Calendar", color: "#10B981" },
            { type: "email", label: "Email Capture", color: "#FF6B5A" },
          ].map((nodeType) => (
            <div key={nodeType.type} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: nodeType.color + "20" }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nodeType.color }} />
              </div>
              <span className="text-sm text-[#1B2A4A]">{nodeType.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-[#1B2A4A]">Lead Qualification Flow</h1>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">Draft</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Last edited 5 minutes ago</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm text-[#1B2A4A] hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 flex items-center gap-2">
                <Play className="w-4 h-4" /> Preview
              </button>
              <button className="px-4 py-2 bg-[#FF6B5A] text-white rounded-lg text-sm hover:bg-[#FF5A48] transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" /> Publish
              </button>
            </div>
          </div>
        </header>

        <div
          className="flex-1 overflow-auto bg-[#FAFAF8]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="relative min-w-[1200px] min-h-[1000px] p-8">
            {/* Connection Lines */}
            <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
              {initialNodes.map((node) =>
                node.connections?.map((targetId) => {
                  const target = initialNodes.find((n) => n.id === targetId);
                  if (!target) return null;
                  return (
                    <line key={`${node.id}-${targetId}`} x1={node.x + 140} y1={node.y + 30} x2={target.x} y2={target.y + 30} stroke="#D1D5DB" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  );
                })
              )}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#D1D5DB" />
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
                  className={`absolute bg-white rounded-xl shadow-md border-2 cursor-pointer hover:shadow-lg transition-all ${selectedNode?.id === node.id ? "border-[#FF6B5A]" : "border-gray-200"}`}
                  style={{ left: node.x, top: node.y, width: 140 }}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: color + "20" }}>
                        <Icon className="w-3 h-3" style={{ color }} />
                      </div>
                      <span className="text-xs font-medium text-gray-500 uppercase">{node.type}</span>
                    </div>
                    <p className="text-sm text-[#1B2A4A] font-medium">{node.label}</p>
                  </div>
                  {node.connections && node.connections.length > 0 && (
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
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
        <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1B2A4A]">Node Properties</h3>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors"><Trash2 className="w-4 h-4 text-gray-400" /></button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: nodeColors[selectedNode.type] + "20" }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nodeColors[selectedNode.type] }} />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase">{selectedNode.type}</div>
                <div className="text-sm font-medium text-[#1B2A4A]">{selectedNode.label}</div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Label</label>
              <input type="text" defaultValue={selectedNode.label} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A]" />
            </div>
            {selectedNode.type === "message" && (
              <div>
                <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Message Content</label>
                <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A] min-h-[100px]" placeholder="Enter your message here..." defaultValue="Hi! Welcome to Engagely. How can I help you today?" />
              </div>
            )}
            {selectedNode.type === "question" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Question</label>
                  <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A] min-h-[80px]" placeholder="Enter your question..." defaultValue="What brings you to our website today?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Response Options</label>
                  <div className="space-y-2">
                    {["See a demo", "Pricing information", "Talk to sales"].map((opt) => (
                      <input key={opt} type="text" defaultValue={opt} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A]" />
                    ))}
                    <button className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-[#FF6B5A] hover:text-[#FF6B5A] transition-colors flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" /> Add option
                    </button>
                  </div>
                </div>
              </>
            )}
            {selectedNode.type === "media" && (
              <div>
                <label className="block text-sm font-medium text-[#1B2A4A] mb-2">Media URL</label>
                <input type="text" placeholder="https://..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A]" />
              </div>
            )}
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full px-4 py-2 bg-gray-100 text-[#1B2A4A] rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Copy className="w-4 h-4" /> Duplicate Node
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
