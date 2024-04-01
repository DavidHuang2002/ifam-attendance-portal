import {
  getAttendanceByEventId,
  getEventAttendanceNumber,
} from "@/service/back-end/attendance";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock("@/firebase/dbUtils", () => ({
  getAllDocs: jest.fn(),
}));

jest.mock("@/firebase/config", () => ({
  db: jest.fn(),
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
