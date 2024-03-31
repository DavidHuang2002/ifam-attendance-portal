// Import statements for Jest and any necessary mock libraries
jest.mock("firebase/firestore", () => {
  return {
    collection: jest.fn(),
    getDocs: jest.fn(),
  };
});

jest.mock("firebase/storage", () => ({
  ref: jest.fn().mockImplementation((storage, path) => ({
    _location: { path_: path }, // Mock _location.path_ if needed by your implementation
  })),
  getDownloadURL: jest
    .fn()
    .mockImplementation(() => Promise.resolve("https://example.com/fakeUrl")),
}));

// Mocking moment to always return a fixed date for consistent testing when calling moment()
// and still work as expected when called with arguments
jest.mock("moment", () => {
  // First, require the original moment module for calls that need to pass through
  const actualMoment = jest.requireActual("moment");

  // Return a function that mocks moment
  return (...args) => {
    // Check if arguments were provided
    if (args.length === 0) {
      // No arguments, return a moment object for the specified day
      return actualMoment("2024-04-04T00:00:00.000Z");
    } else {
      // Arguments provided, call the real moment function with those arguments
      return actualMoment(...args);
    }
  };
});

jest.mock("@/firebase/config", () => {
  return {
    db: jest.fn(),
    storage: jest.fn(),
  };
});

jest.mock("@/service/back-end/attendance", () => ({
  getEventAttendanceNumber: jest.fn(),
}));

jest.mock("@/service/back-end/participant", () => ({
  getParticipantByEventId: jest.fn(),
}));

// Importing the functions to be tested
import {
  getAllEvents,
  getUpComingEvents,
  getPastEvents,
  getPastEventsOverview,
  getEventById,
  getEventAttendanceDetail,
  exportEventDetails,
} from "@/service/back-end/event"; // Adjust the path as necessary
import { getEventAttendanceNumber } from "@/service/back-end/attendance";
import { getParticipantByEventId } from "@/service/back-end/participant";

// Mocking external dependencies
import { db, storage } from "@/firebase/config"; // This might need to be mocked if it performs any operation
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import moment from "moment";

// Your Firebase project's configuration for database and storage might need to be mocked as well if they are not purely configuration objects

