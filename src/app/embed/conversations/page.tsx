"use client";

import { MessageSquare, Send, Filter } from "lucide-react";
import { useState } from "react";

const conversations = [
  { id: 1, visitor: "Sarah Chen", company: "Acme Corp", avatar: "SC", lastMessage: "Can you tell me more about enterprise features?", time: "2m ago", unread: 2, status: "active", intent: "high" },
  { id: 2, visitor: "James Wilson", company: "TechCo", avatar: "JW", lastMessage: "Looking for API documentation", time: "5m ago", unread: 0, status: "waiting", intent: "high" },
  { id: 3, visitor: "Emily Brown", company: "Startup Inc", avatar: "EB", lastMessage: "What's your typical setup timeline?", time: "12m ago", unread: 1, status: "active", intent: "medium" },
  { id: 4, visitor: "Michael Lee", company: "BizWare", avatar: "ML", lastMessage: "Security compliance questions", time: "18m ago", unread: 0, status: "resolved", intent: "high" },
  { id: 5, visitor: "Lisa Garcia", company: "Growth.io", avatar: "LG", lastMessage: "Custom workflow possibilities?", time: "24m ago", unread: 0, status: "active", intent: "medium" },
];

export default function EmbedConversations() {
  const [selected, setSelected] = useState<number>(1);
  return (
    <div className="flex h-full">
      <div className="w-[40%] border-r-2 border-foreground flex flex-col bg-card">
        <div className="p-3 border-b-2 border-border flex items-center justify-between">
          <h3 className="font-extrabold text-foreground text-sm font-heading">Conversations</h3>
          <button className="p-1.5 border-2 border-border rounded-full"><Filter className="w-3 h-3" strokeWidth={2.5} /></button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button key={c.id} onClick={() => setSelected(c.id)} className={`w-full p-3 border-b-2 border-border text-left bounce-transition ${selected === c.id ? "bg-accent/5" : "hover:bg-muted"}`}>
              <div className="flex items-start gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-foreground flex items-center justify-center text-[9px] font-extrabold text-accent">{c.avatar}</div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${c.status === "active" ? "bg-quaternary" : c.status === "waiting" ? "bg-tertiary" : "bg-muted-fg"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between"><span className="font-bold text-[11px] text-foreground truncate">{c.visitor}</span><span className="text-[9px] text-muted-fg">{c.time}</span></div>
                  <p className="text-[9px] text-muted-fg">{c.company}</p>
                  <p className="text-[10px] text-muted-fg truncate">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && <div className="w-4 h-4 bg-secondary rounded-full border border-foreground flex items-center justify-center text-white text-[8px] font-extrabold">{c.unread}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-card">
        {(() => { const c = conversations.find((x) => x.id === selected); return c ? (
          <>
            <div className="p-3 border-b-2 border-border flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent/20 border-2 border-foreground flex items-center justify-center text-[8px] font-extrabold text-accent">{c.avatar}</div>
              <div><h3 className="text-[11px] font-extrabold text-foreground font-heading">{c.visitor}</h3><p className="text-[9px] text-muted-fg">{c.company}</p></div>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-[8px] font-extrabold border-2 border-foreground ${c.intent === "high" ? "bg-accent/10 text-accent" : "bg-tertiary/20 text-foreground"}`}>{c.intent.toUpperCase()}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-dots">
              <div className="flex justify-start"><div className="bg-card rounded-xl rounded-tl-none px-3 py-2 max-w-[75%] border-2 border-foreground shadow-hard text-[11px] text-foreground">Hi! I&apos;m interested in learning more about Engagely.</div></div>
              <div className="flex justify-end"><div className="bg-accent rounded-xl rounded-tr-none px-3 py-2 max-w-[75%] border-2 border-foreground shadow-hard-pink text-[11px] text-white">Great! What&apos;s your current team size?</div></div>
              <div className="flex justify-start"><div className="bg-card rounded-xl rounded-tl-none px-3 py-2 max-w-[75%] border-2 border-foreground shadow-hard text-[11px] text-foreground">{c.lastMessage}</div></div>
            </div>
            <div className="p-3 border-t-2 border-border"><div className="flex gap-2"><input type="text" placeholder="Type a message..." className="flex-1 px-3 py-2 bg-muted border-2 border-border rounded-full text-[11px]" /><button className="p-2 bg-accent text-white rounded-full border-2 border-foreground"><Send className="w-3 h-3" strokeWidth={2.5} /></button></div></div>
          </>
        ) : <div className="flex-1 flex items-center justify-center text-muted-fg"><MessageSquare className="w-8 h-8 opacity-30" /></div>; })()}
      </div>
    </div>
  );
}
