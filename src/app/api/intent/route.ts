import { NextRequest, NextResponse } from "next/server";
import { getLiteModel } from "@/lib/grok";
import { INTENT_SCORING_PROMPT } from "@/lib/prompts";
import { getConversation, updateIntent } from "@/lib/store";

export async function POST(req: NextRequest) {
  const { conversationId } = (await req.json()) as { conversationId: string };

  const conv = getConversation(conversationId);
  if (!conv) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  const transcript = conv.messages
    .filter((m) => m.role !== "system")
    .map((m) => `${m.role === "user" ? "Visitor" : "Agent"}: ${m.content}`)
    .join("\n");

  const prompt = INTENT_SCORING_PROMPT.replace("{CONVERSATION}", transcript);

  const model = getLiteModel();
  const result = await model.generateContent(prompt);
  const response = result.response.text().trim();

  const intent = (["HIGH", "MEDIUM", "LOW"].includes(response) ? response : "LOW") as
    | "HIGH"
    | "MEDIUM"
    | "LOW";

  updateIntent(conversationId, intent);

  return NextResponse.json({ intent, conversationId });
}
