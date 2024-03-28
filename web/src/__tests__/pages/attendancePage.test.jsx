import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AttendancePageNew from '../../app/admin/attendance/new/page'
import AttendancePageOld from '../../app/admin/attendance/old/page'

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