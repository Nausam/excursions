import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host",
});

export const metadata: Metadata = {
  title: "Just Trip - Excursions",
  description:
    "Explore and book unforgettable excursions around the world with Just Trip. Your adventure starts here!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${hostGrotesk.variable} font-sans antialiase`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
