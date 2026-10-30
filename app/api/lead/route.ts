import { NextRequest, NextResponse } from "next/server";
import type { Answers, Lead } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { lead: Lead; answers: Answers };

  console.log("[lead]", JSON.stringify(body));

  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error("[lead] échec envoi CRM", err);
    }
  }

  return NextResponse.json({ ok: true });
}
