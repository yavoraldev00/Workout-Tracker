import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await req.json();

  const cookieStore = await cookies();

  cookieStore.set("access_token", session.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  cookieStore.set("refresh_token", session.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({ ok: true });
}