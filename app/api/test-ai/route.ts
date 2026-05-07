import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = new Anthropic();
    
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 100,
      messages: [{ role: "user", content: "Say hello in one sentence." }],
    });

    return NextResponse.json({ 
      success: true, 
      response: message.content[0] 
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
