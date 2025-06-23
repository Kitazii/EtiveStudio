import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export function VisualNarrativesSection() {
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
    <section ref={sectionRef} className="relative min-h-[55vh] md:min-h-[65vh] flex flex-col overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-[110%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531152127291-ea24c3b2a1da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          transform: `translateY(${parallaxOffset * 0.2}px)`,
          top: '-5%',
        }}
        aria-hidden
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Red geometric overlays */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-brand-red/80 to-transparent z-20"></div>
      <div className="absolute top-0 left-0 w-16 h-20 bg-brand-red/60 z-20"></div>
      <div className="absolute top-6 left-6 w-8 h-8 border-2 border-white/50 rotate-45 z-20"></div>

      {/* Centered Content */}
      <div className="relative z-30 flex-1 flex items-center justify-center py-10 md:py-16">
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

      {/* Full-width horizontal banner button */}
      <div className="relative z-30 w-full">
        <Button className="w-full bg-brand-red hover:bg-red-700 text-white py-6 text-lg font-semibold uppercase tracking-wide rounded-none border-none">
          LET'S MAKE A SCENE
        </Button>
      </div>
    </section>
  );
}
