"use client";

import { Search, MapPin, Bed, Bath, Square, Phone, Mail, ChevronRight, Star, ArrowRight, Sparkles, Send, ArrowUp, X } from "lucide-react";
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
    tagColor: "bg-emerald-500",
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
    tagColor: "bg-amber-500",
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
    tagColor: "bg-rose-500",
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
    tagColor: "bg-violet-500",
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
    tagColor: "bg-blue-500",
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
    tagColor: "bg-orange-500",
  },
];

const testimonials = [
  { name: "James & Sophie", text: "Found our dream home in 2 weeks. The AI assistant understood exactly what we needed.", rating: 5 },
  { name: "David K.", text: "I told the assistant my budget and it instantly showed me options I'd never have found browsing.", rating: 5 },
  { name: "Priya M.", text: "As a first-time buyer I had so many questions. The assistant was incredibly patient and helpful.", rating: 5 },
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
    options: ["Show me properties under £700k", "Family homes with 4+ beds", "New listings this week"],
  },
  "Central London": {
    reply: "Great choice — Westminster, Mayfair, and the City are all in high demand right now. What's your budget range?",
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
    reply: "I've found a couple of strong options in your range. The Contemporary Loft in Shoreditch at £520k is getting a lot of interest — it's just over budget but worth a look.\n\nWould you like to book a viewing or see more details?",
    options: ["Book a viewing", "See similar properties", "Talk to an agent"],
    showProperties: [5],
  },
  "£500k – £1M": {
    reply: "Great range. The Riverside Apartment in Canary Wharf just had a price reduction to £685k — excellent value with stunning river views.\n\nShall I arrange something?",
    options: ["Book a viewing", "Send me the brochure", "Neighbourhood stats"],
    showProperties: [3],
  },
  "£1M – £3M": {
    reply: "Here are two premium listings that match. The Modern Penthouse in Westminster has just come on market with incredible skyline views, and the Family Home in Richmond is perfect if you need space.\n\nWant to explore either?",
    options: ["Arrange private viewing", "Compare properties", "Talk to listing agent"],
    showProperties: [1, 6],
  },
  "£3M+": {
    reply: "For our exclusive collection — the Georgian Manor in Hampstead at £4.75M is truly exceptional. 7 bedrooms, private gardens, one of the finest addresses in London.\n\nAt this level I'd recommend a personal consultation with our senior agent.",
    options: ["Yes, arrange a consultation", "Show me the property details", "I'll think about it"],
    showProperties: [4],
  },
  "Show me properties under £700k": {
    reply: "Here are your best options under £700k. The Shoreditch loft is getting serious interest — I'd move quickly on that one if you like it.",
    options: ["Book a viewing", "More details", "Notify me of new listings"],
    showProperties: [5, 3],
  },
  "Family homes with 4+ beds": {
    reply: "Three family homes with 4+ bedrooms. The Richmond property is fantastic for families — excellent schools nearby and Richmond Park on the doorstep.",
    options: ["Tell me about Richmond schools", "Book a viewing", "Compare all three"],
    showProperties: [2, 6, 4],
  },
  "New listings this week": {
    reply: "Fresh on the market this week. The penthouse is already generating serious interest — early viewings are filling up fast.",
    options: ["Book early viewing", "Get price alerts", "Talk to an agent"],
    showProperties: [1, 5],
  },
};

