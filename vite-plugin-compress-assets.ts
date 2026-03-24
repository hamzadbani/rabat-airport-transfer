import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import sharp from 'sharp'
import type { Plugin } from 'vite'

const IMAGE_EXT = /\.(jpg|jpeg|png)$/i
const MAX_WIDTH = 1600
const JPEG_QUALITY = 82
const PNG_EFFORT = 9

/**
 * Compresses and resizes image assets after build to reduce page download size.
 * Targets keeping total page under 5MB (hero video must be optimized separately).
 */
export function compressAssetPlugin(): Plugin {
  return {
    name: 'compress-assets',
    apply: 'build',
    async writeBundle(options, bundle) {
      const outDir = options.dir
      if (!outDir) return

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'asset') continue
        if (!IMAGE_EXT.test(fileName)) continue

        const filePath = path.join(outDir, fileName)
        let buf: Buffer
        try {
          buf = await readFile(filePath)
        } catch {
          continue
        }

        const ext = path.extname(fileName).toLowerCase()
        const originalSize = buf.length
        try {
          let pipeline = sharp(buf)
            .resize(MAX_WIDTH, null, { withoutEnlargement: true })

          if (ext === '.png') {
            buf = await pipeline.png({ compressionLevel: PNG_EFFORT }).toBuffer()
          } else {
            buf = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
          }

          // Only overwrite if we didn't increase size (avoids re-encoding small PNGs badly)
          if (buf.length <= originalSize) {
            await writeFile(filePath, buf)
          }
        } catch {
          // Skip if sharp fails (e.g. not an image)
        }
      }
    },
  }
}
