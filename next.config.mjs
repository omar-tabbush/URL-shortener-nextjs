/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL ?? "",
    BASE_URL: process.env.BASE_URL ?? "",
    REDIRECT_URL: process.env.REDIRECT_URL ?? "",
  },
};

export default nextConfig;
