// GET Handler for Events

// This script defines an asynchronous function intended to handle GET requests for events in a serverless API or backend service.
// It utilizes a custom service function `getAllEvents` to fetch all events from the database or external source.

import { getAllEvents, getUpComingEvents } from "@/service/back-end/event"; // Importing the `getAllEvents` function from a custom backend service module.
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const events = await getUpComingEvents(); // Fetching upcoming events using a custom service function.

    return NextResponse.json(events); // Returning the fetched events as a JSON response if successful.
  } catch (e) {
    console.error("Failed to fetch events:", e);
    return NextResponse.error({ error: e }, { status: 500 }); // Returning an error response with a 500 status code if an error occurs.
  }
}
