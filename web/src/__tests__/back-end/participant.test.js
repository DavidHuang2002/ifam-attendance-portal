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
      it('should retrieve participant information by email', async () => {
        // Mock the necessary dependencies
        const participantData = { participantId: 'participant-id', email: 'test@example.com' };
        const getDocsMock = jest.fn().mockResolvedValue({
            forEach: jest.fn().mockImplementation((callback) => {
              callback({ data: () => participantData });
            }),
          });
  
        // Call the function under test
        const participant = await getParticipantByEmail('test@example.com');
  
        // Assert the expected behavior
        expect(getDocsMock).toHaveBeenCalledTimes(1);
        expect(participant).toEqual(participantData);
      });
  
      it('should return null if participant not found by email', async () => {
        // Mock the necessary dependencies
        const getDocsMock = jest.fn().mockResolvedValue({
          forEach: jest.fn().mockImplementation((callback) => {
            // No matching participant found
          }),
        });
  
        // Call the function under test
        const participant = await getParticipantByEmail('nonexistent@example.com');
  
        // Assert the expected behavior
        expect(getDocsMock).toHaveBeenCalledTimes(1);
        expect(participant).toBeNull();
      });
    });
  
    
  });