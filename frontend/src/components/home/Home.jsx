import { useState } from 'react'
import SearchBar from '../searchbar/SearchBar'
import SearchResultList from '../searchresultlist/SearchResultList'
import './Home.css';

function Home() {
    const [results, setResults] = useState([])
    return (
        <div className="home">
            <h1>Module Details</h1>
            <div className="search-bar-container">
               <SearchBar setResults={setResults}/>
            </div>
            
            <div className="search-result-list-container">
                <SearchResultList results={results}/>
            </div>
            
        </div>
    )
}

export default Home