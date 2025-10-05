/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@myorg/ui"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // IMPORTANT: allow the Client to embed Artboard in an iframe during dev
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' http://localhost:3000;",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
