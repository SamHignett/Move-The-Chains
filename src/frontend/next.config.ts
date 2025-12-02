import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    staticGenerationRetryCount: 0
  }
};

export default nextConfig;
