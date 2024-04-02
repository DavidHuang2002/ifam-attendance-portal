// Import the necessary dependencies and functions
import { createRSVP } from "@/service/back-end/rsvp";
import { getParticipantByEmail } from "@/service/back-end/participant";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";

// Mock the dependencies
jest.mock("@/service/back-end/participant", () => ({
  getParticipantByEmail: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
}));

jest.mock("@/firebase/config", () => ({
  db: jest.fn(),
}));

// Test the createRSVP function
describe("createRSVP", () => {
  it("creates a new RSVP document with the provided email and eventId", async () => {
    // Mock the participant data
    const participant = {
      participantId: "participant1",
    };
    getParticipantByEmail.mockResolvedValue(participant);

    // Mock the Firestore addDoc function
    const rsvpDocRef = {
      _key: {
        path: {
          segments: ["rsvp", "rsvp1"],
        },
      },
    };
    addDoc.mockResolvedValue(rsvpDocRef);

    // Define the input parameters
    const email = "test@example.com";
    const eventId = "event1";

    // Call the createRSVP function
    const result = await createRSVP(email, eventId);

    // Verify the function behavior
    expect(getParticipantByEmail).toHaveBeenCalledTimes(1);
    expect(getParticipantByEmail).toHaveBeenCalledWith(email);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(collection(db, "rsvp"), {
      email,
      eventId,
      rsvpTime: expect.any(String),
      participantId: participant.participantId,
    });

    expect(result).toEqual(rsvpDocRef._key.path.segments.join("/"));
  });

  it("creates a new RSVP document without participantId if no participant is found", async () => {
    // Mock the participant data to be null
    getParticipantByEmail.mockResolvedValue(null);

    // Mock the Firestore addDoc function
    const rsvpDocRef = {
      _key: {
        path: {
          segments: ["rsvp", "rsvp1"],
        },
      },
    };

    addDoc.mockResolvedValue(rsvpDocRef);

    // Define the input parameters
    const email = "test@example.com";
    const eventId = "event1";

    // Call the createRSVP function
    const result = await createRSVP(email, eventId);

    // Verify the function behavior
    expect(getParticipantByEmail).toHaveBeenCalledTimes(1);
    expect(getParticipantByEmail).toHaveBeenCalledWith(email);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(collection(db, "rsvp"), {
      email,
      eventId,
      rsvpTime: expect.any(String),
    });

    expect(result).toEqual(rsvpDocRef._key.path.segments.join("/"));
  });
});
