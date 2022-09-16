import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Card from './Card';

const beer = { 
    image_url: "https://images.punkapi.com/v2/keg.png", 
    name: "Buzz", 
    description: "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.", 
    abv: 4.5, 
    id: 1
  } 

  const beerToSorten = { 
    image_url: "https://images.punkapi.com/v2/2.png", 
    name: "Trashy Blonde", 
    description: "A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.", 
    abv: 4.1, 
    id: 2
  } 

it('should render the more info button', async () => {
    render(<Router><Card beer={beer}/></Router>);
    const button = screen.getByText(/more info/i);
    expect(button).toBeInTheDocument();
});

it('should render the image', async () => {
    render(<Router><Card beer={beer}/></Router>);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
});

it('should render the title', async () => {
    render(<Router><Card beer={beer}/></Router>);
    const title = screen.getByRole("heading");
    expect(title).toBeTruthy();
});

it('should render the correct title', async () => {
    render(<Router><Card beer={beer}/></Router>);
    const title = screen.getByRole("heading");
    expect(title.textContent).toEqual(beer.name);
});

it('should render the description', async () => {
    render(<Router><Card beer={beer}/></Router>);
    const description = screen.getByText("A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.");
    expect(description.textContent).toEqual(beer.description);
});

it('should shorten the description', async () => {
    render(<Router><Card beer={beerToSorten}/></Router>);
    const description = screen.getByTestId("description");
    expect(description.textContent).toEqual("A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self ...");
});