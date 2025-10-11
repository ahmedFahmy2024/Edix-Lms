import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "edix-lms.t3.storage.dev",
        port: "",
      },
    ],
  },
};

export default nextConfig;
