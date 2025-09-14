import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation/navigation";
import { Footer } from "@/components/footer-section/footer";
import { SEOHead } from "@/components/seo-head/seo-head";
import { StillsSection } from "@/components/stills-section/stills-section";
import { getDomain } from "@/global-function/get-domain";
import { stillsImages } from "@/components/stills-section/data/stills-data";

const getStillsJsonLd = () => {
  const domain = getDomain();
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${domain}/stills#gallery`,
    "name": "Etive Studios - Stills Collection",
    "description": "A curated collection of professional still photography work showcasing moments captured with precision and artistic vision",
    "url": `${domain}/stills`,
    "creator": {
      "@type": "Organization",
      "@id": `${domain}/#org`,
      "name": "Etive Studios",
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

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Stills Collection - Professional Photography | Etive Studios"
        description="Browse our curated collection of professional still photography work. Showcasing moments captured with precision and artistic vision by Etive Studios. View 11 stunning photography pieces."
        canonical="/stills"
        ogImage="/attached_assets/stills-images/still-1.png"
        jsonLd={getStillsJsonLd()}
      />
      <Navigation scrollSpy={scrollSpy} forceScrolledState={true} />
      
      <StillsSection
        isLightboxOpen={isLightboxOpen}
        lightboxImageIndex={lightboxImageIndex}
        openLightbox={openLightbox}
        closeLightbox={closeLightbox}
        nextLightboxImage={nextLightboxImage}
        prevLightboxImage={prevLightboxImage}
      />

      <Footer />
    </div>
  );
}