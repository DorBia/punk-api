import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';


it('should render the search bar', async () => {
  render(<SearchBox />);
  const searchBar = screen.getByRole("textbox");
  expect(searchBar).toBeInTheDocument();
});

it('should have the placeholder text', async () => {
    render(<SearchBox />);
    const searchBar = screen.getByPlaceholderText(/Search here.../i);
    expect(searchBar).toBeTruthy();
});

it('should have no value on render', async () => {
    render(<SearchBox />);
    const searchBar = screen.getByRole("textbox");
    expect(searchBar.value).toBeFalsy();
});


it('should have a value after writing something in', async () => {
    render(<SearchBox />);
    const searchBar = screen.getByRole("textbox");
    userEvent.type(searchBar, "Buzz")
    expect(searchBar.value).toBe("Buzz");
});