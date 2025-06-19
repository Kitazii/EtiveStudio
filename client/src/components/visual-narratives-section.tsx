import { Button } from "@/components/ui/button";
import { useState } from "react";

export function VisualNarrativesSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              CRAFTING VISUAL
              <br />
              NARRATIVES
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              we create high-impact video content that transforms your brand's
              vision into a compelling story, reaching audiences worldwide.
            </p>
            <Button className="bg-brand-red hover:bg-red-700 text-white px-8 py-3 text-sm font-semibold uppercase tracking-wide">
              LET'S MAKE A SCENE
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
              {!imgError ? (
                <img
                  src="https://images.unsplash.com/photo-1531152127291-ea24c3b2a1da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
                  alt="Urban cityscape with modern architecture img"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                // Custom fallback with white text
                <div className="flex items-center justify-center w-full h-full bg-gray-900">
                  <span className="text-white text-lg font-semibold text-center p-4">
                    Urban cityscape with modern architecture img
                  </span>
                </div>
              )}
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
              {/* Red geometric overlay */}
              <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-brand-red/80 to-transparent"></div>
              <div className="absolute top-0 left-0 w-16 h-20 bg-brand-red/60"></div>
              <div className="absolute top-6 left-6 w-8 h-8 border-2 border-white/50 rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
