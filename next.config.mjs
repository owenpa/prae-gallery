/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '5kmtern92qaytzzu.public.blob.vercel-storage.com',
        port: '',
        pathname: '/*'
      }
    ]
  }
};

export default nextConfig;
