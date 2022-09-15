import { render, screen } from '@testing-library/react';
import FiltersList from './FiltersList';

it('should render a dropdown', async () => {
    render(<FiltersList />);
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeTruthy();
})

it('should have 6 options', async () => {
    render(<FiltersList />);
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(6);
})

it('should have option High Alcohol', async () => {
    render(<FiltersList />);
    const option = screen.getByText("High Alcohol");
    expect(option).toBeTruthy();
})

it('should not have the option Z-A', async () => {
    render(<FiltersList />);
    const option = screen.queryByText(/Z-A/i);
    expect(option).toBeFalsy();
})