import { render, screen } from '@testing-library/react';
import SortingList from './SortingList';

it('should render a dropdown', async () => {
    render(<SortingList />);
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeTruthy();
})

it('should have 5 options', async () => {
    render(<SortingList />);
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(5);
})

it('should have option A-Z', async () => {
    render(<SortingList />);
    const option = screen.getByText(/a-z/i);
    expect(option).toBeInTheDocument();
})

it('should not have the option Classic Range', async () => {
    render(<SortingList />);
    const option = screen.queryByText(/Classic Range/i);
    expect(option).not.toBeInTheDocument();
})