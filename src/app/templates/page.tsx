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
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="bg-card border-b-2 border-foreground px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl border-2 border-foreground shadow-hard flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-2xl font-extrabold text-foreground font-heading">Engagely</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-bold text-foreground hover:text-accent bounce-transition">Dashboard</Link>
          <Link href="/flow-builder" className="text-sm font-bold text-foreground hover:text-accent bounce-transition">Flow Builder</Link>
          <button className="px-5 py-2.5 bg-accent text-white rounded-full border-2 border-foreground shadow-hard text-sm font-bold hover:shadow-hard-hover hover:-translate-y-1 bounce-transition">Get Started</button>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-pop-in">
          <h1 className="text-4xl font-heading font-extrabold text-foreground mb-4">Conversation Flow Templates</h1>
          <p className="text-lg text-muted-fg max-w-2xl mx-auto">Pre-built templates to get your AI agent up and running in minutes. Customize to fit your brand and workflow.</p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10 animate-pop-in">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-fg" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search templates..." className="w-full pl-12 pr-4 py-4 bg-card border-2 border-foreground rounded-xl text-sm outline-none focus:shadow-hard-violet" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap animate-pop-in">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 border-foreground bounce-transition ${selectedCategory === cat.id ? "bg-accent text-white shadow-hard" : "bg-card text-foreground hover:bg-tertiary"}`}
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
            <div key={template.id} className="bg-card rounded-2xl border-2 border-foreground shadow-hard overflow-hidden hover:shadow-hard-hover hover:-translate-y-1 bounce-transition group animate-pop-in">
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={template.image} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 bounce-transition" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {template.popular && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-white text-xs font-extrabold rounded-full border-2 border-foreground flex items-center gap-1">
                    <Star className="w-3 h-3" /> Popular
                  </div>
                )}
                <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white/90 text-xs font-bold">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{template.avgTime}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{template.nodes} nodes</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-heading font-extrabold text-foreground mb-2">{template.name}</h3>
                <p className="text-sm text-muted-fg mb-4 line-clamp-2">{template.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 border-2 border-border rounded-full font-bold text-xs text-muted-fg">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-quaternary">{template.conversionRate} conversion</span>
                  <Link href="/flow-builder" className="px-4 py-2 bg-accent text-white text-sm rounded-full border-2 border-foreground shadow-hard font-bold hover:shadow-hard-hover hover:-translate-y-1 bounce-transition">Use Template</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
