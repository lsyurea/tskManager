import { useState } from 'react'
import './Login.css'
import { supabase } from "../../helper/SupabaseClient"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    try {
        event.preventDefault();
        // Perform login logic here
    
        const { data, error } = await supabase.auth.signInWithPassword({
            username: username,
            password: password,
        })
        if (data.user == null) {
            alert('Invalid username or password')
        }
        console.log('Login submitted:', data);
        // Reset form fields
        setUsername('');
        setPassword('');
    } catch (error) {
      alert(error)
    }
    
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username:</label>
            <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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