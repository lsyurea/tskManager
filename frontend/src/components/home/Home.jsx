import './Home.css';
import SearchBar from '../searchbar/Searchbar'

function Home() {

    return (
        <div className="home">

            <div className="search-bar-container">
               <SearchBar />
            </div>
            <div className="container">
                <div className="card">
                    <h1>Module Details</h1>
                </div>
            </div>

            
        </div>
    )
}

export default Home