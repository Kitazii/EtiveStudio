import { Button } from '@/components/ui/button';

export function VisualNarrativesSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              CRAFTING VISUAL<br />
              NARRATIVES
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              WE CREATE HIGH-IMPACT VIDEO CONTENT THAT TRANSFORMS YOUR BRAND'S VISION 
              INTO A COMPELLING STORY, REACHING AUDIENCES WORLDWIDE.
            </p>
            <Button className="bg-brand-red hover:bg-red-700 text-white px-8 py-3 text-sm font-semibold uppercase tracking-wide">
              LET'S MAKE A SCENE
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68e2c6b7dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
                alt="Urban cityscape with modern architecture"
                className="w-full h-full object-cover"
              />
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