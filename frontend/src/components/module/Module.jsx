import './Module.css'

function Module() {
    const user = () => {
        const token = JSON.parse(sessionStorage.getItem('token'));
        return token ? token.user : token;
    }
    if (!user()) return (
    <>
    <div>
        <h1>Please login first</h1>
    </div>
    </>);


    return (
        <div className='profile'>
            <h1>Welcome back, {user().user_metadata.username}</h1>
            <div className="profile-card">
                <div className="profile-card-body">
                    <div className="profile-card-body-item">
                    </div>
                </div>
                <div className="profile-card-body"></div>
                <div className="profile-card-body"></div>

            </div>
        </div>
    )
}

export default Module