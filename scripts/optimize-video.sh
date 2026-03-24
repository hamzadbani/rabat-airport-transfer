#!/usr/bin/env bash
# Compress public/hero-video.mp4 for web (target ~2–3 MB) to keep total page under 5 MB.
# Requires: ffmpeg
# Run from repo root: ./scripts/optimize-video.sh

set -e
VIDEO="public/hero-video.mp4"
BACKUP="public/hero-video-original.mp4"
TMP="public/hero-video-tmp.mp4"

if [[ ! -f "$VIDEO" ]]; then
  echo "Not found: $VIDEO"
  exit 1
fi

SIZE_MB=$(du -m "$VIDEO" | cut -f1)
if [[ "$SIZE_MB" -lt 5 ]]; then
  echo "Video already under 5 MB ($SIZE_MB MB). Optional: run anyway to re-encode."
fi

echo "Backing up to $BACKUP ..."
cp "$VIDEO" "$BACKUP"

echo "Creating web-optimized version (720p, ~1.5 Mbps) ..."
ffmpeg -y -i "$BACKUP" \
  -vf "scale=min(1280\,iw):min(720\,ih):force_original_aspect_ratio=decrease" \
  -c:v libx264 -preset slow -crf 28 -maxrate 1.5M -bufsize 3M \
  -movflags +faststart \
  -an \
  "$TMP"

mv "$TMP" "$VIDEO"
NEW_MB=$(du -m "$VIDEO" | cut -f1)
echo "Done. New size: ${NEW_MB} MB (was ${SIZE_MB} MB). Original kept at $BACKUP"
