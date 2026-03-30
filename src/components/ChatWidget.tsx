"use client";

import {
  Mic, Volume2, X, Send, MicOff, VolumeX, Mail, Minimize2, CheckCircle2, ArrowRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
  time: string;
}

export default function ChatWidget({ forceOpen }: { forceOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [email, setEmail] = useState("");
  const [demoStarted, setDemoStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm Arya. How can I help you today?", sender: "ai", time: "Just now" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceOpen) setIsOpen(true);
  }, [forceOpen]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    setMessages((p) => [...p, { id: Date.now(), text: inputValue, sender: "user", time: "Just now" }]);
    setInputValue("");
    setTimeout(() => {
      setMessages((p) => [...p, {
        id: Date.now(),
        text: "I can definitely help with that! " + (!demoStarted ? "Please enter your email on the right to start the interactive demo." : "Check out the demo on the right side to see Engagely in action."),
        sender: "ai", time: "Just now",
      }]);
    }, 1000);
  };

  const handleStartDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setDemoStarted(true);
      setMessages((p) => [...p, { id: Date.now(), text: "Great! I've started the interactive demo for you. Let me know if you have any questions!", sender: "ai", time: "Just now" }]);
    }
  };

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
            {/* Speech bubble */}
            <div className="relative bg-card px-6 py-4 rounded-2xl rounded-bl-none border-2 border-foreground shadow-hard mb-4 z-20 w-max">
              <p className="text-[15px] font-bold text-foreground font-heading">
                Hi, I&apos;m Arya. How can I help you today?
              </p>
            </div>

            {/* Avatar + pill */}
            <div className="flex items-center gap-4 relative z-10">
              <button
                onClick={() => setIsOpen(true)}
                className="w-14 h-14 rounded-full overflow-hidden border-2 border-foreground shadow-hard hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 bounce-transition shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" alt="Arya" className="w-full h-full object-cover" />
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 bg-card border-2 border-foreground pl-5 pr-7 py-3.5 rounded-full shadow-hard hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 bounce-transition group"
              >
                {/* Audio waves */}
                <div className="flex gap-[3px] items-center h-4">
                  {[8, 14, 10, 6, 12].map((h, i) => (
                    <div key={i} className={`w-[3px] bg-accent rounded-full bounce-transition`} style={{ height: `${h}px` }} />
                  ))}
                </div>
                <span className="text-[15px] font-extrabold text-accent font-heading">Talk to Arya</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded full-screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex overflow-hidden"
          >
            {/* LEFT PANEL — Avatar & Chat (40%) */}
            <div className="w-[40%] min-w-[400px] border-r-2 border-foreground flex flex-col h-full">
              {/* Avatar area */}
              <div className="h-[40%] relative bg-foreground overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1080&q=80" alt="Arya" className="w-full h-full object-cover object-top opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />

                {/* Name badge */}
                <div className="absolute top-5 left-5">
                  <div className="bg-card border-2 border-foreground rounded-full px-4 py-2 shadow-hard flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-quaternary rounded-full animate-pulse" />
                    <span className="text-sm font-extrabold text-foreground font-heading">Arya</span>
                  </div>
                </div>

                <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 w-10 h-10 bg-card/20 backdrop-blur-md border-2 border-white/30 hover:bg-card/40 rounded-full flex items-center justify-center bounce-transition">
                  <Minimize2 className="w-5 h-5 text-white" />
                </button>

                {/* Controls */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <button onClick={() => setIsMuted(!isMuted)} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bounce-transition ${isMuted ? "bg-secondary border-foreground text-white shadow-hard" : "bg-white/20 border-white/30 text-white"}`}>
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button onClick={() => setIsSpeakerOff(!isSpeakerOff)} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bounce-transition ${isSpeakerOff ? "bg-secondary border-foreground text-white shadow-hard" : "bg-white/20 border-white/30 text-white"}`}>
                    {isSpeakerOff ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
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
                        <p className="text-[14px] leading-relaxed font-medium">{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-muted-fg font-medium mt-1 mx-1">{msg.time}</span>
                    </div>
                  ))}

                  {!demoStarted && messages.length === 1 && (
                    <div className="flex flex-col gap-2 pt-2">
                      {["I'd like to see a demo", "How does pricing work?"].map((text) => (
                        <button key={text} onClick={() => setInputValue(text)} className="bg-card border-2 border-foreground rounded-xl px-4 py-3 text-left hover:bg-tertiary/20 hover:shadow-hard bounce-transition text-sm font-bold text-foreground">
                          {text}
                        </button>
                      ))}
                    </div>
                  )}
                  <div ref={endOfMessagesRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t-2 border-border">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-muted border-2 border-foreground rounded-full px-4 py-2 focus-within:shadow-hard-violet bounce-transition">
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Reply to Arya..." className="flex-1 bg-transparent outline-none text-[15px] text-foreground placeholder:text-muted-fg font-medium" />
                    <button type="submit" disabled={!inputValue.trim()} className="w-9 h-9 bg-accent disabled:bg-border text-white rounded-full border-2 border-foreground shadow-hard-active hover:shadow-hard bounce-transition flex items-center justify-center">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL — Demo / Form (60%) */}
            <div className="w-[60%] bg-background relative h-full flex flex-col">
              <button onClick={() => setIsOpen(false)} className="absolute top-5 right-6 w-10 h-10 bg-card border-2 border-foreground shadow-hard hover:shadow-hard-hover hover:-translate-x-0.5 hover:-translate-y-0.5 rounded-full flex items-center justify-center bounce-transition z-10">
                <X className="w-5 h-5 text-foreground" />
              </button>

              {!demoStarted ? (
                <div className="flex-1 flex flex-col items-center justify-center p-12 relative overflow-hidden">
                  <div className="absolute top-10 right-10 w-40 h-40 bg-tertiary/20 rounded-full -z-10" />
                  <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/15 rounded-full -z-10" />
                  <div className="absolute top-1/3 left-20 w-6 h-6 bg-quaternary/30 rotate-45 -z-10" />

                  <div className="max-w-md w-full relative z-10">
                    <div className="w-16 h-16 bg-accent/10 border-2 border-foreground rounded-2xl shadow-hard-violet flex items-center justify-center mb-6 mx-auto">
                      <Mail className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-foreground text-center mb-3 font-heading">Ready to see the magic?</h2>
                    <p className="text-muted-fg text-center mb-8 text-lg font-medium">Enter your email to unlock the interactive demo.</p>

                    <form onSubmit={handleStartDemo} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-foreground uppercase tracking-widest mb-2">Work Email</label>
                        <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
                          className="w-full px-5 py-4 bg-card border-2 border-foreground rounded-xl outline-none focus:shadow-hard-violet bounce-transition text-lg font-medium" />
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
                      <p className="text-muted-fg font-medium mt-1">Explore the Engagely dashboard</p>
                    </div>
                    <div className="px-4 py-2 bg-quaternary/20 border-2 border-foreground rounded-full text-sm font-bold text-foreground flex items-center gap-2 shadow-hard">
                      <span className="w-2 h-2 rounded-full bg-quaternary animate-pulse" />
                      Demo Active
                    </div>
                  </div>

                  <div className="flex-1 bg-card rounded-2xl border-2 border-foreground shadow-hard-lg overflow-hidden flex flex-col">
                    <div className="h-12 border-b-2 border-border flex items-center px-5 gap-5">
                      <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-secondary border border-foreground" />
                        <div className="w-3.5 h-3.5 rounded-full bg-tertiary border border-foreground" />
                        <div className="w-3.5 h-3.5 rounded-full bg-quaternary border border-foreground" />
                      </div>
                      <div className="flex-1 flex justify-center">
                        <div className="bg-muted border-2 border-border px-3 py-1 rounded-full text-xs text-muted-fg font-bold font-mono">
                          app.engagely.ai/dashboard
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-6 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1080&q=80" alt="Dashboard" className="w-full h-full object-cover rounded-xl border-2 border-border" />
                      <div className="absolute top-12 left-12 right-12 bottom-12 border-2 border-accent border-dashed rounded-2xl bg-accent/5 flex items-center justify-center">
                        <div className="bg-card p-6 rounded-2xl border-2 border-foreground shadow-hard text-center max-w-sm">
                          <h3 className="text-lg font-extrabold text-foreground mb-2 font-heading">Welcome to your workspace!</h3>
                          <p className="text-muted-fg text-sm mb-4 font-medium">AI agent analytics, flow builders, and settings — all here.</p>
                          <button className="px-6 py-2.5 bg-accent text-white rounded-full border-2 border-foreground text-sm font-bold shadow-hard hover:shadow-hard-hover bounce-transition">
                            Explore Analytics
                          </button>
                        </div>
                      </div>
                    </div>
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
