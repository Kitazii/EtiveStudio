const brandLogos = [
  {
    id: 1,
    src: "https://logo.clearbit.com/adidas.co.uk",
    alt: "Adidas",
  },
  {
    id: 2,
    src: "https://logo.clearbit.com/sgn.co.uk",
    alt: "SGN",
  },
  {
    id: 3,
    src: "https://logo.clearbit.com/wrenkitchens.com",
    alt: "Wren Kitchens",
  },
  {
    id: 4,
    src: "https://logo.clearbit.com/visitscotland.org",
    alt: "Visi Scotland | Alba",
  },
  {
    id: 5,
    src: "https://logo.clearbit.com/cyberenergia.com",
    alt: "Cyber Energia",
  },
  {
    id: 6,
    src: "https://logo.clearbit.com/bladestarrenewables.com",
    alt: "Bladestar Renewables",
  },
  {
    id: 7,
    src: "https://logo.clearbit.com/harley-davidson.com",
    alt: "Harley Davidson",
  },
  {
    id: 8,
    src: "https://logo.clearbit.com/bbc.co.uk",
    alt: "BBC",
  },
  {
    id: 9,
    src: "https://logo.clearbit.com/hausofdentistry.com",
    alt: "HAUS of Dentistry",
  },
  {
    id: 10,
    src: "https://logo.clearbit.com/nwhgroup.co.uk",
    alt: "NWH Group",
  },
  {
    id: 11,
    src: "https://logo.clearbit.com/adagio-city.com",
    alt: "Adagio Hotels",
  },
  {
    id: 12,
    src: "https://logo.clearbit.com/decathlon.co.uk",
    alt: "Decathlon",
  },
];

export function BrandsSection() {
  return (
    <section id="brands" className="py-16 md:py-24 bg-brand-light min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Underline */}
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

        {/* Brand Logos Grid - Clean and Slick */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center">
          {brandLogos.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                className="h-8 md:h-10 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
