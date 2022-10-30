import React, { FC, useEffect, useState } from "react";
import { ITodo } from "../types/types";
import TodoItem from "./TodoItem";
import classes from './todo.module.css'

interface TodoListProps {
    todos: ITodo[],
    clearCompleted: Function,
    countActive: number
}
interface styleActive {
    all: any,
    active: any,
    completed: any
}

const TodoList: FC<TodoListProps> = ({todos, clearCompleted, countActive}) => {
    const [filter, setFilter] = useState <string | boolean>('')
    const [filterTodos, setFilterTodos] = useState <ITodo[]>([])
    const [styleActive, setStyleActive] = useState <styleActive>({all: classes.active, active: '', completed: ''})

    useEffect(()=> {
        filter===''
        ? setFilterTodos(todos)
        : setFilterTodos (todos.filter((todo) => todo.active === filter))
    }, [filter, todos])

    function clickAll () {
        setFilter('')
        setStyleActive({all: classes.active, active: '', completed: ''})
    }

    function clickActive () {
        setFilter(true)
        setStyleActive({all: '', active: classes.active, completed: ''})
    }

    function clickCompleted () {
        setFilter(false)
        setStyleActive({all: '', active: '', completed: classes.active})
    }

    return (
        <div className={classes.list} data-testid='todoList'>
            {filterTodos.length
            ?
                filterTodos.map (todo => 
                    <TodoItem key={todo.id} todo={todo} />
                )
            : filter ? <h1 className="noTodo">no active todos</h1> : <h1 className="noTodo">no completed todos</h1>
                }
            <div className={classes.footer}>
                <p>{countActive} items left</p>
                <div>
                    <button className={styleActive.all} data-testid='btnAll' onClick={clickAll}>ALL</button>
                    <button className={styleActive.active} data-testid='btnAct' onClick={clickActive}>Active</button>
                    <button className={styleActive.completed} data-testid='btnComp' onClick={clickCompleted}>Completed</button>
                </div>
                <button onClick={()=> clearCompleted()}>Clear completed</button>
            </div>
        </div>
    )
}

export default TodoList;