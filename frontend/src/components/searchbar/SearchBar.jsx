import './SearchBar.css'
import { FaSearch } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { fetchAllNUSModules } from '../../services/apiService'


function SearchBar({ setResults }) {
    const [prefix, setPrefix] = useState('')
    const [modules, setModules] = useState([])
    const [filteredModules, setFilteredModules] = useState([])
    if (modules == null || modules.length === 0) {
       
        fetchAllNUSModules().then((modules) => {
            setModules(modules)
            setFilteredModules(modules)
        })
    }

    useEffect(() => {
        setResults(filteredModules)
    }, [filteredModules, setResults])
    

    const filterModules = (prefix) => modules.filter((module) => module.moduleCode.toLowerCase().startsWith(prefix.toLowerCase()))

    const handleChange = (value) => {
        setPrefix(value)
        setFilteredModules(filterModules(value))
        setResults(filteredModules)
    }

    return (
        <div className="search-wrapper">
            <FaSearch id="search-icon" />
            <input className="search" type="text" placeholder="Type to search..." value={prefix} onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}

export default SearchBar