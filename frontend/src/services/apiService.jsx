import { supabase } from "./SupabaseClient"

// set todolist api
// fetch based on user id
const user = () => JSON.parse(sessionStorage.getItem('token')).user;

export const fetchTodo = async () => {
    if (!user()) {console.log('User not login'); return;}
   
    const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user().id)

    if (error) {
        console.log(error)
    }
    return data ? data.sort((a, b) => {
        return a.id > b.id ? -1 : 1;
    }) : [];
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

// export const fetchModuleCode = async (moduleCode) => {
//     if (!user()) {console.log('User not login'); return;}
//     const { data, error } = await supabase
//     .from('modules')
//     .select('*')
//     .eq('user_id', user().id)
//     .eq('module_name', moduleCode)

//     if (error) {
//         console.log(error)
//     }
//     return data;
// }

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

export const deleteModule = async (module) => {
    if (!user()) return

    const { error } = await supabase
    .from('modules')
    .delete()
    .match({ module_name: module, user_id: user().id })

    if (error) {
        console.log(error)
    } 
    alert('Module deleted from your list!')
}

// do not need update module because user cannot change module name


// NUS mods api

const apiUrl = 'https://api.nusmods.com/v2/';
const currentYear = new Date().getFullYear();
// const currentSemester = new Date().getMonth() < 6 ? 1 : 2;
const stringYear = `${currentYear}-${currentYear + 1}`;

export const fetchNUSModule = async (moduleCode) => {
    try {
      const response = await fetch(`${apiUrl}${stringYear}/modules/${moduleCode}.json`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const modules = await response.json();
      return modules;
    } catch (error) {
      console.error('Error fetching modules:', error);
      return null;
    }
}

export const fetchAllNUSModules = async() => {
    try {
      const response = await fetch(`${apiUrl}${stringYear}/moduleList.json`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const modules = await response.json();
      return modules;
    } catch (error) {
      console.error('Error fetching modules:', error);
      return null;
    }
  }