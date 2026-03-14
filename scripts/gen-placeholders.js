import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "../public/assets/landing");

const sections = [
  { id: "hero",            r: 30,  g: 30,  b: 30,  r2: 60,  g2: 60,  b2: 60  },
  { id: "birds",           r: 20,  g: 50,  b: 80,  r2: 40,  g2: 90,  b2: 140 },
  { id: "wildlife",        r: 60,  g: 80,  b: 40,  r2: 100, g2: 130, b2: 60  },
  { id: "landscape",       r: 80,  g: 60,  b: 20,  r2: 140, g2: 100, b2: 40  },
  { id: "macro",           r: 80,  g: 20,  b: 60,  r2: 140, g2: 40,  b2: 100 },
  { id: "focus-stacking",  r: 20,  g: 80,  b: 80,  r2: 40,  g2: 140, b2: 140 },
  { id: "macro-workflow",  r: 40,  g: 20,  b: 80,  r2: 80,  g2: 40,  b2: 140 },
  { id: "360-stitching",   r: 80,  g: 40,  b: 20,  r2: 140, g2: 80,  b2: 40  },
  { id: "long-exposure",   r: 10,  g: 10,  b: 50,  r2: 30,  g2: 30,  b2: 100 },
  { id: "post-processing", r: 50,  g: 10,  b: 10,  r2: 100, g2: 30,  b2: 30  },
  { id: "gear",            r: 40,  g: 40,  b: 40,  r2: 80,  g2: 80,  b2: 80  },
  { id: "about",           r: 20,  g: 40,  b: 20,  r2: 40,  g2: 80,  b2: 40  },
  { id: "contact",         r: 20,  g: 20,  b: 40,  r2: 40,  g2: 40,  b2: 80  },
];

function makeSvg(w, h, r, g, b, r2, g2, b2) {
  const sq = 80;
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="cb" x="0" y="0" width="${sq * 2}" height="${sq * 2}" patternUnits="userSpaceOnUse">
          <rect x="0"    y="0"    width="${sq}" height="${sq}" fill="rgb(${r},${g},${b})"/>
          <rect x="${sq}" y="0"   width="${sq}" height="${sq}" fill="rgb(${r2},${g2},${b2})"/>
          <rect x="0"    y="${sq}" width="${sq}" height="${sq}" fill="rgb(${r2},${g2},${b2})"/>
          <rect x="${sq}" y="${sq}" width="${sq}" height="${sq}" fill="rgb(${r},${g},${b})"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cb)"/>
    </svg>`
  );
}

for (const { id, r, g, b, r2, g2, b2 } of sections) {
  await sharp(makeSvg(1200, 800,  r, g, b, r2, g2, b2)).webp({ quality: 80 }).toFile(`${out}/landing-${id}-3x2-landscape.webp`);
  await sharp(makeSvg(800,  1000, r, g, b, r2, g2, b2)).webp({ quality: 80 }).toFile(`${out}/landing-${id}-4x5-portrait.webp`);
  console.log("generated", id);
}
