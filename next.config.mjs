/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // or 'https'
        hostname: "192.168.1.107",
        // hostname: "localhost",
        port: "2000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
