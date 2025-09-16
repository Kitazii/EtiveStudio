export const stillsImages = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  src: `/attached_assets/stills-images/${index + 1}.webp`,
  srcFallback: `/attached_assets/stills-images/${index + 1}.png`,
  srcThumb: `/attached_assets/stills-images/${index + 1}-thumb.webp`,
  alt: `Still ${index + 1}`,
  title: `Professional Still ${index + 1}`,
}));