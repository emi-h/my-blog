/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.microcms-assets.io", "scontent.cdninstagram.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
