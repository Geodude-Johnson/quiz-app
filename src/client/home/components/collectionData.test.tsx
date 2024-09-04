/** @jest-environment jsdom */
//https://testing-library.com/docs/example-react-router/
import * as React from 'react';
import { render } from '@testing-library/react';
import CardCollections from '../components/collectionData';

// describe('card collections should be showing if applicable', () => {
//     it('shows at least one card collection if data exists', () => {
//         // Mock or simulate data that would trigger one card collection
//         const mockCollections = ["User collection 1 name", "User collection 2 name", "User collection 3 name"];
      
//         // Render the component with mocked data
//         render(<CardCollections collections={mockCollections} />);
      
//         // Use RTL assertions to verify at least one card is present
//         expect(screen.getAllByRole('article')).toHaveLength(1);
//       });
// })