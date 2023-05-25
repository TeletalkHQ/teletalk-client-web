require("dotenv").config({
  path: "./configs/env/global.env",
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

module.exports = nextConfig;
