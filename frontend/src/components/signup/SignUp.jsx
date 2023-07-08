import './SignUp.css';
import { useState, useEffect } from 'react';
import { supabase } from "../../services/SupabaseClient"

async function checkEmailExists(email) {
    try {
      // Query the 'users' table for the given email
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();
  
      if (error) {
        console.error('Error querying database:', error.message);
        return false;
      }
  
      // If 'data' is not null, the email exists in the 'users' table
      return data !== null;
    } catch (err) {
      console.error('Error checking email:', err.message);
      return false;
    }
}

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

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
    
    async function handleSubmit(event) {
        event.preventDefault();
        // email validation only once
        if (checkEmailExists(email)) {
            alert('Email already exists!')
            return
        }

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
            console.log(error)
        }
       
    }
  
    return (
        <div className="wrapper-signup">
            <a href='/'><span className="icon-close"><ion-icon name="close"></ion-icon></span></a>
            <div className="form-box login">
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <span className="icon"><ion-icon name="accessibility"></ion-icon></span>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        <label htmlFor="username">Username</label>
                    </div>
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
                    <button type="submit" className="btn">Sign up</button>
                    <div className="login-register">
                        <p>Already have an account? <a href="/login" className="register-link">Click to login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
  }
  
  export default SignUp