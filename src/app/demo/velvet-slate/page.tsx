"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bot, Settings, Paperclip, Smile, Send, LayoutDashboard, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ChatMessage {
  id: number;
  text: string;
  sender: "ai" | "user";
  options?: string[];
  backendCta?: { label: string; href: string };
}

const VS_PRIMARY = "#334155";
const VS_ACCENT = "#5d38df";

const DASHBOARD_HREF = "/demo/real-estate/dashboard";

const conversationFlows: Record<
  string,
  { reply: string; options?: string[]; backendCta?: { label: string; href: string } }
> = {
  "Schedule a Viewing": {
    reply: "I'd be happy to arrange a viewing for 12 Moonee Street. We have availability this Saturday at 10am or 2pm, or Monday at 11am. Which works best for you?",
    options: ["Saturday 10am", "Saturday 2pm", "Monday 11am"],
  },
  "Price Details": {
    reply: "12 Moonee Street is listed at $1,875,000. It last sold in 2019 for $1,350,000 — strong growth for the area. The price per sqft sits competitively within Moonee Valley. Would you like a deeper breakdown?",
    options: ["Comparable Sales", "Make an Offer", "Talk to Agent"],
  },
  "Similar Listings": {
    reply: "Based on your browsing, I've found three similar properties in Moonee Valley within a similar price range. Two have comparable features and were listed this week — shall I surface them?",
    options: ["Show All", "Schedule Viewing", "Compare Properties"],
  },
  "Saturday 10am": {
    reply: "Confirmed — viewing set for Saturday at 10am. Sarah will meet you at 12 Moonee Street. A calendar invite is on its way to your inbox. Anything else I can help with?",
    options: ["Property Report", "About the Neighbourhood", "That's all, thanks"],
    backendCta: { label: "View this lead in Dashboard", href: DASHBOARD_HREF },
  },
  "Saturday 2pm": {
    reply: "Locked in — viewing confirmed for Saturday at 2pm. Sarah will walk you through the property personally. Confirmation heading to your inbox now. Anything else?",
    options: ["Property Report", "About the Neighbourhood", "That's all, thanks"],
    backendCta: { label: "View this lead in Dashboard", href: DASHBOARD_HREF },
  },
  "Monday 11am": {
    reply: "Monday at 11am is confirmed. Sarah will be waiting at 12 Moonee Street. You'll receive a calendar invite within the hour. Anything else I can help with?",
    options: ["Property Report", "About the Neighbourhood", "That's all, thanks"],
    backendCta: { label: "View this lead in Dashboard", href: DASHBOARD_HREF },
  },
  "Comparable Sales": {
    reply: "Recent comparable sales: 8 Moonee Street sold for $1,820k in Nov 2024, 4 Riverbend Ave for $1,910k in Oct 2024, and 21 Ascot Vale Rd for $1,795k in Dec 2024. Would you like a full market report sent to your email?",
    options: ["Yes, send it", "Make an Offer", "Talk to Agent"],
  },
  "Make an Offer": {
    reply: "I'll connect you directly with Sarah to put together an offer. She's available today and will guide you through the process. Shall I arrange a call?",
    options: ["Yes, call me", "Send via email", "I need more time"],
    backendCta: { label: "Track offer intent in Dashboard", href: DASHBOARD_HREF },
  },
  "Talk to Agent": {
    reply: "I've flagged your interest to Sarah — she'll reach out within the hour. In the meantime, is there anything else I can help clarify about the property?",
    options: ["More details", "Schedule a viewing", "That's all, thanks"],
    backendCta: { label: "View lead activity in Dashboard", href: DASHBOARD_HREF },
  },
  "Property Report": {
    reply: "I'll generate a full property report for 12 Moonee Street — including zoning, flood risk, price history, and school catchments. I'll send it straight to your email. Sound good?",
    options: ["Yes, send it", "Preview first", "No thanks"],
  },
  "About the Neighbourhood": {
    reply: "Moonee Valley is a highly sought-after inner suburb. Walking distance to local cafés and parks. Top-rated schools within 2km. Low crime rate. Excellent public transport to the CBD. Any specific aspect you'd like to explore?",
    options: ["Schools", "Transport", "Cafés & Shops"],
  },
  "That's all, thanks": {
    reply: "Wonderful — I'm always here if anything comes to mind. Good luck with the search; 12 Moonee Street is a special one.",
    options: ["Start over", "Contact Sarah"],
  },
  "Schools": {
    reply: "Moonee Ponds West Primary School is a 4-minute walk and highly rated. Essendon Keilor College is the closest secondary, with a strong academic record. Private options include Penleigh & Essendon Grammar within 3km.",
    options: ["Transport next", "Cafés & Shops", "Schedule a Viewing"],
  },
  "Transport": {
    reply: "The 59 tram stops at the end of the street and runs directly to the CBD in under 20 minutes. Moonee Ponds train station is an 8-minute walk. Citylink on-ramp is a 5-minute drive.",
    options: ["Schools", "Cafés & Shops", "Schedule a Viewing"],
  },
  "Cafés & Shops": {
    reply: "The Moonee Ponds central village is a 6-minute walk — great coffee spots, a weekend farmers market, and independent boutiques. The Essendon DFO is a 10-minute drive for major retail.",
    options: ["Schools", "Transport", "Schedule a Viewing"],
  },
  "Start over": {
    reply: "Of course. I've noticed you've looked at 12 Moonee Street three times — would you like to dive deeper on this one, or shall I suggest something new?",
    options: ["Schedule a Viewing", "Price Details", "Similar Listings"],
  },
  "Contact Sarah": {
    reply: "I'll let Sarah know you'd like to connect. Expect a message from her within the next 30 minutes. Is there anything specific you'd like her to know before she reaches out?",
    options: ["Just say hi", "I have a question about price", "I'm ready to make an offer"],
  },
  "Show All": {
    reply: "Here are three comparable listings: 5 Puckle St ($1,810k, 4 bed), 18 Ormond Rd ($1,740k, 3 bed), and 9 Pascoe Vale Rd ($1,920k, 4 bed). All within 1.5km. Want details on any of these?",
    options: ["5 Puckle St", "18 Ormond Rd", "Back to 12 Moonee St"],
  },
  "Compare Properties": {
    reply: "I'll pull together a side-by-side comparison of 12 Moonee Street and the two closest matches. I can email this or display it here — which do you prefer?",
    options: ["Show here", "Email me", "Just schedule a viewing"],
  },
  "Yes, send it": {
    reply: "Done — you'll receive the full report within a few minutes. It includes everything from council rates to comparable sales and school zones. Let me know if you have questions after reading.",
    options: ["Schedule a Viewing", "Make an Offer", "That's all, thanks"],
  },
};

