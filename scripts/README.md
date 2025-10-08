# Build Scripts

This directory contains scripts that ensure smooth operation of Next.js and Contentlayer regardless of path configurations (symlinks, bind mounts, etc.).

## Scripts

### `clean-cache.sh`

Cleans all cache directories for Next.js and Contentlayer. This script:

- Resolves to the physical path to avoid contentlayer2 bugs
- Removes `.contentlayer`, `.next`, and `node_modules/.cache`
- Cleans up buggy contentlayer2 cache paths (the `/home/home` bug)
- Works correctly whether called from symlinked or physical paths

**Usage:**

```bash
bash ./scripts/clean-cache.sh
```

This script is automatically run by:

- `pnpm dev` (via `predev` hook)
- `pnpm build` (via `prebuild` hook)

### `ensure-clean-start.sh`

Ensures a completely clean start by:

- Detecting if the project is accessed via a symlink
- Resolving to the physical path to avoid contentlayer2 bugs
- Running the cache cleanup
- Setting up environment for subsequent commands

**Usage:**

```bash
bash ./scripts/ensure-clean-start.sh
```

### `run-from-physical-path.sh`

A wrapper script that ensures commands always run from the physical directory path. This prevents contentlayer2 from creating buggy cache paths when the project is accessed via symlinks.

**Usage:**

```bash
bash ./scripts/run-from-physical-path.sh <command> [args...]
```

**Example:**

```bash
bash ./scripts/run-from-physical-path.sh next build
```

## Path Resolution Strategy

The project uses a multi-layered approach to handle path issues:

1. **Symlink Detection**: Scripts detect whether you're accessing the project via a symlink
2. **Physical Path Resolution**: All operations are performed from the physical path (e.g., `/ssd/Personal/sungohdev.com`)
3. **Transparent to User**: You can run `pnpm dev` or `pnpm build` from any path - symlinked or physical

### How It Works

- **Symlinked path**: `/home/sungoh/Personal/sungohdev.com` → symlink to `/ssd/Personal`
- **Physical path**: `/ssd/Personal/sungohdev.com` → actual location
- **Scripts ensure**: All operations run from `/ssd/Personal/sungohdev.com` regardless of where you invoke them

### Why This Matters

contentlayer2 has a bug where it can create paths like `/home/home/sungoh/...` when accessed via certain symlink configurations. By always resolving to and operating from the physical path, we avoid this bug entirely.

## Configuration Changes

### package.json

- `dev` and `build` scripts use `run-from-physical-path.sh` wrapper
- `predev` and `prebuild` hooks run `ensure-clean-start.sh`
- Works correctly from any path (symlinked or physical)

### contentlayer.config.ts

- Uses `process.cwd()` directly
- Relies on scripts to ensure correct working directory

## Troubleshooting

If you encounter contentlayer errors:

1. **Clean everything:**

   ```bash
   pnpm run clean:contentlayer
   ```

2. **If still broken, manually remove caches:**

   ```bash
   rm -rf .contentlayer .next node_modules/.cache
   find /home -name '.contentlayer' -type d 2>/dev/null
   ```

3. **Restart dev server:**
   ```bash
   pnpm dev
   ```

## Why These Changes?

Contentlayer2 has issues with:

- Path resolution when symlinks are involved
- Creating cache directories with duplicated path components (`/home/home/...`)
- Using different paths across the same project

These scripts ensure consistent, reliable builds regardless of how you access your project directory.
