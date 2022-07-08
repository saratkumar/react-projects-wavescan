import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChartComponent from './ChartComponent';

describe('<ChartComponent />', () => {
  test('it should mount', () => {
    const obj = {equipment: [], material: []};
    render(<ChartComponent chartData={obj}/>);
    
    const chartComponent = screen.getByTestId('ChartComponent');

    expect(chartComponent).toBeInTheDocument();
  });
});