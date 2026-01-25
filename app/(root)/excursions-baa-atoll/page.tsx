import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Excursion trips in Baa Atoll – Hanifaru Bay mantas & whale sharks | La Via Maldives",
  description:
    "Stay on Dharavandhoo in Baa Atoll and spend your days snorkeling with mantas and whale sharks near Hanifaru Bay. Small-group trips with local guides and slow island evenings.",
  alternates: {
    canonical: "https://laviatravels.com/excursions-baa-atoll",
  },
};

import ExcursionTripDetail, {
  BookingConfig,
  ExcursionTripDetailProps,
  HeroConfig,
  ItineraryDay,
  QuickFactsConfig,
} from "@/components/ExcursionTripDetail";

const QUICK_FACTS: QuickFactsConfig = {
  price: "$1550 per person",
  duration: "6 nights • 7 days",
  groupSize: "14–18 guests",
  location: "Dharavandhoo • Baa Atoll (UNESCO Biosphere Reserve)",
};

const HERO: HeroConfig = {
  badgeLabel: "Excursion trips in Baa Atoll",
  badgeMeta: "Hanifaru Bay • Mantas & whale sharks",
  titleHighlight: "Hanifaru Bay mantas,",
  titleRest: "whale sharks & local island life.",
  description:
    "Discover the lesser-travelled Maldives with us and witness the mass feeding aggregations of manta rays and whale sharks at Hanifaru Bay. Stay on Dharavandhoo — a local island just minutes from Hanifaru — with easy access via the island airport and comfortable hotels.",
  imageSrc: "/images/excursion.png",
  imageAlt: "A boat crossing the turquoise water of Baa Atoll",
  routeChipLabel: "Baa",
  routeChipTitle: "Hanifaru Bay route",
  routeChipSubtitle: "Mantas • Whale sharks • Turtles",
};

const OVERVIEW: string[] = [
  "Join a small-group adventure in Baa Atoll to experience one of the Maldives’ most exciting snorkelling encounters: seasonal manta and whale shark activity around Hanifaru Bay.",
  "You’ll stay on Dharavandhoo, a local island close to Hanifaru, and spend your days searching for mantas, turtles, dolphins and whale sharks — with relaxed evenings, island time, and a final BBQ with a traditional Boduberu show.",
];

const INCLUSIONS: string[] = [
  "Accommodation for 6 nights (Blue World hotel).",
  "Half board meals every day.",
  "Return domestic air tickets (MLE ↔ DRV ↔ MLE).",
  "Local experts / guides.",
  "Snorkelling equipment.",
];

const EXCLUSIONS: string[] = [
  "Drone videos (price to be confirmed).",
  "Underwater video (price to be confirmed).",
  "Compulsory travel & diving insurance.",
  "Extra charges for a single room.",
];

const ITINERARY: ItineraryDay[] = [
  {
    day: 1,
    title: "Arrival to Maldives & Turtles",
    description: [
      "Meet our representative at Malé Velana International Airport.",
      "Domestic flight from Malé to Dharavandhoo (DRV).",
      "Hotel check-in.",
      "Two-spot snorkelling session: Turtle Reef and Kihaa Reef.",
      "Return to the hotel for group dinner.",
    ],
  },
  {
    day: 2,
    title: "Manta Safari & Dolphins Search",
    description: [
      "Breakfast at the hotel (local and continental options).",
      "Two-spot snorkelling session searching for mantas and turtles.",
      "Dolphin search by boat.",
      "Return to the hotel before sunset for a chill evening.",
      "Dinner at the hotel.",
    ],
  },
  {
    day: 3,
    title: "Dive Experience Day & Sandbank",
    description: [
      "Breakfast at the hotel (local and continental options).",
      "Discover Scuba Dive (DSD) — optional.",
      "Sandbank trip.",
      "Dinner at the hotel.",
    ],
  },
  {
    day: 4,
    title: "Mantas & Whale Shark Day",
    description: [
      "Breakfast at the hotel.",
      "Snorkel with mantas (Hanifaru Bay if active; otherwise we search nearby).",
      "Search for whale sharks; once located, snorkel with the biggest fish in the world.",
      "Return to the hotel for a chill evening on the island.",
      "Dinner at the hotel.",
    ],
  },
  {
    day: 5,
    title: "Mantas & Sunset Fishing",
    description: [
      "Breakfast at the hotel.",
      "Snorkel with mantas (Hanifaru Bay if active; otherwise we search nearby).",
      "Sunset fishing trip.",
      "Return to the hotel for a chill evening on the island.",
      "Dinner at the hotel.",
    ],
  },
  {
    day: 6,
    title: "Whale Shark Search & Farewell BBQ",
    description: [
      "Breakfast at the hotel.",
      "Search for whale sharks; once located, snorkel with them.",
      "Relaxing / chill day on the island.",
      "Final group dinner BBQ and traditional Boduberu show.",
    ],
  },
  {
    day: 7,
    title: "Departure Day",
    description: [
      "Breakfast and check-out.",
      "Transfer back to Malé Airport (domestic flight).",
      "Trip ends at Velana International Airport.",
    ],
  },
];

const BOOKING: BookingConfig = {
  heading: "Ready to book this trip?",
  body: "Message us your preferred month, number of travellers, and any questions (room options, private add-ons, etc.). We’ll confirm availability and domestic flight details.",
  ctaLabel: "WhatsApp us to book",
  ctaHref:
    "https://wa.me/9607557042?text=Hi%2C%20I%27d%20like%20to%20book%20the%20Baa%20Atoll%20Excursion%20Trip%20(6%20nights%20%2F%207%20days).%20We%20are%20____%20people%20and%20our%20preferred%20month%20is%20____.%20Please%20share%20availability%20and%20details.",
};

const BAA_ATOLL_TRIP: ExcursionTripDetailProps = {
  hero: HERO,
  quickFacts: QUICK_FACTS,
  overview: OVERVIEW,
  inclusions: INCLUSIONS,
  exclusions: EXCLUSIONS,
  itinerary: ITINERARY,
  booking: BOOKING,
  departureDates: [
    { label: "August 2026", range: "25th to 31st August 2026" },
    { label: "October 2026", range: "7th to 13th October 2026" },
    { label: "November 2026", range: "7th to 13th November 2026" },
  ],
  minimumPax: "6 pax",
  // availability omitted because the PDF doesn’t specify months/year
};

export default function Page() {
  return <ExcursionTripDetail {...BAA_ATOLL_TRIP} />;
}
