import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.FAUST_BACKEND_URL;
const FRONTEND_SHARED_SECRET = process.env.FAUST_FRONTEND_SHARED_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!BACKEND_URL || !FRONTEND_SHARED_SECRET) {
      return NextResponse.json(
        {
          ok: false,
          message: "FAUST backend is not configured.",
        },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const username = cookieStore.get("demo_username")?.value;

    if (!username) {
      return NextResponse.json(
        {
          ok: false,
          message: "Not authenticated.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const backendResponse = await fetch(`${BACKEND_URL}/media/analyze-turn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-faust-frontend-secret": FRONTEND_SHARED_SECRET,
      },
      body: JSON.stringify({
        ...body,
        demo_user_id: username,
      }),
    });

    const contentType = backendResponse.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await backendResponse.text();

      return NextResponse.json(
        {
          ok: false,
          message: "Backend returned non-JSON response.",
          status: backendResponse.status,
          preview: text.slice(0, 500),
        },
        { status: backendResponse.status || 502 }
      );
    }

    const backendData = await backendResponse.json();

    return NextResponse.json(backendData, {
      status: backendResponse.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Media analysis request failed.",
      },
      { status: 500 }
    );
  }
}