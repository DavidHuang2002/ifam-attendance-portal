import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LandingPage from '../../app/page.js'


// Unit Tests -- Testing individual components on the page 
 
describe('Landing Page', () => {
  /*beforeEach(() => {
    render(<LandingPage />)
  })*/

  it('heading should render properly', () => {
    render(<LandingPage />)
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })

  it('should have link to Admin Portal', () => {
    render(<LandingPage />)
    const adminPortal = screen.getByRole('link', { name: 'Admin Portal' })
 
    expect(adminPortal).toBeInTheDocument()
    // need to be updated to the login page href
    expect(adminPortal).toHaveAttribute('href', '/admin')
  })

  it('should have Events tab', () => {
    render(<LandingPage />)
    const events = screen.getByRole('link', { name: 'Events' })
  
    expect(events).toBeInTheDocument()
    // need to be updated to the login page href
    expect(events).toHaveAttribute('href', "#events")
  })


})

// Integration Tests -- Testing information retreival from firebase 
