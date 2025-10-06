// apps/artboard/next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const clientDomain = process.env.CLIENT_DOMAIN?.replace(/\/$/, ""); // trim trailing slash if any

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors ${clientDomain || "'self'"};`,
          },
          // Clear or override any restrictive defaults
          { key: "X-Frame-Options", value: "ALLOWALL" },
        ],
      },
    ];
  },
  transpilePackages: ["@myorg/ui"],
};

export default nextConfig;
