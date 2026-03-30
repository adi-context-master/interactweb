import { NextResponse } from "next/server";
import { getAllConversations } from "@/lib/store";

export async function GET() {
  const conversations = getAllConversations().map((conv) => ({
    id: conv.id,
    messageCount: conv.messages.filter((m) => m.role !== "system").length,
    intent: conv.intent,
    lead: conv.lead
      ? { email: conv.lead.email, company: conv.lead.company }
      : null,
    startedAt: conv.startedAt,
    lastActiveAt: conv.lastActiveAt,
    lastMessage:
      conv.messages.filter((m) => m.role !== "system").slice(-1)[0]?.content ||
      "",
  }));

  return NextResponse.json(conversations);
}
