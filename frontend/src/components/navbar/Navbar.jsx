
import { FaBars, FaTimes } from 'react-icons/fa'
import { useRef } from 'react'
import './Navbar.css'

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    const loginPopup = () => {
        window.location.href = '/login'
    }

    const logout = () => {
        // sessionStorage.removeItem('token')
        sessionStorage.clear()
        window.location.href = '/login'
    }

    return (
        <div className='header'>
            <h2 className="logo">tskManager</h2>
            <nav ref={navRef} className="navigation">
                <a href="/">Module Details</a>
                <a href="/calendar">Calendar</a>
                <a href="/dashboard">Todo</a>
                <a href="/module">Profile</a>
                {sessionStorage.getItem('token') ? <button className="btnLogin-popup" onClick={logout}>Logout</button> : <button className="btnLogin-popup" onClick={loginPopup}>Login</button>}
                {/* <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button> */}
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </div>
    )
}

export default Navbar