import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "fs";
import { join, extname, dirname, basename } from "path";

const IMAGES_DIR = "./public/images";

function getAllImages(dir) {
  let files = [];
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    if (statSync(fullPath).isDirectory()) {
      files = files.concat(getAllImages(fullPath));
    } else {
      const ext = extname(item).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function compressImages() {
  const images = getAllImages(IMAGES_DIR);
  console.log(`Found ${images.length} images...\n`);

  for (const imgPath of images) {
    const ext = extname(imgPath).toLowerCase();
    const beforeSize = statSync(imgPath).size;

    try {
      // Convert everything to JPG at quality 60
      // Resize if wider than 1200px
      const outputPath = imgPath.replace(/\.(png|jpg|jpeg|webp)$/i, ".jpg");

      await sharp(imgPath)
        .resize(1200, null, {
          // max width 1200px
          withoutEnlargement: true, // don't upscale small images
          fit: "inside",
        })
        .jpeg({ quality: 60, mozjpeg: true })
        .toFile(outputPath + ".tmp");

      // Replace original with compressed version
      const { renameSync, unlinkSync } = await import("fs");
      if (outputPath !== imgPath) unlinkSync(imgPath); // remove old .png
      renameSync(outputPath + ".tmp", outputPath);

      const afterSize = statSync(outputPath).size;
      const saving = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);
      console.log(`✅ ${outputPath}`);
      console.log(
        `   ${(beforeSize / 1024 / 1024).toFixed(2)}MB → ${(afterSize / 1024).toFixed(0)}KB (${saving}% smaller)\n`
      );
    } catch (err) {
      console.log(`❌ Failed: ${imgPath} — ${err.message}\n`);
    }
  }
  console.log("🎉 Done! Run: du -sh public/images/*");
}

compressImages();
