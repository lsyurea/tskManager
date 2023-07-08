import './Login.css'
import { useEffect } from 'react'; 
import { useState } from 'react'
import { supabase } from "../../services/SupabaseClient"
import { useNavigate } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard';

function Login({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

     // to prevent manual change to login
     if (sessionStorage.getItem('token')) {
        navigate('/dashboard')
        return <Dashboard />
    }

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

                // debugging to check for token
                console.log('Login submitted:', data);
                // set the token to be used for other app.jsx component
                setToken(data);
                navigate('/dashboard')
            }
            
            // Reset form fields
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
        script1.type = 'module';
        document.body.appendChild(script1);
    
        const script2 = document.createElement('script');
        script2.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
        script2.setAttribute('nomodule', '');
        document.body.appendChild(script2);
    
        return () => {
          // Cleanup script tags if necessary
          document.body.removeChild(script1);
          document.body.removeChild(script2);
        };
      }, []);

    return (
        <div className="wrapper-login">
            <a href='/'><span className="icon-close"><ion-icon name="close"></ion-icon></span></a>
            <div className="form-box login">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-box">
                        <span className="icon"><ion-icon name="mail"></ion-icon></span>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="remember-forgot">
                        {/* <label><input type="checkbox"/> Remember me</label> */}
                        <a href="/changePassword">Forgot Password?</a>
                    </div>
                    <button type="submit" className="btn">Login</button>
                    <div className="login-register">
                        <p>Don't have an account? <a href="/signup" className="register-link">Sign Up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login