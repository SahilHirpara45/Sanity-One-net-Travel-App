/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // swcMinify: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
};

export default nextConfig;
