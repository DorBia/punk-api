import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from './Menu';


it('should render the menu icon', async () => {
  render(<Menu />);
  const menuIcon = screen.getByRole("img");
  expect(menuIcon).toBeInTheDocument();
});

it('should remove the menu icon after clicking on it', async () => {
    render(<Menu />);
    const menuIcon = screen.getByRole("img");
    userEvent.click(menuIcon);
    expect(menuIcon).not.toBeInTheDocument();
});

it('should render the menu after clicking on icon', async () => {
    render(<Menu />);
    const menuIcon = screen.getByRole("img");
    userEvent.click(menuIcon);
    const closeButton = screen.getByText("x")
    const input = screen.getByRole("textbox")
    expect(closeButton).toBeInTheDocument();
    expect(input).toBeInTheDocument();
});

it('should have 2 dropdowns in the menu', async () => {
  render(<Menu />);
  const menuIcon = screen.getByRole("img");
  userEvent.click(menuIcon);
  const dropdowns = screen.getAllByRole("combobox");
  expect(dropdowns.length).toBe(2);
})

it('should have 11 dropdown options', async () => {
  render(<Menu />);
  const menuIcon = screen.getByRole("img");
  userEvent.click(menuIcon);
  const options = screen.getAllByRole("option");
  expect(options.length).toBe(11);
})

it('should show the menu icon after clicking on "x"', async () => {
  render(<Menu />);
  const menuIcon = screen.queryByRole("img");
  userEvent.click(menuIcon);
  const closeButton = screen.getByText("x");
  userEvent.click(closeButton);
  const menuIconAgain = screen.getByAltText(/menu/i);
  expect(menuIconAgain).toBeVisible();
});