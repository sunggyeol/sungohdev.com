#!/bin/bash
# Clean all cache directories for Next.js and Contentlayer
# This script handles symlinks and ensures proper cache cleanup

set -e  # Exit on error

# Always resolve to the physical path to avoid contentlayer2 path bugs
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -P)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd -P)"
cd "$PROJECT_ROOT" || exit 1

echo "Cleaning caches in: $PROJECT_ROOT"

# Remove local cache directories
rm -rf .contentlayer .next node_modules/.cache

# Also clean pnpm store cache for contentlayer
rm -rf node_modules/.pnpm/.contentlayer 2>/dev/null || true
rm -rf node_modules/.pnpm/*contentlayer*/.contentlayer 2>/dev/null || true

# Remove any contentlayer caches created with buggy paths
# This handles the /home/home bug in contentlayer2
if [ -d "/home/home" ]; then
    echo "Removing buggy /home/home caches..."
    find /home/home -type d -name '.contentlayer' 2>/dev/null -exec rm -rf {} + || true
fi

echo "Cache cleanup complete"

