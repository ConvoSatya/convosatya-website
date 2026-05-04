import { NextRequest, NextResponse } from "next/server";

const ADMIN_DASHBOARD_PASSWORD = process.env.ADMIN_DASHBOARD_PASSWORD;

export async function POST(request: NextRequest) {
  try {
    if (!ADMIN_DASHBOARD_PASSWORD) {
      return NextResponse.json(
        {
          ok: false,
          message: "Admin dashboard password is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const password = String(body.password || "");

    if (!password) {
      return NextResponse.json(
        {
          ok: false,
          message: "Password is required.",
        },
        { status: 400 }
      );
    }

    if (password !== ADMIN_DASHBOARD_PASSWORD) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid admin password.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      ok: true,
    });

    response.cookies.set("admin_session", "active", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 6,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Admin login failed.",
      },
      { status: 500 }
    );
  }
}