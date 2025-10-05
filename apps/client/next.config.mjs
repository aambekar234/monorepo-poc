/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@myorg/ui"],
  async headers() {
    // Allow this app to embed the artboard (and vice-versa if needed)
    return [
      {
        source: "/:path*",
        headers: [
          // Client itself can be framed by itself (for local tests); adjust for prod as needed
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
