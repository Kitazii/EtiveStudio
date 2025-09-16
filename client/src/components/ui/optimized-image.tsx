import { useState, useEffect, forwardRef } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  srcFallback?: string;
  alt: string;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(({
  src,
  srcFallback,
  alt,
  loading = 'lazy',
  className,
  ...props
}, ref) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasTriedWebP, setHasTriedWebP] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;

    // If we're trying WebP and it fails, fall back to original
    if (!hasTriedWebP && srcFallback) {
      console.log(`🔄 WebP failed for ${src}, falling back to ${srcFallback}`);
      setHasTriedWebP(true);
      setCurrentSrc(srcFallback);
      return;
    }

    // Call original onError if provided
    if (props.onError) {
      props.onError(e);
    }
  };

  // Debug logging for about image
  useEffect(() => {
    if (src.includes('Etive_1_')) {
      console.log(`🖼️ About image loading: ${currentSrc}`);
    }
  }, [currentSrc, src]);

  // Reset when src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasTriedWebP(false);
  }, [src]);

  return (
    <img
      ref={ref}
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      onError={handleError}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';