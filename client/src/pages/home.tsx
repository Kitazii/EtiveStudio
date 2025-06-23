import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { BrandsSection } from "@/components/brands-section";
import { VisualNarrativesSection } from "@/components/visual-narratives-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const sections = ["home", "about", "brands", "portfolio", "contact"];

    // Store section references
    sections.forEach((section) => {
      sectionsRef.current[section] = document.getElementById(section);
    });

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = sectionsRef.current[section];
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    // Update active section on scroll
    window.addEventListener("scroll", updateActiveSection);

    // Initial call to set active state
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <BrandsSection />
      <VisualNarrativesSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
