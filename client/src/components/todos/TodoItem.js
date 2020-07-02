import React, { useContext} from 'react'
import PropTypes from 'prop-types'

import TodoContext from '../../context/todo/todoContext'

const TodoItem = ({ todo }) => {

    const todoContext = useContext(TodoContext)

    const { title, description } = todo

    return (
        <div className='card'>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

TodoItem.propTypes = {
 todo: PropTypes.object.isRequired
}

export default TodoItem
