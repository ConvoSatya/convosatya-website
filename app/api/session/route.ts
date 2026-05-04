import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.FAUST_BACKEND_URL;
const ADMIN_API_KEY = process.env.FAUST_ADMIN_API_KEY;

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("demo_username")?.value || null;

  if (!username) {
    return NextResponse.json({
      loggedIn: false,
      username: null,
      usage: null,
      debug: {
        reason: "no_demo_username_cookie",
      },
    });
  }

  if (!BACKEND_URL || !ADMIN_API_KEY) {
    return NextResponse.json({
      loggedIn: true,
      username,
      usage: null,
      debug: {
        reason: "missing_vercel_env",
        hasBackendUrl: Boolean(BACKEND_URL),
        hasAdminKey: Boolean(ADMIN_API_KEY),
      },
    });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/admin/accounts`, {
      method: "GET",
      headers: {
        "x-faust-admin-key": ADMIN_API_KEY,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        loggedIn: true,
        username,
        usage: null,
        debug: {
          reason: "backend_admin_accounts_failed",
          status: response.status,
          backendData: data,
        },
      });
    }

    const account = data?.accounts?.find(
      (item: { username: string }) => item.username === username
    );

    if (!account) {
      return NextResponse.json({
        loggedIn: true,
        username,
        usage: null,
        debug: {
          reason: "account_not_found_in_backend",
          accountsReturned: data?.accounts?.map((item: { username: string }) => item.username),
        },
      });
    }

    return NextResponse.json({
      loggedIn: true,
      username,
      usage: {
        messages_used: account.messages_used,
        messages_limit: account.messages_limit,
        verifier_credits_used: account.verifier_credits_used,
        verifier_credits_limit: account.verifier_credits_limit,
        url_checks_used: account.url_checks_used,
        url_checks_limit: account.url_checks_limit,
        contact_checks_used: account.contact_checks_used,
        contact_checks_limit: account.contact_checks_limit,
      },
      debug: {
        reason: "ok",
      },
    });
  } catch (error) {
    return NextResponse.json({
      loggedIn: true,
      username,
      usage: null,
      debug: {
        reason: "session_fetch_exception",
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
}