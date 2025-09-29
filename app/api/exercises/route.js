import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.jsonsilo.com/public/822f6e17-a05f-4945-bac0-9a57fafdd254")

  const data = await res.json();

  // return data.exercises;

  return NextResponse.json(data.exercises)
}