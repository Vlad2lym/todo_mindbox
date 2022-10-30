import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('test app', () => {
  test('basic html', () => {
    render(<App />);
    const title = screen.getByText('todos');
    const btn = screen.getByRole('button');
    const input = screen.getByPlaceholderText(/what\sneeds\sto\sbe\sdone./i)
    expect(title).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toMatchSnapshot();
  })

  test('input test', async () => {
    render(<App />);
    const noTodoTitle = screen.getByText(/is\sno\stodos/i)
    expect(noTodoTitle).toBeInTheDocument()
    const input = screen.getByPlaceholderText(/what\sneeds\sto\sbe\sdone./i)
    fireEvent.change(input, {target: {value: 'test'}})
    expect(screen.queryByText(/is\sno\stodos/i)).toBeNull
    const todoList = screen.findByTestId('todoList')
    expect(todoList).toMatchSnapshot()
  })
})

