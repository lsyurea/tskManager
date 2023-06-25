import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import TodoList from './TodoList';

test('renders TodoList component', () => {
  render(<TodoList />);
  
  // Assert that the "Please log in" message is displayed
  expect(screen.getByText('Please log in to view and manage todos.')).toBeInTheDocument();
});

test('adds a new todo', () => {
  render(<TodoList />);
  
  // Find the input and button elements
  const inputElement = screen.getByPlaceholderText('Add a new todo');
  const buttonElement = screen.getByText('Add Todo');
  
  // Type a new todo into the input
  fireEvent.change(inputElement, { target: { value: 'New Todo' } });
  
  // Click the "Add Todo" button
  fireEvent.click(buttonElement);
  
  // Assert that the new todo is displayed
  expect(screen.getByText('New Todo')).toBeInTheDocument();
});

test('deletes a todo', () => {
  render(<TodoList />);
  
  // Add a todo
  const inputElement = screen.getByPlaceholderText('Add a new todo');
  const buttonElement = screen.getByText('Add Todo');
  fireEvent.change(inputElement, { target: { value: 'Todo to delete' } });
  fireEvent.click(buttonElement);
  
  // Find the delete button and click it
  const deleteButton = screen.getByLabelText('Delete');
  fireEvent.click(deleteButton);
  
  // Assert that the deleted todo is no longer displayed
  expect(screen.queryByText('Todo to delete')).toBeNull();
});
