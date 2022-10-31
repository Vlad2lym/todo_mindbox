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

  test('input and button test', async () => {
    render(<App />);
    const noTodoTitle = screen.getByText(/is\sno\stodos/i)
    expect(noTodoTitle).toBeInTheDocument()
    const input = screen.getByPlaceholderText(/what\sneeds\sto\sbe\sdone./i)
    fireEvent.change(input, {target: {value: 'test'}})
    const btnAdd = screen.getByRole('button');
    fireEvent.click(btnAdd)
    expect(screen.queryByText(/is\sno\stodos/i)).toBeNull()
    const todoList = screen.getByTestId('todoList')
    expect(todoList).toMatchSnapshot()
    //button test
    const btnAll = screen.getByTestId('btnAll')
    const btnActive = screen.getByTestId('btnAct')
    const btnCompleted = screen.getByTestId('btnComp')
    fireEvent.click(btnCompleted)
    expect(screen.getByText(/no\scompleted\stodos$/i)).toBeInTheDocument()
    expect(screen.getByTestId('todoList')).toMatchSnapshot()
    fireEvent.click(btnActive)
    expect(screen.queryByText(/no\scompleted\stodos$/i)).toBeNull()
    const checkbox = screen.getByTestId('checkbox')
    fireEvent.click(checkbox)
    expect(screen.getByText(/no\sactive\stodos$/i)).toBeInTheDocument()
    expect(screen.getByTestId('todoList')).toMatchSnapshot()
    fireEvent.click(btnAll)
    expect(screen.queryByText(/no\sactive\stodos$/i)).toBeNull()
    const btnClearCompleted = screen.getByTestId('btnClearComp')
    expect(screen.queryByText(/is\sno\stodos/i)).toBeNull()
    fireEvent.click(btnClearCompleted)
    expect(screen.getByText(/is\sno\stodos/i)).toBeInTheDocument()
  })
})

