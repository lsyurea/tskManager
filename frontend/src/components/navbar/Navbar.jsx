import './Navbar.css'

function Navbar() {

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
                <a href="/">Module Details</a>
                <a href="/calendar">Calendar</a>
                <a href="/dashboard">Todo</a>
                <a href="/module">Profile</a>
                {sessionStorage.getItem('token') ? <button className="btnLogin-popup" onClick={logout}>Logout</button> : <button className="btnLogin-popup" onClick={loginPopup}>Login</button>}
                
            </nav>
        </div>
    )
}

export default Navbar