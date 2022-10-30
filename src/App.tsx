import React, { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoComponents/TodoList';
import { ITodo } from './types/types';
import Context, { AppContextInterface } from './context';
import AddTodo from './TodoComponents/AddTodo';

function App() {
  const [todos, setTodos] = useState<ITodo[]> ([])
  const [countActiveTodo, setCountActiveTodo] = useState <number>(0)

  useEffect(()=> {
    setCountActiveTodo (todos.reduce((sum, todo) => {if(todo.active) sum++; return sum}, 0))
  }, [todos])

  const changeTodo: AppContextInterface = {

     removeTodo: (id: number) => {
      setTodos (todos.filter(todo => todo.id !== id))
    },

    toggleTodo: (id: number) => {
      setTodos (
        todos.map (todo => {
          if (todo.id === id) {todo.active = !todo.active}
          return todo
        })
      )
    }
  }

  const addTodo = (title: string) => {
    setTodos (todos.concat([{
      id: Date.now(),
      value: title,
      active: true
    }]))
  }

  const removeCompleted = () => {
    setTodos (todos.filter(todo=> todo.active))
  }

  return (
    <Context.Provider value={changeTodo}>
      <div className='wrapper'>
        <h1 className='title'>
          todos
        </h1>
        <AddTodo onCreate={addTodo} />
        {todos.length
          ?
          <TodoList todos={todos} clearCompleted={removeCompleted} countActive={countActiveTodo}/>
          :
          <h2 className='noTodo'>there is no todos</h2>
        }
      </div>
    </Context.Provider>
  );
}

export default App;
