/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname:'/icons/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname:'/avatars/**'
      },


    ]
  }
}

module.exports = nextConfig
