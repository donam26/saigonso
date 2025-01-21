/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['saigonso.vn'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'saigonso.vn',
        port: '',
        pathname: '/storage/**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  env: {
    API_URL: process.env.API_URL,
    API_STORAGE_URL: process.env.API_STORAGE_URL,
  },
}

module.exports = nextConfig 