import DiveWithLocalsPageClient from "@/components/pages/DiveWithLocalsPageClient";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dive with locals in the Maldives – La Via Maldives",
  description:
    "Plan your Maldives dive trip with local guides in Baa Atoll and Fuvahmulah. Week-long packages with domestic flights, accommodation, guided dives and flexible add-ons.",
  alternates: {
    canonical: "https://laviatravels.com/dive-with-locals",
  },
};

export default function DiveWithLocalsPage() {
  return <DiveWithLocalsPageClient />;
}
