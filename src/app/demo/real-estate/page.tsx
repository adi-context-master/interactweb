"use client";

import { Search, MapPin, Bed, Bath, Square, Phone, Mail, ChevronRight, Star, ArrowRight, MessageCircle, X, Send } from "lucide-react";
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
  { name: "David K.", text: "I told the chatbot my budget and it instantly showed me options I'd never have found browsing.", rating: 5 },
  { name: "Priya M.", text: "As a first-time buyer I had so many questions. The assistant was incredibly patient and helpful.", rating: 5 },
];

// Chat widget messages for the real-estate demo
interface ChatMessage {
  id: number;
  text: string;
  sender: "ai" | "user";
  options?: string[];
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    text: "Hi there! 👋 I'm the Prestige Properties assistant. I can help you find your perfect home. What are you looking for today?",
    sender: "ai",
    options: ["I'm looking to buy", "I want to sell my property", "Just browsing"],
  },
];

const conversationFlows: Record<string, { reply: string; options?: string[] }> = {
  "I'm looking to buy": {
    reply: "Great! Let me help narrow things down. What's your ideal area in London?",
    options: ["Central London", "South West London", "East London", "North London"],
  },
  "I want to sell my property": {
    reply: "We'd love to help. Our agents specialise in getting the best price. I can book a free valuation for you — which area is your property in?",
    options: ["Central London", "South West London", "East London", "North London"],
  },
  "Just browsing": {
    reply: "No problem! Feel free to explore. Here are some popular searches I can help with:",
    options: ["Show me properties under £700k", "Family homes with 4+ beds", "New listings this week"],
  },
  "Central London": {
    reply: "We have 12 properties in Central London right now. What's your budget range?",
    options: ["Under £500k", "£500k – £1M", "£1M – £3M", "£3M+"],
  },
  "South West London": {
    reply: "South West is lovely — Richmond, Wimbledon, Chelsea. What's your budget?",
    options: ["Under £500k", "£500k – £1M", "£1M – £3M", "£3M+"],
  },
  "East London": {
    reply: "East London has great options — Canary Wharf, Shoreditch, Stratford. Budget range?",
    options: ["Under £500k", "£500k – £1M", "£1M – £3M", "£3M+"],
  },
  "North London": {
    reply: "Hampstead, Islington, Highgate — excellent choices. What's your budget?",
    options: ["Under £500k", "£500k – £1M", "£1M – £3M", "£3M+"],
  },
  "Under £500k": {
    reply: "Perfect. I've found 5 properties matching your criteria. I can see the Contemporary Loft in Shoreditch (£520k) is very popular right now. Would you like to:\n\n• Book a viewing\n• Get more details\n• See similar properties\n\nI've also noted your preferences — our team will send you new matches as they come in!",
    options: ["Book a viewing", "See similar properties", "Talk to an agent"],
  },
  "£500k – £1M": {
    reply: "Great range — I've found 8 properties. The Riverside Apartment in Canary Wharf (£685k) just had a price reduction. Shall I:\n\n• Book a viewing for this weekend\n• Send you the full brochure\n• Show you the neighbourhood stats",
    options: ["Book a viewing", "Send me the brochure", "Neighbourhood stats"],
  },
  "£1M – £3M": {
    reply: "Excellent. I've got 6 premium listings for you. The Modern Penthouse on Victoria Street (£1.25M) has stunning skyline views and just came on market. Want me to:\n\n• Arrange a private viewing\n• Compare it with similar properties\n• Connect you with the listing agent",
    options: ["Arrange private viewing", "Compare properties", "Talk to listing agent"],
  },
  "£3M+": {
    reply: "Our exclusive collection. The Georgian Manor in Hampstead (£4.75M) is an exceptional property with private gardens. For properties at this level, I'd recommend a personal consultation with our senior agent. Shall I arrange that?",
    options: ["Yes, arrange a consultation", "Show me the property details", "I'll think about it"],
  },
  "Show me properties under £700k": {
    reply: "Here are 4 properties under £700k:\n\n1. Contemporary Loft, Shoreditch — £520k\n2. Riverside Apt, Canary Wharf — £685k\n\nBoth are fantastic value. The Shoreditch loft is getting a lot of interest. Want to book a viewing?",
    options: ["Book a viewing", "More details on Shoreditch loft", "Notify me of new listings"],
  },
  "Family homes with 4+ beds": {
    reply: "I've found 3 family homes with 4+ bedrooms:\n\n1. Victorian Townhouse, Chelsea — 5 bed, £2.1M\n2. Family Home, Richmond — 4 bed, £1.45M\n3. Georgian Manor, Hampstead — 7 bed, £4.75M\n\nThe Richmond home is perfect for families — great schools nearby.",
    options: ["Tell me about Richmond schools", "Book a viewing", "Compare all three"],
  },
  "New listings this week": {
    reply: "This week we've added:\n\n1. Modern Penthouse, Westminster — £1.25M (3 bed)\n2. Contemporary Loft, Shoreditch — £520k (1 bed)\n\nThe penthouse is already generating serious interest. Shall I book you in for an early viewing?",
    options: ["Book early viewing", "Get price alerts", "Talk to an agent"],
  },
};

