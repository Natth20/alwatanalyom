import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.STANDALONE === "true" ? "standalone" : undefined,
  reactStrictMode: true,
  transpilePackages: ["@awt/shared", "@awt/db", "@awt/ingest", "@awt/dedupe", "@awt/ai"],
};

export default nextConfig;

