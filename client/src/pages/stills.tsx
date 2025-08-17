import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Navigation } from "@/components/navigation/navigation";
import { Footer } from "@/components/footer-section/footer";

import { SEOHead } from "@/components/seo-head/seo-head";
import { getDomain } from "@/global-function/get-domain";

// Sample images for the carousel - in a real app these would come from your CMS/API
const stillsImages = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  src: `/attached_assets/stills-images/${index + 1}.png`,
  alt: `Still ${index + 1}`,
  title: `Professional Still ${index + 1}`,
}));

const getStillsJsonLd = () => {
  const domain = getDomain();
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${domain}/stills#gallery`,
    "name": "Etive Studio - Stills Collection",
    "description": "A curated collection of professional still photography work showcasing moments captured with precision and artistic vision",
    "url": `${domain}/stills`,
    "creator": {
      "@type": "Organization",
      "@id": `${domain}/#org`,
      "name": "Etive Studio",
      "url": domain
    },
    "image": stillsImages.slice(0, 5).map(img => `${domain}${img.src}`),
    "numberOfItems": stillsImages.length,
    "mainEntity": {
      "@type": "CollectionPage",
      "name": "Professional Photography Portfolio",
      "description": "High-quality still photography showcasing professional expertise"
    }
  };
};

export default function StillsPage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const scrollSpy = "";

  // Lightbox functions
  const openLightbox = (imageIndex: number) => {
    setLightboxImageIndex(imageIndex);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % stillsImages.length);
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + stillsImages.length) % stillsImages.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevLightboxImage();
      } else if (e.key === 'ArrowRight') {
        nextLightboxImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);
  // --- DESKTOP COLUMN PATTERN & INDEXING (7 images per row) ---
  const columnPatterns = [
    { height: "h-96", imageCount: 2 },      // col 1
    { height: "h-96", imageCount: 1 },      // col 2
    { height: "h-96", imageCount: 2 },      // col 3
    { height: "h-[26rem]", imageCount: 1 }, // col 4
    { height: "h-[28rem]", imageCount: 1 }, // col 5
  ];
  const counts = columnPatterns.map((p) => p.imageCount);
  const imagesPerRow = counts.reduce((a, b) => a + b, 0); // = 7
  const cumStarts = counts.map((_, i) =>
    counts.slice(0, i).reduce((a, b) => a + b, 0)
  );

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Stills Collection - Professional Photography | Etive Studio"
        description="Browse our curated collection of professional still photography work. Showcasing moments captured with precision and artistic vision by Etive Studio. View 11 stunning photography pieces."
        canonical="/stills"
        ogImage="/attached_assets/stills-images/still-1.png"
        jsonLd={getStillsJsonLd()}
      />
      <Navigation scrollSpy={scrollSpy} forceScrolledState={true} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-black mb-6">
            STILLS COLLECTION
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A curated collection of our finest still photography work, showcasing 
            moments captured with precision and artistic vision.
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Masonry Grid Layout - Professional Photography Style */}
          <div className="space-y-4">
            {/* Create multiple rows to accommodate all 30 images */}
            {Array.from({ length: Math.ceil(stillsImages.length / 8) }, (_, rowIndex) => {
              const baseIndex = rowIndex * imagesPerRow;
              return (
                <div key={rowIndex} className="hidden md:flex gap-4 items-start">
                  {columnPatterns.map((pattern, colIndex) => {
                    const startIndex = baseIndex + cumStarts[colIndex];
                    const columnImages = stillsImages.slice(
                      startIndex,
                      startIndex + pattern.imageCount
                    );
                    if (columnImages.length === 0) return null;

                    return (
                      <div key={colIndex} className="flex-1 flex flex-col gap-4">
                        {pattern.imageCount === 1 ? (
                          <div
                            className={`group relative ${pattern.height} bg-gray-100 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                            onClick={() => openLightbox(startIndex)}
                          >
                            <img
                              src={columnImages[0].src}
                              alt={columnImages[0].alt}
                              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/90 rounded-full p-2 backdrop-blur-sm">
                                  <svg className="w-5 h-5 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <h3 className="text-white font-medium text-xs">{columnImages[0].title}</h3>
                            </div>
                          </div>
                        ) : (
                          <>
                            {columnImages.map((img, i) => (
                              <div
                                key={img.id}
                                className="group relative h-44 bg-gray-100 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                                onClick={() => openLightbox(startIndex + i)}
                              >
                                <img
                                  src={img.src}
                                  alt={img.alt}
                                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 rounded-full p-2 backdrop-blur-sm">
                                      <svg className="w-5 h-5 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <h3 className="text-white font-medium text-xs">{img.title}</h3>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
    })}
            
            {/* Mobile Layout - 2 Columns */}
            <div className="md:hidden grid grid-cols-2 gap-4">
              {stillsImages.map((image, index) => {
                // Alternate between shorter and taller images for visual variety
                const isShort = index % 3 === 0; // Every 3rd image is shorter
                const heightClass = isShort ? 'aspect-[3/4]' : 'aspect-[4/5]';
                
                return (
                  <div
                    key={image.id}
                    className={`group relative ${heightClass} bg-gray-100 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 rounded-full p-2 backdrop-blur-sm">
                          <svg className="w-5 h-5 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Image Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-medium text-xs">{image.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gallery Stats */}
          <div className="text-center mt-16 pt-8 border-t border-gray-200 pb-7">
            <p className="text-gray-600">
              <span className="font-medium text-brand-black">{stillsImages.length}</span> images in collection
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2
              text-black transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevLightboxImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30
              rounded-full p-3 text-black transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextLightboxImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30
              rounded-full p-3 text-black transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <img
              src={stillsImages[lightboxImageIndex].src}
              alt={stillsImages[lightboxImageIndex].alt}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image Info */}
            <div className="bg-black/60 absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white">
              <h3 className="text-lg font-medium mb-1">
                {stillsImages[lightboxImageIndex].title}
              </h3>
              <p className="text-sm text-white/70">
                {lightboxImageIndex + 1} of {stillsImages.length}
              </p>
            </div>
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeLightbox}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}