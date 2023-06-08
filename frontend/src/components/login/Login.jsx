import { useState } from 'react'
import './Login.css'
import { supabase } from "../../helper/SupabaseClient"
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(event) {
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
        <div className="wrapper">
            <a href='/'><span className="icon-close"><ion-icon name="close"></ion-icon></span></a>
            <form className="form-box login" onSubmit={handleLogin}>
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
            <div className="details"> 
                <p>No account? Click to <a href="/signup">Sign up</a></p>
                <p>Forget password? Click to <a href="/changePassword">Change password</a></p>
            </div>
        </div>
    );
}

export default Login