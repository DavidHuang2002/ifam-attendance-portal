import { NextResponse } from "next/server";
import { createRSVP } from "@/service/back-end/rsvp";

export async function POST(request) {
  const newRsvp = await request.json();
  try {
    const { email, eventId } = newRsvp;
    const createdRSVP = await createRSVP(email, eventId);
    return NextResponse.json(createdRSVP);
  } catch (e) {
    console.error(e);
    return NextResponse.error({ error: e }, { status: 500 });
  }
}
