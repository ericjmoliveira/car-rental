/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.gcs.ehi.com',
        port: '',
        pathname: '/content/**'
      },
      {
        protocol: 'https',
        hostname: 'www.enterprise.com',
        port: '',
        pathname: '/en/**'
      }
    ]
  }
};

module.exports = nextConfig;
