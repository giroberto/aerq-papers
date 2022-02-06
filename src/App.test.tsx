import { render, screen } from '@testing-library/react';
import App from './App';

test('Render Game Title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Paper Rock Scissors/i);
  expect(linkElement).toBeInTheDocument();
});
