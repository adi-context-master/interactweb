"use client";

import { Check, ArrowRight, Zap, Shield, Headphones } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Perfect for small teams getting started with AI-powered engagement",
    features: [
      "1 AI Agent",
      "500 conversations/month",
      "Basic analytics dashboard",
      "Email capture & CRM sync",
      "5 flow templates",
      "Community support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    price: "$299",
    period: "/month",
    description: "For growing teams that want to maximize conversions and pipeline",
    features: [
      "3 AI Agents",
      "5,000 conversations/month",
      "Advanced analytics & intent scoring",
      "Custom avatar & voice",
      "Unlimited flow templates",
      "Calendar integration",
      "Priority support",
      "CRM integrations (Salesforce, HubSpot)",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with advanced security and customization needs",
    features: [
      "Unlimited AI Agents",
      "Unlimited conversations",
      "Full analytics suite",
      "Custom avatar with your team's faces",
      "SSO & RBAC",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "SOC 2 compliance",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF6B5A] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-semibold text-[#1B2A4A]">Engagely</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-[#1B2A4A] hover:text-[#FF6B5A] transition-colors">Home</Link>
          <Link href="/dashboard" className="text-sm text-[#1B2A4A] hover:text-[#FF6B5A] transition-colors">Dashboard</Link>
          <button className="px-5 py-2.5 bg-[#FF6B5A] text-white rounded-lg text-sm hover:bg-[#FF5A48] transition-all">Get Started</button>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#FF6B5A]/10 rounded-full mb-6">
            <span className="text-sm font-medium text-[#FF6B5A]">Early Access — 6 months at half price</span>
          </div>
          <h1 className="text-5xl font-bold text-[#1B2A4A] mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Start free, scale as you grow. No hidden fees.</p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!annual ? "text-[#1B2A4A] font-semibold" : "text-gray-500"}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className={`w-14 h-7 rounded-full p-1 transition-colors ${annual ? "bg-[#FF6B5A]" : "bg-gray-300"}`}>
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${annual ? "translate-x-7" : "translate-x-0"}`} />
            </button>
            <span className={`text-sm ${annual ? "text-[#1B2A4A] font-semibold" : "text-gray-500"}`}>Annual <span className="text-[#FF6B5A] text-xs font-semibold">Save 20%</span></span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className={`bg-white rounded-2xl p-8 border-2 relative ${plan.popular ? "border-[#FF6B5A] shadow-xl shadow-[#FF6B5A]/10" : "border-gray-200"} hover:shadow-lg transition-all`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#FF6B5A] text-white text-xs font-semibold rounded-full">Most Popular</div>
              )}
              <h3 className="text-2xl font-bold text-[#1B2A4A] mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-[#1B2A4A]">{plan.price}</span>
                {plan.period && <span className="text-gray-500">{plan.period}</span>}
              </div>
              <p className="text-sm text-gray-600 mb-8">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[#1B2A4A]">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${plan.popular ? "bg-[#FF6B5A] text-white hover:bg-[#FF5A48] shadow-lg shadow-[#FF6B5A]/30" : "bg-[#1B2A4A] text-white hover:bg-[#2A4072]"}`}>
                {plan.cta} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-20 grid grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Go live in < 1 hour", desc: "Single JS snippet, no engineering required" },
            { icon: Shield, title: "Enterprise security", desc: "SOC 2, TLS 1.3, AES-256, tenant isolation" },
            { icon: Headphones, title: "Dedicated support", desc: "Priority support with < 4hr response time" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 bg-[#FF6B5A]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#FF6B5A]" />
                </div>
                <h4 className="font-semibold text-[#1B2A4A] mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
