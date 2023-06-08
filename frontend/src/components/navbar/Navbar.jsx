import './Navbar.css'

function Navbar() {

    const loginPopup = () => {
        window.location.href = '/login'
    }


    return (
        <div className='header'>
            <h2 className="logo">tskManager</h2>
            <nav className="navigation">
                <a href="/">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
                <button className="btnLogin-popup" onClick={loginPopup}>Login</button>
            </nav>
        </div>
    )
}

export default Navbar