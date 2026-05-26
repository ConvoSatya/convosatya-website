import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const demoUsername = request.cookies.get("demo_username")?.value;
  const adminSession = request.cookies.get("admin_session")?.value;

  // Demo user is already logged in: prevent revisiting login page.
  if (pathname === "/login" && demoUsername) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect FAUST demo pages.
  if (pathname.startsWith("/faust-demo")) {
    if (!demoUsername) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Admin is already logged in: prevent revisiting admin login page.
  if (pathname === "/admin/login" && adminSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Protect admin pages.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    if (!adminSession) {
      const adminLoginUrl = new URL("/admin/login", request.url);
      adminLoginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(adminLoginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/faust-demo/:path*", "/admin", "/admin/:path*"],
};