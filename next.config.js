/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.microcms-assets.io"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
