import type { Metadata } from "next";
import ContactPageClient from "@/components/pages/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact La Via Maldives – WhatsApp & Email",
  description:
    "Contact La Via Maldives to plan Maldives excursions, diving and liveaboard trips. Message us on WhatsApp or email for dates, prices and custom itineraries.",
  alternates: {
    canonical: "https://laviatravels.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
