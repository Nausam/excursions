// app/layout.tsx
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"), // ⬅️ change to your real domain
  title: {
    default: "La Via Travels – Maldives Excursions & Diving",
    template: "%s | La Via Travels",
  },
  description:
    "La Via Travels offers curated Maldives excursions, island safaris, liveaboard trips and local diving with trusted Maldivian guides. Plan your next ocean adventure with flexible, small-group experiences.",
  keywords: [
    "La Via Travels",
    "Maldives excursions",
    "Maldives diving",
    "Maldives liveaboard",
    "Maldives safari trips",
    "snorkeling Maldives",
    "island hopping Maldives",
    "local guides Maldives",
  ],
  applicationName: "La Via Travels",
  authors: [{ name: "La Via Travels" }],
  creator: "La Via Travels",
  publisher: "La Via Travels",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "La Via Travels – Maldives Excursions, Safaris & Diving",
    description:
      "Book Maldives excursions, liveaboards and local diving with La Via Travels. Small groups, trusted guides and flexible, ocean-focused itineraries.",
    siteName: "La Via Travels",
    url: "https://example.com", // ⬅️ update to real domain
    images: [
      {
        url: "/og/la-via-travels-og.jpg", // ⬅️ drop in your OG image
        width: 1200,
        height: 630,
        alt: "La Via Travels – Maldives excursions, safaris and diving",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Via Travels – Maldives Excursions & Diving",
    description:
      "Curated Maldives excursions, island safaris, liveaboards and local diving with La Via Travels.",
    images: ["/og/la-via-travels-og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${hostGrotesk.variable} font-sans antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
