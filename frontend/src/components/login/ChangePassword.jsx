import { useState, useEffect } from 'react';
import { supabase } from "../../helper/SupabaseClient"

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
        <div className="wrapper-login">
            <a href='/'><span className="icon-close"><ion-icon name="close"></ion-icon></span></a>
            <form className="form-box login" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">Enter your current email:</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            <button type="submit">Submit</button>
            </form>
            <div className="details"> 
                <p>No account? Click to <a href="/signup">Sign up</a></p>
                <p>Already have an account? Click to <a href="/login">Login</a></p>
            </div>
        </div>
    );
}

export default ChangePassword;