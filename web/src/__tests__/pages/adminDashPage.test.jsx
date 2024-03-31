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

  it('quit button appears on the page', () => {
 
    const quitButton = screen.getByRole('button', {name: 'Quit Portal'})
 
    expect(heading).toBeInTheDocument()
  })

  it('quit button goes back to landing page', () => {
 
    const quitAction = screen.getByRole('link', { name: 'Quit Portal' })
 
    expect(quitAction).toBeInTheDocument()
    // need to be updated to the login page href
    expect(quitAction).toHaveAttribute('href', '../')
  })

  

  
})