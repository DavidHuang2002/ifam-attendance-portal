import { getAllEvents } from "@/service/back-end/event";

export async function GET(request) {
  try {
    const events = await getAllEvents();
    return Response.json(events);
  } catch (e) {
    return Response.error({ error: e });
  }
}
