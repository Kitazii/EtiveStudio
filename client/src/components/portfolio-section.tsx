import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    youtubeId: "Dna_GeK2gUU", // Replace with your actual YouTube video ID
    title: "Kincrest - The Gift of Memories",
    category: "Services",
    description: "A heartfelt message showcasing appreciation to life.",
  },
  {
    id: 2,
    youtubeId: "GTXT-3vWeII", // Replace with your actual YouTube video ID
    title: "Bladestar Renewables",
    category: "Energy",
    description: "Video showcasing work at the Bladestar turbines.",
  },
  {
    id: 3,
    youtubeId: "_Jdu7LDRtTo", // Replace with your actual YouTube video ID
    title: "Alcohol Companies Collection",
    category: "Alcohol",
    description: "Targeted alcohol videography sessions",
  },
  {
    id: 4,
    youtubeId: "Bix3EpNUeq4", // Replace with your actual YouTube video ID
    title: "Count Clays Shooting Academy Highlights",
    category: "Sports",
    description: "Showcasing a day of shooting and field sports.",
  },
];

export function PortfolioSection() {
  const openYouTubeVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank");
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Underline */}
          <span className="inline-block border-b-4 border-brand-red pb-1 mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
              LATEST <span className="brand-gray">WORK</span>
            </h2>
          </span>
          <p className="text-lg brand-gray">
            Explore our video projects on YouTube
          </p>
        </div>

        {/* YouTube Video Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item) => (
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

              {/* Overlay with video info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                <div className="text-white">
                  <p className="text-sm text-gray-200 mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-600 text-xs font-medium rounded">
                      {item.category}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
