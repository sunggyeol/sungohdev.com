#!/bin/bash
# Wrapper script to ensure commands run from the physical path
# This prevents contentlayer2 path bugs when project is accessed via symlinks

set -e

# Get the physical path
PHYSICAL_DIR="$(cd "$(dirname "$0")/.." && pwd -P)"

# Change to physical directory
cd "$PHYSICAL_DIR"

# Suppress Node.js deprecation warnings (e.g. punycode DEP0040)
export NODE_NO_WARNINGS=1

# Suppress npm warnings from contentlayer2's internal npm calls
# (pnpm env vars like auto-install-peers are not recognized by npm)
export npm_config_loglevel=error

# Run the command passed as arguments
exec "$@"

