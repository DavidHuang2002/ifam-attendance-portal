// GET Handler for Events

// This script defines an asynchronous function intended to handle GET requests for events in a serverless API or backend service.
// It utilizes a custom service function `getAllEvents` to fetch all events from the database or external source.

import { getAllEvents, getUpComingEvents } from "@/service/back-end/event"; // Importing the `getAllEvents` function from a custom backend service module.

export async function GET(req) {
  try {
    // get search parameters
    const { searchParams } = new URL(req.url);
    const upcomingParam = searchParams.get("upcoming"); // Extracting the "upcoming" search parameter from the request URL.

    let events;
    if (upcomingParam) {
      // If the "upcoming" parameter is present, attempt to fetch only upcoming events.
      events = await getUpComingEvents(); // Fetching upcoming events using a custom service function.
    } else {
      events = await getAllEvents(); // Attempting to fetch all events using the imported service function.
    }

    return Response.json(events); // Returning the fetched events as a JSON response if successful.
  } catch (e) {
    console.error("Failed to fetch events:", e);
    return Response.error({ error: e }, { status: 500 }); // Returning an error response with a 500 status code if an error occurs.
  }
}
