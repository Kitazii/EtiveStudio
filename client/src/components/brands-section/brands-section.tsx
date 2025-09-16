import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const brandLogos = [
  {
    id: 1,
    src: "/attached_assets/client-logos/adidas.png",
    alt: "Adidas",
  },
  {
    id: 2,
    src: "/attached_assets/client-logos/SGN.png",
    alt: "SGN",
  },
  {
    id: 3,
    src: "/attached_assets/client-logos/wren-kitchens.png",
    alt: "Wren Kitchens",
  },
  {
    id: 4,
    src: "/attached_assets/client-logos/alba.png",
    alt: "Visi Scotland | Alba",
  },
  {
    id: 5,
    src: "/attached_assets/client-logos/Adagio.png",
    alt: "Adagio Hotels",
  },
  {
    id: 6,
    src: "/attached_assets/client-logos/bladestar-renewables.png",
    alt: "Bladestar Renewables",
  },
  {
    id: 7,
    src: "/attached_assets/client-logos/harley-davidson.png",
    alt: "Harley Davidson",
  },
  {
    id: 8,
    src: "/attached_assets/client-logos/BBC.png",
    alt: "BBC",
  },
  {
    id: 9,
    src: "/attached_assets/client-logos/HAUS-of-Dentistry.png",
    alt: "HAUS of Dentistry",
  },
  {
    id: 10,
    src: "/attached_assets/client-logos/NWH-Group.png",
    alt: "NWH Group",
  },
  {
    id: 11,
    src: "/attached_assets/client-logos/cyber-energia.png",
    alt: "Cyber Energia",
  },
  {
    id: 12,
    src: "/attached_assets/client-logos/decathlon.png",
    alt: "Decathlon",
  },
];

export function BrandsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // SWIPE states
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile: Carousel settings
  const logosPerSlide = 3; // 3 logos at a time
  const totalSlides = Math.ceil(brandLogos.length / logosPerSlide);

   // --- SWIPE HANDLERS ---
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && carouselIndex < totalSlides - 1) {
      setCarouselIndex(carouselIndex + 1);
    }
    if (isRightSwipe && carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

   // --- LOGO SLICE ---
  // Slice logos for current carousel "page"
  const currentLogos = isMobile
    ? brandLogos.slice(carouselIndex * logosPerSlide, (carouselIndex + 1) * logosPerSlide)
    : brandLogos;

return (
    <section id="brands" className="py-16 md:py-24 bg-brand-light min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block border-b-4 border-brand-red pb-1 mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
              TRUSTED BY <span className="brand-gray">LEADING BRANDS</span>
            </h2>
          </span>
          <p className="text-lg brand-gray">
            We've had the privilege of working with industry leaders and
            innovative companies
          </p>
        </div>

        {/* Mobile Carousel */}
        {isMobile ? (
          <div className="relative flex flex-col items-center w-full">
            {/* Arrows */}
            <button
              onClick={() => setCarouselIndex(idx => Math.max(idx - 1, 0))}
              disabled={carouselIndex === 0}
              className=" mt-4 absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-lg z-10 disabled:opacity-40"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div 
            className="flex flex-row gap-8 w-full justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            >
              {currentLogos.map(brand => (
                <div
                  key={brand.id}
                  className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 min-w-0 flex-1"
                >
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="h-14 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                    onError={e => (e.currentTarget.style.display = "none")}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setCarouselIndex(idx => Math.min(idx + 1, totalSlides - 1))}
              disabled={carouselIndex === totalSlides - 1}
              className="mt-4 absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-lg z-10 disabled:opacity-40"
              arial-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {/* Dots */}
            <div className="flex gap-2 mt-4">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    i === carouselIndex ? "bg-brand-red" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            {/* Counter */}
            <div className="text-center mt-2">
              <span className="text-xs text-gray-500">
                {carouselIndex + 1} / {totalSlides}
              </span>
            </div>
          </div>
        ) : (
          // Desktop: Grid
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-[5rem] gap-y-[3rem] items-center justify-items-center">
            {brandLogos.map(brand => (
              <div
                key={brand.id}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className={`w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300
                    ${brand.alt === "HAUS of Dentistry"
                      ? "h-[106px]"
                      : brand.alt === "NWH Group"
                      ? "h-[110px]"
                      : brand.alt === "BBC"
                      ? "h-[125px]"
                      : "h-16"}`}
                  loading="lazy"
                  decoding="async"
                  onError={e => (e.currentTarget.style.display = "none")}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}