// Firebase imports for accessing Firestore and Storage functionalities.
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

// Import your Firebase project's configuration for database and storage.
import { db, storage } from "@/firebase/config";

// Moment.js is used for date manipulation and formatting.
import moment from "moment";

import { getEventAttendanceNumber } from "./attendance";
import { getParticipantByEventId } from "./participant";
import { getRSVPNumber } from "./rsvp";


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

// get upcoming events, sorted by eventDate in ascending order
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
        } else {
          // not defined, throw an error
          console.error("Event date is not defined for event: ", event);
        }
        
        // filter out event dates that is before. But keep the ones that are today
        return eventDate.isSameOrAfter(today, "day");
      })
      // sort the events by eventDate in ascending order
      .sort((a, b) => moment(a.eventDate).diff(moment(b.eventDate)))
  );
}

// get past events, sorted by eventDate in descending order
export async function getPastEvents() {
  const events = await getAllEvents();
  const today = moment();
  return (
    events
      .filter((event) => {
        const { eventDate } = event;
        // TODO: no filtering for now for testing, change it later
        // filter out event dates that is before. But keep the ones that are today
        // return eventDate.isBefore(today, "day");
        return true
      })
      // sort the events by eventDate in descending order
      .sort((a, b) => moment(b.eventDate).diff(moment(a.eventDate)))
  );
}

// get past event with participant and rsvp numbers
export async function getPastEventsOverview() {
  const pastEvents = await getPastEvents()

  // add participant and rsvp numbers to each event
  const pastEventsOverview = await Promise.all(
    pastEvents.map(async (event) => {
      const participantNumber = await getEventAttendanceNumber(event.eventId);
      const rsvpNumber = await getRSVPNumber(event.eventId);
      return {
        ...event,
        participantNumber,
        rsvpNumber,
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

export async function deleteEvent(eventId) {
  try {
    console.log("ID", eventId)
    const eventRef = doc(db, 'events', eventId); // Get a reference to the event document
    await deleteDoc(eventRef); // Delete the document
    console.log('Event deleted successfully');
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

