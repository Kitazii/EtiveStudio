/**
 * Converts image path to WebP version if available
 * Falls back to original if WebP doesn't exist
 */
export function getOptimizedImagePath(originalPath: string): string {
  // Convert PNG/JPG paths to WebP
  if (originalPath.match(/\.(png|jpg|jpeg)$/i)) {
    return originalPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  }
  return originalPath;
}

/**
 * Get thumbnail version of image path
 */
export function getThumbnailPath(originalPath: string): string {
  if (originalPath.match(/\.(png|jpg|jpeg)$/i)) {
    return originalPath.replace(/\.(png|jpg|jpeg)$/i, '-thumb.webp');
  }
  return originalPath;
}

/**
 * Check if browser supports WebP
 */
export function supportsWebP(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(true);

  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}