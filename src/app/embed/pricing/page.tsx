"use client";

import { Check, ArrowRight } from "lucide-react";

const plans = [
  { name: "Starter", price: "$149", features: ["1 AI Agent", "500 conversations/mo", "Basic analytics", "Email capture"], popular: false },
  { name: "Growth", price: "$399", features: ["3 AI Agents", "3,000 conversations/mo", "Advanced analytics", "CRM sync", "Custom avatar", "Intent scoring"], popular: true },
  { name: "Enterprise", price: "Custom", features: ["Unlimited agents", "Unlimited conversations", "White-label", "SSO/RBAC", "Dedicated manager", "Custom integrations"], popular: false },
];

export default function EmbedPricing() {
  return (
    <div className="p-5">
      <div className="text-center mb-4">
        <div className="inline-block px-3 py-1 bg-secondary/20 rounded-full border-2 border-foreground mb-2"><span className="text-[10px] font-extrabold text-foreground">Early access — 50% off for 6 months</span></div>
        <h2 className="text-lg font-extrabold text-foreground font-heading">Pricing Plans</h2>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-card rounded-xl p-4 border-2 border-foreground relative ${plan.popular ? "shadow-hard-violet scale-105" : "shadow-hard"}`}>
            {plan.popular && <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-accent text-white text-[8px] font-extrabold rounded-full border-2 border-foreground">Popular</div>}
            <h3 className="text-sm font-extrabold text-foreground font-heading">{plan.name}</h3>
            <div className="text-2xl font-extrabold text-foreground font-heading mt-1 mb-3">{plan.price}<span className="text-[10px] text-muted-fg font-medium">{plan.price !== "Custom" ? "/mo" : ""}</span></div>
            <ul className="space-y-1.5 mb-4">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-[10px] text-foreground font-medium">
                  <div className="w-3.5 h-3.5 bg-quaternary/20 rounded-full border border-foreground flex items-center justify-center"><Check className="w-2 h-2 text-quaternary" /></div>{f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2 rounded-full border-2 border-foreground text-[10px] font-extrabold flex items-center justify-center gap-1 ${plan.popular ? "bg-accent text-white shadow-hard" : "bg-foreground text-white"}`}>
              {plan.name === "Enterprise" ? "Contact Sales" : "Start Trial"} <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
