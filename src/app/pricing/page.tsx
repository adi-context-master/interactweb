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
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b-2 border-foreground px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent rounded-xl border-2 border-foreground shadow-hard flex items-center justify-center">
            <span className="text-white font-extrabold text-lg">E</span>
          </div>
          <span className="text-xl font-heading font-extrabold text-foreground">Engagely</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-bold text-foreground hover:text-accent bounce-transition">Home</Link>
          <Link href="/dashboard" className="text-sm font-bold text-foreground hover:text-accent bounce-transition">Dashboard</Link>
          <button className="px-5 py-2.5 bg-accent text-white rounded-full border-2 border-foreground shadow-hard font-bold text-sm bounce-transition hover:shadow-hard-hover">Get Started</button>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full border-2 border-foreground mb-6">
            <span className="text-sm font-extrabold text-foreground">Early Access — 6 months at half price</span>
          </div>
          <h1 className="text-5xl font-heading font-extrabold text-foreground mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-fg max-w-2xl mx-auto">Start free, scale as you grow. No hidden fees.</p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-bold ${!annual ? "text-foreground" : "text-muted-fg"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`w-14 h-7 rounded-full p-1 border-2 border-foreground bounce-transition ${annual ? "bg-accent" : "bg-card"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white border-2 border-foreground transition-transform ${annual ? "translate-x-7" : "translate-x-0"}`} />
            </button>
            <span className={`text-sm font-bold ${annual ? "text-foreground" : "text-muted-fg"}`}>
              Annual{" "}
              <span className="inline-block px-2 py-0.5 bg-tertiary text-foreground rounded-full border-2 border-foreground font-extrabold text-xs">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-card rounded-2xl p-8 border-2 border-foreground relative bounce-transition ${
                plan.popular
                  ? "border-accent shadow-hard-violet scale-105"
                  : "shadow-hard hover:shadow-hard-hover"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-white text-xs font-extrabold rounded-full border-2 border-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-heading font-extrabold text-foreground mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-heading font-extrabold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted-fg font-bold">{plan.period}</span>}
              </div>
              <p className="text-sm text-muted-fg mb-8">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground font-bold">
                    <div className="w-5 h-5 bg-quaternary/20 rounded-full border-2 border-foreground flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-quaternary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-full border-2 border-foreground font-extrabold text-lg bounce-transition flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-accent text-white shadow-hard hover:shadow-hard-hover"
                    : "bg-foreground text-white hover:shadow-hard-hover"
                }`}
              >
                {plan.cta} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-20 grid grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Go live in < 1 hour", desc: "Single JS snippet, no engineering required", shadowClass: "shadow-hard-yellow" },
            { icon: Shield, title: "Enterprise security", desc: "SOC 2, TLS 1.3, AES-256, tenant isolation", shadowClass: "shadow-hard-violet" },
            { icon: Headphones, title: "Dedicated support", desc: "Priority support with < 4hr response time", shadowClass: "shadow-hard-pink" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`text-center bg-card border-2 border-foreground rounded-2xl p-6 ${item.shadowClass} bounce-transition hover:shadow-hard-hover`}
              >
                <div className="w-12 h-12 bg-accent/15 rounded-xl border-2 border-foreground flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-heading font-extrabold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-fg">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
