import { NextRequest } from "next/server";
import { getChatModel } from "@/lib/grok";
import { SYSTEM_PROMPT } from "@/lib/prompts";
import {
  createConversation,
  getConversation,
  addMessage,
  getKnowledgeContext,
} from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, conversationId, interests } = body as {
    message: string;
    conversationId?: string;
    interests?: string[];
  };

  // Get or create conversation
  let conv = conversationId ? getConversation(conversationId) : undefined;
  if (!conv) {
    conv = createConversation();
  }

  // Build system context with knowledge base
  const knowledge = getKnowledgeContext();
  const systemContext = `${SYSTEM_PROMPT}

## Knowledge Base (use this to answer questions):
${knowledge}

${interests?.length ? `## Visitor Interests: ${interests.join(", ")}` : ""}
`;

  // Store user message
  addMessage(conv.id, { role: "user", content: message, timestamp: new Date() });

  // Build chat history for Gemini
  const history = conv.messages
    .filter((m) => m.role !== "system")
    .slice(0, -1) // exclude the message we just added (we'll send it as the current turn)
    .map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: m.content }],
    }));

  const model = getChatModel();
  const chat = model.startChat({
    history,
    systemInstruction: { role: "user", parts: [{ text: systemContext }] },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 300,
    },
  });

  // Stream response
  const encoder = new TextEncoder();
  let fullResponse = "";

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const result = await chat.sendMessageStream(message);

        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            fullResponse += text;
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ text, conversationId: conv!.id })}\n\n`
              )
            );
          }
        }

        // Store assistant response
        addMessage(conv!.id, {
          role: "assistant",
          content: fullResponse,
          timestamp: new Date(),
        });

        // Send done signal
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ done: true, conversationId: conv!.id })}\n\n`
          )
        );
        controller.close();
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: errMsg })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
