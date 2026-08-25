const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'src/assets/hero-doctor.png';
const outputPath = 'src/assets/hero-doctor.png';

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    console.log(`Image dimensions: ${this.width}x${this.height}`);

    // Sample top-left corner pixel to get background reference color
    const idx0 = 0;
    console.log(`Top-left pixel RGB: (${this.data[idx0]}, ${this.data[idx1=1]}, ${this.data[idx2=2]})`);

    let bgPixelCount = 0;
    
    // We scan pixel by pixel
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        // Pinkish / Lavender background detection:
        // Background has high brightness (R > 180, B > 180) and pink/purple hue (R > G and B > G - 30)
        // Or y < 350 and not dark hair (R+G+B > 450) and pink tint (R > G + 15 or B > G + 10)
        
        // Let's check skin tones vs background:
        // Skin tones: R is highest, G is medium, B is lowest (R > G > B).
        // Background: Pink/Lavender gradient (R is high ~230-255, B is high ~220-255, G is lower ~200-240). Note B is close to or higher than G in background!
        
        const isPinkLavenderBg = (
          (r > 195 && b > 195 && (r > g + 10 || b > g + 10)) ||
          (r > 210 && g > 200 && b > 210) ||
          (r > 230 && g > 220 && b > 230)
        );

        // Don't replace skin tones (skin tones have R > G + 25 AND G > B + 15):
        const isSkinTone = (r > 150 && g > 100 && b > 80 && (r - g > 25) && (g - b > 10) && (r - b > 40));

        // Don't replace green shirt (green shirt has G > R and G > B):
        const isGreenShirt = (g > r && g > b);

        // Don't replace dark hair / glasses / clothes (R+G+B < 400):
        const isDarkSubject = (r + g + b < 380);

        if (isPinkLavenderBg && !isSkinTone && !isGreenShirt && !isDarkSubject) {
          this.data[idx] = 255;     // R
          this.data[idx + 1] = 255; // G
          this.data[idx + 2] = 255; // B
          this.data[idx + 3] = 255; // Alpha
          bgPixelCount++;
        }
      }
    }

    console.log(`Replaced ${bgPixelCount} background pixels with pure white.`);

    this.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log('Successfully saved white background image!');
    });
  });