// Fallback for any option not explicitly mapped
const fallbackReply = {
  reply: "I've noted that down and our team will follow up with you shortly. In the meantime, is there anything else I can help with? You can also reach us at 020 7946 0123.",
  options: ["Show me more properties", "I have another question", "That's all, thanks"],
};

function RealEstateChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionClick = (option: string) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { id: Date.now(), text: option, sender: "user" }]);
    setIsTyping(true);
    setTimeout(() => {
      const flow = conversationFlows[option] || fallbackReply;
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: flow.reply, sender: "ai", options: flow.options },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
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
        {
          id: Date.now() + 1,
          text: `Thanks for your message! Based on what you've said, I'd recommend browsing our featured listings above. I've also flagged your enquiry to our team — someone will be in touch within the hour.\n\nIs there anything specific I can help with?`,
          sender: "ai",
          options: ["Show me popular properties", "Book a viewing", "Talk to an agent"],
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">1</span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[580px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-emerald-600 px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm">
                PP
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Prestige Properties</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                  <span className="text-emerald-100 text-xs">Online now</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Powered by banner */}
          <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center justify-between flex-shrink-0">
            <span className="text-[11px] text-emerald-700 font-medium">Powered by Engagely AI</span>
            <Link href="/" className="text-[11px] text-emerald-600 font-semibold hover:underline">Learn more</Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%] space-y-2">
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-emerald-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  {msg.options && msg.sender === "ai" && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="px-3 py-1.5 bg-white border border-emerald-200 text-emerald-700 text-xs font-medium rounded-full hover:bg-emerald-50 hover:border-emerald-400 transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 bg-emerald-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function RealEstateDemoPage() {
  const [searchQuery, setSearchQuery] = useState("");

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

      {/* Hero */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-7xl mx-auto px-8 py-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white leading-tight mb-4">
              Find Your Perfect<br />
              <span className="text-emerald-400">London Home</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
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
              <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2">
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
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Properties</h2>
            <p className="text-slate-500 mt-1">Hand-picked homes across London</p>
          </div>
          <div className="flex items-center gap-2">
            {["All", "Buy", "Rent", "New"].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === "All" ? "bg-emerald-600 text-white" : "bg-gray-100 text-slate-600 hover:bg-gray-200"}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="relative h-56 overflow-hidden">
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
              <div className="p-5">
                <div className="text-2xl font-bold text-slate-900 mb-1">{property.price}</div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">{property.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                  <MapPin className="w-3 h-3" /> {property.address}
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1 text-xs text-slate-500"><Bed className="w-3.5 h-3.5" /> {property.beds} bed</span>
                  <span className="flex items-center gap-1 text-xs text-slate-500"><Bath className="w-3.5 h-3.5" /> {property.baths} bath</span>
                  <span className="flex items-center gap-1 text-xs text-slate-500"><Square className="w-3.5 h-3.5" /> {property.sqft} sq ft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Prestige — social proof */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">What Our Clients Say</h2>
          <p className="text-slate-500 text-center mb-10">Trusted by over 2,000 happy homeowners</p>
          <div className="grid grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-semibold text-slate-800">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-emerald-100 mb-8 text-lg">Chat with our AI assistant to get personalised property recommendations in seconds.</p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
              Browse Properties
            </button>
            <button className="px-8 py-4 bg-emerald-700 text-white font-semibold rounded-lg border-2 border-emerald-500 hover:bg-emerald-800 transition-colors">
              Book a Viewing
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
                <span className="font-bold text-lg">Prestige Properties</span>
              </div>
              <p className="text-sm text-slate-400">London&apos;s most trusted property agency. Helping you find your perfect home since 2015.</p>
            </div>
            {[
              { title: "Buy", links: ["Search Properties", "New Developments", "Property Guides", "Mortgage Calculator"] },
              { title: "Sell", links: ["Free Valuation", "Selling Guide", "Market Report", "Agent Fees"] },
              { title: "Company", links: ["About Us", "Our Team", "Careers", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}><button className="text-sm text-slate-400 hover:text-white transition-colors">{link}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-6 flex items-center justify-between text-xs text-slate-500">
            <span>© 2026 Prestige Properties. All rights reserved.</span>
            <div className="flex items-center gap-2">
              <span>AI assistant powered by</span>
              <Link href="/" className="text-emerald-400 font-semibold hover:underline">Engagely</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Engagely Chat Widget */}
      <RealEstateChat />
    </div>
  );
}
