// Firebase imports for accessing Firestore and Storage functionalities.
import { collection, getDocs } from "firebase/firestore";

// Import your Firebase project's configuration for database and storage.
import { db, storage } from "@/firebase/config";

// Import the modules and functions to be tested
import {
    getParticipantByEmail,
    createNewParticipant,
    getParticipantByEventId,
  } from '@/service/back-end/participant';
 
  
  // Mock Firebase dependencies for both modules
  jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    getDocs: jest.fn(),
    addDoc: jest.fn(),
    updateDoc: jest.fn(),
    doc: jest.fn(),
  }));
  
  jest.mock('@/firebase/dbUtils', () => ({
    getAllDocs: jest.fn((collectionName) => (collectionName === 'attendance' ? ['attendance1', 'attendance2'] : [])),
  }));
  
  jest.mock('@/firebase/config', () => ({
    db: jest.fn(),
  }));
  
  // Test cases for the participant module
  describe('Participant Service', () => {
    beforeEach(() => {
      jest.resetModules();
      jest.clearAllMocks();
    });
  
    describe('getParticipantByEmail', () => {
        it('should return the participant object if the email exists', async () => {
            const mockDocs = [
              { id: 'participant1', data: () => ({ email: 'test@example.com', name: 'John Doe' }) },
              { id: 'participant2', data: () => ({ email: 'another@example.com', name: 'Jane Doe' }) },
            ];
        
            getDocs.mockResolvedValue({
                docs: mockDocs,
                forEach: (callback) => mockDocs.forEach(callback),
              });
        
            const participant = await getParticipantByEmail('test@example.com');
            expect(participant).toEqual({ email: 'test@example.com', name: 'John Doe', participantId: 'participant1' });
          });
        
  
        it('should return null if the email does not exist', async () => {
        const mockDocs = [
            { id: 'participant1', data: () => ({ email: 'existing@example.com', name: 'John Doe' }) },
        ];
    
        getDocs.mockResolvedValue({
            docs: mockDocs,
            forEach: (callback) => mockDocs.forEach(callback),
          });
        const participant = await getParticipantByEmail('nonexistent@example.com');
        expect(participant).toBeNull();
        });
    
        it('should trim the email before checking for a match', async () => {
        const mockDocs = [
            { id: 'participant1', data: () => ({ email: 'test@example.com', name: 'John Doe' }) },
        ];
    
        getDocs.mockResolvedValue({
            docs: mockDocs,
            forEach: (callback) => mockDocs.forEach(callback),
          });
    
        const participant = await getParticipantByEmail(' test@example.com ');
        expect(participant).toEqual({ email: 'test@example.com', name: 'John Doe', participantId: 'participant1' });
        });
    
        it('should handle case-insensitive email matching', async () => {
        const mockDocs = [
            { id: 'participant1', data: () => ({ email: 'TEST@example.com', name: 'John Doe' }) },
        ];
    
        getDocs.mockResolvedValue({
            docs: mockDocs,
            forEach: (callback) => mockDocs.forEach(callback),
          });
    
        const participant = await getParticipantByEmail('test@example.com');
        expect(participant).toEqual({ email: 'TEST@example.com', name: 'John Doe', participantId: 'participant1' });
        });
    });

    describe('getParticipantByEventId', () => {
        it('should return details of all participants who attended a specific event', async () => {
          // Mock getAttendanceByEventId to return mock attendance data
          const mockAttendanceData = [
            { email: 'test1@example.com' },
            { email: 'test2@example.com' },
          ];
          //getAttendanceByEventId.mockResolvedValue(mockAttendanceData);

          getAttendanceByEventId.mockResolvedValue({
            docs: mockAttendanceData,
            forEach: (callback) => mockAttendanceData.forEach(callback),
          });
      
          // Mock getParticipantByEmail to return participant details
          const participant1 = { email: 'test1@example.com', name: 'Participant 1' };
          const participant2 = { email: 'test2@example.com', name: 'Participant 2' };
          getParticipantByEmail.mockImplementation((email) => {
            if (email === participant1.email) return participant1;
            if (email === participant2.email) return participant2;
            return null;
          });
      
          // Call the function under test
          const participants = await getParticipantByEventId('event-id');
      
          // Assert the expected behavior
          expect(getAttendanceByEventId).toHaveBeenCalledWith('event-id');
          expect(getParticipantByEmail).toHaveBeenCalledTimes(2);
          expect(participants).toEqual([participant1, participant2]);
        });
      });
    
      describe('createNewParticipant', () => {
        it('should update an existing participant if email already exists', async () => {
          // Mock getParticipantByEmail to return an existing participant
          const existingParticipant = { email: 'existing@example.com', name: 'John Doe', participantId: 'participant1' };
          getParticipantByEmail.mockResolvedValue(existingParticipant);
          const updatedParticipant = { ...existingParticipant, name: 'Updated Name' };
      
          // Mock Firestore updateDoc function
          const updateDocMock = jest.fn();
          updateDoc.mockResolvedValue();
          const participantRef = { _key: { path: { segments: ['participants', existingParticipant.participantId] } } };
          doc.mockReturnValue(participantRef);
      
          // Call the function under test
          await createNewParticipant(updatedParticipant);
      
          // Assert the expected behavior
          expect(updateDoc).toHaveBeenCalledWith(participantRef, updatedParticipant);
        });
      
        it('should add a new participant if email does not exist', async () => {
          // Mock getParticipantByEmail to return null (no existing participant)
          getParticipantByEmail.mockResolvedValue(null);
      
          // Mock Firestore addDoc function
          const addDocMock = jest.fn().mockResolvedValue({ _key: { path: { segments: ['participants', 'new-participant-id'] } } });
          addDoc.mockResolvedValue();
          const newParticipant = { email: 'new@example.com', name: 'New Participant' };
          const expectedDocRef = 'participants/new-participant-id';
      
          // Call the function under test
          const docRef = await createNewParticipant(newParticipant);
      
          // Assert the expected behavior
          expect(addDoc).toHaveBeenCalledWith(collection(db, 'participants'), newParticipant);
          expect(docRef).toEqual(expectedDocRef);
        });
      });
  });

 