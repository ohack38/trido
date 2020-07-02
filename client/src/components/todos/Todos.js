import React, { Fragment, useContext, useEffect } from 'react';
import TodoContext from '../../context/todo/todoContext';
import TodoItem from './TodoItem'

const Todos = () => {
    const todoContext = useContext(TodoContext);

    const { todos, filtered, getTodos } = todoContext;

    useEffect(() => {
        getTodos();
         // eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            {todos.map( todo => (
                <TodoItem todo={todo} />
            ))}
        </Fragment>
    )
}
export default Todos