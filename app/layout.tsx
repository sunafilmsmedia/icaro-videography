import type { Metadata } from "next";
import { JetBrains_Mono, Montserrat } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import Clarity from "@/components/Clarity";
import { BRAND } from "@/lib/brand";
import "./globals.css";

// Titres / questions — utilisé par la classe `font-display`.
// Le corps (Helvetica) est un stack système, pas besoin de next/font.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Substitut libre de CoFo Sans Mono VF (police de marque payante, non disponible
// ici) — utilisé pour les étiquettes/mentions courtes façon fiche de marque.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ta vidéo et tes photos livrées en 7 jours — Keystone Production",
  description:
    "Réponds à 2 questions et découvre exactement ce que tu vas recevoir pour ton événement — vidéo et photos livrées en 7 jours, garanti.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://exemple.vercel.app"
  ),
  openGraph: {
    title: "Ta vidéo et tes photos livrées en 7 jours. Sinon, on te rembourse.",
    description: `${BRAND.studio.name} — ${BRAND.studio.title} · ${BRAND.studio.region}`,
    locale: "fr_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CA" className={`${montserrat.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased">
        <MetaPixel />
        <Clarity />
        {children}
      </body>
    </html>
  );
}
