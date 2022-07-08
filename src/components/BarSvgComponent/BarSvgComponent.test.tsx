import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BarSvgComponent from './BarSvgComponent';

describe('<BarSvgComponent />', () => {
  test('it should mount', () => {
    render(<BarSvgComponent data= {[]}/>);
    
    const barSvgComponent = screen.getByTestId('BarSvgComponent');

    expect(barSvgComponent).toBeInTheDocument();
  });
});