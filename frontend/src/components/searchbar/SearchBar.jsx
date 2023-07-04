import './Searchbar.css'
import { FaSearch } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const apiUrl = 'https://api.nusmods.com/v2/';
const currentYear = new Date().getFullYear();
// const currentSemester = new Date().getMonth() < 6 ? 1 : 2;
const stringYear = `${currentYear}-${currentYear + 1}`;

// Function to fetch all modules
async function fetchModules() {
  try {
    const response = await fetch(`${apiUrl}${stringYear}/moduleList.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const modules = await response.json();
    return modules;
  } catch (error) {
    console.error('Error fetching modules:', error);
    return null;
  }
}


function SearchBar({ setResults }) {
    const [prefix, setPrefix] = useState('')
    const [modules, setModules] = useState([])
    const [filteredModules, setFilteredModules] = useState([])
    if (modules.length === 0) {
        fetchModules().then((modules) => {
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