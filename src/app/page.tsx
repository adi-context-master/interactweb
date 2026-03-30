"use client";

import { ArrowRight } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [showWidget, setShowWidget] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWidget(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleTryDemo = () => {
    setShowWidget(true);
    setForceOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF6B5A]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#1B2A4A]/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#FF6B5A]/5 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-8 py-6 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF6B5A] rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-semibold text-[#1B2A4A]">Engagely</span>
        </div>
        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-sm text-[#1B2A4A] hover:text-[#FF6B5A] transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/templates"
            className="text-sm text-[#1B2A4A] hover:text-[#FF6B5A] transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/flow-builder"
            className="text-sm text-[#1B2A4A] hover:text-[#FF6B5A] transition-colors"
          >
            Flow Builder
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-[#1B2A4A] hover:text-[#FF6B5A] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/integrations"
            className="text-sm text-[#1B2A4A] hover:text-[#FF6B5A] transition-colors"
          >
            Integrations
          </Link>
          <button className="px-4 py-2 text-sm text-[#1B2A4A] hover:text-[#FF6B5A] transition-colors">
            Sign in
          </button>
          <button className="px-5 py-2.5 bg-[#FF6B5A] text-white rounded-lg text-sm hover:bg-[#FF5A48] transition-all hover:shadow-lg hover:-translate-y-0.5">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-8 py-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-[#FF6B5A]/10 rounded-full mb-2 backdrop-blur-sm border border-[#FF6B5A]/20">
              <span className="text-sm font-medium text-[#FF6B5A]">
                ✨ Now with AI Video Agents
              </span>
            </div>
            <div className="space-y-6">
              <h1 className="text-6xl font-bold text-[#1B2A4A] leading-tight">
                Turn every visit into a conversation.{" "}
                <span className="text-[#FF6B5A] inline-block hover:scale-105 transition-transform">
                  Turn every conversation into pipeline.
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Replace your static website with an{" "}
                <strong>AI video agent</strong> that qualifies leads, books
                meetings, and answers questions 24/7. Not just a chatbot—a
                real face that builds trust.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-[#FF6B5A] text-white rounded-xl hover:bg-[#FF5A48] transition-all flex items-center gap-2 shadow-xl shadow-[#FF6B5A]/30 hover:shadow-2xl hover:shadow-[#FF6B5A]/40 text-lg font-semibold hover:-translate-y-1 transform">
                Get Early Access
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white text-[#1B2A4A] rounded-xl hover:bg-gray-50 transition-all border-2 border-gray-200 text-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transform">
                Watch Demo
              </button>
            </div>

            {/* Integration Logos */}
            <div className="pt-8">
              <p className="text-xs text-gray-500 mb-4 uppercase tracking-wide font-medium">
                Integrates with your stack
              </p>
              <div className="flex items-center gap-8">
                <div className="h-8 flex items-center hover:scale-110 transition-transform">
                  <svg
                    className="h-6 opacity-60 hover:opacity-100 transition-opacity"
                    viewBox="0 0 120 32"
                    fill="none"
                  >
                    <rect
                      x="0"
                      y="8"
                      width="20"
                      height="16"
                      fill="#00A1E0"
                      rx="2"
                    />
                    <text
                      x="26"
                      y="22"
                      className="font-semibold"
                      fill="#1B2A4A"
                      fontSize="14"
                    >
                      Salesforce
                    </text>
                  </svg>
                </div>
                <div className="h-8 flex items-center hover:scale-110 transition-transform">
                  <svg
                    className="h-6 opacity-60 hover:opacity-100 transition-opacity"
                    viewBox="0 0 100 32"
                    fill="none"
                  >
                    <circle cx="10" cy="16" r="8" fill="#FF7A59" />
                    <circle cx="18" cy="16" r="8" fill="#FF7A59" opacity="0.7" />
                    <text
                      x="32"
                      y="22"
                      className="font-semibold"
                      fill="#1B2A4A"
                      fontSize="14"
                    >
                      HubSpot
                    </text>
                  </svg>
                </div>
                <div className="h-8 flex items-center hover:scale-110 transition-transform">
                  <svg
                    className="h-6 opacity-60 hover:opacity-100 transition-opacity"
                    viewBox="0 0 140 32"
                    fill="none"
                  >
                    <rect
                      x="0"
                      y="8"
                      width="16"
                      height="16"
                      fill="#4285F4"
                      rx="2"
                    />
                    <rect x="4" y="12" width="8" height="8" fill="white" />
                    <text
                      x="22"
                      y="22"
                      className="font-semibold"
                      fill="#1B2A4A"
                      fontSize="14"
                    >
                      Google Calendar
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative flex items-center justify-end animate-fade-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B5A]/20 via-[#FF6B5A]/5 to-[#1B2A4A]/20 blur-3xl" />
            <div
              className="relative w-full aspect-square md:aspect-auto md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] hover:rotate-1 transition-all duration-500"
              style={{ transform: "perspective(1000px) rotateY(-5deg)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1080&q=80"
                alt="Engagely Dashboard Mockup"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/60 via-transparent to-transparent" />

              {/* Floating Element Mockups */}
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl flex items-center gap-4 animate-float-card">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1B2A4A]">+240%</p>
                  <p className="text-xs text-gray-500">Meeting Booking Rate</p>
                </div>
              </div>

              <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl flex items-center gap-3 animate-float-card-delayed">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B5A] to-[#FF5A48] flex items-center justify-center text-white text-xs font-bold">
                  AI
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B2A4A]">
                    Arya Agent Live
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Handling 43 visitors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-8 py-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {[
            { value: "40%", label: "Average engagement rate", delay: "0s" },
            { value: "3x", label: "More qualified meetings", delay: "0.1s" },
            { value: "24/7", label: "Always-on availability", delay: "0.2s" },
            {
              value: "60%",
              label: "Reduction in sales cycle",
              delay: "0.3s",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: stat.delay }}
            >
              <div className="text-4xl font-bold text-[#1B2A4A] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigate All Screens */}
      <section className="relative z-10 px-8 py-16 max-w-[1440px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1B2A4A] mb-2">Explore All Screens</h2>
          <p className="text-gray-600">Jump to any page to see the full product experience</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { href: "/dashboard", label: "Dashboard", desc: "Analytics & conversations" },
            { href: "/flow-builder", label: "Flow Builder", desc: "Visual conversation editor" },
            { href: "/templates", label: "Templates", desc: "Pre-built flow library" },
            { href: "/pricing", label: "Pricing", desc: "Plans & comparison" },
            { href: "/integrations", label: "Integrations", desc: "CRM, calendar & more" },
            { href: "/settings", label: "Settings", desc: "Widget & branding config" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-[#FF6B5A]/40 hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <h3 className="font-semibold text-[#1B2A4A] group-hover:text-[#FF6B5A] transition-colors mb-1">
                {item.label}
              </h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </Link>
          ))}
          <button
            onClick={handleTryDemo}
            className="bg-[#FF6B5A] border border-[#FF6B5A] rounded-xl p-5 text-left hover:bg-[#FF5A48] hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <h3 className="font-semibold text-white mb-1">Live Demo</h3>
            <p className="text-xs text-white/70">Try the AI agent now</p>
          </button>
          <Link
            href="/"
            className="bg-[#1B2A4A] border border-[#1B2A4A] rounded-xl p-5 text-left hover:bg-[#2A4072] hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <h3 className="font-semibold text-white mb-1">Landing Page</h3>
            <p className="text-xs text-white/60">You are here</p>
          </Link>
        </div>
      </section>

      {/* Floating Global Chat Widget */}
      {showWidget && <ChatWidget forceOpen={forceOpen} />}
    </div>
  );
}
