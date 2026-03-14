import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "../public/assets/gallery");

// Dimensions keyed by the aspect-ratio token in the filename
const SIZES = {
  "3x2-landscape":  { w: 1200, h: 800  },
  "16x9-landscape": { w: 1600, h: 900  },
  "4x5-portrait":   { w: 800,  h: 1000 },
};

// Each photo gets two colour pairs:
//   edited   → darker / more saturated  (simulates post-processed look)
//   original → lighter / more neutral   (simulates straight-from-camera look)
const photos = [
  // Birds
  { name: "birds-owl",
    edited:   { r: 20,  g: 40,  b: 90,  r2: 40,  g2: 70,  b2: 150 },
    original: { r: 80,  g: 100, b: 140, r2: 120, g2: 140, b2: 180 } },
  { name: "birds-heron",
    edited:   { r: 10,  g: 70,  b: 80,  r2: 20,  g2: 120, b2: 140 },
    original: { r: 80,  g: 140, b: 150, r2: 110, g2: 170, b2: 180 } },

  // Wildlife
  { name: "wildlife-fox",
    edited:   { r: 130, g: 50,  b: 10,  r2: 180, g2: 80,  b2: 20  },
    original: { r: 180, g: 130, b: 90,  r2: 210, g2: 160, b2: 120 } },
  { name: "wildlife-deer",
    edited:   { r: 50,  g: 70,  b: 20,  r2: 80,  g2: 110, b2: 30  },
    original: { r: 120, g: 140, b: 90,  r2: 160, g2: 170, b2: 120 } },

  // Landscape
  { name: "landscape-mountain",
    edited:   { r: 60,  g: 20,  b: 100, r2: 100, g2: 40,  b2: 160 },
    original: { r: 140, g: 110, b: 170, r2: 170, g2: 140, b2: 200 } },
  { name: "landscape-waterfall",
    edited:   { r: 10,  g: 80,  b: 100, r2: 20,  g2: 130, b2: 160 },
    original: { r: 100, g: 160, b: 175, r2: 130, g2: 185, b2: 200 } },

  // People
  { name: "people-portrait",
    edited:   { r: 110, g: 30,  b: 30,  r2: 160, g2: 50,  b2: 50  },
    original: { r: 180, g: 130, b: 120, r2: 210, g2: 160, b2: 150 } },
  { name: "people-silhouette",
    edited:   { r: 120, g: 80,  b: 10,  r2: 180, g2: 130, b2: 20  },
    original: { r: 190, g: 170, b: 110, r2: 215, g2: 195, b2: 140 } },
];

function makeSvg(w, h, r, g, b, r2, g2, b2) {
  const sq = 80;
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="cb" x="0" y="0" width="${sq * 2}" height="${sq * 2}" patternUnits="userSpaceOnUse">
          <rect x="0"     y="0"     width="${sq}" height="${sq}" fill="rgb(${r},${g},${b})"/>
          <rect x="${sq}" y="0"     width="${sq}" height="${sq}" fill="rgb(${r2},${g2},${b2})"/>
          <rect x="0"     y="${sq}" width="${sq}" height="${sq}" fill="rgb(${r2},${g2},${b2})"/>
          <rect x="${sq}" y="${sq}" width="${sq}" height="${sq}" fill="rgb(${r},${g},${b})"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cb)"/>
    </svg>`
  );
}

for (const photo of photos) {
  for (const variant of ["edited", "original"]) {
    const { r, g, b, r2, g2, b2 } = photo[variant];

    for (const [sizeKey, { w, h }] of Object.entries(SIZES)) {
      const filename = `gallery-${photo.name}-${variant}-${sizeKey}.webp`;
      await sharp(makeSvg(w, h, r, g, b, r2, g2, b2))
        .webp({ quality: 80 })
        .toFile(path.join(out, filename));
      console.log("generated", filename);
    }
  }
}
