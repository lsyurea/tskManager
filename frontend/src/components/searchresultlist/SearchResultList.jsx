import './SearchResultList.css'

function SearchResultList({ results }) {
    console.log(results)
    return (
        <div className="search-result-list">
            {results.map((result, index) => (
                <div key={index} className="search-result">
                    <div className="search-result-title">{result.moduleCode} : {result.title}</div>
                </div>
            ))}
        </div>       
    )
}

export default SearchResultList;