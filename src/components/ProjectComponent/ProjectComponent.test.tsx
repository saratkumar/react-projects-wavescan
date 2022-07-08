import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectComponent from './ProjectComponent';

describe('<ProjectComponent />', () => {
  test('it should mount', () => {
    render(<ProjectComponent />);
    
    const projectComponent = screen.getByTestId('ProjectComponent');

    expect(projectComponent).toBeInTheDocument();
  });
});