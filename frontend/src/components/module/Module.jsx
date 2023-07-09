import './Module.css'
import { fetchModule } from '../../services/apiService'
import { useState, useEffect } from 'react'
// import { SearchDetails } from '../searchresultlist/SearchDetails'

function Module() {
    const [modules, setModules] = useState([]);
    // const [moduleDetails, setModuleDetails] = useState(null);
    
    useEffect(() => {
        fetchModule().then((modules) => {
            setModules(modules);
        }
        );
    });


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
                        <h3>Current task</h3>
                    </div>

                    <div><h3>Miscellaneous task from Todo</h3></div>
                    <div><h3>Scheduled task from Calendar</h3></div>
                </div>
                <div className="profile-card-body">
                    <div className="profile-card-body-item">
                        <h3>Modules taking</h3>
                    </div>
                    {modules.map((module) => (
                            <div key={module.id}>
                                <h4>{module.module_name}</h4>
                            </div>
                        ))}
                </div>
                {/* <div className="profile-card-body"></div> */}

            </div>
        </div>
    )
}

export default Module