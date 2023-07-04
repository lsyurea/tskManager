import './SearchResultList.css';
import SearchDetails from './SearchDetails';
import { useState } from 'react';

function SearchResultList({ results }) {
    const [moduleDetails, setModuleDetails] = useState(null);

    const handleSubmit = (module) => () => {
        setModuleDetails(module);
    }

    return (
        <div className="search-result-list">
            {!moduleDetails && results.map((result, index) => (
                <div key={index} className="search-result">
                    <div onClick={handleSubmit(result)} className="search-result-title">{result.moduleCode} : {result.title}</div>
                </div>
            ))}
            {moduleDetails && <SearchDetails result = {moduleDetails} setModuleDetails={setModuleDetails}/>}
        </div>       
    )
}

export default SearchResultList;