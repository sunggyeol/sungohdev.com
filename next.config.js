const { withContentlayer } = require("next-contentlayer2");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const output = process.env.EXPORT ? "export" : undefined;
const basePath = process.env.BASE_PATH || undefined;
const unoptimized = process.env.UNOPTIMIZED ? true : undefined;

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer];
  return plugins.reduce((acc, next) => next(acc), {
    output,
    basePath,
    reactStrictMode: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    eslint: {
      dirs: ["app", "components", "layouts", "scripts"],
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "picsum.photos",
        },
      ],
      // WebP only, deliberately. AVIF is ~20% smaller here but takes ~3s to
      // encode a 1200px render vs ~0.2s for WebP (measured with sharp), and
      // that cost lands on the first visitor to miss the cache for a given
      // width — i.e. straight onto LCP. Not worth it at this traffic level.
      formats: ["image/webp"],
      // Nothing on this site renders wider than ~608 CSS px, so 3840 only ever
      // showed up when a component forgot `sizes` — dropping it caps the damage.
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      // 224/336/448 line up with the avatar at 1x/2x/3x; 544/608 with the
      // project cards, so the browser gets an exact match instead of rounding up.
      imageSizes: [16, 32, 48, 64, 96, 128, 224, 256, 336, 384, 448, 544, 608],
      // Optimized renders are content-addressed by (src, w, q); a year-long
      // floor keeps the optimizer from re-encoding on every deploy.
      minimumCacheTTL: 31536000,
      unoptimized,
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: securityHeaders,
        },
        {
          // Raw originals under /static/images are hit directly by crawlers, OG
          // scrapers and static exports. They are stable but not fingerprinted,
          // so cache hard for a day and serve stale while revalidating.
          source: "/static/images/:path*",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=86400, stale-while-revalidate=604800",
            },
          ],
        },
      ];
    },
    // The About page was merged into the landing page. Server-side only —
    // this is a no-op under `EXPORT=1` static export.
    async redirects() {
      return [
        {
          source: "/about",
          destination: "/",
          permanent: true,
        },
      ];
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
  });
};
