import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    youtubeId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    title: "Wedding Photography Showcase",
    category: "Wedding",
    description: "Beautiful wedding moments captured",
  },
  {
    id: 2,
    youtubeId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    title: "Corporate Photography Portfolio",
    category: "Corporate",
    description: "Professional corporate photography",
  },
  {
    id: 3,
    youtubeId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    title: "Fashion Photography Collection",
    category: "Fashion",
    description: "Creative fashion photography sessions",
  },
  {
    id: 4,
    youtubeId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    title: "Event Photography Highlights",
    category: "Events",
    description: "Memorable event photography",
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
            Explore our recent photography and video projects on YouTube
          </p>
        </div>

        {/* YouTube Video Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-black"
              onClick={() => openYouTubeVideo(item.youtubeId)}
            >
              <div className="aspect-video relative">
                <iframe
                  src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1&showinfo=0`}
                  title={item.title}
                  className="w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Overlay with video info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                <div className="text-white">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
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
