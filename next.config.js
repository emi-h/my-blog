/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.microcms-assets.io", "scontent.cdninstagram.com"],
    unoptimized: true, //instagramの画像が表示されなくなるため
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
