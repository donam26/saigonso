/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_API_PROTOCOL || 'http',
        hostname: process.env.NEXT_PUBLIC_API_HOST || '127.0.0.1',
        port: process.env.NEXT_PUBLIC_API_PORT || '8000',
        pathname: '/storage/**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig 