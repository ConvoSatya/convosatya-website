import { NextRequest, NextResponse } from "next/server";
import { validateDemoCredential } from "@/lib/demoAuth";

export async function POST(request: NextRequest) {
  try {
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

    const isValid = validateDemoCredential(username, password);

    if (!isValid) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid username or password.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      username,
    });

    response.cookies.set("demo_username", username, {
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
        message: "Login failed.",
      },
      { status: 500 }
    );
  }
}