describe("Event Functions", () => {
  beforeEach(() => {
    jest.resetModules(); // This ensures modules are fresh for each test
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  describe("getAllEvents", () => {
    it("fetches events from Firestore and resolves with enhanced event objects, including flyer URLs", async () => {
      // Sample data for Firestore documents
      const mockFirestoreData = [
        {
          id: "event1",
          data: () => ({
            eventName: "Event 1",
            eventTime: "2024-04-04T12:00:00.000Z",
            eventFlyer: ["flyer1.jpg", "flyer2.jpg"],
            eventDates: ["2024-04-04"],
          }),
        },
      ];

      // Mock getDocs response
      getDocs.mockResolvedValue({
        forEach: (callback) => mockFirestoreData.forEach(callback),
      });

      // Mock getDownloadURL response
      getDownloadURL.mockImplementation((ref) =>
        Promise.resolve(`https://example.com/${ref._location.path_}`)
      );

      // Call the function to test
      const result = await getAllEvents();

      // Assertions to verify the behavior
      expect(getDocs).toHaveBeenCalledTimes(1);
      expect(getDownloadURL).toHaveBeenCalledTimes(2); // Assuming two flyers based on the mock data
      expect(result).toEqual([
        {
          eventName: "Event 1",
          eventTime: "2024-04-04T12:00:00.000Z",
          eventFlyer: [
            {
              filename: "flyer1.jpg",
              url: "https://example.com/public/EventFlyer/flyer1.jpg",
            },
            {
              filename: "flyer2.jpg",
              url: "https://example.com/public/EventFlyer/flyer2.jpg",
            },
          ],
          eventDates: ["2024-04-04"],
          eventId: "event1",
        },
      ]);
    });
  });

  describe("getAllEvents", () => {
    it("handles flyer URL fetch failures gracefully", async () => {
      // Mock Firestore response to include a document with a flyer
      getDocs.mockResolvedValue({
        forEach: (callback) =>
          [
            {
              id: "event1",
              data: () => ({
                eventName: "Event with Failed Flyer",
                eventTime: "2024-04-04T12:00:00.000Z",
                eventFlyer: ["existingFlyer.jpg", "nonExistingFlyer.jpg"],
                eventDates: ["2024-04-04"],
              }),
            },
          ].forEach(callback),
      });

      // Mock getDownloadURL to succeed for the first flyer and fail for the second
      getDownloadURL.mockImplementation((ref) => {
        if (ref._location.path_.includes("existingFlyer.jpg")) {
          return Promise.resolve("https://example.com/existingFlyer.jpg");
        } else {
          return Promise.reject(new Error("Flyer not found"));
        }
      });

      const events = await getAllEvents();

      // Verify that getAllEvents still succeeds and handles the flyer URL fetch failure gracefully
      expect(events.length).toBe(1);
      expect(events[0].eventName).toBe("Event with Failed Flyer");
      expect(events[0].eventFlyer).toEqual([
        {
          filename: "existingFlyer.jpg",
          url: "https://example.com/existingFlyer.jpg",
        },
        { filename: "nonExistingFlyer.jpg", url: null }, // This shows the failure was handled
      ]);
    });
  });

  describe("getUpComingEvents", () => {
    it("returns upcoming events, sorted by eventTime in ascending order", async () => {
      // Mock Firestore and Storage responses
      getDocs.mockResolvedValue({
        forEach: (callback) =>
          [
            {
              id: "event1",
              data: () => ({
                eventName: "Past Event",
                eventDates: ["2024-04-03T01:45:17.356Z"],
              }),
            },
            {
              id: "event2",
              data: () => ({
                eventName: "Today Event",
                eventDates: ["2024-04-04T01:45:17.356Z"],
              }),
            },
            {
              id: "event3",
              data: () => ({
                eventName: "Future Event",
                eventDates: ["2024-04-05T01:45:17.356Z"],
              }),
            },
          ].forEach(callback),
      });
      // Assuming every event has a flyer and it's the same for simplicity
      getDownloadURL.mockResolvedValue("https://example.com/fakeUrl");

      const upcomingEvents = await getUpComingEvents();

      expect(upcomingEvents.length).toBe(2);
      expect(upcomingEvents[0].eventName).toBe("Today Event");
      expect(upcomingEvents[1].eventName).toBe("Future Event");
    });
  });

  describe("getPastEvents", () => {
    it("returns past events, sorted by eventTime in descending order", async () => {
      // Mock Firestore and Storage responses similar to getUpComingEvents but for past events
      getDocs.mockResolvedValue({
        forEach: (callback) =>
          [
            {
              id: "event1",
              data: () => ({
                eventName: "Old Event",
                eventDates: ["2024-04-01"],
              }),
            },
            {
              id: "event2",
              data: () => ({
                eventName: "Older Event",
                eventDates: ["2024-03-31"],
              }),
            },
            {
              id: "event3",
              data: () => ({
                eventName: "Oldest Event",
                eventDates: ["2024-03-30"],
              }),
            },
          ].forEach(callback),
      });
      // Assuming every event has a flyer and it's the same for simplicity
      getDownloadURL.mockResolvedValue("https://example.com/fakeUrl");

      const pastEvents = await getPastEvents();

      expect(pastEvents.length).toBe(3);
      expect(pastEvents[0].eventName).toBe("Old Event");
      expect(pastEvents[1].eventName).toBe("Older Event");
      expect(pastEvents[2].eventName).toBe("Oldest Event");
    });
  });

  describe("getPastEventsOverview", () => {
    it("returns past events with participant and RSVP numbers", async () => {
      // Mock getEventAttendanceNumber to return a fake attendance number
      getEventAttendanceNumber.mockResolvedValue(10);

      // Assume getDocs and getDownloadURL have been mocked as shown previously

      const overview = await getPastEventsOverview();

      // Assuming you have past events mocked already
      expect(overview.length).toBeGreaterThan(0);
      overview.forEach((event) => {
        expect(event).toHaveProperty("participantNumber", 10);
      });
    });
  });

  describe("getEventById", () => {
    it("returns a specific event by its ID", async () => {
      const eventId = "event2"; // Assuming this ID is in your mocked Firestore data

      const event = await getEventById(eventId);

      expect(event).not.toBeNull();
      expect(event.eventId).toBe(eventId);
    });
  });

  describe("getEventAttendanceDetail", () => {
    it("returns participants for a specific event ID", async () => {
      // Mock getParticipantByEventId to return a fake list of participants
      getParticipantByEventId.mockResolvedValue([
        { name: "John Doe" },
        { name: "Jane Doe" },
      ]);

      const eventId = "event1";
      const participants = await getEventAttendanceDetail(eventId);

      expect(participants.length).toBe(2);
      expect(participants[0].name).toBe("John Doe");
    });
  });

  describe("exportEventDetails", () => {
    it("exports details for a specific event ID", async () => {
      // Mock getParticipantByEventId as in the getEventAttendanceDetail test

      const eventId = "event1"; // Use an ID from your mocked data
      const details = await exportEventDetails(eventId);

      expect(details).toHaveProperty("eventName");
      expect(details).toHaveProperty("eventDate");
      expect(details.participants.length).toBeGreaterThan(0);
    });
  });
});
