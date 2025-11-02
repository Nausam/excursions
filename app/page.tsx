import AvailabilityBar from "@/components/AvailabilityBar";
import CategoriesGrid from "@/components/CategoriesGrid";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Safety from "@/components/Safety";
import SiteFooter from "@/components/SiteFooter";
import Testimonials from "@/components/Testimonials";
import TripHighlights from "@/components/TripHighlights";
import WhyUs from "@/components/WhyUs";

export default function Page() {
  return (
    <main>
      <Hero />
      <AvailabilityBar />
      <CategoriesGrid />
      <WhyUs />
      <HowItWorks />
      <TripHighlights />
      <Testimonials />
      <Safety />
      <Faq />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
