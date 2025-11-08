import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { mkdtemp, writeFile } from 'fs/promises';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';
import { tmpdir } from 'os';
import { sep } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePng = resolve(__dirname, '..', 'public', 'fort-logo.png');
const outputIco = resolve(__dirname, '..', 'public', 'favicon.ico');

try {
  const resizedBuffer = await sharp(sourcePng)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const tempDir = await mkdtemp(`${tmpdir()}${sep}favicon-`);
  const tempPngPath = resolve(tempDir, 'favicon.png');
  await writeFile(tempPngPath, resizedBuffer);

  const icoBuffer = await pngToIco([tempPngPath]);
  await writeFile(outputIco, icoBuffer);
  console.log(`Generated favicon at ${outputIco}`);

  const additionalSizes = [
    { size: 32, name: 'favicon-32x32.png' },
    { size: 180, name: 'apple-touch-icon.png' }
  ];

  await Promise.all(
    additionalSizes.map(async ({ size, name }) => {
      const buffer = await sharp(sourcePng)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();
      const outputPath = resolve(__dirname, '..', 'public', name);
      await writeFile(outputPath, buffer);
      console.log(`Generated ${name} at ${outputPath}`);
    })
  );
} catch (error) {
  console.error('Failed to generate favicon.ico', error);
  process.exitCode = 1;
}

