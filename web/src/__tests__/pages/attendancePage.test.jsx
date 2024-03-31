import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AttendancePageNew from '../../app/admin/attendance/new/page.js'
import AttendancePageOld from '../../app/admin/attendance/old/page.js'

import { createAttendance } from '@/service/back-end/attendance'
import { ParticipantNotFound } from '@/service/back-end/attendance'

// Unit Tests

describe('Attendance Page for Returning Members', () => {
    /*beforeEach(() => {
      render(<AttendancePageNew />)
    })*/
  
    it('heading should render properly', () => {
      render(<AttendancePageNew />)
      const heading = screen.getByRole('heading', { level: 1 })
   
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent("New Member Attendance")
    })
  
    it('should have link to the returning members form', () => {
      render(<AttendancePageNew />)
      const oldMember = screen.getByRole('link', { name: 'I\'m a returning memberAdmin Portal' })
   
      expect(oldMember).toBeInTheDocument()
      // need to be updated to the link
      //expect(oldMember).toHaveAttribute('href', '/admin')
    })
  
    
  
  })

  // Integration Tests

  jest.mock('@/service/back-end/attendance');

  describe('createAttendance', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should create a new attendance record with participantId for an existing participant', async () => {
      const newAttendance = {
        email: 'test@example.com',
        // other attendance data
      };
      const existingParticipant = { participantId: '123' };
      getParticipantByEmail.mockResolvedValue(existingParticipant);
  
      const result = await createAttendance(newAttendance);
  
      expect(getParticipantByEmail).toHaveBeenCalledWith(newAttendance.email);
      expect(result).toEqual({ ...newAttendance, participantId: existingParticipant.participantId });
    });
  
    it('should throw ParticipantNotFound error for a non-existing participant', async () => {
      const newAttendance = {
        email: 'unknown@example.com',
        // other attendance data
      };
      getParticipantByEmail.mockResolvedValue(null);
  
      await expect(createAttendance(newAttendance)).rejects.toThrow(ParticipantNotFound);
      expect(getParticipantByEmail).toHaveBeenCalledWith(newAttendance.email);
    });
  });
