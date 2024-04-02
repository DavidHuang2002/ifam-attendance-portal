import { createRSVP } from "@/service/back-end/rsvp";

export async function POST(request) {
  const newRsvp = await request.json();
  try {
    const { email, eventId } = newRsvp;
    const createdRSVP = await createRSVP(email, eventId);
    return Response.json(createdRSVP);
  } catch (e) {
    console.error(e);
    return Response.error({ error: e }, { status: 500 });
  }
}
