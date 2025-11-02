"use client";

import TestimonialsMovingDouble from "./TestimonialsMoving";

type Testimonial = {
  id: string;
  name: string;
  avatar: string;
  trip: "Safari" | "Excursion" | "Diving";
  when: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  location?: string;
};

const ITEMS: Testimonial[] = [
  {
    id: "t1",
    name: "Samantha A.",
    avatar: "/images/avatars/sam.jpg",
    trip: "Safari",
    when: "Aug 2025",
    rating: 5,
    quote:
      "Unreal sightings and super professional guides. The small group made it feel private.",
    location: "Cape Town, ZA",
  },
  {
    id: "t2",
    name: "Kenji M.",
    avatar: "/images/avatars/kenji.jpg",
    trip: "Excursion",
    when: "Jul 2025",
    rating: 5,
    quote:
      "Waterfalls and local lunch were the highlight of our trip. Seamless from pickup to drop-off.",
    location: "Tokyo, JP",
  },
  {
    id: "t3",
    name: "Maya R.",
    avatar: "/images/avatars/maya.jpg",
    trip: "Diving",
    when: "Jun 2025",
    rating: 4,
    quote:
      "Crystal water, healthy reefs, chill crew. Loved that we could reserve online and pay there.",
    location: "Barcelona, ES",
  },
  {
    id: "t4",
    name: "Luca P.",
    avatar: "/images/avatars/luca.jpg",
    trip: "Safari",
    when: "May 2025",
    rating: 5,
    quote:
      "Sunrise drive was magical. Learned a ton about the reserve and conservation efforts.",
    location: "Milan, IT",
  },
  {
    id: "t5",
    name: "Fatima Z.",
    avatar: "/images/avatars/fatima.jpg",
    trip: "Excursion",
    when: "Apr 2025",
    rating: 5,
    quote:
      "Great value, well-paced day. Our guide’s local stories made it special.",
    location: "Dubai, AE",
  },
  {
    id: "t6",
    name: "Noah K.",
    avatar: "/images/avatars/noah.jpg",
    trip: "Diving",
    when: "Mar 2025",
    rating: 4,
    quote:
      "Professional dive masters and solid gear. Perfect for knocking the rust off.",
    location: "Perth, AU",
  },
];

/* ---------- section ---------- */
export default function Testimonials() {
  return (
    <TestimonialsMovingDouble
      items={ITEMS}
      speedTop="normal"
      speedBottom="slow"
    />
  );
}
