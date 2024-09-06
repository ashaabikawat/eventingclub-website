/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // or 'https'
        hostname: "192.168.1.130",
        port: "2000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
