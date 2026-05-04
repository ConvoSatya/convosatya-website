import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.FAUST_BACKEND_URL;
const FRONTEND_SHARED_SECRET = process.env.FAUST_FRONTEND_SHARED_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!BACKEND_URL || !FRONTEND_SHARED_SECRET) {
      return NextResponse.json(
        {
          ok: false,
          message: "Login service is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (!username || !password) {
      return NextResponse.json(
        {
          ok: false,
          message: "Username and password are required.",
        },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-faust-frontend-secret": FRONTEND_SHARED_SECRET,
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const backendData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          message:
            backendData?.detail ||
            backendData?.message ||
            "Invalid username or password.",
        },
        { status: backendResponse.status }
      );
    }

    const response = NextResponse.json({
      ok: true,
      username,
      account: backendData.account,
    });

    response.cookies.set("demo_username", username, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 6,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.",
      },
      { status: 500 }
    );
  }
}