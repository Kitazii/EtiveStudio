import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// export function useIsMobile() {
//   const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
//     undefined,
//   );

//   React.useEffect(() => {
//     const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
//     const onChange = () => {
//       setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     };
//     mql.addEventListener("change", onChange);
//     setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     return () => mql.removeEventListener("change", onChange);
//   }, []);

//   return !!isMobile;
// }

//Production code: Test using phone

export function useIsMobile() {
  const [isMobileDevice, setIsMobileDevice] = React.useState<boolean>(false);

  React.useEffect(() => {
    // 1) Check viewport width
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // 2) Check “mobile” userAgentData (newer browsers) or fall back to touch detection
    const detectMobileHardware = () => {
      const nav = navigator as any;

      // Preferred: UA Client Hints
      if (nav.userAgentData && typeof nav.userAgentData.mobile === "boolean") {
        return nav.userAgentData.mobile;
      }

      // Fallbacks:
      // - Touch event support
      // - maxTouchPoints > 0
      // - common mobile substrings in userAgent
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      );
    };

    const evaluate = () => {
      const isSmall = mql.matches;
      const isHardwareTouch = detectMobileHardware();
      setIsMobileDevice(isSmall && isHardwareTouch);
    };

    mql.addEventListener("change", evaluate);
    window.addEventListener("resize", evaluate);

    // initial
    evaluate();

    return () => {
      mql.removeEventListener("change", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return isMobileDevice;
}
