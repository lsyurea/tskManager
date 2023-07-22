import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';


// check that vitest is working
describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

// check that TodoList renders
// describe('TodoList', () => {
//     it('renders without crashing', () => {
//         render(<TodoList />);
//     });
//     }
// );
