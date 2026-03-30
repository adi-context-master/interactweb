import { NextRequest, NextResponse } from "next/server";
import { createLead, getAllLeads } from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, company, interests, conversationId } = body as {
    email: string;
    company?: string;
    interests?: string[];
    conversationId: string;
  };

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const lead = {
    id: crypto.randomUUID(),
    email,
    company,
    intent: "MEDIUM" as const,
    interests: interests || [],
    conversationId,
    createdAt: new Date(),
  };

  createLead(lead);

  return NextResponse.json({ success: true, leadId: lead.id });
}

export async function GET() {
  return NextResponse.json(getAllLeads());
}
