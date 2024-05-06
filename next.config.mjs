/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.vgy.me',
        port: '',
        pathname: '/*'
      },
      
    ]
  }
};

export default nextConfig;
