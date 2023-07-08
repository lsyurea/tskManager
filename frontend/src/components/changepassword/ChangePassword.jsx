import './ChangePassword.css'
import { useState, useEffect } from 'react';
import { supabase } from "../../services/SupabaseClient"

function ChangePassword() {
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const { data, error } = await supabase.auth.resetPasswordForEmail(email)

        if (error) {
            alert(error)
        }
        console.log('Password changed:', data);
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
        <div className="wrapper-changepassword">
            <a href='/'><span className="icon-close"><ion-icon name="close"></ion-icon></span></a>
            <div className="form-box login">
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <span className="icon"><ion-icon name="mail"></ion-icon></span>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <label htmlFor="email">Enter your current email:</label>
                    </div>
                    <button type="submit" className="btn">Submit</button>
                    <div className="login-register"> 
                        <p>Don't have an account? Click to <a href="/signup">Sign up</a></p>
                        <p>Already have an account? Click to <a href="/login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;