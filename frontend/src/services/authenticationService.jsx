import { supabase } from "./SupabaseClient"

export const login = async (email, password) => {

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (error) {
        console.log(error)
    } else {
        return data
    }
}
