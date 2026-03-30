"use client";

import { FileText, Link2, Upload, Eye, Trash2, Edit, Plus } from "lucide-react";

const docs = [
  { id: 1, title: "Getting Started with Engagely", type: "document", words: 1240, status: "published", updated: "2 days ago" },
  { id: 2, title: "Product Pricing & Features", type: "document", words: 890, status: "published", updated: "1 week ago" },
  { id: 3, title: "API Integration Guide", type: "document", words: 2100, status: "published", updated: "3 days ago" },
  { id: 4, title: "Security & Compliance", type: "document", words: 1560, status: "published", updated: "1 week ago" },
  { id: 5, title: "Common FAQs", type: "url", words: 0, status: "published", updated: "2 weeks ago" },
];

export default function EmbedKnowledge() {
  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-muted-fg text-sm font-medium">Documents the AI agent uses to answer questions</p>
        <button className="px-3 py-1.5 bg-accent text-white rounded-full border-2 border-foreground shadow-hard text-[11px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" strokeWidth={2.5} /> Add</button>
      </div>
      <div className="bg-card rounded-xl border-2 border-foreground shadow-hard-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted"><tr>{["Title", "Type", "Words", "Status", "Updated", ""].map((h) => <th key={h} className="px-3 py-2 text-left text-[9px] font-extrabold text-muted-fg uppercase tracking-widest">{h}</th>)}</tr></thead>
          <tbody className="divide-y-2 divide-border">
            {docs.map((d) => (
              <tr key={d.id} className="hover:bg-muted/50 bounce-transition">
                <td className="px-3 py-2.5"><div className="flex items-center gap-2"><div className={`w-7 h-7 rounded-lg border-2 border-foreground flex items-center justify-center ${d.type === "document" ? "bg-blue-100" : "bg-green-100"}`}>{d.type === "document" ? <FileText className="w-3.5 h-3.5 text-blue-600" strokeWidth={2.5} /> : <Link2 className="w-3.5 h-3.5 text-green-600" strokeWidth={2.5} />}</div><span className="text-[11px] font-bold text-foreground">{d.title}</span></div></td>
                <td className="px-3 py-2.5 text-[10px] text-muted-fg capitalize">{d.type}</td>
                <td className="px-3 py-2.5 text-[10px] text-muted-fg">{d.words || "-"}</td>
                <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-quaternary/20 text-foreground rounded-full text-[9px] font-extrabold border border-foreground">{d.status}</span></td>
                <td className="px-3 py-2.5 text-[10px] text-muted-fg">{d.updated}</td>
                <td className="px-3 py-2.5"><div className="flex gap-1">{[Eye, Edit, Trash2].map((Icon, idx) => <button key={idx} className="p-1 hover:bg-muted rounded-full"><Icon className={`w-3 h-3 ${idx === 2 ? "text-secondary" : "text-muted-fg"}`} strokeWidth={2.5} /></button>)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-card rounded-xl border-2 border-dashed border-foreground/30 p-8 text-center">
        <Upload className="w-8 h-8 text-muted-fg mx-auto mb-2" strokeWidth={2.5} />
        <h3 className="text-sm font-extrabold text-foreground font-heading mb-1">Upload Documents</h3>
        <p className="text-[11px] text-muted-fg mb-3">PDF, DOC, TXT, or web URLs</p>
        <button className="px-4 py-2 bg-muted text-foreground rounded-full border-2 border-foreground shadow-hard text-[11px] font-bold">Choose Files</button>
      </div>
    </div>
  );
}
