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

    const backendResponse = await fetch(`${BACKEND_URL}/report/package`, {
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

    if (!backendResponse.ok) {
      let message = "Report package generation failed.";

      try {
        const errorData = await backendResponse.json();
        message = errorData?.detail || errorData?.message || message;
      } catch {
        // Keep default message.
      }

      return NextResponse.json(
        {
          ok: false,
          message,
        },
        { status: backendResponse.status }
      );
    }

    const contentDisposition =
      backendResponse.headers.get("content-disposition") ||
      'attachment; filename="faust_report_package.zip"';

    const contentType =
      backendResponse.headers.get("content-type") || "application/zip";

    return new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Report package generation failed.",
      },
      { status: 500 }
    );
  }
}