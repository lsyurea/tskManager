import { useState, useEffect } from 'react'
import Todo from './Todo'
import { deleteTodo, updateTodo, addTodo, deleteAllTodo } from '../../services/apiService'
import { useLocation } from 'react-router-dom'
import './TodoList.css'

function TodoList() {
    const[todos, setTodos] = useState([])
    const[newTodo, setNewTodo] = useState('')

    const location = useLocation();
    // authentication
    const user = () => {
        return JSON.parse(sessionStorage.getItem('token')).user;
    }
     // keeps fetching the todos from the database
    useEffect(() => {
        setTodos(JSON.parse(sessionStorage.getItem('todos')));
    }, [location])


    // create
    const handleSubmit = async (e) => {
        if (!user()) return

        e.preventDefault();

        // if newTodo is empty, don't add it
        if (newTodo.trim() === '') return;

        // add newTodo to database
        

        // update the todos directly for faster response
        setTodos([{id: todos.length, task: newTodo}, ...todos])
        
        // clear the input box
        setNewTodo('');
        await addTodo(newTodo);
    }

    const handleDeleteAll = async (e) => {
        if (!user()) return
        e.preventDefault();
        
        // delete all todos from database
        
        setTodos([]);
        await deleteAllTodo();

    }

    // to update the newTodo state
    const update = (e) => {
        setNewTodo(e.target.value);
    }

    if (!user()) {
        return (
            <div>Please log in to view and manage todos.</div>
        )
    }

    return (
        <div>
            <form className="todoForm" onSubmit={handleSubmit}>
                <input className="box" type="text" value={newTodo} onChange={update} placeholder="Add a new todo" />
                <button type="submit">Add Todo</button>
            </form>
            <div className="todo-list">
                {todos && todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} onDelete={deleteTodo} onUpdate={updateTodo} setTodos={setTodos} todos={todos}/>
                ))}
                
            </div>
            <button onClick={handleDeleteAll}>Clear all</button>
        </div>
    );
}

export default TodoList