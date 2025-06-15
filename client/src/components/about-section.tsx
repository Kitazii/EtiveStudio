import { useRef, useEffect, useState } from "react";

interface CounterProps {
  end: number;
  suffix: string;
  isVisible: boolean;
}

function AnimatedCounter({ end, suffix, isVisible }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 3000; // 3 seconds animation - all counters finish together

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, isVisible]);

  return (
    <div className="text-2xl font-bold brand-red">
      {count}{suffix}
    </div>
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
      { threshold: 0.3 }
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
    <section ref={sectionRef} id="about" className="py-16 md:py-24 bg-white min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1672950273686-0b02667f96aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Professional photographer at work"
              className={`lazy-load rounded-xl shadow-2xl w-full h-auto transition-opacity duration-300 ${
                isLoaded ? "loaded" : ""
              }`}
            />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-6">
              About <span className="brand-red">Etive Studio</span>
            </h2>
            <p className="text-lg brand-gray mb-6">
              With over a decade of experience in professional photography,
              Etive Studio specializes in creating compelling visual narratives
              for brands, events, and creative projects.
            </p>
            <p className="text-lg brand-gray mb-8">
              Our passion lies in capturing authentic moments and transforming
              them into powerful stories that resonate with audiences. From
              corporate headshots to brand campaigns, we bring technical
              expertise and creative vision to every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="text-center sm:text-left">
                <AnimatedCounter end={10} suffix="+" isVisible={isInView} />
                <div className="text-sm brand-gray">Years Experience</div>
              </div>
              <div className="text-center sm:text-left">
                <AnimatedCounter end={500} suffix="+" isVisible={isInView} />
                <div className="text-sm brand-gray">Projects Completed</div>
              </div>
              <div className="text-center sm:text-left">
                <AnimatedCounter end={200} suffix="+" isVisible={isInView} />
                <div className="text-sm brand-gray">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
