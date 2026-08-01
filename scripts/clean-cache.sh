#!/bin/bash
# Clean all cache directories for Next.js and Contentlayer
# This script handles symlinks and ensures proper cache cleanup

set -e  # Exit on error

FORCE=0
for arg in "$@"; do
  [ "$arg" = "--force" ] && FORCE=1
done

# Always resolve to the physical path to avoid contentlayer2 path bugs
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -P)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd -P)"
cd "$PROJECT_ROOT" || exit 1

# `next dev` serves live out of .next and .contentlayer. Deleting them from
# under a running dev server makes it 404 its own CSS chunks -- the page loses
# all styling and SVG icons balloon to full size -- and often kills it outright
# with "Cannot find module for page: /_document". Both predev and prebuild call
# this script, so an unguarded `rm -rf` here breaks any dev server left open.
if [ "$FORCE" -eq 0 ] && pgrep -f 'next-server|next dev' >/dev/null 2>&1; then
  echo "Dev server is running -- skipping cache cleanup so it keeps serving."
  echo "  Clean anyway:  stop the dev server, or 'pnpm clean:contentlayer -- --force'"
  echo "  Build safely:  pnpm build:isolated   (builds into .next-build)"
  exit 0
fi

echo "Cleaning caches in: $PROJECT_ROOT"

# Remove local cache directories (force removal, ignore errors)
rm -rf .contentlayer 2>/dev/null || true
rm -rf .next 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true

# Also clean pnpm store cache for contentlayer
rm -rf node_modules/.pnpm/.contentlayer 2>/dev/null || true
rm -rf node_modules/.pnpm/*contentlayer*/.contentlayer 2>/dev/null || true

# Remove TypeScript build cache
rm -rf tsconfig.tsbuildinfo 2>/dev/null || true

# Remove any contentlayer caches created with buggy paths
# This handles the /home/home bug in contentlayer2
if [ -d "/home/home" ]; then
    echo "Removing buggy /home/home caches..."
    find /home/home -type d -name '.contentlayer' 2>/dev/null -exec rm -rf {} + || true
fi

echo "Cache cleanup complete"

