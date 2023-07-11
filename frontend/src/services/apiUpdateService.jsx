import { supabase } from "./SupabaseClient"

// fetch based on user id
const user = () => sessionStorage.getItem('token') 
                    ? JSON.parse(sessionStorage.getItem('token')).user
                    : null;

// update todo storage
export const TodoStorageUpdate = async () => {
    const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user().id)

    if (error) {
        console.log(error)
    } else {
        const res = data ? data.sort((a, b) => {
            return a.id > b.id ? -1 : 1;
        }) : [];
        res.map((todo) => {
            // console.log(JSON.stringify(todo));
            return JSON.stringify(todo)});
        sessionStorage.setItem('todos', JSON.stringify(res));
    }
}

// update module storage
export const ModuleStorageUpdate = async () => {
    const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('user_id', user().id)
    
    if (error) {
        console.log(error)
    } else {
        data.map((module) => {
            // console.log(JSON.stringify(module));
            return JSON.stringify(module)}
        );
        sessionStorage.setItem('modules', JSON.stringify(data));
    }
}

// update calendar storage
export const CalendarStorageUpdate = async () => {
    const {data: events, error} = await supabase
    .from('events')
    .select('*')
    .eq('user_id', user().id)

    if (error) {
      console.log(error);
    } else {
        const formattedEvents = events.map(event => {
            return ({
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
            }
        )})
        sessionStorage.setItem('events', JSON.stringify(formattedEvents));
    }
}