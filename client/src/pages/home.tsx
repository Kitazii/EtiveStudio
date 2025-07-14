import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { BrandsSection } from "@/components/brands-section";
import { VisualNarrativesSection } from "@/components/visual-narratives-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useContactOffset } from "@/hooks/use-contact-offset";

export default function Home() {
  const contactOffset = useContactOffset();
  const scrollSpy = useScrollSpy([
    "home",
    "about",
    "brands",
    "portfolio",
    "contact",
  ]);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation scrollSpy={scrollSpy} />
      <HeroSection contactOffset={contactOffset} />
      <AboutSection />
      <BrandsSection />
      <VisualNarrativesSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
