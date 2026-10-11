import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Instagram Graph API media URLs (lib/social.ts → getLatestInstagramPosts).
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        // Only our own stylesheets. Running Tailwind over node_modules turns
        // packages' CSS Modules (e.g. react-tweet) into plain CSS and drops
        // their class names, leaving those components unstyled.
        condition: { not: "foreign" },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
