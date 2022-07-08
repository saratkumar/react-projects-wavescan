import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectChildComponent from './ProjectChildComponent';
import { WaveScanResponse } from '../../models/wave-scan.interface';

describe('<ProjectChildComponent />', () => {
  test('it should mount', () => {
    render(<ProjectChildComponent itemList={[]}/>);
    
    const projectChildComponent = screen.getByTestId('ProjectChildComponent');

    expect(projectChildComponent).toBeInTheDocument();
  });
});