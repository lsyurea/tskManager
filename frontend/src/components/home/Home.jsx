function Home() {
    const token = JSON.parse(sessionStorage.getItem('token'))
    console.log(token)
    if (!token) return (
        <div className="home">
            <h1>Please sign in</h1>
        </div>
    ) 
    return (
        <div className="home">
            <h1>Welcome back, {token.user.user_metadata.username}</h1>
        </div>
    )
}

export default Home