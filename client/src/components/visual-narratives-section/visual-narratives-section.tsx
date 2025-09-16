import { useEffect, useRef, useState } from "react";
import {scrollToContact} from "@/components/utils/scroll-to-contact";

export function VisualNarrativesSection({
  contactOffset,
}: {
  contactOffset: number | null;
}) {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const scrollPosition = window.scrollY - sectionTop;
        setParallaxOffset(scrollPosition);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[55vh] md:min-h-[65vh] flex flex-col overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-[110%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/attached_assets/London_1752238686588.webp')",
          transform: `translateY(${parallaxOffset * 0.3}px)`,
          top: "3.0%",
        }}
        aria-hidden
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75 z-10"></div>

      {/* Red geometric overlays */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-brand-red/80 to-transparent z-20"></div>
      <div className="absolute top-0 left-0 w-16 h-20 bg-brand-red/60 z-20"></div>
      <div className="absolute top-6 left-6 w-8 h-8 border-2 border-white/50 rotate-45 z-20"></div>

      {/* Centered Content */}
      <div className="relative z-30 flex-1 flex items-center justify-center py-10 md:py-16 md:mt-12 mt-16">
        <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            CRAFTING VISUAL
            <br />
            NARRATIVES
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            we create high-impact video content that transforms your brand's
            vision into a compelling story, reaching audiences worldwide.
          </p>
        </div>
      </div>

      {/* Full-width horizontal banner/button */}
      <button
        onClick={() => scrollToContact(contactOffset)}
        className="relative z-30 w-full bg-brand-red text-white py-3 text-center text-base font-semibold uppercase tracking-wide
          hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red"
        type="button"
      >
        LET'S MAKE A SCENE
    </button>
    </section>
  );
}
