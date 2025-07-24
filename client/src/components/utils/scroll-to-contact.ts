export const scrollToContact = (contactOffset: number | null) => {
    const element = document.querySelector("#contact") as HTMLElement;
    if (element) {
      const topDiv = element.querySelector("#contact-content") as HTMLElement;

      // Check if we're on mobile by checking window width
      const isMobile = window.innerWidth < 768;

      if (isMobile && contactOffset !== null) {
        window.scrollTo({
          top: contactOffset,
          behavior: "smooth",
        });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };