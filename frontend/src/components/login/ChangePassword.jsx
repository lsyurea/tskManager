import { useState } from 'react';
import { supabase } from "../../helper/SupabaseClient"

function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const { data, error } = await supabase.auth.updateUser({
            newPassword: newPassword
        })

        if (error) {
            alert(error)
        }
        console.log('Password changed:', data);
    }
    return (
        <div className="wrapper">
            <a href='/'><span className="icon-close"><ion-icon name="close"></ion-icon></span></a>
            <form className="form-box login" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                    type="password"
                    id="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
            <button type="submit">Login</button>
            </form>
            <div className="details"> 
                <p>No account? Click to <a href="/signup">Sign up</a></p>
                <p>Already have an account? Click to <a href="/login">Login</a></p>
            </div>
        </div>
    );
}

export default ChangePassword;