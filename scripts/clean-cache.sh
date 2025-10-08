#!/bin/bash
# Clean all cache directories for Next.js and Contentlayer

# Get the real path (resolve symlinks) and cd to it
REAL_PATH=$(cd "$(dirname "$0")/.." && pwd -P)
cd "$REAL_PATH" || exit 1

# Remove local cache directories
rm -rf .contentlayer .next node_modules/.cache

# Remove any contentlayer caches created with buggy paths (anywhere under /home/home)
find /home/home -type d -name '.contentlayer' 2>/dev/null -exec rm -rf {} + || true

# Small delay to ensure filesystem sync
sleep 0.1

