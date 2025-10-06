/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // IMPORTANT: this must be defined in the Artboard project’s env on Vercel
    const client = process.env.CLIENT_DOMAIN?.replace(/\/$/, ""); // e.g. https://monorepo-poc-client.vercel.app
    if (!client) {
      // fallback that's safest for direct access, but will block embedding until env is set
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "Content-Security-Policy",
              value: "frame-ancestors 'self';",
            },
          ],
        },
      ];
    }

    return [
      {
        source: "/:path*",
        headers: [
          // Only allow the client origin to embed Artboard
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors ${client};`,
          },
          // DO NOT set X-Frame-Options at all (browsers prefer it over CSP).
        ],
      },
    ];
  },
  transpilePackages: ["@myorg/ui"],
};
export default nextConfig;
