import { useState } from 'react'
import './Login.css'
import { supabase } from "../../helper/SupabaseClient"
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            // Perform login logic here
    
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if (error) {
                throw error
            }
            if (data.session == null) {
                alert('Invalid username or password')
            } else {
                console.log('Login submitted:', data);
                navigate('/dashboard')
            }
            
            // Reset form fields
            setEmail('');
            setPassword('');
        } catch (error) {
        alert(error)
        }
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
            </form>
            <p>Don't have an account? Click to <a href="/signup">Sign up</a></p>
        </div>
    );
}

export default Login