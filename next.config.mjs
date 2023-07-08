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

const initialSetupRoute = "/initialSetup";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "flagcdn.com",
      },
    ],
  },
  env,
  experimental: {
    appDir: false,
  },

  async redirects() {
    return [
      { source: "/", destination: initialSetupRoute, permanent: true },
      {
        source: "/auth",
        destination: initialSetupRoute,
        permanent: true,
      },
      { source: "/create", destination: initialSetupRoute, permanent: true },
      { source: "/messenger", destination: initialSetupRoute, permanent: true },
      { source: "/signIn", destination: initialSetupRoute, permanent: true },
      { source: "/verify", destination: initialSetupRoute, permanent: true },
    ];
  },
};

export default nextConfig;
