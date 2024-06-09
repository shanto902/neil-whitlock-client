/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "unsplash.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
