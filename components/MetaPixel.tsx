"use client";

import Script from "next/script";

// Pixel Meta — renseigné par déploiement via NEXT_PUBLIC_META_PIXEL_ID.
// Vide = aucun script Meta injecté.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function MetaPixel() {
  if (!PIXEL_ID) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

export function trackPixel(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

export function trackCustomPixel(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", event, params);
  }
}

export interface AdvancedMatchingInfo {
  email?: string;
  phone?: string;
  firstName?: string;
}

// Envoie UN seul Lead navigateur, avec correspondance avancée et un eventID
// partagé avec l'API Conversions (/api/lead) pour la déduplication.
export function trackLeadWithMatching(
  user: AdvancedMatchingInfo,
  eventId: string,
  eventParams?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.fbq || !PIXEL_ID) return;

  const userData: Record<string, string> = {};
  if (user.email) userData.em = user.email.trim().toLowerCase();
  if (user.phone) {
    const digits = user.phone.replace(/\D/g, "");
    userData.ph = digits.length === 10 ? "1" + digits : digits;
  }
  if (user.firstName) userData.fn = user.firstName.trim().toLowerCase();

  window.fbq("init", PIXEL_ID, userData);
  window.fbq("track", "Lead", eventParams ?? {}, { eventID: eventId });
}

// Cookies Meta (_fbp / _fbc) pour améliorer la correspondance côté serveur.
export function getMetaCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === "undefined") return {};
  const read = (name: string) =>
    document.cookie
      .split("; ")
      .find((c) => c.startsWith(name + "="))
      ?.split("=")[1];
  let fbc = read("_fbc");
  if (!fbc) {
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  return { fbp: read("_fbp"), fbc };
}

export function newEventId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
