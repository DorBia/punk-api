import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';


it('should render the heading text "Brewdog"', async () => {
    render(<Router><Navbar /></Router>);
    const headingText = screen.getByText(/brewdog/i);
    expect(headingText).toBeInTheDocument();
});

it('should have the heading', async () => {
    render(<Router><Navbar /></Router>);
    const heading = screen.getByRole("heading");
    expect(heading).toBeTruthy();
});

it('should have the logo', async () => {
    render(<Router><Navbar /></Router>);
    const logo = screen.getByRole("img");
    expect(logo).toBeTruthy();
});

