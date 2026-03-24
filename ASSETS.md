# Asset size & page download (target &lt; 5 MB)

## What we do in the build

- **Images** (in `src/assets`): Compressed and resized at build time (max width 1600px, JPEG quality 82) via the Vite plugin. No extra step needed.
- **Hero video**: Not compressed by the build. You must optimize it once so total page size stays under 5 MB.

## One-time: optimize hero video

The hero video in `public/hero-video.mp4` is the largest asset. To get the full page under 5 MB:

1. Install [ffmpeg](https://ffmpeg.org/) if needed.
2. Run:
   ```bash
   npm run optimize-video
   ```
   This backs up the original to `public/hero-video-original.mp4`, then replaces `public/hero-video.mp4` with a web-optimized version (~720p, ~1.5 Mbps, no audio). Typical result: ~40 MB → ~2–3 MB.
3. Rebuild and deploy. Optionally remove `public/hero-video-original.mp4` after checking the new video.

## After optimization

- **Images**: Build output is already compressed.
- **Video**: One optimized file in `public/`.
- **Total**: Aim for &lt; 5 MB (HTML + JS + CSS + images + video).
