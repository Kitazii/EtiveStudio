import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/navigation/navigation";
import { SEOHead } from "@/components/seo-head/seo-head";
import { HeroSection } from "@/components/hero-section/hero-section";
import { AboutSection } from "@/components/about-section/about-section";
import { BrandsSection } from "@/components/brands-section/brands-section";
import { VisualNarrativesSection } from "@/components/visual-narratives-section/visual-narratives-section";
import { PortfolioSection } from "@/components/portfolio-section/portfolio-section";
import { ContactSection } from "@/components/contact-section/contact-section";
import { Footer } from "@/components/footer-section/footer";

import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useContactOffset } from "@/hooks/use-contact-offset";

import { getDomain } from "@/global-function/get-domain";

const getHomeJsonLd = () => {
  const domain = getDomain();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${domain}/#org`,
    "name": "Etive Studios",
    "description": "Professional videography services for brands, events, and creative projects",
    "url": domain,
    "logo": `${domain}/attached_assets/ETIVE STUDIO WHITE_1751492571603.webp`,
    "image": `${domain}/attached_assets/stills-images/1.webp`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [],
    "serviceType": "Videography Services",
    "areaServed": "Worldwide"
  };
};
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
      <SEOHead
        title="Etive Studios - Professional Videography Services"
        description="Etive Studios offers professional videography services for brands, events, and creative projects. Based videographer with extensive portfolio and trusted by leading brands including Decathlon, Harley-Davidson, BBC, and Adidas."
        canonical="/"
        ogImage="/attached_assets/stills-images/still-1.webp"
        jsonLd={getHomeJsonLd()}
      />
      <Navigation scrollSpy={scrollSpy} />
      <HeroSection contactOffset={contactOffset} />
      <AboutSection />
      <BrandsSection />
      <VisualNarrativesSection contactOffset={contactOffset}/>
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
