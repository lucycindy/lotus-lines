import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "www.notion.so", pathname: "/**" },
      { protocol: "https", hostname: "notion.so", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
