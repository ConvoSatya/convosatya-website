import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.FAUST_BACKEND_URL;
const ADMIN_API_KEY = process.env.FAUST_ADMIN_API_KEY;

async function requireAdminSession() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;

  return Boolean(adminSession);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
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

    const { username } = await context.params;
    const body = await request.json();

    const backendResponse = await fetch(
      `${BACKEND_URL}/admin/accounts/${encodeURIComponent(username)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-faust-admin-key": ADMIN_API_KEY,
        },
        body: JSON.stringify(body),
      }
    );

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
            : "Failed to update account.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
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

    const { username } = await context.params;

    const backendResponse = await fetch(
      `${BACKEND_URL}/admin/accounts/${encodeURIComponent(username)}`,
      {
        method: "DELETE",
        headers: {
          "x-faust-admin-key": ADMIN_API_KEY,
        },
      }
    );

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
            : "Failed to delete account.",
      },
      { status: 500 }
    );
  }
}