import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack - use stable webpack bundler for production
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
