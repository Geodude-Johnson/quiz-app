/** @jest-environment jsdom */
//https://testing-library.com/docs/example-react-router/
import * as React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
  });
});


//NEED TO MANUALLY SET THE ENVIRONMENT BECAUSE OUR CONFIG ENVIRONMENT IS SET WITH NODE ENVIRONMENT FOR BACKEND TESTING