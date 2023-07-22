import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Todo } from './Todo';


// check that vitest is working
describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

// check that Todo renders
// describe('Todo', () => {
//     it('renders without crashing', () => {
//         render(<Todo />);
//     });
//     }
// );
