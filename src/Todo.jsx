import React, { useReducer, useState } from 'react';


const todosReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [...state, {item: action.item, id: action.id}]
        case 'REMOVE_TODO':
            // filter() method creates a new array so its immutable
            return state.filter(value => value.id !== action.id)
        default:
            return state
    }
}


//need this unique id for deletion
const uniqueId = () => Math.random().toString(36).substr(2, 8)

const TodoList = () => {
    const [todos, dispatch] = useReducer(todosReducer, []);
    const [item, setItem] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!item) return;
        dispatch({type: 'ADD_TODO', item, id: uniqueId()})
        setItem('')
    }

    return(
        <div>
            <ul>
                { todos.map((todo) => (
                    <li key={todo.id}>{todo.item}
                        <button onClick={() => dispatch({type: 'REMOVE_TODO', id: todo.id})}>Remove Todo
                        </button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} >
                <input value={item} onChange={(e) => setItem(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}


export default TodoList;
