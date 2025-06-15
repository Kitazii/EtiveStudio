import { useState } from 'react';
import { Play } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    title: "Wedding Photography Portfolio",
    category: "Wedding"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    title: "Corporate Photography Portfolio",
    category: "Corporate"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    title: "Fashion Photography Portfolio",
    category: "Fashion"
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    title: "Event Photography Portfolio",
    category: "Events"
  }
];

export function PortfolioSection() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set([...prev, id]));
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Latest <span className="brand-red">Work</span>
          </h2>
          <p className="text-lg brand-gray">
            Explore our recent photography and video projects
          </p>
        </div>
        
        {/* Video Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-video bg-black">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={`lazy-load w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    loadedImages.has(item.id) ? 'loaded' : ''
                  }`}
                  onLoad={() => handleImageLoad(item.id)}
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-12 h-12 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white font-semibold text-sm">{item.category}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
