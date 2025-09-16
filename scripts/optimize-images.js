import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const optimizeImages = async () => {
  const stillsDir = 'attached_assets/stills-images';
  const clientLogosDir = 'attached_assets/client-logos';

  console.log('Starting image optimization...');

  try {
    // Optimize stills images
    console.log('Optimizing stills images...');
    const stillsFiles = await fs.readdir(stillsDir);

    for (const file of stillsFiles) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const input = path.join(stillsDir, file);
        const outputWebp = path.join(stillsDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
        const outputThumb = path.join(stillsDir, file.replace(/\.(png|jpg|jpeg)$/i, '-thumb.webp'));

        console.log(`Processing ${file}...`);

        // Create optimized main image (max 1920x1080)
        await sharp(input)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputWebp);

        // Create thumbnail (400px width)
        await sharp(input)
          .resize(400, null, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 70 })
          .toFile(outputThumb);

        console.log(`✓ Created ${outputWebp} and ${outputThumb}`);
      }
    }

    // Optimize client logos
    console.log('Optimizing client logos...');
    const logoFiles = await fs.readdir(clientLogosDir);

    for (const file of logoFiles) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const input = path.join(clientLogosDir, file);
        const outputWebp = path.join(clientLogosDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

        console.log(`Processing logo ${file}...`);

        // Create optimized logo (max 300px width for logos)
        await sharp(input)
          .resize(300, null, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(outputWebp);

        console.log(`✓ Created ${outputWebp}`);
      }
    }

    console.log('Image optimization completed!');
    console.log('Note: Original files were preserved. You can delete them after verifying the WebP versions work correctly.');

  } catch (error) {
    console.error('Error during optimization:', error);
  }
};

// Run the optimization
optimizeImages();