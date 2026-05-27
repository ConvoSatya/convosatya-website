import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.FAUST_BACKEND_URL ||
  process.env.NEXT_PUBLIC_FAUST_BACKEND_URL ||
  "";

const FRONTEND_SECRET = process.env.FAUST_FRONTEND_SHARED_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    const demoUsername = request.cookies.get("demo_username")?.value;

    if (!demoUsername) {
      return NextResponse.json(
        { detail: "Demo login required." },
        { status: 401 }
      );
    }

    if (!BACKEND_URL) {
      return NextResponse.json(
        { detail: "Missing FAUST_BACKEND_URL." },
        { status: 500 }
      );
    }

    if (!FRONTEND_SECRET) {
      return NextResponse.json(
        { detail: "Missing FAUST_FRONTEND_SHARED_SECRET." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/drive/media/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-faust-frontend-secret": FRONTEND_SECRET,
      },
      cache: "no-store",
      body: JSON.stringify({
        demo_user_id: demoUsername,
        drive_file_ids: body.drive_file_ids || [],
      }),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        detail:
          error instanceof Error
            ? error.message
            : "Encrypted media delete failed.",
      },
      { status: 500 }
    );
  }
}