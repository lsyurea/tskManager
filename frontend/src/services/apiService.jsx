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
    sessionStorage.setItem('todos', JSON.stringify(JSON.parse(sessionStorage.getItem('todos')).filter((todo) => todo.id !== id)));

    if (error) {
        console.log(error)
    } 
}

// delete all
export const deleteAllTodo = async () => {
    if (!user()) return
    sessionStorage.setItem('todos', JSON.stringify([]));
    const { error } = await supabase
    .from('todos')
    .delete()
    .match({ user_id: user().id })

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
    const val = { user_id: user().id, task: newTodo }
    sessionStorage.setItem('todos', JSON.stringify([val, ...JSON.parse(sessionStorage.getItem('todos'))]));

    const { error } = await supabase
    .from('todos')
    .insert(val)

    if (error) {
        console.log(error)
    } 
}

// update
export const updateTodo = async (id, task) => {
    if (!user()) return
    const prevVal = JSON.parse(sessionStorage.getItem('todos'));
    const curVal = prevVal.map((val) => {
        if (val.id === id) {
            val.task = task;
        }
        return val;
    });
    sessionStorage.setItem('todos', JSON.stringify(curVal));
    
    const { error } = await supabase.from('todos').update({ task: task }).match({ 'id': id })
    if (error) {
        console.log(error)
    }
}

// set calendar api

export const fetchCalendarEvent = async () => {
    if (!user()) return
    if (!sessionStorage.getItem('events')) {
        await CalendarStorageUpdate();
    }
    let res = sessionStorage.getItem('events');
    res = JSON.parse(res);
    return res;
  }

export const addEvent = async (title, startDate, endDate) => {
    if (!user()) return
    const newEvent =  {
        title: title,
        start: startDate,
        end: endDate,
    }
    sessionStorage.setItem('events', JSON.stringify([newEvent, ...JSON.parse(sessionStorage.getItem('events'))]));
    newEvent.user_id = user().id;
    newEvent.start = newEvent.start.toISOString();
    newEvent.end = newEvent.end.toISOString();
    const { error } = await supabase.from('events').insert(newEvent);
    if (error) {
        alert(error);
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
    const val = { user_id: user().id, module_name: module }
    const prevVal = JSON.parse(sessionStorage.getItem('modules'));
    for (let i = 0; i < prevVal.length; i++) {
        if (prevVal[i].module_name === module) {
            alert('Module already exists')
            return;
        }
    }

    sessionStorage.setItem('modules', JSON.stringify([val, ...prevVal]));
    console.log("item added", module)
    
    // add newModules to database
    const { error } = await supabase
    .from('modules')
    .insert(val)

    if (error) {
        console.log(error)
    } 
}

export const deleteModule = async (module) => {
    if (!user()) return
    const prevVal = JSON.parse(sessionStorage.getItem('modules'));
    const curVal = prevVal.filter((val) => {return val.module_name !== module});
    const newVal = JSON.stringify(curVal);
    sessionStorage.setItem('modules', newVal);
    const { error } = await supabase
    .from('modules')
    .delete()
    .match({ module_name: module, user_id: user().id })

    if (error) {
        console.log(error)
    }
}

// NUS mods api

const apiUrl = 'https://api.nusmods.com/v2/';
let currentYear = new Date().getFullYear();
currentYear = new Date().getMonth() < 6 ? currentYear - 1 : currentYear; // if month is before july, then it is still the previous year
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