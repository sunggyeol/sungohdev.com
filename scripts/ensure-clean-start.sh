#!/bin/bash
# Ensure a clean start for Next.js dev or build
# This script ensures contentlayer paths are correct by using physical paths

set -e

# Get both the current path and physical path
CURRENT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PHYSICAL_DIR="$(cd "$(dirname "$0")/.." && pwd -P)"

# Always work from the physical directory to avoid contentlayer2 path bugs
cd "$PHYSICAL_DIR"

# Run the clean script
bash "$PHYSICAL_DIR/scripts/clean-cache.sh"

# If we were called from a symlinked path, change the shell's directory
# This ensures subsequent commands run in the physical path
if [ "$CURRENT_DIR" != "$PHYSICAL_DIR" ]; then
    echo "Detected symlink: $CURRENT_DIR -> $PHYSICAL_DIR"
    echo "Switching to physical path to avoid contentlayer bugs"
fi

echo "Working in: $PHYSICAL_DIR"

# Change the calling shell's directory by outputting a cd command
# Note: This only works if the script is sourced, not executed
# For npm/pnpm scripts, we'll ensure the directory is correct before running next
export PROJECT_PHYSICAL_PATH="$PHYSICAL_DIR"
