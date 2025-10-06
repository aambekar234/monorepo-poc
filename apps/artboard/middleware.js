export function middleware(req) {
  const allowedReferer = process.env.CLIENT_DOMAIN; // e.g. https://client-yourapp.vercel.app
  const referer = req.headers.get("referer") || "";
  const origin = req.headers.get("origin") || "";
  const candidate = referer || origin;

  // Allow internal Next.js assets and system files
  const url = new URL(req.url);
  const allowStatic =
    url.pathname.startsWith("/_next") ||
    url.pathname === "/favicon.ico" ||
    url.pathname === "/robots.txt";

  if (allowStatic) return;

  // Only allow requests that come from your client domain

  try {
    const host = new URL(candidate).origin;
    if (host === allowedReferer) {
      return; // OK
    }
  } catch (_) {
    // bad/missing header → block
  }

  return new Response("Forbidden", { status: 403 });
}

export const config = { matcher: ["/:path*"] };
