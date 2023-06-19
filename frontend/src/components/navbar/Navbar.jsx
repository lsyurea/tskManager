import './Navbar.css'

function Navbar({ token }) {

    const loginPopup = () => {
        window.location.href = '/login'
    }

    const logout = () => {
        sessionStorage.removeItem('token')
        window.location.href = '/login'
    }


    return (
        <div className='header'>
            <h2 className="logo">tskManager</h2>
            <nav className="navigation">
                <a href="/">Home</a>
                <a href="/calendar">Calendar</a>
                <a href="/dashboard">Dashboard</a>
                <a href="#">Contact</a>
                {token ? <button className="btnLogin-popup" onClick={logout}>Logout</button> : <button className="btnLogin-popup" onClick={loginPopup}>Login</button>}
                
            </nav>
        </div>
    )
}

export default Navbar