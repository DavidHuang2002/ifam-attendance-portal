import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import  AttendanceNew  from '../../app/admin/attendance/[eventId]/new/page'
//import  AttendancePageOld  from '@/app/admin/attendance/[eventId]/old'

import { ParticipantNotFound, getAllAttendance, createAttendance } from '@/service/back-end/attendance'

const mockSubmitForm = jest.fn()

describe('Attendance Page for New Members', () => {
    /*beforeEach(() => {
      render(<AttendancePageNew />)
    })*/

    describe('Basic Frontend Components', () => {
  
      it('heading should render properly', () => {
        render(<AttendanceNew />)
        const heading = screen.getByRole('heading', { level: 1 })
    
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent("New Member Attendance")
      })
    
      it('should have link to the returning members form', () => {
        render(<AttendanceNew />)
        const oldMember = screen.getByRole('link', { name: 'I\'m a returning memberAdmin Portal' })
    
        expect(oldMember).toBeInTheDocument()
        // need to be updated to the link
        //expect(oldMember).toHaveAttribute('href', '/admin')
      })
  
    })
  })

  /*

const mockOldParticipant = {email: "testemail@gmail.com", participantID: "participant1"}

describe('Attendance Page for Old Members', () => {

  describe('Form Submission', () => {
    it('it should call createAttendance when submitted', async () => {
      render(<AttendancePageOld />)

      const input = screen.getByRole('Form.Item')
      await userEvent.type(input, "testemail@gmail.com")

      const button = screen.getByRole('button', { name: 'Submit'})
      await userEvent.click(button)
  
      expect(button).toBeInEnabled()
      expect(input).toHaveValue("")
      expect(createAttendance).toBeCalled()
    })
 })
}) */