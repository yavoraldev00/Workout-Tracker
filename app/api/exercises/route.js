import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:4000/exercises")

  return res.json();
}