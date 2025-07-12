import { useState, useEffect, useRef } from "react";

export function useScrollSpy(sections: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    sections.forEach((section) => {
      sectionsRef.current[section] = document.getElementById(section);
    });

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + offset;
      sections.forEach((section) => {
        const element = sectionsRef.current[section];
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", updateActiveSection);
    updateActiveSection();
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [sections, offset]);

  return activeSection;
}