const fallbackReply = {
  reply: "Good question. I've made a note and Sarah will follow up with a detailed answer within the hour. Is there anything else I can help with in the meantime?",
  options: ["Schedule a Viewing", "Price Details", "Similar Listings"],
};

const ADVISOR_IMGS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBmhwy5TMA0YH9h4N1rBJnMzyJ2Lqsd55NMFyGLOSGorSVpR6je3yaG22vJA3XiAms0QWZb0J57Y5ul_nQgAFRSc01rs7a5a5QBpg0tAn96klNL8mox-6cKiXwRtfE9Jj56VVfeAW0Ip17AfJ_W56JiU8XaY1_EQEF6OxXuX31EstfW8Ln334wE2ra3SDj5zbjvXbba3hmmGiFvuPMUjDrF9W8VYSVqO8KTcgdHjx-Vi1kzTViPFuW10myMuGdIwY7Ek4QE7xvjyXFB",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBuyyCd-TTbutYlGpAKluZp6gzFK8ma6sAW__2py1VIsJY0UMpGfxNEBXzFB20Y1wlRqmWVZC22llZbZMhyIW2PW5whHCgo4-wEvzi-9SwN-Cit6nUIPrBjui92rJA-YIQ2AIsU1QksPanKxhL_Iu6VGjp9lCGiIjUK6DBvw1Xp1JwyXg0BkxUbckQ7dQeO5YfEFa4ngcBHFRb_i1wpN5hNTXMJ2WrGT6V8P-s7emmzDWqdwIOiPTM5Yf9aQqaYcTUldK3qys1IiILs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDmTifr1n39Atgg1vGy4s10vlAVP3Xo0oLONrOpycBGOABxRJrPWH7kVIAB7_nNMnqIJq4iNAlM1DKiI_PQ0ubKeUWjwS8nxDIGCt7JF4ynishiWxrNW3RCmlMXyKv9Y71OyxeXyWM8yW2Yh-SHhCxbynSRyTWzmaivDsJguVMopJDdhB-eHytCHD-KA0R0rjbKdGMUVzkQP9Mfq7Z9vXgDGdLmQi-uqUDHgpaY1yTWiLBC4mvpA0ncBih3VJ0SxMm1ewhFn2xiCY3I",
];

