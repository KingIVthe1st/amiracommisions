const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create optimized directory if it doesn't exist
const optimizedDir = path.join(__dirname, 'docs', 'images', 'optimized');
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// List of images to optimize (PNG format)
const images = [
  'Bridesmaids.png',
  'Camel Portrait.png',
  'Dance, Dance, Dance.png',
  'Space to Breathe.png',
  'Still.png',
  'rebirth.png',
  'sharecard.png'
];

// Optimize each image
async function optimizeImages() {
  for (const image of images) {
    const inputPath = path.join(__dirname, 'docs', 'images', image);
    const outputPath = path.join(optimizedDir, image);
    
    try {
      // Get original file stats
      const originalStats = fs.statSync(inputPath);
      
      // Optimize PNG with lossless compression
      await sharp(inputPath)
        .png({
          quality: 100, // Keep maximum quality
          compressionLevel: 9, // Maximum compression
          adaptiveFiltering: true,
          force: true
        })
        .toFile(outputPath);
      
      // Get optimized file stats
      const optimizedStats = fs.statSync(outputPath);
      const savings = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(2);
      
      console.log(`✅ ${image}:`);
      console.log(`   Original: ${(originalStats.size / 1024).toFixed(2)} KB`);
      console.log(`   Optimized: ${(optimizedStats.size / 1024).toFixed(2)} KB`);
      console.log(`   Savings: ${savings}%`);
      
    } catch (error) {
      console.error(`❌ Error optimizing ${image}:`, error.message);
    }
  }
  
  console.log('\n🎉 Image optimization complete!');
  console.log(`Optimized images saved to: ${optimizedDir}`);
}

optimizeImages();
