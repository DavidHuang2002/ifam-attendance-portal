// Firebase imports for accessing Firestore and Storage functionalities.
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

// Import your Firebase project's configuration for database and storage.
import { db, storage } from "@/firebase/config";

// Moment.js is used for date manipulation and formatting.
import moment from "moment";

import { getEventAttendanceNumber } from "./attendance";
import { getParticipantByEventId } from "./participant";
/**
 * Asynchronously fetches all events from the Firestore database.
 * @return {Promise<Array>} A promise that resolves to an array of event objects,
 * each enhanced with event flyer URLs from Firebase Storage.
 */
export async function getAllEvents() {
  // Fetches documents from the 'events' collection in Firestore.
  const querySnapshot = await getDocs(collection(db, "events"));

  // Initialize an empty array to hold the event objects.
  const events = [];

  // Initialize an empty array to hold promises for downloading flyer URLs.
  const flyerPromises = [];

  // Iterate over each document in the query snapshot.
  querySnapshot.forEach((doc) => {
    // Extract data from the document.
    const data = doc.data();
    const eventData = {
      ...data,
      eventId: doc.id, // Include the document ID as 'eventId'.
    };
    
    events.push(eventData);
  });

  // Return the array of events, each now potentially containing flyer URL(s).
  return events;
}

// get upcoming events, sorted by eventTime in ascending order
export async function getUpComingEvents() {
  const events = await getAllEvents();
  const today = moment();
  return (
    events
      .filter((event) => {
        let eventDate;
        if (event.eventDate) {
          // turm date in the format of YYYY-MM-DD into a moment object
          eventDate = moment(event.eventDate);
        } else if (event.eventDates) {
          // when eventDate is not defined, use eventDates to support legacy event types
          eventDate = moment(event.eventDates[0]);
        } else {
          // if neither eventDate nor eventDates is defined, throw an error
          console.error("Event date is not defined for event: ", event);
        }
        
        // filter out event dates that is before. But keep the ones that are today
        return eventDate.isSameOrAfter(today, "day");
      })
      // sort the events by eventTime in ascending order
      .sort((a, b) => moment(a.eventDates[0]).diff(moment(b.eventDates[0])))
  );
}

// get past events, sorted by eventTime in descending order
export async function getPastEvents() {
  const events = await getAllEvents();
  const today = moment();
  return (
    events
      .filter((event) => {
        const { eventDates } = event;
        const eventDate = moment(eventDates[0]);
        // TODO: no filtering for now for testing, change it later
        // filter out event dates that is before. But keep the ones that are today
        // return eventDate.isBefore(today, "day");
        return true
      })
      // sort the events by eventTime in descending order
      .sort((a, b) => moment(b.eventDates[0]).diff(moment(a.eventDates[0])))
  );
}

// get past event with participant and rsvp numbers
export async function getPastEventsOverview() {
  const pastEvents = await getPastEvents()

  // add participant and rsvp numbers to each event
  const pastEventsOverview = await Promise.all(
    pastEvents.map(async (event) => {
      const participantNumber = await getEventAttendanceNumber(event.eventId);
      return {
        ...event,
        participantNumber,
        rsvpNumber: 0,
      };
    })
  );

  return pastEventsOverview;
}

export async function getEventById(eventId) {
  const events = await getAllEvents();
  return events.find((event) => event.eventId === eventId);
}

export async function getEventAttendanceDetail(eventId) {
  const participants = await getParticipantByEventId(eventId);
  return participants;
}

