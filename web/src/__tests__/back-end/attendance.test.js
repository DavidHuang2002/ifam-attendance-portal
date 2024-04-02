import {
  getAttendanceByEventId,
  getEventAttendanceNumber,
  getAllAttendance,
  createAttendance, // Added import for the new function
} from "@/service/back-end/attendance";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getAllDocs } from "@/firebase/dbUtils";
import { getParticipantByEmail } from "@/service/back-end/participant";
import { ParticipantNotFound } from "@/service/back-end/attendance";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(), // Mocking the addDoc function
}));

jest.mock("@/firebase/dbUtils", () => ({
  getAllDocs: jest.fn(),
}));

jest.mock("@/firebase/config", () => ({
  db: jest.fn(),
}));

jest.mock("@/service/back-end/participant", () => ({
  getParticipantByEmail: jest.fn(),
}));

describe("getAttendanceByEventId", () => {
  it("returns attendance data for a specific event ID", async () => {
    // Mock Firestore response
    const mockFirestoreData = [
      {
        id: "event1",
        data: () => ({
          name: "John Doe",
          attendanceStatus: "Present",
          eventId: "event1",
        }),
      },
      {
        id: "event2",
        data: () => ({
          name: "Jane Smith",
          attendanceStatus: "Absent",
          eventId: "event2",
        }),
      },
      {
        id: "event1",
        data: () => ({
          name: "Bob Johnson",
          attendanceStatus: "Present",
          eventId: "event1",
        }),
      },
    ];
    getDocs.mockResolvedValue({
      forEach: (callback) => mockFirestoreData.forEach(callback),
    });

    // Call the function to test
    const eventId = "event1";
    const result = await getAttendanceByEventId(eventId);

    // Assertions to verify the behavior
    expect(collection).toHaveBeenCalledWith(db, "attendance");
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(result).toEqual([
      { eventId: "event1", name: "John Doe", attendanceStatus: "Present" },
      { eventId: "event1", name: "Bob Johnson", attendanceStatus: "Present" },
    ]);
  });

  it("returns an empty array if no attendance data is found for the event ID", async () => {
    // Mock Firestore response with no matching data
    getDocs.mockResolvedValue({
      forEach: (callback) => [], // Empty array
    });

    // Call the function to test
    const eventId = "event3";
    const result = await getAttendanceByEventId(eventId);

    // Assertions to verify the behavior
    expect(collection).toHaveBeenCalledWith(db, "attendance");
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});

describe("getEventAttendanceNumber", () => {
  it("returns the number of attendance for a specific event ID", async () => {
    // Mock Firestore response
    const mockFirestoreData = [
      {
        id: "event1",
        data: () => ({
          name: "John Doe",
          attendanceStatus: "Present",
          eventId: "event1",
        }),
      },
      {
        id: "event2",
        data: () => ({
          name: "Jane Smith",
          attendanceStatus: "Absent",
          eventId: "event2",
        }),
      },
      {
        id: "event1",
        data: () => ({
          name: "Bob Johnson",
          attendanceStatus: "Present",
          eventId: "event1",
        }),
      },
    ];
    getDocs.mockResolvedValue({
      forEach: (callback) => mockFirestoreData.forEach(callback),
    });

    // Call the function to test
    const eventId = "event1";
    const result = await getEventAttendanceNumber(eventId);

    // Assertions to verify the behavior
    expect(collection).toHaveBeenCalledWith(db, "attendance");
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(result).toEqual(2);
  });

  it("returns 0 if no attendance data is found for the event ID", async () => {
    // Mock Firestore response with no matching data
    getDocs.mockResolvedValue({
      forEach: (callback) => [], // Empty array
    });

    // Call the function to test
    const eventId = "event3";
    const result = await getEventAttendanceNumber(eventId);

    // Assertions to verify the behavior
    expect(collection).toHaveBeenCalledWith(db, "attendance");
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(result).toEqual(0);
  });
});

describe("createAttendance", () => {
  it("creates a new attendance record in the database", async () => {
    // Mock Firestore response
    const mockParticipant = {
      participantId: "participant1",
    };
    const mockFirestoreData = [
      {
        id: "participant1",
        data: () => mockParticipant,
      },
    ];
    getDocs.mockResolvedValue({
      forEach: (callback) => mockFirestoreData.forEach(callback),
    });

    // including the mock for getParticipantByEmail
    getParticipantByEmail.mockResolvedValue({
      participantId: "participant1",
    });

    // Mock Firestore addDoc function
    const mockAddDocResult = {
      _key: {
        path: {
          segments: ["attendance", "newAttendanceId"], // Mocked path of the new attendance record
        },
      },
    };
    addDoc.mockResolvedValue(mockAddDocResult);

    // Call the function to test
    const newAttendance = {
      email: "john.doe@example.com",
      // other properties...
    };
    const result = await createAttendance(newAttendance);

    // Assertions to verify the behavior
    expect(getParticipantByEmail).toHaveBeenCalledWith(newAttendance.email);
    expect(addDoc).toHaveBeenCalledWith(collection(db, "attendance"), {
      ...newAttendance,
      participantId: mockParticipant.participantId,
      timestamp: expect.any(String),
    });
    expect(result).toEqual("attendance/newAttendanceId");
  });

  it("throws an error if participant is not found", async () => {
    // clear the mock implementation of getParticipantByEmail
    getParticipantByEmail.mockReset();

    // Mock Firestore response with no matching participant
    getDocs.mockResolvedValue({
      forEach: (callback) => [], // Empty array
    });

    // Call the function to test
    const newAttendance = {
      email: "john.doe@example.com",
      // other properties...
    };
    await expect(createAttendance(newAttendance)).rejects.toThrow(
      ParticipantNotFound
    );

    // Assertions to verify the behavior
    expect(getParticipantByEmail).toHaveBeenCalledWith(newAttendance.email);
    expect(addDoc).not.toHaveBeenCalled();
  });
});
