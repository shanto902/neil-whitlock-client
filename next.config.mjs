import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "unsplash.com",
        protocol: "https",
      },
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
