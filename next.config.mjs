import dotenv from "dotenv";

dotenv.config({
  path: "./configs/env/base.env",
  override: true,
});
dotenv.config({
  path: `./configs/env/${process.env.NODE_ENV}.env`,
  override: true,
});

const env = Object.keys(process.env).reduce((prev, curr) => {
  if (curr.startsWith("NEXT_PUBLIC_")) prev[curr] = process.env[curr];

  return prev;
}, {});

/** @type {import('next').NextConfig} */
const nextConfig = {
  env,
  experimental: {
    appDir: false,
  },
};

export default nextConfig;
