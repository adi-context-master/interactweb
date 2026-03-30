"use client";

import { Copy, Check, Upload } from "lucide-react";
import { useState } from "react";

export default function EmbedSettings() {
  const [copied, setCopied] = useState(false);
  const snippet = `<script src="https://cdn.engagely.io/widget.js" data-id="wgt_abc123" async></script>`;

  return (
    <div className="p-5 space-y-5">
      <div className="bg-card rounded-xl border-2 border-foreground shadow-hard p-5">
        <h2 className="text-sm font-extrabold text-foreground mb-1 font-heading">Embed Snippet</h2>
        <p className="text-[10px] text-muted-fg mb-3">Paste this into your website</p>
        <div className="relative">
          <pre className="bg-foreground rounded-xl p-3 text-[10px] text-quaternary overflow-x-auto font-mono">{snippet}</pre>
          <button onClick={() => { navigator.clipboard.writeText(snippet); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="absolute top-2 right-2 px-2 py-1 rounded-full border border-white/30 bg-white/10 text-white text-[9px] font-bold">
            {copied ? <><Check className="w-3 h-3 inline" /> Copied</> : <><Copy className="w-3 h-3 inline" /> Copy</>}
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl border-2 border-foreground shadow-hard-pink p-5">
        <h2 className="text-sm font-extrabold text-foreground mb-4 font-heading">Widget Config</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-[9px] font-extrabold uppercase tracking-widest text-foreground mb-1">Agent Name</label><input type="text" defaultValue="Arya" className="w-full px-3 py-2 border-2 border-foreground rounded-lg text-[11px] outline-none focus:shadow-hard-violet" /></div>
          <div><label className="block text-[9px] font-extrabold uppercase tracking-widest text-foreground mb-1">Position</label><select className="w-full px-3 py-2 border-2 border-foreground rounded-lg text-[11px] outline-none"><option>Bottom Center</option><option>Bottom Right</option></select></div>
          <div className="col-span-2"><label className="block text-[9px] font-extrabold uppercase tracking-widest text-foreground mb-1">Greeting</label><input type="text" defaultValue="Hi, I'm Arya. How can I help you today?" className="w-full px-3 py-2 border-2 border-foreground rounded-lg text-[11px] outline-none focus:shadow-hard-violet" /></div>
          <div><label className="block text-[9px] font-extrabold uppercase tracking-widest text-foreground mb-1">Delay (sec)</label><input type="number" defaultValue={3} className="w-full px-3 py-2 border-2 border-foreground rounded-lg text-[11px] outline-none" /></div>
          <div><label className="block text-[9px] font-extrabold uppercase tracking-widest text-foreground mb-1">Theme</label><div className="flex gap-1.5"><button className="flex-1 py-1.5 rounded-full border-2 border-accent bg-accent/10 text-[10px] font-bold text-accent">Light</button><button className="flex-1 py-1.5 rounded-full border-2 border-foreground text-[10px] text-muted-fg">Dark</button></div></div>
        </div>
      </div>

      <div className="bg-card rounded-xl border-2 border-foreground shadow-hard-yellow p-5">
        <h2 className="text-sm font-extrabold text-foreground mb-4 font-heading">Branding</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-[9px] font-extrabold uppercase tracking-widest text-foreground mb-1">Primary Color</label><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-accent border-2 border-foreground" /><input type="text" defaultValue="#8B5CF6" className="w-20 px-2 py-1.5 border-2 border-foreground rounded-lg text-[10px]" /></div></div>
          <div><label className="block text-[9px] font-extrabold uppercase tracking-widest text-foreground mb-1">Logo</label><div className="flex items-center gap-2"><div className="w-10 h-10 rounded-lg bg-background border-2 border-dashed border-foreground flex items-center justify-center"><Upload className="w-4 h-4 text-muted-fg" /></div><button className="px-2 py-1.5 border-2 border-foreground rounded-full text-[9px] font-bold">Upload</button></div></div>
        </div>
      </div>
    </div>
  );
}
