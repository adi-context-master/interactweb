"use client";

import {
  Mic, Volume2, X, Send, MicOff, VolumeX, Mail, Minimize2, CheckCircle2, ArrowRight,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { startListening, speak } from "@/lib/voice";

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
  time: string;
  streaming?: boolean;
}

export default function ChatWidget({ forceOpen }: { forceOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [email, setEmail] = useState("");
  const [demoStarted, setDemoStarted] = useState(false);
  const [demoScreen, setDemoScreen] = useState<string>("overview");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm Arya. How can I help you today?", sender: "ai", time: "Just now" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const listenerRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    if (forceOpen) setIsOpen(true);
  }, [forceOpen]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Parse demo commands from AI response — also activates the demo panel
  const parseDemoCommand = useCallback((text: string) => {
    const match = text.match(/\[DEMO:(\w+)\]/);
    if (match) {
      setDemoScreen(match[1]);
      setDemoStarted(true);
    }
  }, []);

  // Auto-detect screen from user message keywords
  const detectScreenFromMessage = useCallback((text: string) => {
    const lower = text.toLowerCase();
    const screenMap: [RegExp, string][] = [
      [/\banalytics|dashboard|metrics|engagement|visitors?\b/, "analytics"],
      [/\bconversation|inbox|chat|messages|transcript/, "conversations"],
      [/\bknowledge\s?base|documents|upload|rag|docs/, "knowledge"],
      [/\bintegrat|crm|salesforce|hubspot|pipedrive|slack|zapier|calendar|webhook/, "integrations"],
      [/\bflow\s?builder|nodes|drag.?and.?drop|conversation\s?flow|template/, "flowbuilder"],
      [/\bsettings?|config|embed|snippet|widget|branding|white.?label|avatar/, "settings"],
      [/\bsecur|compliance|soc|gdpr|encrypt|tls/, "security"],
      [/\bpric|cost|plan|starter|growth|enterprise|\$/, "pricing"],
      [/\bworkflow|automat/, "workflows"],
    ];
    for (const [pattern, screen] of screenMap) {
      if (pattern.test(lower)) {
        setDemoScreen(screen);
        setDemoStarted(true);
        return;
      }
    }
  }, []);

  // Send message to Grok via streaming API
  const sendToGrok = useCallback(async (userMessage: string) => {
    setIsStreaming(true);

    const aiMsgId = Date.now() + 1;
    setMessages((prev) => [...prev, { id: aiMsgId, text: "", sender: "ai", time: "Just now", streaming: true }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, conversationId, interests }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

          for (const line of lines) {
            const data = JSON.parse(line.slice(6));

            if (data.conversationId && !conversationId) {
              setConversationId(data.conversationId);
            }

            if (data.text) {
              fullText += data.text;
              // Activate demo panel on first real AI response
              if (!demoStarted && fullText.length > 20) {
                setDemoStarted(true);
              }
              setMessages((prev) =>
                prev.map((m) => (m.id === aiMsgId ? { ...m, text: fullText } : m))
              );
            }

            if (data.done) {
              setMessages((prev) =>
                prev.map((m) => (m.id === aiMsgId ? { ...m, streaming: false } : m))
              );
              parseDemoCommand(fullText);

              // Speak the response if speaker is on
              if (isSpeakerOn) {
                speak(fullText);
              }

              // Score intent after every 3rd user message
              const userMsgCount = messages.filter((m) => m.sender === "user").length + 1;
              if (data.conversationId && userMsgCount % 3 === 0) {
                fetch("/api/intent", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ conversationId: data.conversationId }),
                });
              }
            }

            if (data.error) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === aiMsgId
                    ? { ...m, text: "Sorry, I'm having trouble connecting. Please try again!", streaming: false }
                    : m
                )
              );
            }
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === Date.now() + 1
            ? { ...m, text: "Connection error. Please try again.", streaming: false }
            : m
        )
      );
    }

    setIsStreaming(false);
  }, [conversationId, interests, isSpeakerOn, messages, parseDemoCommand, demoStarted]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isStreaming) return;
    const text = inputValue.trim();
    setInputValue("");
    detectScreenFromMessage(text);
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "user", time: "Just now" }]);
    sendToGrok(text);
  };

  const handleQuickReply = (text: string) => {
    if (isStreaming) return;
    detectScreenFromMessage(text);
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "user", time: "Just now" }]);
    sendToGrok(text);
  };

  const handleStartDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setDemoStarted(true);
      // Capture lead
      if (conversationId) {
        fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, conversationId, interests }),
        });
      }
      setMessages((prev) => [...prev, {
        id: Date.now(),
        text: `Great! I've unlocked the demo for you. Let me walk you through the platform.`,
        sender: "ai",
        time: "Just now",
      }]);
      sendToGrok("The visitor just provided their email and started the demo. Give them a brief, excited welcome and suggest what to explore first.");
    }
  };

  // Voice input
  const toggleMic = () => {
    if (isListening && listenerRef.current) {
      listenerRef.current.stop();
      setIsListening(false);
      return;
    }
    const listener = startListening(
      (text) => {
        setInputValue(text);
        detectScreenFromMessage(text);
        setMessages((prev) => [...prev, { id: Date.now(), text, sender: "user", time: "Just now" }]);
        sendToGrok(text);
      },
      () => setIsListening(false)
    );
    if (listener) {
      listenerRef.current = listener;
      setIsListening(true);
      setIsMuted(false);
    }
  };

  // Demo screen content — matches every dashboard sidebar section
  const demoScreens: Record<string, { title: string; color: string; icon: string; desc: string; url: string }> = {
    overview:       { title: "Product Overview",      color: "bg-accent/10",     icon: "🚀", desc: "Interactive product demos that replace static websites. AI avatar + live demo, 24/7.",                        url: "app.engagely.ai/overview" },
    analytics:      { title: "Analytics",             color: "bg-tertiary/10",   icon: "📊", desc: "Visitor engagement metrics, conversion tracking, intent scoring, high-intent visitor tables, and trend charts.", url: "app.engagely.ai/analytics" },
    conversations:  { title: "Conversations",         color: "bg-secondary/10",  icon: "💬", desc: "Real-time inbox with all visitor chats, status indicators, intent badges, full transcripts, and search.",      url: "app.engagely.ai/conversations" },
    knowledge:      { title: "Knowledge Base",        color: "bg-quaternary/10", icon: "📚", desc: "Upload PDFs, URLs, or text. The AI agent answers from your docs with zero hallucination via RAG.",             url: "app.engagely.ai/knowledge" },
    integrations:   { title: "Integrations",          color: "bg-accent/10",     icon: "🔌", desc: "CRM sync (Salesforce, HubSpot, Pipedrive), calendar booking, Slack alerts, Zapier, and custom webhooks.",      url: "app.engagely.ai/integrations" },
    flowbuilder:    { title: "Flow Builder",          color: "bg-tertiary/10",   icon: "🔀", desc: "Visual drag-and-drop conversation editor. Message, Question, Media, Calendar, and Email nodes with branching.", url: "app.engagely.ai/flow-builder" },
    settings:       { title: "Settings",              color: "bg-secondary/10",  icon: "⚙️", desc: "Embed snippet, agent name, greeting, widget position, theme, branding colors, logo, and avatar upload.",       url: "app.engagely.ai/settings" },
    security:       { title: "Security & Compliance", color: "bg-quaternary/10", icon: "🔒", desc: "TLS 1.3, AES-256 encryption, multi-tenant isolation, OAuth 2.0, GDPR compliance, SOC 2 Type II in progress.",  url: "app.engagely.ai/security" },
    pricing:        { title: "Pricing Plans",         color: "bg-accent/10",     icon: "💰", desc: "Starter $149/mo, Growth $399/mo, Enterprise custom. Early access: 6 months at 50% off.",                       url: "app.engagely.ai/pricing" },
    workflows:      { title: "Workflow Automation",   color: "bg-secondary/10",  icon: "⚡", desc: "Automate lead routing, CRM enrichment, email follow-ups, and meeting scheduling from conversation events.",     url: "app.engagely.ai/workflows" },
  };

  const currentScreen = demoScreens[demoScreen] || demoScreens.overview;

  return (
    <>
      {/* Collapsed Widget */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
          >
            <div className="relative bg-card px-6 py-4 rounded-2xl rounded-bl-none border-2 border-foreground shadow-hard mb-4 z-20 w-max">
              <p className="text-[15px] font-bold text-foreground font-heading">
                Hi, I&apos;m Arya. How can I help you today?
              </p>
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <button onClick={() => setIsOpen(true)} className="w-14 h-14 rounded-full overflow-hidden border-2 border-foreground shadow-hard hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 bounce-transition shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" alt="Arya" className="w-full h-full object-cover" />
              </button>
              <button onClick={() => setIsOpen(true)} className="flex items-center gap-3 bg-card border-2 border-foreground pl-5 pr-7 py-3.5 rounded-full shadow-hard hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 bounce-transition group">
                <div className="flex gap-[3px] items-center h-4">
                  {[8, 14, 10, 6, 12].map((h, i) => (
                    <div key={i} className="w-[3px] bg-accent rounded-full bounce-transition" style={{ height: `${h}px` }} />
                  ))}
                </div>
                <span className="text-[15px] font-extrabold text-accent font-heading">Talk to Arya</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-background flex overflow-hidden">
            {/* LEFT PANEL */}
            <div className="w-[40%] min-w-[400px] border-r-2 border-foreground flex flex-col h-full">
              {/* Avatar */}
              <div className="h-[40%] relative bg-foreground overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1080&q=80" alt="Arya" className="w-full h-full object-cover object-top opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute top-5 left-5">
                  <div className="bg-card border-2 border-foreground rounded-full px-4 py-2 shadow-hard flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${isStreaming ? "bg-tertiary animate-pulse" : "bg-quaternary"}`} />
                    <span className="text-sm font-extrabold text-foreground font-heading">Arya</span>
                    {isStreaming && <span className="text-[10px] text-muted-fg font-bold">typing...</span>}
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 w-10 h-10 bg-card/20 backdrop-blur-md border-2 border-white/30 hover:bg-card/40 rounded-full flex items-center justify-center bounce-transition">
                  <Minimize2 className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <button onClick={toggleMic} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bounce-transition ${isListening ? "bg-secondary border-foreground text-white shadow-hard animate-pulse" : isMuted ? "bg-white/20 border-white/30 text-white" : "bg-quaternary border-foreground text-white shadow-hard"}`}>
                    {isListening ? <Mic className="w-5 h-5" /> : isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button onClick={() => setIsSpeakerOn(!isSpeakerOn)} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bounce-transition ${isSpeakerOn ? "bg-accent border-foreground text-white shadow-hard" : "bg-white/20 border-white/30 text-white"}`}>
                    {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Chat */}
              <div className="h-[60%] flex flex-col bg-card">
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                      <div className={`rounded-2xl px-5 py-3 max-w-[85%] border-2 border-foreground ${
                        msg.sender === "user"
                          ? "bg-accent text-white rounded-tr-none shadow-hard-pink"
                          : "bg-muted text-foreground rounded-tl-none shadow-hard"
                      }`}>
                        <p className="text-[14px] leading-relaxed font-medium whitespace-pre-wrap">
                          {msg.text.replace(/\[DEMO:\w+\]/g, "").trim() || (msg.streaming ? "..." : "")}
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-fg font-medium mt-1 mx-1">{msg.time}</span>
                    </div>
                  ))}

                  {!demoStarted && messages.length <= 2 && !isStreaming && (
                    <div className="flex flex-col gap-2 pt-2">
                      {["I'd like to see a demo", "How does pricing work?", "What features do you offer?"].map((text) => (
                        <button key={text} onClick={() => handleQuickReply(text)} className="bg-card border-2 border-foreground rounded-xl px-4 py-3 text-left hover:bg-tertiary/20 hover:shadow-hard bounce-transition text-sm font-bold text-foreground">
                          {text}
                        </button>
                      ))}
                    </div>
                  )}
                  <div ref={endOfMessagesRef} />
                </div>

                <div className="p-4 border-t-2 border-border">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-muted border-2 border-foreground rounded-full px-4 py-2 focus-within:shadow-hard-violet bounce-transition">
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={isListening ? "Listening..." : "Reply to Arya..."} className="flex-1 bg-transparent outline-none text-[15px] text-foreground placeholder:text-muted-fg font-medium" disabled={isStreaming} />
                    <button type="submit" disabled={!inputValue.trim() || isStreaming} className="w-9 h-9 bg-accent disabled:bg-border text-white rounded-full border-2 border-foreground shadow-hard-active hover:shadow-hard bounce-transition flex items-center justify-center">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-[60%] bg-background relative h-full flex flex-col">
              <button onClick={() => setIsOpen(false)} className="absolute top-5 right-6 w-10 h-10 bg-card border-2 border-foreground shadow-hard hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 rounded-full flex items-center justify-center bounce-transition z-10">
                <X className="w-5 h-5 text-foreground" />
              </button>

              {!demoStarted ? (
                <div className="flex-1 flex flex-col items-center justify-center p-12 relative overflow-hidden">
                  <div className="absolute top-10 right-10 w-40 h-40 bg-tertiary/20 rounded-full -z-10" />
                  <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/15 rounded-full -z-10" />
                  <div className="max-w-md w-full relative z-10">
                    <div className="w-16 h-16 bg-accent/10 border-2 border-foreground rounded-2xl shadow-hard-violet flex items-center justify-center mb-6 mx-auto">
                      <Mail className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-foreground text-center mb-3 font-heading">Ready to see the magic?</h2>
                    <p className="text-muted-fg text-center mb-8 text-lg font-medium">Enter your email to unlock the interactive demo.</p>
                    <form onSubmit={handleStartDemo} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-foreground uppercase tracking-widest mb-2">Work Email</label>
                        <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full px-5 py-4 bg-card border-2 border-foreground rounded-xl outline-none focus:shadow-hard-violet bounce-transition text-lg font-medium" />
                      </div>
                      <button type="submit" className="w-full py-4 bg-foreground text-white rounded-full border-2 border-foreground font-extrabold text-lg hover:bg-accent bounce-transition shadow-hard flex items-center justify-center gap-2 font-heading">
                        Start Interactive Demo <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>
                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-fg font-medium">
                      <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-quaternary" /> No credit card</div>
                      <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-quaternary" /> Instant access</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col p-8 overflow-y-auto">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-extrabold text-foreground font-heading">Platform Demo</h2>
                      <p className="text-muted-fg font-medium mt-1">{currentScreen.title}</p>
                    </div>
                    <div className="px-4 py-2 bg-quaternary/20 border-2 border-foreground rounded-full text-sm font-bold text-foreground flex items-center gap-2 shadow-hard">
                      <span className="w-2 h-2 rounded-full bg-quaternary animate-pulse" /> Live
                    </div>
                  </div>

                  {/* Demo screen tabs — scrollable row */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                    {Object.entries(demoScreens).map(([key, screen]) => (
                      <button key={key} onClick={() => setDemoScreen(key)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-bold border-2 border-foreground bounce-transition whitespace-nowrap ${demoScreen === key ? "bg-accent text-white shadow-hard" : "bg-card text-foreground hover:bg-tertiary/20"}`}>
                        {screen.icon} {screen.title}
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 rounded-2xl border-2 border-foreground shadow-hard-lg overflow-hidden flex flex-col bg-card">
                    <div className="h-10 border-b-2 border-border bg-card flex items-center px-4 gap-4 flex-shrink-0">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-secondary border border-foreground" />
                        <div className="w-3 h-3 rounded-full bg-tertiary border border-foreground" />
                        <div className="w-3 h-3 rounded-full bg-quaternary border border-foreground" />
                      </div>
                      <div className="flex-1 flex justify-center">
                        <div className="bg-muted border-2 border-border px-3 py-0.5 rounded-full text-[10px] text-muted-fg font-bold font-mono">
                          {currentScreen.url}
                        </div>
                      </div>
                    </div>
                    <iframe
                      key={demoScreen}
                      src={`/embed/${demoScreen}`}
                      className="flex-1 w-full border-0"
                      title={currentScreen.title}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
