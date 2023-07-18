import dotenv from "dotenv";

["./configs/env/base.env", `./configs/env/${process.env.NODE_ENV}.env`].forEach(
  (path) => {
    dotenv.config({
      path,
      override: true,
    });
  }
);

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
    return ["/", "/auth", "/create", "/messenger", "/signIn", "/verify"].map(
      (item) => ({
        source: item,
        destination: initialSetupRoute,
        permanent: true,
      })
    );
  },
};

export default nextConfig;
