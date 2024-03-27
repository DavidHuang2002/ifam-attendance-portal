// Firebase imports for accessing Firestore and Storage functionalities.
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

// Import your Firebase project's configuration for database and storage.
import { db, storage } from "@/firebase/config";

// Moment.js is used for date manipulation and formatting.
import moment from "moment";

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
      eventTime: data.eventTime,
      // Convert each 'eventDate' to a JavaScript Date object, if any exist.
      eventDates: data.eventDates,
    };

    // If there are flyers associated with the event, prepare to fetch their URLs.
    const flyers = data.eventFlyer || [];
    flyers.forEach((filename) => {
      // Create a reference to the flyer in Firebase Storage.
      const flyerRef = ref(storage, `public/EventFlyer/${filename}`);
      // Push a promise to fetch the download URL into the `flyerPromises` array.
      flyerPromises.push(
        getDownloadURL(flyerRef)
          .then((url) => ({ filename, url })) // On success, store the filename and URL.
          .catch((error) => null) // On failure, push null (which will be filtered out later).
      );
    });

    // Add the event data object to the 'events' array.
    events.push(eventData);
  });

  // Wait for all flyer URL fetch promises to resolve.
  const flyerResults = await Promise.all(flyerPromises);

  // Filter out any null results (failed fetches) and reduce the results into an object mapping filenames to URLs.
  const flyerUrls = flyerResults
    .filter((result) => result !== null)
    .reduce((acc, { filename, url }) => {
      acc[filename] = url;
      return acc;
    }, {});

  // Attach flyer URLs to their corresponding events.
  events.forEach((event) => {
    if (event.eventFlyer) {
      event.eventFlyer = event.eventFlyer.map((filename) => ({
        filename,
        url: flyerUrls[filename] || null, // Attach the URL or null if the fetch failed.
      }));
    }
  });

  // Return the array of events, each now potentially containing flyer URL(s).
  return events;
}
