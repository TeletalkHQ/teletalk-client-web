import { evnLoader } from "./src/utils/envLoader";

evnLoader();

const env = Object.keys(process.env).reduce((prev, curr) => {
  if (curr.startsWith("NEXT_PUBLIC_")) prev[curr] = process.env[curr];

  return prev;
}, {});

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
        destination: "/initialSetup",
        permanent: true,
        source: item,
      })
    );
  },
};

export default nextConfig;
