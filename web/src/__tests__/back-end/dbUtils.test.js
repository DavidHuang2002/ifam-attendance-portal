import { getAllDocs } from "@/firebase/dbUtils";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock("@/firebase/config", () => ({
  db: jest.fn(),
}));

describe("getAllDocs", () => {
  it("fetches all documents from a collection and returns an array of document data", async () => {
    // Mock Firestore response
    const mockQuerySnapshot = {
      forEach: jest.fn((callback) => {
        callback({ data: jest.fn(() => ({ id: "doc1", name: "Document 1" })) });
        callback({ data: jest.fn(() => ({ id: "doc2", name: "Document 2" })) });
      }),
    };
    getDocs.mockResolvedValue(mockQuerySnapshot);

    // Call the function to test
    const result = await getAllDocs("myCollection");

    // Assertions to verify the behavior
    expect(collection).toHaveBeenCalledWith(db, "myCollection");
    expect(getDocs).toHaveBeenCalledWith(collection(db, "myCollection"));
    expect(result).toEqual([
      { id: "doc1", name: "Document 1" },
      { id: "doc2", name: "Document 2" },
    ]);
  });

  it("returns an empty array if there are no documents in the collection", async () => {
    // Mock Firestore response with no documents
    const mockQuerySnapshot = {
      forEach: jest.fn((callback) => {}),
    };
    getDocs.mockResolvedValue(mockQuerySnapshot);

    // Call the function to test
    const result = await getAllDocs("myCollection");

    // Assertions to verify the behavior
    expect(collection).toHaveBeenCalledWith(db, "myCollection");
    expect(getDocs).toHaveBeenCalledWith(collection(db, "myCollection"));
    expect(result).toEqual([]);
  });

  it("handles errors and throws an error if fetching documents fails", async () => {
    // Mock Firestore response with an error
    const mockError = new Error("Failed to fetch documents");
    getDocs.mockRejectedValue(mockError);

    // Call the function to test and expect it to throw an error
    await expect(getAllDocs("myCollection")).rejects.toThrowError(
      "Failed to fetch documents"
    );
  });
});
