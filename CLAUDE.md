# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Sung Oh built with Next.js 14, TypeScript, Tailwind CSS, and Contentlayer2. The site features publications, projects, and author information with MDX support.

**Node.js Requirement:** This project requires Node.js 18.x due to contentlayer2's use of JSON import assertions.

## Development Commands

```bash
# Install dependencies (use pnpm)
pnpm install

# Start development server (automatically cleans cache before starting)
pnpm dev

# Build for production (automatically cleans cache before building)
pnpm build

# Serve production build locally
pnpm serve

# Lint and fix code
pnpm lint

# Clean all caches manually (contentlayer, next, node_modules)
pnpm run clean:contentlayer

# Analyze bundle size
pnpm run analyze
```

## Critical: Path Resolution & Contentlayer2

**Important:** This project has symlink handling built into its build scripts to work around contentlayer2 bugs.

- The physical path is `/ssd/Personal/sungohdev.com`
- A symlink exists at `/home/sungoh/Personal/sungohdev.com`
- All `pnpm dev` and `pnpm build` commands automatically resolve to the physical path
- Scripts in `/scripts/` handle this transparently:
  - `ensure-clean-start.sh` - Detects symlinks and cleans caches
  - `run-from-physical-path.sh` - Ensures commands run from physical path
  - `clean-cache.sh` - Removes `.contentlayer`, `.next`, and `node_modules/.cache`

**If contentlayer errors occur:** Run `pnpm run clean:contentlayer` to clean all caches.

## Architecture

### Content Management (Contentlayer2)

Content is managed via Contentlayer2 (`contentlayer.config.ts`) with three document types:

1. **Authors** (`data/authors/*.mdx`) - Author profiles with social links
2. **Publications** (`data/publications/*.mdx`) - Research publications with metadata
3. **Projects** (`data/projects/*.mdx`) - Project portfolio items

Contentlayer processes MDX files into typed objects accessible at build time. Configuration includes:

- Remark plugins: GFM, math, code titles, image transformation, GitHub alerts
- Rehype plugins: Syntax highlighting (Prism+), KaTeX math, auto-linked headings, citations

### Site Configuration

- `data/siteMetadata.js` - Site-wide settings (title, author, analytics, comments)
- `data/headerNavLinks.ts` - Navigation menu items
- `data/projectsData.ts` - Project card data (if not using MDX files)

### App Structure (Next.js App Router)

```
app/
├── layout.tsx          # Root layout with theme and metadata
├── Main.tsx            # Main wrapper component
├── page.tsx            # Home page
├── about/              # About page
├── publications/       # Publications listing
├── projects/           # Projects listing
└── api/                # API routes (if any)
```

### Components

- `components/` - Reusable React components (Header, Footer, Card, etc.)
- `layouts/` - Layout templates:
  - `AuthorLayout.tsx` - For author pages
  - `PublicationsLayout.tsx` - For publication lists
- `components/MDXComponents.tsx` - Custom components for MDX (Link, Image, etc.)

### Styling

- Tailwind CSS 3.0 with dark mode support
- `css/tailwind.css` - Main stylesheet
- `css/prism.css` - Code block styling (syntax highlighting)
- `tailwind.config.js` - Tailwind configuration

## Static Assets

- `public/static/` - Images, favicons, and other static assets
- `data/logo.svg` - Site logo

## Build & Deployment

### Production Build

```bash
pnpm build
```

This runs:

1. Cache cleanup via `prebuild` hook
2. Next.js build from physical path
3. Post-build script (`scripts/postbuild.mjs`)

### Static Export (for GitHub Pages, S3, etc.)

```bash
EXPORT=1 UNOPTIMIZED=1 pnpm build
```

For deployment with base path:

```bash
EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/myblog pnpm build
```

**Note:** Static exports cannot use server-side features. Comment out `headers()` in `next.config.js` and remove API routes.

### Deployment Platforms

- **Vercel**: Direct git integration (recommended)
- **GitHub Pages**: Uses `.github/workflows/pages.yml`
- **Netlify**: Supports Next.js runtime automatically

## Environment Variables

Create `.env` from `.env.example` and configure:

- `NEXT_UMAMI_ID` - Umami analytics website ID
- `NEXT_PUBLIC_GISCUS_REPO` - Giscus comments repository
- `NEXT_PUBLIC_GISCUS_REPOSITORY_ID` - Giscus repository ID
- `NEXT_PUBLIC_GISCUS_CATEGORY` - Giscus discussion category
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID` - Giscus category ID

## Content Security Policy

Modify `next.config.js` to add domains for external scripts/images:

- Currently allows: `giscus.app`, `analytics.umami.is`, `picsum.photos`
- Add new domains to `ContentSecurityPolicy` and `images.remotePatterns`

## Testing & Quality

- ESLint configuration in `.eslintrc.js`
- Prettier formatting with Tailwind plugin
- Husky pre-commit hooks run lint-staged (lint + format)
- Lints directories: `app`, `components`, `layouts`, `scripts`
