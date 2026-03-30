"use client";

import { Search, Clock, Star, Users, Sparkles, TrendingUp, ShoppingBag, GraduationCap, Building2, HeartHandshake } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: "all", name: "All Templates", icon: Sparkles },
  { id: "sales", name: "Sales & Lead Gen", icon: TrendingUp },
  { id: "support", name: "Customer Support", icon: HeartHandshake },
  { id: "ecommerce", name: "E-commerce", icon: ShoppingBag },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "enterprise", name: "Enterprise", icon: Building2 },
];

const templates = [
  { id: 1, name: "B2B SaaS Lead Qualifier", category: "sales", description: "Qualify inbound leads, book demos, and route to sales reps based on company size and budget", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", nodes: 12, avgTime: "3-5 min", conversionRate: "42%", popular: true, featured: true, tags: ["Lead Qualification", "Demo Booking", "Sales"] },
  { id: 2, name: "E-commerce Product Recommender", category: "ecommerce", description: "Guide shoppers to the right products with personalized recommendations and answer product questions", image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80", nodes: 15, avgTime: "2-4 min", conversionRate: "38%", popular: true, featured: false, tags: ["Product Discovery", "Recommendations", "Shopping"] },
  { id: 3, name: "Customer Support Triage", category: "support", description: "Handle common support questions, collect issue details, and escalate to human agents when needed", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80", nodes: 10, avgTime: "2-3 min", conversionRate: "65%", popular: true, featured: true, tags: ["Support", "Triage", "Escalation"] },
  { id: 4, name: "Course Enrollment Assistant", category: "education", description: "Help students find courses, answer curriculum questions, and guide through enrollment process", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", nodes: 14, avgTime: "4-6 min", conversionRate: "51%", popular: false, featured: false, tags: ["Education", "Enrollment", "Courses"] },
  { id: 5, name: "Enterprise RFP Helper", category: "enterprise", description: "Answer complex procurement questions, provide compliance docs, and schedule stakeholder calls", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80", nodes: 18, avgTime: "5-8 min", conversionRate: "28%", popular: false, featured: true, tags: ["Enterprise", "RFP", "Procurement"] },
  { id: 6, name: "Event Registration Flow", category: "sales", description: "Promote events, answer attendee questions, handle registration, and send confirmation emails", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", nodes: 11, avgTime: "3-4 min", conversionRate: "55%", popular: false, featured: false, tags: ["Events", "Registration", "Marketing"] },
];

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF6B5A] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-semibold text-[#1B2A4A]">Engagely</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-[#1B2A4A] hover:text-[#FF6B5A] transition-colors">Dashboard</Link>
          <Link href="/flow-builder" className="text-sm text-[#1B2A4A] hover:text-[#FF6B5A] transition-colors">Flow Builder</Link>
          <button className="px-5 py-2.5 bg-[#FF6B5A] text-white rounded-lg text-sm hover:bg-[#FF5A48] transition-all">Get Started</button>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1B2A4A] mb-4">Conversation Flow Templates</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Pre-built templates to get your AI agent up and running in minutes. Customize to fit your brand and workflow.</p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search templates..." className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FF6B5A]/20 focus:border-[#FF6B5A]" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all ${selectedCategory === cat.id ? "bg-[#1B2A4A] text-white" : "bg-white border border-gray-200 text-[#1B2A4A] hover:border-[#FF6B5A]/30"}`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-3 gap-8">
          {filtered.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={template.image} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {template.popular && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#FF6B5A] text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> Popular
                  </div>
                )}
                <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white/90 text-xs">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{template.avgTime}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{template.nodes} nodes</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#1B2A4A] mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-green-600">{template.conversionRate} conversion</span>
                  <Link href="/flow-builder" className="px-4 py-2 bg-[#FF6B5A] text-white text-sm rounded-lg hover:bg-[#FF5A48] transition-colors">Use Template</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
