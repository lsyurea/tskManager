import { useState } from 'react';
import { supabase } from "../../helper/SupabaseClient"

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
  
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { data, error } = await supabase.auth.signUp({
                username: username,
                email: email,
                password: password,
                options: {
                    data: {
                        username: username,
                    }
                }
            })
            if (error) {
                throw error
            }
            console.log('Signup submitted:', data);

            alert('Check your email for the confirmation link!')

            // Reset form fields
            setUsername('');
            setPassword('');
            setEmail('')
        }
        catch (error) {
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
                <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <button type="submit">Sign up</button>
            </form>
            <p>Already have an account? Click to <a href="/">Login</a></p>
        </div>
    );
  }
  
  export default SignUp