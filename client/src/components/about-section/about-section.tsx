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

    const duration = 300; // 5 mili-seconds animation // maybe 300
    const steps = 60; // Number of update steps for smooth animation // maybe 60
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
    <span className={`text-3xl font-bold ${textColor}`}>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1 relative hidden md:block md:me-10">
            <div className="md:scale-[1.16]">
              <img
                ref={imageRef}
                src="/attached_assets/Etive_1_1752237970702.JPG"
                alt="Etive Studio City Photo"
                className={`lazy-load rounded-xl shadow-2xl w-full h-auto transition-opacity duration-300 ${
                  isLoaded ? "loaded" : ""
                }`}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 pointer-events-none rounded-xl "></div>
            </div>
          </div>
          {/* Text */}
          <div className="order-1 lg:order-2">
            {/* Title Section */}
            <div className="text-left mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-6 text-center">
                <span className="inline-block border-b-4 border-brand-red pb-1">
                  ABOUT <span className="brand-gray">ETIVE STUDIOS</span>
                </span>
                </h2>
            </div>
            <div className="flex items-start">
              <p className="text-lg brand-gray">
                With over a decade of experience in professional videography,
                Etive Studios specialises in creating compelling visual
                narratives for brands, events, and creative projects.
              </p>
            </div>
            <p className="text-lg brand-gray mb-8">
              Our passion lies in capturing authentic moments and transforming
              them into powerful stories that resonate with audiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:h-[150px]">
              {/* 10+ Years Experience Card */}
              <div className="bg-gray-200 text-white p-6 rounded-xl text-center flex flex-col items-center justify-center flex-1">
                <div className="text-3xl font-bold text-white mb-2">
                  <AnimatedCounter
                    end={10}
                    suffix="+"
                    isVisible={isInView}
                    textColor="text-black"
                  />
                </div>
                <div className="text-sm text-gray-900">Years Experience</div>
              </div>

              {/* 500+ Projects Card */}
              <div className="bg-gray-200 text-white p-6 rounded-xl text-center flex flex-col items-center justify-center flex-1">
                <div className="text-3xl font-bold text-white mb-2">
                  <AnimatedCounter
                    end={1000}
                    suffix="+"
                    isVisible={isInView}
                    textColor="text-black"
                  />
                </div>
                <div className="text-sm text-gray-900">Projects Completed</div>
              </div>             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
