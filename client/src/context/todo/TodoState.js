import React, { useReducer } from 'react';
import axios from 'axios';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
import {
    GET_TODO,
    ADD_TODO,
    DELETE_TODO,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_TODO,
    FILTER_TODOS,
    CLEAR_FILTER,
    TODO_ERROR
} from '../types';

const TodoState = props => {
    const initialState = {
        todos: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(todoReducer, initialState);

    const getTodos = async () => {
        try {
            const res = await axios.get('/api/todos');
            dispatch({ type: GET_TODO, payload: res.data });
        } catch (err) {
            dispatch({ type: TODO_ERROR, payload: err.response.msg})
        }
    }
    const addTodo = async () => {
        const config = {
            headers:{
                'Contact-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/todos', todo, config);
            dispatch({ type: ADD_TODO, payload: res.data });

        } catch (err) {
            dispatch({ type: TODO_ERROR, payload: err.response.msg});
        }
    }
    const deleteTodo = id => {
        dispatch({ type: DELETE_TODO, payload: id });
    }
    const setCurrent = todo => {
        dispatch({ type: SET_CURRENT, payload: todo});
    }
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }
    const updateTodo = todo => {
        dispatch({ type: UPDATE_TODO, payload: todo});
    }
    const filterTodos = text => {
        dispatch({ type: FILTER_TODOS, payload: text });
    }
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addTodo,
            getTodos,
            deleteTodo,
            updateTodo,
            setCurrent,
            clearCurrent,
            filterTodos,
            clearFilter
        }}>
            {props.children}
        </TodoContext.Provider>
    )

}

export default TodoState;