import { useEffect, useState } from "react";

export function useContactOffset(): number | null {
  const [contactOffset, setContactOffset] = useState<number | null>(null);

  const calculateOffset = () => {
    const contact = document.querySelector("#contact") as HTMLElement | null;
    const contactContent = document.querySelector(
      "#contact-content",
    ) as HTMLElement | null;
    if (contact && contactContent) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile
        ? contact.offsetTop + contactContent.offsetHeight / 2.1
        : null;
      setContactOffset(offset);
    }
  };

  useEffect(() => {
    calculateOffset(); // Initial calculation
    window.addEventListener("resize", calculateOffset);

    // ---- ONLY NECCESARY IF WE HAD IMAGES OR CONTENT THAT TAKE LONG TO LOAD
    // ---- IN THE CONTACT SECTION

    // // --- MutationObserver for DOM/content changes
    // const contact = document.querySelector("#contact");
    // let mutationObserver: MutationObserver | null = null;
    // if (contact) {
    //   mutationObserver = new MutationObserver(calculateOffset);
    //   mutationObserver.observe(contact, {
    //     childList: true,
    //     subtree: true,
    //     attributes: true,
    //     characterData: true,
    //   });
    // }

    // // --- ResizeObserver for size changes (optional but great)
    // const contactContent = document.querySelector("#contact-content");
    // let resizeObserver: ResizeObserver | null = null;
    // if (contactContent && "ResizeObserver" in window) {
    //   resizeObserver = new ResizeObserver(calculateOffset);
    //   resizeObserver.observe(contactContent);
    // }

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", calculateOffset);
      // if (mutationObserver) mutationObserver.disconnect();
      // if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return contactOffset;
}
