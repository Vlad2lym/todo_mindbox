import React, { FC, useState } from "react";
import classes from './todo.module.css'

interface AddTodoProps {
    onCreate: Function
}

const AddTodo: FC<AddTodoProps> = ({onCreate}) => {
    const [value, setValue] = useState<string>('')

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (value.trim()) {
            onCreate(value)
            setValue('')
        }
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <input 
                className={classes.inputAdd}
                type='text'
                placeholder=' What needs to be done?' 
                value={value} 
                onChange={e => setValue(e.target.value)}
            ></input>
            <button type="submit">Add todo</button>
        </form>
    )
}

export default AddTodo;