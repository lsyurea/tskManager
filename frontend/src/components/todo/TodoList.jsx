import { useState, useEffect } from 'react'
import { supabase } from '../../helper/SupabaseClient'
import Todo from './Todo'
import './TodoList.css'

function TodoList({token}) {
    const[todos, setTodos] = useState([])
    const[newTodo, setNewTodo] = useState('')

    // authentication
    const user = () => {
        return token.user;
    }

    // crud operations

    // read

    // currently public access

    // const headers = {
    //     'Authorization': `Bearer ${token.session.access_token}`,
    // };

    // fetch based on user id
    const fetchTodo = async () => {
        if (!user()) return
        const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user().id)

        if (error) {
            alert(error)
            return
        }

        // set todos to data from database
        setTodos(data? data : [])

    }

    // delete
    const deleteTodo = async (id) => {
        if (!user()) return

        const { error } = await supabase
        .from('todos')
        .delete()
        .match({ id: id })

        if (error) {
            alert(error)
            return
        } 
    }

    // create
    const addTodo = async (e) => {
        if (!user()) return

        e.preventDefault();

        // if newTodo is empty, don't add it
        if (newTodo.trim() === '') return;

        // add newTodo to database
        const { error } = await supabase
        .from('todos')
        .insert({ user_id: user().id, task: newTodo })

        if (error) {
            alert(error)
        } else {
            console.log('Todo added:', newTodo)
            setNewTodo('')
            fetchTodo()
        }
    }

    // to update the newTodo state
    const update = (e) => {
        setNewTodo(e.target.value);
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
        console.log(todos)
    }, [])

    if (!user()) {
        return (
            <div>Please log in to view and manage todos.</div>
        )
    }

    return (
        <div>
            <form className="todoForm" onSubmit={addTodo}>
                <input className="box" type="text" value={newTodo} onChange={update} placeholder="Add a new todo" />
                <button type="submit">Add Todo</button>
            </form>
            <div className="todo-list">
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} onDelete={deleteTodo} />
                ))}
                
            </div>
        </div>
    );
}

export default TodoList