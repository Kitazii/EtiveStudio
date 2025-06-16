import { useRef, useEffect, useState } from "react";

interface CounterProps {
  end: number;
  suffix: string;
  isVisible: boolean;
  textColor?: string;
}

function AnimatedCounter({
  end,
  suffix,
  isVisible,
  textColor = "brand-red",
}: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 500; // 5 mili-seconds animation
    const steps = 120; // Number of update steps for smooth animation
    const stepDuration = duration / steps;
    const increment = end / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newCount = Math.min(Math.floor(currentStep * increment), end);
      setCount(newCount);

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(end); // Ensure we hit the exact target
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [end, isVisible]);

  return (
    <span className={`text-2xl font-bold ${textColor}`}>
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          imageObserver.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 },
    );

    if (imageRef.current) {
      imageObserver.observe(imageRef.current);
    }

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    return () => {
      imageObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 md:py-24 bg-white min-h-[50vh]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Image */}
          <div className="order-2 lg:order-1 mb-8 lg:mb-0">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1672950273686-0b02667f96aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Professional photographer at work"
              className={`lazy-load rounded-xl shadow-2xl w-full h-auto transition-opacity duration-300 ${
                isLoaded ? "loaded" : ""
              }`}
            />
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-6">
              About <span className="brand-red">Etive Studio</span>
            </h2>
            <div className="flex items-start">
              <div className="text-6xl text-gray-500 mr-2 w-[2.5em] leading-none">
                W
              </div>
              <p className="text-lg brand-gray">
                ith over a decade of experience in professional photography,
                Etive Studio specializes in creating compelling visual
                narratives for brands, events, and creative projects.
              </p>
            </div>
            <p className="text-lg brand-gray mb-8">
              Our passion lies in capturing authentic moments and transforming
              them into powerful stories that resonate with audiences. From
              corporate headshots to brand campaigns, we bring technical
              expertise and creative vision to every project.
            </p>
          </div>

          {/* Statistics Cards - Positioned to overlap image */}
          <div className="absolute bottom-0 left-0 lg:left-[-7.5%] w-full lg:w-auto z-10 flex flex-col sm:flex-row gap-4 px-4 lg:px-0">
            <div className="bg-brand-black text-white p-6 rounded-xl text-center shadow-xl lg:min-w-[120px]">
              <div className="text-2xl font-bold text-white mb-2">
                <AnimatedCounter
                  end={10}
                  suffix="+"
                  isVisible={isInView}
                  textColor="text-white"
                />
              </div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </div>
            <div className="bg-brand-red text-white p-6 rounded-xl text-center shadow-xl lg:min-w-[120px]">
              <div className="text-2xl font-bold text-white mb-2">
                <AnimatedCounter
                  end={500}
                  suffix="+"
                  isVisible={isInView}
                  textColor="text-white"
                />
              </div>
              <div className="text-sm text-gray-200">Projects Completed</div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl lg:min-w-[120px] h-[88px]">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=240&h=176"
                alt="Photography equipment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
