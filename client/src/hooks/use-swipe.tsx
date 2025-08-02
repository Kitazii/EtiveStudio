import { useState, useEffect } from "react";

export function useSwipe(onLeft: () => void, onRight: () => void) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) onLeft();
    if (distance < -50) onRight();
    setTouchStart(0); setTouchEnd(0);
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}