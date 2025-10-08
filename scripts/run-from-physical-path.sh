#!/bin/bash
# Wrapper script to ensure commands run from the physical path
# This prevents contentlayer2 path bugs when project is accessed via symlinks

set -e

# Get the physical path
PHYSICAL_DIR="$(cd "$(dirname "$0")/.." && pwd -P)"

# Change to physical directory
cd "$PHYSICAL_DIR"

# Run the command passed as arguments
exec "$@"

