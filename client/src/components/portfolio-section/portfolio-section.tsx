import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

import { useIsMobileLayout } from "@/hooks/use-mobile";
import { useSwipe } from "@/hooks/use-swipe";

import { portfolioItems } from "./data/portfolioItems";

export function PortfolioSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  
  const isMobile = useIsMobileLayout();

  useEffect(() => {
  const newVideosPerPage = isMobile ? 1 : 4;
  const newTotalPages = Math.ceil(portfolioItems.length / newVideosPerPage);
  if (currentPage > newTotalPages - 1) {
    setCurrentPage(0);
  }
  // Optionally also reset activeVideoId for a smooth user experience
  setActiveVideoId(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isMobile]); // or [videosPerPage]

useEffect(() => {
  if (!isMobile || activeVideoId === null) return;

  function handleGlobalTouchOrClick(e : Event) {
    // e.composedPath() is not on all Event types, so check for it
    const path: EventTarget[] = (e as any).composedPath
      ? (e as any).composedPath()
      : [e.target as EventTarget];

    // Check if any element in the path has the .video-card class
    const clickedInsideCard = path.some((el) => {
      // Only check for classList on Element nodes
      return (el instanceof Element) && el.classList.contains("video-card");
    });

    if (!clickedInsideCard) {
      setActiveVideoId(null);
    }
  }

  // Listen for both touch and mouse (just in case)
  document.addEventListener("touchend", handleGlobalTouchOrClick);
  document.addEventListener("mousedown", handleGlobalTouchOrClick);

  // Clean up
  return () => {
    document.removeEventListener("touchend", handleGlobalTouchOrClick);
    document.removeEventListener("mousedown", handleGlobalTouchOrClick);
  };
}, [isMobile, activeVideoId]);

  const videosPerPage = isMobile ? 1 : 4; // 1 video on mobile, 4 on desktop
  const totalPages = Math.ceil(portfolioItems.length / videosPerPage);

  const openYouTubeVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank");
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setActiveVideoId(null);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setActiveVideoId(null);
  };

  const currentVideos = portfolioItems.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  // Touch/swipe handlers for mobile
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(
  () => {
    // Left swipe: Go to next page, only if not at last
    if (currentPage < totalPages - 1) nextPage();
  },
  () => {
    // Right swipe: Go to prev page, only if not at first
    if (currentPage > 0) prevPage();
  }
);

return (
    <section id="portfolio" className="py-16 md:py-24 bg-white min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block border-b-4 border-brand-red pb-1 mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
              OUR <span className="brand-gray">WORK</span>
            </h2>
          </span>
          <p className="text-lg brand-gray">
            Explore some of our recent projects on YouTube
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {/* MOBILE: Full-Height Edge Buttons */}
          {isMobile && activeVideoId === null && (
            <>
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`
                  absolute top-1/4 left-0 flex items-center justify-center 
                  bg-white/90 hover:bg-white
                  border border-gray-200 rounded-full p-3 shadow-lg
                  z-20
                  transition-all duration-200
                  disabled:opacity-50 disabled:pointer-events-none
                `}
              >
                <ChevronLeft className="w-6 h-6 text-brand-black" />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`
                  absolute top-1/4 right-0 flex items-center justify-center
                  bg-white/90 hover:bg-white
                  border border-gray-200 rounded-full p-3 shadow-lg
                  z-20
                  transition-all duration-200
                  disabled:opacity-50 disabled:pointer-events-none
                `}
              >
                <ChevronRight className="w-6 h-6 text-brand-black" />
              </button>
            </>
          )}

          {/* DESKTOP: Regular Circle Buttons */}
          {!isMobile && (
            <>
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`
                  absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-white/90 hover:bg-white
                  border border-gray-200 rounded-full p-3 shadow-lg
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${isMobile ? 'left-2' : 'left-0 md:-ml-6 lg:-ml-10 xl:-ml-20 -ml-4'}
                `}
              >
                <ChevronLeft className="w-6 h-6 text-brand-black" />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`
                  absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-white/90 hover:bg-white
                  border border-gray-200 rounded-full p-3 shadow-lg
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${isMobile ? 'right-2' : 'right-0 md:-mr-6 lg:-mr-10 xl:-mr-20 -mr-4'}
                `}
              >
                <ChevronRight className="w-6 h-6 text-brand-black" />
              </button>
            </>
          )}

          {/* YouTube Video Gallery Grid */}
          <div 
            className={`grid gap-6 transition-all duration-300 ${
              isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 scale-110'
            }`}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
          >
            {currentVideos.map((item) => {
              if (isMobile) {
                const overlayActive = activeVideoId === item.id;
                return (
                  <div
                    key={item.id}
                    className="video-card group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-transform transform-gpu duration-300 cursor-pointer bg-black hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      // If overlay is open, and the user didn't click the button, close overlay
                      if (overlayActive) setActiveVideoId(null);
                      else setActiveVideoId(item.id);
                    }}
                  >
                    <div className="aspect-video relative">
                      <img
                        src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                       {/* FAKE PLAY BUTTON (only if overlay is not active) */}
                      {!overlayActive && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <svg
                            width={80}
                            height={56}
                            viewBox="0 0 80 56"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="drop-shadow-xl"
                          >
                            <rect width="80" height="56" rx="16" fill="#FF0036" fillOpacity="0.95" />
                            <polygon  
                              points="30,16 52,28 30,40"
                              fill="white"
                            />
                          </svg>
                        </div>
                      )}
                      {/* Overlay with details and Watch on YouTube button */}
                      <div
                        className={`
                          absolute inset-0 transition-opacity duration-300 flex flex-col justify-end p-6
                          ${overlayActive ? "bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                        `}
                        style={{ zIndex: 20 }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing overlay when interacting inside
                      >
                        <div className="text-white w-full">
                          <div className="bg-black/60 rounded-lg px-3 py-2 mb-2">
                            <p className="text-sm text-gray-100">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="px-2 py-1 bg-red-600 text-xs font-medium rounded">
                              {item.category}
                            </span>
                          </div>
                          <button
                            className="w-full flex justify-center items-center gap-2 px-4 py-2 rounded bg-red-600 text-white font-semibold text-sm shadow hover:bg-red-700 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              openYouTubeVideo(item.youtubeId);
                            }}
                          >
                            <ExternalLink className="w-5 h-5" />
                            Watch on YouTube
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              // Desktop
              return (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-transform transform-gpu duration-300 cursor-pointer bg-black hover:scale-105"
                  onClick={() => openYouTubeVideo(item.youtubeId)}
                >
                  <div className="aspect-video relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1&showinfo=0`}
                      title={item.title}
                      className="w-full h-full rounded-xl filter-none"
                      style={{ minWidth: "113%", height: "100%" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                    <div className="text-white">
                      <div className="bg-black/60 rounded-lg px-3 py-2 mb-2">
                        <p className="text-sm text-gray-100">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-red-600 text-xs font-medium rounded">
                          {item.category}
                        </span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(index);
                    setActiveVideoId(null);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentPage
                      ? "bg-brand-red"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Mobile Video Counter */}
          {isMobile && (
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">
                {currentPage + 1} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
