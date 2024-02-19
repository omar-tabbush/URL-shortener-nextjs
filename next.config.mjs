/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL ?? "",
    BASE_URL: process.env.BASE_URL ?? "",
  },
};

export default nextConfig;
