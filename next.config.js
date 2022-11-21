/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.microcms-assets.io",
      "scontent.cdninstagram.com",
      "%3A%2F%2Fscontent.cdninstagram.com",
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
