/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  distDir: './dist',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'pokeapi.co' },
    ],
  },
};
export default nextConfig;
