import { supabase } from "./SupabaseClient"
import { TodoStorageUpdate, ModuleStorageUpdate, CalendarStorageUpdate } from "./apiUpdateService.jsx";

// set todolist api
// fetch based on user id
const user = () => sessionStorage.getItem('token') 
                    ? JSON.parse(sessionStorage.getItem('token')).user
                    : null;

// make use of session storage to optimise performance
export const fetchTodo = async () => {
    if (!user()) {console.log('User not login'); return;}
    if (!sessionStorage.getItem('todos')) {
        await TodoStorageUpdate();
    }
    let res = sessionStorage.getItem('todos');
    res = JSON.parse(res);
    return res;
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
    } else {
        // need to update session storage
        await TodoStorageUpdate();
    }
}

// delete all
export const deleteAllTodo = async () => {
    if (!user()) return
    const { error } = await supabase
    .from('todos')
    .delete()
    .match({ user_id: user().id })

    if (error) {
        console.log(error)
    } else {
        // need to update session storage
        await TodoStorageUpdate();
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
        // need to update session storage
        await TodoStorageUpdate();    
    }
}

// update
export const updateTodo = async (id, task) => {
    if (!user()) return
    const { error } = await supabase.from('todos').update({ task: task }).match({ id: id })
    if (error) {
        console.log(error)
    } else {
        // need to update session storage
        await TodoStorageUpdate();
    }
}

// set calendar api

export const fetchCalendarEvent = async () => {
    if (!user()) return
    if (!sessionStorage.getItem('events')) {
        CalendarStorageUpdate();
    }
    let res = sessionStorage.getItem('events');
    res = JSON.parse(res);
    return res;
  }

    export const addEvent = async (title, startDate, endDate) => {
        if (!user()) return
        const { error } = await supabase.from('events').insert([
        {
            user_id: user().id,
            title: title,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
        }
        ]);
        if (error) {
            alert(error);
        } else {
            // need to update session storage
            await CalendarStorageUpdate();
        }
    };

// set modules api
export const fetchModule = async () => {
    if (!user()) {console.log('User not login'); return;}
   
    if (!sessionStorage.getItem('modules')) {
        await ModuleStorageUpdate();
    }
    let res = sessionStorage.getItem('modules');
    res = JSON.parse(res);
    return res;
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

    // add newModules to database

    const { error } = await supabase
    .from('modules')
    .insert({ user_id: user().id, module_name: module })

    if (error) {
        console.log(error)
    } else {
        // need to update session storage
        await ModuleStorageUpdate();
        // alert('Module added to your list!')
    }
    
}

export const deleteModule = async (module) => {
    if (!user()) return

    const { error } = await supabase
    .from('modules')
    .delete()
    .match({ module_name: module, user_id: user().id })

    if (error) {
        console.log(error)
    } else {
        // need to update session storage
        await ModuleStorageUpdate();
        // alert('Module deleted from your list!')
    }
    
}

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