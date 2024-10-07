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
        // hostname: "192.168.1.107",
        // hostname: "13.233.237.119",
        hostname: "localhost",
        port: "2000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
