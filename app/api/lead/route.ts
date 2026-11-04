import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import type { Answers, Lead } from "@/lib/types";

// API Conversions de Meta — Lead côté serveur, dédupliqué avec le Pixel
// grâce au même event_id. Variables Vercel :
//   NEXT_PUBLIC_META_PIXEL_ID (partagée avec le pixel navigateur)
//   META_CAPI_TOKEN           (sans lui, la CAPI est ignorée)
//   META_TEST_EVENT_CODE      (optionnel → « Tester les événements »)
const GRAPH_API_VERSION = "v24.0";

interface MetaInfo {
  eventId?: string;
  url?: string;
  fbp?: string;
  fbc?: string;
}

function hash(value?: string) {
  const v = String(value ?? "").trim().toLowerCase();
  return v ? createHash("sha256").update(v).digest("hex") : undefined;
}

function normalizePhone(phone?: string) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  return digits.length === 10 ? "1" + digits : digits;
}

async function sendMetaLead(req: NextRequest, lead: Lead, meta: MetaInfo) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token || !meta.eventId) return;

  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: String(meta.eventId),
        event_source_url: meta.url,
        action_source: "website",
        user_data: {
          em: hash(lead.email),
          ph: hash(normalizePhone(lead.phone)),
          fn: hash(lead.firstName),
          st: hash("qc"),
          country: hash("ca"),
          client_ip_address: forwarded.split(",")[0].trim() || undefined,
          client_user_agent: req.headers.get("user-agent") ?? undefined,
          fbp: meta.fbp || undefined,
          fbc: meta.fbc || undefined,
        },
        custom_data: { currency: "CAD", content_name: "Quiz vidéo/photo" },
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const r = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      console.error("[meta-capi] erreur Meta", r.status, JSON.stringify(err));
    }
  } catch (err) {
    console.error("[meta-capi] échec de l'envoi", err);
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { lead: Lead; answers: Answers; meta?: MetaInfo };
  const { meta, ...crmBody } = body;

  console.log("[lead]", JSON.stringify(crmBody));

  const tasks: Promise<unknown>[] = [sendMetaLead(req, body.lead, meta ?? {})];

  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (webhookUrl) {
    tasks.push(
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crmBody),
      }).catch((err) => console.error("[lead] échec envoi CRM", err))
    );
  }

  await Promise.all(tasks);
  return NextResponse.json({ ok: true });
}
