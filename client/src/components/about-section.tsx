import { useRef, useEffect, useState } from 'react';

export function AboutSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 bg-white min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1554048612-b6a482b224b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Professional photographer at work"
              className={`lazy-load rounded-xl shadow-2xl w-full h-auto transition-opacity duration-300 ${
                isLoaded ? 'loaded' : ''
              }`}
            />
          </div>
          
          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-6">
              About <span className="brand-red">Etive Studio</span>
            </h2>
            <p className="text-lg brand-gray mb-6">
              With over a decade of experience in professional photography, Etive Studio specializes in creating compelling visual narratives for brands, events, and creative projects.
            </p>
            <p className="text-lg brand-gray mb-8">
              Our passion lies in capturing authentic moments and transforming them into powerful stories that resonate with audiences. From corporate headshots to brand campaigns, we bring technical expertise and creative vision to every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold brand-red">10+</div>
                <div className="text-sm brand-gray">Years Experience</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold brand-red">500+</div>
                <div className="text-sm brand-gray">Projects Completed</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold brand-red">200+</div>
                <div className="text-sm brand-gray">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
