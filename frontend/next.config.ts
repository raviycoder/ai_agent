import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  onDemandEntries: {
    // Reduce the time webpack keeps pages in memory
    maxInactiveAge: 15 * 1000,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'eval-source-map'
      // Reduce logging
      config.infrastructureLogging = {
        level: 'error'
      }
    }
    return config
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // Replace with your backend URL
      },
    ];
  },
};

export default nextConfig;
