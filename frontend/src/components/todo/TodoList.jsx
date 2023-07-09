import { useState, useEffect } from 'react'
import { supabase } from '../../services/SupabaseClient'
import Todo from './Todo'
import { fetchTodo, deleteTodo, updateTodo, addTodo } from '../../services/apiService'
import './TodoList.css'

function TodoList() {
    const[todos, setTodos] = useState([])
    const[newTodo, setNewTodo] = useState('')

    // authentication
    const user = () => {
        return JSON.parse(sessionStorage.getItem('token')).user;
    }
     // keeps fetching the todos from the database
    useEffect(() => {
        fetchTodo().then((todos) => {
            setTodos(todos);
        })
    }, [todos])


    // create
    const handleSubmit = async (e) => {
        if (!user()) return

        e.preventDefault();

        // if newTodo is empty, don't add it
        if (newTodo.trim() === '') return;

        // add newTodo to database
        addTodo(newTodo);
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
                    <Todo key={todo.id} todo={todo} onDelete={deleteTodo} onUpdate={updateTodo}/>
                ))}
                
            </div>
        </div>
    );
}

export default TodoList