const fallbackReply = {
  reply: "I've noted that down. Our team will follow up with you shortly — usually within the hour.\n\nAnything else I can help with in the meantime?",
  options: ["Show me more properties", "I have another question", "That's all, thanks"],
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
        // Send initial AI greeting after a beat
        setTimeout(() => {
          setMessages([{
            id: 1,
            text: "Hi! I'm the Prestige Properties assistant. I know every listing on this site — ask me anything, or tell me what you're looking for and I'll find it for you.",
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
          text: `Based on what you've mentioned, I'd suggest looking at a few of our featured listings. I've flagged your enquiry to the team — someone will follow up within the hour.\n\nWant me to narrow it down further?`,
          sender: "ai",
          options: ["Show me popular properties", "Book a viewing", "Talk to an agent"],
          propertyCards: properties.slice(0, 2),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top bar */}
      <div className="bg-slate-900 text-white py-2 px-6 text-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> 020 7946 0123</span>
          <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> hello@prestigeproperties.co.uk</span>
        </div>
        <Link href="/demo/real-estate/dashboard" className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded-full text-xs font-semibold transition-colors">
          View Backend Dashboard <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Prestige Properties</span>
              <p className="text-[10px] text-slate-400 font-medium -mt-0.5 tracking-wider uppercase">London&apos;s Finest Homes</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            {["Buy", "Sell", "Rent", "New Developments", "About"].map((item) => (
              <button key={item} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">{item}</button>
            ))}
            <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors">
              Book Valuation
            </button>
          </div>
        </div>
      </nav>

      {/* Main layout — split when chat is open */}
      <div className="flex h-[calc(100vh-105px)]">
        {/* Website content — scrollable */}
        <div className={`transition-all duration-500 ease-in-out overflow-y-auto ${chatOpen ? "w-[55%]" : "w-full"}`}>
          {/* Hero */}
          <section className="relative bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30" />
            <div className="relative max-w-5xl mx-auto px-8 py-20">
              <div className="max-w-2xl">
                <h1 className={`font-bold text-white leading-tight mb-4 transition-all duration-500 ${chatOpen ? "text-3xl" : "text-5xl"}`}>
                  Find Your Perfect<br />
                  <span className="text-emerald-400">London Home</span>
                </h1>
                <p className="text-base text-slate-300 mb-8">
                  Over 200 exclusive properties across London. Let our AI assistant help you find exactly what you&apos;re looking for.
                </p>

                {/* Search bar */}
                <div className="bg-white rounded-xl p-2 flex items-center gap-2 shadow-xl">
                  <div className="flex-1 flex items-center gap-2 px-4">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by area, postcode, or property type..."
                      className="w-full py-3 outline-none text-sm text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                  <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2">
                    Search <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick stats */}
                <div className="mt-8 flex items-center gap-8">
                  {[
                    { value: "200+", label: "Properties" },
                    { value: "95%", label: "Client Satisfaction" },
                    { value: "14 days", label: "Avg. Time to Offer" },
                    { value: "£2.1B", label: "Properties Sold" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Featured Properties */}
          <section className="max-w-5xl mx-auto px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Featured Properties</h2>
                <p className="text-slate-500 mt-1 text-sm">Hand-picked homes across London</p>
              </div>
              <div className="flex items-center gap-2">
                {["All", "Buy", "Rent", "New"].map((filter) => (
                  <button
                    key={filter}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === "All" ? "bg-emerald-600 text-white" : "bg-gray-100 text-slate-600 hover:bg-gray-200"}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className={`grid gap-5 ${chatOpen ? "grid-cols-2" : "grid-cols-3"}`}>
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className={`relative overflow-hidden ${chatOpen ? "h-44" : "h-56"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute top-3 left-3 ${property.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {property.tag}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xl font-bold text-slate-900 mb-1">{property.price}</div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-1.5">{property.title}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-3 h-3" /> {property.address}
                    </p>
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                      <span className="flex items-center gap-1 text-xs text-slate-500"><Bed className="w-3.5 h-3.5" /> {property.beds}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500"><Bath className="w-3.5 h-3.5" /> {property.baths}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500"><Square className="w-3.5 h-3.5" /> {property.sqft}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-slate-50 py-12">
            <div className="max-w-5xl mx-auto px-8">
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">What Our Clients Say</h2>
              <p className="text-slate-500 text-center mb-8 text-sm">Trusted by over 2,000 happy homeowners</p>
              <div className={`grid gap-5 ${chatOpen ? "grid-cols-2" : "grid-cols-3"}`}>
                {testimonials.slice(0, chatOpen ? 2 : 3).map((t) => (
                  <div key={t.name} className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 mb-3 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                    <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-emerald-600 py-12">
            <div className="max-w-3xl mx-auto px-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Ready to Find Your Dream Home?</h2>
              <p className="text-emerald-100 mb-6">Chat with our AI assistant to get personalised property recommendations in seconds.</p>
              <div className="flex items-center justify-center gap-4">
                <button onClick={openChat} className="px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                  Ask the AI Assistant
                </button>
                <button className="px-8 py-3 bg-emerald-700 text-white font-semibold rounded-lg border-2 border-emerald-500 hover:bg-emerald-800 transition-colors">
                  Book a Viewing
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-900 text-white py-10">
            <div className="max-w-5xl mx-auto px-8">
              <div className={`grid gap-8 mb-8 ${chatOpen ? "grid-cols-2" : "grid-cols-4"}`}>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center text-white font-bold text-xs">P</div>
                    <span className="font-bold">Prestige Properties</span>
                  </div>
                  <p className="text-sm text-slate-400">London&apos;s most trusted property agency since 2015.</p>
                </div>
                {(chatOpen ? [{ title: "Quick Links", links: ["Search Properties", "Free Valuation", "About Us", "Contact"] }] : [
                  { title: "Buy", links: ["Search Properties", "New Developments", "Property Guides", "Mortgage Calculator"] },
                  { title: "Sell", links: ["Free Valuation", "Selling Guide", "Market Report", "Agent Fees"] },
                  { title: "Company", links: ["About Us", "Our Team", "Careers", "Contact"] },
                ]).map((col) => (
                  <div key={col.title}>
                    <h4 className="font-semibold mb-3 text-sm">{col.title}</h4>
                    <ul className="space-y-1.5">
                      {col.links.map((link) => (
                        <li key={link}><button className="text-sm text-slate-400 hover:text-white transition-colors">{link}</button></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-500">
                <span>&copy; 2026 Prestige Properties</span>
                <div className="flex items-center gap-2">
                  <span>AI assistant powered by</span>
                  <Link href="/" className="text-emerald-400 font-semibold hover:underline">Engagely</Link>
                </div>
              </div>
            </div>
          </footer>

          {/* Bottom spacer for the input bar when chat is closed */}
          {!chatOpen && <div className="h-16" />}
        </div>

        {/* Chat panel — slides in from right */}
        <div className={`transition-all duration-500 ease-in-out border-l border-gray-200 bg-white flex flex-col ${chatOpen ? "w-[45%]" : "w-0"} overflow-hidden`}>
          {chatOpen && (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Property Assistant</h3>
                    <p className="text-[11px] text-slate-400">Powered by Engagely</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="max-w-lg mx-auto space-y-6">
                  {messages.map((msg) => (
                    <div key={msg.id}>
                      {msg.sender === "user" ? (
                        <div className="flex justify-end">
                          <div className="bg-emerald-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
                            <p className="text-[14px] leading-relaxed">{msg.text}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <div className="space-y-3 flex-1 min-w-0">
                              <p className="text-[14px] text-slate-700 leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                              {/* Inline property cards */}
                              {msg.propertyCards && msg.propertyCards.length > 0 && (
                                <div className="space-y-2">
                                  {msg.propertyCards.map((p) => (
                                    <div key={p.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img src={p.image} alt={p.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm font-bold text-slate-900">{p.price}</span>
                                          <span className={`${p.tagColor} text-white text-[10px] font-semibold px-2 py-0.5 rounded-full`}>{p.tag}</span>
                                        </div>
                                        <p className="text-xs font-medium text-slate-700 mt-0.5 truncate">{p.title}</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                                          <MapPin className="w-3 h-3 flex-shrink-0" /> {p.address}
                                        </p>
                                        <div className="flex items-center gap-3 mt-1.5">
                                          <span className="text-[11px] text-slate-500">{p.beds} bed</span>
                                          <span className="text-[11px] text-slate-500">{p.baths} bath</span>
                                          <span className="text-[11px] text-slate-500">{p.sqft} sqft</span>
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
                                      className="px-3.5 py-2 bg-white border border-gray-200 text-slate-700 text-[13px] font-medium rounded-xl hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all"
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
                    <div className="flex gap-3">
                      <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="flex items-center gap-1.5 py-2">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
              </div>

              {/* Chat input */}
              <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
                <form onSubmit={handleSend} className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-emerald-200 focus-within:bg-white transition-all border border-transparent focus-within:border-emerald-300">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about properties, areas, viewings..."
                    className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400 py-1"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="w-8 h-8 bg-emerald-600 disabled:bg-gray-300 text-white rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors flex-shrink-0"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-center text-[10px] text-slate-400 mt-2">
                  AI assistant by <Link href="/" className="text-emerald-500 hover:underline font-medium">Engagely</Link> &mdash; conversations help us serve you better
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sticky bottom bar — visible when chat is closed */}
      {!chatOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="max-w-3xl mx-auto px-6 py-3">
            <button
              onClick={openChat}
              className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-50 rounded-xl px-5 py-3.5 transition-all group border border-gray-200 hover:border-emerald-300 hover:shadow-sm"
            >
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm text-slate-400 group-hover:text-slate-600 transition-colors">Ask about properties, areas, or book a viewing...</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-medium hidden sm:block">Powered by Engagely</span>
                <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <ArrowUp className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
