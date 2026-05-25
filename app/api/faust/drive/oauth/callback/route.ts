import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.FAUST_BACKEND_URL;
const FRONTEND_SHARED_SECRET = process.env.FAUST_FRONTEND_SHARED_SECRET;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  try {
    if (!BACKEND_URL || !FRONTEND_SHARED_SECRET) {
      return NextResponse.redirect(
        new URL("/faust-demo?drive_error=backend_not_configured", SITE_URL)
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        new URL(`/faust-demo?drive_error=${encodeURIComponent(error)}`, SITE_URL)
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        new URL("/faust-demo?drive_error=missing_code_or_state", SITE_URL)
      );
    }

    const backendResponse = await fetch(`${BACKEND_URL}/drive/oauth/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-faust-frontend-secret": FRONTEND_SHARED_SECRET,
      },
      body: JSON.stringify({
        code,
        state,
      }),
    });

    if (!backendResponse.ok) {
      return NextResponse.redirect(
        new URL("/faust-demo?drive_error=callback_failed", SITE_URL)
      );
    }

    return NextResponse.redirect(new URL("/faust-demo?drive=connected", SITE_URL));
  } catch {
    return NextResponse.redirect(
      new URL("/faust-demo?drive_error=callback_exception", SITE_URL)
    );
  }
}