import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Move the images array and types to a separate data file
import { stillsImages } from "@/components/stills-section/data/stills-data";

interface StillsSectionProps {
  isLightboxOpen: boolean;
  lightboxImageIndex: number;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  nextLightboxImage: () => void;
  prevLightboxImage: () => void;
}

export function StillsSection({
  isLightboxOpen,
  lightboxImageIndex,
  openLightbox,
  closeLightbox,
  nextLightboxImage,
  prevLightboxImage,
}: StillsSectionProps) {
  // --- DESKTOP COLUMN PATTERN & INDEXING (7 images per row) ---
  const columnPatterns = [
    { height: "h-96", imageCount: 2 },
    { height: "h-96", imageCount: 1 },
    { height: "h-96", imageCount: 2 },
    { height: "h-[26rem]", imageCount: 1 },
    { height: "h-[28rem]", imageCount: 1 },
  ];
  const counts = columnPatterns.map((p) => p.imageCount);
  const imagesPerRow = counts.reduce((a, b) => a + b, 0);
  const cumStarts = counts.map((_, i) =>
    counts.slice(0, i).reduce((a, b) => a + b, 0)
  );

  return (
    <>
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
                                loading={startIndex < 8 ? "eager" : "lazy"}
                                decoding="async"
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
                                    loading={startIndex + i < 8 ? "eager" : "lazy"}
                                    decoding="async"
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
                        loading={index < 6 ? "eager" : "lazy"}
                        decoding="async"
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
            <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
                <div className="relative w-full h-full p-4 flex flex-col">
                    <div className="relative flex-1 flex items-center justify-center min-h-0">
                    {/* Main Image and Info Container */}
                    <div className="relative max-w-full max-h-[calc(100vh-8rem-4.5rem)] md:max-h-[calc(100vh-8rem)]">
                        {/* Close Button - Moved inside image container */}
                        <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white/20 rounded-full p-2
                        text-black transition-colors duration-200"
                        >
                        <X className="w-6 h-6" />
                        </button>

                        {/* Previous Button - Moved inside image container */}
                        <button
                        onClick={prevLightboxImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/30
                        rounded-full p-3 text-black transition-colors duration-200"
                        >
                        <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Next Button - Moved inside image container */}
                        <button
                        onClick={nextLightboxImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/30
                        rounded-full p-3 text-black transition-colors duration-200"
                        >
                        <ChevronRight className="w-6 h-6" />
                        </button>

                        <img
                        src={stillsImages[lightboxImageIndex].src}
                        alt={stillsImages[lightboxImageIndex].alt}
                        className="w-auto h-auto max-w-full max-h-[calc(100vh-8rem-4.5rem)] md:max-h-[calc(100vh-8rem)] object-contain"
                        />

                        {/* Image Info */}
                        <div className="absolute bottom-0 left-0 right-0 text-center text-white bg-black/60 px-4 py-2">
                        <h3 className="text-lg font-medium mb-1">
                            {stillsImages[lightboxImageIndex].title}
                        </h3>
                        <p className="text-sm text-white/70">
                            {lightboxImageIndex + 1} of {stillsImages.length}
                        </p>
                        </div>
                    </div>
                    </div>

                    {/* Click outside to close */}
                    <div 
                    className="absolute inset-0 -z-10" 
                    onClick={closeLightbox}
                    />
                </div>
            </div>
        )}
    </>
  );
}