import { evnLoader } from "./configs/env/envLoader.js";

evnLoader();

const env = Object.keys(process.env).reduce((prev, curr) => {
  if (curr.startsWith("NEXT_PUBLIC_")) prev[curr] = process.env[curr];

  return prev;
}, {});

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "flagcdn.com",
      },
    ],
  },
  env,
  async redirects() {
    return ["/", "/create", "/signIn", "/verify"].map((item) => ({
      destination: "/messenger",
      permanent: false,
      source: item,
    }));
  },
};

export default nextConfig;
