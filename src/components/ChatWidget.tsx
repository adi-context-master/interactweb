"use client";

import {
  Mic,
  Volume2,
  X,
  Send,
  MicOff,
  VolumeX,
  Mail,
  Minimize2,
  CheckCircle2,
  ArrowRight,
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

  useEffect(() => {
    if (forceOpen) setIsOpen(true);
  }, [forceOpen]);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);

  const [email, setEmail] = useState("");
  const [demoStarted, setDemoStarted] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Arya. How can I help you today?",
      sender: "ai",
      time: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: inputValue, sender: "user", time: "Just now" },
    ]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text:
            "I can definitely help with that! " +
            (!demoStarted
              ? "Please enter your email on the right to start the interactive demo."
              : "Check out the demo on the right side to see Engagely in action."),
          sender: "ai",
          time: "Just now",
        },
      ]);
    }, 1000);
  };

  const handleStartDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setDemoStarted(true);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Great! I've started the interactive demo for you. Let me know if you have any questions as you explore.",
          sender: "ai",
          time: "Just now",
        },
      ]);
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
            {/* Speech Bubble */}
            <div className="relative bg-white px-6 py-4 rounded-[20px] shadow-2xl border border-gray-100/80 mb-4 z-20 w-max self-start ml-2">
              <p className="text-[15px] font-medium text-[#1B2A4A] tracking-tight">
                Hi, I&apos;m Arya. How can I help you today?
              </p>
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-gray-100/80 transform rotate-45" />
            </div>

            {/* Avatar and Button Row */}
            <div className="flex items-center gap-4 relative z-10">
              {/* Avatar */}
              <button
                onClick={() => setIsOpen(true)}
                className="w-14 h-14 rounded-full overflow-hidden shadow-xl border-[3px] border-white hover:scale-105 transition-transform shrink-0 relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                  alt="Arya"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Pill Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 bg-white border border-gray-100 pl-5 pr-7 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:border-[#FF6B5A]/30 hover:-translate-y-0.5 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B5A]/[0.08] to-transparent" />
                {/* Audio Wave Icon */}
                <div className="flex gap-[3px] items-center h-4 relative z-10">
                  <div className="w-[3px] bg-[#FF6B5A] h-[8px] rounded-full group-hover:h-[12px] transition-all duration-300" />
                  <div className="w-[3px] bg-[#FF6B5A] h-[14px] rounded-full group-hover:h-[16px] transition-all duration-300 delay-75" />
                  <div className="w-[3px] bg-[#FF6B5A] h-[10px] rounded-full group-hover:h-[14px] transition-all duration-300 delay-150" />
                  <div className="w-[3px] bg-[#FF6B5A] h-[6px] rounded-full group-hover:h-[10px] transition-all duration-300 delay-200" />
                  <div className="w-[3px] bg-[#FF6B5A] h-[12px] rounded-full group-hover:h-[14px] transition-all duration-300 delay-75" />
                </div>
                <span className="text-[15px] font-bold text-[#FF6B5A] relative z-10">
                  Talk to our agent Arya
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Full-screen Split */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex overflow-hidden"
          >
            {/* LEFT PANEL - Avatar & Chat (40%) */}
            <div className="w-[40%] min-w-[400px] border-r border-gray-200 flex flex-col bg-gray-50 h-full">
              {/* Top Half - Video Avatar */}
              <div className="h-[40%] relative bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1080&q=80"
                  alt="Arya - AI Assistant"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />

                {/* Header controls inside video */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-[#1B2A4A]">
                      Arya
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/40 border border-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <Minimize2 className="w-5 h-5 text-white" />
                </button>

                {/* Bottom Video Controls */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all backdrop-blur-md border ${
                      isMuted
                        ? "bg-red-500/90 border-red-500 hover:bg-red-600/90 text-white"
                        : "bg-white/20 border-white/30 hover:bg-white/30 text-white"
                    }`}
                  >
                    {isMuted ? (
                      <MicOff className="w-5 h-5" />
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsSpeakerOff(!isSpeakerOff)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all backdrop-blur-md border ${
                      isSpeakerOff
                        ? "bg-red-500/90 border-red-500 hover:bg-red-600/90 text-white"
                        : "bg-white/20 border-white/30 hover:bg-white/30 text-white"
                    }`}
                  >
                    {isSpeakerOff ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom Half - Chat Area */}
              <div className="h-[60%] flex flex-col bg-white">
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-5 py-3.5 max-w-[85%] shadow-sm ${
                          msg.sender === "user"
                            ? "bg-[#FF6B5A] text-white rounded-tr-none"
                            : "bg-gray-100 text-[#1B2A4A] rounded-tl-none border border-gray-200"
                        }`}
                      >
                        <p className="text-[15px] leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 mt-1.5 mx-1">
                        {msg.time}
                      </span>
                    </div>
                  ))}

                  {!demoStarted && messages.length === 1 && (
                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        onClick={() => setInputValue("I'd like to see a demo")}
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-left hover:border-[#FF6B5A] hover:bg-[#FF6B5A]/5 transition-all text-sm font-medium text-[#1B2A4A]"
                      >
                        I&apos;d like to see a demo
                      </button>
                      <button
                        onClick={() =>
                          setInputValue("How does pricing work?")
                        }
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-left hover:border-[#FF6B5A] hover:bg-[#FF6B5A]/5 transition-all text-sm font-medium text-[#1B2A4A]"
                      >
                        How does pricing work?
                      </button>
                    </div>
                  )}
                  <div ref={endOfMessagesRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#FF6B5A]/20 focus-within:border-[#FF6B5A] transition-all"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Reply to Arya..."
                      className="flex-1 bg-transparent outline-none text-[15px] text-[#1B2A4A] placeholder:text-gray-400"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="p-2 bg-[#FF6B5A] disabled:bg-gray-300 hover:bg-[#FF5A48] rounded-full transition-colors text-white"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL - Demo / Form (60%) */}
            <div className="w-[60%] bg-[#FAFAF8] relative h-full flex flex-col">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-8 w-10 h-10 bg-white shadow-sm border border-gray-200 hover:border-gray-300 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {!demoStarted ? (
                /* Email Collection Form */
                <div className="flex-1 flex flex-col items-center justify-center p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B5A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1B2A4A]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                  <div className="max-w-md w-full relative z-10">
                    <div className="w-16 h-16 bg-[#FF6B5A]/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                      <Mail className="w-8 h-8 text-[#FF6B5A]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#1B2A4A] text-center mb-4">
                      Ready to see the magic?
                    </h2>
                    <p className="text-gray-600 text-center mb-8 text-lg">
                      Enter your email to unlock the interactive Engagely
                      platform demo.
                    </p>

                    <form onSubmit={handleStartDemo} className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Work Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-[#FF6B5A] focus:ring-4 focus:ring-[#FF6B5A]/10 transition-all text-lg"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#1B2A4A] text-white rounded-xl font-semibold text-lg hover:bg-[#2A4072] transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        Start Interactive Demo{" "}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>

                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> No
                        credit card
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />{" "}
                        Instant access
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Interactive Demo View */
                <div className="flex-1 flex flex-col p-8 bg-[#F3F4F6] overflow-y-auto">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1B2A4A]">
                        Platform Demo
                      </h2>
                      <p className="text-gray-500 mt-1">
                        Explore the Engagely dashboard
                      </p>
                    </div>
                    <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Demo Active
                    </div>
                  </div>

                  {/* Mock Dashboard UI */}
                  <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="h-14 border-b border-gray-100 flex items-center px-6 gap-6">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 flex justify-center">
                        <div className="bg-gray-100 px-3 py-1 rounded-md text-xs text-gray-500 font-mono">
                          app.engagely.ai/dashboard
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-6 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1080&q=80"
                        alt="Dashboard Mockup"
                        className="w-full h-full object-cover rounded-lg shadow-inner"
                      />
                      <div className="absolute top-12 left-12 right-12 bottom-12 border-2 border-[#FF6B5A] border-dashed rounded-xl bg-[#FF6B5A]/5 flex items-center justify-center backdrop-blur-[1px]">
                        <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm border border-[#FF6B5A]/20">
                          <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">
                            Welcome to your workspace!
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            This is where you&apos;ll see all your AI agent
                            analytics, flow builders, and settings.
                          </p>
                          <button className="px-6 py-2 bg-[#FF6B5A] text-white rounded-lg text-sm font-medium hover:bg-[#FF5A48]">
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
