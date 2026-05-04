import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("demo_username")?.value || null;

  return NextResponse.json({
    loggedIn: Boolean(username),
    username,
  });
}