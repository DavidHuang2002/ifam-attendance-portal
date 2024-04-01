import { createAttendance, getAllAttendance, getEventAttendanceNumber } from '@/service/back-end/attendance';
import { getParticipantByEmail } from '@/service/back-end/participant';

import { db, storage } from "@/firebase/config"; // This might need to be mocked if it performs any operation
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import moment from "moment";

jest.mock('@/service/back-end/participant', () => ({
  getParticipantByEmail: jest.fn(),
}));

jest.mock("@/service/back-end/attendance", () => ({
    createAttendance: jest.fn(),
    getEventAttendanceNumber: jest.fn(),
    getAllAttendance: jest.fn()
}));
  

jest.mock("firebase/firestore", () => {
    return {
      collection: jest.fn(),
      getDocs: jest.fn(),
      addDoc: jest.fn(),
    };
  });

jest.mock("@/firebase/config", () => {
return {
    db: jest.fn(),
    storage: jest.fn(),
};
});
  
  

describe('createAttendance function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new attendance record for an existing participant', async () => {
    const existingParticipant = {
      participantId: 'abc123',
      email: 'test@example.com',
    };
    getParticipantByEmail.mockResolvedValue(existingParticipant);

    const mockResult = {
        path: 'attendance/abc123', // Assuming the `result` object has a `path` property
      };
      addDoc.mockResolvedValue(mockResult);
    

    const newAttendance = {
      eventId: 'event123',
      email: 'test@example.com',
    };

    const docRef = await createAttendance(newAttendance);
    expect(docRef).toBe('attendance/abc123');
    expect(getParticipantByEmail).toHaveBeenCalledWith('test@example.com');
    expect(newAttendance).toHaveProperty('participantId', 'abc123');
    expect(newAttendance).toHaveProperty('timestamp');
  });

  it('should throw an error for a non-existing participant', async () => {
    getParticipantByEmail.mockResolvedValue(null);

    const newAttendance = {
      eventId: 'event123',
      email: 'nonexistent@example.com',
    };

    await expect(createAttendance(newAttendance)).rejects.toThrow(
      'Participant not found with email: nonexistent@example.com'
    );
  });
});

describe('checking Attendance Record', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getAllAttendance', () => {
      it('should return all attendance documents', async () => {
        const mockDocs = [
          { id: 'doc1', data: () => ({ eventId: 'event1' }) },
          { id: 'doc2', data: () => ({ eventId: 'event2' }) },
        ];
        getDocs.mockResolvedValue({
            docs: mockDocs,
            forEach: (callback) => mockDocs.forEach(callback),
          });
  
        const docs = await getAllAttendance();
        expect(docs).toEqual(mockDocs);
      });
    });
  
    describe('getEventAttendanceNumber', () => {
      it('should return the correct attendance count for a given eventId', async () => {
        const mockDocs = [
          { id: 'doc1', data: () => ({ eventId: 'event1' }) },
          { id: 'doc2', data: () => ({ eventId: 'event1' }) },
          { id: 'doc3', data: () => ({ eventId: 'event2' }) },
        ];
        getDocs.mockResolvedValue({
            docs: mockDocs,
            forEach: (callback) => mockDocs.forEach(callback),
          });
  
        const count = await getEventAttendanceNumber('event1');
        expect(count).toBe(2);
      });
  
      it('should return 0 if there are no attendance records for the given eventId', async () => {
        const mockDocs = [
          { id: 'doc1', data: () => ({ eventId: 'event1' }) },
          { id: 'doc2', data: () => ({ eventId: 'event2' }) },
        ];
        getDocs.mockResolvedValue({
            docs: mockDocs,
            forEach: (callback) => mockDocs.forEach(callback),
          });
  
        const count = await getEventAttendanceNumber('event3');
        expect(count).toBe(0);
      });
    });
  });