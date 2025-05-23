const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Decode base64 and save as PNG
const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABNJJREFUaEPtmttx4zAMRVlJmvAmaW+S9CaZdJL0Jt5UYtL5sEYCBEjJlp3M7K74EU9K5AGEBMCP9/f3r6+vr6/X19evvE797D3P+zlnXddlmaa8neapfc+yLNu2bdvr1+fn5/b29vb98PDw/fj4mMf22H523NMb5J8eeHp/wHlkzAnIHsBu/4iZGPv17EzHQbDzXk+0FnY+EuDtAGxZluI87g/7nmUyN86j7rkLjDpQCYt7Tl2IAjv+jwJGQKSACl7sFfByTLluv24dCxAZ6FGQBAXHGaRdqwcUkDKsgkgwU7BUuHtBzDoQCaiMRZ4CEsdbltm3ACWnogMeZ6RJzwg0N6Y0k0wBQZdUZJ0t9gDCeAGWfpd34h1A/ZaZgJDUacVTZWKv8WH/Z1kMcCmTjbMxlAOZZ71WIp+Fg8ZtYqhwGg5kLMYZzCIELnRkAqJA48CJkTqGhcGAq+G7c0iiztAyCsZNIzSLWsflAAVgAaJlPTBAhwApKXQHxPMmzvOOL3JgRZuq02RAvZeBlCgHKHB3QFxwZIbfGEQWnzLTLbBWowbB5kCk05Epm7HsOVVMnEOOCqRVjdE4zxoAIe5QJP8CRLN2RjNrQQMWZWlGTlPJSkpqp14TN4Sdu0RhqjORmXbzd7F/VC0RWF2dRhAZXM5Y2AwQeY82CzsjKEetxVyJB3ueYK1lkZnTDDkDqfP2JJbSGp8Jp6UhDNZbpF8/CgJwUj0c91kMuQB0Eqk1fscwZpCsW4FJdnKKRcbLmiwKnqUhHOaQpG5jRjVpFUQGUCJMAcxapJ9rR9JZuO';
const outputDir = path.join(__dirname, 'docs', 'images', 'optimized');
const outputPath = path.join(outputDir, 'bg-pattern.png');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Remove the data URL prefix and convert from base64 to buffer
const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');
const buffer = Buffer.from(base64Data, 'base64');

// Save original for comparison
fs.writeFileSync(outputPath, buffer);

// Optimize with sharp
async function optimizeImage() {
  try {
    const originalSize = fs.statSync(outputPath).size;
    
    // Create WebP version (better compression for patterns)
    await sharp(buffer)
      .webp({ quality: 90, effort: 6 })
      .toFile(outputPath.replace('.png', '.webp'));
    
    // Create optimized PNG version (for browsers that don't support WebP)
    await sharp(buffer)
      .png({ compressionLevel: 9, quality: 90 })
      .toFile(outputPath);
    
    const optimizedPngSize = fs.statSync(outputPath).size;
    const webpSize = fs.statSync(outputPath.replace('.png', '.webp')).size;
    
    console.log('Optimization complete:');
    console.log(`- Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`- Optimized PNG: ${(optimizedPngSize / 1024).toFixed(2)} KB (${((1 - optimizedPngSize / originalSize) * 100).toFixed(2)}% smaller)`);
    console.log(`- WebP: ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize / originalSize) * 100).toFixed(2)}% smaller)`);
    
    // Update the CSS with the new image paths
    updateCssWithNewImages();
    
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

function updateCssWithNewImages() {
  const cssPath = path.join(__dirname, 'docs', 'styles', 'luxury-effects.css');
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Replace the base64 with a reference to the optimized files
  const newCss = cssContent.replace(
    /background-image:\s*url\('[^']+'\)/,
    `background-image: url('../images/optimized/bg-pattern.webp');\n    background-image: -webkit-image-set(url('../images/optimized/bg-pattern.webp') 1x, url('../images/optimized/bg-pattern.png') 1x);\n    background-image: image-set(url('../images/optimized/bg-pattern.webp') 1x, url('../images/optimized/bg-pattern.png') 1x);`
  );
  
  fs.writeFileSync(cssPath, newCss);
  console.log('✅ Updated CSS with optimized background images');
}

// Run the optimization
optimizeImage();
