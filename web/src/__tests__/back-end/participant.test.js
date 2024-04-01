// Import the modules and functions to be tested
import {
  getParticipantByEmail,
  createNewParticipant,
  getParticipantByEventId,
} from "@/service/back-end/participant";
// Mocking external dependencies
import { db, storage } from "@/firebase/config";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import moment from "moment";
import { getAttendanceByEventId } from "@/service/back-end/attendance";
import { id } from "../../../jest.config";

jest.mock("@/firebase/config", () => {
  return {
    db: jest.fn(),
    storage: jest.fn(),
  };
});

// Mock Firebase dependencies for both modules
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
}));

jest.mock("@/firebase/dbUtils", () => ({
  getAllDocs: jest.fn((collectionName) =>
    collectionName === "attendance" ? ["attendance1", "attendance2"] : []
  ),
}));

jest.mock("@/service/back-end/attendance", () => ({
  getAttendanceByEventId: jest.fn(),
}));

// Test cases for the participant module
describe("Participant Service", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe("getParticipantByEmail", () => {
    it("should retrieve participant information by email", async () => {
      // Mock the necessary dependencies
      const participantData = {
        participantId: "participant-id",
        email: "test@example.com",
      };
      getDocs.mockResolvedValue({
        forEach: (callback) =>
          [
            {
              id: "participant-id",
              data: () => participantData,
            },
          ].forEach(callback),
      });

      // Call the function under test
      const participant = await getParticipantByEmail("test@example.com");

      // Assert the expected behavior
      expect(participant).toEqual(participantData);
    });

    it("should return null if participant not found by email", async () => {
      // Mock the necessary dependencies
      // Mock the necessary dependencies
      const participantData = {
        participantId: "participant-id",
        email: "test@example.com",
      };
      getDocs.mockResolvedValue({
        forEach: (callback) =>
          [
            {
              id: "participant-id",
              data: () => participantData,
            },
          ].forEach(callback),
      });

      // Call the function under test
      const participant = await getParticipantByEmail(
        "nonexistent@example.com"
      );

      // Assert the expected behavior
      expect(participant).toBeNull();
    });
  });

  describe("createNewParticipant", () => {
    it("should update participant info if participant already exists", async () => {
      // Mock the necessary dependencies
      const newParticipant = { email: "test@example.com" };
      const participant = { participantId: "participant-id" };
      const participantRef = {
        _key: { path: { segments: ["participants", "participant-id"] } },
      };

      const existingParticipant = {
        participantId: "participant-id",
        email: "test@example.com",
      };

      doc.mockReturnValue(participantRef);

      // integrated testing with getParticipantByEmail by mocking database instead of getParticipantByEmail
      getDocs.mockResolvedValue({
        forEach: (callback) =>
          [
            {
              id: "participant-id",
              data: () => existingParticipant,
            },
          ].forEach(callback),
      });

      addDoc.mockResolvedValue(participantRef);

      // Call the function under test
      const result = await createNewParticipant(newParticipant);

      // Assert the expected behavior
      expect(updateDoc).toHaveBeenCalledWith(participantRef, newParticipant);
      expect(result).toEqual(participantRef._key.path.segments.join("/"));
    });

    it("should add new participant if participant does not exist", async () => {
      // Mock the necessary dependencies
      const newParticipant = { email: "test@example.com" };
      const participant = { participantId: "participant-id" };
      const participantRef = {
        _key: { path: { segments: ["participants", "participant-id"] } },
      };

      const existingParticipant = {
        participantId: "participant-id",
        email: "existing@example.com",
      };

      doc.mockReturnValue(participantRef);

      // integrated testing with getParticipantByEmail by mocking database instead of getParticipantByEmail
      getDocs.mockResolvedValue({
        forEach: (callback) =>
          [
            {
              id: "participant-id",
              data: () => existingParticipant,
            },
          ].forEach(callback),
      });

      addDoc.mockResolvedValue(participantRef);

      // Call the function under test
      const docRef = await createNewParticipant(newParticipant);

      // Assert the expected behavior
      expect(addDoc).toHaveBeenCalledWith(
        collection(db, "participants"),
        newParticipant
      );
      expect(docRef).toEqual(participantRef._key.path.segments.join("/"));
    });
  });

  describe("getParticipantByEventId", () => {
    it("should return the details of all participants who attended a specific event", async () => {
      // Mock the necessary dependencies
      const eventId = "event-id";
      const attendance = [
        { email: "test1@example.com" },
        { email: "test2@example.com" },
      ];
      const participantData1 = {
        participantId: "participant-id1",
        email: "test1@example.com",
      };
      const participantData2 = {
        participantId: "participant-id2",
        email: "test2@example.com",
      };
      getAttendanceByEventId.mockResolvedValue(attendance);

      // Mock getDocs to simulate fetching participants by email
      getDocs.mockImplementation(() => ({
        forEach: (callback) => {
          const docs = [
            { id: "participant-id1", data: () => participantData1 },
            { id: "participant-id2", data: () => participantData2 },
          ];
          docs.forEach(callback);
        },
      }));

      // Call the function under test
      const participants = await getParticipantByEventId(eventId);

      // Assert the expected behavior
      expect(getAttendanceByEventId).toHaveBeenCalledWith(eventId);
      // This ensures the mock was called, indirectly validating getParticipantByEmail's usage
      expect(getDocs).toHaveBeenCalledTimes(2);
      expect(participants).toEqual([participantData1, participantData2]);
    });

    it("should return an empty array if no participants attended the event", async () => {
      // Mock the necessary dependencies
      const eventId = "event-id";
      getAttendanceByEventId.mockResolvedValue([]);

      // Ensure getDocs is not called when there are no attendance records
      getDocs.mockResolvedValue({ forEach: (callback) => {} });

      // Call the function under test
      const participants = await getParticipantByEventId(eventId);

      // Assert the expected behavior
      expect(getAttendanceByEventId).toHaveBeenCalledWith(eventId);
      expect(getDocs).not.toHaveBeenCalled();
      expect(participants).toEqual([]);
    });
  });
});
