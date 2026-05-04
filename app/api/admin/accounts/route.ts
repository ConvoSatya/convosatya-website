import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.FAUST_BACKEND_URL;
const ADMIN_API_KEY = process.env.FAUST_ADMIN_API_KEY;

async function requireAdminSession() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;

  if (!adminSession) {
    return false;
  }

  return true;
}

export async function GET() {
  try {
    const isAdmin = await requireAdminSession();

    if (!isAdmin) {
      return NextResponse.json(
        {
          ok: false,
          message: "Not authenticated as admin.",
        },
        { status: 401 }
      );
    }

    if (!BACKEND_URL || !ADMIN_API_KEY) {
      return NextResponse.json(
        {
          ok: false,
          message: "Admin backend is not configured.",
        },
        { status: 500 }
      );
    }

    const backendResponse = await fetch(`${BACKEND_URL}/admin/accounts`, {
      method: "GET",
      headers: {
        "x-faust-admin-key": ADMIN_API_KEY,
      },
      cache: "no-store",
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch admin accounts.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await requireAdminSession();

    if (!isAdmin) {
      return NextResponse.json(
        {
          ok: false,
          message: "Not authenticated as admin.",
        },
        { status: 401 }
      );
    }

    if (!BACKEND_URL || !ADMIN_API_KEY) {
      return NextResponse.json(
        {
          ok: false,
          message: "Admin backend is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const backendResponse = await fetch(`${BACKEND_URL}/admin/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-faust-admin-key": ADMIN_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create admin account.",
      },
      { status: 500 }
    );
  }
}