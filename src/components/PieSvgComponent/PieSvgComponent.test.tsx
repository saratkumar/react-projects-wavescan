import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PieSvgComponent from './PieSvgComponent';
const generateData = () => {
  return;
}
describe('<PieSvgComponent />', () => {
  test('it should mount', () => {
    render(<PieSvgComponent  data={generateData()}
      width={200}
      height={200}
      innerRadius={60}
      outerRadius={100} />);
    
    const pieSvgComponent = screen.getByTestId('PieSvgComponent');

    expect(pieSvgComponent).toBeInTheDocument();
  });
});