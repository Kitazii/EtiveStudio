import * as React from "react";
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

//Production code: Test using phone

export function useMobileDevice() {
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

export function useIsMobileLayout() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [MOBILE_BREAKPOINT]);
  return isMobile;
}