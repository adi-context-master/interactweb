"use client";

import { MessageSquare, Play, ChevronRight } from "lucide-react";

const nodeColors: Record<string, string> = { start: "#9CA3AF", message: "#3B82F6", question: "#8B5CF6", media: "#F59E0B", calendar: "#10B981", email: "#F472B6" };
const nodes = [
  { id: "1", type: "start", label: "Start", x: 40, y: 30 },
  { id: "2", type: "message", label: "Greeting", x: 40, y: 110, connections: ["3"] },
  { id: "3", type: "question", label: "What brings you here?", x: 40, y: 200, connections: ["4", "7"] },
  { id: "4", type: "message", label: "See demo", x: 20, y: 310 },
  { id: "5", type: "media", label: "Demo video", x: 20, y: 390 },
  { id: "6", type: "calendar", label: "Book meeting", x: 20, y: 470 },
  { id: "7", type: "message", label: "Pricing", x: 240, y: 310 },
  { id: "8", type: "email", label: "Email capture", x: 240, y: 390 },
  { id: "9", type: "calendar", label: "Schedule", x: 240, y: 470 },
];

export default function EmbedFlowBuilder() {
  return (
    <div className="h-full flex flex-col">
      <div className="h-10 bg-card border-b-2 border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold text-foreground font-heading">Lead Qualification Flow</span>
          <span className="px-2 py-0.5 bg-tertiary text-foreground text-[8px] font-extrabold rounded-full border border-foreground">Draft</span>
        </div>
        <div className="flex gap-1.5">
          <button className="px-2 py-1 border-2 border-foreground rounded-full text-[9px] font-bold flex items-center gap-1"><Play className="w-2.5 h-2.5" /> Preview</button>
          <button className="px-2 py-1 bg-accent text-white border-2 border-foreground rounded-full text-[9px] font-bold">Publish</button>
        </div>
      </div>
      <div className="flex-1 bg-dots overflow-auto relative">
        <div className="relative min-w-[500px] min-h-[550px] p-4">
          <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
            {nodes.map((node) =>
              (node as { connections?: string[] }).connections?.map((targetId) => {
                const target = nodes.find((n) => n.id === targetId);
                if (!target) return null;
                return <line key={`${node.id}-${targetId}`} x1={node.x + 70} y1={node.y + 25} x2={target.x + 70} y2={target.y} stroke="#1E293B" strokeWidth="2" strokeDasharray="6 4" />;
              })
            )}
          </svg>
          {nodes.map((node) => {
            const color = nodeColors[node.type];
            return (
              <div key={node.id} className="absolute bg-card rounded-xl border-2 border-foreground shadow-hard bounce-transition hover:-translate-y-0.5" style={{ left: node.x, top: node.y, width: 140 }}>
                <div className="p-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 rounded-md border-2 border-foreground flex items-center justify-center" style={{ backgroundColor: color + "20" }}>
                      <MessageSquare className="w-2.5 h-2.5" style={{ color }} strokeWidth={2.5} />
                    </div>
                    <span className="text-[8px] font-bold text-muted-fg uppercase">{node.type}</span>
                  </div>
                  <p className="text-[10px] text-foreground font-bold truncate">{node.label}</p>
                </div>
                {(node as { connections?: string[] }).connections && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-card border-2 border-foreground rounded-full flex items-center justify-center">
                    <ChevronRight className="w-2 h-2 text-muted-fg" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
