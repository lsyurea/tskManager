import { supabase } from "./SupabaseClient"

// set todolist api
// fetch based on user id
const user = () => JSON.parse(sessionStorage.getItem('token')).user;

export const fetchTodo = async (force) => {
    if (!user()) {console.log('User not login'); return;}
    if (sessionStorage.getItem('todos') === null || force) {
        const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user().id)
    
        if (error) {
            console.log(error)
        }
        sessionStorage.setItem('todos', data)
        return data;
    }
    return sessionStorage.getItem('todos')
}

// delete
export const deleteTodo = async (id) => {
    if (!user()) return

    const { error } = await supabase
    .from('todos')
    .delete()
    .match({ id: id })

    if (error) {
        console.log(error)
    } 
    return fetchTodo(true)
}

// create
export const addTodo = async (newTodo) => {
    if (!user()) {console.log('User not login'); return;}

    // if newTodo is empty, don't add it
    if (newTodo.trim() === '') return;
    // add newTodo to database

    const { error } = await supabase
    .from('todos')
    .insert({ user_id: user().id, task: newTodo })

    if (error) {
        console.log(error)
    } else {
        fetchTodo(true)
    }
}

// update
export const updateTodo = async (id, task) => {
    if (!user()) return
    const { error } = await supabase.from('todos').update({ task: task }).match({ id: id })
    if (error) {
        console.log(error)
    } else {
        return fetchTodo()
    }
}

// set calendar api



// set modules api
export const fetchModule = async () => {
    if (!user()) {console.log('User not login'); return;}
   
    const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('user_id', user().id)
    
    if (error) {
        console.log(error)
    }
    return data;
}

export const addModule = async (module) => {
    if (!user()) {console.log('User not login'); return;}

    // if newTodo is empty, don't add it
    if (module.trim() === '') return;

    // if module code is already in database, don't add it
    const { data } = await supabase
    .from('modules')
    .select('*')
    .eq('user_id', user().id)
    .eq('module_name', module)

    if (data.length !== 0) {
        alert('Module already exists')
        return
    }

    // add newTodo to database

    const { error } = await supabase
    .from('modules')
    .insert({ user_id: user().id, module_name: module })

    if (error) {
        console.log(error)
    } 
    alert('Module added to your list!')
}


