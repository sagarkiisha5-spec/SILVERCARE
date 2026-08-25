const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'C:\\Users\\pc\\Downloads\\silvercare\\silver care.png';
const outputPath = 'src/assets/hero-doctor.png';

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    console.log(`Image dimensions: ${this.width}x${this.height}`);

    console.log(`Top-left pixel RGB: (${this.data[0]}, ${this.data[1]}, ${this.data[2]})`);

    let bgPixelCount = 0;
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        // Background in original image:
        // Soft pinkish/lavender: high lightness (R > 185, G > 175, B > 185)
        const isLightPinkBg = (
          (r > 185 && g > 175 && b > 185) ||
          (r > 200 && b > 200) ||
          (r > 220 && g > 210)
        );

        // Skin tone preservation:
        const isSkinTone = (r > 140 && g > 90 && b > 70 && (r - g > 20) && (g - b > 10));

        // Green polo shirt preservation:
        const isGreenShirt = (g > r - 10 && g > b + 10 && g > 65);

        // Dark hair, glasses, shirt shadows:
        const isDarkSubject = (r + g + b < 360);

        if (isLightPinkBg && !isSkinTone && !isGreenShirt && !isDarkSubject && y < this.height * 0.88) {
          this.data[idx] = 255;     // Pure White R
          this.data[idx + 1] = 255; // Pure White G
          this.data[idx + 2] = 255; // Pure White B
          this.data[idx + 3] = 255; // Opaque
          bgPixelCount++;
        }
      }
    }

    console.log(`Replaced ${bgPixelCount} background pixels with pure white.`);

    this.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log('Successfully saved clean white background image to src/assets/hero-doctor.png!');
    });
  });
