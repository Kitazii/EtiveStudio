import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function HeroSection({
  contactOffset,
}: {
  contactOffset: number | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToContact = () => {
    const element = document.querySelector("#contact") as HTMLElement;
    if (element) {
      const topDiv = element.querySelector("#contact-content") as HTMLElement;

      // Check if we're on mobile by checking window width
      const isMobile = window.innerWidth < 768;

      if (isMobile && contactOffset !== null) {
        window.scrollTo({
          top: contactOffset,
          behavior: "smooth",
        });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Preload the video for smoother playback
      video.preload = "auto";

      // Handle loop manually to prevent stuttering
      video.addEventListener("ended", () => {
        video.currentTime = 0;
        video.play();
      });

      // Ensure video starts playing
      video.play().catch(console.error);
    }
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        webkit-playsinline="true"
        x-webkit-airplay="allow"
      >
        <source
          src="/attached_assets/homepage%20video_1752151273788.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 video-overlay"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-6xl lg:text-6xl font-bold mb-6">
            CAPTURING MOMENTS,
            <br />
            <span className="text-red-500">CREATING STORIES</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-150">
            Professional photography services that bring your vision to life
          </p>
          <Button
            onClick={scrollToContact}
            className="bg-red-600 text-white px-8 py-3 text-lg font-semibold hover:bg-red-700 transition-colors duration-200"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
