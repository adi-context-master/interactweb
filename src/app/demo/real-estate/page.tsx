"use client";

import { Search, MapPin, Bed, Bath, Square, Phone, Mail, ChevronRight, ArrowRight, ArrowUp, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const properties = [
  {
    id: 1,
    title: "Modern Penthouse with Skyline Views",
    address: "42 Victoria Street, Westminster, SW1H 0TL",
    price: "£1,250,000",
    beds: 3,
    baths: 2,
    sqft: "1,800",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    tag: "New Listing",
  },
  {
    id: 2,
    title: "Charming Victorian Townhouse",
    address: "15 Belgravia Crescent, Chelsea, SW3 4RT",
    price: "£2,100,000",
    beds: 5,
    baths: 3,
    sqft: "3,200",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    tag: "Premium",
  },
  {
    id: 3,
    title: "Riverside Apartment in Canary Wharf",
    address: "8 Harbour Exchange, E14 9GE",
    price: "£685,000",
    beds: 2,
    baths: 1,
    sqft: "950",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    tag: "Price Reduced",
  },
  {
    id: 4,
    title: "Georgian Manor with Private Gardens",
    address: "3 The Bishops Avenue, Hampstead, N2 0BA",
    price: "£4,750,000",
    beds: 7,
    baths: 5,
    sqft: "6,500",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    tag: "Exclusive",
  },
  {
    id: 5,
    title: "Contemporary Loft in Shoreditch",
    address: "27 Redchurch Street, E2 7DJ",
    price: "£520,000",
    beds: 1,
    baths: 1,
    sqft: "720",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80",
    tag: "Popular",
  },
  {
    id: 6,
    title: "Family Home in Richmond",
    address: "44 Kew Road, Richmond, TW9 2PQ",
    price: "£1,450,000",
    beds: 4,
    baths: 3,
    sqft: "2,400",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
    tag: "Under Offer",
  },
];

const testimonials = [
  { name: "James & Sophie W.", text: "Found our dream home in two weeks. The assistant understood exactly what we needed before we did.", location: "Chelsea, SW3" },
  { name: "David K.", text: "I told it my budget and it instantly surfaced options I'd never have found browsing on my own.", location: "Canary Wharf, E14" },
  { name: "Priya M.", text: "As a first-time buyer I had endless questions. The assistant was patient, precise, and never pushy.", location: "Shoreditch, E2" },
];

// --- Chat logic ---

interface ChatMessage {
  id: number;
  text: string;
  sender: "ai" | "user";
  options?: string[];
  propertyCards?: typeof properties;
}

const conversationFlows: Record<string, { reply: string; options?: string[]; showProperties?: number[] }> = {
  "I'm looking to buy": {
    reply: "I'd love to help you find the right place. What area of London are you interested in?",
    options: ["Central London", "South West London", "East London", "North London"],
  },
  "I want to sell my property": {
    reply: "We'd love to help. Our agents specialise in getting the best price. I can book a free valuation for you — which area is your property in?",
    options: ["Central London", "South West London", "East London", "North London"],
  },
  "Just browsing": {
    reply: "No pressure at all. Here are some things I can help with:",
    options: ["Properties under £700k", "Family homes, 4+ beds", "New listings this week"],
  },
  "Central London": {
    reply: "Westminster, Mayfair, and the City are all in high demand right now. What's your budget range?",
    options: ["Under £500k", "£500k – £1M", "£1M – £3M", "£3M+"],
  },
  "South West London": {
    reply: "South West is lovely — Richmond, Wimbledon, Chelsea all have excellent options. Budget range?",
    options: ["Under £500k", "£500k – £1M", "£1M – £3M", "£3M+"],
  },
  "East London": {
    reply: "East London's booming — Canary Wharf, Shoreditch, Stratford. What's your budget?",
    options: ["Under £500k", "£500k – £1M", "£1M – £3M", "£3M+"],
  },
  "North London": {
    reply: "Hampstead, Islington, Highgate — all beautiful. What budget are we working with?",
    options: ["Under £500k", "£500k – £1M", "£1M – £3M", "£3M+"],
  },
  "Under £500k": {
    reply: "The Contemporary Loft in Shoreditch at £520k is getting a lot of interest — slightly over budget but worth a look.\n\nWould you like to book a viewing?",
    options: ["Book a viewing", "See similar properties", "Talk to an agent"],
    showProperties: [5],
  },
  "£500k – £1M": {
    reply: "The Riverside Apartment in Canary Wharf just had a price reduction to £685k — excellent value with stunning river views.\n\nShall I arrange something?",
    options: ["Book a viewing", "Send me the brochure", "Neighbourhood stats"],
    showProperties: [3],
  },
  "£1M – £3M": {
    reply: "Two premium listings that match. The Modern Penthouse in Westminster has just come on market, and the Family Home in Richmond is ideal if you need space.",
    options: ["Arrange private viewing", "Compare properties", "Talk to listing agent"],
    showProperties: [1, 6],
  },
  "£3M+": {
    reply: "The Georgian Manor in Hampstead at £4.75M is truly exceptional. Seven bedrooms, private gardens, one of the finest addresses in London.\n\nAt this level I'd recommend a personal consultation.",
    options: ["Arrange a consultation", "Property details", "I'll consider it"],
    showProperties: [4],
  },
  "Properties under £700k": {
    reply: "Your best options under £700k. The Shoreditch loft is getting serious interest — I'd move quickly if it appeals.",
    options: ["Book a viewing", "More details", "Notify me of new listings"],
    showProperties: [5, 3],
  },
  "Family homes, 4+ beds": {
    reply: "Three family homes with four or more bedrooms. The Richmond property is exceptional for families — top schools nearby and the park on your doorstep.",
    options: ["Richmond schools", "Book a viewing", "Compare all three"],
    showProperties: [2, 6, 4],
  },
  "New listings this week": {
    reply: "Fresh on the market. The penthouse is already generating serious interest — early viewings are filling up.",
    options: ["Book early viewing", "Get price alerts", "Talk to an agent"],
    showProperties: [1, 5],
  },
};

const fallbackReply = {
  reply: "Noted. Our team will follow up within the hour.\n\nAnything else I can help with?",
  options: ["Show me properties", "Another question", "That's all, thanks"],
};

export default function RealEstateDemoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (chatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatOpen]);

  const openChat = () => {
    if (!chatOpen) {
      setChatOpen(true);
      if (!hasInteracted) {
        setHasInteracted(true);
        setTimeout(() => {
          setMessages([{
            id: 1,
            text: "Good afternoon. I know every listing on this site — tell me what you're looking for and I'll find it.",
            sender: "ai",
            options: ["I'm looking to buy", "I want to sell my property", "Just browsing"],
          }]);
        }, 400);
      }
    }
  };

  const handleOptionClick = (option: string) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { id: Date.now(), text: option, sender: "user" }]);
    setIsTyping(true);
    setTimeout(() => {
      const flow = conversationFlows[option] || fallbackReply;
      const propertyCards = flow.showProperties
        ? properties.filter((p) => flow.showProperties!.includes(p.id))
        : undefined;
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: flow.reply, sender: "ai", options: flow.options, propertyCards },
      ]);
      setIsTyping(false);
    }, 600 + Math.random() * 500);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    const text = inputValue.trim();
    setInputValue("");
    openChat();
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "user" }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `I'd suggest looking at a few of our featured listings. I've flagged your enquiry — someone will follow up within the hour.\n\nWant me to narrow it down?`,
          sender: "ai",
          options: ["Show me properties", "Book a viewing", "Talk to an agent"],
          propertyCards: properties.slice(0, 2),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white font-[var(--font-source-serif)]" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.02,
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 bg-black text-white py-2.5 px-8 text-xs flex items-center justify-between" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
        <div className="flex items-center gap-6 tracking-wide">
          <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" strokeWidth={1.5} /> 020 7946 0123</span>
          <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" strokeWidth={1.5} /> hello@prestigeproperties.co.uk</span>
        </div>
        <Link href="/demo/real-estate/dashboard" className="flex items-center gap-1.5 uppercase tracking-widest text-[10px] font-medium hover:underline underline-offset-4 transition-all duration-100">
          View Backend Dashboard <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white border-b-2 border-black px-8 py-5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <span className="text-white text-lg" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>P</span>
            </div>
            <div>
              <span className="text-xl tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}>Prestige Properties</span>
              <p className="text-[9px] text-neutral-500 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>London &middot; Est. 2015</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            {["Buy", "Sell", "Rent", "New Developments", "About"].map((item) => (
              <button key={item} className="text-sm text-neutral-600 hover:text-black hover:underline underline-offset-4 transition-all duration-100 tracking-wide" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>{item}</button>
            ))}
            <button className="px-6 py-2.5 bg-black text-white text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all duration-100">
              Book Valuation
            </button>
          </div>
        </div>
      </nav>

      {/* Main layout — split when chat is open */}
      <div className="flex h-[calc(100vh-110px)]">
        {/* Website content — scrollable */}
        <div className={`transition-all duration-500 ease-in-out overflow-y-auto ${chatOpen ? "w-[55%]" : "w-full"}`}>
          {/* Hero */}
          <section className="relative bg-black overflow-hidden">
            <div
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 grayscale"
            />
            {/* Horizontal line texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)",
                backgroundSize: "100% 4px",
              }}
            />
            <div className="relative max-w-6xl mx-auto px-8 py-24">
              <div className="max-w-2xl">
                {/* Decorative rule */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[4px] w-16 bg-white" />
                  <div className="w-3 h-3 border-2 border-white" />
                </div>

                <h1
                  className={`text-white leading-none tracking-tighter mb-6 transition-all duration-500 ${chatOpen ? "text-4xl" : "text-7xl"}`}
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
                >
                  Find Your
                  <br />
                  <span className="italic">Perfect</span> London
                  <br />
                  Home
                </h1>
                <p className="text-lg text-neutral-400 mb-10 max-w-lg leading-relaxed" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>
                  Over 200 exclusive properties across London. Let our intelligent assistant find exactly what you&apos;re looking for.
                </p>

                {/* Search bar */}
                <div className="bg-white flex items-center border-2 border-white">
                  <div className="flex-1 flex items-center gap-3 px-5">
                    <Search className="w-5 h-5 text-neutral-400" strokeWidth={1.5} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by area, postcode, or property type..."
                      className="w-full py-4 outline-none text-sm text-black placeholder:text-neutral-400"
                      style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
                    />
                  </div>
                  <button className="px-8 py-4 bg-black text-white text-xs font-medium uppercase tracking-widest hover:bg-neutral-800 transition-colors duration-100 flex items-center gap-2 border-l-2 border-black">
                    Search <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Quick stats */}
                <div className="mt-12 flex items-center gap-12">
                  {[
                    { value: "200+", label: "Properties" },
                    { value: "95%", label: "Client Satisfaction" },
                    { value: "14", label: "Avg. Days to Offer" },
                    { value: "£2.1B", label: "Properties Sold" },
                  ].map((stat, i) => (
                    <div key={stat.label} className={`${i > 0 ? "border-l border-white/20 pl-12" : ""}`}>
                      <div className="text-3xl text-white tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}>{stat.value}</div>
                      <div className="text-[10px] text-neutral-500 tracking-widest uppercase mt-1" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Thick rule */}
          <div className="h-[4px] bg-black" />

          {/* Featured Properties */}
          <section className="relative max-w-6xl mx-auto px-8 py-16">
            {/* Subtle grid texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2
                    className="text-3xl tracking-tight"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
                  >
                    Featured Properties
                  </h2>
                  <p className="text-neutral-500 mt-2 text-sm" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>Hand-picked homes across London</p>
                </div>
                <div className="flex items-center">
                  {["All", "Buy", "Rent", "New"].map((filter, i) => (
                    <button
                      key={filter}
                      className={`px-4 py-2 text-xs uppercase tracking-widest border-2 border-black transition-all duration-100 ${
                        filter === "All" ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
                      } ${i > 0 ? "-ml-[2px]" : ""}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`grid gap-6 ${chatOpen ? "grid-cols-2" : "grid-cols-3"}`}>
                {properties.map((property) => (
                  <div key={property.id} className="group cursor-pointer border-2 border-black hover:bg-black transition-all duration-100">
                    <div className={`relative overflow-hidden ${chatOpen ? "h-44" : "h-56"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                      />
                      <div className="absolute top-0 left-0 bg-black text-white text-[10px] uppercase tracking-widest px-3 py-1.5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                        {property.tag}
                      </div>
                    </div>
                    <div className="p-5 border-t-2 border-black group-hover:border-white/20">
                      <div
                        className="text-2xl text-black group-hover:text-white mb-1 tracking-tight"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
                      >
                        {property.price}
                      </div>
                      <h3 className="text-sm font-medium text-black group-hover:text-white mb-1.5" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>
                        {property.title}
                      </h3>
                      <p className="text-xs text-neutral-500 group-hover:text-neutral-400 flex items-center gap-1 mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                        <MapPin className="w-3 h-3" strokeWidth={1.5} /> {property.address}
                      </p>
                      <div className="flex items-center gap-6 pt-4 border-t border-neutral-200 group-hover:border-white/20">
                        <span className="flex items-center gap-1.5 text-xs text-neutral-500 group-hover:text-neutral-400"><Bed className="w-3.5 h-3.5" strokeWidth={1.5} /> {property.beds} bed</span>
                        <span className="flex items-center gap-1.5 text-xs text-neutral-500 group-hover:text-neutral-400"><Bath className="w-3.5 h-3.5" strokeWidth={1.5} /> {property.baths} bath</span>
                        <span className="flex items-center gap-1.5 text-xs text-neutral-500 group-hover:text-neutral-400"><Square className="w-3.5 h-3.5" strokeWidth={1.5} /> {property.sqft} sqft</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Thick rule */}
          <div className="h-[4px] bg-black" />

          {/* Testimonials */}
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-8">
              <div className="text-center mb-12">
                <h2
                  className="text-3xl tracking-tight mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
                >
                  What Our Clients Say
                </h2>
                <p className="text-neutral-500 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  Trusted by over 2,000 homeowners
                </p>
              </div>
              <div className={`grid gap-0 ${chatOpen ? "grid-cols-2" : "grid-cols-3"}`}>
                {testimonials.slice(0, chatOpen ? 2 : 3).map((t) => (
                  <div key={t.name} className="group border-2 border-black -ml-[2px] first:ml-0 p-8 hover:bg-black transition-all duration-100">
                    <div className="text-6xl text-neutral-200 group-hover:text-white/20 leading-none transition-opacity duration-100" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                      &ldquo;
                    </div>
                    <p
                      className="text-lg text-black group-hover:text-white leading-relaxed mt-2 mb-6 italic"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {t.text}
                    </p>
                    <div className="border-t border-neutral-200 group-hover:border-white/20 pt-4 transition-all duration-100">
                      <p className="text-sm font-semibold text-black group-hover:text-white">{t.name}</p>
                      <p className="text-[10px] text-neutral-500 group-hover:text-neutral-400 tracking-widest uppercase mt-0.5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{t.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Thick rule */}
          <div className="h-[4px] bg-black" />

          {/* CTA — inverted */}
          <section className="relative bg-black py-20 overflow-hidden">
            {/* Radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle at top center, rgba(255,255,255,0.05), transparent 70%)" }}
            />
            <div className="relative max-w-3xl mx-auto px-8 text-center">
              <h2
                className="text-4xl text-white tracking-tight mb-4"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
              >
                Ready to Find Your
                <br />
                <span className="italic">Dream Home?</span>
              </h2>
              <p className="text-neutral-400 mb-10 text-lg" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>
                Chat with our intelligent assistant for personalised recommendations in seconds.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button onClick={openChat} className="px-8 py-4 bg-white text-black text-xs font-medium uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-100 border-2 border-white">
                  Ask the Assistant &rarr;
                </button>
                <button className="px-8 py-4 bg-transparent text-white text-xs font-medium uppercase tracking-widest border-2 border-white hover:bg-white hover:text-black transition-all duration-100">
                  Book a Viewing
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-black text-white border-t-4 border-white">
            <div className="max-w-6xl mx-auto px-8 py-12">
              <div className={`grid gap-8 mb-10 ${chatOpen ? "grid-cols-2" : "grid-cols-4"}`}>
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 border-2 border-white flex items-center justify-center">
                      <span className="text-white text-sm" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>P</span>
                    </div>
                    <span className="text-base tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}>Prestige Properties</span>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>
                    London&apos;s most trusted property agency since 2015.
                  </p>
                </div>
                {(chatOpen ? [{ title: "Quick Links", links: ["Search Properties", "Free Valuation", "About Us", "Contact"] }] : [
                  { title: "Buy", links: ["Search Properties", "New Developments", "Property Guides", "Mortgage Calculator"] },
                  { title: "Sell", links: ["Free Valuation", "Selling Guide", "Market Report", "Agent Fees"] },
                  { title: "Company", links: ["About Us", "Our Team", "Careers", "Contact"] },
                ]).map((col) => (
                  <div key={col.title}>
                    <h4 className="text-xs uppercase tracking-widest mb-4 text-neutral-400" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{col.title}</h4>
                    <ul className="space-y-2">
                      {col.links.map((link) => (
                        <li key={link}>
                          <button className="text-sm text-neutral-500 hover:text-white hover:underline underline-offset-4 transition-all duration-100" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>
                            {link}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/20 pt-6 flex items-center justify-between text-[10px] tracking-widest uppercase text-neutral-600" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                <span>&copy; 2026 Prestige Properties</span>
                <div className="flex items-center gap-2">
                  <span>AI assistant by</span>
                  <Link href="/" className="text-white hover:underline underline-offset-4">Engagely</Link>
                </div>
              </div>
            </div>
          </footer>

          {/* Bottom spacer for the input bar when chat is closed */}
          {!chatOpen && <div className="h-16" />}
        </div>

        {/* Chat panel — slides in from right */}
        <div className={`transition-all duration-500 ease-in-out border-l-2 border-black bg-white flex flex-col ${chatOpen ? "w-[45%]" : "w-0"} overflow-hidden`}>
          {chatOpen && (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black flex items-center justify-center">
                    <span className="text-white text-xs" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>P</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-black" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Property Assistant</h3>
                    <p className="text-[10px] text-neutral-400 tracking-widest uppercase" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Powered by Engagely</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white text-black transition-all duration-100"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="max-w-lg mx-auto space-y-6">
                  {messages.map((msg) => (
                    <div key={msg.id}>
                      {msg.sender === "user" ? (
                        <div className="flex justify-end">
                          <div className="bg-black text-white px-5 py-3 max-w-[80%]">
                            <p className="text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>{msg.text}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex gap-4">
                            <div className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-white text-[9px]" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>P</span>
                            </div>
                            <div className="space-y-4 flex-1 min-w-0">
                              <p className="text-[14px] text-black leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>{msg.text}</p>

                              {/* Inline property cards */}
                              {msg.propertyCards && msg.propertyCards.length > 0 && (
                                <div className="space-y-2">
                                  {msg.propertyCards.map((p) => (
                                    <div key={p.id} className="flex gap-3 p-3 border-2 border-black hover:bg-black group/card transition-all duration-100 cursor-pointer">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img src={p.image} alt={p.title} className="w-20 h-20 object-cover flex-shrink-0 grayscale group-hover/card:grayscale-0 transition-all duration-300" />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm text-black group-hover/card:text-white tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}>{p.price}</span>
                                          <span className="text-[9px] uppercase tracking-widest text-neutral-500 group-hover/card:text-neutral-400" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{p.tag}</span>
                                        </div>
                                        <p className="text-xs text-black group-hover/card:text-white mt-0.5 truncate" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>{p.title}</p>
                                        <p className="text-[10px] text-neutral-500 group-hover/card:text-neutral-400 mt-0.5 flex items-center gap-1 truncate" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                                          <MapPin className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} /> {p.address}
                                        </p>
                                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-neutral-500 group-hover/card:text-neutral-400" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                                          <span>{p.beds} bed</span>
                                          <span>{p.baths} bath</span>
                                          <span>{p.sqft} sqft</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Quick reply options */}
                              {msg.options && (
                                <div className="flex flex-wrap gap-2">
                                  {msg.options.map((opt) => (
                                    <button
                                      key={opt}
                                      onClick={() => handleOptionClick(opt)}
                                      className="px-4 py-2 border-2 border-black text-black text-[12px] tracking-wide hover:bg-black hover:text-white transition-all duration-100"
                                      style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-4">
                      <div className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[9px]" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>P</span>
                      </div>
                      <div className="flex items-center gap-2 py-2">
                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
              </div>

              {/* Chat input */}
              <div className="px-6 py-4 border-t-2 border-black flex-shrink-0">
                <form onSubmit={handleSend} className="flex items-center gap-2 border-b-2 border-black focus-within:border-b-4 transition-all duration-100 pb-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about properties, areas, viewings..."
                    className="flex-1 bg-transparent outline-none text-sm text-black placeholder:text-neutral-400 placeholder:italic py-1"
                    style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="w-8 h-8 bg-black disabled:bg-neutral-300 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors duration-100 flex-shrink-0"
                  >
                    <ArrowUp className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </form>
                <p className="text-center text-[9px] text-neutral-400 mt-3 tracking-widest uppercase" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  AI by <Link href="/" className="text-black hover:underline underline-offset-2">Engagely</Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sticky bottom bar — visible when chat is closed */}
      {!chatOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-black">
          <div className="max-w-3xl mx-auto px-8 py-3">
            <button
              onClick={openChat}
              className="w-full flex items-center gap-4 border-2 border-black px-6 py-4 hover:bg-black hover:text-white transition-all duration-100 group"
            >
              <div className="w-8 h-8 bg-black group-hover:bg-white flex items-center justify-center transition-all duration-100 flex-shrink-0">
                <span className="text-white group-hover:text-black text-xs" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>P</span>
              </div>
              <span className="text-sm text-neutral-400 group-hover:text-neutral-300 italic" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>
                Ask about properties, areas, or book a viewing...
              </span>
              <div className="ml-auto flex items-center gap-3">
                <span className="text-[9px] text-neutral-400 group-hover:text-neutral-500 tracking-widest uppercase hidden sm:block" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  Powered by Engagely
                </span>
                <div className="w-8 h-8 border-2 border-black group-hover:border-white group-hover:bg-white flex items-center justify-center transition-all duration-100">
                  <ArrowUp className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
