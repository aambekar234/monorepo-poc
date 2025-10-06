// apps/artboard/middleware.js
import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  process.env.CLIENT_DOMAIN?.replace(/\/$/, ""), // e.g. https://monorepo-poc-client.vercel.app (no trailing slash)
  "http://localhost:3000", // local dev
].filter(Boolean);

function originOf(value) {
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

export function middleware(req) {
  const { pathname } = new URL(req.url);

  // allow Next internals & common static without checks
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  const referer = req.headers.get("referer") || "";
  const origin = req.headers.get("origin") || "";

  const refOrigin = originOf(referer); // e.g. https://monorepo-poc-client.vercel.app
  const reqOrigin = originOf(origin);

  // allow if Referer OR Origin matches exactly
  if (
    ALLOWED_ORIGINS.includes(refOrigin) ||
    ALLOWED_ORIGINS.includes(reqOrigin)
  ) {
    return NextResponse.next();
  }

  // be a bit lenient: if the referer starts with allowed + "/" (has a path), allow
  if (referer && ALLOWED_ORIGINS.some((o) => referer.startsWith(o + "/"))) {
    return NextResponse.next();
  }

  return new NextResponse("Forbidden", { status: 403 });
}

export const config = { matcher: ["/:path*"] };
