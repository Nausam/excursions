// app/layout.tsx
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laviatravels.com"),
  title: {
    default: "La Via Maldives – Excursions, Safaris & Diving",
    template: "%s | La Via Travel & Tours",
  },
  description:
    "La Via Travel & Tours offers curated Maldives excursions, island safaris, liveaboard trips and local diving with trusted Maldivian guides. Plan your next ocean adventure with flexible, small-group experiences.",
  keywords: [
    "La Via Maldives",
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
  authors: [{ name: "La Via Travel & Tours" }],
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
    canonical: "https://laviatravels.com",
  },
  openGraph: {
    type: "website",
    title: "La Via Maldives – Excursions, Safaris & Diving",
    description:
      "Book Maldives excursions, liveaboards and local diving with La Via Maldives. Small groups, trusted guides and flexible, ocean-focused itineraries.",
    siteName: "La Via Travel & Tours",
    url: "https://laviatravels.com",
    images: [
      {
        url: "/images/excursion.png",
        width: 1200,
        height: 630,
        alt: "La Via Maldives excursions, safaris and diving",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Via Maldives – Excursions & Diving",
    description:
      "Curated Maldives excursions, island safaris, liveaboards and local diving with La Via Maldives.",
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
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "La Via Travel & Tours",
    url: "https://laviatravels.com",
    brand: "La Via Maldives",
    logo: "https://laviatravels.com/logo.png",
    sameAs: [
      "https://www.facebook.com/laviamaldives",
      "https://www.instagram.com/laviamaldives",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "MV",
    },
    telephone: "+960 7xxxxxx",
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className={`${hostGrotesk.variable} font-sans antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
