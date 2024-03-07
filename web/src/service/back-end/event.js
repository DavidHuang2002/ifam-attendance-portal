import { collection, getDocs } from "firebase/firestore"; // Adjust imports based on your setup
import { ref, getDownloadURL } from "firebase/storage"; // For handling storage
import { db, storage } from "@/firebase/config"; // Your Firebase initialization or utility file
import moment from "moment";

// Handler for fetching all events
export async function getAllEvents() {
  // Fetch all events from Firestore
  const querySnapshot = await getDocs(collection(db, "events"));
  const events = [];
  const flyerPromises = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const eventData = {
      ...data,
      eventId: doc.id,
      // Convert Firestore timestamps to desired formats if necessary
      eventTime: data.eventTime
        ? moment(data.eventTime, "HH:mm:ss").toDate()
        : null,
      eventDates: data.eventDates
        ? data.eventDates.map((date) => moment(date, "YYYY-MM-DD").toDate())
        : [],
    };

    // Prepare to fetch flyer URLs
    const flyers = data.eventFlyer || [];
    flyers.forEach((filename) => {
      const flyerRef = ref(storage, `public/EventFlyer/${filename}`);
      flyerPromises.push(
        getDownloadURL(flyerRef)
          .then((url) => ({ filename, url }))
          .catch((error) => null)
      );
    });

    events.push(eventData);
  });

  // Fetch all flyer URLs
  const flyerResults = await Promise.all(flyerPromises);
  // Filter out any failed fetches and organize URLs by filename
  const flyerUrls = flyerResults
    .filter((result) => result !== null)
    .reduce((acc, { filename, url }) => {
      acc[filename] = url;
      return acc;
    }, {});

  // Attach flyer URLs to events
  events.forEach((event) => {
    if (event.eventFlyer) {
      event.eventFlyer = event.eventFlyer.map((filename) => ({
        filename,
        url: flyerUrls[filename] || null,
      }));
    }
  });

  return events;
}
