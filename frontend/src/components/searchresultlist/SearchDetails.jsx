import './SearchDetails.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'https://api.nusmods.com/v2/';
const currentYear = new Date().getFullYear();
// const currentSemester = new Date().getMonth() < 6 ? 1 : 2;
const stringYear = `${currentYear}-${currentYear + 1}`;

// Function to fetch all modules

function SearchDetails( {result, setModuleDetails} ) {
    const [info, setInfo] = useState(null);
    const navigate = useNavigate();

    async function fetchModule() {
        try {
          const response = await fetch(`${apiUrl}${stringYear}/modules/${result.moduleCode}.json`);
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

    if (!info) {
        fetchModule().then((info) => {
            setInfo(info)
        })
    }
      
    const handleBack = () => {
       setModuleDetails(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sessionStorage.getItem('token') === null) {
            alert('Please login to add module to your list!')
            navigate('/login')
        } else {
            alert('Module added to your list!')
            // Todo: add module to user's list

            // Navigate to user's list
            navigate('/module')
        }
    }

    return (info && 
        <div onClick={handleBack} className="search-result">
            <div className="des module">{result.moduleCode} : {result.title}</div>

            <div className='des'>
                <h3>Description:</h3>
                <div className="result-description">{info.description}</div>
            </div>
            <div className='des'>
                <h3>Faculty:</h3>
                <div>{info.faculty}, {info.department}</div>
            </div>
            <div className='des'>
                <h3>Available in:</h3>
                {info.semesterData && info.semesterData.map((semester, index) => (
                    <div key={index}>Semester {semester.semester}</div>
                ))}
            </div>
            <div className='des'>
                <h3>Number of Modular Credit: </h3>
                <div className="mc">{info.moduleCredit} MCs</div>
            </div>
            {info.workload && <div className='des'>
                <h3>Workload per week: </h3>
                <div>Lectures: {info.workload[0]}h</div>
                <div>Tutorials: {info.workload[1]}h</div>
                <div>Lab: {info.workload[2]}h</div>
                <div>Project Work: {info.workload[3]}h</div>
                <div>Preparation for class: {info.workload[4]}h</div>
            </div>}
            <div className='des'>
                <h3>Finals Exam Dates: </h3>
                {info.semesterData && info.semesterData.map((semester, index) => (
                    <div key={index}>For Semester {semester.semester}: {new Date(semester.examDate).toDateString()}</div>
                ))}
            </div>
            <div className='des'>
                <h3>Prerequisite: </h3>
                <div className="prerequisite">{info.prerequisite}</div>
            </div>
            <div className='des'>
                <h3>Preclusion: </h3>
                <div className="preclusion">{info.preclusion}</div>
            </div>

            <button onClick={handleSubmit} className='des'>Add to profile</button>
          
        </div>

    )
}

export default SearchDetails;