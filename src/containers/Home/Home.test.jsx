import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

it('The pagination has next and previous labels', async () => {
    render(<Home />);
    const previousLabel = screen.getByText(/previous/i);
    const nextLabel = screen.getByText(/next/i);
    expect(previousLabel).toBeTruthy();
    expect(nextLabel).toBeInTheDocument();
});

it('Should render switch theme button', async () => {
    render(<Home />);
    const switchButton = screen.getByAltText("theme switch");
    expect(switchButton).toBeTruthy();
});

it('Should change switch theme button image on click', () => {
    render(<Home />);
    const switchButton = screen.getByAltText("theme switch");
    userEvent.click(switchButton);
    expect(switchButton.src).toContain("snowflake-cold-svgrepo-com.svg");
});