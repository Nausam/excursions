import ExcursionTripDetail, {
  AvailabilityConfig,
  BookingConfig,
  ExcursionTripDetailProps,
  HeroConfig,
  ItineraryDay,
  QuickFactsConfig,
} from "@/components/ExcursionTripDetail";

const QUICK_FACTS: QuickFactsConfig = {
  price: "From $1400 per person",
  duration: "6 nights • 7 days",
  groupSize: "14–18 guests",
  location: "Dharavandhoo • Baa Atoll (UNESCO Biosphere Reserve)",
};

const HERO: HeroConfig = {
  badgeLabel: "Excursion trips in Baa Atoll",
  badgeMeta: "Peak manta season • Small groups",
  titleHighlight: "Hanifaru Bay mantas,",
  titleRest: "whale sharks & local island life.",
  description:
    "Stay on Dharavandhoo, a lived-in local island in the heart of the UNESCO Biosphere Reserve. Spend your days chasing mantas, whale sharks and dolphins—then wind down with sunsets, beach BBQs and slow island evenings.",
  imageSrc: "/images/excursion.png",
  imageAlt: "A boat crossing the turquoise water of Baa Atoll",
  routeChipLabel: "Baa",
  routeChipTitle: "Hanifaru Bay route",
  routeChipSubtitle: "Mantas • Whale sharks • Turtles",
};

const AVAILABILITY: AvailabilityConfig = {
  yearLabel: "2026",
  description:
    "Bookings are open for the following months in 2026. Pick a month that fits your travel plan and get in touch to confirm exact dates and group availability.",
  months: ["January", "February", "March", "April", "May"],
};

const OVERVIEW: string[] = [
  "Baa Atoll is one of the Maldives' most celebrated marine protected areas, known worldwide for its huge seasonal gatherings of manta rays and whale sharks at Hanifaru Bay. When conditions are right, snorkellers can witness barrel-rolling chains of mantas and whale sharks feeding in the narrow bay.",
  "This trip is designed for travellers who want to experience those encounters while staying on a local island, getting to know the community, and exploring nearby reefs, sandbanks and atolls. You’ll spend your days in the water and your evenings relaxing on Dharavandhoo – the perfect mix of adventure and slow island life.",
];

const INCLUSIONS: string[] = [
  "Accommodation for 6 nights / 7 days on Dharavandhoo (local island).",
  "Standard rooms (shared); room-alone options can be arranged directly with the hotel.",
  "Full-board meals every day (breakfast, lunch and dinner).",
  "All transfers between Malé (Velana International Airport) and Dharavandhoo.",
  "Local expert guides throughout the trip.",
  "Snorkelling equipment for all planned activities.",
];

const EXCLUSIONS: string[] = [
  "Drone video package (approx. $30).",
  "Professional photo / video content by our photographer (includes 2–4 edited images, depending on good shots).",
  "Compulsory travel and diving insurance.",
  "Any extra activities, drinks, or meals not mentioned in the program.",
];

const ITINERARY: ItineraryDay[] = [
  {
    day: 1,
    title: "Arrival to Maldives & Turtles",
    description: [
      "Arrive at Malé Velana International Airport where one of our representatives will meet you.",
      "You’ll be directed to your domestic flight from Malé to Dharavandhoo Island in Baa Atoll.",
      "After check-in, we head out by boat in search of turtles and enjoy our first snorkelling session with them.",
      "Lunch and relaxed group dinner at the hotel, with free time to settle in on the island.",
    ],
  },
  {
    day: 2,
    title: "Manta Safari, Dolphins & Uninhabited Island",
    description: [
      "Breakfast at the hotel (local and continental options available).",
      "Morning manta and turtle safari: we head out to snorkel with mantas and turtles at nearby reef points.",
      "Return to the hotel for lunch.",
      "In the afternoon we go back out in search of dolphins and enjoy a chilled evening back at the hotel before sunset.",
    ],
  },
  {
    day: 3,
    title: "Visit to Raa Atoll",
    description: [
      "Breakfast at the hotel.",
      "Full-day excursion to neighbouring Raa Atoll, where conditions often allow for more manta encounters.",
      "Local-style lunch on a remote sandbank with time to relax on the beach.",
      "Snorkel and explore the surrounding reefs before returning to Dharavandhoo for a quiet evening.",
    ],
  },
  {
    day: 4,
    title: "Hanifaru Bay – Mantas & Whale Sharks (First Chance)",
    description: [
      "Breakfast at the hotel.",
      "Boat trip to Hanifaru Bay to snorkel with mantas; if there are no mantas in the bay, we head off in search of them in nearby channels.",
      "Local lunch at the hotel.",
      "Free time or extra snorkelling depending on conditions, then a relaxed evening on the island.",
    ],
  },
  {
    day: 5,
    title: "Hanifaru Bay & Sunset Fishing",
    description: [
      "Breakfast at the hotel.",
      "Another day focused on mantas and whale shark chances around Hanifaru Bay or alternative sites, depending on currents and visibility.",
      "Local lunch at the hotel.",
      "In the late afternoon we head out for a traditional sunset fishing trip.",
      "Return to the hotel for a chilled evening on the island.",
    ],
  },
  {
    day: 6,
    title: "Final Manta / Whale Shark Day & Beach BBQ",
    description: [
      "Breakfast at the hotel.",
      "A final day dedicated to mantas and whale sharks: we visit Hanifaru Bay again or search nearby areas if needed.",
      "Local lunch at the hotel.",
      "Once we locate them, we snorkel with whale sharks – the largest fish in the world.",
      "In the evening, enjoy a farewell beach BBQ with traditional bodu beru drumming to celebrate the end of the trip.",
    ],
  },
  {
    day: 7,
    title: "Departure Day",
    description: [
      "Breakfast at the hotel and check-out.",
      "Transfer from Dharavandhoo back to Malé by domestic flight.",
      "Trip ends at Velana International Airport – time to head back home with manta and whale shark memories.",
    ],
  },
];

const BOOKING: BookingConfig = {
  heading: "Ready to book this trip?",
  body: "Send us your preferred dates and number of travellers and we'll confirm availability, group size and domestic flight options.",
  ctaLabel: "Contact us to book",
  ctaHref: "https://wa.me/7481126",
};

const BAA_ATOLL_TRIP: ExcursionTripDetailProps = {
  hero: HERO,
  quickFacts: QUICK_FACTS,
  overview: OVERVIEW,
  inclusions: INCLUSIONS,
  exclusions: EXCLUSIONS,
  itinerary: ITINERARY,
  booking: BOOKING,
  availability: AVAILABILITY,
};

export default function Page() {
  return <ExcursionTripDetail {...BAA_ATOLL_TRIP} />;
}
