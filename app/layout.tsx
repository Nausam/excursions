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
  metadataBase: new URL("https://laviamaldives.com"),
  title: {
    default: "La Via Travel & Tours – Maldives Excursions & Diving",
    template: "%s | La Via Travel & Tours",
  },
  description:
    "La Via Travel & Tours offers curated Maldives excursions, island safaris, liveaboard trips and local diving with trusted Maldivian guides. Plan your next ocean adventure with flexible, small-group experiences.",
  keywords: [
    "La Via Travel & Tours",
    "Maldives excursions",
    "Maldives diving",
    "Maldives liveaboard",
    "Maldives safari trips",
    "snorkeling Maldives",
    "island hopping Maldives",
    "local guides Maldives",
  ],
  applicationName: "La Via Travel & Tours",
  authors: [{ name: "LLa Via Travel & Tours" }],
  creator: "La Via Travel & Tours",
  publisher: "La Via Travel & Tours",
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
    title: "La Via Travel & Tours – Maldives Excursions, Safaris & Diving",
    description:
      "Book Maldives excursions, liveaboards and local diving with La Via Travels. Small groups, trusted guides and flexible, ocean-focused itineraries.",
    siteName: "La Via Travel & Tours",
    url: "https://laviamaldives.com",
    images: [
      {
        url: "/images/excursion.png",
        width: 1200,
        height: 630,
        alt: "La Via Travel & Tours – Maldives excursions, safaris and diving",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Via Travel & Tours – Maldives Excursions & Diving",
    description:
      "Curated Maldives excursions, island safaris, liveaboards and local diving with La Via Travel & Tours.",
    images: ["/images/excursion.png"],
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