const AGENT_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDKMLV7i0KH8InWmkAuL6e400ZqPrYn6peky-jwosJ9eh4WMayv__iRUiLZRiSwNaDFeTqfwDHWS_mgPhdtVpEHobO319K-Je8zXpiOTRwv1K9RDsEmVhtJCHnosc1AMxNqfZB7Ic3TmS0yh5NquubXFDnulmKj8j8723dYZ9dBp6LGoalK0YMNsBQwjA7jaXoAVzaKfE_XTM1ix9dqKLQF1QIp4-bxOyMFboFNmIlBjy0mBfTDMncIh9ekNNDJM2xk5-uDTLb-hq6I";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB7KbO2NzF0ekcIkN0oIT-KI2XKA6VfLzPDGdMhO-7Z5YjDhpv2Y2Fl9yng6YWv6l_orrnkzEB-mnkpK1G4zq7uaawFhYy6OE5KOzEwQsnJRz9I4DEWtkVI4Mn-f9HiUEcEjm87z_lAAvBfFb4mFoL0RARcY5Z-byhLLiicfl9mw5CTnhsgisaO_6bivc9T1jwktimAUnMw_tOj9RkC19DvdwjJW8b2UBQjfKsZ4rM8kvfBfk9ohcuxwmvlL5uSdWl86sCRL9Dl9lJE";

