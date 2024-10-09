/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: "next",
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: "http", // or 'https'
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
        port: "2000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
