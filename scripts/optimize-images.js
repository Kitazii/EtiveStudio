import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const optimizeImages = async () => {
  const stillsDir = 'attached_assets/stills-images';
  const clientLogosDir = 'attached_assets/client-logos';
  const myLogoDir = 'attached_assets/my-logo';
  const rootDir = 'attached_assets';

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

        // Get original image info
        const metadata = await sharp(input).metadata();
        console.log(`  Original: ${metadata.width}x${metadata.height}, ${(metadata.size / 1024 / 1024).toFixed(2)}MB`);

        // Create optimized main image (max 1920x1080, high quality)
        await sharp(input)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85, effort: 6 }) // Higher quality, better compression
          .toFile(outputWebp);

        // Create thumbnail (400px width, lower quality for speed)
        await sharp(input)
          .resize(400, null, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 75, effort: 4 })
          .toFile(outputThumb);

        // Check output sizes
        const webpStat = await fs.stat(outputWebp);
        const thumbStat = await fs.stat(outputThumb);
        console.log(`  WebP: ${(webpStat.size / 1024 / 1024).toFixed(2)}MB, Thumb: ${(thumbStat.size / 1024).toFixed(0)}KB`);

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

    // Optimize my logo directory
    console.log('Optimizing my logo...');
    const myLogoFiles = await fs.readdir(myLogoDir);

    for (const file of myLogoFiles) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const input = path.join(myLogoDir, file);
        const outputWebp = path.join(myLogoDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

        console.log(`Processing my logo ${file}...`);

        await sharp(input)
          .resize(300, null, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(outputWebp);

        console.log(`✓ Created ${outputWebp}`);
      }
    }

    // Optimize root directory images (logos, backgrounds, etc.)
    console.log('Optimizing root directory images...');
    const rootFiles = await fs.readdir(rootDir);

    for (const file of rootFiles) {
      if ((file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.PNG') || file.endsWith('.JPG') || file.endsWith('.JPEG')) && !file.includes('-thumb')) {
        const input = path.join(rootDir, file);
        const outputWebp = path.join(rootDir, file.replace(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/i, '.webp'));

        console.log(`Processing root image ${file}...`);

        // Get original image info
        const metadata = await sharp(input).metadata();
        console.log(`  Original: ${metadata.width}x${metadata.height}, ${(metadata.size / 1024 / 1024).toFixed(2)}MB`);

        await sharp(input)
          .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85, effort: 6 })
          .toFile(outputWebp);

        const webpStat = await fs.stat(outputWebp);
        console.log(`  WebP: ${(webpStat.size / 1024 / 1024).toFixed(2)}MB`);

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