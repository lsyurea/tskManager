import { useState, useEffect } from 'react'
import { supabase } from '../../helper/SupabaseClient'
import Todo from './Todo'
import './TodoList.css'

function TodoList() {
    const[todos, setTodos] = useState([])
    const[newTodo, setNewTodo] = useState('')

    // authentication
    const user = () => {
        null;
    }

    // crud operations

    // read
    const fetchTodo = async () => {
        if (!user()) return
        const { data } = await supabase
        .from('todos')
        .select('*')
        setTodos(data)
    };

    // delete
    const deleteTodo = async (id) => {
        if (!user()) return
        await supabase.from('todos').delete().match({ id: id });
        fetchTodo();
    };

    // create
    const addTodo = async (e) => {
        if (!user()) return
        e.preventDefault();

        // if newTodo is empty, don't add it
        if (newTodo.trim() === '') return;

        // add newTodo to database
        const { data, error} = await supabase.from('todos').insert({ task: newTodo })
        if (error) {
            alert(error)
        } else {
            console.log('Todo added:', data)
            setNewTodo('')
            fetchTodo()
        }
    }

    // update
    const updateTodo = async (id, task) => {
        if (!user()) return
        const { data, error } = await supabase.from('todos').update({ task: task }).match({ id: id })
        if (error) {
            alert(error)
        } else {
            console.log('Todo updated:', data)
            fetchTodo()
        }
    }

    // keeps fetching the todos from the database
    useEffect(() => {
        fetchTodo()
    })

    if (!user()) {
        return (
            <div>Please log in to view and manage todos.</div>
        )
    }

    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} onDelete={deleteTodo} />
            ))}
        <form onSubmit={addTodo}>
            <input type="text" value={newTodo} onChange={updateTodo} placeholder="Add a new todo" />
            <button type="submit">Add Todo</button>
        </form>
        </div>
    );
}

export default TodoList