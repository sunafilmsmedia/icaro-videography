import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import Clarity from "@/components/Clarity";
import { BRAND } from "@/lib/brand";
import "./globals.css";

// Corps de texte / UI.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Titres / display — utilisé par les classes `font-serif`.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ta vidéo et tes photos livrées en 7 jours",
  description:
    "Réponds à 2 questions et découvre exactement ce que tu vas recevoir pour ton événement — vidéo et photos livrées en 7 jours, garanti.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://exemple.vercel.app"
  ),
  openGraph: {
    title: "Ta vidéo et tes photos livrées en 7 jours. Sinon, on te rembourse.",
    description: `${BRAND.videographer.title} · ${BRAND.videographer.region}`,
    locale: "fr_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CA" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen antialiased bg-white text-black">
        <MetaPixel />
        <Clarity />
        {children}
      </body>
    </html>
  );
}
