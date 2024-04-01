// attendance.test.js
import {
    createAttendance,
    getAllAttendance,
    getEventAttendanceNumber,
    getAttendanceByEventId,
    ParticipantNotFound,
  } from '@/service/back-end/attendance';
  
  // Mock the Firebase dependencies
  jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    getDocs: jest.fn(),
    addDoc: jest.fn(),
  }));

  jest.mock("firebase/storage", () => ({
    ref: jest.fn().mockImplementation((storage, path) => ({
      _location: { path_: path }, // Mock _location.path_ if needed by your implementation
    })),
  }));

  jest.mock('@/firebase/dbUtils', () => ({
    getAllDocs: jest.fn((collectionName) => collectionName === 'attendance' ? ['attendance1', 'attendance2'] : []),
  }));

  jest.mock("@/firebase/config", () => {
    return {
      db: jest.fn(),
      storage: jest.fn(),
    };
  });


  describe('Attendance Service', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });
  
    describe('createAttendance', () => {
      it('should create a new attendance record in the database', async () => {
        // Mock the necessary dependencies
        const participantMock = { participantId: 'participant-id' };
        const addDocMock = jest.fn().mockResolvedValue({ _key: { path: { segments: ['attendance', 'doc-id'] } } });
        const getParticipantByEmailMock = jest.fn().mockResolvedValue(participantMock);
  
        // Generate a fake event ID if not provided
        const eventId = 'mock-event-id';
  
        // Call the function under test
        const newAttendance = { email: 'test@example.com', eventId };
        const docRef = await createAttendance(newAttendance);
  
        // Assert the expected behavior
        expect(getParticipantByEmailMock).toHaveBeenCalledWith(newAttendance.email);
        expect(addDocMock).toHaveBeenCalledWith(expect.any(Object), { ...newAttendance, participantId: participantMock.participantId, timestamp: expect.any(String) });
        expect(docRef).toBe('attendance/doc-id');
      });
  
      it('should throw an error if participant not found', async () => {
        // Mock the necessary dependencies
        const getParticipantByEmailMock = jest.fn().mockResolvedValue(null);
  
        // Generate a fake event ID if not provided
        const eventId = 'mock-event-id';
  
        // Call the function under test
        const newAttendance = { email: 'test@example.com', eventId };
        await expect(createAttendance(newAttendance)).rejects.toThrowError(ParticipantNotFound);
      });
    });
  
    describe('getAllAttendance', () => {
      it('should get all attendance records from the database', async () => {
        // Mock the necessary dependencies
        const mockFirestoreData = [{
            participantId: 'attendance1'
        }, 
        {
            participantId: 'attendance2'
        }];

        getAllAttendance.mockResolvedValue({
            forEach: (callback) => mockFirestoreData.forEach(callback),
          });
        
        //const getAllDocsMock = jest.fn().mockResolvedValue(['attendance1', 'attendance2']);
  
        // Call the function under test
        const attendance = await getAllAttendance();
  
        // Assert the expected behavior
        expect(getAllDocs).toHaveBeenCalledTimes(2);
        expect(attendance).toEqual(['attendance1', 'attendance2']);
      });
    });
  
    describe('getEventAttendanceNumber', () => {
      it('should get the number of attendance records for a specific event', async () => {
        // Mock the necessary dependencies
        const getDocsMock = jest.fn().mockResolvedValue({
          forEach: jest.fn().mockImplementation((callback) => {
            callback({ data: () => ({ eventId: 'mock-event-id' }) });
            callback({ data: () => ({ eventId: 'mock-event-id' }) });
            callback({ data: () => ({ eventId: 'other-event' }) });
          }),
        });
  
        // Generate a fake event ID if not provided
        const eventId = 'mock-event-id';
  
        // Call the function under test
        const count = await getEventAttendanceNumber(eventId);
  
        // Assert the expected behavior
        expect(count).toBe(2);
      });
    });
  
    describe('getAttendanceByEventId', () => {
      it('should get attendance records for a specific event', async () => {
        // Mock the necessary dependencies
        const getDocsMock = jest.fn().mockResolvedValue({
          forEach: jest.fn().mockImplementation((callback) => {
            callback({ data: () => ({ eventId: 'mock-event-id', data: 'data1' }) });
            callback({ data: () => ({ eventId: 'other-event', data: 'data2' }) });
            callback({ data: () => ({ eventId: 'mock-event-id', data: 'data3' }) });
          }),
        });
  
        // Generate a fake event ID if not provided
        const eventId = 'mock-event-id';
  
        // Call the function under test
        const attendance = await getAttendanceByEventId(eventId);
  
        // Assert the expected behavior
        expect(attendance).toEqual([{ eventId: 'mock-event-id', data: 'data1' }, { eventId: 'mock-event-id', data: 'data3' }]);
      });
    });
  });