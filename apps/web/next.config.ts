import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.STANDALONE === "true" ? "standalone" : undefined,
  reactStrictMode: true,
  transpilePackages: ["@awt/shared", "@awt/db", "@awt/ingest", "@awt/dedupe", "@awt/ai", "@awt/search"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        "node:crypto": false,
      };
    }
    return config;
  },
};

export default nextConfig;
