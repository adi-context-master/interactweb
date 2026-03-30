import { NextRequest, NextResponse } from "next/server";
import { getKnowledge, addKnowledgeDoc, removeKnowledgeDoc } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getKnowledge());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, content, type } = body as {
    title: string;
    content: string;
    type: "text" | "url" | "pdf";
  };

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content required" }, { status: 400 });
  }

  const doc = {
    id: crypto.randomUUID(),
    title,
    content,
    type: type || "text",
    createdAt: new Date(),
  };

  addKnowledgeDoc(doc);

  return NextResponse.json({ success: true, id: doc.id });
}

export async function DELETE(req: NextRequest) {
  const { id } = (await req.json()) as { id: string };
  removeKnowledgeDoc(id);
  return NextResponse.json({ success: true });
}
