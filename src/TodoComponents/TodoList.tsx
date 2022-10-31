import { FC, useMemo, useState } from "react";
import { ITodo } from "../types/types";
import TodoItem from "./TodoItem";
import classes from './todo.module.css'

interface TodoListProps {
    todos: ITodo[],
    clearCompleted: Function,
    countActive: number
}

enum Filters {
    all = 'all',
    active = 'active',
    completed = 'completed'
}

const TodoList: FC<TodoListProps> = ({todos, clearCompleted, countActive}) => {
    const [filter, setFilter] = useState<Filters>(Filters.all)
    const filteredTodos = useMemo(()=> {
        if (filter === Filters.all) {
            return todos
        } else if (filter === Filters.active) {
            return todos.filter((todo) => todo.active)
        } else if (filter === Filters.completed) {
            return todos.filter((todo) => !todo.active)
        }

        return todos
    }, [filter, todos])

    function clickAll () {
        setFilter(Filters.all)
    }

    function clickActive () {
        setFilter(Filters.active)
    }

    function clickCompleted () {
        setFilter(Filters.completed)
    }

    return (
        <div className={classes.list} data-testid='todoList'>
            {filteredTodos.length
                ?
                filteredTodos.map(todo => 
                    <TodoItem key={todo.id} todo={todo} />
                )
                : filter === 'active' ? <h1 className="noTodo">no active todos</h1> : <h1 className="noTodo">no completed todos</h1>
            }
            <div className={classes.footer}>
                <p>{countActive} items left</p>
                <div>
                    <button className={filter === 'all' ? classes.active : ''} data-testid='btnAll' onClick={clickAll}>ALL</button>
                    <button className={filter === 'active' ? classes.active : ''} data-testid='btnAct' onClick={clickActive}>Active</button>
                    <button className={filter === 'completed' ? classes.active : ''} data-testid='btnComp' onClick={clickCompleted}>Completed</button>
                </div>
                <button data-testid='btnClearComp' onClick={()=> clearCompleted()}>Clear completed</button>
            </div>
        </div>
    )
}

export default TodoList;