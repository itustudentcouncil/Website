import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.studentcouncil.dk',
      },
    ],
  },
};

export default nextConfig;