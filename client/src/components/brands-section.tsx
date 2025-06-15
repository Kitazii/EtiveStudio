import { useEffect, useState } from "react";

const brandLogos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
    alt: "Technology Brand",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
    alt: "Fashion Brand",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
    alt: "Automotive Brand",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
    alt: "Food & Beverage Brand",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1638481826540-7710b13f7d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
    alt: "Financial Services",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
    alt: "Healthcare Brand",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1560472354-761f8ecd3be4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
    alt: "Entertainment Company",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1560472355-b90a50be8b54?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
    alt: "Retail Brand",
  },
];

export function BrandsSection() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set([...prev, id]));
  };

  return (
    <section id="brands" className="py-16 md:py-24 bg-brand-light min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Trusted by <span className="brand-red">Leading Brands</span>
          </h2>
          <p className="text-lg brand-gray">
            We've had the privilege of working with industry leaders and
            innovative companies
          </p>
        </div>

        {/* Brand Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {brandLogos.map((brand) => (
            <div
              key={brand.id}
              className="brand-logo p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-[200px] h-[100px] flex items-center justify-center"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                className={`lazy-load max-h-12 max-w-full w-auto mx-auto transition-opacity duration-300 ${
                  loadedImages.has(brand.id) ? "loaded" : ""
                }`}
                onLoad={() => handleImageLoad(brand.id)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-xs text-gray-500 text-center px-2">${brand.alt}</span>`;
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
