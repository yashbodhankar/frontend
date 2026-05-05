import { NextResponse, type NextRequest } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/auth";

function isAuthed(req: NextRequest) {
  return req.cookies.get(AUTH_COOKIE_NAME)?.value === "1";
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const authed = isAuthed(req);

  if (pathname.startsWith("/app")) {
    if (authed) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" || pathname === "/signup") {
    if (!authed) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = "/app/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login", "/signup"],
};
