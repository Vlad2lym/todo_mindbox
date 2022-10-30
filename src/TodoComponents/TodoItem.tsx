import React, { FC, useContext } from "react";
import Context from "../context";
import { ITodo } from "../types/types";
import classes from './todo.module.css';

interface TodoItemProps {
    todo: ITodo,
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
    const {removeTodo, toggleTodo} = useContext(Context)
    const  styles = ['todoText']

    if (!todo.active) {
        styles.push('done')
    }

    return (
        <div className={classes.item}>
            <span className={styles.join(' ')}>
                <input 
                    className={classes.checkbox}
                    type='checkbox' 
                    checked={!todo.active}
                    onChange={() => toggleTodo(todo.id)}
                />
                {todo.value}
            </span>
            <button onClick={()=> removeTodo(todo.id)}>&times;</button>
        </div>
    )
}

export default TodoItem;