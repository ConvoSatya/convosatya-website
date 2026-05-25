import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.FAUST_BACKEND_URL;
const FRONTEND_SHARED_SECRET = process.env.FAUST_FRONTEND_SHARED_SECRET;

export async function GET() {
  try {
    if (!BACKEND_URL || !FRONTEND_SHARED_SECRET) {
      return NextResponse.redirect(
        new URL("/faust-demo?drive_error=backend_not_configured", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
      );
    }

    const cookieStore = await cookies();
    const username = cookieStore.get("demo_username")?.value;

    if (!username) {
      return NextResponse.redirect(
        new URL("/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
      );
    }

    const backendResponse = await fetch(`${BACKEND_URL}/drive/oauth/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-faust-frontend-secret": FRONTEND_SHARED_SECRET,
      },
      body: JSON.stringify({
        demo_user_id: username,
      }),
    });

    const backendData = await backendResponse.json();

    if (!backendResponse.ok || !backendData.authorization_url) {
      return NextResponse.redirect(
        new URL("/faust-demo?drive_error=start_failed", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
      );
    }

    return NextResponse.redirect(backendData.authorization_url);
  } catch {
    return NextResponse.redirect(
      new URL("/faust-demo?drive_error=start_exception", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
    );
  }
}