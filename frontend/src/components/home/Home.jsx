function Home({ token }) {
    if (!token) return (
        <div className="home">
            <h1>Please sign in</h1>
        </div>
    ) 
    return (
        <div className="home">
            <h1>Welcome back, {token.user.email}</h1>
        </div>
    )
}

export default Home