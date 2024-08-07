/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http', // or 'https'
            hostname: 'localhost',
            port: '2000',
            pathname: '/uploads/**',
          },
        ],
      },
};

export default nextConfig;
