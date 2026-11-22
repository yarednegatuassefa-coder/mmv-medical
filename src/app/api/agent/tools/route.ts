import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const tools = [{ name: "workflow.describe_message_stage", description: "Retrieve static communication-stage guidance; no patient or lead data." }];

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  return NextResponse.json({ tools, discovery: "Tool implementation is loaded only when invoked." });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  let body: { tool?: string; arguments?: { stage?: unknown } };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  if (body.tool !== "workflow.describe_message_stage") return NextResponse.json({ error: "Unknown tool." }, { status: 404 });
  try {
    const tool = await import("@/lib/agent/servers/workflow/describe-stage");
    return NextResponse.json({ ok: true, tool: tool.name, result: tool.run(body.arguments?.stage), actorId: user.id, bounded: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Tool execution failed." }, { status: 400 });
  }
}
