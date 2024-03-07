// GET Handler for Events

// This script defines an asynchronous function intended to handle GET requests for events in a serverless API or backend service.
// It utilizes a custom service function `getAllEvents` to fetch all events from the database or external source.

import { getAllEvents } from "@/service/back-end/event"; // Importing the `getAllEvents` function from a custom backend service module.

export async function GET() {
  try {
    const events = await getAllEvents(); // Attempting to fetch all events using the imported service function.
    return Response.json(events); // Returning the fetched events as a JSON response if successful.
  } catch (e) {
    return Response.error({ error: e }); // Catching and returning any errors encountered during the fetch operation.
  }
}
