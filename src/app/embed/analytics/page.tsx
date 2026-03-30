"use client";

import { TrendingUp, Users, MessageSquare, Calendar, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const engagementData = [
  { date: "Mar 1", visitors: 245, engaged: 98 },
  { date: "Mar 5", visitors: 289, engaged: 118 },
  { date: "Mar 10", visitors: 312, engaged: 128 },
  { date: "Mar 15", visitors: 356, engaged: 145 },
  { date: "Mar 20", visitors: 401, engaged: 168 },
  { date: "Mar 24", visitors: 428, engaged: 172 },
];

const intentData = [
  { name: "High", value: 34, color: "#8B5CF6" },
  { name: "Medium", value: 45, color: "#FBBF24" },
  { name: "Low", value: 21, color: "#E2E8F0" },
];

const visitors = [
  { email: "sarah.chen@acme.com", company: "Acme Corp", score: 98, lastActive: "2m ago", topQ: "Enterprise pricing?" },
  { email: "james@techco.io", company: "TechCo", score: 95, lastActive: "5m ago", topQ: "API integration" },
  { email: "emily@startup.com", company: "Startup Inc", score: 92, lastActive: "12m ago", topQ: "Setup timeline" },
];

export default function EmbedAnalytics() {
  return (
    <div className="p-5 space-y-5">
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Visitors", value: "2,847", change: "+12.5%", icon: Users, shadow: "shadow-hard-violet" },
          { label: "Engaged", value: "40.1%", change: "+8.2%", icon: MessageSquare, shadow: "shadow-hard-pink" },
          { label: "Meetings", value: "89", change: "+24.1%", icon: Calendar, shadow: "shadow-hard-yellow" },
          { label: "Avg Session", value: "4m 32s", change: "+5.4%", icon: Clock, shadow: "shadow-hard" },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className={`bg-card rounded-xl p-4 border-2 border-foreground ${m.shadow}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-muted-fg">{m.label}</span>
                <Icon className="w-3.5 h-3.5 text-muted-fg" strokeWidth={2.5} />
              </div>
              <div className="text-xl font-extrabold text-foreground font-heading">{m.value}</div>
              <div className="flex items-center gap-1 mt-1 text-quaternary text-[10px] font-bold">
                <TrendingUp className="w-3 h-3" strokeWidth={2.5} />{m.change}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-card rounded-xl p-4 border-2 border-foreground shadow-hard-lg">
          <h3 className="text-sm font-extrabold text-foreground mb-3 font-heading">Engagement Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#64748B" fontSize={10} fontWeight={600} />
              <YAxis stroke="#64748B" fontSize={10} fontWeight={600} />
              <Tooltip contentStyle={{ backgroundColor: "#FFFDF5", border: "2px solid #1E293B", borderRadius: "8px", fontSize: "10px", fontWeight: 600 }} />
              <Line type="monotone" dataKey="visitors" stroke="#1E293B" strokeWidth={2} dot={{ fill: "#1E293B", r: 3 }} name="Visitors" />
              <Line type="monotone" dataKey="engaged" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: "#8B5CF6", r: 3 }} name="Engaged" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl p-4 border-2 border-foreground shadow-hard-pink">
          <h3 className="text-sm font-extrabold text-foreground mb-3 font-heading">Intent</h3>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart><Pie data={intentData} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={5} dataKey="value" strokeWidth={2} stroke="#1E293B">{intentData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie></PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {intentData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full border border-foreground" style={{ backgroundColor: item.color }} /><span className="text-muted-fg font-medium">{item.name}</span></div>
                <span className="font-extrabold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border-2 border-foreground shadow-hard-lg">
        <div className="px-4 py-3 border-b-2 border-border"><h3 className="text-sm font-extrabold text-foreground font-heading">High-Intent Visitors</h3></div>
        <table className="w-full">
          <thead><tr className="border-b-2 border-border">{["Email", "Company", "Score", "Active", "Question"].map((h) => <th key={h} className="px-3 py-2 text-left text-[9px] font-extrabold text-muted-fg uppercase tracking-widest">{h}</th>)}</tr></thead>
          <tbody className="divide-y-2 divide-border">
            {visitors.map((v, i) => (
              <tr key={i}>
                <td className="px-3 py-2 text-[11px] font-bold text-foreground">{v.email}</td>
                <td className="px-3 py-2 text-[11px] text-muted-fg">{v.company}</td>
                <td className="px-3 py-2"><div className="flex items-center gap-1"><div className="w-8 h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-accent rounded-full" style={{ width: `${v.score}%` }} /></div><span className="text-[10px] font-extrabold">{v.score}</span></div></td>
                <td className="px-3 py-2 text-[11px] text-muted-fg">{v.lastActive}</td>
                <td className="px-3 py-2 text-[11px] text-muted-fg">{v.topQ}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