export default function VelvetSlatePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Welcome back! I've noticed that you've looked at 12 Moonee Street three times — would you like to ask me any questions about this property? What's your current situation and how ready are you to buy? Ask me anything, or let me know if you'd like me to connect you with an agent.",
      sender: "ai",
      options: ["Schedule a Viewing", "Price Details", "Similar Listings"],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleOptionClick = (option: string) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { id: Date.now(), text: option, sender: "user" }]);
    setIsTyping(true);
    setTimeout(() => {
      const flow = conversationFlows[option] ?? fallbackReply;
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: flow.reply,
          sender: "ai",
          options: flow.options,
          backendCta: flow.backendCta,
        },
      ]);
      setIsTyping(false);
    }, 500 + Math.random() * 400);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    const text = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "user" }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: fallbackReply.reply, sender: "ai", options: fallbackReply.options },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div
      className="flex flex-col"
      style={{
        height: "100vh",
        overflow: "hidden",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
    >
      {/* ── TOP HALF: Velvet Slate Website ── */}
      <div className="relative overflow-hidden flex flex-col bg-white" style={{ height: "50%" }}>
        {/* Hero background */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Luxury Home" className="w-full h-full object-cover" src={HERO_IMG} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(248,250,252,1) 30%, rgba(248,250,252,0) 100%)",
            }}
          />
        </div>

        {/* Nav */}
        <header className="relative z-20 w-full flex items-center justify-between px-12 py-5">
          <div className="flex items-center gap-14">
            <span
              style={{
                fontFamily: "var(--font-manrope), Manrope, sans-serif",
                fontWeight: 800,
                color: VS_PRIMARY,
                fontSize: "1.05rem",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              Velvet Slate
              <span style={{ color: VS_ACCENT, marginLeft: 4 }}>Realty</span>
            </span>
            <nav
              className="hidden md:flex items-center gap-10"
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "rgba(15,23,42,0.55)",
              }}
            >
              {["Collections", "Advisory", "About"].map((item) => (
                <a key={item} className="hover:text-slate-700 transition-colors" href="#">
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-7">
            <button
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(15,23,42,0.75)",
                borderBottom: `1px solid rgba(51,65,85,0.25)`,
                background: "none",
              }}
            >
              Agent Login
            </button>
            <button
              className="rounded-full text-white transition-all hover:opacity-90"
              style={{
                background: VS_PRIMARY,
                padding: "11px 28px",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                boxShadow: "0 8px 24px -6px rgba(51,65,85,0.35)",
              }}
            >
              Private Viewings
            </button>
          </div>
        </header>

        {/* Hero body */}
        <main className="relative z-10 flex-1 flex items-center px-12">
          <div className="max-w-xl">
            {/* Badge */}
            <div
              className="inline-flex items-center px-3 py-1 rounded-full mb-5"
              style={{ background: `${VS_ACCENT}1a` }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: VS_ACCENT,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                The 2024 Collection
              </span>
            </div>

            {/* Headline */}
            <h1
              className="mb-5 leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-manrope), Manrope, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
                color: "#0f172a",
              }}
            >
              The Art of
              <br />
              <span
                style={{
                  color: VS_PRIMARY,
                  fontStyle: "italic",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontWeight: 700,
                }}
              >
                Curated Living.
              </span>
            </h1>

            {/* Search bar */}
            <div
              className="flex items-center rounded-2xl border mt-6"
              style={{
                background: "white",
                padding: 7,
                boxShadow: "0 20px 50px -12px rgba(148,163,184,0.45)",
                borderColor: "#f1f5f9",
                maxWidth: 480,
              }}
            >
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search size={17} className="text-slate-400 shrink-0" />
                <input
                  className="w-full border-none outline-none text-sm bg-transparent placeholder:text-slate-400"
                  placeholder="Search by neighbourhood or style..."
                  type="text"
                />
              </div>
              <button
                className="rounded-xl text-white font-bold text-xs transition-all hover:opacity-90"
                style={{ background: VS_PRIMARY, padding: "11px 22px" }}
              >
                Find Home
              </button>
            </div>

            {/* Advisor row */}
            <div className="mt-6 flex items-center gap-5">
              <div className="flex -space-x-3">
                {ADVISOR_IMGS.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    alt="Advisor"
                    className="w-8 h-8 rounded-full object-cover"
                    style={{ border: "2px solid white" }}
                    src={src}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium italic">
                Our advisors are available for consultation.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* ── BOTTOM HALF: Engagely Chat ── */}
      <div
        className="flex flex-col border-t border-slate-200"
        style={{ height: "50%", background: "#f8fafc" }}
      >
        {/* Chat header */}
        <header
          className="px-8 flex items-center justify-between shrink-0"
          style={{ background: VS_PRIMARY, height: 64 }}
        >
          {/* Left: avatar + name — min-w-0 so it can shrink */}
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="relative w-10 h-10 rounded-full overflow-hidden shrink-0"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Agent" className="w-full h-full object-cover" src={AGENT_IMG} />
              <div
                className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full"
                style={{ border: `2px solid ${VS_PRIMARY}` }}
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-white font-bold text-sm leading-tight truncate">
                Sarah&apos;s Real Estate AI Assistant
              </h2>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontWeight: 700,
                }}
              >
                Powered by Engagely
              </p>
            </div>
          </div>

          {/* Right: controls — shrink-0 so they always stay visible */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full"
              style={{ background: "#1e293b", border: "1px solid #2d3f55" }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span
                style={{
                  color: "#94a3b8",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Live
              </span>
            </div>
            <Link
              href="/demo/real-estate/dashboard"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all hover:opacity-90 text-white font-bold whitespace-nowrap"
              style={{ background: VS_ACCENT, fontSize: 11, letterSpacing: "0.04em" }}
            >
              <LayoutDashboard size={13} />
              Backend
            </Link>
            <button className="text-slate-400 hover:text-white transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto flex flex-col gap-4 px-8 py-5"
          style={{ minHeight: 0 }}
        >
          {messages.map((msg) =>
            msg.sender === "ai" ? (
              <div key={msg.id} className="flex flex-col gap-2">
                <div className="flex gap-3 max-w-2xl">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: VS_PRIMARY }}
                  >
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div
                      className="p-4 text-sm leading-relaxed"
                      style={{
                        background: "white",
                        border: "1px solid #e2e8f0",
                        color: "#1e293b",
                        borderRadius: "0 1rem 1rem 1rem",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                      }}
                    >
                      {msg.text}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#94a3b8",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginLeft: 4,
                      }}
                    >
                      Assistant
                    </span>
                  </div>
                </div>
                {msg.options && (
                  <div className="flex flex-wrap gap-2 ml-11">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        disabled={isTyping}
                        className="rounded-full text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
                        style={
                          idx === 0
                            ? {
                                background: VS_PRIMARY,
                                color: "white",
                                padding: "9px 18px",
                                boxShadow: "0 4px 8px -2px rgba(51,65,85,0.3)",
                              }
                            : {
                                background: "white",
                                color: "#475569",
                                border: "1px solid #e2e8f0",
                                padding: "9px 18px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                              }
                        }
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {msg.backendCta && (
                  <div className="ml-11">
                    <Link
                      href={msg.backendCta.href}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90 group"
                      style={{
                        background: `${VS_ACCENT}12`,
                        border: `1px solid ${VS_ACCENT}30`,
                        color: VS_ACCENT,
                      }}
                    >
                      <LayoutDashboard size={13} />
                      {msg.backendCta.label}
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="px-5 py-3 text-sm leading-relaxed"
                  style={{
                    background: VS_ACCENT,
                    color: "white",
                    borderRadius: "1rem 1rem 0 1rem",
                    maxWidth: "18rem",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            )
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: VS_PRIMARY }}
              >
                <Bot size={14} className="text-white" />
              </div>
              <div
                className="px-4 py-3 flex items-center gap-1"
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0 1rem 1rem 1rem",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Input */}
        <footer className="shrink-0 px-8 py-5 bg-white border-t border-slate-200">
          <form onSubmit={handleSend} className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                className="w-full h-14 rounded-xl px-6 pr-24 text-sm outline-none transition-all focus:ring-2"
                placeholder="Type your message here..."
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  color: "#0f172a",
                  // @ts-expect-error CSS var
                  "--tw-ring-color": VS_PRIMARY,
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Paperclip size={17} />
                </button>
                <button
                  type="button"
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Smile size={17} />
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="h-14 w-14 rounded-xl text-white flex items-center justify-center transition-all active:scale-95 hover:opacity-90 shrink-0"
              style={{
                background: VS_PRIMARY,
                boxShadow: "0 4px 12px -4px rgba(51,65,85,0.35)",
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
