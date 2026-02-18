import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  // Pin project root so Vercel/build uses this directory (fixes 404 when multiple lockfiles exist)
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;