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
  const [imageSrc, setImageSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError && srcFallback) {
      setIsError(true);
      setImageSrc(srcFallback);
    }
  };

  // Reset error state when src changes
  useEffect(() => {
    setImageSrc(src);
    setIsError(false);
  }, [src]);

  // For modern browsers, we can use the picture element for better fallback
  if (srcFallback) {
    return (
      <picture>
        <source srcSet={src} type="image/webp" />
        <img
          ref={ref}
          src={srcFallback}
          alt={alt}
          loading={loading}
          decoding="async"
          className={className}
          onError={handleError}
          {...props}
        />
      </picture>
    );
  }

  return (
    <img
      ref={ref}
      src={imageSrc}
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