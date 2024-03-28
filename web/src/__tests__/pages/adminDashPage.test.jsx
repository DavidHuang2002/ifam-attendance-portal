import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AdminDashPage from '../../app/admin/page'
 
describe('Admin Dashboard Page', () => {
  beforeEach(() => {
    render(<AdminDashPage />)
  })

  it('heading should render properly', () => {
 
    const heading = screen.getByRole('heading')
 
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("Welcome back to the Admin Portal!")
  })

  
})