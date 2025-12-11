import LiveaboardDivingPageClient from "@/components/pages/DiveInLiveaboardPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maldives liveaboard diving – 7-night routes | La Via Maldives",
  description:
    "Explore the Maldives on a 7-night liveaboard with La Via Maldives. Best of Maldives, Deep South and North Fiesta routes with 3–4 dives per day, comfortable cabins and local dive guides.",
  alternates: {
    canonical: "https://laviatravels.com/liveaboard-diving",
  },
};

export default function LiveaboardDivingPage() {
  return <LiveaboardDivingPageClient />;
}
